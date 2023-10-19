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

    function publicar() {
        var idUsuario = sessionStorage.ID_USUARIO;
       
        var corpo = {
            nome: form_postagem.nome.value,
            email: form_postagem.email.value,
            senha: form_postagem.senha.value,
            tipoFunc: form_postagem.tipoFunc.value,
            empresa: form_postagem.empresa.value
        }

        fetch(`/avisos/publicar/${idUsuario}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                window.alert("Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!");
                window.location = "/dashboard/listameta.html";
                limparFormulario();
                // finalizarAguardar();
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;

    }

    function atualizarFeed() {
        //aguardar();
        var idUsuario = sessionStorage.ID_USUARIO;
        
        fetch(`/avisos/listar/${idUsuario}`).then(function (resposta) {

            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("feed_container");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Você ainda não possui funcionários cadastrados."
                    feed.appendChild(mensagem);
                    throw "Você ainda não possui funcionários cadastrados.";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];

                        // criando e manipulando elementos do HTML via JavaScript
                        var divPublicacao = document.createElement("div");
                        var spanID = document.createElement("span");
                        var spanTitulo = document.createElement("span");
                        var spanNome = document.createElement("span");
                        var divDescricao = document.createElement("div");
                        var divButtons = document.createElement("div");
                        var btnEditar = document.createElement("button");
                        var btnDeletar = document.createElement("button");

                        // spanTitulo.innerHTML = "Título: <b>" + publicacao.titulo + "</b>";
                        spanNome.innerHTML = "Leitor(a): <b>" + publicacao.nome + "</b>";
                        divDescricao.innerHTML = publicacao.descricao + "</b>";
                        btnDeletar.innerHTML = "Deletar";
                        divPublicacao.className = "publicacao";
                        spanTitulo.id = "inputNumero" + publicacao.idAviso;
                        spanNome.className = "publicacao-nome";
                        divDescricao.className = "publicacao-descricao";

                        divButtons.className = "div-buttons"

                        btnEditar.className = "publicacao-btn-editar"
                        btnEditar.id = "btnEditar" + publicacao.idAviso;
                        btnEditar.setAttribute("onclick", `editar(${publicacao.idAviso})`);

                        btnDeletar.className = "publicacao-btn-editar"
                        btnDeletar.id = "btnDeletar" + publicacao.idAviso;
                        btnDeletar.setAttribute("onclick", `deletar(${publicacao.idAviso})`);

                        divPublicacao.appendChild(spanID);
                        divPublicacao.appendChild(spanNome);
                        divPublicacao.appendChild(spanTitulo);
                        divPublicacao.appendChild(divDescricao);
                        divPublicacao.appendChild(divButtons);
                        divButtons.appendChild(btnDeletar);
                        feed.appendChild(divPublicacao);
                    }

                    // finalizarAguardar();
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
            // finalizarAguardar();
        });
    }


    