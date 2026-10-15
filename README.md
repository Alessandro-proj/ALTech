# AL Tech Official Site

Site oficial da AL Tech, criado como uma experiencia premium para apresentar
servicos, projetos, tecnologias, depoimentos e um fluxo de orcamento integrado
ao WhatsApp.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Three.js
- Lucide Icons
- Vinext opcional para previews Cloudflare/Codex

## Desenvolvimento local

```bash
npm install
npm run dev
```

O site roda em:

```bash
http://localhost:3000
```

## Build

```bash
npm run build
```

## Producao em Node.js

Use Node.js `>=22.13.0`.

Comandos recomendados para Hostinger/Web Apps:

```bash
npm ci
npm run build
npm run start
```

Framework: `Next.js`
Branch: `main`
Diretorio de saida: `.next`

O build de producao usa Webpack para permitir o fallback WebAssembly do Next.js
em servidores Linux sem a versao de glibc exigida pelo compilador nativo.
O arquivo `next.config.mjs` evita a transpilacao da configuracao em TypeScript.

## Variaveis de ambiente

Crie as variaveis no painel da hospedagem. Nao envie `.env.local` para o GitHub.

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6-sol
```

Sem `OPENAI_API_KEY`, o ALBot usa respostas locais de fallback.

## Contato

- WhatsApp: +55 21 97126-6237
- Instagram: https://www.instagram.com/altech.dev/
- E-mail: contato.altechdev@gmail.com
