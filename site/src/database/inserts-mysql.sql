use noctuBD;

INSERT INTO empresa(nome, razaoSocial, cnpj, telefoneFixo) VALUES
	('Simpress', 'Ltda', '12356789019183', '119333576377'), -- TIRAR DEPOIS
	('PressSim', 'Ltda', '12356789019283', '119333576377'); -- TIRAR DEPOIS
    
INSERT INTO endereco (cep, uf, cidade, bairro, logradouro) VALUES
	('08474230', 'SP', 'São Paulo', 'Paulista', 'Rua Haddock Lobo'); -- TIRAR DEPOIS
    
INSERT INTO local (numero, fkEndereco, fkEmpresa) VALUES
	(211, 1, 1); -- TIRAR DEPOIS
    
INSERT INTO status (titulo) VALUES
	('Ativo'),
	('Inativo');

INSERT INTO empresaLocataria (nome, cnpj, fkEmpresa) VALUES
	('SPTech', '10293029381203', 1), -- TIRAR DEPOIS
	('LiminhaTech', '31242131231', 2); -- TIRAR DEPOIS

INSERT INTO tipoUsuario (nomeTipo) VALUES
	('ADMIN'),
	('COMUM');

INSERT INTO  usuario (nome, email, senha, fkTipoUsuario, fkEmpresaLocadora, fkEmpresa) VALUES
	('Kevin', 'kevin.silva@sptech.school', '1234', 1, 1, 1); -- TIRAR DEPOIS
 
 INSERT INTO modeloComputador (nome) VALUES
	('Padrão'), -- TIRAR DEPOIS
	('Lenovo lindo'); -- TIRAR DEPOIS
    
INSERT INTO computador VALUES
	(NULL, '1212', 1, 1, 1, 1),	
	(NULL, '1211', 1, 1, 1, 1);	

INSERT INTO unidadeMedida (nome	, simbolo) VALUES
	('Porcentagem', '%'),
	('GigaBytes', 'GB');
    
 INSERT INTO tipoHardware VALUES
	(NULL, 'CPU', 1),
	(NULL, 'RAM', 1),
	(NULL, 'Disco', 2),
	(NULL, 'Janelas', NULL);
        
INSERT INTO hardware(nome, capacidade, fkTipoHardware) VALUES
	('intel 3', 100, 1),
	('RAM', 100, 2),
	('Disco c:', 100, 3),
	('Janela', 100, 4);

INSERT INTO parametro VALUES
	(null, 1, 2, 1, 1, 1);
    
INSERT INTO componente VALUES
	(NULL, 1, 1),
	(NULL, 1, 2),
	(NULL, 1, 3),
	(NULL, 1, 4);
    
INSERT INTO captura (valor, descricao, fkComputador, fkHardware, fkComponente) VALUES
	(65.0, 'CPU', 1, 1, 1);

INSERT INTO tipoAlerta VALUES
	(null, 'Urgente'),
	(null, 'Atenção');
    
INSERT INTO alerta (titulo, fkTipoAlerta, fkCaptura)VALUES
	('CPU - Uso Maximo', 1, 1);
    
    
 -- MYSQL-API
 
 -- UPDATE computador SET fkStatus = 2 WHERE idComputador = '';
 -- exibir computadores
select modeloComputador.nome as modelo, idComputador as computador, empresaLocataria.nome as locataria, computador.fkStatus
    from modeloComputador JOIN computador on idModeloComputador = fkModeloComputador 
    JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria WHERE computador.fkStatus = 1 AND
    computador.fkEmpresa = 1 AND fkEmpresaLocataria = 1;
    
-- exibirEmpresas
/*SELECT empresaLocataria.*,empresa.idEmpresa,empresa.nome AS nomeEmpresaOutsorcing FROM empresaLocataria 
        JOIN empresa ON empresa.idEmpresa = empresaLocataria.fkEmpresa 
            WHERE fkEmpresa = 1 AND fkStatus = 1;*/

SELECT * FROM empresaLocataria WHERE fkStatus = 1;

select modeloComputador.idModeloComputador AS idModelo,modeloComputador.nome as modelo, idComputador as computador,idStatus as idStatusComputador, status.titulo as nomeStatusUsuario, idEmpresaLocataria,empresaLocataria.nome as locataria
    from modeloComputador JOIN computador on idModeloComputador = fkModeloComputador 
    JOIN status ON idStatus = fkStatus
    JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria
    where computador.fkEmpresa = 1 AND fkEmpresaLocataria =  1 AND computador.fkStatus = 1;

SELECT * FROM empresa;    
/*SELECT *, ROW_NUMBER() OVER (ORDER BY nome) AS ordem
FROM empresa ORDER BY ordem DESC LIMIT 1;*/


SELECT COUNT(*) AS Alertas, idComputador, computador.nome, empresaLocataria.nome FROM computador 
	JOIN componente ON fkComputador = idComputador
    JOIN empresaLocataria ON fkEmpresaLocataria = idEmpresaLocataria
    JOIN captura ON fkComponente = idComponente
    JOIN alerta ON fkCaptura = idCaptura
    JOIN tipoAlerta ON fkTipoAlerta = idTipoAlerta WHERE DATEDIFF(NOW(), dtAlerta) < 7 AND computador.fkStatus = 1 GROUP BY idComputador ORDER BY alertas DESC;    

SELECT COUNT(*) AS Alertas, idEmpresaLocataria FROM computador 
	JOIN componente ON fkComputador = idComputador
    JOIN empresaLocataria ON fkEmpresaLocataria = idEmpresaLocataria
    JOIN captura ON fkComponente = idComponente
    JOIN alerta ON fkCaptura = idCaptura
    JOIN tipoAlerta ON fkTipoAlerta = idTipoAlerta WHERE DATEDIFF(NOW(), dtAlerta) < 7 AND computador.fkStatus = 1 GROUP BY idEmpresaLocataria ORDER BY alertas DESC;    

        
    