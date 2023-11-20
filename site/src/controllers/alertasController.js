var alertasModel = require("../models/alertasModel");


function consultarAlertasComputador(req, res) {

    var idComputador = req.body.idComputadorServer;
    
    alertasModel.consultarAlertasComputador(idComputador)
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

function quantidadeAlertas(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    
    alertasModel.consultarQuantidadeAlertas(idEmpresa)
    // alertasModel.alertasPorEmpresa(idEmpresa)
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

function quantidadeAlertasPorEmpresa(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    
    alertasModel.quantidadeAlertasPorEmpresa(idEmpresa)
    // alertasModel.alertasPorEmpresa(idEmpresa)
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

function consultaIrregularidadesModelo(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    
    alertasModel.consultaIrregularidadesModelo(idEmpresa)
    // alertasModel.alertasPorEmpresa(idEmpresa)
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

function consultaIrregularidadesEmpresa(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    
    alertasModel.consultaIrregularidadesEmpresa(idEmpresa)
    // alertasModel.alertasPorEmpresa(idEmpresa)
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

function consultaIrregularidadesUltimasHoras(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    
    alertasModel.consultaIrregularidadesUltimasHoras(idEmpresa)
    // alertasModel.alertasPorEmpresa(idEmpresa)
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




module.exports = {
    consultarAlertasComputador,
    quantidadeAlertas,
    quantidadeAlertasPorEmpresa,
    consultaIrregularidadesModelo,
    consultaIrregularidadesEmpresa,
    consultaIrregularidadesUltimasHoras
}