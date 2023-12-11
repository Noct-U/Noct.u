    exibirLocatarias();



    function finalizarCadastro(){
        var nomeUsuario  = ipt_nome_usuario.value;
        var emailUsuario = ipt_email_usuario.value;
        var senhaUsuario = ipt_senha_usuario.value;

        var jsonDadosEmpresa = localStorage.getItem('dadosEmpresa');
        dadosEmpresa = JSON.parse(jsonDadosEmpresa);

        var jsonDadosEndereco = localStorage.getItem('dadosEndereco');
        dadosEndereco = JSON.parse(jsonDadosEndereco);

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

                cepEnderecoServer : dadosEndereco[0],
                cidadeEnderecoServer : dadosEndereco[1],
                bairroEnderecoServer : dadosEndereco[2],
                ufEnderecoServer : dadosEndereco[3],
                logEnderecoServer : dadosEndereco[4]
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
                            numServer: dadosEndereco[5],
                            andarServer: dadosEndereco[6],
                            salaServer: dadosEndereco[7],
                            complementoServer: dadosEndereco[8],
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
                                    nomeServer : nomeUsuario,
                                    emailServer : emailUsuario,    
                                    senhaServer : senhaUsuario,
                                    tipoUsuarioServer : 1,
                                    locadoraServer : null,
                                    alocacaoServer : idUltimaEmpresa
                                }),
                            })
                            .then(function (resposta) {
                                
                                alert("Cadastrei tudo papaizinho");
                                setTimeout(() => {
                                    window.location = "../login.html";
                                }, "2000")

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



    // daqui pra baixo é da poli

    function limparFormulario() {
        document.getElementById("form_postagem").reset();
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
  
        b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

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
                    window.location = "/dashboard/cadastro-funcionario.html";
                    limparFormulario();
                    finalizarAguardar();
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                finalizarAguardar();
            });
    
            return false;
    
        }
    
        function editar(idAviso) {
            sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;
            console.log("cliquei em editar - " + idAviso);
            window.alert("Você será redirecionado à página de edição do aviso de id número: " + idAviso);
            window.location = "/dashboard/cadastro-funcionario.html"
    
        }
    
        function deletar(idAviso) {
            console.log("Criar função de apagar post escolhido - ID" + idAviso);
            fetch(`/avisos/deletar/${idAviso}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
    
                if (resposta.ok) {
                    window.alert("Post deletado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
                    window.location = "/dashboard/cadastro-funcionario.html"
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        }
    
        function atualizarFeed() {
            //aguardar();
            fetch("/avisos/listar").then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        var feed = document.getElementById("feed_container");
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Nenhum resultado encontrado."
                        feed.appendChild(mensagem);
                        throw "Nenhum resultado encontrado!!";
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
                            var divNome = document.createElement("div");
                            var divEmail = document.createElement("div");
                            var divSenha = document.createElement("div");
                            var divTipoFunc = document.createElement("div");
                            var divEmpresa = document.createElement("div");
                            var divButtons = document.createElement("div");
                            var btnEditar = document.createElement("button");
                            var btnDeletar = document.createElement("button");
    
    
                            spanID.innerHTML = "ID: <b>" + publicacao.idAviso + "</b>";
                            spanTitulo.innerHTML = "Nome: <b>" + publicacao.titulo + "</b>";
                            spanNome.innerHTML = "Autor: <b>" + publicacao.nome + "</b>";
                            divNome.innerHTML = "Nome: <b>" + publicacao.nome;
                            divEmail.innerHTML = "Email: <b>" + publicacao.email ;
                            divSenha.innerHTML = "Senha: <b>" + publicacao.senha ;
                            divTipoFunc.innerHTML = "Tipo o Funcionário: <b>" + publicacao.tipoFunc ;
                            divEmpresa.innerHTML = "Empresa: <b>" + publicacao.empresa ;
                            btnEditar.innerHTML = "Editar";
                            btnDeletar.innerHTML = "Deletar";
    
                            divPublicacao.className = "publicacao";
                            spanTitulo.id = "inputNumero" + publicacao.idAviso;
                            spanNome.className = "publicacao-nome";
                            spanTitulo.className = "publicacao-titulo";
                            //divDescricao.className = "publicacao-descricao";
                            divNome.className = "publicacao-nome" ;
                            divEmail.className = "publicacao-email" ;
                            divSenha.className = "publicacao-senha" ;
                            divTipoFunc.className = "publicacao-tipoFunc" ;
                            divEmpresa.className = "publicacao-empresa" ;
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
                            divButtons.appendChild(btnEditar);
                            divButtons.appendChild(btnDeletar);
                            feed.appendChild(divPublicacao);
                        }
    
                        finalizarAguardar();
                    });
                } else {
                    throw ('Houve um erro na API!');
                }
            }).catch(function (resposta) {
                console.error(resposta);
                finalizarAguardar();
            });
        }
    
        function testar() {
            aguardar();
    
            var formulario = new URLSearchParams(new FormData(document.getElementById("form_postagem")));
    
            var divResultado = document.getElementById("div_feed");
    
            divResultado.appendChild(document.createTextNode(formulario.get("descricao")));
            divResultado.innerHTML = formulario.get("descricao");
    
            finalizarAguardar();
    
            return false;
        }


       function listarFuncionario(){

        var locataria = ipt_empresa.value;
        fetch("/usuarios/consultarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idLocatariaServer: locataria,
                idLocadoraServer: sessionStorage.ID_EMPRESA

            }),
        }).then(function (resposta) {
                if(resposta.ok){
                    resposta.json().then(json => {
                            console.log(json);
                            div_lista.innerHTML = "";
                            for(var i = 0; i <= json.length; i++ ){

                                if(json[i].status != 2){

                                        div_lista.innerHTML +=
                                        `
                                        <div class="elemento">
                                            <div class="linhaInfo">
                                                <div class="info"><span>Nome:⠀</span> <span>${json[i].nomeUsuario}</span></div>
                                                <div class="info"></div>
                                                <div class="info"></div>
                                            </div>
                                            <div class="linhaInfo">
                                                <div class="info"><span>E-mail:⠀</span> <span>${json[i].emailUsuario}</span></div>
                                                <div class="info"></div>
                                                <div class="info btns"><button class="btn cinza" onclick="abrirModalComportamento2( ${json[i].idUsuario},${json[i].fkEmpresaLocadora},null)">EDITAR</button> <button class="btn vermelho" onclick="excluir(${json[i].idUsuario})">EXCLUIR</button></div>
                                            </div>
                                        </div>
                                            `;
        
                                        fundo_modal.innerHTML +=`
                                            <div class="caixa-modal modal-usuario" id="modal${json[i].idUsuario}" style="display: none;">
                                                <div class="header-modal">
                                                    <span id="nome_empresa">${json[i].locataria}</span>
                                                    <span id="nome_computador" class="subtitle-modal">Nome: ${json[i].nomeUsuario}</span>
                                                </div>
        
                                                <div class="corpo-modal">
                                                <div class="alinhamento-horizontal">
                                                        <div class="caixa-input">
                                                            <label for="">Alterar Nome</label>
                                                            <input class="ipt-modal-usuario" type="text" value="${json[i].nomeUsuario}" "placeholder="Nome..." id="ipt_nome_usuario${json[i].idUsuario}"> </input>
                                                        </div>
                                                        <div class="caixa-input">
                                                            <label for="">Empresa</label>
                                                            <select class="ipt-modal-usuario" name="" id="listaEmpresa${json[i].idUsuario}">
                                                            </select>
                                                        </div>
                                                </div>
                                                <div class="alinhamento-horizontal">
                                                        <div class="caixa-input">
                                                            <label for="">Alterar Email</label>
                                                            <input class="ipt-modal-usuario" type="text" value="${json[i].emailUsuario}" "placeholder="Email..." id="ipt_email_usuario${json[i].idUsuario}"> </input>
                                                        </div>
                                                        <div class="caixa-input">
                                                            <label for="">Alterar Senha</label>
                                                            <input class="ipt-modal-usuario" type="text" value="${json[i].senhaUsuario}" "placeholder="Senha..." id="ipt_senha_usuario${json[i].idUsuario}"> </input>
                                                        </div>
                                                </div>
                                                <div class="alinhamento-horizontal">
                                                        <div class="caixa-input">
                                                            <label for="">Alterar Tipo do Usuário</label>
                                                            <select id="ipt_tipo_usuario${json[i].idUsuario}">
                                                                <option value="1">ADMIN</option>
                                                                <option value="2">COMUM</option>
                                                            </select>
                                                        </div>
                                                        
                                                </div>
                                                
        
                    
                                                </div>
        
                                                <div class="rodape-modal">
                                                    <button onclick="fecharModal(${json[i].idUsuario})" id="cancelar">Cancelar</button>
                                                    <button id="salvar" onclick="atualizarUsuario(${json[i].idUsuario})">Salvar</button>
                                                </div>
        
                                            </div>
                                    `; 
                                }
                            }


                        
                        })
                }   
                
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
       }

       function excluir(idUsuario){
            fetch("/usuarios/excluirUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/usuario.js
                    //Dados da primeira pag de cadastro
                    idUsuarioServer : idUsuario
                }),
            
            })
            .then(function () {
                location.reload();
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
       }

       function atualizarUsuario(idUsuario){
        var nome = document.getElementById(`ipt_nome_usuario${idUsuario}`);
        nome = nome.value;

        var locataria = document.getElementById(`listaEmpresa${idUsuario}`);
        locataria = locataria.value;
        
        var email = document.getElementById(`ipt_email_usuario${idUsuario}`);
        email = email.value;

        var senha = document.getElementById(`ipt_senha_usuario${idUsuario}`);
        senha = senha.value;

        var tipoUsuario = document.getElementById(`ipt_tipo_usuario${idUsuario}`);
        tipoUsuario = tipoUsuario.value;

        fetch("/usuarios/atualizarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idUsuarioServer : idUsuario,
                nomeServer : nome,
                locatariaServer : locataria,
                emailServer : email,
                senhaServer : senha,
                tipoServer : tipoUsuario
            }),
        
        })
        .then(function () {
            location.reload();
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
       }