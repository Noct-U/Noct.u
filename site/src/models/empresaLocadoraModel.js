var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

    // SQL SERVER - É O MESMO COMANDO

    var instrucao = `
        SELECT * FROM empresa
            JOIN local on empresa.idEmpresa = fkIdempresa 
            JOIN endereco on fkIdEndereco = endereco.idEndereco
                WHERE email = '${email}' AND senha = ${senha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarMatriz(nome, cnpj, fkMatriz, fkEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, fkEmpresa, fkMatriz);

    var instrucao = `
        INSERT INTO empresaLocataria (nome,cnpj,fkEmpresa,fkStatus) VALUES 
            ('${nome}', '${cnpj}','${fkEmpresa}',1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarLocadora(nome, cnpj, fkMatriz, fkEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, fkEmpresa, fkMatriz);

    var instrucao = `
        INSERT INTO empresaLocataria (nome,cnpj,fkMatriz,fkEmpresa,fkStatus) VALUES 
            ('${nome}', '${cnpj}','${fkMatriz}', '${fkEmpresa}',1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirEmpresas(idEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // SQL SERVER - MESMO COMANDO

    var instrucao = `
        SELECT empresaLocataria.*,empresa.idEmpresa,empresa.nome AS nomeEmpresaOutsorcing FROM empresaLocataria 
        JOIN empresa ON empresa.idEmpresa = empresaLocataria.fkEmpresa 
            WHERE fkEmpresa = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarLocataria(idEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // SQL SERVER - MESMO COMANDO

    var instrucao = `
        SELECT 
        empresaLocataria.idEmpresaLocataria AS idLocataria,
        empresaLocataria.nome AS nomeLocataria,
        empresaLocataria.cnpj AS cnpjLocataria,
        empresaLocataria.fkStatus as fkStatus,
        empresaLocataria.fkMatriz AS idMatriz,
        matriz.nome AS nomeMatriz
        FROM 
            empresaLocataria
        LEFT JOIN 
            empresaLocataria AS matriz ON empresaLocataria.fkMatriz = matriz.idEmpresaLocataria
        WHERE 
            empresaLocataria.fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirLocataria(idEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucao = `
        UPDATE empresaLocataria SET fkStatus = 2 WHERE idEmpresaLocataria = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function atualizarLocataria(nomeLocataria,cnpjLocataria,matriz,idLocataria) {
    var instrucao = `
        UPDATE empresaLocataria SET nome = "${nomeLocataria}", cnpj = "${cnpjLocataria}", fkMatriz = ${matriz} WHERE idEmpresaLocataria = ${idLocataria};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    autenticar,
    cadastrarLocadora,
    cadastrarMatriz,
    exibirEmpresas,
    consultarLocataria,
    excluirLocataria,
    atualizarLocataria
};