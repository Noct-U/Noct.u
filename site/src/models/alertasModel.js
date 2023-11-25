var database = require("../database/config")

function consultarAlertasComputador(idComputador) {

    /*
        SQL SERVER


        SELECT TOP 8 alerta.idAlerta AS idAlerta ,captura.fkComputador as idComputador , computador.nome AS nomeComputador ,captura.valor AS valorCaptura, 
        tipoHardware.nome AS tipoHardware, unidadeMedida.simbolo AS unidadeMedida ,alerta.titulo AS descricaoAlerta, alerta.dtAlerta AS dataAlerta, 
        tipoAlerta.descricao  FROM alerta 
            JOIN tipoAlerta ON alerta.fkTipoAlerta = tipoAlerta.idTipoAlerta 
            JOIN captura ON captura.idCaptura = alerta.fkCaptura
            JOIN computador ON computador.idComputador = captura.fkComputador
            JOIN hardware ON hardware.idHardware = captura.fkHardware
            JOIN tipoHardware ON tipoHardware.idTipoHardware = hardware.fkTipoHardware
            LEFT JOIN unidadeMedida ON unidadeMedida.idUnidadeMedida = tipoHardware.fkUnidadeMedida
                WHERE captura.fkComputador = ${idComputador} ORDER BY alerta.idAlerta DESC;
    */

    var instrucao = `
        SELECT alerta.idAlerta AS idAlerta ,captura.fkComputador as idComputador , computador.nome AS nomeComputador ,captura.valor AS valorCaptura, 
        tipoHardware.nome AS tipoHardware, unidadeMedida.simbolo AS unidadeMedida ,alerta.titulo AS descricaoAlerta, alerta.dtAlerta AS dataAlerta, 
        tipoAlerta.descricao  FROM alerta 
        JOIN tipoAlerta ON alerta.fkTipoAlerta = tipoAlerta.idTipoAlerta 
        JOIN captura ON captura.idCaptura = alerta.fkCaptura
        JOIN computador ON computador.idComputador = captura.fkComputador
        JOIN hardware ON hardware.idHardware = captura.fkHardware
        JOIN tipoHardware ON tipoHardware.idTipoHardware = hardware.fkTipoHardware
        LEFT JOIN unidadeMedida ON unidadeMedida.idUnidadeMedida = tipoHardware.fkUnidadeMedida
        WHERE captura.fkComputador = ${idComputador} ORDER BY alerta.idAlerta DESC
        LIMIT 8;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarQuantidadeAlertas(idEmpresa) {

    // SQL SERVER - É O MESMO COMANDO

    var instrucao = `
        SELECT COUNT(idAlerta) AS quantidadeAlerta FROM alerta JOIN captura ON captura.idCaptura = alerta.fkCaptura JOIN computador ON computador.idComputador = captura.fkComputador
        WHERE computador.fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function quantidadeAlertasPorEmpresa(idEmpresa) {

    // SQL SERVER - É O MESMO COMANDO

    var instrucao = `
        SELECT empresaLocataria.nome AS nomeLocataria ,COUNT(idAlerta) AS quantidadeAlerta FROM alerta 
        JOIN captura ON captura.idCaptura = alerta.fkCaptura JOIN computador ON computador.idComputador = captura.fkComputador
        JOIN empresaLocataria ON computador.fkEmpresaLocataria = empresaLocataria.idEmpresaLocataria
        WHERE empresaLocataria.fkEmpresa = ${idEmpresa}
        GROUP BY empresaLocataria.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultaIrregularidadesModelo(idEmpresa) {

    // SQL SERVER - É O MESMO COMANDO

    var instrucao = `
        SELECT modeloComputador.nome AS modelo, COUNT(idAlerta) AS quantidadeAlertas FROM tipoAlerta 
        JOIN alerta ON alerta.fkTipoAlerta = tipoAlerta.idTipoAlerta
        JOIN captura ON captura.idCaptura = alerta.fkCaptura
        JOIN computador ON computador.idComputador = captura.fkComputador
        JOIN modeloComputador ON modeloComputador.idModeloComputador = computador.fkModeloComputador
        WHERE computador.fkEmpresa = ${idEmpresa}
        GROUP BY modeloComputador.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultaIrregularidadesEmpresa(idEmpresa) {

    // SQL SERVER - É O MESMO COMANDO

    var instrucao = `
        SELECT empresaLocataria.nome AS modelo, COUNT(idAlerta) AS quantidadeAlertas FROM tipoAlerta 
        JOIN alerta ON alerta.fkTipoAlerta = tipoAlerta.idTipoAlerta
        JOIN captura ON captura.idCaptura = alerta.fkCaptura
        JOIN computador ON computador.idComputador = captura.fkComputador
        JOIN empresaLocataria ON empresaLocataria.idEmpresaLocataria = computador.fkEmpresaLocataria
        WHERE computador.fkEmpresa = ${idEmpresa}
        GROUP BY empresaLocataria.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultaIrregularidadesUltimasHoras(idEmpresa) {

    /*
        SQL SERVER - *TEM QUE TESTAR ESSE
        
        
        SELECT DATEPART(HOUR, dtAlerta) AS hora,COUNT(dtAlerta) AS qtd_alertas FROM alerta
         JOIN captura ON captura.idCaptura = alerta.fkCaptura
         JOIN computador ON computador.idComputador = captura.fkComputador
         WHERE dtAlerta BETWEEN DATEADD(DAY, -1, GETDATE()) AND GETDATE() AND computador.fkEmpresa = 1
         GROUP BY DATEPART(HOUR, dtAlerta) ORDER BY hora;
     */

    var instrucao = `
        SELECT HOUR(dtAlerta) AS hora,COUNT(dtAlerta) AS qtd_alertas FROM alerta
        JOIN captura ON captura.idCaptura = alerta.fkCaptura
        JOIN computador ON computador.idComputador = captura.fkComputador
        WHERE dtAlerta BETWEEN NOW() - INTERVAL 1 DAY AND NOW() AND computador.fkEmpresa = ${idEmpresa}
        GROUP BY HOUR(dtAlerta) ORDER BY hora;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarGraficoAlertaPorHora(idEmpresa) {

    /*
        SQL SERVER - *TEM QUE TESTAR ESSE
        
        SELECT TOP 1 DATEPART(HOUR, dtAlerta) AS hora,COUNT(dtAlerta) AS qtd_alertas FROM alerta
         JOIN captura ON captura.idCaptura = alerta.fkCaptura
         JOIN computador ON computador.idComputador = captura.fkComputador
         WHERE dtAlerta BETWEEN DATEADD(HOUR, -1, GETDATE()) AND GETDATE() AND computador.fkEmpresa = 1
         GROUP BY DATEPART(HOUR, dtAlerta) ORDER BY hora;
     */

    var instrucao = `
    SELECT HOUR(dtAlerta) AS hora,COUNT(dtAlerta) AS qtd_alertas FROM alerta
    JOIN captura ON captura.idCaptura = alerta.fkCaptura
    JOIN computador ON computador.idComputador = captura.fkComputador
    WHERE dtAlerta BETWEEN NOW() - INTERVAL 1 DAY AND NOW() AND computador.fkEmpresa = ${idEmpresa}
    GROUP BY HOUR(dtAlerta) ORDER BY hora LIMIT 1	;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function consultaIrregularidadesModelo(idEmpresa) {

    // SQL SERVER - É O MESMO COMANDO

    var instrucao = `
        SELECT modeloComputador.nome AS modelo, COUNT(idAlerta) AS quantidadeAlertas FROM tipoAlerta 
        JOIN alerta ON alerta.fkTipoAlerta = tipoAlerta.idTipoAlerta
        JOIN captura ON captura.idCaptura = alerta.fkCaptura
        JOIN computador ON computador.idComputador = captura.fkComputador
        JOIN modeloComputador ON modeloComputador.idModeloComputador = computador.fkModeloComputador
        WHERE computador.fkEmpresa = ${idEmpresa}
        GROUP BY modeloComputador.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    consultarAlertasComputador,
    consultarQuantidadeAlertas,
    quantidadeAlertasPorEmpresa,
    consultaIrregularidadesModelo,
    consultaIrregularidadesEmpresa,
    consultaIrregularidadesUltimasHoras,
    atualizarGraficoAlertaPorHora
};