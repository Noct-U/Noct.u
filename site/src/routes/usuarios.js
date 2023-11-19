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

router.post("/cadastrarFunc", function (req, res) {
    usuarioController.cadastrarFunc(req, res);
});

router.post("/excluirFunc", function (req, res) {
    usuarioController.excluirUsuario(req, res);
});

router.post("/consultarFuncionario", function (req, res) {
    usuarioController.consultarFuncionario(req, res);
});

router.post("/excluirUsuario", function (req, res) {
    usuarioController.excluirUsuario(req, res);
});

router.post("/atualizarUsuario", function (req, res) {
    usuarioController.atualizarUsuario(req, res);
});

module.exports = router;