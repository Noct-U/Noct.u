var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

//alertas de um computador específico
router.post("/consultarAlertasComputador", function (req, res) {
    alertasController.consultarAlertasComputador(req, res);
})

router.post("/quantidadeAlertas", function (req, res) {
    alertasController.quantidadeAlertas(req, res);
})

router.post("/quantidadeAlertasPorEmpresa", function (req, res) {
    alertasController.quantidadeAlertasPorEmpresa(req, res);
})

router.post("/consultaIrregularidadesModelo", function (req, res) {
    alertasController.consultaIrregularidadesModelo(req, res);
})

router.post("/consultaIrregularidadesEmpresa", function (req, res) {
    alertasController.consultaIrregularidadesEmpresa(req, res);
})

router.post("/consultaIrregularidadesUltimasHoras", function (req, res) {
    alertasController.consultaIrregularidadesUltimasHoras(req, res);
})


module.exports = router;