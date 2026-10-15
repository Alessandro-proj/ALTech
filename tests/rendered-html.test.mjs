import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("renders the AL Tech homepage with its main sections", async () => {
  const html = await readFile(projectFile(".next/server/app/index.html"), "utf8");

  assert.match(html, /<html[^>]+lang="pt-BR"/i);
  assert.match(html, /<title>AL Tech \| Estúdio de Desenvolvimento Digital<\/title>/i);
  assert.match(html, /Tecnologia com propósito\./i);
  assert.match(html, /Cases reais, um de cada vez/i);
  assert.match(html, /Pequena o suficiente para cuidar de perto/i);
  assert.match(html, /id="servicos"/i);
  assert.match(html, /id="projetos"/i);
  assert.match(html, /id="contato"/i);
  assert.doesNotMatch(html, /Your site is taking shape|SkeletonPreview/i);
});

test("publishes crawl metadata for the production domain", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(projectFile(".next/server/app/robots.txt.body"), "utf8"),
    readFile(projectFile(".next/server/app/sitemap.xml.body"), "utf8"),
  ]);

  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/altechweb\.com\.br\/sitemap\.xml/i);
  assert.match(sitemap, /<loc>https:\/\/altechweb\.com\.br<\/loc>/i);
  assert.match(sitemap, /<loc>https:\/\/altechweb\.com\.br\/minha-historia<\/loc>/i);
});

test("keeps contact, navigation and API safeguards in source", async () => {
  const [home, css, api, serviceWorker] = await Promise.all([
    readFile(projectFile("components/site/HomeExperience.tsx"), "utf8"),
    readFile(projectFile("app/globals.css"), "utf8"),
    readFile(projectFile("app/api/albot/route.ts"), "utf8"),
    readFile(projectFile("public/sw.js"), "utf8"),
  ]);

  assert.match(home, /CONTACT_EMAIL_URL = `mailto:\$\{CONTACT_EMAIL_USER\}%40/);
  assert.match(home, /aria-controls="primary-navigation"/);
  assert.match(home, /aria-pressed=\{service === label\}/);
  assert.match(home, /aria-live="polite"/);
  assert.match(
    css,
    /\.site-header,\s*\n\s*\.site-header\.scrolled\s*\{\s*\n\s*overflow:\s*visible;/,
  );
  assert.match(api, /const MAX_BODY_BYTES = 24_000/);
  assert.match(api, /const RATE_LIMIT_MAX = 12/);
  assert.match(api, /AbortController\(\)/);
  assert.match(serviceWorker, /al-tech-command-v4/);
  assert.match(serviceWorker, /request\.mode === "navigate"/);
  assert.doesNotMatch(serviceWorker, /cache\.put\(event\.request/);
});

test("publishes the CMIPcD story and links it from the homepage", async () => {
  const home = await readFile(projectFile(".next/server/app/index.html"), "utf8");
  const story = await readFile(projectFile(".next/server/app/minha-historia.html"), "utf8");
  assert.match(home, /href="\/minha-historia"/);
  assert.match(story, /<title>Minha história \| Alessandro Araujo, AL Tech<\/title>/);
  assert.match(story, /rel="canonical" href="https:\/\/altechweb\.com\.br\/minha-historia"/);
  assert.match(story, /id="cmipcd"/);
  assert.match(story, /id="os-registros"/);
  assert.match(story, /cmipcd-bastidores\.mp4/);
  assert.match(story, /<dialog[^>]+aria-label="Foto ampliada"/);
  assert.doesNotMatch(story, /Escreva aqui|Espaço para uma foto|claude\.ai\/artifact|data:video/);
});

test("keeps homepage and story navigations separate in the offline cache", async () => {
  const source = await readFile(projectFile("public/sw.js"), "utf8");
  const listeners = new Map();
  const saved = new Map();
  const key = (request) => typeof request === "string" ? new URL(request, "https://altechweb.com.br").href : request.url;
  let online = true;
  const context = {
    self: {
      location: { origin: "https://altechweb.com.br" },
      addEventListener: (name, listener) => listeners.set(name, listener),
    },
    URL,
    Response,
    fetch: async (request) => {
      if (!online) throw new Error("Offline");
      return new Response(new URL(request.url).pathname === "/" ? "Homepage" : "CMIPcD story");
    },
    caches: {
      open: async () => ({ put: async (request, response) => saved.set(key(request), response) }),
      match: async (request) => saved.get(key(request))?.clone(),
    },
  };
  vm.runInNewContext(source, context);
  const navigate = async (pathname) => {
    let response;
    listeners.get("fetch")({
      request: { method: "GET", mode: "navigate", url: `https://altechweb.com.br${pathname}` },
      respondWith: (result) => { response = result; },
    });
    return (await response).text();
  };
  assert.equal(await navigate("/"), "Homepage");
  assert.equal(await navigate("/minha-historia"), "CMIPcD story");
  online = false;
  assert.equal(await navigate("/"), "Homepage");
  assert.equal(await navigate("/minha-historia"), "CMIPcD story");
});

test("shows attributed source excerpts and the updated WhatsApp contact", async () => {
  const home = await readFile(projectFile(".next/server/app/index.html"), "utf8");
  const story = await readFile(projectFile(".next/server/app/minha-historia.html"), "utf8");
  const api = await readFile(projectFile("app/api/albot/route.ts"), "utf8");
  assert.match(story, /Recortes da publicação original\. Marcações adicionadas pela AL Tech\./);
  assert.match(story, /aria-label="Trechos do print: Alessandro da Silva de Souza Araújo; foi quem criou o sistema operacional\."/);
  for (const html of [home, story]) {
    const links = [...html.matchAll(/href="https:\/\/wa\.me\/([0-9]+)/g)];
    assert.ok(links.length > 0);
    assert.ok(links.every((link) => link[1] === "5521971266237"));
    assert.doesNotMatch(html, /97271-4119|5521972714119/);
  }
  assert.match(api, /WhatsApp: \+55 21 97126-6237/);
  assert.doesNotMatch(api, /97271-4119|5521972714119/);
  for (const asset of ["materia-cmipcd-original.jpg", "materia-cmipcd-cabecalho.jpg"]) {
    const screenshot = await readFile(projectFile(`public/historia/${asset}`));
    assert.equal(screenshot.readUInt16BE(0), 0xffd8);
    assert.ok(screenshot.length > 10_000);
  }
});

test("keeps CMIPcD registration volumes out of the public pages", async () => {
  for (const page of ["index.html", "minha-historia.html"]) {
    const html = await readFile(projectFile(`.next/server/app/${page}`), "utf8");
    assert.doesNotMatch(html, /4[.,]000|3[.,]870|cadastros (?:realizados|no CMIPcD|no sistema)|Solicitação #284[12]/);
    assert.match(html, /cadastro, análise e (?:emissão|gestão)/i);
  }
  const home = await readFile(projectFile(".next/server/app/index.html"), "utf8");
  assert.doesNotMatch(home, /dashboard-kpis|dashboard-chart/);
  const api = await readFile(projectFile("app/api/albot/route.ts"), "utf8");
  assert.match(api, /Nao informe quantidades de cadastros/);
});
