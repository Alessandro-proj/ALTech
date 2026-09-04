"use client";

import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export function NotFoundExperience() {
  return (
    <main className="not-found-shell">
      <div className="not-found-panel">
        <span>Erro 404</span>
        <h1>Essa página não está disponível.</h1>
        <p>
          O endereço pode ter mudado ou ainda não fazer parte do site da AL Tech.
        </p>
        <Link className="primary-button" href="/">
          <Home /> Voltar para a home <ArrowRight />
        </Link>
      </div>
    </main>
  );
}
