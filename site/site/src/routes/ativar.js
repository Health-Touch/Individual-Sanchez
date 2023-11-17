var express = require("express");
var router = express.Router();

var ativarController = require("../controllers/ativarController");

router.post("/ativar/:id", function (req, res) {
    ativarController.ativar(req, res);
});

module.exports = router;