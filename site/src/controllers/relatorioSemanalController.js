var relatorioModel = require("../models/relatorioSemanalModel");
// var aquarioModel = require("../models/aquarioModel");

function listarAlertas(req, res) {
        var idEmpresa = req.body.idEmpresaServer;
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        relatorioModel.listarAlertas(idEmpresa)
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

function listarComponentes(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    relatorioModel.listarComponentes(idEmpresa)
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

function listarEmpresas(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    relatorioModel.listarEmpresas(idEmpresa)
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

function buscarKpi(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    relatorioModel.buscarKpi(idEmpresa)
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

module.exports =    {
    listarAlertas,
    listarComponentes,
    listarEmpresas,
    buscarKpi
}