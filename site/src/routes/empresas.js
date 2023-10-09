var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    empresaController.autenticar(req, res);
});

router.post("/consultarUltimaEmpresa", function (req, res) {
    empresaController.consultarUltimaEmpresa(req, res);
});

router.post("/consultarUltimoEndereco", function (req, res) {
    empresaController.consultarUltimoEndereco(req, res);
});

router.post("/cadastrarLocalidade", function (req, res) {
    empresaController.cadastrarLocalidade(req, res);
});


module.exports = router;