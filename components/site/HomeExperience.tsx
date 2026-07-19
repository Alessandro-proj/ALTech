"use client";

import {
  ArrowRight,
  AtSign,
  BrainCircuit,
  BriefcaseBusiness,
  Cable,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cloud,
  Code2,
  Command,
  ExternalLink,
  Globe2,
  Mail,
  Menu,
  MessageSquare,
  Palette,
  PanelTop,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Waypoints,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ALBotFigure, type ALBotMood } from "./ALBotFigure";
import { CommandMap } from "./CommandMap";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  problem: string;
  result: string;
};

type ChatMessage = {
  role: "bot" | "visitor";
  text: string;
};

const WHATSAPP_NUMBER = "5521972714119";
const WHATSAPP_DISPLAY = "+55 21 97271-4119";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const navItems = [
  ["Sistemas", "#systems"],
  ["Projetos", "#projects"],
  ["Serviços", "#services"],
  ["Sobre", "#about"],
  ["Processo", "#process"],
  ["Contato", "#contact"],
] as const;

const services: Service[] = [
  {
    title: "Websites Premium",
    description: "Sites institucionais, landing pages e experiências digitais com visual forte, SEO e conversão.",
    icon: Code2,
    problem: "Presença digital fraca ou genérica.",
    result: "Marca mais confiável, clara e pronta para vender.",
  },
  {
    title: "Sistemas Empresariais",
    description: "ERPs, CRMs, portais internos e plataformas web para organizar operação, equipe e dados.",
    icon: BriefcaseBusiness,
    problem: "Processos espalhados em planilhas e mensagens.",
    result: "Controle total em um sistema feito para o seu fluxo.",
  },
  {
    title: "Sistemas Governamentais",
    description: "Portais e sistemas seguros para atendimento público, análise, permissões e indicadores.",
    icon: ShieldCheck,
    problem: "Atendimento lento, pouco rastreável e difícil de medir.",
    result: "Serviço digital com auditoria, organização e relatórios.",
  },
  {
    title: "Dashboards",
    description: "Painéis executivos com indicadores, filtros e leitura rápida para decisões melhores.",
    icon: ChartNoAxesCombined,
    problem: "Dados existem, mas não viram decisão.",
    result: "Informações em tempo real para agir com segurança.",
  },
  {
    title: "Automações de Processos",
    description: "Fluxos automatizados para reduzir retrabalho, padronizar tarefas e acelerar a operação.",
    icon: Workflow,
    problem: "Rotinas manuais consumindo tempo da equipe.",
    result: "Mais produtividade e menos erro operacional.",
  },
  {
    title: "APIs e Integrações",
    description: "Conexões entre sistemas, bancos, CRMs, pagamentos, formulários e ferramentas internas.",
    icon: Cable,
    problem: "Ferramentas que não conversam entre si.",
    result: "Dados conectados e processos mais fluidos.",
  },
  {
    title: "Infraestrutura Cloud",
    description: "Ambientes, deploy, monitoramento e arquitetura para sistemas estáveis e escaláveis.",
    icon: Cloud,
    problem: "Sistemas frágeis, lentos ou difíceis de manter.",
    result: "Base confiável para crescer sem perder estabilidade.",
  },
  {
    title: "Consultoria de Produto",
    description: "Diagnóstico, arquitetura, priorização e plano técnico para sair da ideia com clareza.",
    icon: BrainCircuit,
    problem: "Ideias boas sem caminho claro de execução.",
    result: "Escopo organizado, decisões melhores e menos risco.",
  },
  {
    title: "UI/UX para Sistemas",
    description: "Interfaces elegantes e fáceis de usar para produtos digitais, portais e dashboards.",
    icon: Palette,
    problem: "Sistemas difíceis, confusos ou com baixa adoção.",
    result: "Experiência premium que reduz atrito e aumenta confiança.",
  },
];

const systemShowcase = [
  {
    title: "CMIPcD",
    category: "Sistema governamental",
    description: "Fluxo digital para cadastro, análise e gestão de solicitações com painel administrativo.",
    image: "/projects/cmipcd.png",
    result: "Processo público mais organizado, rastreável e mensurável.",
  },
  {
    title: "ERP",
    category: "Gestão empresarial",
    description: "Vendas, caixa, estoque, relatórios e operação em uma plataforma única.",
    image: "/projects/sabor-do-acai.png",
    result: "Mais controle diário e menos dependência de planilhas.",
  },
  {
    title: "Dashboards",
    category: "Inteligência operacional",
    description: "Indicadores visuais para acompanhar desempenho, tendências e gargalos.",
    result: "Informações em tempo real para decisões mais rápidas.",
  },
  {
    title: "Landing Pages",
    category: "Conversão e marca",
    description: "Páginas rápidas, bonitas e orientadas para gerar contato, orçamento ou agendamento.",
    image: "/projects/barbearia-ravier.png",
    result: "Experiência premium e fluxo claro até o contato.",
  },
] as const;

const outcomeCards = [
  ["Mais produtividade", "Sistemas que reduzem tarefas repetitivas e deixam a equipe focar no que importa."],
  ["Controle total", "Dados, usuários, permissões e relatórios reunidos em uma operação clara."],
  ["Informação em tempo real", "Indicadores vivos para entender o que está acontecendo antes do problema crescer."],
  ["Escalabilidade", "Produtos digitais preparados para evoluir sem precisar recomeçar do zero."],
] as const;

const heroFeatures: { label: string; icon: LucideIcon }[] = [
  { label: "Desenvolvimento sob medida", icon: Code2 },
  { label: "Performance", icon: Rocket },
  { label: "Segurança", icon: ShieldCheck },
  { label: "Suporte contínuo", icon: MessageSquare },
];

const quoteServices: { label: string; icon: LucideIcon }[] = [
  { label: "Site profissional", icon: PanelTop },
  { label: "Landing page", icon: Sparkles },
  { label: "Sistema sob medida", icon: Code2 },
  { label: "Dashboard e indicadores", icon: ChartNoAxesCombined },
  { label: "Automação de processos", icon: Workflow },
  { label: "Loja virtual", icon: ShoppingBag },
  { label: "Portal institucional", icon: Globe2 },
  { label: "Suporte e manutenção", icon: ShieldCheck },
  { label: "Outro projeto", icon: BriefcaseBusiness },
];

const projectObjectives: { label: string; icon: LucideIcon }[] = [
  { label: "Vender mais", icon: Rocket },
  { label: "Automatizar processos", icon: Workflow },
  { label: "Organizar informações", icon: ChartNoAxesCombined },
  { label: "Criar presença digital", icon: Globe2 },
  { label: "Modernizar um sistema existente", icon: Sparkles },
  { label: "Outro", icon: MessageSquare },
];

const startOptions = [
  "O quanto antes",
  "Nas próximas semanas",
  "Ainda estou planejando",
] as const;

const productCapabilities: { title: string; description: string; icon: LucideIcon; className: string }[] = [
  {
    title: "Sistema Web",
    description: "Aplicações modernas e escaláveis.",
    icon: PanelTop,
    className: "cap-a",
  },
  {
    title: "Dashboard Executivo",
    description: "Indicadores em tempo real.",
    icon: ChartNoAxesCombined,
    className: "cap-b",
  },
  {
    title: "Portal Corporativo",
    description: "Experiência premium.",
    icon: BriefcaseBusiness,
    className: "cap-c",
  },
  {
    title: "API Integrada",
    description: "Comunicação entre sistemas.",
    icon: Cable,
    className: "cap-d",
  },
  {
    title: "Cloud Ready",
    description: "Infraestrutura escalável.",
    icon: Cloud,
    className: "cap-e",
  },
  {
    title: "Automações",
    description: "Fluxos inteligentes.",
    icon: Workflow,
    className: "cap-f",
  },
];

const trustedCompanies = [
  "Prefeitura Municipal",
  "Studio Caty Hair",
  "Morus Agência",
  "Gesso Infinity",
  "Ravier",
  "Daniela Peclat",
] as const;

const trustBadges = [
  "Desenvolvimento sob medida",
  "Suporte próximo",
  "Infraestrutura cloud",
  "Entrega contínua",
  "Código limpo",
  "Performance",
] as const;

const techs = [
  ["Next.js", "N", "Aplicações modernas"],
  ["NestJS", "NE", "APIs robustas"],
  ["Node.js", "JS", "Back-end escalável"],
  ["Docker", "DK", "Ambientes previsíveis"],
  ["PostgreSQL", "PG", "Dados confiáveis"],
  ["MySQL", "MY", "Banco relacional"],
  ["Supabase", "SB", "Produtos rápidos"],
  ["GitHub", "GH", "Versionamento"],
  ["Cloudflare", "CF", "Edge e segurança"],
  ["Vercel", "VC", "Entrega global"],
  ["TypeScript", "TS", "Código seguro"],
  ["Tailwind", "TW", "UI consistente"],
] as const;

const projects = [
  {
    title: "CMIPcD",
    tag: "Governo digital",
    description:
      "Sistema completo para emissão, análise e gestão da Carteira Municipal da Pessoa com Deficiência.",
    problem: "O processo precisava sair do atendimento manual e ganhar rastreabilidade.",
    solution: "Criamos uma plataforma web com cadastro, análise, permissões e painel de indicadores.",
    impact: "Atendimento público mais organizado, decisões mais rápidas e gestão com dados claros.",
    metric: "4.000+ cadastros",
    stack: ["Next.js", "PostgreSQL", "Cloud", "BI"],
    results: ["4.000+ cadastros processados", "Fluxo com auditoria", "Painel de indicadores"],
    accent: "blue",
    href: "https://carteirapcd.prefeituradebelfordroxo.rj.gov.br/",
    image: "/projects/cmipcd.png",
  },
  {
    title: "Portal Administrativo",
    tag: "Operação integrada",
    description:
      "Central administrativa com permissões, módulos, relatórios, automações e trilha de eventos.",
    problem: "Equipes precisavam controlar informações em vários fluxos desconectados.",
    solution: "Desenhamos um portal modular para gestão, usuários, logs, automações e relatórios.",
    impact: "Operação mais previsível, com menos retrabalho e mais visibilidade para gestores.",
    metric: "multi-módulos",
    stack: ["TypeScript", "Node.js", "Docker", "APIs"],
    results: ["Gestão por perfis", "Integrações internas", "Logs operacionais"],
    accent: "cyan",
    href: "#contact",
  },
  {
    title: "Dashboards Executivos",
    tag: "Dados em movimento",
    description:
      "Painéis de decisão com métricas, disponibilidade, indicadores e leitura clara de tendências.",
    problem: "Indicadores importantes ficavam escondidos em tabelas, arquivos e ferramentas separadas.",
    solution: "Concentramos dados em painéis visuais com alertas, filtros e leitura executiva.",
    impact: "Gestores enxergam prioridades mais rápido e tomam decisão com menos ruído.",
    metric: "tempo real",
    stack: ["BI", "PostgreSQL", "Cloudflare", "Tailwind"],
    results: ["Indicadores em tempo real", "Alertas acionáveis", "Exportação de relatórios"],
    accent: "white",
    href: "#contact",
  },
  {
    title: "ERP Sabor do Açaí",
    tag: "Sistema empresarial",
    description:
      "ERP real para gestão de vendas, caixa, estoque, relatórios e operação integrada com Supabase.",
    problem: "A rotina comercial precisava de mais controle sobre caixa, estoque e vendas.",
    solution: "Construímos um ERP web com visão administrativa e registros de operação.",
    impact: "Mais organização no dia a dia e leitura mais clara dos números do negócio.",
    metric: "operação centralizada",
    stack: ["JavaScript", "Supabase", "HTML", "CSS"],
    results: ["Dashboard administrativo", "Controle de caixa", "Controle de estoque"],
    accent: "green",
    href: "https://sabordoacai.vercel.app/",
    image: "/projects/sabor-do-acai.png",
  },
  {
    title: "Gesso Infinity",
    tag: "Website corporativo",
    description:
      "Website institucional moderno para empresa de drywall e estruturas metálicas, focado em identidade visual e conversão.",
    problem: "A marca precisava transmitir confiança e apresentar serviços com mais clareza.",
    solution: "Criamos um website responsivo com catálogo, narrativa comercial e contato rápido.",
    impact: "Presença digital mais profissional e caminho mais direto até o WhatsApp.",
    metric: "site responsivo",
    stack: ["HTML", "CSS", "JavaScript", "UI Design"],
    results: ["Design responsivo", "Catálogo de produtos", "Integração WhatsApp"],
    accent: "blue",
    href: "https://gessoinfinity.com.br/",
    image: "/projects/gesso-infinity.png",
  },
  {
    title: "Studio Caty Hair",
    tag: "Website premium",
    description:
      "Site moderno para salão de beleza, com experiência visual premium, hero com vídeo e conversão para atendimento.",
    problem: "O posicionamento visual precisava acompanhar a experiência premium do salão.",
    solution: "Desenvolvemos uma página com impacto visual, serviços e chamada direta para atendimento.",
    impact: "Mais percepção de valor e experiência mais elegante para novos clientes.",
    metric: "experiência premium",
    stack: ["HTML", "CSS", "JavaScript", "UI Design"],
    results: ["Hero com vídeo", "Interface premium", "Integração WhatsApp"],
    accent: "cyan",
    href: "https://catyhair.vercel.app/",
    image: "/projects/studio-caty-hair.png",
  },
  {
    title: "Agência Morus",
    tag: "Marca e presença digital",
    description:
      "Site premium para agência de estratégia, conteúdo e posicionamento, com narrativa forte, serviços e conversão.",
    problem: "A agência precisava apresentar método, autoridade e serviços sem parecer genérica.",
    solution: "Criamos uma presença digital com narrativa de marca, seções comerciais e SEO.",
    impact: "Comunicação mais forte e fluxo de contato mais objetivo para potenciais clientes.",
    metric: "marca posicionada",
    stack: ["Next.js", "UI Design", "SEO", "WhatsApp"],
    results: ["Posicionamento premium", "Seções comerciais completas", "Contato otimizado"],
    accent: "white",
    href: "https://larianemorus.vercel.app/",
    image: "/projects/agencia-morus.png",
  },
  {
    title: "Daniela Peclat",
    tag: "Psicologia e atendimento",
    description:
      "Website profissional para psicóloga, com comunicação acolhedora, SEO local, serviços e agendamento por WhatsApp.",
    problem: "A presença online precisava transmitir acolhimento, confiança e clareza de atendimento.",
    solution: "Criamos um website profissional com serviços, copy humanizada e agendamento.",
    impact: "Mais segurança para quem chega ao site e caminho simples para iniciar contato.",
    metric: "agendamento direto",
    stack: ["Web Design", "SEO", "WhatsApp", "Responsivo"],
    results: ["Atendimento online e presencial", "Copy humanizada", "Fluxo de agendamento"],
    accent: "blue",
    href: "https://danielapeclat.com.br/",
    image: "/projects/daniela-peclat.png",
  },
  {
    title: "Barbearia Ravier",
    tag: "Serviços com agendamento",
    description:
      "Landing page premium para barbearia, com vitrine de serviços, prova social, galeria e agendamento online.",
    problem: "A barbearia precisava converter visitantes em agendamentos com uma experiência melhor.",
    solution: "Criamos uma landing page com serviços, galeria, prova social e chamada para reserva.",
    impact: "Mais clareza comercial e fluxo mais rápido para marcar horário.",
    metric: "conversão local",
    stack: ["Next.js", "UI Design", "Agendamento", "WhatsApp"],
    results: ["Agendamento rápido", "Galeria de trabalhos", "Área administrativa"],
    accent: "cyan",
    href: "https://barbeariaravier.vercel.app/",
    image: "/projects/barbearia-ravier.png",
  },
];

const processSteps = [
  ["01", "Contato", "Entendemos a necessidade e o contexto."],
  ["02", "Planejamento", "Definimos escopo, arquitetura e prioridades."],
  ["03", "Prototipação", "Transformamos ideias em fluxo visual."],
  ["04", "Desenvolvimento", "Construímos com qualidade e versionamento."],
  ["05", "Testes", "Validamos segurança, performance e uso real."],
  ["06", "Entrega", "Publicamos, monitoramos e evoluímos."],
] as const;

const testimonials = [
  {
    quote:
      "A AL Tech entregou um sistema moderno, seguro e acima do que imaginávamos.",
    author: "Secretaria Municipal",
    role: "Projeto público digital",
    project: "Sistema governamental",
    result: "Atendimento mais organizado",
    metric: "4.000+ cadastros",
    initials: "SM",
  },
  {
    quote:
      "Profissionalismo, agilidade e domínio técnico. A experiência parece de empresa grande.",
    author: "Empresa parceira",
    role: "Setor privado",
    project: "Portal administrativo",
    result: "Operação mais clara",
    metric: "multi-módulos",
    initials: "EP",
  },
  {
    quote:
      "O painel trouxe clareza imediata para decisões que antes dependiam de planilhas.",
    author: "Coordenação",
    role: "Assistência Social",
    project: "Dashboard executivo",
    result: "Decisões com dados",
    metric: "tempo real",
    initials: "CO",
  },
  {
    quote:
      "A comunicação ficou muito mais profissional e o caminho até o WhatsApp ficou simples.",
    author: "Negócio local",
    role: "Serviços e agendamento",
    project: "Landing page premium",
    result: "Mais confiança no primeiro acesso",
    metric: "conversão local",
    initials: "NL",
  },
  {
    quote:
      "O visual elevou a percepção da marca sem deixar o site pesado ou confuso.",
    author: "Marca parceira",
    role: "Presença digital",
    project: "Website institucional",
    result: "Marca mais forte",
    metric: "SEO + performance",
    initials: "MP",
  },
];

const testimonialSignals = [
  ["Escopo claro", "O projeto começa com diagnóstico e prioridades bem definidas."],
  ["Interface premium", "Cada tela é pensada para transmitir confiança e facilitar o uso."],
  ["Entrega assistida", "Publicação, ajustes finais e suporte para entrada em produção."],
  ["Evolução contínua", "A solução nasce pronta para receber novos módulos e melhorias."],
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, scale: 0.985, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({
  children,
  className = "",
  onFocusMessage,
}: {
  children: ReactNode;
  className?: string;
  onFocusMessage?: string;
}) {
  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    target.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const onPointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--rx", "0deg");
    target.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.article
      className={`liquid-card ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-focus-message={onFocusMessage}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.article>
  );
}

function Logo({
  onClick,
  compact = false,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <button
      className={`brand-logo ${compact ? "brand-logo-compact" : ""}`}
      onClick={onClick}
      aria-label="AL Tech"
      type="button"
    >
      <span className="brand-mark">
        <span>A</span>
        <span>L</span>
      </span>
      <span className="brand-word">TECH</span>
    </button>
  );
}

function MetricCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.1,
      ease: "easeOut",
      onUpdate: setDisplay,
    });

    return () => controls.stop();
  }, [inView, value]);

  const formatted =
    value >= 100000
      ? `${Math.round(display / 1000)}k`
      : decimals
        ? display.toFixed(decimals)
        : Math.round(display).toLocaleString("pt-BR");

  return (
    <div ref={ref} className="metric-counter">
      <strong>
        {prefix}
        {formatted}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function DeveloperConsole({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="developer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="developer-console"
            initial={{ y: 28, scale: 0.96, filter: "blur(12px)" }}
            animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ y: 20, scale: 0.96, filter: "blur(12px)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Modo desenvolvedor da AL Tech"
          >
            <button className="icon-button console-close" onClick={onClose} type="button">
              <X />
            </button>
            <div className="developer-heading">
              <Command />
              <div>
                <span>Modo Desenvolvedor</span>
                <strong>Você encontrou a sala técnica da AL Tech.</strong>
              </div>
            </div>
            <div className="developer-matrix">
              {[
                ["Deploy", "green", "online"],
                ["GitHub", "blue", "main sincronizada"],
                ["Tecnologias", "blue", "Next.js 16 + TypeScript"],
                ["Roadmap", "white", "Sistemas, Cloud e Produtos Web"],
                ["Build", "green", "performance target 100"],
                ["Segurança", "blue", "observabilidade ativa"],
              ].map(([label, color, value]) => (
                <div key={label} className={`developer-cell ${color}`}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChatDock({
  mood,
  botMessage,
  onOpenMessage,
  muted = false,
}: {
  mood: ALBotMood;
  botMessage: string;
  onOpenMessage: (message: string) => void;
  muted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Olá.\nSou o ALBot.\nPosso ajudar você a encontrar a melhor solução para seu projeto.",
    },
  ]);

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
      return `Para um site profissional, o investimento depende de paginas, identidade visual, copy, SEO, animacoes e integracoes como WhatsApp, Instagram ou painel administrativo. A AL Tech pode montar uma proposta sob medida pelo WhatsApp ${WHATSAPP_DISPLAY}.`;
    }
    if (wantsWebsite) {
      return "Perfeito. A AL Tech pode criar um site moderno, rapido e premium, com estrategia, layout responsivo, SEO, copy, performance e integracao com WhatsApp/Instagram. O proximo passo e entender objetivo, referencias, paginas e prazo para montar uma proposta.";
    }
    if (wantsPrice) {
      return `O investimento depende do escopo, integrações, telas, prazo e nível de automação. Chame a AL Tech no WhatsApp ${WHATSAPP_DISPLAY} para montarmos uma proposta com mais precisão.`;
    }
    if (wantsTiming) {
      return "Um MVP bem definido pode levar de 2 a 6 semanas. Sistemas maiores costumam seguir por fases: descoberta, protótipo, desenvolvimento, testes e entrega assistida.";
    }
    if (hasAny(["cloud", "infra"])) {
      return "Nossa infraestrutura combina cloud, deploy contínuo, monitoramento, segurança, logs e rollback. A ideia é deixar o sistema rápido, rastreável e fácil de evoluir.";
    }
    if (hasAny(["dashboard", "relatorio"])) {
      return "Criamos dashboards com indicadores, filtros, alertas e visualização clara para decisões. O foco é transformar dado bruto em operação acionável.";
    }
    if (hasAny(["governo", "publico"])) {
      return "Para sistemas governamentais, priorizamos segurança, perfis de acesso, auditoria, acessibilidade, relatórios e estabilidade em produção.";
    }
    return `Posso ajudar a identificar a melhor solução para o seu projeto: site premium, sistema web, ERP, dashboard, portal, automação, API ou cloud. Para seguir com um diagnóstico e proposta, fale com a AL Tech pelo WhatsApp ${WHATSAPP_DISPLAY}.`;
  };

  const submit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const question = input.trim();
    if (!question || thinking) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "visitor", text: question },
    ];
    setMessages(nextMessages);
    setInput("");
    setThinking(true);

    try {
      const response = await fetch("/api/albot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-10),
          pageContext: botMessage,
        }),
      });
      const payload = (await response.json()) as { reply?: string };
      setMessages((current) => [
        ...current,
        { role: "bot", text: payload.reply || fallbackAnswer(question) },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "bot", text: fallbackAnswer(question) },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const openChat = () => {
    setOpen(true);
    onOpenMessage("Atendimento aberto. Posso orientar sobre escopo, prazo e orçamento.");
  };

  return (
    <>
      <AnimatePresence>
        {!open && !muted && (
          <motion.button
            className="bot-bubble"
            type="button"
            onClick={openChat}
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            aria-label="Abrir chat com ALBot"
          >
            <ALBotFigure mood={mood} size="sm" />
            <span>{botMessage}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            className="chat-panel"
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            aria-label="Chat do ALBot"
          >
            <div className="chat-header">
              <div>
                <ALBotFigure mood={mood} size="sm" />
                <div>
                  <strong>ALBot</strong>
                  <span>Assistente virtual</span>
                </div>
              </div>
              <button className="icon-button" onClick={() => setOpen(false)} type="button">
                <X />
              </button>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}>
                  {message.text.split("\n").map((line) => (
                    <p key={`${line}-${index}`}>{line}</p>
                  ))}
                </div>
              ))}
              {thinking && (
                <div className="chat-message bot thinking">
                  <p>Estou analisando sua mensagem...</p>
                </div>
              )}
            </div>
            <form className="chat-input" onSubmit={submit}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Digite sua mensagem..."
                aria-label="Mensagem para o ALBot"
                disabled={thinking}
              />
              <button type="submit" aria-label="Enviar mensagem" disabled={thinking}>
                <Send />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  return null;
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function HeroProductShowcase() {
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    target.style.setProperty("--tilt-x", `${(-py * 5.5).toFixed(2)}deg`);
    target.style.setProperty("--tilt-y", `${(px * 7.5).toFixed(2)}deg`);
    target.style.setProperty("--shine-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--shine-y", `${event.clientY - rect.top}px`);
  };

  const onPointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--tilt-x", "0deg");
    target.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className="product-showcase" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="product-aura" />
      <div className="product-grid-lines" />
      <div className="notebook-shell">
        <div className="notebook-screen">
          <div className="saas-interface">
            <aside className="saas-sidebar">
              <div className="saas-brand">
                <span>AL</span>
                <strong>Suite</strong>
              </div>
              {["Visão geral", "Produtos", "Clientes", "Projetos", "Relatórios"].map((item, index) => (
                <span key={item} className={index === 0 ? "active" : ""}>
                  {item}
                </span>
              ))}
              <div className="saas-health">
                <small>Cloud</small>
                <strong>99.9%</strong>
                <em>operacional</em>
              </div>
            </aside>
            <div className="saas-main">
              <header className="saas-header">
                <div>
                  <span>AL Tech Platform</span>
                  <strong>Centro de produtos digitais</strong>
                </div>
                <div className="saas-search">Buscar modulo...</div>
                <div className="saas-user">AA</div>
              </header>

              <div className="saas-metrics">
                {[
                  ["Receita", "R$ 128k", "+12%"],
                  ["Projetos", "24", "+6 ativos"],
                  ["Usuários", "532", "+18 hoje"],
                  ["Performance", "100", "score"],
                ].map(([label, value, trend]) => (
                  <div className="saas-metric" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{trend}</small>
                  </div>
                ))}
              </div>

              <div className="saas-workspace">
                <section className="saas-chart-panel">
                  <div className="panel-title">
                    <span>Performance geral</span>
                    <strong>Deploys, acessos e conversões</strong>
                  </div>
                  <div className="saas-chart" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, index) => (
                      <i key={index} />
                    ))}
                    <div className="chart-line" />
                    <div className="chart-glow" />
                  </div>
                </section>

                <aside className="saas-side-stack">
                  <div className="saas-calendar">
                    <div>
                      <span>Agenda</span>
                      <strong>Julho</strong>
                    </div>
                    <div className="calendar-grid">
                      {Array.from({ length: 21 }, (_, index) => (
                        <span key={index} className={index === 8 || index === 14 ? "marked" : ""} />
                      ))}
                    </div>
                  </div>
                  <div className="saas-users">
                    <span>Equipe ativa</span>
                    {["Design", "Back-end", "Cloud"].map((item, index) => (
                      <div key={item}>
                        <i>{index + 1}</i>
                        <strong>{item}</strong>
                        <em>online</em>
                      </div>
                    ))}
                  </div>
                  <div className="saas-notifications">
                    <span>Atividades recentes</span>
                    {["Novo lead recebido", "Build aprovado", "Deploy publicado"].map((item) => (
                      <strong key={item}>{item}</strong>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="notebook-base" />
      {productCapabilities.map(({ title, description, icon: Icon, className }, index) => (
        <motion.div
          key={title}
          className={`product-chip ${className}`}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: [0, index % 2 === 0 ? -8 : 8, 0], scale: 1 }}
          whileHover={{ y: -8, scale: 1.025 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.24 + index * 0.08 },
            scale: { duration: 0.5, delay: 0.24 + index * 0.08 },
            y: { duration: 5.8 + index * 0.22, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span>
            <Icon />
          </span>
          <strong>{title}</strong>
          <small>{description}</small>
        </motion.div>
      ))}
    </div>
  );
}

function HeroTrustMarquee() {
  const logos = [...trustedCompanies, ...trustedCompanies];

  return (
    <Reveal className="hero-social-proof" delay={0.2}>
      <span>Empresas que confiaram na AL Tech</span>
      <div className="trust-marquee" aria-label="Empresas que confiaram na AL Tech">
        <motion.div
          className="trust-marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {logos.map((company, index) => (
            <div className="trust-logo" key={`${company}-${index}`}>
              <strong>{company}</strong>
            </div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
}

function ProjectMockup({ title }: { title: string }) {
  if (title === "Portal Administrativo") {
    return <AdminPortalMockup />;
  }

  if (title === "Dashboards Executivos") {
    return <ExecutiveDashboardMockup />;
  }

  return (
    <div className="screen-body">
      <div className="screen-sidebar" />
      <div className="screen-chart">
        {Array.from({ length: 9 }).map((_, itemIndex) => (
          <span key={itemIndex} style={{ height: `${28 + itemIndex * 7}%` }} />
        ))}
      </div>
      <div className="screen-cards">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function AdminPortalMockup() {
  return (
    <div className="project-ui project-admin-ui">
      <aside>
        <strong>AL Admin</strong>
        {["Dashboard", "Usuários", "Permissões", "Relatórios", "Logs"].map((item, index) => (
          <span key={item} className={index === 0 ? "active" : ""}>
            {item}
          </span>
        ))}
      </aside>
      <main>
        <div className="admin-hero-row">
          <div>
            <span>Operação</span>
            <strong>Portal Administrativo</strong>
          </div>
          <em>12 aprovações pendentes</em>
        </div>
        <div className="admin-kpis">
          {[
            ["Usuários", "248"],
            ["Permissões", "18"],
            ["Logs", "1.2k"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="admin-work">
          <section className="admin-permissions">
            <span>Gestão de permissões</span>
            {["Administrador", "Analista", "Operador"].map((item, index) => (
              <div key={item}>
                <strong>{item}</strong>
                <i style={{ width: `${86 - index * 16}%` }} />
              </div>
            ))}
          </section>
          <section className="admin-calendar">
            <span>Calendário</span>
            <div>
              {Array.from({ length: 21 }).map((_, index) => (
                <i key={index} className={index === 4 || index === 12 || index === 17 ? "active" : ""} />
              ))}
            </div>
          </section>
        </div>
        <div className="admin-bottom">
          <div>
            <span>Logs recentes</span>
            <strong>Login aprovado</strong>
            <strong>Permissão alterada</strong>
          </div>
          <div>
            <span>Notificações</span>
            <strong>Novo usuário</strong>
            <strong>Relatório gerado</strong>
          </div>
        </div>
      </main>
    </div>
  );
}

function ExecutiveDashboardMockup() {
  return (
    <div className="project-ui executive-dashboard-ui">
      <div className="exec-kpis">
        {[
          ["Receita", "R$ 1.240.000", "↑ 18%"],
          ["Atendimentos", "4.382", "tempo real"],
          ["Pendências", "23", "prioridade"],
        ].map(([label, value, meta]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{meta}</small>
          </div>
        ))}
      </div>
      <div className="exec-grid">
        <section className="exec-line">
          <span>Linha de tendência</span>
          <div>
            {Array.from({ length: 12 }).map((_, index) => (
              <i key={index} style={{ height: `${26 + ((index * 19) % 62)}%` }} />
            ))}
          </div>
        </section>
        <section className="exec-pie">
          <span>Distribuição</span>
          <div />
        </section>
        <section className="exec-map">
          <span>Mapa</span>
          <strong>RJ</strong>
          <i />
        </section>
        <section className="exec-table">
          <span>Indicadores</span>
          {["Recebidos", "Resolvidos", "Aguardando"].map((item, index) => (
            <div key={item}>
              <strong>{item}</strong>
              <i style={{ width: `${74 - index * 14}%` }} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function SystemsSection() {
  return (
    <section id="systems" className="page-section systems-section">
      <Reveal>
        <SectionHeading eyebrow="Sistemas" title="Produtos digitais que organizam operação e geram resultado.">
          A AL Tech constrói interfaces reais para negócios reais: portais, ERPs,
          CRMs, dashboards, landing pages e sistemas governamentais com clareza,
          performance e experiência premium.
        </SectionHeading>
      </Reveal>
      <div className="systems-grid">
        {systemShowcase.map((item, index) => (
          <Reveal key={item.title} delay={(index % 2) * 0.05}>
            <TiltCard className={`system-card ${index === 0 ? "system-card-featured" : ""}`}>
              <div className="system-visual">
                {item.image ? (
                  <img src={item.image} alt={`Interface do projeto ${item.title}`} loading="lazy" />
                ) : (
                  <div className="system-ui-mock">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>{item.result}</strong>
            </TiltCard>
          </Reveal>
        ))}
      </div>
      <Reveal className="outcome-grid">
        {outcomeCards.map(([title, description]) => (
          <div className="outcome-card" key={title}>
            <CheckCircle2 />
            <strong>{title}</strong>
            <span>{description}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function QuoteWizard({
  onPrepared,
}: {
  onPrepared: () => void;
}) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [startMoment, setStartMoment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateService = () => {
    if (service) {
      setErrors((current) => {
        const next = { ...current };
        delete next.service;
        return next;
      });
      return true;
    }

    setErrors((current) => ({
      ...current,
      service: "Escolha uma solução para continuar.",
    }));
    return false;
  };

  const validateDetails = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Informe seu nome para continuarmos.";
    if (!description.trim()) nextErrors.description = "Conte um pouco sobre o projeto.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateService()) return;
    if (step === 1 && !validateDetails()) return;
    setStep((current) => Math.min(current + 1, 2));
  };

  const summary = {
    service,
    name: name.trim(),
    description: description.trim(),
    objective: objective || "Ainda quero definir",
    startMoment: startMoment || "Ainda estou planejando",
  };

  const whatsappMessage = [
    "Olá, Alessandro! Vim pelo site da AL Tech.",
    "",
    `Meu nome é: ${summary.name}`,
    "",
    "Tenho interesse em:",
    summary.service,
    "",
    "Sobre o projeto:",
    summary.description,
    "",
    "Principal objetivo:",
    summary.objective,
    "",
    "Quando gostaria de iniciar:",
    summary.startMoment,
    "",
    "Podemos conversar sobre o projeto?",
  ].join("\n");

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="quote-panel liquid-card">
      <div className="quote-progress" aria-label="Progresso da solicitação">
        {["Serviço", "Detalhes", "Revisão"].map((label, index) => (
          <button
            key={label}
            type="button"
            className={index === step ? "active" : index < step ? "done" : ""}
            onClick={() => {
              if (index === 0 || (index === 1 && service) || (index === 2 && service && validateDetails())) {
                setStep(index);
              }
            }}
          >
            <span>{index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="service"
            className="quote-step"
            initial={{ opacity: 0, x: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.28 }}
          >
            <div className="quote-step-heading">
              <span>Etapa 1</span>
              <h3>Qual solução você precisa?</h3>
              <p>Selecione uma opção para eu preparar o contexto do orçamento.</p>
            </div>
            <div className="quote-service-grid">
              {quoteServices.map(({ label, icon: Icon }) => {
                const selected = service === label;
                return (
                  <button
                    key={label}
                    type="button"
                    className={selected ? "selected" : ""}
                    onClick={() => {
                      setService(label);
                      setErrors((current) => {
                        const next = { ...current };
                        delete next.service;
                        return next;
                      });
                    }}
                  >
                    <Icon />
                    <strong>{label}</strong>
                    <span />
                  </button>
                );
              })}
            </div>
            {errors.service && <p className="field-error">{errors.service}</p>}
            <div className="quote-actions">
              <button className="primary-button" type="button" onClick={nextStep}>
                Continuar <ArrowRight />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="details"
            className="quote-step quote-conversation"
            initial={{ opacity: 0, x: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.28 }}
          >
            <div className="quote-step-heading">
              <span>Etapa 2</span>
              <h3>Conte um pouco sobre seu projeto.</h3>
              <p>Vou transformar sua ideia em uma mensagem clara para o WhatsApp.</p>
            </div>

            <div className="quote-dialog">
              <div className="quote-prompt compact">
                <div>
                  <ALBotFigure mood="contact" size="sm" />
                </div>
                <span>Como podemos chamar você?</span>
                <label>
                  <input
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (event.target.value.trim()) {
                        setErrors((current) => {
                          const next = { ...current };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    placeholder="Seu nome"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <small>{errors.name}</small>}
                </label>
              </div>

              <div className="quote-prompt">
                <span>Sobre o que é seu projeto?</span>
                <label>
                  <textarea
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                      if (event.target.value.trim()) {
                        setErrors((current) => {
                          const next = { ...current };
                          delete next.description;
                          return next;
                        });
                      }
                    }}
                    placeholder="Ex: quero um sistema com login, dashboard, clientes, relatórios e automações..."
                    aria-invalid={Boolean(errors.description)}
                  />
                  {errors.description && <small>{errors.description}</small>}
                </label>
              </div>

              <div className="quote-prompt">
                <span>Qual é o principal objetivo?</span>
                <div className="quote-objective-grid">
                  {projectObjectives.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      className={objective === label ? "selected" : ""}
                      onClick={() => setObjective(label)}
                    >
                      <Icon />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quote-prompt compact">
                <span>Quando gostaria de iniciar?</span>
                <div className="quote-urgency-grid">
                  {startOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={startMoment === item ? "selected" : ""}
                    onClick={() => setStartMoment(item)}
                  >
                    {item}
                  </button>
                ))}
                </div>
              </div>
            </div>

            <div className="quote-actions split">
              <button className="ghost-button" type="button" onClick={() => setStep(0)}>
                Voltar
              </button>
              <button className="primary-button" type="button" onClick={nextStep}>
                Revisar <ArrowRight />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="review"
            className="quote-step"
            initial={{ opacity: 0, x: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.28 }}
          >
            <div className="quote-step-heading">
              <span>Etapa 3</span>
              <h3>Revise antes de abrir o WhatsApp.</h3>
              <p>A mensagem será enviada pronta para uma conversa mais objetiva.</p>
            </div>
            <div className="quote-summary">
              {[
                ["Serviço escolhido", summary.service],
                ["Nome", summary.name],
                ["Descrição", summary.description],
                ["Objetivo", summary.objective],
                ["Início", summary.startMoment],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="quote-preview">
              <span>Mensagem preparada</span>
              <p>{whatsappMessage}</p>
            </div>
            <div className="quote-actions split">
              <button className="ghost-button" type="button" onClick={() => setStep(1)}>
                Voltar e editar
              </button>
              <a
                className="primary-button whatsapp-button"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={onPrepared}
              >
                <span className="whatsapp-mark">W</span>
                Continuar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HomeExperience() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [botMood, setBotMood] = useState<ALBotMood>("home");
  const [botMessage, setBotMessage] = useState("Precisa de uma solução digital? Posso ajudar.");
  const [devOpen, setDevOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [contactActive, setContactActive] = useState(false);
  const [testimonialsActive, setTestimonialsActive] = useState(false);
  const logoClicks = useRef(0);
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 110]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AL Tech",
      url: "https://altech.dev",
      logo: "https://altech.dev/favicon.svg",
      description:
        "Desenvolvimento de sistemas web, automações, dashboards, cloud, infraestrutura e consultoria tecnológica.",
      sameAs: ["https://www.instagram.com/altech.dev/"],
      founder: {
        "@type": "Person",
        name: "Alessandro Araujo",
        jobTitle: "Fundador e desenvolvedor",
        image: "https://altech.dev/alessandro-araujo.jpg",
      },
      areaServed: "Brasil",
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    }),
    [],
  );

  useEffect(() => {
    const root = document.documentElement;
    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const lookX = ((x / window.innerWidth) - 0.5) * 10;
      const lookY = ((y / window.innerHeight) - 0.5) * 7;
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
      root.style.setProperty("--look-x", `${lookX.toFixed(2)}px`);
      root.style.setProperty("--look-y", `${lookY.toFixed(2)}px`);
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    let active = true;
    let context: { revert: () => void } | undefined;

    const loadMotion = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!active) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".float-layer").forEach((layer, index) => {
          gsap.to(layer, {
            yPercent: index % 2 === 0 ? -8 : 8,
            ease: "none",
            scrollTrigger: {
              trigger: layer,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      }, mainRef);
    };

    void loadMotion();

    return () => {
      active = false;
      context?.revert();
    };
  }, []);

  useEffect(() => {
    let buffer = "";
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-6);
      if (buffer.includes("altech")) {
        setDevOpen(true);
        setBotMood("developer");
        setBotMessage("Você encontrou o modo desenvolvedor.");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const contact = document.querySelector("#contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactActive(Boolean(entry?.isIntersecting)),
      { threshold: 0.22 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const testimonialsSection = document.querySelector(".testimonials-section");
    if (!testimonialsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setTestimonialsActive(Boolean(entry?.isIntersecting)),
      { threshold: 0.28 },
    );
    observer.observe(testimonialsSection);
    return () => observer.disconnect();
  }, []);

  const onLogoClick = () => {
    logoClicks.current += 1;
    if (logoTimer.current) clearTimeout(logoTimer.current);
    logoTimer.current = setTimeout(() => {
      logoClicks.current = 0;
    }, 1300);
    if (logoClicks.current >= 5) {
      logoClicks.current = 0;
      setDevOpen(true);
      setBotMood("developer");
      setBotMessage("Você encontrou o modo desenvolvedor.");
    }
  };

  return (
    <main ref={mainRef} className="site-shell">
      <PWARegister />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mouse-glow" aria-hidden="true" />
      <CommandMap />

      <header className="site-nav">
        <Logo onClick={onLogoClick} />
        <nav className={navOpen ? "open" : ""} aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setNavOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-quote" href="#contact">
            Orçamento
          </a>
          <button
            className="icon-button nav-menu"
            type="button"
            onClick={() => setNavOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      <section id="home" className="hero-section">
        <motion.div className="hero-orbit float-layer" style={{ y: heroY }} />
        <div className="hero-content">
          <Reveal className="hero-copy">
            <div className="hero-kicker">
              <span />
              Desenvolvimento de produtos digitais
            </div>
            <h1>
              Sistemas, websites e plataformas que <span>impulsionam negócios.</span>
            </h1>
            <p>
              A AL Tech projeta, desenvolve, implanta e mantém soluções digitais completas
              para empresas que precisam de design, tecnologia, segurança e escala.
            </p>
            <div className="hero-actions">
              <a className="primary-button magnet-button" href="#projects">
                Ver Projetos <ArrowRight />
              </a>
              <a className="ghost-button magnet-button" href="#contact">
                Solicitar Orçamento <ChevronRight />
              </a>
            </div>
            <div className="status-strip">
              {heroFeatures.map(({ label, icon: Icon }) => (
                <span key={label}>
                  <Icon /> {label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="hero-stage" delay={0.12}>
            <HeroProductShowcase />
          </Reveal>
        </div>
        <HeroTrustMarquee />
      </section>

      <section id="about" className="page-section founder-section">
        <Reveal className="founder-grid">
          <TiltCard className="founder-portrait-card">
            <div className="founder-photo-frame">
              <img src="/alessandro-araujo.jpg" alt="Retrato de Alessandro Araujo" />
            </div>
            <div className="founder-photo-meta">
              <span>Alessandro Araujo</span>
              <strong>Fundador / Desenvolvedor</strong>
            </div>
          </TiltCard>
          <div className="founder-copy">
            <span>Por trás da AL Tech</span>
            <h2>Uma empresa de tecnologia com rosto, estratégia e responsabilidade.</h2>
            <p>
              Sou Alessandro Araujo, fundador da AL Tech. Minha missão é transformar
              ideias em sites, sistemas e automações com visual premium, performance
              real e estrutura pronta para crescer.
            </p>
            <p>
              A AL Tech nasce dessa mistura entre design, código limpo e visão de
              negócio: tecnologia bonita por fora, sólida por dentro e simples de usar
              para quem precisa operar todos os dias.
            </p>
            <div className="founder-highlights">
              <span>
                <Code2 /> Desenvolvimento sob medida
              </span>
              <span>
                <ShieldCheck /> Entrega segura e organizada
              </span>
              <span>
                <Sparkles /> Experiência premium e humana
              </span>
            </div>
            <div className="founder-actions">
              <a className="primary-button magnet-button" href="#projects">
                Ver projetos <ArrowRight />
              </a>
              <a className="ghost-button magnet-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Falar com Alessandro <ChevronRight />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <SystemsSection />

      <section id="services" className="page-section">
        <Reveal>
          <SectionHeading eyebrow="Serviços" title="Cada entrega resolve um problema de negócio.">
            O foco não é acumular tecnologia. É criar produtos digitais que reduzem
            atrito, aumentam controle, melhoram a percepção da marca e ajudam a operação a crescer.
          </SectionHeading>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(index % 4) * 0.04}>
                <TiltCard className="service-card">
                  <div className="service-card-head">
                    <Icon />
                    <span>{service.result}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-proof">
                    <small>Resolve</small>
                    <strong>{service.problem}</strong>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="projects" className="page-section">
        <Reveal>
          <SectionHeading eyebrow="Cases" title="Projetos tratados como produto, não como peça de portfólio.">
            Cada entrega começa com um problema concreto, passa por estratégia,
            interface e desenvolvimento, e termina em impacto mensurável para o negócio.
          </SectionHeading>
        </Reveal>
        <div className="project-carousel case-grid">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <TiltCard className={`project-card project-${project.accent}`}>
                <div className="project-screen">
                  <div className="screen-topbar">
                    <span />
                    <span />
                    <span />
                    <strong>{project.title}</strong>
                  </div>
                  {project.image ? (
                    <img
                      className="project-shot"
                      src={project.image}
                      alt={`Screenshot do projeto ${project.title}`}
                      loading="lazy"
                    />
                  ) : (
                    <ProjectMockup title={project.title} />
                  )}
                </div>
                <span className="project-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="case-breakdown">
                  <div>
                    <span>Problema</span>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <span>Solução</span>
                    <p>{project.solution}</p>
                  </div>
                  <div>
                    <span>Impacto</span>
                    <p>{project.impact}</p>
                  </div>
                </div>
                <ul>
                  {project.results.map((result) => (
                    <li key={result}>
                      <CheckCircle2 /> {result}
                    </li>
                  ))}
                </ul>
                <div className="project-footer">
                  <div>
                    <strong>{project.metric}</strong>
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    target={project.href.startsWith("http") ? "_blank" : undefined}
                    rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {project.href.startsWith("http") ? "Ver projeto" : "Detalhes"} <ExternalLink />
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="numbers-section" aria-label="Números da AL Tech">
        <Reveal className="numbers-grid">
          <MetricCounter value={10} prefix="+" label="Projetos concluídos" />
          <MetricCounter value={100} suffix="%" label="Foco em entrega sob medida" />
          <MetricCounter value={11} label="Frentes de solução digital" />
          <MetricCounter value={99.9} suffix="%" decimals={1} label="Disponibilidade como meta" />
          <MetricCounter value={5} prefix="+" label="Segmentos atendidos" />
        </Reveal>
      </section>

      <section id="technologies" className="page-section tech-section">
        <Reveal>
          <SectionHeading eyebrow="Tecnologias" title="Stack moderna, escolhida para sustentar bons produtos.">
            A tecnologia aparece como base de confiança: performance, segurança,
            manutenção e evolução contínua para sites, sistemas e plataformas web.
          </SectionHeading>
        </Reveal>
        <Reveal className="tech-wall tech-wall-compact">
          {techs.map(([name, initials, description], index) => (
            <TiltCard key={name} className="tech-tile">
              <div className="tech-orb" style={{ animationDelay: `${index * 90}ms` }}>
                {initials}
              </div>
              <strong>{name}</strong>
              <span>{description}</span>
            </TiltCard>
          ))}
        </Reveal>
      </section>

      <section id="process" className="page-section process-section">
        <Reveal>
          <SectionHeading eyebrow="Método" title="Do primeiro contato ao sistema em produção.">
            Um processo claro, visual e organizado para transformar ideia em entrega
            sem perder sofisticação pelo caminho.
          </SectionHeading>
        </Reveal>
        <Reveal className="process-timeline">
          {processSteps.map(([number, title, description], index) => (
            <div className="process-step" key={title}>
              <div>
                {index === 0 ? <MessageSquare /> : index === 5 ? <Rocket /> : <Waypoints />}
              </div>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="page-section testimonials-section">
        <Reveal>
          <SectionHeading eyebrow="Confiança" title="O que nossos clientes dizem.">
            Mais do que elogios: sinais de clareza, organização, acabamento e impacto
            percebido em projetos digitais reais.
          </SectionHeading>
        </Reveal>
        <TestimonialSlider />
      </section>

      <section id="contact" className="contact-section">
        <Reveal className="contact-grid">
          <div className="contact-copy">
            <span>Solicitação de orçamento</span>
            <h2>Vamos tirar sua ideia do papel?</h2>
            <p>
              Uma triagem rápida, consultiva e direta. Você escolhe a solução,
              conta sua ideia e recebe uma conversa pronta para falar com a AL Tech.
            </p>
            <div className="contact-flow">
              {[
                "Escolha a solução.",
                "Conte sua ideia.",
                "Receba uma conversa pronta no WhatsApp.",
                "Nós analisamos seu projeto.",
                "Você recebe uma proposta personalizada.",
              ].map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <div className="contact-direct">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <Phone /> {WHATSAPP_DISPLAY}
              </a>
              <a href="https://www.instagram.com/altech.dev/" target="_blank" rel="noreferrer">
                <AtSign /> @altech.dev
              </a>
              <span>
                <Globe2 /> Remoto - Brasil
              </span>
              <span>
                <Clock3 /> Seg - Sex
              </span>
            </div>
            <div className="contact-bot-note">
              <ALBotFigure mood="contact" size="sm" />
              <span>Escolha uma solução e eu preparo sua conversa com a AL Tech.</span>
            </div>
          </div>
          <QuoteWizard
            onPrepared={() => {
              setBotMood("contact");
              setBotMessage("Mensagem preparada para o WhatsApp. Agora é só continuar a conversa.");
            }}
          />
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="digital-city" aria-hidden="true">
          {["Sistemas", "Web", "ERP", "Dados", "API", "Cloud", "BI"].map((label, index) => (
            <div
              className="city-building"
              key={label}
              style={{ "--h": `${72 + (index % 4) * 34}px` } as React.CSSProperties}
            >
              <span>{label}</span>
              {Array.from({ length: 12 }).map((_, windowIndex) => (
                <i key={windowIndex} />
              ))}
            </div>
          ))}
        </div>
        <div className="footer-trust">
          {trustBadges.map((badge) => (
            <span key={badge}>
              <CheckCircle2 /> {badge}
            </span>
          ))}
        </div>
        <div className="footer-grid">
          <div>
            <Logo compact />
            <p>Transformando ideias em soluções digitais de alto impacto.</p>
            <div className="footer-socials">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp da AL Tech">
                <Phone />
              </a>
              <a href="https://www.instagram.com/altech.dev/" target="_blank" rel="noreferrer" aria-label="Instagram da AL Tech">
                <AtSign />
              </a>
              <a href="mailto:contato.altechdev@gmail.com" aria-label="E-mail da AL Tech">
                <Mail />
              </a>
            </div>
          </div>
          <div>
            <strong>Navegação</strong>
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <strong>Serviços</strong>
            {services.slice(0, 5).map((service) => (
              <a key={service.title} href="#services">
                {service.title}
              </a>
            ))}
          </div>
          <div>
            <strong>Legal</strong>
            <a href="#home">Política de Privacidade</a>
            <a href="#home">Termos de Uso</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AL Tech. Todos os direitos reservados.</span>
          <span>Desenvolvido com estratégia, código limpo e tecnologia.</span>
        </div>
      </footer>

      <ChatDock
        mood={botMood}
        botMessage={botMessage}
        onOpenMessage={(message) => setBotMessage(message)}
        muted={contactActive || testimonialsActive}
      />
      <DeveloperConsole open={devOpen} onClose={() => setDevOpen(false)} />
    </main>
  );
}

function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((current) => (current + 1) % testimonials.length),
      4200,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Reveal className="testimonial-shell">
      <div className="testimonial-feature">
        <AnimatePresence mode="wait">
          <motion.div
            className="testimonial-card"
            key={index}
            initial={{ opacity: 0, x: 34, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -34, filter: "blur(12px)" }}
            transition={{ duration: 0.45 }}
          >
            <div className="testimonial-top">
              <span>{active.initials}</span>
              <div>
                <strong>{active.author}</strong>
                <small>{active.role}</small>
              </div>
              <Sparkles />
            </div>
            <p>“{active.quote}”</p>
            <div className="testimonial-meta">
              <span>{active.project}</span>
              <span>{active.result}</span>
              <span>{active.metric}</span>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="testimonial-proof">
          <span>O que costuma aparecer nas entregas</span>
          {testimonialSignals.map(([title, description]) => (
            <div key={title}>
              <CheckCircle2 />
              <strong>{title}</strong>
              <small>{description}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="testimonial-dots">
        {testimonials.map((testimonial, dotIndex) => (
          <button
            key={testimonial.author}
            className={dotIndex === index ? "active" : ""}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`Ver depoimento ${dotIndex + 1}`}
          />
        ))}
      </div>
      <div className="testimonial-mini-grid">
        {testimonials.slice(0, 4).map((testimonial, testimonialIndex) => (
          <button
            key={`${testimonial.author}-${testimonial.project}`}
            type="button"
            className={testimonialIndex === index ? "active" : ""}
            onClick={() => setIndex(testimonialIndex)}
          >
            <span>{testimonial.initials}</span>
            <strong>{testimonial.project}</strong>
            <small>{testimonial.result}</small>
          </button>
        ))}
      </div>
    </Reveal>
  );
}
