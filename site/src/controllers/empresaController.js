var empresaModel = require("../models/empresaModel");
// var aquarioModel = require("../models/aquarioModel");


function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeEmpresaServer;
    var razaoSocial = req.body.razaoEmpresaServer;
    var cnpj = req.body.cnpjEmpresaServer;
    var telefone = req.body.telefoneEmpresaServer;

    var cep = req.body.cepEnderecoServer;
    var cidade = req.body.cidadeEnderecoServer;
    var bairro = req.body.bairroEnderecoServer;
    var uf = req.body.ufEnderecoServer;
    var logradouro = req.body.logEnderecoServer;
 

    // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
    empresaModel.cadastrarEmpresa(nome,razaoSocial,cnpj,telefone),
    empresaModel.cadastrarEndereco(cep,cidade,bairro,uf,logradouro)
        .then(
            function () {
                res.json();
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



function consultarUltimaEmpresa(req, res) {
    
    empresaModel.consultarUltimaEmpresa()
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


function consultarUltimoEndereco(req, res) {
    
    empresaModel.consultarUltimoEndereco()
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


function cadastrarLocalidade(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var numero = req.body.numServer;
    var complemento = req.body.complementoServer;
    var idUltimoEndereco = req.body.idUltimoEnderecoServer;
    var idUltimaEmpresa = req.body.idUltimaEmpresaServer;

    // Passe os valores como parâmetro e vá para o arquivo empresaModel.js

    empresaModel.cadastrarLocal(numero,complemento,idUltimoEndereco,idUltimaEmpresa)
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

function exibirEmpresas(req, res) {
    
    var idEmpresa = idEmpresaServer;
    empresaModel.exibirEmpresas(idEmpresa)
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
    cadastrarEmpresa,
    consultarUltimaEmpresa,
    consultarUltimoEndereco,
    cadastrarLocalidade,
    exibirEmpresas
}