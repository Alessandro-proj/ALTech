"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ARTICLE_URL = "https://prefeituradebelfordroxo.rj.gov.br/2026/07/08/secretaria-de-assistencia-social-de-belford-roxo-cria-carteira-municipal-de-identificacao-da-pessoa-com-deficiencia/";

const photos = [
  {
    src: "/historia/cmipcd-registro-1.jpg", width: 720, height: 1280,
    alt: "Alessandro apresentando o sistema CMIPcD ao lado de um slide",
    caption: "Apresentando o sistema CMIPcD",
  },
  {
    src: "/historia/cmipcd-registro-2.jpg", width: 719, height: 1280,
    alt: "Alessandro explicando o fluxo do sistema em frente à projeção",
    caption: "Explicando a jornada, da porta de entrada à carteirinha",
  },
  {
    src: "/historia/cmipcd-registro-3.jpg", width: 840, height: 1120,
    alt: "Alessandro diante do painel da Carteirinha PCD",
    caption: "No evento da Carteirinha PCD",
  },
  {
    src: "/historia/cmipcd-registro-4.jpg", width: 960, height: 540,
    alt: "Telão do evento Carteirinha PCD",
    caption: "O telão do evento Carteirinha PCD",
  },
] as const;

function StoryVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const pausedByUser = useRef(false);
  const visible = useRef(false);
  const pausingAutomatically = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduceMotion !== false) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const syncPlayback = () => {
      if (visible.current && !document.hidden && !pausedByUser.current) {
        pausingAutomatically.current = false;
        void video.play().catch(() => {});
      } else if (!video.paused) {
        pausingAutomatically.current = true;
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.5 });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      pausingAutomatically.current = true;
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      className="story-video story-reveal"
      muted loop playsInline controls preload="metadata"
      poster="/historia/cmipcd-video-poster.jpg"
      aria-label="Vídeo dos bastidores da apresentação do CMIPcD"
      onPause={() => {
        if (!pausingAutomatically.current && visible.current && !document.hidden) pausedByUser.current = true;
        pausingAutomatically.current = false;
      }}
      onPlay={() => { pausedByUser.current = false; }}
    >
      <source src="/historia/cmipcd-bastidores.mp4" type="video/mp4" />
      Seu navegador não reproduz este vídeo. <a href="/historia/cmipcd-bastidores.mp4">Abrir o vídeo</a>.
    </video>
  );
}

function StoryGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected === null || !dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [selected]);

  const photo = selected !== null ? photos[selected] : null;

  return (
    <>
      <div className="story-gallery story-reveal">
        {photos.map((item, index) => (
          <figure key={item.src}>
            <button type="button" onClick={() => setSelected(index)} aria-label={`Ampliar foto: ${item.caption}`} aria-haspopup="dialog">
              <Image src={item.src} width={item.width} height={item.height} alt={item.alt} sizes="(max-width: 600px) 90vw, (max-width: 860px) 45vw, 290px" />
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="story-lightbox"
        aria-label="Foto ampliada"
        aria-describedby="story-photo-caption"
        onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
      >
        <button ref={closeRef} className="story-lightbox-close" type="button" aria-label="Fechar foto ampliada" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button>
        {photo && (
          <figure>
            <Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} unoptimized />
            <figcaption id="story-photo-caption">{photo.caption}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

export function StoryExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chapters = root.querySelectorAll<HTMLElement>("[data-story-hue]");
    const chapterObserver = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (!current) return;
      root.style.setProperty("--story-hue", (current.target as HTMLElement).dataset.storyHue ?? "222");
      chapters.forEach((chapter) => chapter.classList.toggle("is-current", chapter === current.target));
    }, { rootMargin: "-40% 0px -40% 0px" });
    chapters.forEach((chapter) => chapterObserver.observe(chapter));
    return () => chapterObserver.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion !== false) return;
    const elements = root.querySelectorAll<HTMLElement>(".story-reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.removeAttribute("data-pending");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.dataset.pending = "true";
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.removeAttribute("data-pending"));
    };
  }, [reduceMotion]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${available > 0 ? Math.min(window.scrollY / available, 1) : 0})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={rootRef} className="story-shell">
      <a className="story-skip" href="#historia-conteudo">Ir para a história</a>
      <header className="story-header">
        <span ref={progressRef} className="story-progress" aria-hidden="true" />
        <div className="story-wrap">
          <Link className="brand-logo" href="/" aria-label="AL Tech - início"><span className="brand-mark">AL</span><strong>AL Tech</strong></Link>
          <Link className="story-back" href="/"><ArrowLeft aria-hidden="true" /> Voltar ao site</Link>
        </div>
      </header>

      <main id="historia-conteudo">
        <section className="story-hero" data-story-hue="222" aria-labelledby="story-title">
          <div className="story-wrap">
            <small>Alessandro da Silva de Souza Araujo · criador do CMIPcD e fundador da AL Tech</small>
            <h1 id="story-title">Antes do código,<br /><span>teve uma história.</span></h1>
            <p>Cada projeto que eu entrego carrega o que eu vivi. Esta é a minha trajetória, contada do meu jeito.</p>
            <a className="story-scroll" href="#a-virada"><ArrowDown aria-hidden="true" /> Role para ler</a>
          </div>
        </section>

        <section className="story-chapter" id="a-virada" data-story-hue="188" aria-labelledby="virada-title">
          <div className="story-wrap story-chapter-layout">
            <div className="story-chapter-heading story-reveal"><span className="story-number" aria-hidden="true">01</span><h2 id="virada-title">A virada</h2><small>O primeiro código</small></div>
            <div className="story-body">
              <p className="story-reveal">Quando o CMIPcD foi criado, eu cursava Engenharia de Software e trabalhava como assessor do Setor de Vigilância Social da Secretaria de Assistência Social e Cidadania de Belford Roxo.</p>
            </div>
          </div>
        </section>

        <section className="story-chapter" id="cmipcd" data-story-hue="168" aria-labelledby="cmipcd-title">
          <div className="story-wrap story-chapter-layout">
            <div className="story-chapter-heading story-reveal"><span className="story-number" aria-hidden="true">02</span><h2 id="cmipcd-title">O projeto que mudou tudo</h2><small>CMIPcD</small></div>
            <div className="story-body">
              <p className="story-reveal">O CMIPcD é a Carteira Municipal de Identificação da Pessoa com Deficiência de Belford Roxo, instituída por decreto e pioneira na Baixada Fluminense. Fui eu quem criou o sistema que acompanha e monitora cada atendimento, em qualquer ponto do município.</p>
              <p className="story-reveal">O pedido começa em uma unidade de saúde, passa pela revisão no CRAS e termina na emissão do documento, tudo registrado para gerar relatórios.</p>
              <p className="story-platform-note story-reveal">Uma plataforma única para cadastro, análise e gestão.</p>
              <Link className="story-button story-button-secondary story-reveal" href="/#projetos">Ver o case completo <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="story-chapter" id="os-registros" data-story-hue="195" aria-labelledby="registros-title">
          <div className="story-wrap story-chapter-layout">
            <div className="story-chapter-heading story-reveal"><span className="story-number" aria-hidden="true">03</span><h2 id="registros-title">Os registros</h2><small>Na imprensa e nos bastidores</small></div>
            <div className="story-body">
              <article className="story-news story-reveal">
                <div className="story-news-meta"><span>Prefeitura de Belford Roxo</span><time dateTime="2026-07-08">8 de julho de 2026</time></div>
                <h3>O sistema por trás da carteira foi criado por mim.</h3>
                <figure className="story-source-proof">
                  <div className="story-source-masthead">
                    <span className="story-source-logo" role="img" aria-label="Logotipo da Prefeitura de Belford Roxo no site original" />
                  </div>
                  <div className="story-source-paper">
                    <span className="story-source-label">Na publicação oficial</span>
                    <div className="story-source-excerpts" role="img" aria-label="Trechos do print: Alessandro da Silva de Souza Araújo; foi quem criou o sistema operacional.">
                      <span className="story-source-name" aria-hidden="true" />
                      <span className="story-source-omission" aria-hidden="true">[...]</span>
                      <span className="story-source-credit" aria-hidden="true" />
                    </div>
                  </div>
                  <figcaption>Recortes da publicação original. Marcações adicionadas pela AL Tech.</figcaption>
                </figure>
                <p>A matéria da Prefeitura conta que o decreto nº 6540, assinado pela prefeita Mariana Malta e publicado em 11 de junho, regulamentou o documento. O projeto partiu da Secretaria de Assistência Social e Cidadania, com parceria das secretarias de Saúde e de Comunicação Social.</p>
                <blockquote>“É gratificante saber que o resultado tem relevância no município, beneficiando muitas pessoas”<cite>Alessandro, na matéria da Prefeitura</cite></blockquote>
                <ol className="story-service-flow"><li>Cadastro na unidade de saúde</li><li>Revisão no CRAS</li><li>Emissão da carteira</li></ol>
                <a href={ARTICLE_URL} target="_blank" rel="noopener noreferrer">Ler a matéria original no site da Prefeitura <ExternalLink aria-hidden="true" /></a>
              </article>
              <StoryGallery />
              <StoryVideo />
            </div>
          </div>
        </section>

        <section className="story-end" data-story-hue="222" aria-labelledby="story-end-title">
          <div className="story-wrap">
            <h2 className="story-reveal" id="story-end-title">Se a minha história faz sentido para você, vamos construir a sua.</h2>
            <p className="story-reveal">Me conte o momento do seu negócio. A primeira conversa serve para entender o objetivo e indicar o melhor caminho.</p>
            <div className="story-actions story-reveal"><a className="story-button" href="https://wa.me/5521971266237" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp <ArrowRight aria-hidden="true" /></a><Link className="story-button story-button-secondary" href="/#processo">Como eu trabalho</Link></div>
          </div>
        </section>
      </main>
      <footer className="story-footer"><div className="story-wrap"><span>© 2026 AL Tech. Todos os direitos reservados.</span><span>Rio de Janeiro, Brasil · Projetos em todo o Brasil</span></div></footer>
    </div>
  );
}
