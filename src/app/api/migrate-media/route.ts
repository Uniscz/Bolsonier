import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SECRET = "bolsonier-migrate-2026";

const ALL_CHARACTERS = [
  {
    slug: "jairene-de-bolsonier",
    name: "Jairene de Bolsonier",
    title: "A soberana que nunca abdicou",
    allegiance: "Casa Bolsonier",
    summary: "Jairene governa pela memória e pelo silêncio. Sua autoridade não precisa de proclamação — ela se impõe pela ausência de qualquer alternativa.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/oKsiGbfeIsfblgFJ.png",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "luisa-ignacia-de-silvene",
    name: "Luísa Ignácia de Silvene",
    title: "A herdeira que aprendeu a esperar",
    allegiance: "Casa Silvene",
    summary: "Luísa cresceu na sombra de Jairene e aprendeu que a paciência é a forma mais sofisticada de ambição.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/sstqXeCMinpanOJo.png",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "alexandra-de-moraes-y-valenca",
    name: "Alexandra de Moraes y Valença",
    title: "A jurisdição que se move por conta própria",
    allegiance: "Tribunal da Corte",
    summary: "Alexandra não pede permissão. Ela interpreta as regras como instrumento de poder pessoal e ninguém ousa contradizê-la diretamente.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/KZqoXkLqJDzYXPSK.png",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "don-trumpetti-vittorio",
    name: "Don Trumpetti Vittorio",
    title: "O convidado que nunca foi embora",
    allegiance: "Aliança Externa",
    summary: "Trumpetti chegou como visita de prestígio e ficou como presença incômoda. A corte sorri. Os bastidores fervem.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VUIarVGLRNFNpXzl.png",
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "nicolau-de-bolsonier",
    name: "Nicolau de Bolsonier",
    title: "O herdeiro relutante",
    allegiance: "Casa Bolsonier",
    summary: "Filho mais novo da casa, Nicolau carrega o peso de um nome que não escolheu e uma lealdade que ainda não decidiu honrar.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/INnaTpbCIOcevNKp.png",
    featured: true,
    sortOrder: 5,
  },
  {
    slug: "erienne-du-palais",
    name: "Érienne du Palais",
    title: "A presença que move sem ser vista",
    allegiance: "Corte Neutra",
    summary: "Érienne transita entre facções com uma leveza que desorienta. Ninguém sabe ao certo a quem serve — talvez só a si mesma.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/HvsOCMiJuSGSiGvc.png",
    featured: true,
    sortOrder: 6,
  },
  {
    slug: "domitila-de-calheiros",
    name: "Domitila de Calheiros",
    title: "A soberana que não precisa de trono",
    allegiance: "Casa Calheiros",
    summary: "Domitila governa pela memória e pelo protocolo. Sua presença é uma afirmação de poder que dispensa discurso.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VGcSOoDuDmZpctXs.png",
    featured: true,
    sortOrder: 7,
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VdLIQOMMVuowPdDC.png",
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/BYnRcPbvdwKDfaSw.png",
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/qswrdETXeeLwwYJS.png",
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/cscAptAyKXfAszuh.png",
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/JhQyYLTtkYuHGKpu.png",
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/diNWEAOVrHxUVzyf.png",
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/scCTORVdquAOTYgU.png",
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/jHDAVgctkSKLNDpl.png",
    externalUrl: "https://www.instagram.com/p/DVVnMl8AIRq/",
    featured: true,
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
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/IPaKiByUOStXEDQt.png",
    externalUrl: "https://www.instagram.com/p/DVnrrjwALK2/",
    featured: true,
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

  // Upsert de todos os personagens
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
        return { slug: c.slug, status: "ok", id: r.id };
      } catch (e) {
        return { slug: c.slug, status: "error", error: String(e) };
      }
    })
  );
  results.characters = charResults;

  // Upsert de todos os episódios
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
