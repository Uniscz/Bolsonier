import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SECRET = "bolsonier-migrate-2026";

// URLs das thumbnails dos atos (fundo preto, numeração romana)
const THUMB = {
  I:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/PsAhlRywCwXsKlBK.png",
  II:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/oDEuFpJTinRiLOkr.png",
  III:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/lfgIqsGVbQFDZPdC.png",
  IV:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/aDaPmIkZspPJAptE.png",
  V:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/ZKKpFuWStjSCCIBO.png",
  VI:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/XHoeBKydyVwyKiix.png",
  VII:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/LLaCEBglvuCpyigX.png",
  VIII: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VASbyGMcaqGRxMVX.png",
  IX:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/ZMbeZWOZVzJcCNqq.png",
};

const ALL_CHARACTERS = [
  {
    slug: "jairene-de-bolsonier",
    name: "Jairene de Bolsonier",
    title: "Soberana da Bastilha",
    allegiance: "Casa Bolsonier",
    summary: "Governa por presença, cálculo e autoridade de linhagem.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/oKsiGbfeIsfblgFJ.png",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "luisa-ignacia-de-silvene",
    name: "Luísa Ignácia de Silvene",
    title: "Inteligência contida da corte",
    allegiance: "Casa Silvene",
    summary: "Figura de inteligência contida e observação rigorosa, habituada a ler o desvio antes que ele se converta em escândalo.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/sstqXeCMinpanOJo.png",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "alexandra-de-moraes-y-valenca",
    name: "Alexandra de Moraes y Valença",
    title: "Presença jurídica e glacial",
    allegiance: "Tribunal da Corte",
    summary: "Cercada de conveniência, disciplina e ambiguidade estratégica.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/KZqoXkLqJDzYXPSK.png",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "don-trumpetti-vittorio",
    name: "Don Trumpetti Vittorio",
    title: "Nome de peso e vaidade",
    allegiance: "Aliança Externa",
    summary: "Oscilando entre prestígio remanescente, decadência íntima e vulnerabilidade pública.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VUIarVGLRNFNpXzl.png",
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "nicolau-de-hylteon",
    name: "Nicolau de Hylteon",
    title: "O desterrado",
    allegiance: "Casa Hylteon",
    summary: "Aquele cuja simples reentrada na casa restitui à corte aquilo que ela mais teme: memória.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/INnaTpbCIOcevNKp.png",
    featured: true,
    sortOrder: 5,
  },
  {
    slug: "nicoletty-vittoria-trumpetti-di-bolsonier",
    name: "Nicoletty Vittoria Trumpetti di Bolsonier",
    title: "Figura de identidade delicadamente incendiária",
    allegiance: "Casa Bolsonier / Aliança Trumpetti",
    summary: "Associada à linhagem, ao escândalo e à instabilidade dos vínculos.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/hfzyFLyClmIZEvmB.png",
    featured: true,
    sortOrder: 6,
  },
  {
    slug: "erienne-de-hylteon",
    name: "Érienne de Hylteon",
    title: "Presença de delicadeza tensa",
    allegiance: "Casa Hylteon",
    summary: "Ligada às correntes invisíveis que movem o destino da casa sem jamais se anunciar por inteiro.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/HvsOCMiJuSGSiGvc.png",
    featured: true,
    sortOrder: 7,
  },
  {
    slug: "domitila-rousselle-alcantara-de-hylteon",
    name: "Domitila Rousselle Alcântara de Hylteon",
    title: "Nome de gravidade ancestral",
    allegiance: "Casa Hylteon",
    summary: "Em cuja compostura sobrevivem tradição, vigilância e memória de sangue.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VGcSOoDuDmZpctXs.png",
    featured: true,
    sortOrder: 8,
  },
];

