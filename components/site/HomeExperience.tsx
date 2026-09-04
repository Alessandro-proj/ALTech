"use client";

import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  BadgeCheck,
  BriefcaseBusiness,
  Cable,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  Clock3,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Globe2,
  Headphones,
  Home,
  LayoutGrid,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  PencilLine,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  UserRound,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  type ReactNode,
  type FormEvent,
  type PointerEvent,
  type TouchEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  proof: string;
};

type ProjectItem = {
  title: string;
  tag: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  metric: string;
  stack: string[];
  href: string;
  image: string;
};

type ChatMessage = {
  role: "assistant" | "visitor";
  text: string;
};

const WHATSAPP_NUMBER = "5521972714119";
const WHATSAPP_DISPLAY = "+55 21 97271-4119";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const navItems = [
  { label: "Sobre", href: "#sobre", icon: Home },
  { label: "Serviços", href: "#servicos", icon: LayoutGrid },
  { label: "Projetos", href: "#projetos", icon: BriefcaseBusiness },
  { label: "Processo", href: "#processo", icon: Workflow },
  { label: "Contato", href: "#contato", icon: Mail },
] as const;

const heroHighlights: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Segurança",
    text: "Seus dados protegidos com as melhores práticas",
    icon: ShieldCheck,
  },
  {
    title: "Design responsivo",
    text: "Experiência perfeita em qualquer dispositivo",
    icon: MonitorSmartphone,
  },
  {
    title: "Performance",
    text: "Sites rápidos, otimizados e eficientes",
    icon: Zap,
  },
  {
    title: "Suporte próximo",
    text: "Acompanhamento e suporte sempre que precisar",
    icon: Headphones,
  },
];

const trustItems: { label: string; mark: string; href?: string }[] = [
  {
    label: "Prefeitura de Belford Roxo",
    mark: "BR",
    href: "https://prefeituradebelfordroxo.rj.gov.br/",
  },
  { label: "Studio Caty Hair", mark: "CH" },
  { label: "Morus Agência", mark: "MO" },
  { label: "Gesso Infinity", mark: "GI" },
  { label: "Ravier Barbearia", mark: "RV" },
  { label: "Daniela Peclat", mark: "DP" },
] as const;

const services: Service[] = [
  {
    title: "Websites premium",
    description:
      "Sites institucionais, landing pages e experiências digitais com narrativa, estética e caminho claro até o contato.",
    icon: MonitorSmartphone,
    proof: "Para marcas que precisam parecer tão fortes quanto o que entregam.",
  },
  {
    title: "Sistemas sob medida",
    description:
      "Portais, ERPs, CRMs e plataformas web criados em torno do fluxo real da operação.",
    icon: Code2,
    proof: "Para sair de planilhas, mensagens soltas e processos manuais.",
  },
  {
    title: "Dashboards e dados",
    description:
      "Painéis executivos, indicadores, filtros e relatórios para transformar informação em decisão.",
    icon: ChartNoAxesCombined,
    proof: "Para gestores que precisam enxergar o negócio sem ruído.",
  },
  {
    title: "Automações e integrações",
    description:
      "APIs, rotinas automáticas e conexões entre ferramentas para reduzir retrabalho e erro operacional.",
    icon: Workflow,
    proof: "Para equipes que perdem tempo repetindo tarefas previsíveis.",
  },
  {
    title: "Sistemas governamentais",
    description:
      "Soluções com permissões, rastreabilidade, auditoria, relatórios e estabilidade para atendimento público.",
    icon: ShieldCheck,
    proof: "Para fluxos que precisam de organização, segurança e clareza.",
  },
  {
    title: "Cloud e sustentação",
    description:
      "Deploy, monitoramento, infraestrutura e evolução contínua para manter produtos digitais saudáveis.",
    icon: Cloud,
    proof: "Para crescer sem transformar manutenção em dor de cabeça.",
  },
];

