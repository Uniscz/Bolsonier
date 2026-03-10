import {
  CourseStatus,
  ProjectStatus,
  WallPostKind,
  type Prisma
} from "@prisma/client";

export const sectionSeed = [
  {
    page: "home",
    key: "hero",
    eyebrow: "Bolsonier Studios",
    title: "Universos autorais, direção visual e produtos criativos com identidade real.",
    body: "Produtora criativa autoral para séries narrativas, imagens realistas, vídeos cinematográficos, humor político surreal e projetos pensados para existir como marca, ecossistema e negócio.",
    ctaLabel: "Explorar o universo",
    ctaHref: "/bastilha",
    order: 1
  },
  {
    page: "home",
    key: "manifesto",
    eyebrow: "Manifesto",
    title: "Não fazemos presença genérica. Construímos presença memorável.",
    body: "Bolsonier Studios nasce para reunir narrativa, direção estética, inteligência artificial e clareza comercial em um mesmo lugar. O foco não é volume. É assinatura.",
    ctaLabel: "Conhecer a produtora",
    ctaHref: "/sobre",
    order: 2
  },
  {
    page: "home",
    key: "mentoria",
    eyebrow: "Mentoria",
    title: "Estratégia criativa para quem quer sair do improviso e construir linguagem própria.",
    body: "Mentoria para criadores que já entendem o valor de parecer únicos, mas ainda não transformaram isso em produto, presença e retenção.",
    ctaLabel: "Ver mentoria",
    ctaHref: "/mentoria",
    order: 3
  },
  {
    page: "home",
    key: "courses",
    eyebrow: "Cursos",
    title: "Formação prática para criação com IA, narrativa visual e construção de projeto autoral.",
    body: "Cursos em diferentes estágios, com estrutura para lista de espera, pré-venda e turmas abertas sem cara de curso barato.",
    ctaLabel: "Ver cursos",
    ctaHref: "/cursos",
    order: 4
  },
  {
    page: "bastilha",
    key: "intro",
    eyebrow: "Universo interno",
    title: "Bastilha de Bolsonier",
    body: "Uma ala premium de narrativa, personagens, dossiês, rumores e comunidade. Não é só uma série. É um núcleo vivo dentro da produtora.",
    ctaLabel: "Entrar no Salão dos Rumores",
    ctaHref: "/bastilha/mural",
    order: 1
  },
  {
    page: "sobre",
    key: "intro",
    eyebrow: "Sobre",
    title: "Produtora autoral, direção estética e visão de longo prazo.",
    body: "Bolsonier Studios organiza universos, projetos e produtos com uma lógica simples: cada obra precisa ter força própria, linguagem reconhecível e espaço para monetização sem perder identidade.",
    ctaLabel: "Falar com a produtora",
    ctaHref: "/contato",
    order: 1
  }
] satisfies Prisma.SiteSectionCreateInput[];

export const mentorshipSeed = {
  title: "Mentoria Direção, Identidade e Ecossistema",
  slug: "direcao-identidade-ecossistema",
  summary:
    "Uma mentoria para criadores que querem sair do conteúdo solto e construir um universo com assinatura, posicionamento, clareza comercial e retenção.",
  description:
    "Mentoria individual e estratégica para alinhar posicionamento, linguagem visual, narrativa, funil de produtos e arquitetura de presença. Pensada para criadores, artistas e projetos com ambição de marca.",
  audience:
    "Criadores autorais, projetos com IA, perfis em expansão, marcas pessoais e universos narrativos que já têm potência, mas ainda não têm sistema.",
  format:
    "Sessões online, diagnóstico de posicionamento, plano de execução, acompanhamento e revisão de materiais-chave.",
  deliverables: [
    "Leitura de posicionamento e identidade",
    "Mapeamento de ecossistema e monetização",
    "Direção visual e narrativa da presença digital",
    "Plano prioritário de execução por etapas"
  ],
  differentiators: [
    "Sem fórmula de guru",
    "Foco em assinatura real, não em decoração",
    "Estrutura feita para produto, comunidade e continuidade",
    "Leitura crítica honesta com visão de marca"
  ],
  ctaLabel: "Solicitar mentoria",
  ctaHref: "/contato?assunto=mentoria",
  featured: true
} satisfies Prisma.MentorshipOfferCreateInput;

