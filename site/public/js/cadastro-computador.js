console.log(sessionStorage.ID_EMPRESA);

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



    