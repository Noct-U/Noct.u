function entrar() {
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);
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

            resposta.json().then(json => {
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.idUsuario;

            if(json.nomeTipo == "ADMIN"){
                setTimeout(function () {
                    window.location = "./dashboard/dashboard.html";
                }, 1000); // apenas para exibir o loading

            }
            else{
                setTimeout(function () {
                    window.location = "./dashboard/dashboard-funcionario.html";
                }, 1000); // apenas para exibir o loading
            }
            // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
        
        
         });
         } else {        
            alert("Login Não encontrado");
        
         }
        }).catch(function (erro) {
            console.log(erro);
        })

    return false;
}