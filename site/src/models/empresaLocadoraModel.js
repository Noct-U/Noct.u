var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    select * from empresa join local on empresa.idEmpresa = fkIdempresa join endereco on fkIdEndereco = endereco.idEndereco
    where email = '${email}' and senha = ${senha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarMatriz(nome,cnpj,fkMatriz,fkEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",nome,cnpj,fkEmpresa,fkMatriz);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresaLocataria (nome,cnpj,fkEmpresa) VALUES ('${nome}', '${cnpj}','${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarLocadora(nome,cnpj,fkMatriz,fkEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",nome,cnpj,fkEmpresa,fkMatriz);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresaLocataria (nome,cnpj,fkMatriz,fkEmpresa) VALUES ('${nome}', '${cnpj}','${fkMatriz}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirEmpresas(idEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    SELECT empresaLocataria.*,empresa.idEmpresa,empresa.nome AS nomeEmpresaOutsorcing FROM empresaLocataria 
    JOIN empresa ON empresa.idEmpresa = empresaLocataria.fkEmpresa WHERE empresaLocataria.fkMatriz IS NULL AND fkEmpresa = '${idEmpresa}';

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




module.exports = {
    autenticar,
    cadastrarLocadora,
    cadastrarMatriz,
    exibirEmpresas
};