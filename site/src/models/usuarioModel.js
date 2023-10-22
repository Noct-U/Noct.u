var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    insert INTO usuario (nome,email,senha)values
    ('${nome}','${email}','${senha}'); `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarTipo(tipo) {

    var instrucao = `
    insert INTO tipoUsuario (nomeTipo) values('${tipo}'); `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirLocatarias(idEmpresa) {

    var instrucao = `
    SELECT * FROM empresaLocataria WHERE fkEmpresa = '${idEmpresa}';`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirUltimoTipo() {

    var instrucao = `
        SELECT * FROM tipoUsuario ORDER BY idTipoUsuario DESC LIMIT 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome,email,senha,tipo,empresa) {

    var instrucao = `
    INSERT INTO usuario (nome,email,senha,fkTipoUsuario,fkEmpresaAlocacao) VALUES('${nome}','${email}','${senha}','${tipo}','${empresa}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    autenticar,
    cadastrar,
    cadastrarTipo,
    exibirLocatarias,
    exibirUltimoTipo,
    cadastrarUsuario
};