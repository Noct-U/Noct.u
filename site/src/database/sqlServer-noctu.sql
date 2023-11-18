CREATE DATABASE noctuBD;
USE noctuBD;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45) NOT NULL,
    razaoSocial VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    telefoneFixo CHAR(12) NOT NULL
);

CREATE TABLE endereco(
	idEndereco INT PRIMARY KEY IDENTITY(1,1),
	cep CHAR(8) NOT NULL,
  cidade VARCHAR(45) NOT NULL,
  bairro VARCHAR(45) NOT NULL,
  uf CHAR(2) NOT NULL,
  logradouro VARCHAR(45) NOT NULL
);

CREATE TABLE local(
	idLocal INT IDENTITY(1,1),
  numero INT NOT NULL,
  complemento VARCHAR(45),
  fkEndereco INT NOT NULL,
  fkEmpresa INT NOT NULL,
  FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco),
  FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
  PRIMARY KEY (idLocal, fkEndereco, fkEmpresa)
);

CREATE TABLE status(
	idStatus INT PRIMARY KEY IDENTITY(1,1),
  titulo VARCHAR(45)
);

CREATE TABLE empresaLocataria (
	idEmpresaLocataria INT PRIMARY KEY IDENTITY(1,1),
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
	idTipoUsuario INT PRIMARY KEY IDENTITY(1,1),
  nomeTipo VARCHAR(45) NOT NULL
);
    
CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY IDENTITY(1,1),
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
	idModeloComputador INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(45)
);
 
CREATE TABLE computador(
	idComputador INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR (100) UNIQUE,
  fkEmpresa INT,
  fkModeloComputador INT,
  fkEmpresaLocataria INT,
  fkStatus INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador), 
    FOREIGN KEY (fkEmpresaLocataria) REFERENCES empresaLocataria(idEmpresaLocataria) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (fkStatus) REFERENCES status(idStatus)
);

CREATE TABLE unidadeMedida(
	idUnidadeMedida INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(45),
	simbolo VARCHAR(3)
);

CREATE TABLE tipoHardware(
	idTipoHardware INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(45) NOT NULL,
  fkUnidademedida INT,
    FOREIGN KEY (fkUnidadeMedida) REFERENCES unidadeMedida(idUnidadeMedida)
);

CREATE TABLE hardware(
	idHardware INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(100) NOT NULL,
  especificidade VARCHAR(45),
  capacidade FLOAT NOT NULL,
  fkTipoHardware INT, 
    FOREIGN KEY (fkTipoHardware) REFERENCES tipoHardware(idTipoHardware)
);

-- JAR pega

CREATE TABLE parametro(
	idParametro INT PRIMARY KEY IDENTITY(1,1),
  min FLOAT,
  max FLOAT,
  fkUnidadeMedida INT,
  fkTipoHardware INT,
  fkModeloComputador INT,
    FOREIGN KEY (fkUnidadeMedida) REFERENCES unidadeMedida(idUnidadeMedida),
    FOREIGN KEY (fkTipoHardware) REFERENCES tipoHardware(idTipoHardware),
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador)
);

CREATE TABLE componente(
	idComponente INT IDENTITY(1,1) NOT NULL,
  fkComputador INT NOT NULL,
  fkHardware INT NOT NULL,
    FOREIGN KEY (fkComputador) REFERENCES computador(idComputador),
    FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware),
    PRIMARY KEY (idComponente, fkComputador, fkHardware)
); 
-- JAR pega

CREATE TABLE captura (
  idCaptura INT PRIMARY KEY IDENTITY(1,1),
  valor FLOAT,
  descricao VARCHAR(45),
  dtCaptura DATETIME DEFAULT CURRENT_TIMESTAMP,
  fkComputador INT NOT NULL,
  fkHardware INT NOT NULL,
  fkComponente INT NOT NULL,
    FOREIGN KEY (fkComponente,fkComputador, fkHardware) REFERENCES componente(idComponente,fkComputador, fkHardware)
);

