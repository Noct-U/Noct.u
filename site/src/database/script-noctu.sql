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
	('SPTech', '10293029381203', 1), -- TIRAR DEPOIS
	('LiminhaTech', '31242131231', 2); -- TIRAR DEPOIS
    
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
	('Padrão'), -- TIRAR DEPOIS
	('Lenovo lindo'); -- TIRAR DEPOIS
 
CREATE TABLE computador(
	idComputador INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT,
    fkModeloComputador INT,
    fkEmpresaLocataria INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador),
    FOREIGN KEY (fkEmpresaLocataria) REFERENCES empresaLocataria(idEmpresaLocataria)
);

INSERT INTO computador (fkEmpresa, fkModeloComputador, fkEmpresaLocataria) VALUES
	(1, 1, 1), -- TIRAR DEPOIS
	(1, 1, 1), -- TIRAR DEPOIS
	(2, 1, 2); -- TIRAR DEPOIS
    
CREATE TABLE unidadeMedida(
	idUnidadeMedida INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
	simbolo VARCHAR(3)
);

INSERT INTO unidadeMedida (nome	, simbolo) VALUES
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

INSERT INTO hardware(nome, capacidade, fkTipoHardware) VALUES
	('intel 3', 100, 1),
	('RAM', 100, 2),
	('Disco c:', 100, 3),
	('Janela', 100, 4);

-- JAR pega

CREATE TABLE parametro(
	idParametro INT PRIMARY KEY AUTO_INCREMENT,
    min DOUBLE,
    max DOUBLE,
    fkModeloComputador INT,
    FOREIGN KEY (fkModeloComputador) REFERENCES modeloComputador(idModeloComputador)
);

CREATE TABLE componente(
	idComponente INT AUTO_INCREMENT,
    fkComputador INT,
    fkHardware INT,
    FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware),
    FOREIGN KEY (fkComputador) REFERENCES computador(idComputador),
    PRIMARY KEY (idComponente, fkHardware, fkComputador)
); 

INSERT INTO componente VALUES
	(null, 1, 1),
	(null, 1, 2),
	(null, 1, 3),
	(null, 1, 4),
	(null, 2, 1),
	(null, 2, 2),
	(null, 2, 3),
	(null, 2, 4),
	(null, 3, 1),
	(null, 3, 2),
	(null, 3, 3),
	(null, 3, 4);
    
    
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
select (m.nome) as Limamoura from componente
	join computador
	on idComputador = fkComputador
    join modeloComputador as m
    on idModeloComputador = fkModeloComputador
		where m.nome = 'Padrão'; 
  
select * from empresaLocataria;
  
UPDATE computador
SET fkModeloComputador = 2
	WHERE idComputador IN (
    SELECT idComputador
    FROM componente
    JOIN computador as c
    ON idComputador = fkComputador
    JOIN modeloComputador AS m
    ON idModeloComputador = fkModeloComputador
		WHERE m.nome = 'Padrão' AND c.fkEmpresaLocataria = 1
);

select * from modeloComputador;

SELECT *
    FROM componente
    JOIN computador as c
    ON idComputador = fkComputador
    JOIN modeloComputador AS m
    ON idModeloComputador = fkModeloComputador
		WHERE m.nome = 'Padrão' AND c.fkEmpresaLocataria = 2;
        
        SELECT * FROM computador JOIN empresa ON fkEmpresa = idEmpresa where fkEmpresa = 1 ;
        
      SELECT 
        computador.idComputador as computador ,modeloComputador.nome as modelo, idParametro as parametro, 
        empresaLocataria.nome as empresaPertencente
        FROM parametro 
        JOIN modeloComputador ON modeloComputador.idModeloComputador = parametro.fkModeloComputador
		JOIN computador ON computador.fkModeloComputador = modeloComputador.idModeloComputador
		JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria 
        ;
      --  JOIN componente ON computador.idComputador = componente.fkComputador
		-- JOIN hardware ON componente.fkHardware = hardware.idHardware
      --  JOIN tipoHardware ON hardware.fkTipoHardware = tipoHardware.idTipoHardware
        -- JOIN unidadeMedida ON fkUnidadeMedida = idUnidadeMedida;
        
        -- modelo.nome as nomeModelo,min as parametroMinimo,max as parametroMaximo
        SELECT 
        computador.idComputador as computador ,modeloComputador.nome as modelo, idParametro as parametro,
        min,max,
        hardware.nome as Hardware,
        tipoHardware.nome as tipoHardware,
        unidadeMedida.simbolo as unidaMedida,
        empresaLocataria.nome as empresaPertencente
        FROM parametro 
        JOIN modeloComputador ON modeloComputador.idModeloComputador = parametro.fkModeloComputador
		JOIN computador ON computador.fkModeloComputador = modeloComputador.idModeloComputador
		JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria 
        JOIN componente ON computador.idComputador = componente.fkComputador
		JOIN hardware ON componente.fkHardware = hardware.idHardware
		JOIN tipoHardware ON hardware.fkTipoHardware = tipoHardware.idTipoHardware
        JOIN unidadeMedida ON fkUnidadeMedida = idUnidadeMedida
        WHERE computador.fkEmpresa = 1
        ORDER BY idComputador,idParametro, idHardware;
        
        
        SELECT * FROM unidadeMedida
        JOIN tipoHardware ON fkUnidadeMedida = idUnidadeMedida
        JOIN hardware ON idHardware = fkTipoHardware;
        select * from componente;

