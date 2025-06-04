create DATABASE TesteSistema;
USE TesteSistema ;


-- Usuários
CREATE TABLE users (
    id char(9) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'tester', 'programmer') NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    senha char(10),
    created_at DATETIME NOT NULL
);

insert into users values ('Bahia5988', 'caique', 'caiquevidal@gmail.com', 'admin', default,'1234567890' ,  '2025-05-19 14:32:45');


select * from users;

-- Projetos
CREATE TABLE projects (
    id char(9) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    version VARCHAR(20),
    created_at DATETIME NOT NULL,
    test_count INT DEFAULT 0
);

-- Casos de Teste
CREATE TABLE test_cases (
    id char(9) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    expected TEXT,
    status ENUM('pending', 'passed', 'failed') NOT NULL,
    category VARCHAR(100),
    project_id char(9),
    created_by char(9),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Passos dos Casos de Teste (normalizado)
CREATE TABLE test_case_steps (
    id int AUTO_INCREMENT PRIMARY KEY,
    test_case_id char(9) NOT NULL,
    step_order INT NOT NULL,
    description TEXT,
    FOREIGN KEY (test_case_id) REFERENCES test_cases(id)
);

-- Planos de Teste
CREATE TABLE test_plans (
    id char(9) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id char(9),
    start_date DATE,
    end_date DATE,
    test_count INT DEFAULT 0,
    progress INT DEFAULT 0,
    created_by char(9),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
