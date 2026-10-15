type ChatMessage = {
  role: "bot" | "visitor";
  text: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const MAX_BODY_BYTES = 24_000;
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1_500;
const MAX_PAGE_CONTEXT_LENGTH = 300;
const RATE_LIMIT_MAX = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, RateLimitEntry>();

const json = (data: unknown, init: ResponseInit = {}) => {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");

  return Response.json(data, { ...init, headers });
};

const getClientKey = (request: Request) =>
  request.headers.get("cf-connecting-ip") ??
  request.headers.get("x-real-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "anonymous";

const consumeRateLimit = (request: Request) => {
  const now = Date.now();
  const key = getClientKey(request);
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;

  if (rateLimitStore.size > 2_000) {
    for (const [storedKey, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(storedKey);
    }
  }

  return { allowed: true, retryAfter: 0 };
};

const ALTECH_CONTEXT = `
Voce e o ALBot, assistente virtual oficial da AL Tech.
Responda em portugues do Brasil, com tom humano, premium, consultivo, claro e objetivo.
A AL Tech e um estudio premium de desenvolvimento digital. A empresa desenvolve sistemas sob medida, websites premium, plataformas web, sistemas governamentais, dashboards, ERPs, CRMs, portais corporativos, landing pages, automacoes, APIs e infraestrutura cloud.
Dados comerciais oficiais:
- WhatsApp: +55 21 97126-6237
- Instagram: https://www.instagram.com/altech.dev/
- E-mail: contato.altechdev@gmail.com

Diretrizes:
- Ajude visitantes a entender qual solucao faz sentido para o projeto: site, sistema, portal, ERP, dashboard, automacao, API ou cloud.
- Quando perguntarem preco, explique que depende de escopo, modulos, integrações e prazo; convide para chamar no WhatsApp.
- Quando perguntarem prazo, fale em estimativas por complexidade e recomende uma conversa de diagnostico.
- Quando perguntarem sobre site, explique que a AL Tech pode cuidar de estrategia, design premium, SEO, performance, responsividade, copy e integracoes.
- Nao puxe a conversa para inteligencia artificial, robos ou ChatGPT. O ALBot deve parecer atendimento de uma empresa de desenvolvimento, nao produto de IA.
- Nao invente cases, clientes, garantias, precos fixos ou promessas juridicas.
- Nao informe quantidades de cadastros, solicitacoes ou atendimentos do CMIPcD. Fale apenas das funcionalidades e da autoria do projeto.
- Nao colete dados sensiveis. Para contato, direcione para WhatsApp ou e-mail.
- Mantenha respostas curtas: 2 a 5 frases.
`.trim();

const fallbackAnswer = (question: string) => {
  const text = question
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const hasAny = (terms: string[]) => terms.some((term) => text.includes(term));
  const wantsWebsite = hasAny([
    "site",
    "website",
    "landing",
    "pagina",
    "institucional",
    "portfolio",
    "loja virtual",
    "e-commerce",
    "ecommerce",
  ]);
  const wantsPrice = hasAny(["custa", "preco", "valor", "orcamento"]);
  const wantsTiming = hasAny(["tempo", "demora", "prazo"]);

  if (wantsWebsite && wantsPrice) {
    return "Para um site profissional, o investimento depende de paginas, identidade visual, copy, SEO, animacoes e integracoes como WhatsApp, Instagram ou painel administrativo. A AL Tech pode montar uma proposta sob medida pelo WhatsApp +55 21 97126-6237.";
  }

  if (wantsWebsite) {
    return "Perfeito. A AL Tech pode criar um site moderno, rapido e premium, com estrategia, layout responsivo, SEO, copy, performance e integracao com WhatsApp/Instagram. O proximo passo e entender objetivo, referencias, paginas e prazo para montar uma proposta.";
  }

  if (wantsPrice) {
    return "O investimento depende do escopo, integrações, telas, prazo e nível de automação. Chame a AL Tech no WhatsApp +55 21 97126-6237 para montarmos uma proposta com mais precisão.";
  }

  if (wantsTiming) {
    return "O prazo varia conforme a complexidade. Uma landing page pode ser rápida; sistemas com login, dashboard, integrações e banco de dados costumam ser planejados em fases.";
  }

  if (hasAny(["cloud", "infra"])) {
    return "A AL Tech estrutura cloud, deploy, observabilidade e segurança para deixar o sistema estável, escalável e fácil de evoluir.";
  }

  return "Posso ajudar a identificar a melhor solução para o seu projeto: site premium, sistema web, ERP, dashboard, portal, automação, API ou cloud. Para seguir com um diagnóstico e proposta, fale com a AL Tech pelo WhatsApp +55 21 97126-6237.";
};

const extractText = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") return null;
  const maybeOutputText = (payload as { output_text?: unknown }).output_text;
  if (typeof maybeOutputText === "string" && maybeOutputText.trim()) {
    return maybeOutputText.trim();
  }

  const output = (payload as { output?: unknown }).output;
  if (!Array.isArray(output)) return null;

  const parts: string[] = [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const contentItem of content) {
      if (!contentItem || typeof contentItem !== "object") continue;
      const text = (contentItem as { text?: unknown }).text;
      if (typeof text === "string") parts.push(text);
    }
  }

  return parts.join("\n").trim() || null;
};

export async function POST(request: Request) {
  const rateLimit = consumeRateLimit(request);
  if (!rateLimit.allowed) {
    return json(
      { error: "rate_limited", reply: "Muitas mensagens em pouco tempo. Tente novamente em instantes." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: { messages?: unknown; pageContext?: unknown };

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(rawBody) as { messages?: unknown; pageContext?: unknown };
  } catch {
    return json({ error: "invalid_json" }, { status: 400 });
  }

  if (!Array.isArray(body.messages)) {
    return json({ error: "invalid_messages" }, { status: 400 });
  }

  const messages: ChatMessage[] = [];
  for (const message of body.messages.slice(-MAX_MESSAGES)) {
    if (!message || typeof message !== "object") {
      return json({ error: "invalid_message" }, { status: 400 });
    }

    const role = (message as { role?: unknown }).role;
    const text = (message as { text?: unknown }).text;
    if (
      (role !== "bot" && role !== "visitor") ||
      typeof text !== "string" ||
      !text.trim() ||
      text.length > MAX_MESSAGE_LENGTH
    ) {
      return json({ error: "invalid_message" }, { status: 400 });
    }

    messages.push({ role, text: text.trim() });
  }

  const latestQuestion =
    [...messages].reverse().find((message) => message.role === "visitor")?.text ?? "";

  if (!latestQuestion.trim()) {
    return json({ reply: "Me diga como posso ajudar no seu projeto." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json({
      configured: false,
      reply: fallbackAnswer(latestQuestion),
    });
  }

  const pageContext =
    typeof body.pageContext === "string"
      ? body.pageContext.trim().slice(0, MAX_PAGE_CONTEXT_LENGTH)
      : "";

  const conversation = messages
    .map((message) => `${message.role === "visitor" ? "Visitante" : "ALBot"}: ${message.text}`)
    .join("\n");

  const input = [
    ALTECH_CONTEXT,
    pageContext ? `Contexto atual da pagina: ${pageContext}` : "",
    "Historico recente:",
    conversation,
    "",
    "Responda como ALBot:",
  ]
    .filter(Boolean)
    .join("\n");

  const model = process.env.OPENAI_MODEL || "gpt-5.6-sol";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input,
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
        max_output_tokens: 240,
        store: false,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return json({
        configured: true,
        reply: fallbackAnswer(latestQuestion),
      });
    }

    const payload = await response.json();
    return json({
      configured: true,
      reply: extractText(payload) ?? fallbackAnswer(latestQuestion),
    });
  } catch {
    return json({
      configured: true,
      reply: fallbackAnswer(latestQuestion),
    });
  } finally {
    clearTimeout(timeout);
  }
}
