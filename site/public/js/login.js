function entrar() {
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/empresas/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_EMPRESA = json.email;
                sessionStorage.NOME_EMPRESA = json.razaoSocial;
                sessionStorage.ID_EMPRESA = json.idEmpresa;
                // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)


                setTimeout(function () {
                    window.location = "./dashboard/dashboard.html";
                }, 1000); // apenas para exibir o loading
            });
        } else {        

            fetch("/usuarios/autenticarFuncionario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailServer: emailVar,
                    senhaServer: senhaVar
                })
            }).then(function (resposta) {
                console.log("ESTOU NO THEN DO entrar()!")
        
                if (resposta.ok) {
                    console.log(resposta);
                    
        
                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
                        sessionStorage.EMAIL_EMPRESA = json.email;
                        sessionStorage.NOME_EMPRESA = json.nome;
                        sessionStorage.ID_EMPRESA = json.idUsuario;
                        // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
        
        
                        setTimeout(function () {
                            window.location = "./dashboard/dashboard-funcionario.html";
                        }, 1000); // apenas para exibir o loading
                    });
                } else {        
                    alert("Login Não encontrado");
        
                }
            }).catch(function (erro) {
                console.log(erro);
            })

        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}