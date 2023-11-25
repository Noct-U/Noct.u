var database = require("../database/config")

function autenticar(email, senha) {

    // NÃO USAMOS MAIS -NEGADO
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `   
        SELECT * FROM empresa 
        JOIN local on empresa.idEmpresa = fkEmpresa 
        JOIN endereco on fkEndereco = endereco.idEndereco
            WHERE email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(nome, razaoSocial, cnpj, telefone) {

    // SQL SERVER MESMA SINTAXE
    var instrucao = `
        INSERT INTO empresa(nome, razaoSocial, cnpj, telefoneFixo) VALUES 
            ('${nome}', '${razaoSocial}', '${cnpj}', '${telefone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarEndereco(cep, cidade, bairro, uf, logradouro) {

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        INSERT INTO endereco (cep, uf, cidade, bairro, logradouro) VALUES 
            ('${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarUltimaEmpresa() {

    /*SQL SERVER

         SELECT TOP 1 idEmpresa FROM empresa
            ORDER BY idEmpresa DESC;
    */

    var instrucao = `
        SELECT idEmpresa FROM empresa
            ORDER BY idEmpresa DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarUltimoEndereco() {


    /* SQL SERVER
        SELECT TOP 1 idEndereco FROM endereco
                ORDER BY idEndereco DESC;

    */
    var instrucao = `
        SELECT idEndereco FROM endereco
            ORDER BY idEndereco DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarLocal(numero, complemento, idUltimoEndereco, idUltimaEmpresa) {

    // SQL SERVER MESMA SINTAXE
    var instrucao = `
        INSERT INTO local (numero,complemento,fkEndereco,fkEmpresa) VALUES 
            ('${numero}', '${complemento}','${idUltimoEndereco}','${idUltimaEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirEmpresas(idEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");


    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        SELECT empresa.idEmpresa,empresa.razaoSocial FROM empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrarEmpresa,
    cadastrarEndereco,
    consultarUltimaEmpresa,
    consultarUltimoEndereco,
    cadastrarLocal,
    exibirEmpresas,
};