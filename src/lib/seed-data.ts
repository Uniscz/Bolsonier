export const timelineSeed = [
  {
    title: "A ascensão da liturgia pública",
    slug: "a-ascensao-da-liturgia-publica",
    dateLabel: "Antes dos atos",
    body: "A Bastilha se firma como espaço de protocolo, aparência e disputas cada vez menos discretas.",
    important: true,
    sortOrder: 1
  },
  {
    title: "O salão aprende a ouvir pelas frestas",
    slug: "o-salao-aprende-a-ouvir-pelas-frestas",
    dateLabel: "Ato IV",
    body: "A narrativa deixa de ser só cerimonial. Os bastidores começam a governar a leitura do público.",
    important: true,
    sortOrder: 2
  },
  {
    title: "Rumores viram eixo dramático",
    slug: "rumores-viram-eixo-dramatico",
    dateLabel: "Ato VIII",
    body: "A comunidade passa a operar como extensão do universo, reagindo, teorizando e produzindo expectativa.",
    important: true,
    sortOrder: 3
  }
] satisfies Prisma.TimelineEventCreateInput[];

export const initialWallPosts = [
  {
    kind: "UPDATE",
    title: "A corte abriu as portas",
    body: "Bem-vindos ao Salão dos Rumores. Este espaço reúne leituras, teorias e ecos da Bastilha.",
    authorName: "Bolsonier Studios",
    authorKey: "studio",
    pinned: true,
    featured: true
  },
  {
    kind: "THEORY",
    title: "Ato IX",
    body: "Minha leitura é que a tensão do episódio não está só no diálogo. Está em quem decide continuar em cena mesmo sabendo que o salão inteiro percebeu o desvio.",
    authorName: "Visitante da Corte",
    authorKey: "seed-1",
    pinned: false,
    featured: true
  }
] satisfies Prisma.WallPostCreateManyInput[];

export const initialPoll = {
  title: "Quem domina melhor o silêncio da sala?",
  description: "Enquete semanal do Salão dos Rumores",
  options: ["Jairene", "Luísa Ignácia", "Alexandra"]
};
