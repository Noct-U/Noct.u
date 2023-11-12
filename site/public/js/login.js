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
            sessionStorage.TIPO_USUARIO = json.nomeTipo;
            sessionStorage.ID_USUARIO = json.idUsuario;
            sessionStorage.EMAIL_USUARIO = json.emailUsuario;
            sessionStorage.NOME_USUARIO = json.nomeUsuario;
            sessionStorage.ID_EMPRESA = json.idEmpresa;
            sessionStorage.NOME_EMPRESA = json.nomeEmpresa;
            sessionStorage.ID_LOCATARIA = json.idEmpresaLocataria;
            sessionStorage.NOME_LOCATARIA = json.nomeLocataria;

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
            sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
        
        
         });
         } else {        
            alert("Login Não encontrado");
        
         }
        }).catch(function (erro) {
            console.log(erro);
        })

    return false;
}