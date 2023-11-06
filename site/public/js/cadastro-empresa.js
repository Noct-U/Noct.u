verificarDados();

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

    var nomeUsuario  = ipt_nome_usuario.value;
    var emailUsuario = ipt_email_usuario.value;
    var senhaUsuario = ipt_senha_usuario.value;

    var dadosUsuario = [nomeUsuario,emailUsuario,senhaUsuario];

    var jsonDados = JSON.stringify(dadosUsuario);
    localStorage.setItem('dadosUsuario',jsonDados);


    //mandando para a pagina do cadastro do usuário
    window.location.href = "cadastro-endereco.html";

}

  function verificarDados(){
    //caso o usuário volte da tela 2, essa verificação devolve os dados que ele digitou
    if(typeof localStorage.getItem("dadosEmpresa") != 'undefined'){
  
      var jsonDadosEmpresa = localStorage.getItem('dadosEmpresa');
      dadosEmpresa = JSON.parse(jsonDadosEmpresa);
      
      ipt_nome_empresa.value = dadosEmpresa[0];
      ipt_razao_social.value = dadosEmpresa[1];
      ipt_cnpj.value = dadosEmpresa[2];
      ipt_telefone.value = dadosEmpresa[3];
    }

    if(typeof localStorage.getItem("dadosUsuario") != 'undefined'){

      var jsonDados = localStorage.getItem('dadosUsuario');
      dadosUsuario = JSON.parse(jsonDados);
      
      ipt_nome_usuario.value = dadosUsuario[0];
      ipt_email_usuario.value = dadosUsuario[1];
      ipt_senha_usuario.value = dadosUsuario[2];
    }
  }

  function finalizarCadastro(){

    var jsonDadosUsuario = localStorage.getItem('dadosUsuario');
    dadosUsuario = JSON.parse(jsonDadosUsuario);

    var jsonDadosEmpresa = localStorage.getItem('dadosEmpresa');
    dadosEmpresa = JSON.parse(jsonDadosEmpresa);

    var cep = ipt_cep_empresa.value;
    var cidade = ipt_cidade_empresa.value;
    var bairro = ipt_bairro_empresa.value;
    var uf = ipt_uf_empresa.value;
    var logradouro = ipt_logradouro_empresa.value;
    var num = ipt_num_empresa.value;
    var andar = ipt_andar_empresa.value;
    var sala = ipt_sala_empresa.value;
    var complemento = ipt_comp_empresa.value;

    fetch("/empresas/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeEmpresaServer : dadosEmpresa[0],
            razaoEmpresaServer : dadosEmpresa[1],
            cnpjEmpresaServer : dadosEmpresa[2],
            telefoneEmpresaServer : dadosEmpresa[3],

            cepEnderecoServer : cep,
            cidadeEnderecoServer : cidade,
            bairroEnderecoServer : bairro,
            ufEnderecoServer : uf,
            logEnderecoServer : logradouro
        }),
    })
    .then(function (resposta) {
        fetch("/empresas/consultarUltimaEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
            })
            .then(function (resposta) {
                if (resposta.ok) {
                resposta.json().then(jsonResposta => {
                console.log(JSON.stringify(jsonResposta));

                var idUltimaEmpresa = jsonResposta[0].idEmpresa;
                fetch("/empresas/consultarUltimoEndereco", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
                })
                .then(function (resposta) {
                    if (resposta.ok) {
                    resposta.json().then(jsonResposta => {
                    console.log(JSON.stringify(jsonResposta));

                    var idUltimoEndereco = jsonResposta[0].idEndereco;

                    console.log("Ultima Empresa: "+idUltimaEmpresa);
                    console.log("Ultimo Endereço: "+idUltimoEndereco);
                    fetch("/empresas/cadastrarLocalidade", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // crie um atributo que recebe o valor recuperado aqui
                        // Agora vá para o arquivo routes/usuario.js
                        //Dados da primeira pag de cadastro
                        numServer: num,
                        andarServer: andar,
                        salaServer: sala,
                        complementoServer: complemento,
                        idUltimaEmpresaServer: idUltimaEmpresa,
                        idUltimoEnderecoServer: idUltimoEndereco
                    }),
                    })
                    .then(function (resposta) {
                        fetch("/usuarios/cadastrar", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                nomeServer : dadosUsuario[0],
                                emailServer : dadosUsuario[1],    
                                senhaServer : dadosUsuario[2],
                                tipoUsuarioServer : 1,
                                locadoraServer : null,
                                alocacaoServer : idUltimaEmpresa
                            }),
                        })
                        .then(function (resposta) {
                            
                            alert("Cadastrei tudo");
                            setTimeout(() => {
                                window.location = "../login.html";
                            }, "1000")

                        })
                        .catch(function (resposta) {
                            console.log(`#ERRO: ${resposta}`);
                        });

                        
                    })
                    .catch(function (resposta) {
                        console.log(`#ERRO: ${resposta}`);
                    });

                });

                }})
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });      

            });

            }})
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            }); 

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    
}