-- -- JAR pega

CREATE TABLE tipoAlerta(
	idTipoAlerta INT PRIMARY KEY IDENTITY(1,1),
  descricao VARCHAR(45)
);

CREATE TABLE alerta(
	idAlerta INT PRIMARY KEY IDENTITY(1,1),
  titulo VARCHAR(100),
  dtAlerta DATETIME DEFAULT CURRENT_TIMESTAMP,
  fkCaptura INT,
  fkTipoAlerta INT,
    FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
    FOREIGN KEY (fkTipoAlerta) REFERENCES tipoAlerta(idTipoAlerta)
);

INSERT INTO empresa VALUES
  ('teste', 'razao', '09832127321231', '119333576377');

INSERT INTO empresa(nome, razaoSocial, cnpj, telefoneFixo) VALUES
	('Simpress', 'Ltda', '12356789019183', '119333576377'), -- TIRAR DEPOIS
	('PressSim', 'Ltda', '12356789019283', '119333576377'); -- TIRAR DEPOIS
    
INSERT INTO endereco (cep, uf, cidade, bairro, logradouro) VALUES
	('08474230', 'SP', 'São Paulo', 'Paulista', 'Rua Haddock Lobo'); -- TIRAR DEPOIS
    
INSERT INTO local (numero, fkEndereco, fkEmpresa) VALUES
	(211, 1, 1); -- TIRAR DEPOIS
    
INSERT INTO empresaLocataria (nome, cnpj, fkEmpresa) VALUES
	('SPTech', '10293029381203', 1), -- TIRAR DEPOIS
	('LiminhaTech', '31242131231', 2); -- TIRAR DEPOIS

INSERT INTO tipoUsuario (nomeTipo) VALUES
	('ADMIN'),
	('COMUM');
	
INSERT INTO status VALUES
	('Ativo'),
	('Inativo');


INSERT INTO  usuario (nome, email, senha, fkTipoUsuario, fkEmpresaLocadora, fkEmpresa) VALUES
	('Kevin', 'kevin.silva@sptech.school', '1234', 1, 1, 1); -- TIRAR DEPOIS
 
 INSERT INTO modeloComputador (nome) VALUES
	('Padrão'), -- TIRAR DEPOIS
	('Lenovo lindo'); -- TIRAR DEPOIS
    
INSERT INTO computador (nome,fkEmpresa,fkModeloComputador,fkEmpresaLocataria,fkStatus) VALUES
	('123ad', 1, 1, 1,1), -- TIRAR DEPOIS
	('1234fd', 1, 1, 1,1), -- TIRAR DEPOIS
	('1234rew',2, 1, 2,1); -- TIRAR DEPOIS	

INSERT INTO unidadeMedida (nome	, simbolo) VALUES
	('Porcentagem', '%'),
	('GigaBytes', 'GB');
 
 INSERT INTO tipoHardware VALUES
	('CPU', 1),
	('RAM', 1),
	('Disco', 2),
	('Janelas', NULL);
    
INSERT INTO hardware(nome, capacidade, fkTipoHardware) VALUES
	('intel 3', 100, 1),
	('RAM', 100, 2),
	('Disco c:', 100, 3),
	('Janela', 100, 4);
    
INSERT INTO parametro VALUES
	(1, 2, 1, 1, 1);
	
INSERT INTO componente VALUES
	(1, 1);
-- 	(1, 2),
-- 	(1, 3),
-- 	(1, 4),
-- 	(2, 1),
-- 	(2, 2),
-- 	(2, 3),
-- 	(2, 4),
-- 	(3, 1),
-- 	(3, 2),
-- 	(3, 3),
-- 	(3, 4);
    
INSERT INTO captura VALUES
	(80.0, 'CPU', 1, 1, 1, 1);
    
