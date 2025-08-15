# Smart Health - Backend Roadmap

## 🎯 Tecnologias
- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Banco**: PostgreSQL
- **Autenticação**: JWT + bcrypt
- **Validação**: Zod
- **Upload**: Cloudflare R2 (compatível com S3)
- **IA**: OpenAI API
- **Deploy**: Render

## 📦 Estrutura do Projeto

```
src/
├── docs/               # Documentação do projeto
├── controllers/        # Controllers das rotas
├── middlewares/        # Middlewares customizados
├── models/             # Tipos TypeScript
├── routes/             # Definição das rotas
├── services/           # Lógica de negócio
├── utils/              # Funções utilitárias
├── config/             # Configurações
├── prisma/             # Schema e migrations
└── tests/              # Testes unitários
```

## 🚀 ETAPA 1

### Configuração Base
- [ ] Configurar projeto Node.js + TypeScript
- [ ] Configurar Express + middlewares básicos
- [ ] Configurar Prisma + PostgreSQL
- [ ] Configurar variáveis de ambiente
- [ ] Configurar CORS e segurança básica
- [ ] Setup de deploy básico

### Sistema de Autenticação
- [ ] Modelo de usuário no banco
- [ ] Endpoint de cadastro (`POST /auth/register`)
- [ ] Endpoint de login (`POST /auth/login`)
- [ ] Middleware de autenticação JWT
- [ ] Endpoint de perfil (`GET /auth/profile`)
- [ ] Validação de dados com Zod
- [ ] Hash de senhas com bcrypt

### Perfil do Usuário
- [ ] Modelo de perfil no banco
- [ ] Endpoint criar/atualizar perfil (`PUT /profile`)
- [ ] Endpoint buscar perfil (`GET /profile`)
- [ ] Validações de dados físicos
- [ ] Cálculo de TMB (Taxa Metabólica Basal)
- [ ] Cálculo de necessidades calóricas

### Sistema de Dietas Básico
- [ ] Modelo de dietas no banco
- [ ] Banco de dados de alimentos básico (200+ itens)
- [ ] Algoritmo simples de geração de dieta
- [ ] Endpoint gerar dieta (`POST /diet/generate`)
- [ ] Endpoint buscar dieta (`GET /diet`)
- [ ] Sistema de templates de refeições

## 🎨 ETAPA 2 - Tipo Corporal

### Funcionalidades
- [ ] Modelo de tipo corporal no banco
- [ ] Endpoint salvar tipo corporal (`PUT /profile/body-type`)
- [ ] Questionário complementar (distribuição gordura, metabolismo)
- [ ] Ajuste do cálculo calórico baseado no tipo corporal
- [ ] Recálculo automático das dietas existentes

## 📊 ETAPA 3 - Acompanhamento

### Registro de Progresso
- [ ] Modelo de registros de peso
- [ ] Endpoint registrar peso (`POST /progress/weight`)
- [ ] Endpoint histórico (`GET /progress/history`)
- [ ] Cálculos de progresso e tendências
- [ ] Validações de dados e limites

### Dashboard
- [ ] Endpoint dados dashboard (`GET /dashboard`)
- [ ] Cálculos de estatísticas de progresso
- [ ] Indicadores de meta atingida

## 🔄 ETAPA 4 - Substituições

### Preferências Alimentares
- [ ] Modelo de preferências no banco
- [ ] Endpoint salvar preferências (`PUT /profile/preferences`)
- [ ] Cadastro de alergias e restrições
- [ ] Validações de preferências

### Sistema de Substituições
- [ ] Algoritmo de substituições simples
- [ ] Endpoint substituir alimento (`POST /diet/substitute`)
- [ ] Base de dados de equivalências nutricionais
- [ ] Histórico de substituições por usuário

## 📸 ETAPA 5 - Fotos

### Upload de Imagens
- [ ] Configurar Cloudflare R2 (compatível com S3)
- [ ] Preferir upload direto via URL pré-assinada (frontend → R2)
- [ ] Endpoint registrar foto (`POST /progress/photo`) — apenas metadados após upload direto
- [ ] Redimensionamento e compressão automática
- [ ] Validações de formato, tamanho e segurança

#### Configuração Cloudflare R2
- [ ] Variáveis de ambiente:
  - `R2_ACCOUNT_ID`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_BUCKET`
  - `R2_PUBLIC_BASE_URL` (ex.: `https://<accountid>.r2.cloudflarestorage.com/<bucket>` ou domínio customizado)
