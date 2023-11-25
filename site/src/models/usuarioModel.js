var database = require("../database/config")


function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    

    // SQL SERVER MESMA SINTAXE
    var instrucao = `
    SELECT nomeTipo,idUsuario, usuario.email as emailUsuario,idEmpresa , usuario.nome as nomeUsuario, 
    empresa.nome as nomeEmpresa FROM tipoUsuario JOIN usuario ON fkTipoUsuario = idTipoUsuario JOIN empresa ON empresa.idEmpresa = fkEmpresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, tipoUsuario, empresaLocadora, empresaAlocacao) {

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkTipoUsuario,fkEmpresaLocadora,fkEmpresa) VALUES
            ('${nome}','${email}','${senha}',${tipoUsuario},${empresaLocadora},${empresaAlocacao}); 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFunc(nome, email, senha, tipo, empresa, fkEmpresa) {
    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        INSERT INTO usuario (nome,email,senha,fkTipoUsuario,fkEmpresaLocadora, fkEmpresa) VALUES 
            ('${nome}','${email}','${senha}','${tipo}','${empresa}', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarTipo(tipo) {
    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        INSERT INTO tipoUsuario (nomeTipo) VALUES
            ('${tipo}'); 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirLocatarias(idEmpresa) {

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        SELECT * FROM empresaLocataria 
            WHERE fkEmpresa = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirUltimoTipo() {

    /* SQL SERVER 

        SELECT TOP 1 * FROM tipoUsuario
        ORDER BY idTipoUsuario DESC;
    */
    var instrucao = `
        SELECT * FROM tipoUsuario
            ORDER BY idTipoUsuario DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, tipo, empresa) {

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        INSERT INTO usuario (nome,email,senha,fkTipoUsuario,fkEmpresaAlocacao) VALUES 
            ('${nome}','${email}','${senha}','${tipo}','${empresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarFuncionario(idLocataria,idLocadora) {

    //SQL SERVER MESMA SINTAXE
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

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
        UPDATE usuario SET fkStatus = 2 WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirFun(idUsuario) {

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
    UPDATE usuario SET fkStatus = 2 WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} 

function atualizarUsuario(idUsuario,nome,email,senha,locataria,tipoUsuario){

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
    UPDATE usuario SET nome = "${nome}", email = "${email}", senha = "${senha}", fkTipoUsuario = ${tipoUsuario}, fkEmpresaLocadora = ${locataria} WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarFunc(nome, email, senha, tipo, empresa, fkEmpresa){

    //SQL SERVER MESMA SINTAXE
    var instrucao = `
    UPDATE usuario SET nome = "${nome}", email = "${email}", senha = "${senha}", fkTipoUsuario = ${tipo}, fkEmpresaLocadora = ${empresa}, fkEmpresa= ${fkEmpresa} WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarTipo,
    cadastrarFunc,
    exibirLocatarias,
    exibirUltimoTipo,
    cadastrarUsuario,
    consultarFuncionario,
    excluirUsuario,
    atualizarUsuario,
    excluirFun,
    atualizarFunc
};