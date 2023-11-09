var express = require("express");
var router = express.Router();
console.log("Estou no route da empresa");
var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
})

router.post("/consultarUltimaEmpresa", function (req, res) {
    empresaController.consultarUltimaEmpresa(req, res);
});

router.post("/consultarUltimoEndereco", function (req, res) {
    empresaController.consultarUltimoEndereco(req, res);
});

router.post("/cadastrarLocalidade", function (req, res) {
    empresaController.cadastrarLocalidade(req, res);
});

router.post("/exibirEmpresas", function (req, res) {
    empresaController.exibirEmpresas(req, res);
});



module.exports = router;