-- Banco de dados e tabelas aqui

-- 0 Remover database se existir:
DROP DATABASE IF EXISTS dindin;
-- 1 - Criar banco de dados "dindin":
CREATE DATABASE dindin;

-- Criar tabela usuarios:
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

-- Criar tabela categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao text NOT NULL,
    valor NUMERIC NOT NULL,
    data TIMESTAMP DEFAULT NOW(),
    categoria_id INTEGER REFERENCES categorias(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    tipo TEXT NOT NULL
);

-- Inserir dados na tabela categorias
INSERT INTO categorias
(descricao)
VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'), 
('Mercado'), 
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');
