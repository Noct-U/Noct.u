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
        fetch("/computadores/consultarComputadores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro
                idEmpresaServer : sessionStorage.ID_EMPRESA
            }),
        
        })
            .then(function (resposta) {
                if (resposta.ok){
                    resposta.json().then(json => {
                        console.log(json.computador);
                        
                        for(var i = 0; i <= json.length; i++){
                            div_lista.innerHTML +=
                            `
                            <div class="list-item" >
                                <div class="form-info">
                                    <div class="form-label">
                                        <label class="label-info">Número de série :</label> 
                                        <label class="info">${json[i].computador}</label>   
                                    </div>
                                    <div class="form-label">
                                        <label class="label-info">Modelo :</label>    
                                        <label class="info">${json[i].modelo}</label>    
                                    </div>
                                    <div class="form-label">
                                        <label class="label-info">Empresa :</label>    
                                        <label class="info">${json[i].locataria}</label>    
                                    </div>
                                </div>
                                <div class="form-footer">
                                <div class="form-alert">
                                    <div class="alerta"></div>
                                    <label> Estado crítico</label>
                                </div>
                                <div class="form-button">
                                    <a href="dashboard-funcionario.html">
                                        <button id="btn_acessar"> Acessar </button>
                                    </a>
                                    <button id="btn_excluir"> Excluir </button>
                                    <button id="btn_editar"> Editar </button>
                                </div>
                            </div>
                            </div>
                            `
                        }
                    })
                }
                
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
    