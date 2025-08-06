# Smart Health - Contexto Geral e Regras de Negócio

## 📋 Visão Geral
Aplicação de nutricionista com inteligência artificial que cria dietas personalizadas e acompanha a evolução do usuário.

## 🎯 Objetivos do Produto
- Democratizar o acesso a orientação nutricional de qualidade
- Personalizar dietas baseadas em perfil individual e objetivos
- Acompanhar evolução e progresso do usuário
- Facilitar substituições alimentares inteligentes

## 👥 Personas
- **Usuário Principal**: Pessoas que buscam orientação nutricional personalizada
- **Faixa Etária**: 18-65 anos
- **Objetivos**: Perder peso, ganhar massa muscular, manter peso saudável

## 🔄 Fluxo Principal da Aplicação

### 1. Onboarding do Usuário
- Cadastro básico (email, senha)
- Dados pessoais (idade, peso, altura, sexo)
- Seleção de tipo corporal (visual com imagens)
- Informações sobre rotina diária
- Nível de atividade física
- Objetivos (perder massa, ganhar massa magra, manter peso)

### 2. Perfil Alimentar
- Alergias e intolerâncias
- Restrições alimentares (vegetariano, vegano, etc.)
- Preferências alimentares
- Alimentos que não gosta

### 3. Geração da Dieta
- Cálculo de necessidades calóricas (TMB + atividades)
- Distribuição de macronutrientes
- Sugestão de cardápio semanal
- Receitas e preparos

### 4. Acompanhamento
- Registro de peso semanal
- Upload de fotos de progresso
- Relatórios de evolução
- Ajustes na dieta conforme progresso

### 5. Funcionalidades Interativas
- Substituição de alimentos
- Chat com IA para dúvidas
- Notificações e lembretes

## 📊 Regras de Negócio

### Cálculo Calórico
- **TMB (Taxa Metabólica Basal)**: Fórmula de Harris-Benedict
  - Homens: TMB = 88,362 + (13,397 × peso) + (4,799 × altura) - (5,677 × idade)
  - Mulheres: TMB = 447,593 + (9,247 × peso) + (3,098 × altura) - (4,330 × idade)
- **Fator de Atividade**:
  - Sedentário: TMB × 1.2
  - Levemente ativo: TMB × 1.375
  - Moderadamente ativo: TMB × 1.55
  - Muito ativo: TMB × 1.725
  - Extremamente ativo: TMB × 1.9

### Objetivos e Ajustes Calóricos
- **Perder peso**: -300 a -500 kcal do gasto total
- **Manter peso**: Gasto calórico total
- **Ganhar massa magra**: +200 a +400 kcal do gasto total
- **Ganhar peso**: +400 a +700 kcal do gasto total

### Distribuição de Macronutrientes
- **Proteínas**: 1.6-2.2g por kg de peso corporal
- **Gorduras**: 20-35% das calorias totais
- **Carboidratos**: Restante das calorias

### Validações e Restrições
- Peso mínimo: 30kg, máximo: 300kg
- Altura mínima: 1.20m, máxima: 2.50m
- Idade mínima: 16 anos, máxima: 100 anos
- Calorias mínimas: 1200 kcal/dia
- Máximo de 3 substituições por refeição

## 🚀 Estratégia de Desenvolvimento por Etapas

### ETAPA 1 - MVP (2-3 meses)
**Funcionalidades Core:**
1. ✅ Cadastro e autenticação de usuário
2. ✅ Coleta de dados básicos (peso, altura, idade, sexo)
3. ✅ Seleção de nível de atividade física
4. ✅ Definição de objetivos simples
5. ✅ Cálculo calórico básico
6. ✅ Geração de dieta simples (templates)
7. ✅ Visualização do plano alimentar

### ETAPA 2 - Tipo Corporal (3-4 semanas)
**Funcionalidades:**
1. 🎨 Seleção visual de tipo corporal
2. 📊 Questionário complementar (distribuição gordura, metabolismo)
3. ⚙️ Ajuste automático das dietas baseado no tipo corporal

### ETAPA 3 - Acompanhamento (3-4 semanas)
**Funcionalidades:**
1. 📊 Registro de peso com histórico
2. 📈 Gráfico de evolução
3. 🎯 Dashboard básico de progresso

### ETAPA 4 - Substituições (4-6 semanas)
**Funcionalidades:**
1. 🔄 Sistema de substituição de alimentos
2. 🚫 Cadastro de preferências e restrições
3. 🔍 Banco de equivalências nutricionais

### ETAPA 5 - Fotos de Progresso (4-6 semanas)
**Funcionalidades:**
1. 📸 Upload e gerenciamento de fotos
2. 🖼️ Galeria de progresso temporal
3. 📋 Relatórios visuais

### ETAPA 6 - Inteligência Artificial (6-8 semanas)
**Funcionalidades:**
1. 🤖 Integração com OpenAI para geração de dietas
2. 🧠 Substituições inteligentes
3. 💬 Chat nutricional básico

### ETAPA 7 - App Mobile (8-12 semanas)
**Funcionalidades:**
1. 📱 App React Native
2. 📷 Câmera integrada para fotos
3. 🔔 Push notifications
4. 🔄 Sincronização web/mobile

### ETAPA 8 - Monetização (4-6 semanas)
**Funcionalidades:**
1. 💳 Sistema de pagamento (planos premium)
2. 🎯 Funcionalidades premium (IA avançada, relatórios)
3. 🎁 Sistema de referência
