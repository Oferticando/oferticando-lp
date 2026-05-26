@AGENTS.md

# oferticando-lp — Landing Page Pública

Landing page estática do Oferticando. Visitantes anônimos, sem autenticação própria.

## Stack
Next.js 16 · TypeScript · Tailwind CSS 4 · PrimeReact · Lucide React · React Query v5

## Comandos
```bash
npm run dev    # http://localhost:43000
npm run build
npm start      # http://localhost:43000
```

## Estrutura
```
src/app/          → rotas (App Router)
src/components/   → componentes UI reutilizáveis
src/services/     → chamadas REST à API
src/lib/          → helpers e utilitários
src/hooks/        → hooks customizados
```

## Regras
- Chamadas de API: **somente** rotas `/api/public/*` via `NEXT_PUBLIC_API_URL`
- **Sem NextAuth** — não há sessão nem cookies de autenticação
- Links de login e cadastro apontam para `NEXT_PUBLIC_APP_URL`
- Docker: porta `43000`, rede interna `oferticando_net`

## Variáveis de ambiente
```
NEXT_PUBLIC_API_URL=http://localhost:43003
NEXT_PUBLIC_APP_URL=http://localhost:43002
```
