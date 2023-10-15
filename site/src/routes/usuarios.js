var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticarFuncionario", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrarTipo", function (req, res) {
    usuarioController.cadastrarTipo(req, res);
});

router.post("/exibirLocatarias", function (req, res) {
    usuarioController.exibirLocatarias(req, res);
});

router.post("/exibirUltimoTipo", function (req, res) {
    usuarioController.exibirUltimoTipo(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
});
module.exports = router;