const ALL_EPISODES = [
  {
    slug: "ato-i-a-chegada-da-corte",
    title: "Ato I — A chegada da corte",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato I",
    category: "Drama político surreal",
    summary: "A Bastilha se apresenta. A soberana recebe. A corte observa. Ninguém é inocente.",
    thumbnailUrl: THUMB.I,
    externalUrl: "https://www.instagram.com/p/DUYYI-ykfKH/",
    featured: true,
    publishedAt: new Date("2025-01-01T00:00:00Z"),
  },
  {
    slug: "ato-ii-o-protocolo-da-ausencia",
    title: "Ato II — O protocolo da ausência",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato II",
    category: "Drama político surreal",
    summary: "O silêncio começa a custar mais do que a palavra. Alianças se formam sem declaração.",
    thumbnailUrl: THUMB.II,
    externalUrl: "https://www.instagram.com/p/DUgtOK6kX2u/",
    featured: true,
    publishedAt: new Date("2025-01-08T00:00:00Z"),
  },
  {
    slug: "ato-iii-a-liturgia-do-salao",
    title: "Ato III — A liturgia do salão",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato III",
    category: "Drama político surreal",
    summary: "Nicolau retorna. A corte finge indiferença. A soberana não consegue.",
    thumbnailUrl: THUMB.III,
    externalUrl: "https://www.instagram.com/p/DUlzDx0EUcg/",
    featured: true,
    publishedAt: new Date("2025-01-15T00:00:00Z"),
  },
  {
    slug: "ato-iv-a-alianca-provisoria",
    title: "Ato IV — A aliança provisória",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato IV",
    category: "Drama político surreal",
    summary: "Alexandra impõe sua leitura dos fatos. Ninguém ousa contradizê-la diretamente.",
    thumbnailUrl: THUMB.IV,
    externalUrl: "https://www.instagram.com/p/DUrBUm6kYb2/",
    featured: false,
    publishedAt: new Date("2025-01-22T00:00:00Z"),
  },
  {
    slug: "ato-v-o-rumor-como-arma",
    title: "Ato V — O rumor como arma",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato V",
    category: "Drama político surreal",
    summary: "Trumpetti chega. A corte sorri. Bastidores fervem.",
    thumbnailUrl: THUMB.V,
    externalUrl: "https://www.instagram.com/p/DUxq5a2DrJ0/",
    featured: false,
    publishedAt: new Date("2025-01-29T00:00:00Z"),
  },
  {
    slug: "ato-vi-a-cena-que-nao-estava-no-roteiro",
    title: "Ato VI — A cena que não estava no roteiro",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato VI",
    category: "Drama político surreal",
    summary: "Érienne move peças que ninguém vê. O equilíbrio começa a ceder.",
    thumbnailUrl: THUMB.VI,
    externalUrl: "https://www.instagram.com/p/DU5zByNEYlb/",
    featured: false,
    publishedAt: new Date("2025-02-05T00:00:00Z"),
  },
  {
    slug: "ato-vii-o-peso-do-silencio",
    title: "Ato VII — O peso do silêncio",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato VII",
    category: "Drama político surreal",
    summary: "O silêncio de Jairene pesa mais que qualquer decreto. A corte interpreta. Ninguém ousa perguntar.",
    thumbnailUrl: THUMB.VII,
    externalUrl: "https://www.instagram.com/p/DVDsI86AJFM/",
    featured: false,
    publishedAt: new Date("2025-02-12T00:00:00Z"),
  },
  {
    slug: "ato-viii-a-lei-do-salao",
    title: "Ato VIII — A lei do salão",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato VIII",
    category: "Drama político surreal",
    summary: "Há uma lei não escrita na Bastilha: quem precisa afirmar sua posição, já a perdeu.",
    thumbnailUrl: THUMB.VIII,
    externalUrl: "https://www.instagram.com/p/DVVnMl8AIRq/",
    featured: false,
    publishedAt: new Date("2025-02-19T00:00:00Z"),
  },
  {
    slug: "ato-ix-o-rumor-entra-pela-escada",
    title: "Ato IX — O rumor entra pela escada",
    series: "Bastilha de Bolsonière",
    season: 1,
    actLabel: "Ato IX",
    category: "Drama político surreal",
    summary: "Uma entrada muda o ar da sala. O que parecia protocolo passa a soar como ameaça velada.",
    thumbnailUrl: THUMB.IX,
    externalUrl: "https://www.instagram.com/p/DVnrrjwALK2/",
    featured: false,
    publishedAt: new Date("2025-02-26T00:00:00Z"),
  },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const mode = url.searchParams.get("mode") || "seed";

  if (secret !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Diagnóstico: lista o que está no banco
  if (mode === "diagnose") {
    const [episodes, characters] = await Promise.all([
      prisma.episode.findMany({
        select: { id: true, slug: true, title: true, actLabel: true, thumbnailUrl: true, externalUrl: true, featured: true },
        orderBy: { publishedAt: "asc" },
      }),
      prisma.bastilhaCharacter.findMany({
        select: { id: true, slug: true, name: true, imageUrl: true },
        orderBy: { sortOrder: "asc" },
      }),
    ]);
    return NextResponse.json({ episodes, characters });
  }

  const results: Record<string, unknown> = {};

  // Primeiro: remover personagens com slugs antigos/errados
  const oldSlugs = [
    "nicolau-de-bolsonier",
    "erienne-du-palais",
    "domitila-de-calheiros",
  ];
  const deleteOld = await prisma.bastilhaCharacter.deleteMany({
    where: { slug: { in: oldSlugs } },
  });
  results.deletedOldCharacters = deleteOld.count;

  // Upsert de todos os personagens com nomes corretos
  const charResults = await Promise.all(
    ALL_CHARACTERS.map(async (c) => {
      try {
        const r = await prisma.bastilhaCharacter.upsert({
          where: { slug: c.slug },
          update: {
            name: c.name,
            title: c.title,
            allegiance: c.allegiance,
            summary: c.summary,
            imageUrl: c.imageUrl,
            featured: c.featured,
            sortOrder: c.sortOrder,
          },
          create: c,
        });
        return { slug: c.slug, name: c.name, status: "ok", id: r.id };
      } catch (e) {
        return { slug: c.slug, status: "error", error: String(e) };
      }
    })
  );
  results.characters = charResults;

  // Upsert de todos os episódios com thumbnails corretas
  const epResults = await Promise.all(
    ALL_EPISODES.map(async (e) => {
      try {
        const r = await prisma.episode.upsert({
          where: { slug: e.slug },
          update: {
            title: e.title,
            actLabel: e.actLabel,
            summary: e.summary,
            thumbnailUrl: e.thumbnailUrl,
            externalUrl: e.externalUrl,
            featured: e.featured,
          },
          create: e,
        });
        return { slug: e.slug, status: "ok", id: r.id };
      } catch (err) {
        return { slug: e.slug, status: "error", error: String(err) };
      }
    })
  );
  results.episodes = epResults;

  // Totais finais
  const [totalChars, totalEps] = await Promise.all([
    prisma.bastilhaCharacter.count(),
    prisma.episode.count(),
  ]);
  results.totals = { characters: totalChars, episodes: totalEps };

  return NextResponse.json({ success: true, results });
}