INSERT INTO tipoAlerta VALUES
	('Urgente'),
	('Atenção');
    
INSERT INTO alerta(titulo, fkCaptura, fkTipoAlerta) VALUES
	('CPU - Uso Maximo', 1, 1);
	


--modeloComputadorModel

-- SELECT TOP 1 * FROM modeloComputador 
    -- ORDER BY idModeloComputador DESC;

  
  -- select modeloComputador.nome as modelo, idComputador as computador, empresaLocataria.nome as locataria, computador.fkStatus
  --     from modeloComputador JOIN computador on idModeloComputador = fkModeloComputador 
  --     JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria WHERE computador.fkStatus = 1 AND
  --     computador.fkEmpresa = 1 AND fkEmpresaLocataria = 1;

-- UPDATE computador SET fkStatus = 2 WHERE idComputador = '';



-- empresaLocatariaModel
/*SELECT empresaLocataria.*,empresa.idEmpresa,empresa.nome AS nomeEmpresaOutsorcing FROM empresaLocataria 
        JOIN empresa ON empresa.idEmpresa = empresaLocataria.fkEmpresa 
            WHERE fkEmpresa = 1 AND fkStatus = 1;*/
            
-- SELECT TOP 1 capacidade, valor,idtipoHardware,tipoHardware.nome,unidadeMedida.nome,unidadeMedida.simbolo FROM captura JOIN componente ON fkComponente = idComponente 
--     JOIN hardware ON hardware.idHardware = componente.fkHardware
--     JOIN tipoHardware ON idTipoHardware = fkTipoHardware
--     JOIN unidadeMedida ON idUnidadeMedida = fkUnidadeMedida
--     WHERE captura.fkComputador = ${idComputador} AND idtipoHardware = ${idHardware}
--     ORDER BY idCaptura DESC;

-- SELECT TOP 5 * FROM captura JOIN componente ON fkComponente = idComponente 
--     JOIN hardware ON hardware.idHardware = componente.fkHardware
--     JOIN tipoHardware ON idTipoHardware = fkTipoHardware
--     JOIN unidadeMedida ON idUnidadeMedida = fkUnidadeMedida
--     WHERE captura.fkComputador = {idComputador} AND idtipoHardware = ${idHardware}
--     ORDER BY dtCaptura DESC ;

SELECT COUNT(*) AS Alertas, idComputador, computador.nome, empresaLocataria.nome FROM computador 
	JOIN componente ON fkComputador = idComputador
    JOIN empresaLocataria ON fkEmpresaLocataria = idEmpresaLocataria
    JOIN captura ON fkComponente = idComponente
    JOIN alerta ON fkCaptura = idCaptura
    JOIN tipoAlerta ON fkTipoAlerta = idTipoAlerta WHERE DATEDIFF(DAY, GETDATE(), dtAlerta) < 7 AND computador.fkStatus = 1 GROUP BY idComputador, computador.nome, empresaLocataria.nome ORDER BY alertas DESC;    


SELECT COUNT(*) AS Alertas, idEmpresaLocataria FROM computador 
	JOIN componente ON fkComputador = idComputador
    JOIN empresaLocataria ON fkEmpresaLocataria = idEmpresaLocataria
    JOIN captura ON fkComponente = idComponente
    JOIN alerta ON fkCaptura = idCaptura
    JOIN tipoAlerta ON fkTipoAlerta = idTipoAlerta WHERE DATEDIFF(DAY, GETDATE(), dtAlerta) < 7 AND computador.fkStatus = 1 GROUP BY idEmpresaLocataria, empresaLocataria.nome ORDER BY alertas DESC; 
            

            
    








    
-- SELECT * FROM tipoHardware;
-- SELECT * FROM hardware;
-- SELECT * FROM componente;
-- SELECT * FROM captura;

-- SELECT * FROM usuario;
-- SELECT * FROM empresa;
-- SELECT * FROM local;