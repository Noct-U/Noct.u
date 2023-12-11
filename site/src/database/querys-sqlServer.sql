
-- COMPUTADORMODEL
-- SELECT ULTIMO MODELO 
SELECT TOP 1 * FROM modeloComputador 
    ORDER BY idModeloComputador DESC;

  -- SELECTS PCS ATIVOS	
  select modeloComputador.nome as modelo, idComputador as computador, empresaLocataria.nome as locataria, computador.fkStatus
       from modeloComputador JOIN computador on idModeloComputador = fkModeloComputador 
       JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria WHERE computador.fkStatus = 1 AND
       computador.fkEmpresa = 1 AND fkEmpresaLocataria = 1;

-- CONSULTAR DADOS GRAFICO
SELECT TOP 1 capacidade, valor,idtipoHardware,tipoHardware.nome,unidadeMedida.nome,unidadeMedida.simbolo FROM captura JOIN componente ON fkComponente = idComponente 
    JOIN hardware ON hardware.idHardware = componente.fkHardware
    JOIN tipoHardware ON idTipoHardware = fkTipoHardware
    JOIN unidadeMedida ON idUnidadeMedida = fkUnidadeMedida
    WHERE captura.fkComputador = ${idComputador} AND idtipoHardware = ${idHardware}
    ORDER BY idCaptura DESC;
    
-- CONSULTAR DADOS DA CPU
SELECT TOP 5 * FROM captura JOIN componente ON fkComponente = idComponente 
    JOIN hardware ON hardware.idHardware = componente.fkHardware
    JOIN tipoHardware ON idTipoHardware = fkTipoHardware
    JOIN unidadeMedida ON idUnidadeMedida = fkUnidadeMedida
    WHERE captura.fkComputador = {idComputador} AND idtipoHardware = ${idHardware}
    ORDER BY dtCaptura DESC ;

-- EMPRESALOCADORAMODEL
SELECT empresaLocataria.*,empresa.idEmpresa,empresa.nome AS nomeEmpresaOutsorcing FROM empresaLocataria 
        JOIN empresa ON empresa.idEmpresa = empresaLocataria.fkEmpresa 
            WHERE fkEmpresa = 1 AND fkStatus = 1;
		

-- empresaModel
SELECT TOP 1 * FROM endereco
    ORDER BY  idEndereco DESC;
		
SELECT TOP 1 * FROM empresa
    ORDER BY idEmpresa DESC;
    
-- usuarioModel

-- exibir ultimo tipo
        SELECT TOP 1 * FROM tipoUsuario
            ORDER BY idTipoUsuario DESC;
            

		



