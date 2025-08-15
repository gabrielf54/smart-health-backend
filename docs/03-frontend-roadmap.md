# Smart Health - Frontend Roadmap

## 🎯 Tecnologias

### Web (MVP)
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Roteamento**: React Router DOM
- **Estado**: Zustand
- **HTTP**: Axios + React Query (TanStack Query)
- **Formulários**: React Hook Form + Zod
- **Deploy**: Vercel

### Mobile (Versão 3.0)
- **Framework**: React Native + Expo
- **Navegação**: React Navigation
- **Estado**: Zustand (compartilhado)
- **Styling**: NativeWind (Tailwind para RN)

## 📦 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/            # Componentes básicos (Shadcn)
│   ├── forms/         # Formulários específicos
│   └── charts/        # Gráficos e visualizações
├── pages/             # Páginas/rotas principais
├── hooks/             # Custom hooks
├── store/             # Gerenciamento de estado
├── services/          # APIs e serviços
├── utils/             # Funções utilitárias
├── types/             # Tipos TypeScript
├── constants/         # Constantes da aplicação
└── assets/            # Imagens e arquivos estáticos
```

## 🚀 ETAPA 1 - MVP

### Configuração Base
- [ ] Configurar Vite + React + TypeScript
- [ ] Configurar Tailwind CSS + Shadcn/ui
- [ ] Configurar React Router
- [ ] Configurar Zustand para estado global
- [ ] Configurar Axios + React Query
- [ ] Setup básico de deploy (Vercel)

### Autenticação e Layout
- [ ] Layout principal da aplicação
- [ ] Página de login (`/login`)
- [ ] Página de registro (`/register`)
- [ ] Formulários com validação (React Hook Form + Zod)
- [ ] Context de autenticação
- [ ] Proteção de rotas privadas
- [ ] Loading states e error handling

### Onboarding do Usuário
- [ ] Página de perfil inicial (`/onboarding`)
- [ ] Formulário de dados pessoais
- [ ] Seleção de nível de atividade
- [ ] Definição de objetivos
- [ ] Stepper/wizard de cadastro
- [ ] Validações em tempo real
- [ ] Persistência de dados

### Dashboard e Dieta
- [ ] Dashboard principal (`/dashboard`)
- [ ] Visualização da dieta atual
- [ ] Cards de informações nutricionais
- [ ] Navegação entre seções
- [ ] Responsividade mobile-first
- [ ] Estados de loading/error

## 🎨 ETAPA 2 - Tipo Corporal

### Seleção Visual de Tipo Corporal
- [ ] Página de tipo corporal (`/onboarding/body-type`)
- [ ] Galeria de imagens corporais (silhuetas)
- [ ] Componente de seleção visual
- [ ] Questionário complementar
- [ ] Integração com o backend
- [ ] Animações suaves e interface intuitiva

### Ajustes na Dieta
- [ ] Recálculo automático da dieta baseado no tipo corporal
- [ ] Indicadores visuais das mudanças
- [ ] Feedback ao usuário sobre os ajustes

## 📊 ETAPA 3 - Acompanhamento

### Registro de Progresso
- [ ] Página de progresso (`/progress`)
- [ ] Formulário de registro de peso
- [ ] Histórico de pesagens
- [ ] Validações e feedback visual
- [ ] Interface intuitiva para registros

### Gráficos e Dashboard
- [ ] Gráfico simples de evolução de peso
- [ ] Dashboard de progresso básico
- [ ] Métricas de variação de peso
- [ ] Indicadores de meta atingida

## 🔄 ETAPA 4 - Substituições

### Preferências Alimentares
- [ ] Página de preferências (`/profile/preferences`)
- [ ] Formulário de alergias e restrições
- [ ] Lista de alimentos não preferidos
- [ ] Interface para atualizar preferências

### Sistema de Substituições
- [ ] Modal de substituição de alimentos
- [ ] Lista de alternativas nutricionalmente equivalentes
- [ ] Comparação nutricional lado a lado
- [ ] Botão "trocar" em cada alimento da dieta
- [ ] Histórico de substituições

## 📸 ETAPA 5 - Fotos

### Upload de Fotos
- [ ] Página de fotos de progresso (`/progress/photos`)
- [ ] Upload com drag & drop
- [ ] Preview antes do upload
- [ ] Validações de formato e tamanho
- [ ] Indicadores de progresso de upload

#### Fluxo de Upload (Cloudflare R2)
- [ ] Solicitar URL pré-assinada ao backend (`POST /progress/photo/presign`)
- [ ] Fazer `PUT` direto do browser para a URL pré-assinada (R2 S3-compatible)
- [ ] Notificar backend para persistir metadados (`POST /progress/photo`)
- [ ] Exibir imagem via URL assinada de leitura fornecida pelo backend
- [ ] Tratar cancelamento/retry e feedback de progresso

### Galeria de Progresso
- [ ] Timeline de fotos organizadas por data
- [ ] Galeria de "antes e depois"
- [ ] Comparações lado a lado
- [ ] Possibilidade de adicionar anotações
- [ ] Interface motivadora e privada

## 🤖 ETAPA 6 - Inteligência Artificial

### Dietas com IA
- [ ] Botão para gerar dieta com IA
- [ ] Loading states específicos para IA
- [ ] Visualização aprimorada das dietas geradas
- [ ] Feedback do usuário sobre qualidade
- [ ] Sistema de fallback para templates

### Substituições Inteligentes
- [ ] Substituições com explicações da IA
- [ ] Sugestões mais criativas e variadas
- [ ] Interface para aprovar/rejeitar sugestões
- [ ] Aprendizado baseado nas escolhas

### Chat Nutricional
- [ ] Interface de chat básico
- [ ] Histórico de conversas
- [ ] Respostas contextualizadas
- [ ] Disclaimers sobre limitações

## 📱 ETAPA 7 - App Mobile

### React Native Setup
- [ ] Configurar Expo + TypeScript
- [ ] Configurar React Navigation
- [ ] Configurar NativeWind (Tailwind para RN)
- [ ] Compartilhar tipos e utils com web
- [ ] Setup de build (EAS Build)

### Funcionalidades Core Mobile
- [ ] Telas principais adaptadas para mobile
- [ ] Sincronização de dados com web
- [ ] Interface touch otimizada
- [ ] Navegação com gestos nativos

### Funcionalidades Mobile-Específicas
- [ ] Câmera integrada para fotos de progresso
- [ ] Push notifications
- [ ] Biometria para login
- [ ] Funcionalidades offline básicas
- [ ] Widget para tela inicial

## 💰 ETAPA 8 - Monetização

### Planos e Pagamentos
- [ ] Página de planos (`/pricing`)
- [ ] Interface de checkout
- [ ] Integração com Stripe/PagSeguro
- [ ] Gestão de assinatura no perfil
- [ ] Indicadores de plano atual

### Funcionalidades Premium
- [ ] Controle de acesso por plano
- [ ] Interface diferenciada para premium
- [ ] Chat ilimitado com IA
- [ ] Relatórios avançados em PDF
- [ ] Receitas detalhadas

### Sistema de Referência
- [ ] Página de indicações
- [ ] Código de referência pessoal
- [ ] Tracking de indicações
- [ ] Sistema de recompensas
- [ ] Gamificação básica

## 🎨 Design System

### Componentes Base (Shadcn/ui)
- [ ] Button, Input, Card, Modal
- [ ] Form components
- [ ] Navigation components
- [ ] Data display components

### Componentes Customizados
- [ ] `NutritionCard` - Card de informações nutricionais
- [ ] `ProgressChart` - Gráfico de progresso
- [ ] `FoodSearchBar` - Busca de alimentos
- [ ] `MealPlanCard` - Card de refeição
- [ ] `PhotoUpload` - Upload de imagens
- [ ] `BodyTypeSelector` - Seletor de tipo corporal

### Tema e Cores
```css
:root {
  --primary: #10b981;      /* Verde saúde */
  --secondary: #f59e0b;    /* Laranja energia */
  --accent: #3b82f6;       /* Azul info */
  --success: #059669;      /* Verde sucesso */
  --warning: #d97706;      /* Laranja aviso */
  --error: #dc2626;        /* Vermelho erro */
  --background: #fafafa;   /* Cinza claro */
  --card: #ffffff;         /* Branco */
  --text: #1f2937;         /* Cinza escuro */
  --muted: #6b7280;        /* Cinza médio */
}
```

## 📋 Páginas e Rotas

### Públicas
```
/                    # Landing page
/login               # Login
/register            # Registro
/forgot-password     # Recuperar senha
```

### Privadas
```
/dashboard           # Dashboard principal
/onboarding          # Primeiro acesso
/profile             # Perfil do usuário
/diet                # Plano alimentar
/foods               # Busca de alimentos
/progress            # Acompanhamento
/photos              # Fotos de progresso
/reports             # Relatórios
/settings            # Configurações
```

## 🎯 Componentes por Página

### Dashboard
- `WelcomeCard` - Boas-vindas personalizada
- `CaloriesSummary` - Resumo calórico do dia
- `MacronutrientsChart` - Gráfico de macros
- `TodayMeals` - Refeições do dia
- `QuickActions` - Ações rápidas

### Diet Plan
- `MealPlanCard` - Card de refeição
- `NutritionFacts` - Informações nutricionais
- `SubstituteButton` - Botão de substituição
- `MealNotes` - Observações da refeição

### Progress
- `WeightChart` - Gráfico de peso
- `PhotoTimeline` - Timeline de fotos
- `ProgressStats` - Estatísticas de progresso
- `GoalProgress` - Progresso dos objetivos

## 🔧 Hooks Customizados

```typescript
// Autenticação
useAuth()           // Estado de autenticação
useProfile()        // Dados do perfil

