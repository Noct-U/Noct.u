CREATE DATABASE noctuBD;
USE noctuBD;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    razaoSocial VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    telefoneFixo CHAR(12) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(15) NOT NULL
);

INSERT INTO empresa(nome, razaoSocial, cnpj, telefoneFixo, email, senha) VALUES
	('Simpress', 'Ltda', '12356789019283', '119333576377', 'simpress@gmail.com', 'admin123');

CREATE TABLE endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	cep CHAR(8) NOT NULL,
    uf CHAR(2) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    logradouro VARCHAR(45) NOT NULL
);

INSERT INTO endereco (cep, uf, cidade, bairro, logradouro) VALUES
	('08474230', 'SP', 'São Paulo', 'Paulista', 'Rua Haddock Lobo');

CREATE TABLE local(
	idLocal INT AUTO_INCREMENT,
    numero INT NOT NULL,
    complemento VARCHAR(45),
    andar INT,
    sala VARCHAR(45),
    fkEndereco INT NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    PRIMARY KEY (idLocal, fkEndereco, fkEmpresa)
);

INSERT INTO local (numero, andar, sala, fkEndereco, fkEmpresa) VALUES
	(211, 7, '7A', 1, 1);

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
	('SPTech', '10293029381203', 1);
    
CREATE TABLE tipoUsuario(
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeTipo VARCHAR(45) NOT NULL
);

INSERT INTO tipoUsuario (nomeTipo) VALUES
	('Admin'),
	('Funcionario');
    
CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkTipoUsuario INT NOT NULL,
    fkEmpresaAlocacao INT NOT NULL,
    FOREIGN KEY (fkEmpresaAlocacao) REFERENCES empresaLocataria(idEmpresaLocataria),
    FOREIGN KEY (fkTipoUsuario) REFERENCES tipoUsuario (idTipoUsuario)
);

INSERT INTO  usuario (nome, email, senha, fkTipoUsuario, fkEmpresaAlocacao) VALUES
	('Kevin', 'kevin.rsilva07@gmail.com', '1234568', 2, 1);

CREATE TABLE modeloComputador(
	idModeloComputador INT PRIMARY KEY auto_increment,
    nome VARCHAR(45)
);

INSERT INTO modeloComputador (nome) VALUES
	('IdeaPad');

CREATE TABLE computador(
	idComputador INT PRIMARY KEY auto_increment,
    numeroSerie VARCHAR(45),
    fkEmpresa INT,
    fkModeloComputador INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador)
);

INSERT INTO computador (numeroSerie, fkEmpresa, fkModeloComputador) VALUES
	('2213131xy321', 1, 1);

CREATE TABLE tipoHardware(
	idTipoHardware INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

INSERT INTO tipoHardware (nome) VALUES
	('CPU'),
	('RAM'),
	('Disco'),
	('Janelas');

CREATE TABLE hardware(
	idHardware INT PRIMARY KEY auto_increment,
    nome VARCHAR(100) NOT NULL,
    especificidade VARCHAR(45),
    capacidade FLOAT NOT NULL,
	fkTipoHardware INT,
    FOREIGN KEY (fkTipoHardware) REFERENCES tipoHardware(idTipoHardware)
);
-- JAR pega

CREATE TABLE componente(
	idComponente INT AUTO_INCREMENT,
    fkHardware INT,
    fkComputador INT,
    codigoSerial VARCHAR(45),
    FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware),
    FOREIGN KEY (fkComputador) REFERENCES computador(idComputador),
    PRIMARY KEY (idComponente, fkHardware, fkComputador)
);
-- JAR pega

CREATE TABLE captura (
	idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    valor FLOAT,
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

select * from hardware;
select * from componente;
select * from captura;
