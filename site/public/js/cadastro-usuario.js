exibirLocatarias();
    function cadastrar(){
        var nome = iptNome.value;
        var email = iptEmail.value;
        var senha = iptSenha.value;
        var empresaLocataria = iptEmpresas.value;
        var tipoUsuario = iptFuncionario.value;

        //cadastrando o tipo de funcionario
        fetch("/usuarios/cadastrarTipo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                tipoUsuarioServer: tipoUsuario
            }),
            }).then(function (resposta) {
                   
                fetch("/usuarios/exibirUltimoTipo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }}).then(function (resposta) {
                    
                    if(resposta.ok){
                        resposta.json().then(json => {

                        
                        var idTipo = json[0].idTipoUsuario;

                        fetch("/usuarios/cadastrarUsuario", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }
                        ,
                        body: JSON.stringify({
                            // crie um atributo que recebe o valor recuperado aqui
                            // Agora vá para o arquivo routes/usuario.js
                            //Dados da primeira pag de cadastro

                            nomeServer: nome,
                            emailServer: email,
                            senhaServer: senha,
                            tipoUsuarioServer: idTipo,
                            empresaServer: empresaLocataria

                        }),
                    
                        }).then(function (resposta) {
                            alert("Cadastrado");
                            

                        })
                        .catch(function (resposta) {
                            console.log(`#ERRO: ${resposta}`);
                        });

                    })
    
                }   
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }


    function exibirLocatarias(){
        fetch("/usuarios/exibirLocatarias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idEmpresaServer: sessionStorage.ID_EMPRESA
            }),
        }).then(function (resposta) {
                if(resposta.ok){
                    resposta.json().then(json => {
                            console.log(json);

                            for(var i = 0; i <= json.length; i++ ){
                                iptEmpresas.innerHTML += `<option value="${json[i].idEmpresaLocataria}">${json[i].nome}</option>`;
                            }


                        
                        })
                }   
                
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }



    