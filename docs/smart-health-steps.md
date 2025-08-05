# Smart Health - Nutricionista com IA

## 📋 Visão Geral
Aplicação que funciona como um nutricionista com inteligência artificial, criando dietas personalizadas e acompanhando a evolução do usuário.

## 🎯 Funcionalidades Principais
- **Cadastro e Perfil**: Usuário informa dados pessoais (idade, peso, altura)
- **Tipo Corporal**: Seleção visual com imagens para entender formato corporal
- **Rotina e Atividades**: Informações sobre rotina diária e exercícios físicos
- **Preferências Alimentares**: Alergias, restrições e gostos pessoais
- **Objetivos**: Perder peso, ganhar massa magra, manter peso
- **Geração de Dieta**: Cálculo personalizado com IA
- **Substituições**: Trocar alimentos com sugestões inteligentes
- **Acompanhamento**: Registro de peso e fotos de progresso
- **Relatórios**: Visualização da evolução

## 🛠️ Stack Tecnológico
- **Backend**: Node.js + TypeScript + Express + Prisma
- **Frontend**: React + TypeScript (futuro: React Native)
- **Banco**: PostgreSQL
- **IA**: OpenAI API
- **Deploy**: Vercel + Railway/Render

## 📁 Documentação Estruturada

### 📖 Documentos de Planejamento
1. **[01-projeto-contexto-geral.md](./01-projeto-contexto-geral.md)**
   - Visão completa do produto
   - Regras de negócio detalhadas
   - Fluxo da aplicação
   - Estratégia de desenvolvimento (MVP → v2.0 → v3.0)

2. **[02-backend-roadmap.md](./02-backend-roadmap.md)**
   - Roadmap completo do backend
   - Estrutura do projeto Node.js/TypeScript
   - APIs e endpoints detalhados
   - Cronograma de sprints
   - Configurações de deploy e monitoramento

3. **[03-frontend-roadmap.md](./03-frontend-roadmap.md)**
   - Roadmap do frontend React
   - Componentes e páginas
   - Design system
   - Estratégia mobile-first
   - Planos para React Native

4. **[04-database-schema.md](./04-database-schema.md)**
   - Schema completo do PostgreSQL
   - Evolução das tabelas (MVP → versões futuras)
   - Índices e otimizações
   - Funções e triggers
   - Estratégias de backup

5. **[05-etapas-desenvolvimento-evolucao.md](./05-etapas-desenvolvimento-evolucao.md)**
   - Cronograma detalhado por sprints (53 semanas)
   - Marcos e entregas específicas
   - Métricas e KPIs por fase
   - Critérios de Go/No-Go
   - Gestão de riscos e contingências

## 🚀 Próximos Passos

### ETAPA 1 - MVP (2-3 meses)
**Objetivo**: Aplicação funcional básica para validação
- [ ] **Cadastro**: Sistema de autenticação completo
- [ ] **Coleta de Dados**: Dados pessoais, atividade, objetivos
- [ ] **Gerar Dieta**: Algoritmo simples com templates
- [ ] **Visualização**: Interface clara da dieta personalizada

**Meta**: 50+ usuários, 30% retenção em 7 dias

### ETAPA 2 - Tipo Corporal (3-4 semanas)
**Objetivo**: Melhorar precisão do cálculo calórico
- [ ] **Seleção Visual**: Galeria de tipos corporais
- [ ] **Questionário**: Distribuição gordura, metabolismo
- [ ] **Ajuste Automático**: Recálculo das dietas

**Meta**: 70% completam seleção, 20% melhoria satisfação

### ETAPA 3 - Acompanhamento (3-4 semanas)
**Objetivo**: Permitir registro e visualização de progresso
- [ ] **Registro de Peso**: Formulário simples e histórico
- [ ] **Gráficos**: Evolução visual do progresso
- [ ] **Dashboard**: Métricas motivacionais

**Meta**: 60% registram peso semanalmente

