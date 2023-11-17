var express = require('express')
var router = express.Router()

var usuarioController = require('../controllers/usuarioController')

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post('/cadastrarEmpresa', function (req, res) {
  usuarioController.cadastrarEmpresa(req, res)
})

router.post('/registrar', function (req, res) {
  usuarioController.registrar(req, res)
})
router.post('/autenticar', function (req, res) {
  usuarioController.entrar(req, res)
})
router.post('/cadastrarEndereco', function (req, res) {
  usuarioController.cadastrarEndereco(req, res)
})
router.post('/cadastrarRL', function (req, res) {
  usuarioController.cadastrarRL(req, res)
})

router.get('/', function (req, res) {
  usuarioController.testar(req, res)
})

//Recebendo os dados do html e direcionando para a função cadastrar de cadFuncController.js
router.post('/cadastrarFuncionario', function (req, res) {
  usuarioController.cadastrarFuncionario(req, res)
})

//Recebendo os dados do html e direcionando para a função cadastrar de cadFuncController.js
router.post('/cadastrarMaquina', function (req, res) {
  usuarioController.cadastrarMaquina(req, res)
})

router.post('/cadastrarLocal', function (req, res) {
  usuarioController.cadastrarLocal(req, res)
})

router.post('/cadastrarSetores', function (req, res) {
  usuarioController.cadastrarSetores(req, res)
})

router.get('/listarSetores', function (req, res) {
  usuarioController.listarSetores(req, res)
})
router.get('/filtrarSetores', function (req, res) {
  usuarioController.filtrarSetores(req, res)
})
// router.get('/filtrarStatus', function (req, res) {
//   usuarioController.filtrarStatus(req, res)
// })

router.post('/atualizarDados', function (req, res) {
  usuarioController.atualizarDados(req, res)
})

router.post('/atualizarSenha', function (req, res) {
  usuarioController.atualizarSenha(req, res)
})

router.post('/updateStatusMaq', function (req, res) {
  usuarioController.updateStatusMaq(req, res)
})

router.post('/updateStatusFunc', function (req, res) {
  usuarioController.updateStatusFunc(req, res)
})


module.exports = router