- [ ] SDK `@aws-sdk/client-s3` configurado com:
  - `endpoint`: `https://<accountid>.r2.cloudflarestorage.com`
  - `region`: `auto`
  - `forcePathStyle`: `true`
- [ ] Upload via URL pré-assinada (PUT) usando `@aws-sdk/s3-request-presigner`
- [ ] Objetos privados por padrão; servir via URL assinada quando necessário
- [ ] Padronizar chave do objeto: `progress-photos/{userId}/{yyyy}/{MM}/{dd}/{uuid}.jpg`

### Galeria de Progresso
- [ ] Modelo de fotos de progresso
- [ ] Endpoint listar fotos (`GET /progress/photos`)
- [ ] Organização cronológica
- [ ] Soft delete para privacidade

## 🤖 ETAPA 6 - Inteligência Artificial

### Integração OpenAI
- [ ] Configurar OpenAI API
- [ ] Service para comunicação com IA
- [ ] Prompts otimizados para geração de dietas
- [ ] Sistema de fallback (caso IA falhe)
- [ ] Cache de respostas para otimização de custos

### Funcionalidades IA
- [ ] Endpoint de dieta com IA (`POST /diet/generate-ai`)
- [ ] Substituições inteligentes (`POST /diet/substitute-ai`)
- [ ] Chat nutricional básico (`POST /chat`)
- [ ] Rate limiting específico para IA
- [ ] Controle de custos e monitoramento

## 📱 ETAPA 7 - App Mobile

### API Mobile
- [ ] Otimizações de endpoints para mobile
- [ ] Sincronização offline/online
- [ ] Push notifications backend
- [ ] Versionamento de API
- [ ] Webhooks para notificações

### Funcionalidades Específicas
- [ ] Upload de fotos otimizado para mobile
- [ ] Sincronização de dados entre plataformas
- [ ] Endpoints de configuração de notificações

## 💰 ETAPA 8 - Monetização

### Sistema de Pagamentos
- [ ] Integração Stripe/PagSeguro
- [ ] Modelo de assinaturas no banco
- [ ] Endpoints de planos (`GET /plans`)
- [ ] Controle de features por plano
- [ ] Webhooks de pagamento

### Funcionalidades Premium
- [ ] Middleware de verificação de plano
- [ ] Rate limiting diferenciado por plano
- [ ] Relatórios avançados (`GET /reports/premium`)
- [ ] Funcionalidades exclusivas de IA

### Sistema de Referência
- [ ] Modelo de referências no banco
- [ ] Endpoint de indicação (`POST /referrals`)
- [ ] Sistema de recompensas
- [ ] Tracking de conversões

## 📋 Endpoints da API

### Autenticação
```
POST /auth/register      # Cadastro
POST /auth/login         # Login
GET  /auth/profile       # Perfil atual
POST /auth/refresh       # Refresh token
POST /auth/logout        # Logout
```

### Perfil
```
GET  /profile           # Buscar perfil
PUT  /profile           # Atualizar perfil
```

### Dietas
```
POST /diet/generate     # Gerar dieta
GET  /diet             # Buscar dieta atual
POST /diet/substitute  # Substituir alimento
```

### Progresso
```
POST /progress/weight   # Registrar peso
GET  /progress/history  # Histórico
POST /progress/photo    # Registrar metadados da foto (após upload direto)
POST /progress/photo/presign # URL pré-assinada para upload direto
```

### Alimentos
```
GET  /foods/search     # Buscar alimentos
GET  /foods/:id        # Detalhes do alimento
```

## 🛡️ Segurança e Validações

### Autenticação
- JWT com refresh tokens
- Rate limiting por IP
- Validação de força da senha
- Sanitização de inputs

### Validações
- Zod schemas para todos os endpoints
- Validação de tipos de arquivo
- Limites de tamanho de upload
- Sanitização de dados

### Monitoramento
- Logs estruturados
- Métricas de performance
- Alertas de erro
- Health checks

## 🧪 Testes

### Tipos de Teste
- [ ] Testes unitários (Jest)
- [ ] Testes de integração
- [ ] Testes de API (Supertest)
- [ ] Testes de carga (Artillery)

### Cobertura Mínima
- Controllers: 80%
- Services: 90%
- Utils: 95%
- Middlewares: 85%

## 📊 Métricas e Monitoramento

### KPIs Técnicos
- Response time < 200ms (95th percentile)
- Uptime > 99.5%
- Error rate < 1%
- Cobertura de testes > 80%

### Ferramentas
- New Relic / DataDog (APM)
- LogRocket (Logs)
- Pingdom (Uptime)
- GitHub Actions (CI/CD)