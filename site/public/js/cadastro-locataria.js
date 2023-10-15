console.log("ccccccccccccccc "+sessionStorage.ID_EMPRESA);
    exibirEmpresas();

    function exibirEmpresas(){
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

                    for (var i = 0; i <= json.length; i++) {
                        ipt_empresa.innerHTML += `<option value="${json[i].idEmpresaLocataria}">${json[i].nome}</option>`;
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

    function cadastrar() {
        console.log(sessionStorage.ID_EMPRESA);

        var nome = ipt_nome.value;
        var cnpj = ipt_cnpj.value;
        var matriz = ipt_empresa.value;
        console.log(matriz)
        fetch("/empresasLocadoras/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                //Dados da primeira pag de cadastro

                nomeServer: nome,
                cnpjServer: cnpj,
                fkMatrizServer: matriz,
                idEmpresaServer: sessionStorage.ID_EMPRESA
                
            }),
        })
            .then(function (resposta) {
                location.reload();
                // setTimeout(() => {
                //     window.location = "login.html";
                // }, "2000")
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }