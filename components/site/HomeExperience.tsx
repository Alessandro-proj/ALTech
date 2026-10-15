"use client";

import {
  ArrowRight,
  AtSign,
  BarChart3,
  Blocks,
  Check,
  CheckCircle2,
  Clock3,
  Cloud,
  Code2,
  ExternalLink,
  Globe2,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Pause,
  Phone,
  Play,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Service = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  size: "large" | "medium" | "small" | "wide";
};

type ProjectItem = {
  title: string;
  tag: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  metric: string;
  metricLabel: string;
  href?: string;
  image: string;
  accent: string;
};

type ChatMessage = {
  role: "assistant" | "visitor";
  text: string;
};

const WHATSAPP_NUMBER = "5521971266237";
const WHATSAPP_DISPLAY = "+55 21 97126-6237";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const CONTACT_EMAIL_USER = "contato.altechdev";
const CONTACT_EMAIL_DOMAIN = "gmail.com";
const CONTACT_EMAIL = `${CONTACT_EMAIL_USER}@${CONTACT_EMAIL_DOMAIN}`;
const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL_USER}%40${CONTACT_EMAIL_DOMAIN}`;

const onMagneticMove = (event: PointerEvent<HTMLAnchorElement>) => {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--button-x", `${(event.clientX - bounds.left - bounds.width / 2) * 0.18}px`);
  event.currentTarget.style.setProperty("--button-y", `${(event.clientY - bounds.top - bounds.height / 2) * 0.3}px`);
};

const onMagneticLeave = (event: PointerEvent<HTMLAnchorElement>) => {
  event.currentTarget.style.setProperty("--button-x", "0px");
  event.currentTarget.style.setProperty("--button-y", "0px");
};

const navItems = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "A AL Tech", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

const trustItems = [
  "Prefeitura de Belford Roxo",
  "Studio Caty Hair",
  "Morus Agência",
  "Gesso Infinity",
  "Ravier Barbearia",
  "Daniela Peclat",
] as const;

const projects: ProjectItem[] = [
  {
    title: "CMIPcD",
    tag: "Governo digital · Case em destaque",
    description:
      "Sistema para emissão, análise e gestão da Carteira Municipal da Pessoa com Deficiência.",
    problem: "O atendimento precisava sair do fluxo manual e ganhar rastreabilidade.",
    solution: "Plataforma com cadastro, análise, permissões e painel administrativo.",
    impact: "Processo público mais organizado, mensurável e simples de acompanhar.",
    metric: "Integração",
    metricLabel: "cadastro, análise e emissão",
    href: "https://carteirapcd.prefeituradebelfordroxo.rj.gov.br/",
    image: "/projects/cmipcd.png",
    accent: "#1f5fff",
  },
  {
    title: "Studio Caty Hair",
    tag: "Beleza · Site profissional",
    description:
      "Experiência digital para traduzir o posicionamento premium do salão e facilitar o atendimento.",
    problem: "A presença online não acompanhava o nível da experiência entregue no espaço.",
    solution: "Página visual, responsiva e organizada em torno dos serviços e do agendamento.",
    impact: "Mais percepção de valor e um caminho direto para novos atendimentos.",
    metric: "Premium",
    metricLabel: "experiência de marca",
    href: "https://catyhair.vercel.app/",
    image: "/projects/studio-caty-hair.png",
    accent: "#e0489a",
  },
  {
    title: "Morus Agência",
    tag: "Marketing · Site institucional",
    description:
      "Site para uma agência de estratégia, conteúdo e posicionamento com uma narrativa própria.",
    problem: "A marca precisava comunicar método e autoridade sem parecer genérica.",
    solution: "Arquitetura editorial, direção visual forte, SEO e fluxo claro até o contato.",
    impact: "Posicionamento mais consistente e apresentação comercial mais objetiva.",
    metric: "Clareza",
    metricLabel: "na jornada comercial",
    href: "https://larianemorus.vercel.app/",
    image: "/projects/agencia-morus.png",
    accent: "#7c5cff",
  },
  {
    title: "Gesso Infinity",
    tag: "Construção · Site institucional",
    description:
      "Presença digital para apresentar serviços de drywall e estruturas metálicas com confiança.",
    problem: "Os serviços precisavam ficar mais claros para acelerar novos orçamentos.",
    solution: "Catálogo organizado, narrativa comercial e contato direto pelo WhatsApp.",
    impact: "Uma apresentação profissional que reduz atrito na decisão do cliente.",
    metric: "Direto",
    metricLabel: "do serviço ao orçamento",
    href: "https://gessoinfinity.com.br/",
    image: "/projects/gesso-infinity.png",
    accent: "#f59e0b",
  },
  {
    title: "Ravier Barbearia",
    tag: "Barbearia · Site profissional",
    description:
      "Site de posicionamento para uma barbearia que precisava transformar estilo em presença digital.",
    problem: "A experiência da marca existia no espaço físico, mas ainda não aparecia online.",
    solution: "Direção visual, serviços, identidade e chamada clara para atendimento.",
    impact: "Uma presença mais coerente com o público e com a personalidade da barbearia.",
    metric: "Autoral",
    metricLabel: "presença digital",
    image: "/projects/barbearia-ravier.png",
    accent: "#10b981",
  },
  {
    title: "Daniela Peclat",
    tag: "Psicologia · Site profissional",
    description:
      "Website acolhedor para apresentar o trabalho da psicóloga e facilitar o primeiro contato.",
    problem: "A presença online precisava transmitir segurança antes da conversa inicial.",
    solution: "Copy humanizada, estrutura de serviços, SEO local e agendamento pelo WhatsApp.",
    impact: "Uma jornada mais tranquila para quem procura atendimento psicológico.",
    metric: "Humana",
    metricLabel: "experiência de contato",
    href: "https://danielapeclat.com.br/",
    image: "/projects/daniela-peclat.png",
    accent: "#0ea5e9",
  },
  {
    title: "ERP Sabor do Açaí",
    tag: "Gestão · Sistema empresarial",
    description:
      "ERP web para vendas, caixa, estoque, relatórios e acompanhamento da operação.",
    problem: "A rotina comercial precisava de mais controle sobre números e registros.",
    solution: "Plataforma administrativa conectada ao fluxo real do negócio.",
    impact: "Mais organização no dia a dia e leitura mais clara da operação.",
    metric: "Central",
    metricLabel: "operação organizada",
    href: "https://sabordoacai.vercel.app/",
    image: "/projects/sabor-do-acai.png",
    accent: "#f97316",
  },
];

const services: Service[] = [
  {
    title: "Sistemas sob medida",
    description: "Portais, ERPs, CRMs e plataformas web criados em torno do fluxo real da operação.",
    detail: "Para sair de planilhas, mensagens soltas e processos manuais.",
    icon: Blocks,
    size: "large",
  },
  {
    title: "Websites profissionais",
    description: "Sites institucionais, landing pages e experiências digitais com narrativa, estética e caminho claro até o contato.",
    detail: "Para marcas que precisam parecer tão fortes quanto o que entregam.",
    icon: Globe2,
    size: "medium",
  },
  {
    title: "Sistemas governamentais",
    description: "Permissões, rastreabilidade, auditoria, relatórios e estabilidade para atendimento público.",
    detail: "Organização e segurança para fluxos de alta responsabilidade.",
    icon: ShieldCheck,
    size: "small",
  },
  {
    title: "Dashboards e dados",
    description: "Painéis executivos, indicadores e relatórios para transformar informação em decisão.",
    detail: "Leitura clara do negócio, sem ruído.",
    icon: BarChart3,
    size: "small",
  },
  {
    title: "Automações e integrações",
    description: "APIs, rotinas automáticas e conexões entre ferramentas para reduzir retrabalho e erro.",
    detail: "Mais tempo para o que exige decisão humana.",
    icon: Workflow,
    size: "small",
  },
  {
    title: "Cloud e sustentação",
    description: "Para crescer sem transformar manutenção em dor de cabeça.",
    detail: "Infraestrutura preparada para crescer com estabilidade.",
    icon: Cloud,
    size: "wide",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Descoberta",
    description: "Entendemos objetivo, público, operação, urgência e pontos de atrito.",
  },
  {
    number: "02",
    title: "Estratégia",
    description: "Organizamos escopo, arquitetura, conteúdo, prioridades e direção visual.",
  },
  {
    number: "03",
    title: "Construção",
    description: "Transformamos a direção em telas, integrações e produto funcional.",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Publicamos, testamos, ajustamos e deixamos a solução pronta para uso.",
  },
  {
    number: "05",
    title: "Evolução",
    description: "Acompanhamos estabilidade, melhorias e próximos passos do produto.",
  },
] as const;

const quoteServices = [
  { label: "Site profissional", icon: MonitorSmartphone },
  { label: "Landing page", icon: Sparkles },
  { label: "Sistema sob medida", icon: Code2 },
  { label: "Dashboard", icon: BarChart3 },
  { label: "Automação", icon: Workflow },
  { label: "Loja virtual", icon: ShoppingBag },
  { label: "Portal", icon: Globe2 },
  { label: "API / integração", icon: Workflow },
  { label: "Outro projeto", icon: Sparkles },
] as const;

const strengths = [
  ["Fundador e desenvolvedor", "Atendimento direto e personalizado, sem intermediários."],
  ["Do planejamento ao lançamento", "Processos ágeis e transparentes em cada etapa."],
  ["Soluções sob medida", "Desenvolvimento focado no que realmente importa para você."],
  ["Segurança", "Seus dados protegidos com as melhores práticas."],
  ["Responsivo e rápido", "Experiência perfeita em qualquer dispositivo, com performance."],
  ["Suporte próximo", "Acompanhamento sempre que você precisar."],
] as const;

const technologies = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Cloudflare",
  "Docker",
  "Tailwind",
] as const;

function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  return null;
}

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const reduceMotion = useReducedMotion();
  const initial =
    direction === "left"
      ? { opacity: 0, x: -28 }
      : direction === "right"
        ? { opacity: 0, x: 28 }
        : direction === "scale"
          ? { opacity: 0, y: 14, scale: 0.985 }
          : { opacity: 0, y: 26 };

  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reduceMotion ? false : initial}
      whileInView={
        reduceMotion
          ? undefined
          : direction === "left" || direction === "right"
            ? { opacity: 1, x: 0 }
            : direction === "scale"
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.18, margin: "-72px 0px" }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Logo() {
  return (
    <a className="brand-logo" href="#inicio" aria-label="AL Tech - início">
      <span className="brand-mark">AL</span>
      <span className="brand-copy">
        <strong>AL Tech</strong>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("inicio");
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["inicio", ...navItems.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) requestAnimationFrame(() => navRef.current?.querySelector("a")?.focus());
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 821px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className={`site-header ${progress > 0.01 ? "scrolled" : ""}`}>
      <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="nav-bar">
        <Logo />
        <nav
          ref={navRef}
          id="primary-navigation"
          className={open ? "open" : ""}
          aria-label="Navegação principal"
        >
          {navItems.filter((item) => item.href !== "#contato").map((item) => {
            const current = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={current ? "active" : ""}
                aria-current={current ? "page" : undefined}
                onClick={() => {
                  if (open) closeMenu();
                }}
              >
                {item.label}
              </a>
            );
          })}
          <Link href="/minha-historia" onClick={() => { if (open) closeMenu(); }}>Minha história</Link>
        </nav>
        <a className="nav-cta" href="#contato">
          Orçamento <ArrowRight aria-hidden="true" />
        </a>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function HeroDashboard() {
  const [statusIndex, setStatusIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const statuses = [
    ["Em análise", "Solicitação em análise"],
    ["Aprovada", "Solicitação aprovada"],
    ["Em análise", "Nova solicitação recebida"],
  ] as const;

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(
      () => setStatusIndex((current) => (current + 1) % statuses.length),
      2800,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion, statuses.length]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--dashboard-ry", `${(-8 + x * 14).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--dashboard-rx", `${(4 - y * 12).toFixed(2)}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--dashboard-ry", "-8deg");
    event.currentTarget.style.setProperty("--dashboard-rx", "4deg");
  };

  return (
    <div className="hero-dashboard-wrap" onPointerMove={onPointerMove} onPointerLeave={resetTilt}>
      <div className="hero-dashboard">
        <div className="browser-bar" aria-hidden="true">
          <span /><span /><span />
          <p>carteirapcd.prefeituradebelfordroxo.rj.gov.br</p>
        </div>
        <div className="dashboard-body">
          <aside aria-hidden="true">
            <i className="selected" /><i /><i /><i />
          </aside>
          <div className="dashboard-content">
            <span className="dashboard-workflow-label">Fluxo de atendimento</span>
            <div className="dashboard-workflow" aria-label="Cadastro, análise e emissão">
              <div><MonitorSmartphone aria-hidden="true" /><span>Cadastro</span></div>
              <ArrowRight className="workflow-arrow" aria-hidden="true" />
              <div><ShieldCheck aria-hidden="true" /><span>Análise</span></div>
              <ArrowRight className="workflow-arrow" aria-hidden="true" />
              <div><CheckCircle2 aria-hidden="true" /><span>Emissão</span></div>
            </div>
            <div className="dashboard-rows">
              <div><span>Revisão de solicitação</span><b className="approved">Aprovada</b></div>
              <div>
                <span>Análise de documento</span>
                <b className={statuses[statusIndex][0] === "Aprovada" ? "approved" : ""}>
                  {statuses[statusIndex][0]}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="dashboard-caption">Visão ilustrativa do painel CMIPcD</span>
      <div className="dashboard-float system-float">
        <strong>CMIPcD</strong>
        <span>Atendimento municipal</span>
      </div>
      <div className="dashboard-float status-float">
        <i aria-hidden="true" />
        <span>{statuses[statusIndex][1]}</span>
      </div>
      <div className="dashboard-float product-float">
        <div className="identity-preview" aria-hidden="true">
          <i />
          <div><s /><s /><s /></div>
        </div>
        <small>Carteira Municipal da Pessoa com Deficiência</small>
      </div>
    </div>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion();
  const title = "Tecnologia com propósito. Estratégia que gera resultados.";

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <section id="inicio" className="hero-section" onPointerMove={onPointerMove}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-grid spotlight-grid" aria-hidden="true" />
      <div className="section-wrap hero-layout">
        <div className="hero-copy">
          <span className="hero-status"><i /> Estúdio de desenvolvimento digital, atendimento para todo o Brasil</span>
          <h1 aria-label={title}>
            {title.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className={`hero-word ${index > 2 ? "accent-word" : ""}`} aria-hidden="true">
                  <span style={{ "--word-index": index } as CSSProperties}>{word}</span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p>
            A AL Tech une visão de negócio, design e desenvolvimento para criar sites,
            sistemas e plataformas que organizam processos e fortalecem marcas.
            {" "}Nosso case mais forte é o CMIPcD, usado pela Prefeitura de Belford Roxo.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projetos" onPointerMove={onMagneticMove} onPointerLeave={onMagneticLeave}>
              Ver o case CMIPcD <ArrowRight />
            </a>
            <a className="button button-ghost" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onPointerMove={onMagneticMove} onPointerLeave={onMagneticLeave}>
              Falar no WhatsApp
            </a>
          </div>
          <div className="hero-checks">
            <span><CheckCircle2 /> Atendimento direto com o fundador</span>
            <span><CheckCircle2 /> Do planejamento ao lançamento</span>
            <span><CheckCircle2 /> Suporte e evolução contínua</span>
          </div>
        </div>
        <Reveal className="hero-media" direction="right" delay={0.12}>
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Marcas e projetos do portfólio">
      <p>Projetos e marcas que passaram pela AL Tech</p>
      <div className="trust-marquee">
        {[...trustItems, ...trustItems].map((item, index) => (
          <span key={`${item}-${index}`} aria-hidden={index >= trustItems.length ? "true" : undefined}>
            {item}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const project = projects[activeIndex];
  const playing = autoplay && !hovered && !focused && inView && !reduceMotion;

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % projects.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [playing]);

  const selectProject = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  const onTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % projects.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + projects.length) % projects.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = projects.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    selectProject(nextIndex);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[nextIndex]?.focus();
  };

  const isExternal = project.href?.startsWith("http");

  return (
    <section ref={sectionRef} id="projetos" className="projects-section">
      <div className="section-wrap">
        <Reveal>
          <SectionHeading eyebrow="Projetos" title="Cases reais, um de cada vez">
            Contexto do problema, a solução construída e o impacto de cada entrega.
          </SectionHeading>
        </Reveal>

        <Reveal className="projects-layout" direction="scale" delay={0.08}>
          <div ref={tabsRef} className="project-tabs" role="tablist" aria-label="Projetos da AL Tech">
            {projects.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`project-tab-${index}`}
                aria-controls="project-panel"
                aria-selected={index === activeIndex}
                tabIndex={index === activeIndex ? 0 : -1}
                className={index === activeIndex ? "active" : ""}
                onClick={() => selectProject(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <strong>{item.title}</strong>
                <span>{item.tag.split(" · ")[0]}</span>
                {index === activeIndex && autoplay && !reduceMotion && (
                  <i style={{ animationPlayState: playing ? "running" : "paused" }} />
                )}
              </button>
            ))}
          </div>

          <div
            className="project-stage-shell"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
            }}
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${activeIndex}`}
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={project.title}
                className="project-stage"
                style={{ "--project-accent": project.accent } as CSSProperties}
                initial={reduceMotion ? false : { opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-info">
                  <span>{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <dl>
                    <div><dt>Problema</dt><dd>{project.problem}</dd></div>
                    <div><dt>Solução</dt><dd>{project.solution}</dd></div>
                    <div><dt>Impacto</dt><dd>{project.impact}</dd></div>
                  </dl>
                  <div className="project-result">
                    <strong>{project.metric}</strong>
                    <span>{project.metricLabel}</span>
                  </div>
                  <a
                    className="button button-blue"
                    href={project.href ?? "#contato"}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                  >
                    {project.href ? "Ver projeto" : "Quero algo assim"}
                    {project.href ? <ExternalLink /> : <ArrowRight />}
                  </a>
                </div>
                <div className="project-preview">
                  <div className="browser-bar" aria-hidden="true">
                    <span /><span /><span />
                    <p>{project.href ? new URL(project.href).hostname : project.title}</p>
                  </div>
                  <div className="project-image">
                    <Image
                      src={project.image}
                      alt={`Projeto ${project.title}`}
                      fill
                      loading="eager"
                      sizes="(max-width: 900px) 92vw, 45vw"
                    />
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
            {!reduceMotion && <button
              className="project-playback"
              type="button"
              onClick={() => setAutoplay((value) => !value)}
              aria-label={autoplay ? "Pausar troca automática" : "Retomar troca automática"}
            >
              {autoplay ? <Pause /> : <Play />}
            </button>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection() {
  const reduceMotion = useReducedMotion();
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <section id="servicos" className="services-section">
      <div className="section-wrap">
        <Reveal>
          <SectionHeading eyebrow="O que fazemos" title="Estrutura digital para marcas, operações e produtos">
            Cada entrega nasce de uma necessidade concreta: vender melhor, organizar processos,
            criar autoridade, medir resultados ou sustentar crescimento.
          </SectionHeading>
        </Reveal>
        <div className="services-grid">
          {services.map(({ title, description, detail, icon: Icon, size }, index) => (
            <Reveal key={title} className={`service-item ${size}`} delay={index * 0.05}>
              <article className={`service-card ${size}`} onPointerMove={onPointerMove}>
                <Icon aria-hidden="true" />
                <div className="service-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                {(size === "large" || size === "medium") && <span>{detail}</span>}
                {title === "Sistemas governamentais" && (
                  <a href="#projetos">Veja o CMIPcD <ArrowRight /></a>
                )}
                {title === "Dashboards e dados" && (
                  <div className="service-chart" aria-hidden="true">
                    {[38, 62, 48, 82, 100].map((height) => <i key={height} style={{ height: `${height}%` }} />)}
                  </div>
                )}
                {size === "wide" && (
                  <div className="service-tags" aria-label="Recursos de cloud e sustentação">
                    <b>Deploy</b><b>Monitoramento</b><b>Infraestrutura</b><b>Evolução contínua</b>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSteps, setActiveSteps] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      const bounds = track.getBoundingClientRect();
      const progress = reduceMotion
        ? 1
        : Math.min(Math.max((window.innerHeight * 0.78 - bounds.top) / (bounds.height * 0.9), 0), 1);
      track.style.setProperty("--process-progress", String(progress));
      setActiveSteps(Math.min(5, Math.floor(progress * 5 + 0.6)));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  return (
    <section id="processo" className="process-section">
      <div className="section-wrap">
        <Reveal>
          <SectionHeading eyebrow="Processo" title="Um caminho simples para decisões melhores" />
        </Reveal>
        <div ref={trackRef} className="process-track">
          <div className="process-line" aria-hidden="true"><i /></div>
          {processSteps.map((step, index) => (
            <article key={step.title} className={`process-step ${index < activeSteps ? "active" : ""}`}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="about-section">
      <div className="section-wrap about-layout">
        <Reveal className="about-copy" direction="left">
          <h2>Pequena o suficiente para cuidar de perto, técnica o bastante para construir grande.</h2>
          <div className="strength-grid">
            {strengths.map(([title, description]) => (
              <article key={title}>
                <Check aria-hidden="true" />
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal className="founder-card" direction="right" delay={0.08}>
          <div className="founder-avatar" aria-hidden="true">AA</div>
          <div className="founder-copy">
            <h3>Alessandro Araujo, fundador</h3>
            <p>
              Eu uno visão de negócio, design e desenvolvimento para criar soluções digitais que
              façam sentido para quem compra, para quem usa e para quem precisa manter tudo rodando.
            </p>
            <div className="tech-list">
              {technologies.map((technology) => <b key={technology}>{technology}</b>)}
            </div>
            <Link className="founder-story-link" href="/minha-historia">Conheça minha história <ArrowRight aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  const [service, setService] =
    useState<(typeof quoteServices)[number]["label"]>(quoteServices[0].label);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const whatsappHref = useMemo(() => {
    const message = [
      "Olá, Alessandro! Vim pelo site da AL Tech.",
      "",
      `Tenho interesse em: ${service}`,
      `Meu nome é: ${name.trim() || "Não informado"}`,
      "",
      "Sobre o projeto:",
      description.trim() || "Quero conversar para entender o melhor caminho.",
    ].join("\n");
    return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  }, [description, name, service]);

  return (
    <section id="contato" className="contact-section">
      <div className="section-wrap contact-layout">
        <Reveal className="contact-copy">
          <h2>Conte o momento do seu negócio. A gente transforma isso em direção.</h2>
          <p>
            A primeira conversa serve para entender o objetivo e indicar o melhor caminho:
            site, sistema, dashboard, automação ou evolução de algo que você já tem.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onPointerMove={onMagneticMove} onPointerLeave={onMagneticLeave}>
              Chamar no WhatsApp <ArrowRight />
            </a>
            <a className="button button-ghost" href="https://www.instagram.com/altech.dev/" target="_blank" rel="noreferrer" onPointerMove={onMagneticMove} onPointerLeave={onMagneticLeave}>
              @altech.dev no Instagram
            </a>
          </div>
          <small>{WHATSAPP_DISPLAY} · Seg a Sex</small>
        </Reveal>

        <details className="contact-details">
        <summary>Detalhar meu projeto</summary>
        <div className="contact-panel">
          <span>Qual solução você precisa?</span>
          <div className="solution-picker" role="group" aria-label="Tipo de solução">
            {quoteServices.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className={service === label ? "selected" : ""}
                onClick={() => setService(label)}
                aria-pressed={service === label}
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <label>
            Como podemos chamar você?
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome" maxLength={80} />
          </label>
          <label>
            Conte um pouco sobre o projeto
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Objetivo, ideia ou problema que precisa resolver..."
              maxLength={1200}
            />
          </label>
          <a className="button button-primary contact-submit" href={whatsappHref} target="_blank" rel="noreferrer">
            Iniciar conversa <ArrowRight />
          </a>
          <div className="contact-links">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Phone /> {WHATSAPP_DISPLAY}</a>
            <a href="https://www.instagram.com/altech.dev/" target="_blank" rel="noreferrer"><AtSign /> @altech.dev</a>
            <a href={CONTACT_EMAIL_URL} aria-label={`Enviar e-mail para ${CONTACT_EMAIL}`}>
              <Mail /> <span>{CONTACT_EMAIL_USER}<span aria-hidden="true">@</span>{CONTACT_EMAIL_DOMAIN}</span>
            </a>
            <span><Clock3 /> Seg a Sex, 09h às 18h</span>
          </div>
        </div>
        </details>
      </div>
    </section>
  );
}

function ChatDock() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Olá. Posso ajudar a encontrar o melhor caminho para o seu projeto." },
  ]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => launcherRef.current?.focus());
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, thinking, open]);

  const fallbackAnswer = (question: string) => {
    const text = question.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (text.includes("site") || text.includes("landing")) {
      return "Para site ou landing page, começamos pelo objetivo: apresentar autoridade, captar contatos ou vender. A AL Tech pode cuidar de estratégia, visual, SEO e integração com WhatsApp.";
    }
    if (text.includes("sistema") || text.includes("erp") || text.includes("dashboard")) {
      return "Para sistemas e dashboards, o primeiro passo é mapear usuários, telas, dados e decisões. A partir disso definimos uma primeira versão objetiva e evoluímos por fases.";
    }
    if (text.includes("preco") || text.includes("valor") || text.includes("orcamento")) {
      return `O investimento depende do escopo, telas, integrações e prazo. Para estimar com precisão, chame no WhatsApp ${WHATSAPP_DISPLAY}.`;
    }
    return `Posso orientar entre site, sistema, dashboard, automação, API ou cloud. Para um diagnóstico direto, fale com a AL Tech pelo WhatsApp ${WHATSAPP_DISPLAY}.`;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || thinking) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "visitor", text: question }];
    setMessages(nextMessages);
    setInput("");
    setThinking(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/albot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-10).map((message) => ({
            role: message.role === "visitor" ? "visitor" : "bot",
            text: message.text,
          })),
          pageContext: "Visitante navegando pela nova Home da AL Tech",
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("albot_request_failed");
      const payload = (await response.json()) as { reply?: string };
      setMessages((current) => [...current, { role: "assistant", text: payload.reply || fallbackAnswer(question) }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: fallbackAnswer(question) }]);
    } finally {
      clearTimeout(timeout);
      setThinking(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            className="chat-bubble"
            type="button"
            onClick={() => setOpen(true)}
            ref={launcherRef}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
            aria-label="Abrir atendimento da AL Tech"
          >
            <MessageCircle /> <span>Falar com a AL Tech</span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="chat-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            role="dialog"
            aria-modal="false"
            aria-labelledby="chat-title"
          >
            <div className="chat-header">
              <div><strong id="chat-title">ALBot · AL Tech</strong><span>Assistente virtual</span></div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fechar atendimento"><X /></button>
            </div>
            <div ref={messagesRef} className="chat-messages" role="log" aria-live="polite" aria-busy={thinking}>
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}>
                  <p>{message.text}</p>
                </div>
              ))}
              {thinking && <div className="chat-message assistant muted"><p>Analisando sua mensagem...</p></div>}
            </div>
            <form className="chat-input" onSubmit={submit}>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Digite sua mensagem..."
                aria-label="Mensagem para a AL Tech"
                disabled={thinking}
                maxLength={1000}
              />
              <button type="submit" aria-label="Enviar mensagem" disabled={thinking || !input.trim()}><Send /></button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-layout">
        <span>© 2026 AL Tech. Todos os direitos reservados.</span>
        <span>Rio de Janeiro, Brasil · Projetos em todo o Brasil</span>
      </div>
    </footer>
  );
}

export function HomeExperience() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AL Tech",
      url: "https://altechweb.com.br",
      logo: "https://altechweb.com.br/favicon.svg",
      description: "Desenvolvimento de sites, sistemas, plataformas, dashboards e automações.",
      sameAs: ["https://www.instagram.com/altech.dev/"],
      founder: {
        "@type": "Person",
        name: "Alessandro Araujo",
        jobTitle: "Fundador e desenvolvedor",
      },
      areaServed: "Brasil",
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.description },
      })),
    }),
    [],
  );

  return (
    <main className="site-shell">
      <PWARegister />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <HeroSection />
      <TrustStrip />
      <ProjectShowcase />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ChatDock />
    </main>
  );
}
