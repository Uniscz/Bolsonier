# Bolsonier Studios

Plataforma institucional e autoral para **Bolsonier Studios**, com foco em:
- presença institucional contemporânea
- monetização com mentoria e cursos
- núcleo narrativo premium para a **Bastilha de Bolsonier**
- painel simples de administração
- mural interativo da comunidade chamado **Salão dos Rumores**

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Prisma
- PostgreSQL
- Autenticação simples por cookie assinado com JOSE

## Estrutura
```bash
src/
  app/
  components/
  lib/
prisma/
docs/
```

## Rodando localmente

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Preencha:
- `DATABASE_URL`
- `ADMIN_JWT_SECRET`
- `COURT_JWT_SECRET`
- `ADMIN_PASSWORD_HASH` ou `ADMIN_PASSWORD`

### 3. Gere o banco
```bash
npx prisma migrate dev --name init
```

### 4. Popule o banco com conteúdo inicial
```bash
npm run db:seed
```

### 5. Rode o projeto
```bash
npm run dev
```

## Login do admin
A rota de login fica em:

```bash
/admin/login
```

O painel usa senha baseada em variável de ambiente.

### Gerar hash bcrypt
Você pode gerar um hash rápido assim:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash(process.argv[1], 10).then(console.log)" "SUA_SENHA_AQUI"
```

Depois cole o resultado em `ADMIN_PASSWORD_HASH`.

## Mural da Bastilha
O mural usa um fluxo simples:
- qualquer visitante pode ler
- para publicar, reagir e votar, o usuário cria um **passe da corte**
- esse passe gera uma sessão leve por cookie assinado

Isso mantém a experiência rápida e já cria um nível básico de participação sem exigir onboarding pesado.

## Conteúdo editável via admin
- seções institucionais
- projetos
- cursos
- episódios
- feedbacks
- personagens da Bastilha
- cronologia da Bastilha
- posts do mural
- enquetes
- contatos recebidos

## Deploy

### Recomendado
- **Vercel** para aplicação
- **Neon**, **Supabase** ou **Railway** para PostgreSQL

### Variáveis obrigatórias em produção
- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `ADMIN_JWT_SECRET`
- `COURT_JWT_SECRET`
- `ADMIN_PASSWORD_HASH`

### Build
```bash
npm run build
```

## Observações de manutenção
- O conteúdo institucional principal é modularizado por `SiteSection`
- Os domínios centrais da marca estão isolados em modelos próprios
- O admin atual é um MVP sólido e simples, pensado para evolução
- Upload de mídia está preparado por URL. Se quiser, o próximo passo natural é integrar Cloudinary ou Vercel Blob

## Próximos upgrades sugeridos
1. edição inline com formulários de update por item
2. upload real de mídia
3. editor rico para descrições longas
4. autenticação social para o mural
5. e-mail transacional no contato
6. analytics e eventos de conversão
7. blog ou área de novidades institucional

## Blueprint
O documento de arquitetura inicial está em:

```bash
docs/product-blueprint.md
```
