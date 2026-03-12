import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Rota de migração única — atualiza imagens e links no banco de produção
// Remover após confirmar que os dados estão corretos

const CHARACTERS = [
  {
    slug: "jairene-de-bolsonier",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/oKsiGbfeIsfblgFJ.png",
  },
  {
    slug: "luisa-ignacia-de-silvene",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/sstqXeCMinpanOJo.png",
  },
  {
    slug: "alexandra-de-moraes-y-valenca",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/KZqoXkLqJDzYXPSK.png",
  },
  {
    slug: "don-trumpetti-vittorio",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VUIarVGLRNFNpXzl.png",
  },
  {
    slug: "nicolau-de-bolsonier",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/INnaTpbCIOcevNKp.png",
  },
  {
    slug: "erienne-du-palais",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/HvsOCMiJuSGSiGvc.png",
  },
  {
    slug: "domitila-de-calheiros",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VGcSOoDuDmZpctXs.png",
  },
];

// Dados completos para upsert de personagens novos
const NEW_CHARACTERS = [
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

// Episódios com slugs exatos do banco (seed-data.ts)
const EPISODES = [
  {
    slug: "ato-i-a-chegada-da-corte",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VdLIQOMMVuowPdDC.png",
    externalUrl: "https://www.instagram.com/p/DUYYI-ykfKH/",
    featured: true,
  },
  {
    slug: "ato-ii-o-protocolo-da-ausencia",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/BYnRcPbvdwKDfaSw.png",
    externalUrl: "https://www.instagram.com/p/DUgtOK6kX2u/",
    featured: true,
  },
  {
    slug: "ato-iii-a-liturgia-do-salao",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/qswrdETXeeLwwYJS.png",
    externalUrl: "https://www.instagram.com/p/DUlzDx0EUcg/",
    featured: true,
  },
  {
    slug: "ato-iv-a-alianca-provisoria",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/cscAptAyKXfAszuh.png",
    externalUrl: "https://www.instagram.com/p/DUrBUm6kYb2/",
    featured: false,
  },
  {
    slug: "ato-v-o-rumor-como-arma",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/JhQyYLTtkYuHGKpu.png",
    externalUrl: "https://www.instagram.com/p/DUxq5a2DrJ0/",
    featured: false,
  },
  {
    slug: "ato-vi-a-cena-que-nao-estava-no-roteiro",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/diNWEAOVrHxUVzyf.png",
    externalUrl: "https://www.instagram.com/p/DU5zByNEYlb/",
    featured: false,
  },
  {
    slug: "ato-vii-o-peso-do-silencio",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/scCTORVdquAOTYgU.png",
    externalUrl: "https://www.instagram.com/p/DVDsI86AJFM/",
    featured: false,
  },
  {
    slug: "ato-viii-a-lei-do-salao",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/jHDAVgctkSKLNDpl.png",
    externalUrl: "https://www.instagram.com/p/DVVnMl8AIRq/",
    featured: true,
  },
  {
    slug: "ato-ix-o-rumor-entra-pela-escada",
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/IPaKiByUOStXEDQt.png",
    externalUrl: "https://www.instagram.com/p/DVnrrjwALK2/",
    featured: true,
  },
];

// Episódios completos para upsert (os que podem não existir no banco ainda)
const NEW_EPISODES = [
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
  },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret !== "bolsonier-migrate-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {};

  // 1. Upsert de todos os personagens (cria se não existir, atualiza se existir)
  const charResults = await Promise.all(
    NEW_CHARACTERS.map(async (c) => {
      try {
        const upserted = await prisma.bastilhaCharacter.upsert({
          where: { slug: c.slug },
          update: { imageUrl: c.imageUrl },
          create: c,
        });
        return { slug: c.slug, status: "ok", id: upserted.id };
      } catch (e) {
        return { slug: c.slug, status: "error", error: String(e) };
      }
    })
  );

  // Atualizar imageUrl dos personagens existentes (Jairene, Luísa, Alexandra, Don)
  const charUpdates = await Promise.all(
    CHARACTERS.slice(0, 4).map(async (c) => {
      try {
        const updated = await prisma.bastilhaCharacter.update({
          where: { slug: c.slug },
          data: { imageUrl: c.imageUrl },
        });
        return { slug: c.slug, status: "updated", id: updated.id };
      } catch {
        return { slug: c.slug, status: "not_found_skipped" };
      }
    })
  );

  results.characters = [...charUpdates, ...charResults];

  // 2. Atualizar thumbnails e externalUrl dos episódios existentes
  const epUpdates = await Promise.all(
    EPISODES.map(async (e) => {
      try {
        const updated = await prisma.episode.update({
          where: { slug: e.slug },
          data: {
            thumbnailUrl: e.thumbnailUrl,
            externalUrl: e.externalUrl,
            featured: e.featured,
          },
        });
        return { slug: e.slug, status: "updated", id: updated.id };
      } catch {
        return { slug: e.slug, status: "not_found" };
      }
    })
  );
  results.episodeUpdates = epUpdates;

  // 3. Upsert dos atos VII, VIII e IX (podem não existir no banco ainda)
  const epCreates = await Promise.all(
    NEW_EPISODES.map(async (e) => {
      try {
        const upserted = await prisma.episode.upsert({
          where: { slug: e.slug },
          update: {
            thumbnailUrl: e.thumbnailUrl,
            externalUrl: e.externalUrl,
            featured: e.featured,
          },
          create: e,
        });
        return { slug: e.slug, status: "upserted", id: upserted.id };
      } catch (err) {
        return { slug: e.slug, status: "error", error: String(err) };
      }
    })
  );
  results.episodeCreates = epCreates;

  // 4. Contar registros finais
  const [totalChars, totalEps] = await Promise.all([
    prisma.bastilhaCharacter.count(),
    prisma.episode.count(),
  ]);
  results.totals = { characters: totalChars, episodes: totalEps };

  return NextResponse.json({ success: true, results });
}
