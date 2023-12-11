var express = require("express");
var router = express.Router();

var relatorioSemanalController = require("../controllers/relatorioSemanalController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/listarAlertas", function (req, res) {
    relatorioSemanalController.listarAlertas(req, res);
});

router.post("/listarComponentes", function (req, res) {
    relatorioSemanalController.listarComponentes(req, res);
});

router.post("/listarEmpresas", function (req, res) {
    relatorioSemanalController.listarEmpresas(req, res);
});

router.post("/buscarKpi", function (req, res) {
    relatorioSemanalController.buscarKpi(req, res);
});


module.exports = router;