export const courseSeed = [
  {
    title: "Criação de vídeos autorais com IA",
    slug: "criacao-de-videos-autorais-com-ia",
    excerpt: "Do conceito à execução com estética forte, narrativa e retenção.",
    description:
      "Curso estruturado para transformar ferramentas de IA em linguagem própria. Cobre direção de cena, construção de personagem, ritmo, retenção e adaptação para conteúdo serializado.",
    status: CourseStatus.PREORDER,
    priceLabel: "Pré-venda em breve",
    ctaLabel: "Entrar na lista",
    waitlistUrl: "/contato?assunto=curso",
    modules: [
      "Identidade e direção visual",
      "Prompts para imagem e vídeo com coerência",
      "Narrativa curta com retenção",
      "Pipeline de produção e publicação"
    ],
    bonuses: ["Checklist de consistência visual", "Modelos de prompt prontos"],
    faq: [
      {
        q: "É para iniciantes?",
        a: "Serve para quem já cria e para quem ainda está estruturando seu método."
      },
      {
        q: "Foca em qual ferramenta?",
        a: "O curso ensina pensamento de direção e fluxo adaptável a diferentes ferramentas."
      }
    ],
    featured: true
  },
  {
    title: "Mentefatura de universo narrativo",
    slug: "mentefatura-de-universo-narrativo",
    excerpt: "Para quem quer transformar uma ideia em um sistema vivo.",
    description:
      "Curso focado em universo, personagem, eixo dramático, ecossistema de conteúdo e continuidade editorial.",
    status: CourseStatus.WAITLIST,
    ctaLabel: "Lista de espera",
    waitlistUrl: "/contato?assunto=lista-de-espera",
    modules: [
      "Arquitetura do universo",
      "Personagens que sustentam série",
      "Páginas, produtos e comunidade",
      "Expansão para múltiplas frentes"
    ],
    bonuses: ["Mapa de universo", "Roteiro de posicionamento"],
    faq: [
      {
        q: "É só para ficção?",
        a: "Não. Também serve para marca pessoal e projetos híbridos."
      }
    ],
    featured: false
  }
] satisfies Prisma.CourseCreateInput[];

export const projectSeed = [
  {
    title: "Bastilha de Bolsonier",
    slug: "bastilha-de-bolsonier",
    category: "Universo narrativo",
    summary:
      "Série autoral com linguagem aristocrática, humor político, tensão dramática e expansão para comunidade, personagens e dossiês.",
    body:
      "A Bastilha é o eixo premium da Bolsonier Studios. Um universo vivo, com atos, personagens, cronologia, teorias do público e possibilidades de expansão editorial.",
    status: ProjectStatus.LIVE,
    featured: true,
    sortOrder: 1,
    accent: "violet",
    launchLabel: "Em publicação"
  },
  {
    title: "Laboratório Visual",
    slug: "laboratorio-visual",
    category: "Pesquisa aplicada",
    summary:
      "Exploração de imagem realista, continuidade de personagem, direção visual e pipelines de criação com IA.",
    body:
      "Núcleo de experimentação técnica voltado para realismo, consistência e construção cinematográfica de imagem.",
    status: ProjectStatus.DEVELOPMENT,
    featured: true,
    sortOrder: 2,
    accent: "amber",
    launchLabel: "Em desenvolvimento"
  },
  {
    title: "Programa de formação Bolsonier",
    slug: "programa-de-formacao-bolsonier",
    category: "Educação",
    summary:
      "Estrutura de mentoria e cursos para transformar repertório criativo em produto, sistema e linguagem.",
    body:
      "Braço educacional da produtora, com foco em direção, processo criativo, IA aplicada e posicionamento autoral.",
    status: ProjectStatus.UPCOMING,
    featured: true,
    sortOrder: 3,
    accent: "stone",
    launchLabel: "Próximo lançamento"
  }
] satisfies Prisma.ProjectCreateInput[];

