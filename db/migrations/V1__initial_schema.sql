-- V1__initial_schema.sql

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    gender VARCHAR(50),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Characters Table
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description JSONB
);

-- Styles Table
CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    description TEXT
);

-- Genres Table
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    description TEXT
);

-- Storylines Table
CREATE TABLE storylines (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    style_id INTEGER REFERENCES styles(id),
    character_id INTEGER REFERENCES characters(id),
    genre_id INTEGER REFERENCES genres(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Default Settings Table
CREATE TABLE user_default_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    character_id INTEGER REFERENCES characters(id),
    style_id INTEGER REFERENCES styles(id),
    genre_id INTEGER REFERENCES genres(id),
    cut_count INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Diaries Table
CREATE TABLE diaries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    storyline_id INTEGER REFERENCES storylines(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tsv TSVECTOR
);
CREATE INDEX idx_diaries_storyline_id ON diaries(storyline_id);

-- Stories Table
CREATE TYPE story_status AS ENUM ('draft', 'generating', 'ready', 'failed');
CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    diary_id INTEGER NOT NULL REFERENCES diaries(id),
    version_no INTEGER NOT NULL,
    status story_status DEFAULT 'draft',
    character_id INTEGER REFERENCES characters(id),
    style_id INTEGER REFERENCES styles(id),
    genre_id INTEGER REFERENCES genres(id),
    cut_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (diary_id, version_no)
);

-- Story Panels Table
CREATE TABLE story_panels (
    id SERIAL PRIMARY KEY,
    story_id INTEGER NOT NULL REFERENCES stories(id),
    panel_index INTEGER NOT NULL,
    text TEXT,
    image_prompt TEXT,
    UNIQUE (story_id, panel_index)
);

-- Images Table
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    story_panel_id INTEGER NOT NULL REFERENCES story_panels(id),
    url VARCHAR(255) NOT NULL,
    provider VARCHAR(100),
    width INTEGER,
    height INTEGER,
    format VARCHAR(50),
    seed BIGINT,
    meta JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Generations Table
CREATE TYPE generation_target_type AS ENUM ('story', 'panel', 'image');
CREATE TABLE generations (
    id SERIAL PRIMARY KEY,
    target_type generation_target_type NOT NULL,
    target_id INTEGER NOT NULL,
    model VARCHAR(255),
    prompt TEXT,
    params JSONB,
    output TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update 'updated_at' columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_storylines_updated_at BEFORE UPDATE ON storylines FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_diaries_updated_at BEFORE UPDATE ON diaries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_user_default_settings_updated_at BEFORE UPDATE ON user_default_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Trigger for tsvector update on diaries
CREATE OR REPLACE FUNCTION diaries_tsvector_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.tsv := to_tsvector('pg_catalog.english', NEW.title || ' ' || NEW.content);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE ON diaries
    FOR EACH ROW EXECUTE PROCEDURE diaries_tsvector_update();