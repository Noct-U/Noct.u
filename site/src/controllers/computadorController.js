var computadorModel = require("../models/computadorModel");
// var aquarioModel = require("../models/aquarioModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var numSerie = req.body.numSerieServer;
    var fkModelo = req.body.fkModeloServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    computadorModel.cadastrar(numSerie,fkEmpresa,fkModelo)
    // empresaModel.cadastrarLocal(numero,complemento)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function cadastrarModelo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var modelo = req.body.modeloServer;
    computadorModel.cadastrarModelo(modelo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function consultarUltimoModelo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    computadorModel.consultarUltimoModelo()
        .then(
            function (ultimoModelo) {
                res.json(ultimoModelo);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultarComputadores(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var idEmpresa = req.body.idEmpresaServer;
    var idLocataria = req.body.idLocatariaServer;
    computadorModel.consultarComputadores(idEmpresa,idLocataria)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function excluirComputador(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var idComputador = req.body.idComputadorServer;
    computadorModel.excluirComputador(idComputador)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultarDadosGrafico(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var idHardware = req.body.idHardwareServer;
    var idComputador = req.body.idComputadorServer;
    computadorModel.consultarDadosGrafico(idComputador,idHardware)
        .then(
            function (ultimaCaptura) {
                res.json(ultimaCaptura);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultarDadosGraficoCpu(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var idHardware = req.body.idHardwareServer;
    var idComputador = req.body.idComputadorServer;
    computadorModel.consultarDadosGraficoCpu(idComputador,idHardware)
        .then(
            function (ultimaCaptura) {
                res.json(ultimaCaptura);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultarModelos(req, res) {
    computadorModel.consultarModelos()
        .then(
            function (resposta) {
                res.json(resposta);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function consultarTipoHardwares(req, res) {
    computadorModel.consultarTipoHardwares()
        .then(
            function (resposta) {
                res.json(resposta);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultarUnidadeMedida(req, res) {
    computadorModel.consultarUnidadeMedida()
        .then(
            function (resposta) {
                res.json(resposta);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function atualizarComputador(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var modelo = req.body.modeloServer;
    var locataria = req.body.locatariaServer;
    var idComputador = req.body.idComputadorServer;

    computadorModel.atualizarComputador(modelo,locataria,idComputador)
        .then(
            function (ultimaCaptura) {
                res.json(ultimaCaptura);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}




function cadastrarModeloEmGeral(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    //parametros padrao
    modelo = req.body.modeloServer;

    tipoHardWare1 = req.body.tipoHardwareServer1;
    tipoHardWare2 = req.body.tipoHardwareServer2;
    tipoHardWare3 = req.body.tipoHardwareServer3;
    tipoHardWare4 = req.body.tipoHardwareServer4;


    // //primeiro
    // nomeUnidadeMedida1 = req.body.nomesUnidadesMedidasServer1;
    idUnidadeMedida1 = 1;
    parametroMin1 = req.body.parametroMinServer1;
    parametroMax1 = req.body.parametroMaxServer1;
    
    // //segundo
    // nomeUnidadeMedida2 = req.body.nomesUnidadesMedidasServer2;
    idUnidadeMedida2 = 1;
    parametroMin2 = req.body.parametroMinServer2;
    parametroMax2 = req.body.parametroMaxServer2;

    // //terceiro
    // nomeUnidadeMedida3 = req.body.nomesUnidadesMedidasServer3;
    idUnidadeMedida3 = 1;
    parametroMin3 = req.body.parametroMinServer3;
    parametroMax3 = req.body.parametroMaxServer3;
    
    // //quarto
    // nomeUnidadeMedida4 = req.body.nomesUnidadesMedidasServer4;
    idUnidadeMedida4 = 1;
    parametroMin4 = req.body.parametroMinServer4;
    parametroMax4 = req.body.parametroMaxServer4;



    computadorModel.cadastrarModelo(modelo),

    // computadorModel.cadastrarUnidadeMedida(nomeUnidadeMedida1,idUnidadeMedida1)
    computadorModel.cadastrarParametro(parametroMin1,parametroMax1,idUnidadeMedida1,tipoHardWare1),

    // computadorModel.cadastrarUnidadeMedida(nomeUnidadeMedida2,idUnidadeMedida2)
    computadorModel.cadastrarParametro(parametroMin2,parametroMax2,idUnidadeMedida2,tipoHardWare2),

    // computadorModel.cadastrarUnidadeMedida(nomeUnidadeMedida3,idUnidadeMedida3)
    computadorModel.cadastrarParametro(parametroMin3,parametroMax3,idUnidadeMedida3,tipoHardWare3),

    // computadorModel.cadastrarUnidadeMedida(nomeUnidadeMedida4,idUnidadeMedida4)
    computadorModel.cadastrarParametro(parametroMin4,parametroMax4,idUnidadeMedida4,tipoHardWare4)
    .then(
            function (ultimaCaptura) {
                res.json(ultimaCaptura);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultarJanelas(req, res) {
    var idComputador = req.body.idComputadorServer;

    computadorModel.consultarJanelas(idComputador)
        .then(
            function (resposta) {
                res.json(resposta);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function atualizarGraficoCpu(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var idHardware = req.body.idHardwareServer;
    var idComputador = req.body.idComputadorServer;
    computadorModel.atualizarGraficoCpu(idComputador,idHardware)
        .then(
            function (ultimaCaptura) {
                res.json(ultimaCaptura);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
module.exports = {
    cadastrar,
    cadastrarModelo,
    consultarUltimoModelo,
    consultarComputadores,
    excluirComputador,
    consultarDadosGrafico,
    consultarDadosGraficoCpu,
    consultarModelos,
    consultarTipoHardwares,
    consultarUnidadeMedida,
    atualizarComputador,
    cadastrarModeloEmGeral,
    consultarJanelas,
    atualizarGraficoCpu
    
}