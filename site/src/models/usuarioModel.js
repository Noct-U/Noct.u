var database = require("../database/config")


function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    
    var instrucao = `
    SELECT nomeTipo,idUsuario, usuario.email as emailUsuario,idEmpresa , usuario.nome as nomeUsuario, 
    empresa.nome as nomeEmpresa FROM tipoUsuario JOIN usuario ON fkTipoUsuario = idTipoUsuario JOIN empresa ON empresa.idEmpresa = fkEmpresa WHERE email = '${email}' AND senha = '${senha}';
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

function consultarFuncionario(idLocataria,idLocadora) {
    var instrucao = `
        SELECT usuario.idUsuario,usuario.nome as nomeUsuario,usuario.email as emailUsuario, 
        usuario.senha as senhaUsuario, usuario.fkStatus as status,usuario.fkEmpresaLocadora,empresaLocataria.nome as locataria
        FROM usuario JOIN empresaLocataria ON idEmpresaLocataria = fkEmpresaLocadora  
        WHERE fkEmpresaLocadora = ${idLocataria} AND usuario.fkEmpresa = ${idLocadora};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function excluirUsuario(idUsuario) {
    var instrucao = `
        UPDATE usuario SET fkStatus = 2 WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarUsuario(idUsuario,nome,email,senha,locataria,tipoUsuario){
    var instrucao = `
    UPDATE usuario SET nome = "${nome}", email = "${email}", senha = "${senha}", fkTipoUsuario = ${tipoUsuario}, fkEmpresaLocadora = ${locataria} WHERE idUsuario = ${idUsuario};
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
    cadastrarUsuario,
    consultarFuncionario,
    excluirUsuario,
    atualizarUsuario
};