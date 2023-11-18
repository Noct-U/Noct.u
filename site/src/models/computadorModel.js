var database = require("../database/config")

function cadastrar(numSerie, fkEmpresa, fkModelo) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucao = `
        INSERT INTO computador(numeroSerie,fkEmpresa,fkModeloComputador) VALUES 
            ('${numSerie}','${fkEmpresa}','${fkModelo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarModelo(modelo) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucao = `
        INSERT INTO modeloComputador(nome) VALUES 
            ('${modelo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirComputador(idComputador) {
    var instrucao = `
    UPDATE computador SET fkStatus = 2 WHERE idComputador = ${idComputador};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarUltimoModelo() {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucao = `
        SELECT * FROM modeloComputador 
            ORDER BY idModeloComputador DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarComputadores(idEmpresa,idLocataria) {

    var instrucao = `
    select modeloComputador.idModeloComputador AS idModelo,modeloComputador.nome as modelo, idComputador as computador,idStatus as idStatusComputador, status.titulo as nomeStatusUsuario, idEmpresaLocataria,empresaLocataria.nome as locataria
    from modeloComputador JOIN computador on idModeloComputador = fkModeloComputador 
    JOIN status ON idStatus = fkStatus
    JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocataria
    where computador.fkEmpresa = ${idEmpresa} AND fkEmpresaLocataria =  ${idLocataria};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function consultarDadosGrafico(idComputador,idHardware) {

    var instrucao = `
    SELECT capacidade, valor,idtipoHardware,tipoHardware.nome,unidadeMedida.nome,unidadeMedida.simbolo FROM captura JOIN componente ON fkComponente = idComponente 
    JOIN hardware ON hardware.idHardware = componente.fkHardware
    JOIN tipoHardware ON idTipoHardware = fkTipoHardware
    JOIN unidadeMedida ON idUnidadeMedida = fkUnidadeMedida
    WHERE captura.fkComputador = ${idComputador} AND idtipoHardware = ${idHardware}
    ORDER BY idCaptura DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarDadosGraficoCpu(idComputador,idHardware) {

    var instrucao = `
    SELECT * FROM captura JOIN componente ON fkComponente = idComponente 
    JOIN hardware ON hardware.idHardware = componente.fkHardware
    JOIN tipoHardware ON idTipoHardware = fkTipoHardware
    JOIN unidadeMedida ON idUnidadeMedida = fkUnidadeMedida
    WHERE captura.fkComputador = ${idComputador} AND idtipoHardware = ${idHardware}
    ORDER BY dtCaptura DESC 
    LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function consultarModelos() {

    var instrucao = `
        SELECT * FROM modeloComputador;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarTipoHardwares() {

    var instrucao = `
        select * from tipoHardware;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    cadastrarModelo,
    consultarUltimoModelo,
    consultarComputadores,
    excluirComputador,
    consultarDadosGrafico,
    consultarDadosGraficoCpu,
    consultarModelos,
    consultarTipoHardwares
};