var empresaModel = require("../models/empresaModel");
// var aquarioModel = require("../models/aquarioModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var numSerie = req.body.numSerieServer;
    var modelo = req.body.modeloServer;
    computadorModel.cadastrar(numSerie,modelo)
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



module.exports = {
    cadastrar
}