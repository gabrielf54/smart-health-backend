# Smart Health - Database Schema

## 🎯 Tecnologia
- **SGBD**: PostgreSQL 14+
- **ORM**: Prisma
- **Migrations**: Prisma Migrate
- **Backup**: Automated daily backups
- **Deploy**: Railway/Render PostgreSQL

## 📊 Evolução do Schema

### MVP - Fase 1 (Tabelas Essenciais)
```sql
-- Usuários básicos
users
user_profiles
activity_levels
goals

-- Alimentos e nutrição
foods
food_categories
nutritional_info

-- Dietas
diets
diet_meals
meal_foods

-- Progresso
weight_records
```

### Versão 2.0 (Expansão)
```sql
-- Funcionalidades avançadas
progress_photos
food_substitutions
diet_preferences
allergies_intolerances

-- IA e personalizacao
ai_interactions
diet_adjustments
user_feedback
```

### Versão 3.0 (Recursos Premium)
```sql
-- Chat e notificações
chat_conversations
chat_messages
notifications
user_settings

-- Receitas e planejamento
recipes
recipe_ingredients
meal_plans
shopping_lists

-- Pagamentos
subscriptions
payments
```

## 🗄️ Schema Detalhado - MVP

### Tabela: users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### Tabela: user_profiles
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    birth_date DATE,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    height_cm INTEGER CHECK (height_cm BETWEEN 120 AND 250),
    initial_weight_kg DECIMAL(5,2) CHECK (initial_weight_kg BETWEEN 30 AND 300),
    activity_level_id INTEGER REFERENCES activity_levels(id),
    goal_id INTEGER REFERENCES goals(id),
    body_type VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- Índices
CREATE INDEX idx_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_profiles_activity_level ON user_profiles(activity_level_id);
```

### Tabela: activity_levels
```sql
CREATE TABLE activity_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    multiplier DECIMAL(3,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Dados iniciais
INSERT INTO activity_levels (name, description, multiplier) VALUES
('Sedentário', 'Pouco ou nenhum exercício', 1.20),
('Levemente Ativo', 'Exercício leve 1-3 dias/semana', 1.375),
('Moderadamente Ativo', 'Exercício moderado 3-5 dias/semana', 1.55),
('Muito Ativo', 'Exercício pesado 6-7 dias/semana', 1.725),
('Extremamente Ativo', 'Exercício muito pesado + trabalho físico', 1.90);
```

### Tabela: goals
```sql
CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    calorie_adjustment INTEGER, -- +/- calorias do gasto total
    created_at TIMESTAMP DEFAULT NOW()
);

-- Dados iniciais
INSERT INTO goals (name, description, calorie_adjustment) VALUES
('Perder Peso', 'Deficit calórico para perda de peso', -400),
('Manter Peso', 'Manutenção do peso atual', 0),
('Ganhar Massa Magra', 'Leve superávit com foco em músculo', 300),
('Ganhar Peso', 'Superávit calórico para ganho de peso', 500);
```

### Tabela: foods
```sql
CREATE TABLE foods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    brand VARCHAR(100),
    category_id INTEGER REFERENCES food_categories(id),
    barcode VARCHAR(50),
    serving_size_g DECIMAL(8,2),
    serving_description VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Índice de busca textual
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('portuguese', name || ' ' || COALESCE(brand, ''))
    ) STORED
);