// Dados
useDiet()           // Plano alimentar atual
useProgress()       // Dados de progresso
useFoodSearch()     // Busca de alimentos

// UI
useToast()          // Notificações
useModal()          # Modais
useDebounce()       // Debounce para inputs
```

## 📊 Estado Global (Zustand)

```typescript
interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  
  // Profile
  profile: UserProfile | null
  
  // Diet
  currentDiet: Diet | null
  
  // UI
  isLoading: boolean
  theme: 'light' | 'dark'
}
```

## 🧪 Testes

### Estratégia de Testes
- **Unitários**: Hooks e utilitários (Vitest)
- **Componentes**: React Testing Library
- **E2E**: Playwright (features críticas)
- **Visual**: Chromatic/Storybook

### Cobertura Mínima
- Components: 70%
- Hooks: 90%
- Utils: 95%
- Pages: 60%

## 📱 Responsividade

### Breakpoints
```css
sm: 640px    /* Mobile large */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Desktop large */
```

### Estratégia Mobile-First
- Design principal para mobile
- Progressive enhancement para desktop
- Touch-friendly targets (44px mínimo)
- Navegação otimizada para polegar

## ⚡ Performance

### Otimizações
- Code splitting por rota
- Lazy loading de componentes
- Otimização de imagens
- Cache estratégico (React Query)
- Bundle analysis

### Métricas Alvo
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

## 🚀 Deploy e CI/CD

### Estratégia de Deploy
- **Staging**: Deploy automático na branch `develop`
- **Production**: Deploy após merge na `main`
- **Preview**: Deploy de PRs para review

### Pipeline CI/CD
1. Lint e Type checking
2. Testes unitários
3. Build da aplicação
4. Testes E2E (staging)
5. Deploy automático
6. Smoke tests