const projects: ProjectItem[] = [
  {
    title: "CMIPcD",
    tag: "Governo digital",
    description:
      "Sistema para emissão, análise e gestão da Carteira Municipal da Pessoa com Deficiência.",
    problem:
      "O atendimento precisava sair do fluxo manual e ganhar rastreabilidade.",
    solution:
      "Criamos uma plataforma com cadastro, análise, permissões e painel administrativo.",
    impact:
      "Processo público mais organizado, mensurável e simples de acompanhar.",
    metric: "4.000+ cadastros",
    stack: ["Next.js", "PostgreSQL", "Cloud", "BI"],
    href: "https://carteirapcd.prefeituradebelfordroxo.rj.gov.br/",
    image: "/projects/cmipcd.png",
  },
  {
    title: "Agência Morus",
    tag: "Presença digital",
    description:
      "Site premium para agência de estratégia, conteúdo e posicionamento.",
    problem:
      "A marca precisava comunicar método e autoridade sem parecer genérica.",
    solution:
      "Desenvolvemos uma presença digital com narrativa forte, SEO e conversão.",
    impact:
      "Comunicação mais clara e fluxo de contato mais objetivo para novos clientes.",
    metric: "marca posicionada",
    stack: ["Next.js", "UI Design", "SEO", "WhatsApp"],
    href: "https://larianemorus.vercel.app/",
    image: "/projects/agencia-morus.png",
  },
  {
    title: "Daniela Peclat",
    tag: "Psicologia e atendimento",
    description:
      "Website profissional para psicóloga, com comunicação acolhedora e SEO local.",
    problem:
      "A presença online precisava transmitir confiança antes do primeiro contato.",
    solution:
      "Criamos copy humanizada, estrutura de serviços e agendamento pelo WhatsApp.",
    impact:
      "Experiência mais segura para quem chega ao site e precisa iniciar cuidado.",
    metric: "agendamento direto",
    stack: ["Web Design", "SEO", "WhatsApp", "Responsivo"],
    href: "https://danielapeclat.com.br/",
    image: "/projects/daniela-peclat.png",
  },
  {
    title: "ERP Sabor do Açaí",
    tag: "Sistema empresarial",
    description:
      "ERP web para vendas, caixa, estoque, relatórios e operação integrada.",
    problem:
      "A rotina comercial precisava de mais controle sobre números e registros.",
    solution:
      "Construímos uma plataforma administrativa conectada ao fluxo do negócio.",
    impact:
      "Mais organização no dia a dia e leitura mais clara da operação.",
    metric: "operação centralizada",
    stack: ["JavaScript", "Supabase", "HTML", "CSS"],
    href: "https://sabordoacai.vercel.app/",
    image: "/projects/sabor-do-acai.png",
  },
  {
    title: "Gesso Infinity",
    tag: "Website corporativo",
    description:
      "Site institucional para empresa de drywall e estruturas metálicas.",
    problem:
      "A empresa precisava apresentar serviços com mais clareza e confiança.",
    solution:
      "Organizamos catálogo, narrativa comercial e contato rápido pelo WhatsApp.",
    impact:
      "Presença digital mais profissional e caminho direto para orçamento.",
    metric: "site responsivo",
    stack: ["HTML", "CSS", "JavaScript", "UI Design"],
    href: "https://gessoinfinity.com.br/",
    image: "/projects/gesso-infinity.png",
  },
  {
    title: "Studio Caty Hair",
    tag: "Website premium",
    description:
      "Página moderna para salão de beleza com experiência visual e conversão.",
    problem:
      "O posicionamento digital precisava acompanhar a experiência premium do salão.",
    solution:
      "Criamos uma página com impacto visual, serviços e chamada direta para atendimento.",
    impact:
      "Mais percepção de valor e experiência elegante para novos clientes.",
    metric: "experiência premium",
    stack: ["HTML", "CSS", "JavaScript", "UI Design"],
    href: "https://catyhair.vercel.app/",
    image: "/projects/studio-caty-hair.png",
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
    description: "Organizamos escopo, arquitetura, conteúdo, prioridades e caminho visual.",
  },
  {
    number: "03",
    title: "Construção",
    description: "Transformamos direção em telas, integrações e produto funcional.",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Publicamos, testamos, ajustamos e deixamos a solução pronta para uso.",
  },
  {
    number: "05",
    title: "Evolução",
    description: "Acompanhamos melhorias, estabilidade e próximos passos do produto.",
  },
] as const;