### ETAPA 4 - Substituições (4-6 semanas)
**Objetivo**: Personalização baseada em preferências
- [ ] **Preferências**: Alergias, restrições, gostos
- [ ] **Sistema de Troca**: Equivalências nutricionais
- [ ] **Interface Intuitiva**: Botão "trocar" em cada alimento

**Meta**: 40% fazem substituições

### ETAPA 5 - Fotos (4-6 semanas)
**Objetivo**: Acompanhamento visual de progresso
- [ ] **Upload**: Interface para fotos de progresso  
- [ ] **Galeria**: Timeline e comparações antes/depois
- [ ] **Privacidade**: Fotos visíveis apenas ao usuário

**Meta**: 30% fazem upload de fotos

### ETAPA 6 - IA (6-8 semanas)
**Objetivo**: Dietas inteligentes e personalizadas
- [ ] **OpenAI**: Integração para geração de dietas
- [ ] **Substituições IA**: Sugestões inteligentes
- [ ] **Chat**: Respostas sobre nutrição

**Meta**: 80% aprovam dietas IA

### ETAPA 7 - Mobile (8-12 semanas)
**Objetivo**: App móvel para uso diário
- [ ] **React Native**: App iOS e Android
- [ ] **Sincronização**: Dados compartilhados web/mobile
- [ ] **Features Mobile**: Câmera, push notifications

**Meta**: 70% baixam app

### ETAPA 8 - Premium (4-6 semanas)
**Objetivo**: Modelo de negócio sustentável
- [ ] **Planos**: Gratuito vs Premium
- [ ] **Pagamentos**: Stripe/PagSeguro
- [ ] **Features Premium**: IA avançada, relatórios

**Meta**: 5% conversão, R$ 10k/mês receita

## 📊 Cronograma Resumido

| Etapa | Duração | Objetivo Principal | Status |
|-------|---------|-------------------|--------|
| **MVP** | 2-3 meses | Cadastro + Coleta + Dieta básica | 🎯 |
| **Tipo Corporal** | 3-4 semanas | Seleção visual + ajuste calorias | ⏳ |
| **Acompanhamento** | 3-4 semanas | Registro peso + gráficos | ⏳ |
| **Substituições** | 4-6 semanas | Preferências + troca alimentos | ⏳ |
| **Fotos Progresso** | 4-6 semanas | Upload + galeria visual | ⏳ |
| **Inteligência IA** | 6-8 semanas | OpenAI + dietas inteligentes | ⏳ |
| **App Mobile** | 8-12 semanas | React Native + sincronização | ⏳ |
| **Monetização** | 4-6 semanas | Planos premium + pagamentos | ⏳ |

**📈 Meta Final**: 15k+ usuários, app móvel completo, R$ 50k/mês receita

## 🎯 Foco Imediato - ETAPA 1 MVP

### Começar Hoje
1. **Leia a documentação**: Especialmente `05-etapas-desenvolvimento-evolucao.md`
2. **Configure ambiente**: Node.js + PostgreSQL + React
3. **Backend primeiro**: Autenticação e banco de dados
4. **Frontend em paralelo**: Interface básica
5. **Foque no essencial**: Cadastro → Coleta → Dieta

### Primeiras Semanas
- **Semana 1**: Setup completo + autenticação funcionando
- **Semana 2**: Coleta de dados pessoais + perfil
- **Semana 3**: Banco de alimentos + templates de dieta
- **Semana 4**: Interface de visualização da dieta

### Critério de Sucesso MVP
✅ Usuário consegue se cadastrar  
✅ Usuário preenche dados pessoais  
✅ Sistema calcula necessidades calóricas  
✅ Sistema gera dieta personalizada  
✅ Usuário visualiza plano alimentar completo  

---

**🚀 Importante**: Complete CADA etapa totalmente antes de passar para a próxima. Priorize funcionalidade sobre estética no MVP!