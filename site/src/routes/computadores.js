var express = require("express");
var router = express.Router();

var computadorController = require("../controllers/computadorController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    computadorController.cadastrar(req, res);
})

router.post("/cadastrarModelo", function (req, res) {
    computadorController.cadastrarModelo(req, res);
})

router.post("/consultarUltimoModelo", function (req, res) {
    computadorController.consultarUltimoModelo(req, res);
})

router.post("/consultarComputadores", function (req, res) {
    computadorController.consultarComputadores(req, res);
})

router.post("/excluirComputador", function (req, res) {
    computadorController.excluirComputador(req, res);
})
module.exports = router;