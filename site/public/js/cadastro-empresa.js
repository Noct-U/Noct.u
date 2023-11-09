verificarDados();

function avancar() {
    //recuperando dados dos inputs
    var nomeEmpresa = ipt_nome_empresa.value;
    var razaoSocial = ipt_razao_social.value;
    var cnpj = ipt_cnpj.value;
    var telefone = ipt_telefone_empresa.value;
    //vetor de dados
    var dadosEmpresa = [nomeEmpresa, razaoSocial, cnpj, telefone];
    console.log(dadosEmpresa);

    //transformando em JSON e salvar em memória cache 
    var jsonDados = JSON.stringify(dadosEmpresa);
    console.log("JSON Empresa: " + jsonDados)
    localStorage.setItem('dadosEmpresa', jsonDados);

    var nomeUsuario = ipt_nome_usuario.value;
    var emailUsuario = ipt_email_usuario.value;
    var senhaUsuario = ipt_senha_usuario.value;

    var dadosUsuario = [nomeUsuario, emailUsuario, senhaUsuario];

    var jsonDados = JSON.stringify(dadosUsuario);
    localStorage.setItem('dadosUsuario', jsonDados);


    //mandando para a pagina do cadastro do usuário
    window.location.href = "cadastro-endereco.html";

}

function verificarDados() {
    //caso o usuário volte da tela 2, essa verificação devolve os dados que ele digitou
    if (typeof localStorage.getItem("dadosEmpresa") != 'undefined') {

        var jsonDadosEmpresa = localStorage.getItem('dadosEmpresa');
        dadosEmpresa = JSON.parse(jsonDadosEmpresa);

        ipt_nome_empresa.value = dadosEmpresa[0];
        ipt_razao_social.value = dadosEmpresa[1];
        ipt_cnpj.value = dadosEmpresa[2];
        ipt_telefone_empresa.value = dadosEmpresa[3];
    }

    if (typeof localStorage.getItem("dadosUsuario") != 'undefined') {

        var jsonDados = localStorage.getItem('dadosUsuario');
        dadosUsuario = JSON.parse(jsonDados);

        ipt_nome_usuario.value = dadosUsuario[0];
        ipt_email_usuario.value = dadosUsuario[1];
        ipt_senha_usuario.value = dadosUsuario[2];
    }
}
