"use client";

import { ArrowRight, Home } from "lucide-react";
import { ALBotFigure } from "./ALBotFigure";

export function NotFoundExperience() {
  return (
    <main className="not-found-shell">
      <div className="mouse-glow" aria-hidden="true" />
      <div className="not-found-panel">
        <ALBotFigure mood="notfound" size="lg" />
        <span>Erro 404</span>
        <h1>Essa rota saiu da órbita.</h1>
        <p>
          O ALBot tentou rastrear o endereço, mas essa página não está disponível
          no site da AL Tech.
        </p>
        <a className="primary-button" href="/">
          <Home /> Voltar para a home <ArrowRight />
        </a>
      </div>
    </main>
  );
}
