    listarComputadores()
    let proximaAtualizacao;
    nomeEmpresaID.innerHTML = sessionStorage.NOME_EMPRESA

    function verificarUsuario(){
        var bloquearComum = document.querySelectorAll(".btn-admin")
        var bloquearSaida = document.querySelector(".btn-comum")
        if(sessionStorage.TIPO_USUARIO != "ADMIN"){
            for(var i = 0; i < bloquearComum.length; i++){
                bloquearComum[i].style.display = "none";
                bloquearSaida.style.display = "flex";
            }
        }
        else{
            bloquearSaida.style.display = "none";
        }
    }

    function cadastrar() {
        var numSerie = ipt_numeroSerie.value;
        var modelo = ipt_modelo.value;

        if(modelo == ""){
            modelo = iptselecionario.value;
        }
        console.log(numSerie);
        console.log(modelo);
        fetch("/computadores/cadastrarModelo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                numSerieServer:numSerie,
                modeloServer:modelo,
                fkEmpresaServer:sessionStorage.ID_EMPRESA
            }),
        })
        .then(function (resposta) {
                fetch("/computadores/consultarUltimoModelo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }})
                .then(function (ultimoModelo) {
                    if (ultimoModelo.ok){
                        ultimoModelo.json().then(json => {
                            console.log(json);

                            console.log(JSON.stringify(json));


                            fetch("/computadores/cadastrar", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                // crie um atributo que recebe o valor recuperado aqui
                                // Agora vá para o arquivo routes/usuario.js
                                //Dados da primeira pag de cadastro
                                numSerieServer:numSerie,
                                fkEmpresaServer: sessionStorage.ID_EMPRESA,
                                fkModeloServer: json[0].idModeloComputador
                            }),
                        
                        })
                            .then(function (resposta) {
                                alert("CADASTRADO");
                                
                            })
                            .catch(function (resposta) {
                                console.log(`#ERRO: ${resposta}`);
                            });
                            
                        })
                    }

                    
                })
                .catch(function (ultimoModelo) {
                    console.log(`#ERRO: ${ultimoModelo}`);
                });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }


    function listarComputadores(){
        var idLocataria = ipt_empresa.value;
        fetch("/computadores/consultarComputadores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idEmpresaServer : sessionStorage.ID_EMPRESA,
                idLocatariaServer : idLocataria
            }),
        
        })
            .then(function (resposta) {
                if (resposta.ok){
                    resposta.json().then(json => {
                        div_lista.innerHTML = "";
                        console.log(json);
                        
                        for(var i = 0; i <= json.length; i++){
                            
                            if(json[i].idStatusComputador == 1){

                            fundo_modal.innerHTML +=`
                            <div class="caixa-modal" id="modal${json[i].idComputador}" style="display: none;">
                                <div class="header-modal">
                                    <span id="nome_empresa">${json[i].locataria}</span>
                                    <span id="nome_computador" class="subtitle-modal">Computador: ${json[i].computador}</span>
                                </div>

                                <div class="corpo-modal">
                                <div style="display:flex"  id="escolhaModelo${json[i].idComputador}">
                                    <div class="alinhamento-horizontal">
                                        <div class="caixa-input">
                                            <label for="">Modelo</label>
                                            <select name=""  id="listaModelos${json[i].idComputador}">
                                            <!-- opções do select -->
                                            </select>
                                        </div>
                                        <div class="caixa-input">
                                            <label for="">Empresa</label>
                                            <select name="" id="listaEmpresa${json[i].idComputador}">
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                    <div class="cadastro-novoModelo"  style="display:none" id="cadastroModelo${json[i].idComputador}">
                                        <div class="alinhamento-horizontal">
                                            <div class="caixa-input">
                                                <label for="">Cadastrar novo Modelo</label>
                                                <input class="ipt-hardware" type="text" "placeholder="Nome do Modelo" id="ipt_modelo_nome${json[i].idComputador}"> </input>
                                            </div>
                                           
                                        </div>
                                        <div class="scroll-cadastro" id="divHardwares${json[i].idComputador}"> 
                                            
                                            
                                            
                                        </div>
                                    </div>
                                </div>

                                <div class="rodape-modal">
                                    <button id="btnModelo${json[i].idComputador}" onclick="abrirInputsCadastro(${json[i].idComputador},consultarHardwares(${json[i].idComputador}))" id="novoModelo">Novo Modelo</button>
                                    <button onclick="fecharModal(${json[i].idComputador}),fecharInputs(${json[i].idComputador})" id="cancelar">Cancelar</button>
                                    <button id="salvar" onclick="atualizarComputador(${json[i].idComputador})">Salvar</button>
                                </div>

                            </div>
                            `; 
                            div_lista.innerHTML +=

                           
                            `
                                <div class="elemento">
                                <div class="linhaInfo">
                                    <div class="info"><span>Número de série:⠀</span> <span>${json[i].computador}</span></div>
                                    <div class="info"><span>Modelo:⠀</span> <span>${json[i].modelo}<span></span></span></div>
                                    <div class="info"><span>Empresa:⠀</span> <span>${json[i].locataria}</span></div>
                                </div>
                                <div class="linhaInfo">
                                    <div class="info"><span>Estado:⠀</span> <div class="juntinhos"><span> Crítico⠀</span><div class="alerta"></div></div></div>
                                    <div class="info"></div>
                                    <div class="info btns">
                                    <button class="btn azul" onclick="acessar(${json[i].idComputador},'${json[i].modelo}','${json[i].computador}','${json[i].locataria}')">ACESSAR</button> <button class="btn cinza btn-admin" onclick="abrirModalComportamento2(${json[i].idComputador},${json[i].idEmpresaLocataria},${json[i].idModelo})">EDITAR</button> <button class="btn vermelho btn-admin" onclick='excluirComputador(${json[i].idComputador})'>EXCLUIR</button></div>
                                    </div>
                                </div>
                                
                            `
                            }
                        }
                    })
                    
                }
                
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
    

    //método chamado na modal.js
    function exibirEmpresasModalEmp2(num,locataria) {
        var lista = document.getElementById(`listaEmpresa${num}`);
        fetch("/empresasLocadoras/exibirEmpresas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
    
                idEmpresaServer: sessionStorage.ID_EMPRESA
    
            }),
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                console.log(resposta);
                
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json[0].nomeEmpresaOutsorcing));
                    lista.innerHTML = "";
                    
                    for (var i = 0; i <= json.length; i++) {
                        if(json[i].idEmpresaLocataria == locataria){
                            lista.innerHTML += `<option selected value="${json[i].idEmpresaLocataria}">${json[i].nome}</option>`;
                        }
                        else{
                            lista.innerHTML += `<option value="${json[i].idEmpresaLocataria}">${json[i].nome}</option>`;

                        }
                    }
    
    
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
    
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }
    

    function excluirComputador(idComputador){
        fetch("/computadores/excluirComputador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idComputadorServer : idComputador
            }),
        
        })
        .then(function () {
            location.reload();
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }

    function acessar(idComputador,modelo,nomeComputador,nomeEmpresa){
        sessionStorage.ID_COMPUTADOR = idComputador;
        sessionStorage.NOME_EMPRESA_LOCATARIA = nomeEmpresa;
        sessionStorage.NOME_COMPUTADOR = nomeComputador;
        sessionStorage.MODELO_COMPUTADOR = modelo;
        window.location.href = "dashboard-funcionario.html";
    }


    //método chamado na modal.js
    function exibirModelosModal(num,modelo) {
        var lista = document.getElementById(`listaModelos${num}`);
        fetch("/computadores/consultarModelos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                console.log(resposta);
    
                resposta.json().then(json => {
                    lista.innerHTML = "";
                    
                    for (var i = 0; i <= json.length; i++) {
                        if(json[i].idModeloComputador == modelo){
                            lista.innerHTML += `<option selected value="${json[i].idModeloComputador}">${json[i].nome}</option>`;
                        }
                        else{
                            lista.innerHTML += `<option value="${json[i].idModeloComputador}">${json[i].nome}</option>`;

                        }
                    }
    
    
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
    
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }



   
    function consultarHardwares(idComputador) {
        var divHardwares = document.getElementById(`divHardwares${idComputador}`);
        var vetorIdTipoHardware = []
        fetch("/computadores/consultarTipoHardwares", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                resposta.json().then(json => {
                    divHardwares.innerHTML = "";
                    console.log(json);
                    for (var i = 0; i < json.length; i++) {
                        var simbolo = "";
                        if(json[i].idTipoHardware != 4 ){
                            simbolo = "<label>%</label>"
                        }
                        divHardwares.innerHTML +=
                        `
                            <div class="alinhamento-horizontal alinhamento-cadastro">
                                <div class="caixa-input caixa-hardware">
                                    <label for="">${json[i].nome}</label>  
                                    <input style="display: none" class="dadosInputsCadastroModelo${idComputador}" value="${json[i].idTipoHardware}" id="ipt_TipoHardware${json[i].idTipoHardware}${idComputador}"></input>
                                    
                                </div>
                                <div class="caixa-input">
                                    <label for="">Parâmetros</label>
                                    <div class="parametros">
                                        <input type="Number" placeholder="min" class="ipt-parametros dadosInputsCadastroModelo${idComputador}" id="ipt_min${json[i].idTipoHardware}${idComputador} "> </input>
                                        <input type="Number" placeholder="max" class="ipt-parametros dadosInputsCadastroModelo${idComputador}" id="ipt_max${json[i].idTipoHardware}${idComputador}"> </input>
                                        ${simbolo}
                                        <input placeholder="Gigabytes..." style="display:none" class="dadosInputsCadastroModelo${idComputador} nomeUnidadeMedida"  id="iptNomeUnidade${json[i].idTipoHardware}${idComputador}"></input>
                                        <select style="display:none" class="unidade-medida dadosInputsCadastroModelo${idComputador}" id="uniddeMedida${json[i].idTipoHardware}${idComputador}">
                                        
                                            
                                        </select>  
                                    </div>
                                </div>
                            </div>
                        `;
                        vetorIdTipoHardware.push(`uniddeMedida${json[i].idTipoHardware}${idComputador}`);
                        
                    }

                    consultarUnidadeMedida(vetorIdTipoHardware);
    
    
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
    
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })


        
        return false;
    }
    

    function consultarUnidadeMedida(tipoHardware) {
        
        
        
        fetch("/computadores/consultarUnidadeMedida", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
    
    
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json);
                  for(var j = 0; j < tipoHardware.length; j++ ){

                      var unidadeMedidaLista = document.getElementById(tipoHardware[j]);
                      for (var i = 0; i < json.length; i++) {
                          unidadeMedidaLista.innerHTML +=
                          `
                              <option value="${json[i].idUnidadeMedida}">${json[i].simbolo}</option>
                          `;
                      }
                  }
    
    
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
    
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        
        
        return false;
    }
        
        function exibirModelosModal(num,modelo) {
        var lista = document.getElementById(`listaModelos${num}`);
        fetch("/computadores/consultarModelos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                console.log(resposta);
    
                resposta.json().then(json => {
                    lista.innerHTML = "";
                    
                    for (var i = 0; i <= json.length; i++) {
                        if(json[i].idModeloComputador == modelo){
                            lista.innerHTML += `<option selected value="${json[i].idModeloComputador}">${json[i].nome}</option>`;
                        }
                        else{
                            lista.innerHTML += `<option value="${json[i].idModeloComputador}">${json[i].nome}</option>`;

                        }
                    }
    
    
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
    
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }
    
    function atualizarComputador(idComputador){
        var alteracao = document.getElementById(`escolhaModelo${idComputador}`);
        console.log(`escolhaModelo${idComputador}`)
        if(alteracao && alteracao.style.display == "flex"){
            var modelo = document.getElementById(`listaModelos${idComputador}`);
            idModelo = modelo.value;

            var empresa = document.getElementById(`listaEmpresa${idComputador}`);
            idEmpresaLocataria = empresa.value;


            fetch("/computadores/atualizarComputador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    modeloServer : idModelo,
                    locatariaServer : idEmpresaLocataria,
                    idComputadorServer : idComputador
                })
            }).then(function () {
                location.reload();
                                
            })
            .catch(function (ultimoModelo) {
                console.log(`#ERRO: ${ultimoModelo}`);
            });
        }
        else{
            var modelo = document.getElementById(`ipt_modelo_nome${idComputador}`);
            modelo = modelo.value;


            var vetorDados = document.querySelectorAll(`.dadosInputsCadastroModelo${idComputador}`);
            var tipoHardwares = [];
            var parametrosMin = [];
            var parametrosMax = [];
            var nomesUnidadesMedidas = [];
            var unidadesDeMedida = [];
            
            for (var i = 0; i < vetorDados.length; i += 5) {
                // como sempre vai ser 20 dados recebidos e 5 para cada hardware é necessário uma verificação
                //para os dados ir no vetor certo, os dados sempres seguem a ordem abaixo
                /*
                1 - tipoHardware
                2 - min
                3 - max
                4 - nome da unidade de medida
                5 - unidade de medida 
                como eles vem tudo misturado, a verificação serve para identificar para qual vetor vai o dado
                */
                tipoHardwares.push(vetorDados[i].value);
                parametrosMin.push(vetorDados[i + 1].value);
                parametrosMax.push(vetorDados[i + 2].value);
                nomesUnidadesMedidas.push(vetorDados[i + 3].value);
                unidadesDeMedida.push(vetorDados[i + 4].value);
            }

            console.log("Tipo Hardwares:", tipoHardwares);
            console.log("Parâmetros Mínimos:", parametrosMin);
            console.log("Parâmetros Máximos:", parametrosMax);
            console.log("nome da unidade:", nomesUnidadesMedidas);
            console.log("Unidades de Medida:", unidadesDeMedida);

            // fetch("/computadores/cadastrarParametro", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         //parametros minimos
           
            //     })
            // }).then(function () {
            //     location.reload();
                                
            // })
            // .catch(function (ultimoModelo) {
            //     console.log(`#ERRO: ${ultimoModelo}`);
            // });
            fetch("/computadores/cadastrarModeloEmGeral", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    modeloServer : modelo,

                    //parametros
                    tipoHardwareServer1 : tipoHardwares[0],parametroMinServer1 : parametrosMin[0],parametroMaxServer1 : parametrosMax[0],nomesUnidadesMedidasServer1 : nomesUnidadesMedidas[0],unidadeMedidaServer1:unidadesDeMedida[0],
                    tipoHardwareServer2 : tipoHardwares[1],parametroMinServer2 : parametrosMin[1],parametroMaxServer2 : parametrosMax[1],nomesUnidadesMedidasServer2 : nomesUnidadesMedidas[1],unidadeMedidaServer2:unidadesDeMedida[1],
                    tipoHardwareServer3 : tipoHardwares[2],parametroMinServer3 : parametrosMin[2],parametroMaxServer3 : parametrosMax[2],nomesUnidadesMedidasServer3 : nomesUnidadesMedidas[2],unidadeMedidaServer3:unidadesDeMedida[2],
                    tipoHardwareServer4 : tipoHardwares[3],parametroMinServer4 : parametrosMin[3],parametroMaxServer4 : parametrosMax[3],nomesUnidadesMedidasServer4 : nomesUnidadesMedidas[3],unidadeMedidaServer4:unidadesDeMedida[3]
 
                })
            }).then(function () {
                location.reload();
                                
            })
            .catch(function (ultimoModelo) {
                console.log(`#ERRO: ${ultimoModelo}`);
            });
            
        }
        

        return false;
    }

    fn