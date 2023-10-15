function avancar(){
    //recuperando dados dos inputs
    var razaoSocial = ipt_razao_social.value;
    var cnpj = ipt_cnpj.value;
    var email = ipt_email.value;
    var telefone = ipt_telefone.value;
    var senha = ipt_senha.value;
    var nome = ipt_nome.value;

    //vetor de dados
    var dadosCad1 = [nome,razaoSocial,cnpj,email,telefone,senha];
    console.log(dadosCad1);

    //transformando em JSON e salvar em memória cache 
    var jsonDados = JSON.stringify(dadosCad1);
    console.log("JSON: " + jsonDados)

    localStorage.setItem('dadosCad1', jsonDados);

    //mandando para a pagina 2
    window.location.href = "cadastro2.html";

  }

  //caso o usuário volte da tela 2, essa verificação devolve os dados que ele digitou
  if(typeof localStorage.getItem("dados1") != 'undefined'){
    console.log("Estou aqui")
    var jsonDados = localStorage.getItem('dados1');
    dadosCad1 = JSON.parse(jsonDados);
    var nomeID = document.getElementById('ipt_nome');
    var razaoSocialID = document.getElementById('ipt_razao_social');
    var cnpjID = document.getElementById('ipt_cnpj');
    var emailID = document.getElementById('ipt_email');
    var telefoneID = document.getElementById('ipt_telefone');
    var senhaID = document.getElementById('ipt_senha');

    nomeID.value = dadosCad1[0];
    razaoSocialID.value = dadosCad1[1];
    cnpjID.value = dadosCad1[2];
    emailID.value = dadosCad1[3];
    telefoneID.value = dadosCad1[4];
    senhaID.value = dadosCad1[5];
  }