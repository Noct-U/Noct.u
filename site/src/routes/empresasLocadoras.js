var express = require("express");
var router = express.Router();

var empresaLocadoraController = require("../controllers/empresaLocadoraController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaLocadoraController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    empresaLocadoraController.autenticar(req, res);
});

router.post("/exibirEmpresas", function (req, res) {
    empresaLocadoraController.exibirEmpresas(req, res);
});

router.post("/autenticarLocataria", function (req, res) {
    empresaLocadoraController.autenticar(req, res);
});

module.exports = router;