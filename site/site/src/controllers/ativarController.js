var ativarModel = require("../models/ativarModel");

function ativar(req, res) {
    var novaDescricao = req.body.statusMaquina;
    var id = req.params.idStatusMaquina;

    ativarModel.ativar(novaDescricao, id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}



module.exports = {
    ativar
}