-- Índices
CREATE INDEX idx_foods_name ON foods(name);
CREATE INDEX idx_foods_category ON foods(category_id);
CREATE INDEX idx_foods_search ON foods USING GIN(search_vector);
CREATE INDEX idx_foods_barcode ON foods(barcode);
```

### Tabela: food_categories
```sql
CREATE TABLE food_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id INTEGER REFERENCES food_categories(id),
    icon VARCHAR(50),
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Dados iniciais
INSERT INTO food_categories (name, icon, color) VALUES
('Proteínas', '🥩', '#e74c3c'),
('Carboidratos', '🍞', '#f39c12'),
('Vegetais', '🥬', '#27ae60'),
('Frutas', '🍎', '#e67e22'),
('Laticínios', '🥛', '#3498db'),
('Gorduras', '🥑', '#95a5a6'),
('Bebidas', '🥤', '#9b59b6'),
('Doces', '🍰', '#e91e63');
```

### Tabela: nutritional_info
```sql
CREATE TABLE nutritional_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    food_id UUID REFERENCES foods(id) ON DELETE CASCADE,
    per_100g BOOLEAN DEFAULT TRUE,
    
    -- Macronutrientes (em gramas)
    calories DECIMAL(8,2) NOT NULL,
    protein_g DECIMAL(8,2) DEFAULT 0,
    carbs_g DECIMAL(8,2) DEFAULT 0,
    fiber_g DECIMAL(8,2) DEFAULT 0,
    sugar_g DECIMAL(8,2) DEFAULT 0,
    fat_g DECIMAL(8,2) DEFAULT 0,
    saturated_fat_g DECIMAL(8,2) DEFAULT 0,
    
    -- Micronutrientes (em mg/mcg)
    sodium_mg DECIMAL(8,2) DEFAULT 0,
    potassium_mg DECIMAL(8,2) DEFAULT 0,
    calcium_mg DECIMAL(8,2) DEFAULT 0,
    iron_mg DECIMAL(8,2) DEFAULT 0,
    vitamin_c_mg DECIMAL(8,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(food_id)
);

-- Índices
CREATE INDEX idx_nutrition_food_id ON nutritional_info(food_id);
CREATE INDEX idx_nutrition_calories ON nutritional_info(calories);
```

### Tabela: diets
```sql
CREATE TABLE diets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200),
    target_calories INTEGER NOT NULL,
    target_protein_g INTEGER,
    target_carbs_g INTEGER,
    target_fat_g INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    generated_by VARCHAR(20) DEFAULT 'system', -- 'system', 'ai', 'manual'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_diets_user_id ON diets(user_id);
CREATE INDEX idx_diets_active ON diets(user_id, is_active);
```

### Tabela: diet_meals
```sql
CREATE TABLE diet_meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diet_id UUID REFERENCES diets(id) ON DELETE CASCADE,
    meal_type VARCHAR(20) NOT NULL, -- 'breakfast', 'lunch', 'dinner', 'snack'
    meal_order INTEGER DEFAULT 1,
    target_calories INTEGER,
    name VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_diet_meals_diet_id ON diet_meals(diet_id);
CREATE INDEX idx_diet_meals_type ON diet_meals(diet_id, meal_type);
```

### Tabela: meal_foods
```sql
CREATE TABLE meal_foods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_id UUID REFERENCES diet_meals(id) ON DELETE CASCADE,
    food_id UUID REFERENCES foods(id),
    quantity_g DECIMAL(8,2) NOT NULL,
    food_order INTEGER DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_meal_foods_meal_id ON meal_foods(meal_id);
CREATE INDEX idx_meal_foods_food_id ON meal_foods(food_id);
```

### Tabela: weight_records
```sql
CREATE TABLE weight_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    weight_kg DECIMAL(5,2) NOT NULL CHECK (weight_kg BETWEEN 30 AND 300),
    recorded_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, recorded_date)
);

-- Índices
CREATE INDEX idx_weight_records_user_date ON weight_records(user_id, recorded_date DESC);
```

## 🚀 Schema - Versão 2.0

### Tabela: progress_photos
```sql
CREATE TABLE progress_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    -- Armazenamento em Cloudflare R2 (S3-compatible)
    object_key VARCHAR(500) NOT NULL, -- ex.: progress-photos/{userId}/{yyyy}/{MM}/{dd}/{uuid}.jpg
    file_url VARCHAR(500),            -- opcional: URL pública
    file_size_bytes INTEGER,
    photo_type VARCHAR(20) CHECK (photo_type IN ('front', 'side', 'back')),
    taken_date DATE NOT NULL,
    weight_at_time DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_progress_photos_user_date ON progress_photos(user_id, taken_date DESC);
