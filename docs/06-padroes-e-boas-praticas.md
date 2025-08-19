# Smart Health - Padrões, Convenções e Boas Práticas

## Estrutura de Pastas (src/)
```
src/
├── config/          # Configurações (ex.: Prisma)
├── controllers/     # Orquestram requisição/resposta. Sem regra de negócio
├── middlewares/     # Middlewares de Express
├── models/          # Classes de domínio (UserModel, ProfileModel, DietModel)
├── routes/          # Definição de rotas -> chamam controllers
├── security/        # Autenticação/Autorização, JWT
├── services/        # Regras de negócio (services em classes) + helpers puros
├── types/           # Tipos TypeScript centralizados (request/response/domain)
├── utils/           # Utilitários puros (sem side effects)
└── index.ts         # Bootstrap do servidor
```

- **Controllers** não contêm regra de negócio. Apenas:
  - Validam entrada (via middleware `validateBody` com schemas em `models/*Schemas.ts`)
  - Invocam services (instâncias singleton de classes)
  - Tratam status code e retornos
- **Services** contêm 100% da regra de negócio, implementados como classes. Não conhecem Express. Podem usar Prisma, utilitários e outros services.
- **Models (domínio)**: classes de leitura/representação de entidades principais quando necessário.
- **Types**: todos os `types` e contratos compartilhados ficam em `src/types/` (ex.: `auth.ts`, `profile.ts`, `diet.ts`, `common.ts`).
- **Rotas** apenas conectam `middlewares` + `controllers`.

## Convenções de Código
- TypeScript estrito (`strict: true`).
- Nomes descritivos:
  - Funções: verbos (`generateDiet`, `calculateCalorieTargets`)
  - Variáveis: substantivos (`userId`, `targetCalories`)
- Padrão de exportação de funções: `export const minhaFunc = (...) => { ... }`.
- Services como classes com singleton exportado: `export const myService = new MyService();`.
- Early returns e tratamento de erros com `throw` no service. Controllers usam `errorHandler` global.
- Sem comentários triviais. Comente apenas o “porquê”.

## Validação
- Use Zod em `src/models/*Schemas.ts`.
- Tipos inferidos/contratos públicos ficam em `src/types/` (não exportar `type` dos schemas Zod diretamente).
- Middleware `validateBody(schema)` injeta `req.validated`.
- Não usar validação manual nos controllers.

## Autenticação/Autorização
- JWT via `Authorization: Bearer <token>`.
- Middleware `authMiddleware` injeta `req.userId`.
- Refresh token também via body validado por Zod.

## Acesso a Dados
- Prisma centralizado em `src/config/prisma.ts`.
- Não instanciar `new PrismaClient()` fora desse arquivo.

## Cálculos de Negócio
- Funções puras em `src/services/*` (ex.: `calories.ts`).
- Seguir regras das docs (Harris-Benedict, fatores de atividade, mínimos/máximos).

## Erros e Respostas
- Services lançam `Error` com `{ status }` quando aplicável.
- Middleware `errorHandler` converte para `{ error: message }` e status adequado.
- Nunca retornar stack traces para o cliente.

## Segurança
- `helmet`, `cors`, `rate-limit`, `compression` habilitados.
- Sanitização: Zod + validações de negócio.
- JWT secrets e `DATABASE_URL` via `.env` (não commitar valores reais).

## Estilo e Formatação
- Sem reformatar código não relacionado.
- Linhas longas, dividir em múltiplas linhas legíveis.
- Evitar ternários complexos; prefira blocos claros.

## Padrão de Commits (sugestão)
- `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`

## Testes (quando adicionados)
- Unit: Services e utils com alta cobertura.
- E2E/API: rotas principais com Supertest.

## Endpoints (ETAPA 1)
- Autenticação: `/auth/register`, `/auth/login`, `/auth/profile`, `/auth/refresh`, `/auth/logout`
- Perfil: `/profile` (GET/PUT)
- Dietas: `/diet` (GET), `/diet/generate` (POST)

## Fluxo de Desenvolvimento
1. Defina schema Zod em `models/`.
2. Crie service com regra de negócio.
3. Crie controller que chama o service.
4. Exponha pela rota com `validateBody` e middlewares necessários.
5. Adicione testes.

Consulte também o guia complementar em `docs/padrao-de-projeto.mdc` para exemplos práticos de:
- Como instanciar services (classes + singleton)
- Padrões de funções (`export const ... = () => {}`)
- Organização de tipos em `src/types/`
- Estrutura de controllers e rotas


