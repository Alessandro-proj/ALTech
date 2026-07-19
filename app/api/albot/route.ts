type ChatMessage = {
  role: "bot" | "visitor";
  text: string;
};

const ALTECH_CONTEXT = `
Voce e o ALBot, assistente virtual oficial da AL Tech.
Responda em portugues do Brasil, com tom humano, premium, consultivo, claro e objetivo.
A AL Tech e um estudio premium de desenvolvimento digital. A empresa desenvolve sistemas sob medida, websites premium, plataformas web, sistemas governamentais, dashboards, ERPs, CRMs, portais corporativos, landing pages, automacoes, APIs e infraestrutura cloud.
Dados comerciais oficiais:
- WhatsApp: +55 21 97271-4119
- Instagram: https://www.instagram.com/altech.dev/
- E-mail: contato.altechdev@gmail.com

Diretrizes:
- Ajude visitantes a entender qual solucao faz sentido para o projeto: site, sistema, portal, ERP, dashboard, automacao, API ou cloud.
- Quando perguntarem preco, explique que depende de escopo, modulos, integrações e prazo; convide para chamar no WhatsApp.
- Quando perguntarem prazo, fale em estimativas por complexidade e recomende uma conversa de diagnostico.
- Quando perguntarem sobre site, explique que a AL Tech pode cuidar de estrategia, design premium, SEO, performance, responsividade, copy e integracoes.
- Nao puxe a conversa para inteligencia artificial, robos ou ChatGPT. O ALBot deve parecer atendimento de uma empresa de desenvolvimento, nao produto de IA.
- Nao invente cases, clientes, garantias, precos fixos ou promessas juridicas.
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
    return "Para um site profissional, o investimento depende de paginas, identidade visual, copy, SEO, animacoes e integracoes como WhatsApp, Instagram ou painel administrativo. A AL Tech pode montar uma proposta sob medida pelo WhatsApp +55 21 97271-4119.";
  }

  if (wantsWebsite) {
    return "Perfeito. A AL Tech pode criar um site moderno, rapido e premium, com estrategia, layout responsivo, SEO, copy, performance e integracao com WhatsApp/Instagram. O proximo passo e entender objetivo, referencias, paginas e prazo para montar uma proposta.";
  }

  if (wantsPrice) {
    return "O investimento depende do escopo, integrações, telas, prazo e nível de automação. Chame a AL Tech no WhatsApp +55 21 97271-4119 para montarmos uma proposta com mais precisão.";
  }

  if (wantsTiming) {
    return "O prazo varia conforme a complexidade. Uma landing page pode ser rápida; sistemas com login, dashboard, integrações e banco de dados costumam ser planejados em fases.";
  }

  if (hasAny(["cloud", "infra"])) {
    return "A AL Tech estrutura cloud, deploy, observabilidade e segurança para deixar o sistema estável, escalável e fácil de evoluir.";
  }

  return "Posso ajudar a identificar a melhor solução para o seu projeto: site premium, sistema web, ERP, dashboard, portal, automação, API ou cloud. Para seguir com um diagnóstico e proposta, fale com a AL Tech pelo WhatsApp +55 21 97271-4119.";
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
  let body: { messages?: ChatMessage[]; pageContext?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
  const latestQuestion =
    [...messages].reverse().find((message) => message.role === "visitor")?.text ?? "";

  if (!latestQuestion.trim()) {
    return Response.json({ reply: "Me diga como posso ajudar no seu projeto." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({
      configured: false,
      reply: fallbackAnswer(latestQuestion),
    });
  }

  const conversation = messages
    .map((message) => `${message.role === "visitor" ? "Visitante" : "ALBot"}: ${message.text}`)
    .join("\n");

  const input = [
    ALTECH_CONTEXT,
    body.pageContext ? `Contexto atual da pagina: ${body.pageContext}` : "",
    "Historico recente:",
    conversation,
    "",
    "Responda como ALBot:",
  ]
    .filter(Boolean)
    .join("\n");

  const model = process.env.OPENAI_MODEL || "gpt-5.6-sol";

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
        store: false,
      }),
    });

    if (!response.ok) {
      return Response.json({
        configured: true,
        reply: fallbackAnswer(latestQuestion),
      });
    }

    const payload = await response.json();
    return Response.json({
      configured: true,
      reply: extractText(payload) ?? fallbackAnswer(latestQuestion),
    });
  } catch {
    return Response.json({
      configured: true,
      reply: fallbackAnswer(latestQuestion),
    });
  }
}