```

### Tabela: food_substitutions
```sql
CREATE TABLE food_substitutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_food_id UUID REFERENCES foods(id),
    substitute_food_id UUID REFERENCES foods(id),
    substitution_ratio DECIMAL(4,2) DEFAULT 1.00,
    reason VARCHAR(100),
    nutritional_similarity DECIMAL(3,2), -- Score 0-1
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(original_food_id, substitute_food_id)
);

-- Índices
CREATE INDEX idx_substitutions_original ON food_substitutions(original_food_id);
CREATE INDEX idx_substitutions_substitute ON food_substitutions(substitute_food_id);
```

### Tabela: diet_preferences
```sql
CREATE TABLE diet_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    preference_type VARCHAR(20) NOT NULL, -- 'allergy', 'intolerance', 'dislike', 'restriction'
    food_id UUID REFERENCES foods(id),
    category_id INTEGER REFERENCES food_categories(id),
    custom_item VARCHAR(200),
    severity VARCHAR(10) CHECK (severity IN ('mild', 'moderate', 'severe')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_diet_preferences_user ON diet_preferences(user_id);
CREATE INDEX idx_diet_preferences_type ON diet_preferences(user_id, preference_type);
```

### Tabela: ai_interactions
```sql
CREATE TABLE ai_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interaction_type VARCHAR(20) NOT NULL, -- 'diet_generation', 'substitution', 'chat'
    prompt_text TEXT,
    response_text TEXT,
    model_used VARCHAR(50),
    tokens_used INTEGER,
    response_time_ms INTEGER,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ai_interactions_user ON ai_interactions(user_id, created_at DESC);
CREATE INDEX idx_ai_interactions_type ON ai_interactions(interaction_type, created_at DESC);
```

## 🔮 Schema - Versão 3.0

### Tabela: recipes
```sql
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    servings INTEGER DEFAULT 1,
    difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    image_url VARCHAR(500),
    created_by UUID REFERENCES users(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_recipes_name ON recipes(name);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
```

### Tabela: chat_conversations
```sql
CREATE TABLE chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    context JSONB, -- Contexto da conversa (dieta atual, objetivos, etc.)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_conversations_user ON chat_conversations(user_id, created_at DESC);
```

### Tabela: chat_messages
```sql
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
    role VARCHAR(10) CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    metadata JSONB, -- Dados extras (tokens, tempo de resposta, etc.)
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_messages_conversation ON chat_messages(conversation_id, created_at ASC);
```

## 🔧 Funções e Triggers

### Função: Calcular TMB
```sql
CREATE OR REPLACE FUNCTION calculate_bmr(
    weight_kg DECIMAL,
    height_cm INTEGER,
    age_years INTEGER,
    gender CHAR
) RETURNS DECIMAL AS $$
BEGIN
    IF gender = 'M' THEN
        RETURN 88.362 + (13.397 * weight_kg) + (4.799 * height_cm) - (5.677 * age_years);
    ELSE
        RETURN 447.593 + (9.247 * weight_kg) + (3.098 * height_cm) - (4.330 * age_years);
    END IF;
END;
$$ LANGUAGE plpgsql;
```

### Função: Calcular Calorias Totais
```sql
CREATE OR REPLACE FUNCTION calculate_total_calories(
    user_id UUID
) RETURNS INTEGER AS $$
DECLARE
    profile RECORD;
    bmr DECIMAL;
    total_calories INTEGER;
BEGIN
    SELECT 
        p.*,
        al.multiplier,
        g.calorie_adjustment,
        EXTRACT(YEAR FROM AGE(p.birth_date)) as age
    INTO profile
    FROM user_profiles p
    JOIN activity_levels al ON p.activity_level_id = al.id
    JOIN goals g ON p.goal_id = g.id
    WHERE p.user_id = user_id;
    
    -- Calcular TMB
    bmr := calculate_bmr(
        profile.initial_weight_kg,
        profile.height_cm,
        profile.age,
        profile.gender
    );
    
    -- Aplicar fator de atividade e ajuste do objetivo
    total_calories := ROUND(bmr * profile.multiplier + profile.calorie_adjustment);
    
    RETURN total_calories;
END;
$$ LANGUAGE plpgsql;
```

### Trigger: Atualizar timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todas as tabelas com updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 📈 Views Úteis

### View: Usuários Completos
```sql
CREATE VIEW v_users_complete AS
SELECT 
    u.id,
    u.email,
    u.created_at as registered_at,
    p.first_name,
    p.last_name,
    p.birth_date,
    p.gender,
    p.height_cm,
    p.initial_weight_kg,
    al.name as activity_level,
    g.name as goal,
    calculate_total_calories(u.id) as target_calories
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id
LEFT JOIN activity_levels al ON p.activity_level_id = al.id
LEFT JOIN goals g ON p.goal_id = g.id;
```

### View: Progresso dos Usuários
```sql
CREATE VIEW v_user_progress AS
SELECT 
    wr.user_id,
    wr.weight_kg as current_weight,
    p.initial_weight_kg,
    (wr.weight_kg - p.initial_weight_kg) as weight_change,
    wr.recorded_date,
    ROW_NUMBER() OVER (PARTITION BY wr.user_id ORDER BY wr.recorded_date DESC) as row_num
FROM weight_records wr
JOIN user_profiles p ON wr.user_id = p.user_id;
```

## 🛡️ Segurança e Permissions

### Row Level Security (RLS)
```sql
-- Habilitar RLS nas tabelas sensíveis
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_photos ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY user_profiles_policy ON user_profiles
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY diets_policy ON diets
    FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);
```

### Roles e Permissions
```sql
-- Role para aplicação
CREATE ROLE smart_health_app;
GRANT CONNECT ON DATABASE smart_health TO smart_health_app;
GRANT USAGE ON SCHEMA public TO smart_health_app;

-- Permissions específicas
GRANT SELECT, INSERT, UPDATE ON users TO smart_health_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_profiles TO smart_health_app;
GRANT SELECT ON activity_levels TO smart_health_app;
GRANT SELECT ON goals TO smart_health_app;
```

## 📊 Índices para Performance

### Índices Compostos
```sql
-- Busca de dieta ativa por usuário
CREATE INDEX idx_diets_user_active ON diets(user_id, is_active) 
WHERE is_active = TRUE;

-- Histórico de peso ordenado
CREATE INDEX idx_weight_history ON weight_records(user_id, recorded_date DESC);

-- Busca de alimentos por categoria
CREATE INDEX idx_foods_category_name ON foods(category_id, name);
```

### Índices Parciais
```sql
-- Apenas registros ativos
CREATE INDEX idx_active_diets ON diets(user_id) 
WHERE is_active = TRUE;

-- Apenas fotos recentes
CREATE INDEX idx_recent_photos ON progress_photos(user_id, taken_date) 
WHERE taken_date >= CURRENT_DATE - INTERVAL '1 year';
```

## 🔄 Estratégia de Backup

### Backup Automático
```sql
-- Backup completo diário
pg_dump smart_health_db > backup_$(date +%Y%m%d).sql

-- Backup incremental (WAL)
wal_level = replica
archive_mode = on
archive_command = 'cp %p /backup/wal/%f'
```

### Retenção
- Backups diários: 30 dias
- Backups semanais: 12 semanas  
- Backups mensais: 12 meses
- Backup anual: 5 anos

## 📈 Monitoramento

### Queries Lentas
```sql
-- Habilitar log de queries lentas
log_min_duration_statement = 1000ms
log_statement = 'all'
```

### Métricas Importantes
- Conexões ativas
- Queries por segundo
- Tamanho das tabelas
- Performance dos índices
- Locks e deadlocks