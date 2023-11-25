var database = require("../database/config")

function listarAlertas(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    /*
        SQL SERVER

         SELECT computador.nome as nomePC, COUNT(idAlerta)as alertas, empresaLocataria.nome as empresa FROM computador 
	        JOIN captura ON fkComputador = idComputador
            JOIN alerta ON fkCaptura = idCaptura 
            JOIN empresaLocataria ON fkEmpresaLocataria = idEmpresaLocataria 
            WHERE computador.fkEmpresa = ${idEmpresa} GROUP BY computador.nome, empresaLocataria.nome;
    */

    var instrucao = `
    SELECT computador.nome as nomePC, COUNT(idAlerta)as alertas, empresaLocataria.nome as empresa FROM computador 
	JOIN captura ON fkComputador = idComputador
    JOIN alerta ON fkCaptura = idCaptura JOIN empresaLocataria ON fkEmpresaLocataria = idEmpresaLocataria WHERE computador.fkEmpresa = ${idEmpresa} GROUP BY nomePC;
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Opa")
    return database.executar(instrucao);
}

function listarComponentes(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    /*
        SQL SERVER

        SELECT tipoHardware.nome AS nomeH, COUNT(idAlerta) AS qtd FROM tipoHardware JOIN hardware ON fkTipoHardware = idTipoHardware
            JOIN componente ON fkHardware = idHardware
            JOIN captura ON fkComponente = idComponente
            JOIN alerta ON fkCaptura = idCaptura 
            JOIN computador ON captura.fkComputador = idComputador 
        WHERE fkEmpresa = ${idEmpresa} GROUP BY tipoHardware.nome;
     
     */

    var instrucao = `
    SELECT tipoHardware.nome AS nomeH, COUNT(idAlerta) AS qtd FROM tipoHardware JOIN hardware ON fkTipoHardware = idTipoHardware
        JOIN componente ON fkHardware = idHardware
        JOIN captura ON fkComponente = idComponente
        JOIN alerta ON fkCaptura = idCaptura 
        JOIN computador ON captura.fkComputador = idComputador 
        WHERE fkEmpresa = ${idEmpresa} GROUP BY nomeH;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Opa")
    return database.executar(instrucao);
}

function listarEmpresas(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    /*
        SQL SERVER

        SELECT empresaLocataria.nome AS nomeE, COUNT(idAlerta) AS qtd FROM empresaLocataria 
            JOIN computador ON fkEmpresaLocataria = idEmpresaLocataria  
            JOIN captura ON fkComputador = idComputador JOIN alerta ON fkCaptura = idCaptura WHERE empresaLocataria.fkEmpresa = ${idEmpresa} GROUP BY empresaLocataria.nome;
    */

    var instrucao = `
    SELECT empresaLocataria.nome AS nomeE, COUNT(idAlerta) AS qtd FROM empresaLocataria 
        JOIN computador ON fkEmpresaLocataria = idEmpresaLocataria  
        JOIN captura ON fkComputador = idComputador
        JOIN alerta ON fkCaptura = idCaptura WHERE empresaLocataria.fkEmpresa = ${idEmpresa} GROUP BY nomeE;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Opa")
    return database.executar(instrucao);
}

function buscarKpi(idEmpresa){

    // SQL SERVER - MESMO COMANDO


    var instrucao = `
    SELECT COUNT(*) as qtd FROM alerta JOIN captura ON fkCaptura = idCaptura
    JOIN computador ON fkComputador = idComputador WHERE fkEmpresa = ${idEmpresa} AND fkTipoAlerta = 1
    
    UNION
    
    SELECT COUNT(*) as qtd FROM alerta JOIN captura ON fkCaptura = idCaptura
    JOIN computador ON fkComputador = idComputador WHERE fkEmpresa = ${idEmpresa} AND fkTipoAlerta = 2;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    console.log("Opa")
    return database.executar(instrucao);
}


module.exports = {
    listarAlertas,
    listarComponentes,
    listarEmpresas,
    buscarKpi
};