function avancar(){
    //recuperando dados dos inputs
    var nomeEmpresa = ipt_nome_empresa.value;
    var razaoSocial = ipt_razao_social.value;
    var cnpj = ipt_cnpj.value;
    var telefone = ipt_telefone.value;
    //vetor de dados
    var dadosEmpresa = [nomeEmpresa,razaoSocial,cnpj,telefone];
    console.log(dadosEmpresa);

    //transformando em JSON e salvar em memória cache 
    var jsonDados = JSON.stringify(dadosEmpresa);
    console.log("JSON: " + jsonDados)

    localStorage.setItem('dadosEmpresa', jsonDados);

    //mandando para a pagina do cadastro do usuário
    window.location.href = "cadastro-usuario.html";

  }

  //caso o usuário volte da tela 2, essa verificação devolve os dados que ele digitou
  if(typeof localStorage.getItem("dadosEmpresa") != 'undefined'){

    var jsonDados = localStorage.getItem('dadosEmpresa');
    dadosEmpresa = JSON.parse(jsonDados);
    
    ipt_nome_empresa.value = dadosEmpresa[0];
    ipt_razao_social.value = dadosEmpresa[1];
    ipt_cnpj.value = dadosEmpresa[2];
    ipt_telefone.value = dadosEmpresa[3];
  }