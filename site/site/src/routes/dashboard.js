// Começo da dash setor
var express = require('express')
var router = express.Router()

var dashController = require('../controllers/dashController')

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get('/setor', function (req, res) {
  dashController.setor(req, res)
})

router.get('/maquinas', function (req, res) {
  dashController.buscarMaquinas(req, res)
})

//Analise atual
router.get('/ultimas/:idMaquina', function (req, res) {
  dashController.buscarUltimasMedidas(req, res)
})

router.get('/tempo-real/:idMaquina', function (req, res) {
  dashController.buscarMedidasEmTempoReal(req, res)
})

//Avisos
router.get('/ultimos/:idMaquina', function (req, res) {
  dashController.buscarUltimosAvisos(req, res)
})

router.get('/avisos/tempo-real/:idMaquina', function (req, res) {
  dashController.buscarAvisosEmTempoReal(req, res)
})

//Usb
router.get('/usb/:idMaquina', function (req, res) {
  dashController.buscarUltimosUsb(req, res)
})

router.get('/usb/tempo-real/:idMaquina', function (req, res) {
  dashController.buscarUsbEmTempoReal(req, res)
})

//Média
router.get('/media/:idMaquina', function (req, res) {
  dashController.buscarUltimosMedia(req, res)
})

router.get('/media/tempo-real/:idMaquina', function (req, res) {
  dashController.buscarMediaEmTempoReal(req, res)
})

//Insight
router.get('/insight/:idMaquina', function (req, res) {
  dashController.buscarUltimosInsight(req, res)
})

router.get('/insight/tempo-real/:idMaquina', function (req, res) {
  dashController.buscarInsightEmTempoReal(req, res)
})

module.exports = router
