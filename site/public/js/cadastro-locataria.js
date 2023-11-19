
// exibirEmpresas();

function exibirEmpresas() {
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

function listaEmpresas(){

    fetch("/empresasLocadoras/consultarLocataria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            //Dados da primeira pag de cadastro

            idLocatariaServer: sessionStorage.ID_EMPRESA

        }),
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json[0].nomeEmpresaOutsorcing));

                
                for (var i = 0; i < json.length; i++) {

                    if(json[i].fkStatus != 2){
                        if(json[i].idMatriz == null){
                            fundo_modal.innerHTML +=`
                            <div class="caixa-modal" id="modal${json[i].idLocataria}" style="display: none;">
                                <div class="header-modal">
                                    <span id="nome_empresa">${sessionStorage.NOME_EMPRESA}</span>
                                    <span id="nome_locataria" class="subtitle-modal">Locataria: ${json[i].nomeLocataria}</span>
                                </div>

                                <div class="corpo-modal">
                                <div style="display:flex"  id="empresa${json[i].idLocataria}">
                                    <div class="alinhamento-horizontal">
                                        <div class="caixa-input">
                                            <label for="">Alterar Nome</label>
                                            <input class="ipt-hardware" type="text" value="${json[i].nomeLocataria}" "placeholder="Nome Empresa" id="ipt_nome_locataria${json[i].idLocataria}"> </input>
                                        </div>
                                        <div class="caixa-input">
                                            <label for="">Alterar CNPJ</label>
                                            <input class="ipt-hardware" type="text" "placeholder="CNPJ do Modelo" id="ipt_cnpj${json[i].idLocataria}" value="${json[i].cnpjLocataria}" > </input>
                                        </div>
                                    </div>
                                </div>
                                <div class="alinhamento-horizontal">
                                        <div class="caixa-input">
                                            <label for="">Adicionar Matriz</label>
                                            <select name="" id="listaEmpresa${json[i].idLocataria}">
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="rodape-modal">
                                    <button onclick="fecharModal(${json[i].idLocataria})" id="cancelar">Cancelar</button>
                                    <button id="salvar" onclick="atualizarLocataria(${json[i].idLocataria})">Salvar</button>
                                </div>

                            </div>
                            `; 
                            ipt_empresa.innerHTML += `
                            <div class="elemento">
                                <div class="linhaInfo">
                                    <div class="info"><span>Nome:⠀</span> <span>${json[i].nomeLocataria}</span></div>
                                    <div class="info"><span>CNPJ:⠀</span> <span>${json[i].cnpjLocataria}<span></span></span></div>
                                    <div class="info"><span>É uma Matriz⠀</span> <span></span></div>
                                </div>
                                <div class="linhaInfo">
                                    <div class="info"></div>
                                    <div class="info"></div>
                                    <div class="info btns"> <button class="btn cinza" onclick="abrirModal(${json[i].idLocataria},${json[i].idLocataria},null)">EDITAR</button> <button class="btn vermelho" onclick="excluir(${json[i].idLocataria})">EXCLUIR</button></div>
                                </div>
                            </div>
                            `;
                        }
                        else{




                            fundo_modal.innerHTML +=`
                            <div class="caixa-modal" id="modal${json[i].idLocataria}" style="display: none;">
                                <div class="header-modal">
                                    <span id="nome_empresa">${sessionStorage.NOME_EMPRESA}</span>
                                    <span id="nome_locataria" class="subtitle-modal">Locataria: ${json[i].nomeLocataria}</span>
                                </div>

                                <div class="corpo-modal">
                                <div style="display:flex"  id="empresa${json[i].idLocataria}">
                                    <div class="alinhamento-horizontal">
                                        <div class="caixa-input">
                                            <label for="">Alterar Nome</label>
                                            <input class="ipt-hardware" type="text" value="${json[i].nomeLocataria}" "placeholder="Nome Empresa" id="ipt_nome_locataria${json[i].idLocataria}"> </input>
                                        </div>
                                        <div class="caixa-input">
                                            <label for="">Alterar CNPJ</label>
                                            <input class="ipt-hardware" type="text" "placeholder="CNPJ do Modelo" id="ipt_cnpj${json[i].idLocataria}" value="${json[i].cnpjLocataria}" > </input>
                                        </div>
                                    </div>
                                </div>
                                <div class="alinhamento-horizontal">
                                        <div class="caixa-input">
                                            <label for="">Adicionar Matriz</label>
                                            <select name="" id="listaEmpresa${json[i].idLocataria}">
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="rodape-modal">
                                    <button onclick="fecharModal(${json[i].idLocataria})" id="cancelar">Cancelar</button>
                                    <button id="salvar" onclick="atualizarComputador(${json[i].idLocataria})">Salvar</button>
                                </div>

                            </div>
                            `; 
                            ipt_empresa.innerHTML += `
                            <div class="elemento">
                                <div class="linhaInfo">
                                    <div class="info"><span>Nome:⠀</span> <span>${json[i].nomeLocataria}</span></div>
                                    <div class="info"><span>CNPJ:⠀</span> <span>${json[i].cnpjLocataria}<span></span></span></div>
                                    <div class="info"><span>Matriz: ${json[i].nomeMatriz}⠀</span> <span></span></div>
                                </div>
                                <div class="linhaInfo">
                                    <div class="info"></div>
                                    <div class="info"></div>
                                    <div class="info btns"> <button class="btn cinza" onclick="abrirModal(${json[i].idLocataria},${json[i].idLocataria},null)">EDITAR</button> <button class="btn vermelho" onclick="excluir(${json[i].idLocataria})">EXCLUIR</button></div>
                                </div>
                            </div>`
                        }
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

function excluir(idEmpresaLocataria) {
    fetch("/empresasLocadoras/excluirLocataria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresaLocatariaServer: idEmpresaLocataria
        }),
    })
        .then(function (resposta) {
            // Excluído com sucesso
            console.log("Empresa excluída com sucesso!");
            // Recarregar a página após um certo intervalo (por exemplo, 1 segundo)
            setTimeout(function () {
                location.reload();
            }, 100);
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        return false;
}

 //método chamado na modal.js
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
                    if(json[i].idEmpresaLocataria != locataria){
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


function atualizarLocataria(idLocataria){
    var nomeLocataria = document.getElementById(`ipt_nome_locataria${idLocataria}`);
    nomeLocataria = nomeLocataria.value;

    var cnpjLocataria = document.getElementById(`ipt_cnpj${idLocataria}`);
    cnpjLocataria = cnpjLocataria.value;

    var matriz = document.getElementById(`listaEmpresa${idLocataria}`);
    matriz = matriz.value;

    fetch("/empresasLocadoras/atualizarLocataria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            //Dados da primeira pag de cadastro

            idLocatariaServer : idLocataria,
            nomeLocatariaServer : nomeLocataria,
            cnpjLocatariaServe : cnpjLocataria,
            matrizServer : matriz

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