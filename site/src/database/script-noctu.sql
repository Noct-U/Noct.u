DROP DATABASE noctuBD;
CREATE DATABASE noctuBD;
USE noctuBD;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    razaoSocial VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    telefoneFixo CHAR(12) NOT NULL
);

CREATE TABLE endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	cep CHAR(8) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    uf CHAR(2) NOT NULL,
    logradouro VARCHAR(45) NOT NULL
);

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

CREATE TABLE status(
	idStatus INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45)
);

CREATE TABLE empresaLocataria (
	idEmpresaLocataria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cnpj CHAR(14),
    fkMatriz INT,
    fkEmpresa INT,
    fkStatus INT,
    FOREIGN KEY (fkMatriz) REFERENCES empresaLocataria(idEmpresaLocataria),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkStatus) REFERENCES status(idStatus)
);
    
CREATE TABLE tipoUsuario(
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeTipo VARCHAR(45) NOT NULL
);
    
CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    fkTipoUsuario INT,
    fkEmpresaLocadora INT,
    fkEmpresa INT,
    fkStatus INT,
    FOREIGN KEY (fkTipoUsuario) REFERENCES tipoUsuario(idTipoUsuario),
    FOREIGN KEY (fkEmpresaLocadora) REFERENCES empresaLocataria(idEmpresaLocataria) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkStatus) REFERENCES status(idStatus)
); 

CREATE TABLE modeloComputador(
	idModeloComputador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);
 
CREATE TABLE computador(
	idComputador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    fkEmpresa INT,
    fkModeloComputador INT,
    fkEmpresaLocataria INT,
    fkStatus INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador), 
    FOREIGN KEY (fkEmpresaLocataria) REFERENCES empresaLocataria(idEmpresaLocataria) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (fkStatus) REFERENCES status(idStatus)
);

CREATE TABLE unidadeMedida(
	idUnidadeMedida INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
	simbolo VARCHAR(3)
);

CREATE TABLE tipoHardware(
	idTipoHardware INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    fkUnidademedida INT,
    FOREIGN KEY (fkUnidadeMedida) REFERENCES unidadeMedida(idUnidadeMedida)
);

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
    max DOUBLE,
    fkUnidadeMedida INT,
    fkTipoHardware INT,
    fkModeloComputador INT,
    FOREIGN KEY (fkUnidadeMedida) REFERENCES unidadeMedida(idUnidadeMedida),
    FOREIGN KEY (fkTipoHardware) REFERENCES tipoHardware(idTipoHardware),
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador)
);

CREATE TABLE componente(
	idComponente INT AUTO_INCREMENT NOT NULL,
    fkComputador INT NOT NULL,
    fkHardware INT NOT NULL,
    FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware),
    FOREIGN KEY (fkComputador) REFERENCES computador(idComputador) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (idComponente, fkHardware, fkComputador)
); 


-- JAR pega

CREATE TABLE captura (
	idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    valor DOUBLE,
    descricao VARCHAR(45),
    dtCaptura DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkComputador INT,
    fkHardware INT,
    fkComponente INT,
    FOREIGN KEY (fkComputador) REFERENCES componente(fkComputador) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (fkHardware) REFERENCES componente(fkHardware), 
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente) ON DELETE CASCADE ON UPDATE CASCADE
);

-- JAR pega

CREATE TABLE tipoAlerta(
	idTipoAlerta INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(45)
);

CREATE TABLE alerta(
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    dtAlerta DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkCaptura INT,
    fkTipoAlerta INT,
    FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
    FOREIGN KEY (fkTipoAlerta) REFERENCES tipoAlerta(idTipoAlerta)
);

-- SELECT * FROM tipoHardware;
-- SELECT * FROM hardware;
-- SELECT * FROM componente;
-- SELECT * FROM captura;

-- SELECT * FROM usuario;
-- SELECT * FROM empresa;
-- SELECT * FROM local;