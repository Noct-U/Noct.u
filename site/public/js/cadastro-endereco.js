verificarDados();
// Função para fazer a requisição AJAX
function buscarCep() {
    var cep = ipt_cep_empresa.value;
    var apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    // URL da API do Via CEP
    fetch(apiUrl).then(response => response.json())
        .then(data => {
            if (!data.erro) {
                ipt_cidade_empresa.value = data.localidade;
                ipt_bairro_empresa.value = data.bairro;
                ipt_uf_empresa.value = data.uf;
                ipt_logradouro_empresa.value = data.logradouro;

                console.log("CEP: " + data.cep);
                console.log("Logradouro: " + data.logradouro);
                console.log("Bairro: " + data.bairro);
                console.log("Cidade: " + data.localidade);
                console.log("Estado: " + data.uf);
            } else {
                console.log("CEP não encontrado");
            }
        })
        .catch(error => {
            console.error("Erro na requisição: " + error);
        });
}


function voltarEndereco() {
    var cep = ipt_cep_empresa.value;
    var cidade = ipt_cidade_empresa.value;
    var bairro = ipt_bairro_empresa.value;
    var uf = ipt_uf_empresa.value;
    var logradouro = ipt_logradouro_empresa.value;
    var num = ipt_num_empresa.value;
    var andar = ipt_andar_empresa.value;
    var sala = ipt_sala_empresa.value;
    var complemento = ipt_comp_empresa.value;
    var dadosEndereco = [cep, cidade, bairro, uf, logradouro, num, andar, sala, complemento];
    console.log("dados endereco " + dadosEndereco)
    var jsonDadosEndereco = JSON.stringify(dadosEndereco);
    localStorage.setItem('dadosEndereco', jsonDadosEndereco);

    window.location.href = "cadastro-empresa.html";
}

function verificarDados() {

    //caso o usuário volte da tela 2, essa verificação devolve os dados que ele digitou
    if (typeof localStorage.getItem("dadosEndereco") != 'undefined') {

        var jsonDadosEndereco = localStorage.getItem('dadosEndereco');
        var dadosEndereco = JSON.parse(jsonDadosEndereco);

        ipt_cep_empresa.value = dadosEndereco[0];
        ipt_cidade_empresa.value = dadosEndereco[1];
        ipt_bairro_empresa.value = dadosEndereco[2];
        ipt_uf_empresa.value = dadosEndereco[3]
        ipt_logradouro_empresa.value = dadosEndereco[4];
        ipt_num_empresa.value = dadosEndereco[5];
        ipt_andar_empresa.value = dadosEndereco[6];
        ipt_sala_empresa.value = dadosEndereco[7];
        ipt_comp_empresa.value = dadosEndereco[8];
    }
}

function finalizarCadastro() {
    var jsonDadosUsuario = localStorage.getItem('dadosUsuario');
    dadosUsuario = JSON.parse(jsonDadosUsuario);
    var jsonDadosEmpresa = localStorage.getItem('dadosEmpresa');
    dadosEmpresa = JSON.parse(jsonDadosEmpresa);
    var cep = ipt_cep_empresa.value;
    var cidade = ipt_cidade_empresa.value;
    var bairro = ipt_bairro_empresa.value;
    var uf = ipt_uf_empresa.value;
    var logradouro = ipt_logradouro_empresa.value;
    var num = ipt_num_empresa.value;
    var andar = ipt_andar_empresa.value; // camisa de sdd
    var sala = ipt_sala_empresa.value; // camisa de sdd
    var complemento = ipt_comp_empresa.value;
    fetch("/empresas/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeEmpresaServer: dadosEmpresa[0],
            razaoEmpresaServer: dadosEmpresa[1],
            cnpjEmpresaServer: dadosEmpresa[2],
            telefoneEmpresaServer: dadosEmpresa[3],
            cepEnderecoServer: cep,
            cidadeEnderecoServer: cidade,
            bairroEnderecoServer: bairro,
            ufEnderecoServer: uf, 
            logEnderecoServer: logradouro
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
                                            console.log("Ultima Empresa: " + idUltimaEmpresa);
                                            console.log("Ultimo Endereço: " + idUltimoEndereco);
                                            fetch("/empresas/cadastrarLocalidade", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    // crie um atributo que recebe o valor recuperado aqui
                                                    // Agora vá para o arquivo routes/usuario.js
                                                    //Dados da primeira pag de cadastro
                                                    numServer: num,
                                                    andarServer: andar, // camisa de sdd
                                                    salaServer: sala, // camisa de sdd
                                                    complementoServer: complemento,
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
                                                            nomeServer: dadosUsuario[0],
                                                            emailServer: dadosUsuario[1],
                                                            senhaServer: dadosUsuario[2],
                                                            tipoUsuarioServer: 1,
                                                            locadoraServer: null,
                                                            alocacaoServer: idUltimaEmpresa
                                                        }),
                                                    })
                                                        .then(function (resposta) {
                                                            alert("Cadastrei tudo");
                                                            setTimeout(() => {
                                                                window.location = "../login.html";
                                                            }, "1000")
                                                        })
                                                        .catch(function (resposta) {
                                                            console.log(`#ERRO: ${resposta}`);
                                                        });
                                                })
                                                .catch(function (resposta) {
                                                    console.log(`#ERRO: ${resposta}`);
                                                });
                                        });
                                    }
                                })
                                .catch(function (resposta) {
                                    console.log(`#ERRO: ${resposta}`);
                                });
                        });
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}