export const episodeSeed = [
  {
    title: "Ato VIII — A lei do salão",
    slug: "ato-viii-a-lei-do-salao",
    series: "Bastilha de Bolsonier",
    season: 1,
    actLabel: "Ato VIII",
    category: "Drama político surreal",
    summary:
      "A corte tenta manter a liturgia enquanto a tensão cresce nos bastidores e a lealdade vira peça de cena.",
    externalUrl: "https://instagram.com",
    featured: true
  },
  {
    title: "Ato IX — O rumor entra pela escada",
    slug: "ato-ix-o-rumor-entra-pela-escada",
    series: "Bastilha de Bolsonier",
    season: 1,
    actLabel: "Ato IX",
    category: "Drama político surreal",
    summary:
      "Uma entrada muda o ar da sala. O que parecia protocolo passa a soar como ameaça velada.",
    externalUrl: "https://tiktok.com",
    featured: true
  },
  {
    title: "Piloto — O método da presença",
    slug: "piloto-o-metodo-da-presenca",
    series: "Bolsonier Studios",
    season: 1,
    actLabel: "Piloto",
    category: "Institucional",
    summary:
      "Peça institucional da produtora para apresentar estética, discurso e ritmo do ecossistema.",
    externalUrl: "https://youtube.com",
    featured: false
  }
] satisfies Prisma.EpisodeCreateInput[];

export const testimonialSeed = [
  {
    name: "Cliente de direção visual",
    role: "Projeto autoral em expansão",
    category: "mentoria",
    quote:
      "Eu tinha material, mas não tinha sistema. A leitura foi precisa, crítica e finalmente conectou estética, produto e presença.",
    sourceLabel: "Mentoria",
    featured: true,
    sortOrder: 1
  },
  {
    name: "Aluno em fase de estruturação",
    role: "Criador digital",
    category: "curso",
    quote:
      "A grande diferença foi entender que linguagem não se improvisa. Depois da consultoria, tudo começou a conversar.",
    sourceLabel: "Curso",
    featured: true,
    sortOrder: 2
  },
  {
    name: "Parceiro criativo",
    role: "Projeto audiovisual",
    category: "projeto",
    quote:
      "Bolsonier Studios não entrega só aparência. Entrega eixo, visão e capacidade de fazer um universo sustentar mais de uma frente.",
    sourceLabel: "Parceria",
    featured: true,
    sortOrder: 3
  }
] satisfies Prisma.TestimonialCreateManyInput[];

export const characterSeed = [
  {
    name: "Jairene de Bolsonier",
    slug: "jairene-de-bolsonier",
    title: "Matriarca de rito e ruído",
    allegiance: "Casa Bolsonier",
    summary:
      "Figura central da Bastilha. Alterna liturgia, teatro político e sobrevivência simbólica.",
    featured: true,
    sortOrder: 1
  },
  {
    name: "Luísa Ignácia de Silvene",
    slug: "luisa-ignacia-de-silvene",
    title: "Elegância em estado de guerra",
    allegiance: "Casa Silvene",
    summary:
      "Aparência contida, tensão interna e leitura fina do jogo ao redor. Carrega emoção sem perder postura.",
    featured: true,
    sortOrder: 2
  },
  {
    name: "Alexandra de Moraes y Valença",
    slug: "alexandra-de-moraes-y-valenca",
    title: "Frieza de arquivo",
    allegiance: "Valença",
    summary:
      "Uma presença que observa, calcula e move o clima da cena sem precisar elevar a voz.",
    featured: true,
    sortOrder: 3
  },
  {
    name: "Don Trumpetti Vittorio",
    slug: "don-trumpetti-vittorio",
    title: "Heráldica do excesso",
    allegiance: "Corte externa",
    summary:
      "Personagem que desloca o ambiente pela performance, pelo ruído e pelo ego em estado permanente de desfile.",
    featured: false,
    sortOrder: 4
  }
] satisfies Prisma.BastilhaCharacterCreateInput[];

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
    kind: WallPostKind.UPDATE,
    title: "A corte abriu as portas",
    body: "Bem-vindos ao Salão dos Rumores. Este espaço reúne leituras, teorias e ecos da Bastilha.",
    authorName: "Bolsonier Studios",
    authorKey: "studio",
    pinned: true,
    featured: true
  },
  {
    kind: WallPostKind.THEORY,
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
