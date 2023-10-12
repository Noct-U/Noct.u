var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/computadorController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    computadorController.cadastrar(req, res);
})



module.exports = router;