var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    
    var instrucao = `
        SELECT * FROM tipoUsuario 
        JOIN usuario ON idTipoUsuario = fkTipoUsuario 
        JOIN empresa ON idEmpresa = fkEmpresa
        LEFT JOIN empresaLocataria ON empresaLocataria.fkEmpresa = idEmpresa 
        JOIN local ON local.fkEmpresa = empresa.idEmpresa
        JOIN endereco ON endereco.idEndereco = fkEndereco 
            WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, tipoUsuario, empresaLocadora, empresaAlocacao) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario,fkEmpresaLocadora,fkEmpresa) VALUES
            ('${nome}','${email}','${senha}',${tipoUsuario},${empresaLocadora},${empresaAlocacao}); 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarTipo(tipo) {
    var instrucao = `
        INSERT INTO tipoUsuario (nomeTipo) VALUES
            ('${tipo}'); 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirLocatarias(idEmpresa) {
    var instrucao = `
        SELECT * FROM empresaLocataria 
            WHERE fkEmpresa = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirUltimoTipo() {
    var instrucao = `
        SELECT * FROM tipoUsuario
            ORDER BY idTipoUsuario DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, tipo, empresa) {
    var instrucao = `
        INSERT INTO usuario (nome,email,senha,fkTipoUsuario,fkEmpresaAlocacao) VALUES 
            ('${nome}','${email}','${senha}','${tipo}','${empresa}');
    `;
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