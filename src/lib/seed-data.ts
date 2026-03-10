import { CourseStatus, ProjectStatus, type Prisma } from "@prisma/client";

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
] as const;
