create DATABASE TesteSistema;
USE TesteSistema ;

select * from users;
-- Usuários
CREATE TABLE users (
    id char(9) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'tester', 'programmer', 'gestor', 'avaliador') NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    senha char(10),
    created_at DATETIME NOT NULL
);

insert into users values ('Bahia5988', 'caique', 'caiquevidal@gmail.com', 'admin', default,'1234567890' ,  '2025-05-19 14:32:45');


select * from projects;

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
    plan_id char(9),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES test_plans(id)
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

create table recentActivity(
	id int primary key auto_increment,
    id_user char(9) not null,
    action varchar(255),
    time datetime not null,
    status ENUM('pending', 'passed', 'failed') NOT NULL,
	foreign key(id_user) references users(id)
);
select * from avaliacao;
create table avaliacao(
	id char(9) PRIMARY KEY,
    title varchar(100) not null,
    created_at DATETIME NOT NULL,
    media double,
	project_id char(9) not null,
    created_by char(9) not null,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

create table criterioAvaliacao(
	id int primary key auto_increment,
    avaliador char(9) not null,
    descricao varchar(500) not null,
    nota int not null,
    criterio enum('Eficiência','Eficácia','Satisfação do Usuário', 'Aprendizado', 'Memorabilidade', 'Prevenção de Erros', 'Acessibilidade', 'Consistência e Padrões', 'Feedback', 'Flexibilidade','Segurança no uso','Usabilidade','Comunicabilidade') not null,
    fk_avaliacao char(9) not null,
    FOREIGN KEY (fk_avaliacao) REFERENCES avaliacao(id),
    FOREIGN KEY (avaliador) REFERENCES users(id)
);


DELIMITER //

CREATE TRIGGER atualizar_media_avaliacao
AFTER INSERT ON criterioAvaliacao
FOR EACH ROW
BEGIN
    DECLARE somaNotas DOUBLE;
    DECLARE totalCriterios INT;
    DECLARE novaMedia DOUBLE;

    
    SELECT SUM(nota), COUNT(*) INTO somaNotas, totalCriterios
    FROM criterioAvaliacao
    WHERE fk_avaliacao = NEW.fk_avaliacao;

    
    SET novaMedia = somaNotas / totalCriterios;

    
    UPDATE avaliacao
    SET media = round(novaMedia, 2)
    WHERE id = NEW.fk_avaliacao;
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER atualizar_media_avaliacao_update
AFTER UPDATE ON criterioAvaliacao
FOR EACH ROW
BEGIN
    DECLARE somaNotas DOUBLE;
    DECLARE totalCriterios INT;
    DECLARE novaMedia DOUBLE;

    
    SELECT SUM(nota), COUNT(*) INTO somaNotas, totalCriterios
    FROM criterioAvaliacao
    WHERE fk_avaliacao = NEW.fk_avaliacao;


    SET novaMedia = somaNotas / totalCriterios;


    UPDATE avaliacao
    SET media = ROUND(novaMedia, 2)
    WHERE id = NEW.fk_avaliacao;
END;
//

DELIMITER ;


