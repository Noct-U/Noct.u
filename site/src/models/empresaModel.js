var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `   
    select * from empresa join local on empresa.idEmpresa = fkEmpresa join endereco on fkEndereco = endereco.idEndereco
    where email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(nome,razaoSocial,cnpj,telefone) {
    var instrucao = `
        INSERT INTO empresa (nome,razaoSocial,cnpj,telefoneFixo) VALUES ('${nome}', '${razaoSocial}', '${cnpj}', '${telefone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEndereco(cep,cidade,bairro,uf,logradouro) {

    var instrucao = `
        INSERT INTO endereco (cep,uf,cidade,bairro,logradouro) VALUES ('${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarUltimaEmpresa() {
    var instrucao = `
        SELECT idEmpresa FROM empresa
        ORDER BY idEmpresa DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function consultarUltimoEndereco() {

    var instrucao = `
        SELECT idEndereco FROM endereco
        ORDER BY idEndereco DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarLocal(numero,complemento,andar,sala,idUltimoEndereco,idUltimaEmpresa) {

    var instrucao = `
        INSERT INTO local (numero,complemento,andar,sala,fkEndereco,fkEmpresa) VALUES ('${numero}', '${complemento}','${andar}','${sala}','${idUltimoEndereco}','${idUltimaEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirEmpresas(idEmpresa) {
    console.log("ACESSEI A EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    select empresa.id,empresa.razaoSocial from empresa;
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