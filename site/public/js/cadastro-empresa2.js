

    //pegando dado da memória cache
    var jsonDados = localStorage.getItem('dadosCad1');
    var dadosCad1 = JSON.parse(jsonDados);

    console.log(dadosCad1);
    
    function cadastrar(){

        //Tabela Endereço
        var cep = ipt_cep.value;
        var uf = ipt_uf.value;
        var cidade = ipt_cidade.value;
        var bairro = ipt_bairro.value;
        var logradouro = ipt_logradouro.value;

        //Tabela local
        var num = ipt_num.value;
        var complemento = ipt_complemento.value;
        var andar = ipt_andar.value;
        var sala = ipt_sala.value;
        
        var dadosVazios = [];
        
        //adicionando os novos dados a um segundo vetor referente ao 2° pag cadastro
        var dadosCad2 = [logradouro,uf,cep,bairro,cidade,num,complemento,andar,sala];

        //verificando se existe dados vazios
        for(var i = 0; i < dadosCad1.length; i++){
            if(dadosCad1[i] == ""){
                //Pegando as informações vazias e jogando em um vetor para mostrar pro usuário(pode ignorar é apenas uma verificação)
                dadosVazios.push(dadosCad1[i]);
            }
        }

        //verificando se existe dados vazios
        for(var i = 0; i < dadosCad2.length; i++){
            if(dadosCad2[i] == ""){
                //Pegando as informações vazias e jogando em um vetor para mostrar pro usuário(pode ignorar é apenas uma verificação)
                dadosVazios.push(dadosCad2[i]);
            }
        }
        console.log(dadosVazios.length);
        //verificando se existe dado vazio, se existir dadosVazio[0] é pq existe algum dado não preenchido
        if(dadosVazios != 0){
            alert("Existe campos vazios no formulário");
        }
        else{

            // Enviando o valor da nova input
            fetch("/empresas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                nomeServer: dadosCad1[0],
                razaoSocialServer: dadosCad1[1],
                cnpjServer: dadosCad1[2],
                emailServer: dadosCad1[3],
                telefoneServer: dadosCad1[4],
                senhaServer: dadosCad1[5],


                //Dados da segunda pag de cadastro
                logradouroServer: dadosCad2[0],
                ufServer: dadosCad2[1],
                cepServer: dadosCad2[2],
                bairroServer: dadosCad2[3],
                cidadeServer: dadosCad2[4],
                
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
                            numServer: dadosCad2[5],
                            complementoServer: dadosCad2[6],
                            andarServer: dadosCad2[7],
                            salaServer: dadosCad2[8],
                            idUltimaEmpresaServer: idUltimaEmpresa,
                            idUltimoEnderecoServer: idUltimoEndereco
                        }),
                        })
                        .then(function (resposta) {
                        
                            setTimeout(() => {
                                window.location = "login.html";
                            }, "2000")
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
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    
            return false;

        }    

    }

    function voltar(){

        var cep = ipt_cep.value;
        var uf = ipt_uf.value;
        var cidade = ipt_cidade.value;
        var bairro = ipt_bairro.value;
        var logradouro = ipt_logradouro.value;
        var num = ipt_num.value;
        var complemento = ipt_complemento.value;
        var andar = ipt_andar.value;
        var sala = ipt_sala.value;

        var dadosCad2 = [logradouro,cep,cidade,uf,bairro,num,complemento,andar,sala];
        var jsonDados2 = JSON.stringify(dadosCad2);
        var jsonDados = JSON.stringify(dadosCad1);
        localStorage.setItem('dados1',jsonDados);
        localStorage.setItem('dados2',jsonDados2);
      
    
        window.location.href = "cadastro.html";
    }
        
        //caso o usuário volte da tela 2, essa verificação devolve os dados que ele digitou
    if(typeof localStorage.getItem("dados2") != 'undefined'){

        var jsonDados2 = localStorage.getItem('dados2');
        var dadosCad2 = JSON.parse(jsonDados2);
        console.log("vetor de dados" + dadosCad2)
        var logradouroID = document.getElementById('ipt_logradouro');
        var cepID = document.getElementById('ipt_cep');
        var cidadeID = document.getElementById('ipt_cidade');
        var ufID = document.getElementById('ipt_uf');
        var bairroID = document.getElementById('ipt_bairro');
        var complementoID = document.getElementById('ipt_complemento');
        var numID= document.getElementById('ipt_num');
        var andarID = document.getElementById('ipt_andar');
        var salaID = document.getElementById('ipt_sala');

        logradouroID.value = dadosCad2[0];
        cepID.value = dadosCad2[1];
        cidadeID.value = dadosCad2[2];
        ufID.value = dadosCad2[3];
        bairroID.value = dadosCad2[4];
        numID.value = dadosCad2[5];
        complementoID.value = dadosCad2[6];
        andarID.value = dadosCad2[7];
        salaID.value = dadosCad2[8];

    }