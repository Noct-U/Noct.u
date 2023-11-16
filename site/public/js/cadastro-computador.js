    listarComputadores()
    nomeEmpresaID.innerHTML = sessionStorage.NOME_EMPRESA


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
                            
                            if(json[i].idStatusUsuario == 1){

                            fundo_modal.innerHTML +=`
                            <div class="caixa-modal" id="modal${json[i].computador}" style="display: none;">
                                <div class="header-modal">
                                    <span id="nome_empresa">Simpress</span>
                                </div>

                                <div class="corpo-modal">
                                    <div class="alinhamento-horizontal">
                                        <div class="caixa-input">
                                            <label for="">Modelo</label>
                                            <select name="" id="lista${json[i].computador}">
                                                
                                            </select>
                                        </div>
                                        <div class="caixa-input">
                                            <label for="">Empresa</label>
                                            <select name="" id="listaEmpresa${json[i].computador}">
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="rodape-modal">
                                    <button onclick="fecharModal(${json[i].computador
                                    })" id="cancelar">Cancelar</button>
                                    <button id="salvar">Salvar</button>
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
                                    <div class="info btns"><button class="btn azul" onclick="acessar(${json[i].computador})">ACESSAR</button> <button class="btn cinza" onclick="abrirModal(${json[i].computador},${json[i].idEmpresaLocataria})">EDITAR</button> <button class="btn vermelho" onclick='excluir(${json[i].computador})'>EXCLUIR</button></div>
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
    
    function exibirEmpresasModal(num,locataria) {
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
    

    function excluir(idComputador){
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

    function acessar(idComputador){
        sessionStorage.ID_COMPUTADOR = idComputador;
        window.location.href = "dashboard-funcionario.html";
    }