INSERT INTO parametro VALUES
	(null, 1, 2, 1),
	(null, 3, 4, 1),
	(null, 5, 6, 1),
    (null, 9, 10, 1),
	(null, 15, 16, 2),
	(null, 15, 16, 2),
	(null, 15, 16, 2),
	(null, 15, 16, 2);
select * from parametro;
		
        
        
        
        
        
        
        SELECT 
    c.idComputador as computador,
    mc.nome as modelo,
    p.idParametro as parametro,
    comp.idComponente,
    h.idHardware,
    el.nome as empresaPertencente
FROM parametro p
JOIN modeloComputador mc ON mc.idModeloComputador = p.fkModeloComputador
JOIN computador c ON c.fkModeloComputador = mc.idModeloComputador
JOIN empresaLocataria el ON el.idEmpresaLocataria = c.fkEmpresaLocataria
JOIN componente comp ON c.idComputador = comp.fkComputador
JOIN hardware h ON comp.fkHardware = h.idHardware
WHERE (c.idComputador, p.idParametro) IN (
    SELECT c1.idComputador, p1.idParametro
    FROM computador c1
    JOIN parametro p1 ON mc.idModeloComputador = p1.fkModeloComputador
    GROUP BY c1.idComputador, p1.idParametro
);





select * from modeloComputador JOIN computador on idModeloComputador = fkModeloComputador JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria;



select modeloComputador.nome as modelo, idComputador as computador, empresaLocataria.nome as locataria
from modeloComputador JOIN computador on idModeloComputador = fkModeloComputador JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria
    where computador.fkEmpresa = 1;
SELECT 
    computador,
    modelo,
    idParametro,
    min,
    max,
    idComponente,
    idHardware,
    empresaPertencente
FROM (
    SELECT 
        computador.idComputador as computador,
        modeloComputador.nome as modelo,
        idParametro,
        min,
        max,
        idComponente,
        hardware.idHardware,
        empresaLocataria.nome as empresaPertencente,
        ROW_NUMBER() OVER (PARTITION BY computador.idComputador ORDER BY componente.idComponente) as row_num
    FROM 
        parametro 
    JOIN 
        modeloComputador ON modeloComputador.idModeloComputador = parametro.fkModeloComputador
    JOIN 
        computador ON computador.fkModeloComputador = modeloComputador.idModeloComputador
    JOIN 
        empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria 
    JOIN 
        componente ON computador.idComputador = componente.fkComputador
    JOIN 
        hardware ON componente.fkHardware = hardware.idHardware
) AS numbered_rows
WHERE row_num <= 4;

DELIMITER $$
CREATE TRIGGER exclusao_computador
    BEFORE DELETE ON computador
    FOR EACH ROW
BEGIN
	call delete_comp(old.idComputador);
    
END;
$$
DELIMITER ;

DELETE FROM computador WHERE idComputador = 1;
DELETE FROM componente WHERE fkComputador = 1;

DELIMITER $$
	CREATE PROCEDURE delete_comp(fkOldComp INT)
	BEGIN

	DELETE FROM componente WHERE fkComputador = fkOldComp;
    
END$$