const workModes = [
  {
    title: "Presença digital",
    description:
      "Para marcas que precisam de site, landing page, posicionamento, SEO e conversão.",
    icon: Globe2,
    items: ["Estratégia de página", "Design premium", "WhatsApp e SEO"],
  },
  {
    title: "Sistema sob medida",
    description:
      "Para negócios que precisam controlar processos, usuários, dados, vendas ou atendimento.",
    icon: Code2,
    items: ["Escopo funcional", "Painel administrativo", "Banco de dados e APIs"],
  },
  {
    title: "Evolução contínua",
    description:
      "Para quem já tem produto digital e precisa melhorar experiência, estabilidade ou escala.",
    icon: ChartNoAxesCombined,
    items: ["Diagnóstico técnico", "Melhorias por fase", "Deploy e sustentação"],
  },
] as const;

const techs = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Cloudflare",
  "Docker",
  "Tailwind",
] as const;

const quoteServices: { label: string; icon: LucideIcon }[] = [
  { label: "Site profissional", icon: MonitorSmartphone },
  { label: "Landing page", icon: Sparkles },
  { label: "Sistema sob medida", icon: Code2 },
  { label: "Dashboard", icon: ChartNoAxesCombined },
  { label: "Automação", icon: Workflow },
  { label: "Loja virtual", icon: ShoppingBag },
  { label: "Portal", icon: Globe2 },
  { label: "API / integração", icon: Cable },
  { label: "Outro", icon: BriefcaseBusiness },
];

const aboutPrinciples: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Estratégia",
    text: "Entendemos o objetivo e definimos o melhor caminho para chegar lá.",
    icon: Target,
  },
  {
    title: "Design",
    text: "Clareza visual, foco no usuário e identidade que transmite confiança.",
    icon: PencilLine,
  },
  {
    title: "Engenharia",
    text: "Código limpo, performance e soluções feitas para escalar com segurança.",
    icon: Code2,
  },
];

function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  return null;
}

