DROP DATABASE noctuBD;
CREATE DATABASE noctuBD;
USE noctuBD;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    razaoSocial VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    telefoneFixo CHAR(12) NOT NULL
);

INSERT INTO empresa(nome, razaoSocial, cnpj, telefoneFixo) VALUES
	('Simpress', 'Ltda', '12356789019283', '119333576377'), -- TIRAR DEPOIS
	('PressSim', 'Ltda', '12356789019283', '119333576377'); -- TIRAR DEPOIS

CREATE TABLE endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	cep CHAR(8) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    uf CHAR(2) NOT NULL,
    logradouro VARCHAR(45) NOT NULL
);

INSERT INTO endereco (cep, uf, cidade, bairro, logradouro) VALUES
	('08474230', 'SP', 'São Paulo', 'Paulista', 'Rua Haddock Lobo'); -- TIRAR DEPOIS

CREATE TABLE local(
	idLocal INT AUTO_INCREMENT,
    numero INT NOT NULL,
    complemento VARCHAR(45),
    fkEndereco INT NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    PRIMARY KEY (idLocal, fkEndereco, fkEmpresa)
);

INSERT INTO local (numero, fkEndereco, fkEmpresa) VALUES
	(211, 1, 1); -- TIRAR DEPOIS

CREATE TABLE empresaLocataria (
	idEmpresaLocataria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cnpj CHAR(14),
    fkMatriz INT,
    fkEmpresa INT,
    FOREIGN KEY (fkMatriz) REFERENCES empresaLocataria(idEmpresaLocataria),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO empresaLocataria (nome, cnpj, fkEmpresa) VALUES
	('SPTech', '10293029381203', 1); -- TIRAR DEPOIS
    
CREATE TABLE tipoUsuario(
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeTipo VARCHAR(45) NOT NULL
);

INSERT INTO tipoUsuario (nomeTipo) VALUES
	('ADMIN'),
	('COMUM');
    
CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkTipoUsuario INT,
    fkEmpresaLocadora INT,
    fkEmpresa INT,
    FOREIGN KEY (fkTipoUsuario) REFERENCES tipoUsuario(idTipoUsuario),
    FOREIGN KEY (fkEmpresaLocadora) REFERENCES empresaLocataria(idEmpresaLocataria), 
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
); 

INSERT INTO  usuario (nome, email, senha, fkTipoUsuario, fkEmpresaLocadora, fkEmpresa) VALUES
	('Kevin', 'kevin.silva@sptech.school', '1234', 1, 1, 1); -- TIRAR DEPOIS
 
CREATE TABLE modeloComputador(
	idModeloComputador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

INSERT INTO modeloComputador (nome) VALUES
	('Padrão'); -- TIRAR DEPOIS
 
CREATE TABLE computador(
	idComputador INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT,
    fkModeloComputador INT,
    -- fkEmpresaLocataria INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador)
    -- FOREIGN KEY (fkEmpresaLocataria) REFERENCES empresaLocataria(idEmpresaLocataria)
);

INSERT INTO computador (fkEmpresa, fkModeloComputador) VALUES
	(1, 1), -- TIRAR DEPOIS
	(1, 1), -- TIRAR DEPOIS
	(1, 1), -- TIRAR DEPOIS
	(2, 1), -- TIRAR DEPOIS
	(2, 1); -- TIRAR DEPOIS
    
CREATE TABLE unidadeMedida(
	idUnidadeMedida INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45),
	simbolo VARCHAR(3)
);

INSERT INTO unidadeMedida (titulo, simbolo) VALUES
	('Porcentagem', '%'),
	('GigaBytes', 'GB');

CREATE TABLE tipoHardware(
	idTipoHardware INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    fkUnidademedida INT,
    FOREIGN KEY (fkUnidadeMedida) REFERENCES unidadeMedida(idUnidadeMedida)
);

INSERT INTO tipoHardware VALUES
	(NULL, 'CPU', 1),
	(NULL, 'RAM', 1),
	(NULL, 'Disco', 2),
	(NULL, 'Janelas', NULL);

CREATE TABLE hardware(
	idHardware INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    especificidade VARCHAR(45),
    capacidade DOUBLE NOT NULL,
	fkTipoHardware INT,
    FOREIGN KEY (fkTipoHardware) REFERENCES tipoHardware(idTipoHardware)
);
-- JAR pega

CREATE TABLE parametro(
	idParametro INT PRIMARY KEY AUTO_INCREMENT,
    min DOUBLE,
    max DOUBLE
    -- fkUnidadeMedida INT,
    -- FOREIGN KEY (fkUnidadeMedida) REFERENCES unidadeMedida(idUnidadeMedida)
);

INSERT INTO parametro VALUES
	(null, 60.00, 80.00),
	(null, 20.00, 40.00),
	(null, 50.00, 70.00),
	(null, 1.00, 10.00);

CREATE TABLE componente(
	idComponente INT AUTO_INCREMENT,
    fkComputador INT,
    fkHardware INT,
    fkParametro INT,
    FOREIGN KEY (fkParametro) REFERENCES parametro(idParametro),
    FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware),
    FOREIGN KEY (fkComputador) REFERENCES computador(idComputador),
    PRIMARY KEY (idComponente, fkHardware, fkComputador)
); 
-- JAR pega

CREATE TABLE captura (
	idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    valor DOUBLE,
    descricao VARCHAR(45),
    dtCaptura DATETIME,
    fkComputador INT,
    fkHardware INT,
    fkComponente INT,
    FOREIGN KEY (fkComputador) REFERENCES componente(fkComputador),
    FOREIGN KEY (fkHardware) REFERENCES componente(fkHardware),
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);

-- JAR pega

CREATE TABLE alerta(
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao VARCHAR(100),
    dtAlerta DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkCaptura INT,
    FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura)
);

-- SELECT * FROM tipoHardware;
-- SELECT * FROM hardware;
-- SELECT * FROM componente;
-- SELECT * FROM captura;

-- SELECT * FROM usuario;
-- SELECT * FROM empresa;
-- SELECT * FROM local;