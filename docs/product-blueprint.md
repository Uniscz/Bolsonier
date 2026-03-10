# Bolsonier Studios — Product Blueprint

## 1. Objetivo do produto
Construir uma plataforma institucional e autoral para a marca **Bolsonier Studios**, unindo:
1. autoridade criativa
2. monetização via mentoria e cursos
3. comunidade e universo narrativo com destaque para **Bastilha de Bolsonier**

A experiência precisa parecer uma produtora contemporânea real, com presença, direção e estrutura de crescimento.

## 2. Arquitetura de informação
- Home
- Sobre
- Mentoria
- Cursos
- Curso individual
- Episódios
- Projetos
- Projeto individual
- Feedbacks
- Contato
- Bastilha de Bolsonier
- Bastilha > Personagens
- Bastilha > Cronologia
- Bastilha > Salão dos Rumores
- Bastilha > Entrar no mural
- Admin > Dashboard
- Admin > Seções
- Admin > Projetos
- Admin > Cursos
- Admin > Episódios
- Admin > Feedbacks
- Admin > Bastilha
- Admin > Mural
- Admin > Contatos

## 3. Lista de rotas
### Públicas
- `/`
- `/sobre`
- `/mentoria`
- `/cursos`
- `/cursos/[slug]`
- `/episodios`
- `/projetos`
- `/projetos/[slug]`
- `/feedbacks`
- `/contato`
- `/bastilha`
- `/bastilha/personagens`
- `/bastilha/cronologia`
- `/bastilha/mural`
- `/bastilha/mural/entrar`

### Admin
- `/admin/login`
- `/admin`
- `/admin/sections`
- `/admin/projects`
- `/admin/courses`
- `/admin/episodes`
- `/admin/testimonials`
- `/admin/bastilha`
- `/admin/wall`
- `/admin/contacts`

### Infra
- `/sitemap.xml`
- `/robots.txt`
- `/api/contact`
- `/api/mural/session`
- `/api/mural/posts`
- `/api/mural/reactions`
- `/api/mural/polls/vote`

## 4. Modelos de dados
- `SiteSection`
  - conteúdo modular editável por página
- `MentorshipOffer`
  - oferta de mentoria
- `Course`
  - cursos, módulos, bônus, FAQ e status
- `Project`
  - projetos atuais, futuros e em desenvolvimento
- `Episode`
  - atos, temporadas, links externos e organização por série
- `Testimonial`
  - prova social qualitativa
- `BastilhaCharacter`
  - personagens do universo premium
- `TimelineEvent`
  - cronologia e dossiê
- `WallPost`
  - publicações do mural
- `WallReaction`
  - reações aos posts
- `Poll`
  - enquete do mural
- `PollOption`
  - opções da enquete
- `PollVote`
  - voto único por visitante autenticado
- `ContactSubmission`
  - contatos recebidos

## 5. Estratégia visual resumida
- Base escura e neutra
- Tipografia contemporânea com contraste entre texto funcional e títulos fortes
- Grid limpo, espaços largos e cards com presença editorial
- Hero institucional com profundidade, não uma landing vazia
- Atmosfera de produtora premium contemporânea
- Bastilha com identidade interna própria, mas ainda integrada à marca-mãe
- Sem luxo caricato, sem vibe de curso barato, sem template genérico

## 6. Plano técnico resumido
- **Framework**: Next.js App Router
- **Linguagem**: TypeScript
- **Estilo**: Tailwind CSS + componentes autorais acessíveis
- **Animação**: Framer Motion com aparições discretas
- **Banco**: PostgreSQL
- **ORM**: Prisma
- **Admin**: painel protegido por cookie assinado via JOSE
- **Comunidade**: sessão leve com nome de exibição para interações do mural
- **SEO**: metadata por rota, Open Graph, robots, sitemap e schema básico
- **Escalabilidade**: conteúdo modular, modelos claros, rotas limpas e CRUD básico para expansão

## 7. Direção do mural
Nome escolhido: **Salão dos Rumores**

Motivos:
- tem força temática
- funciona como comunidade e lugar narrativo
- conversa com intriga, leitura pública e expectativa
- é memorável sem soar kitsch

## 8. Critérios de implementação
- mobile-first real
- sem páginas vazias
- home com função institucional e comercial
- bastilha tratada como ala premium
- admin simples o bastante para usar
- código legível e modular para continuar evoluindo