function useActiveSection() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const ids = ["inicio", ...navItems.map(({ href }) => href.replace("#", ""))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0.12, 0.3, 0.55] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.68,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  const distance = direction === "up" ? 28 : 30;
  const initial =
    direction === "left"
      ? { opacity: 0, x: -distance }
      : direction === "right"
        ? { opacity: 0, x: distance }
        : direction === "scale"
          ? { opacity: 0, y: 18, scale: 0.985 }
          : { opacity: 0, y: distance };
  const animate =
    direction === "left" || direction === "right"
      ? { opacity: 1, x: 0 }
      : direction === "scale"
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : initial}
      whileInView={reduceMotion ? undefined : animate}
      viewport={{ once: true, amount: 0.22, margin: "-96px 0px -80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Logo() {
  return (
    <a className="brand-logo" href="#inicio" aria-label="AL Tech">
      <span className="brand-mark">
        A<b>L</b>
      </span>
      <span>
        <strong>AL Tech</strong>
        <small>Desenvolvimento digital</small>
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-bar">
        <Logo />
        <nav className={open ? "open" : ""} aria-label="Navegação principal">
          {navItems.map(({ label, href, icon: Icon }) => {
            const id = href.replace("#", "");
            const activeItem = active === id;

            return (
              <a
                key={label}
                href={href}
                className={activeItem ? "active" : ""}
                aria-current={activeItem ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </a>
            );
          })}
        </nav>
        <a className="nav-cta" href="#contato">
          Orçamento <ArrowRight />
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual hero-stack-visual" aria-label="Estrutura digital da AL Tech">
      <div className="hero-ambient-grid" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-stack" aria-hidden="true">
        <span className="hero-stack-layer stack-base" />
        <span className="hero-stack-layer stack-mid" />
        <span className="hero-stack-layer stack-top" />
      </div>
      <div className="hero-info-card founder-card">
        <UserRound />
        <div>
          <strong>Fundador e desenvolvedor</strong>
          <span>Atendimento direto e personalizado</span>
        </div>
      </div>
      <div className="hero-info-card launch-card">
        <Rocket />
        <div>
          <strong>Do planejamento ao lançamento</strong>
          <span>Processos ágeis e transparentes</span>
        </div>
      </div>
      <div className="hero-info-card solution-card">
        <Code2 />
        <div>
          <strong>Soluções sob medida</strong>
          <span>Desenvolvimento focado no que realmente importa para você</span>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-inner">
        <Reveal className="hero-copy">
          <span className="eyebrow">Atendimento remoto para todo o Brasil</span>
          <h1>
            Tecnologia com propósito. <span>Estratégia que gera resultados.</span>
          </h1>
          <p>
            Desenvolvemos sites, sistemas e plataformas digitais pensados para
            otimizar processos, fortalecer marcas e transformar ideias em soluções
            reais.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contato">
              Quero tirar minha ideia do papel <ArrowRight />
            </a>
            <a className="secondary-button" href="#projetos">
              Ver projetos <ArrowRight />
            </a>
          </div>
        </Reveal>
        <Reveal className="hero-media" delay={0.08}>
          <HeroVisual />
        </Reveal>
        <Reveal className="hero-feature-bar" delay={0.12}>
          {heroHighlights.map(({ title, text, icon: Icon }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Projetos e marcas do portfólio">
      <span>Projetos e marcas que passaram pela AL Tech</span>
      <div>
        {trustItems.map((item) => (
          item.href ? (
            <a
              key={item.label}
              className="trust-item"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <small>{item.mark}</small>
              <strong>{item.label}</strong>
            </a>
          ) : (
            <article key={item.label} className="trust-item">
              <small>{item.mark}</small>
              <strong>{item.label}</strong>
            </article>
          )
        ))}
      </div>
    </section>
  );
}

function ProblemSection() {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const painPoints = [
    {
      icon: MonitorSmartphone,
      title: "Presença sem força",
      text: "O site parece genérico e não passa o valor real da marca.",
    },
    {
      icon: Send,
      title: "Operação espalhada",
      text: "A operação depende de planilhas, mensagens e retrabalho.",
    },
    {
      icon: Database,
      title: "Dados sem leitura",
      text: "Os dados existem, mas não viram decisão com clareza.",
    },
  ];

  return (
    <section className="problem-section">
      <Reveal className="problem-copy" direction="left">
        <span className="eyebrow">Talvez sua empresa esteja aqui</span>
        <h2>
          Você tem uma boa entrega, mas sua estrutura digital ainda não mostra isso.
        </h2>
      </Reveal>
      <Reveal className="problem-stack" direction="right" delay={0.08}>
        {painPoints.map(({ icon: Icon, title, text }, index) => (
          <motion.article
            key={title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.42, margin: "-80px 0px -60px" }}
            transition={{ duration: 0.54, delay: index * 0.08, ease }}
          >
            <Icon />
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </motion.article>
        ))}
      </Reveal>
    </section>
  );
}

function AboutSection() {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="sobre" className="about-section">
      <div className="about-layout">
        <Reveal className="about-portrait" direction="left" delay={0.04}>
          <Image
            src="/alessandro-araujo.jpg"
            alt="Retrato de Alessandro Araujo"
            fill
            sizes="(max-width: 820px) 92vw, 40vw"
          />
          <span className="portrait-chip">
            <BadgeCheck />
            Fundador
          </span>
          <div className="portrait-label">
            <span>Alessandro Araujo</span>
            <strong>Fundador da AL Tech</strong>
            <i aria-hidden="true" />
            <p>
              Estratégia, design e tecnologia para criar soluções que geram
              impacto.
            </p>
          </div>
        </Reveal>
        <Reveal className="about-story" direction="right" delay={0.1}>
          <span className="eyebrow">Sobre a AL Tech</span>
          <h2>
            Uma empresa pequena o suficiente para cuidar de perto, técnica o
            bastante para construir <span>grande.</span>
          </h2>
          <i className="about-title-line" aria-hidden="true" />
          <p>
            Sou Alessandro Araujo, fundador da AL Tech. Eu uno visão de negócio,
            design e desenvolvimento para criar soluções digitais que façam sentido
            para quem compra, para quem usa e para quem precisa manter tudo rodando.
          </p>
          <p>
            A ideia não é empilhar tecnologia. É entender o problema, escolher o
            caminho certo e entregar uma experiência que pareça simples, mesmo quando
            existe muita engenharia por trás.
          </p>
          <div className="working-principles">
            {aboutPrinciples.map(({ title, text, icon: Icon }, index) => (
              <motion.article
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3, margin: "-80px 0px -60px" }}
                transition={{ duration: 0.58, delay: 0.12 + index * 0.09, ease }}
              >
                <Icon aria-hidden="true" />
                <div>
                  <span>{title}</span>
                  <p>{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicos" className="services-section">
      <Reveal direction="left">
        <SectionHeading
          eyebrow="O que fazemos"
          title="Estrutura digital para marcas, operações e produtos."
        >
          Cada entrega nasce de uma necessidade concreta: vender melhor, organizar
          processos, criar autoridade, medir resultados ou sustentar crescimento.
        </SectionHeading>
      </Reveal>
      <div className="service-bento">
        {services.map(({ title, description, icon: Icon, proof }, index) => (
          <Reveal key={title} delay={0.08 + index * 0.085} duration={0.62}>
            <article className={`service-card ${index < 2 ? "wide" : ""}`}>
              <div className="service-icon">
                <Icon />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <strong>{proof}</strong>
              <a href="#contato" aria-label={`Conversar sobre ${title}`}>
                <ArrowRight />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const project = projects[activeIndex];

  const goTo = (index: number) => {
    const nextIndex = (index + projects.length) % projects.length;
    setActiveIndex(nextIndex);
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrevious = () => goTo(activeIndex - 1);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [activeIndex, paused, reduceMotion]);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) > 42) {
      if (distance < 0) goNext();
      else goPrevious();
    }

    touchStartX.current = null;
  };

  return (
    <section id="projetos" className="projects-section">
      <Reveal direction="left">
        <SectionHeading
          eyebrow="Projetos"
          title="Cases reais, vistos um por vez."
        >
          O portfólio aparece em foco: uma tela grande, contexto do problema e o
          impacto de cada entrega sem transformar a página em uma lista infinita.
        </SectionHeading>
      </Reveal>

      <Reveal className="carousel-shell" direction="scale" delay={0.08} duration={0.72}>
        <div
          className="case-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            className="carousel-button previous"
            type="button"
            onClick={goPrevious}
            aria-label="Ver projeto anterior"
          >
            <ArrowLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.article
              key={project.title}
              className="case-slide"
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                className="case-preview"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ver projeto ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  fill
                  unoptimized
                  sizes="(max-width: 820px) 92vw, 58vw"
                />
              </a>
              <div className="case-content">
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <dl>
                  <div>
                    <dt>Problema</dt>
                    <dd>{project.problem}</dd>
                  </div>
                  <div>
                    <dt>Solução</dt>
                    <dd>{project.solution}</dd>
                  </div>
                  <div>
                    <dt>Impacto</dt>
                    <dd>{project.impact}</dd>
                  </div>
                </dl>
                <strong>{project.metric}</strong>
                <div className="stack-list" aria-label="Tecnologias utilizadas">
                  {project.stack.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </div>
                <a className="case-link" href={project.href} target="_blank" rel="noreferrer">
                  Ver projeto <ExternalLink />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>

          <button
            className="carousel-button next"
            type="button"
            onClick={goNext}
            aria-label="Ver próximo projeto"
          >
            <ArrowRight />
          </button>
        </div>

        <div className="carousel-meta">
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div aria-label="Selecionar projeto">
            {projects.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index === activeIndex ? "active" : ""}
                onClick={() => goTo(index)}
                aria-label={`Ver case ${item.title}`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function WorkModesSection() {
  const reduceMotion = useReducedMotion();

  const onSectionPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || window.innerWidth < 821) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    event.currentTarget.style.setProperty("--stack-parallax-top-x", `${(x * 7).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--stack-parallax-top-y", `${(y * 6).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--stack-parallax-mid-x", `${(x * 5).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--stack-parallax-mid-y", `${(y * 4).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--stack-parallax-base-x", `${(x * 3).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--stack-parallax-base-y", `${(y * 2.5).toFixed(2)}px`);
  };

  const onSectionPointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--stack-parallax-top-x", "0px");
    event.currentTarget.style.setProperty("--stack-parallax-top-y", "0px");
    event.currentTarget.style.setProperty("--stack-parallax-mid-x", "0px");
    event.currentTarget.style.setProperty("--stack-parallax-mid-y", "0px");
    event.currentTarget.style.setProperty("--stack-parallax-base-x", "0px");
    event.currentTarget.style.setProperty("--stack-parallax-base-y", "0px");
  };

  const copyEase = [0.2, 0.8, 0.2, 1] as const;
  const viewport = { once: true, margin: "-80px" };

  return (
    <section
      className="work-modes-section"
      onPointerMove={onSectionPointerMove}
      onPointerLeave={onSectionPointerLeave}
    >
      <div className="work-start-head">
        <div className="section-heading work-mode-heading">
          <motion.span
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: copyEase }}
          >
            Formas de começar
          </motion.span>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.68, delay: 0.08, ease: copyEase }}
          >
            Uma estrutura para cada momento do negócio.
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.62, delay: 0.16, ease: copyEase }}
          >
            O escopo final é personalizado depois do diagnóstico, mas estes são os
            caminhos mais comuns para iniciar com clareza.
          </motion.p>
        </div>
        <motion.div
          className="stack-visual"
          initial={reduceMotion ? false : { opacity: 0, x: 25, scale: 0.97 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.72, delay: 0.18, ease: copyEase }}
        >
          <div className="stack-layer top">
            <Rocket />
          </div>
          <div className="stack-layer middle" />
          <div className="stack-layer base" />
        </motion.div>
      </div>

      <div className="work-mode-grid">
        {workModes.map(({ title, description, icon: Icon, items }, index) => (
          <Reveal key={title} delay={index * 0.1}>
            <article>
              <Icon />
              <h3>{title}</h3>
              <p>{description}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <CheckCircle2 />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contato">
                Conversar sobre isso <ArrowRight />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="processo" className="process-section">
      <Reveal direction="left">
        <SectionHeading
          eyebrow="Processo"
          title="Um caminho simples para decisões melhores."
          align="center"
        >
          A estrutura fica leve para o cliente porque as decisões são organizadas
          antes, durante e depois do desenvolvimento.
        </SectionHeading>
      </Reveal>
      <Reveal className="timeline" direction="scale" delay={0.08} duration={0.72}>
        {processSteps.map((step, index) => (
          <article key={step.title}>
            <span>{step.number}</span>
            <i aria-hidden="true" />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index < processSteps.length - 1 && <b aria-hidden="true" />}
          </article>
        ))}
      </Reveal>
    </section>
  );
}

function TechSection() {
  return (
    <section className="tech-section">
      <Reveal direction="left">
        <span className="eyebrow">Base técnica</span>
        <h2>A tecnologia aparece como sustentação, não como fantasia.</h2>
      </Reveal>
      <Reveal className="tech-list" direction="scale" delay={0.06}>
        {techs.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </Reveal>
    </section>
  );
}

function ContactSection() {
  const [service, setService] = useState(quoteServices[0].label);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const whatsappHref = useMemo(() => {
    const message = [
      "Olá, Alessandro! Vim pelo site da AL Tech.",
      "",
      `Tenho interesse em: ${service}`,
      "",
      `Meu nome é: ${name.trim() || "Não informado"}`,
      "",
      "Sobre o projeto:",
      description.trim() || "Quero conversar para entender o melhor caminho.",
      "",
      "Podemos conversar sobre o projeto?",
    ].join("\n");

    return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  }, [description, name, service]);

  return (
    <section id="contato" className="contact-section">
      <Reveal className="contact-copy" direction="left">
        <span className="eyebrow">Vamos conversar?</span>
        <h2>
          Conte o momento do seu negócio. A gente transforma isso em direção.
        </h2>
        <p>
          A primeira conversa serve para entender o objetivo, organizar prioridades
          e indicar o melhor caminho: site, sistema, dashboard, automação ou evolução
          de algo que já existe.
        </p>
        <div className="contact-links">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <Phone /> {WHATSAPP_DISPLAY}
          </a>
          <a href="https://www.instagram.com/altech.dev/" target="_blank" rel="noreferrer">
            <AtSign /> @altech.dev
          </a>
          <a href="mailto:contato.altechdev@gmail.com">
            <Mail /> contato.altechdev@gmail.com
          </a>
          <span>
            <Clock3 /> Seg - Sex
          </span>
        </div>
      </Reveal>

      <Reveal className="contact-panel" direction="right" delay={0.08}>
        <div className="solution-picker">
          <span>Qual solução você precisa?</span>
          <div>
            {quoteServices.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className={service === label ? "selected" : ""}
                onClick={() => setService(label)}
              >
                <Icon />
                <strong>{label}</strong>
                {service === label && <Check />}
              </button>
            ))}
          </div>
        </div>
        <div className="contact-fields">
          <label>
            Como podemos chamar você?
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
            />
          </label>
          <label>
            Sobre o que é seu projeto?
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ex: quero um sistema com login, clientes, relatórios e automações..."
            />
          </label>
        </div>
        <a className="primary-button contact-submit" href={whatsappHref} target="_blank" rel="noreferrer">
          Iniciar conversa <ArrowRight />
        </a>
      </Reveal>
    </section>
  );
}

function ChatDock() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Olá. Posso te ajudar a entender qual solução combina com o seu projeto.",
    },
  ]);

  const fallbackAnswer = (question: string) => {
    const text = question
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (text.includes("site") || text.includes("landing")) {
      return "Para site ou landing page, vale começar pelo objetivo: vender, apresentar autoridade, captar contatos ou agendar. A AL Tech pode cuidar da estratégia, visual, copy, SEO e integração com WhatsApp.";
    }

    if (text.includes("sistema") || text.includes("erp") || text.includes("dashboard")) {
      return "Para sistemas e dashboards, o primeiro passo é mapear usuários, telas, dados e decisões que precisam ficar mais claras. Depois disso dá para definir uma primeira versão enxuta e evoluir por fases.";
    }

    if (text.includes("preco") || text.includes("valor") || text.includes("orçamento") || text.includes("orcamento")) {
      return `O investimento depende de escopo, telas, integrações e prazo. Para estimar com mais precisão, chame no WhatsApp ${WHATSAPP_DISPLAY} e conte um pouco do projeto.`;
    }

    return `Posso orientar entre site, sistema, dashboard, automação, API ou cloud. Para um diagnóstico direto, fale com a AL Tech pelo WhatsApp ${WHATSAPP_DISPLAY}.`;
  };

  const submit = async (event?: FormEvent<HTMLFormElement>) => {
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
          messages: nextMessages.map((message) => ({
            role: message.role === "visitor" ? "visitor" : "bot",
            text: message.text,
          })),
          pageContext: "Visitante navegando pelo site da AL Tech",
        }),
      });
      const payload = (await response.json()) as { reply?: string };
      setMessages((current) => [
        ...current,
        { role: "assistant", text: payload.reply || fallbackAnswer(question) },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: fallbackAnswer(question) },
      ]);
    } finally {
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            aria-label="Abrir atendimento da AL Tech"
          >
            <MessageCircle />
            <span>Falar com a AL Tech</span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="chat-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            aria-label="Atendimento da AL Tech"
          >
            <div className="chat-header">
              <div>
                <strong>AL Tech</strong>
                <span>Atendimento consultivo</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fechar atendimento">
                <X />
              </button>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}>
                  {message.text.split("\n").map((line, lineIndex) => (
                    <p key={`${index}-${lineIndex}`}>{line}</p>
                  ))}
                </div>
              ))}
              {thinking && (
                <div className="chat-message assistant muted">
                  <p>Analisando sua mensagem...</p>
                </div>
              )}
            </div>
            <form className="chat-input" onSubmit={submit}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Digite sua mensagem..."
                aria-label="Mensagem para a AL Tech"
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

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Logo />
        <p>
          Sites, sistemas e produtos digitais feitos com estratégia, design e
          engenharia para negócios que precisam crescer com estrutura.
        </p>
      </div>
      <div>
        <strong>Navegação</strong>
        {navItems.map(({ label, href }) => (
          <a key={label} href={href}>{label}</a>
        ))}
      </div>
      <div>
        <strong>Contato</strong>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="https://www.instagram.com/altech.dev/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="mailto:contato.altechdev@gmail.com">E-mail</a>
      </div>
      <div>
        <strong>Atendimento</strong>
        <span>Rio de Janeiro - Brasil</span>
        <span>Projetos em todo o Brasil</span>
      </div>
      <small>© 2026 AL Tech. Todos os direitos reservados.</small>
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
      description:
        "Desenvolvimento de sites, sistemas, plataformas web, dashboards, automações e infraestrutura cloud.",
      sameAs: ["https://www.instagram.com/altech.dev/"],
      founder: {
        "@type": "Person",
        name: "Alessandro Araujo",
        jobTitle: "Fundador e desenvolvedor",
        image: "https://altechweb.com.br/alessandro-araujo.jpg",
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

  return (
    <main className="site-shell">
      <PWARegister />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <AboutSection />
      <ServicesSection />
      <ProjectCarousel />
      <WorkModesSection />
      <ProcessSection />
      <TechSection />
      <ContactSection />
      <Footer />
      <ChatDock />
    </main>
  );
}
