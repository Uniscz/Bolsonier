import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SECRET = "bolsonier-migrate-2026";

// URLs das mídias por posição (ordem de publicação, Ato I ao IX)
const MEDIA_BY_ORDER = [
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VdLIQOMMVuowPdDC.png",
    externalUrl: "https://www.instagram.com/p/DUYYI-ykfKH/",
    featured: true,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/BYnRcPbvdwKDfaSw.png",
    externalUrl: "https://www.instagram.com/p/DUgtOK6kX2u/",
    featured: true,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/qswrdETXeeLwwYJS.png",
    externalUrl: "https://www.instagram.com/p/DUlzDx0EUcg/",
    featured: true,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/cscAptAyKXfAszuh.png",
    externalUrl: "https://www.instagram.com/p/DUrBUm6kYb2/",
    featured: false,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/JhQyYLTtkYuHGKpu.png",
    externalUrl: "https://www.instagram.com/p/DUxq5a2DrJ0/",
    featured: false,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/diNWEAOVrHxUVzyf.png",
    externalUrl: "https://www.instagram.com/p/DU5zByNEYlb/",
    featured: false,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/scCTORVdquAOTYgU.png",
    externalUrl: "https://www.instagram.com/p/DVDsI86AJFM/",
    featured: false,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/jHDAVgctkSKLNDpl.png",
    externalUrl: "https://www.instagram.com/p/DVVnMl8AIRq/",
    featured: true,
  },
  {
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/IPaKiByUOStXEDQt.png",
    externalUrl: "https://www.instagram.com/p/DVnrrjwALK2/",
    featured: true,
  },
];

const CHARACTERS_BY_SLUG: Record<string, string> = {
  "jairene-de-bolsonier": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/oKsiGbfeIsfblgFJ.png",
  "luisa-ignacia-de-silvene": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/sstqXeCMinpanOJo.png",
  "alexandra-de-moraes-y-valenca": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/KZqoXkLqJDzYXPSK.png",
  "don-trumpetti-vittorio": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VUIarVGLRNFNpXzl.png",
  "nicolau-de-bolsonier": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/INnaTpbCIOcevNKp.png",
  "erienne-du-palais": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/HvsOCMiJuSGSiGvc.png",
  "domitila-de-calheiros": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/VGcSOoDuDmZpctXs.png",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const mode = url.searchParams.get("mode") || "migrate";

  if (secret !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Modo diagnóstico: lista o que está no banco
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

  // Modo migração: atualiza tudo
  const results: Record<string, unknown> = {};

  // 1. Buscar todos os episódios ordenados por data de publicação
  const allEpisodes = await prisma.episode.findMany({
    orderBy: { publishedAt: "asc" },
  });

  // 2. Atualizar cada episódio pela sua posição na lista (Ato I = índice 0, etc.)
  const epResults = await Promise.all(
    allEpisodes.map(async (ep, index) => {
      const media = MEDIA_BY_ORDER[index];
      if (!media) return { id: ep.id, slug: ep.slug, status: "no_media_for_index" };
      try {
        await prisma.episode.update({
          where: { id: ep.id },
          data: {
            thumbnailUrl: media.thumbnailUrl,
            externalUrl: media.externalUrl,
            featured: media.featured,
          },
        });
        return { id: ep.id, slug: ep.slug, index, status: "updated" };
      } catch (e) {
        return { id: ep.id, slug: ep.slug, index, status: "error", error: String(e) };
      }
    })
  );
  results.episodes = epResults;

  // 3. Atualizar personagens pelo slug
  const allChars = await prisma.bastilhaCharacter.findMany({
    select: { id: true, slug: true, name: true },
  });

  const charResults = await Promise.all(
    allChars.map(async (char) => {
      const imageUrl = CHARACTERS_BY_SLUG[char.slug];
      if (!imageUrl) return { slug: char.slug, status: "no_image_defined" };
      try {
        await prisma.bastilhaCharacter.update({
          where: { id: char.id },
          data: { imageUrl },
        });
        return { slug: char.slug, status: "updated" };
      } catch (e) {
        return { slug: char.slug, status: "error", error: String(e) };
      }
    })
  );
  results.characters = charResults;

  // 4. Totais finais
  const [totalEps, totalChars] = await Promise.all([
    prisma.episode.count(),
    prisma.bastilhaCharacter.count(),
  ]);
  results.totals = { episodes: totalEps, characters: totalChars };

  return NextResponse.json({ success: true, results });
}
