var usuarioModel = require('../models/usuarioModel')


function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {

    usuarioModel.entrar(email, senha)
      .then(
        function (resultado) {
          console.log(`\nResultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

          if (resultado.length == 1) {
            console.log(resultado);
            res.json(resultado[0]);
          } else if (resultado.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  }

}

function registrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeBotao = req.body.nomeBotaoServer
  var fkMaquina = req.body.empresaMaqServer
  var fkEmpresa = req.body.empresaServer
  var fkPlanoEmpresa = req.body.planoServer
  var fkTipoMaquina = req.body.tipoMaquinaServer

  // Faça as validações dos valores
  if (nomeBotao == undefined || fkMaquina == undefined || fkEmpresa == undefined || fkPlanoEmpresa == undefined || fkTipoMaquina == undefined) {
    res.status(400).send("Seu nome está undefined!");
  }
  else {
    // Passe os valores como parâmetro e vá para o arquivo inovacaoModel.js
    usuarioModel.registrar(nomeBotao, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina)
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
}


function cadastrarEmpresa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer
  var cnpj = req.body.cnpjServer
  var telefone = req.body.telefoneServer
  //var empresaId = req.body.empresaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!')
  } else if (cnpj == undefined) {
    res.status(400).send('Seu cnpj está undefined!')
  } else if (telefone == undefined) {
    res.status(400).send('Sua telefone está undefined!')
  }
  //else if (empresaId == undefined) {
  // res.status(400).send("Sua empresa está undefined!");
  //}
  else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarEmpresa(nome, cnpj, telefone)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
      })
  }
}
function cadastrarEndereco(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var cep = req.body.cepServer
  var estado = req.body.estadoServer
  var cidade = req.body.cidadeServer
  var rua = req.body.ruaServer
  var numero = req.body.numeroServer

  //var empresaId = req.body.empresaServer;

  // Faça as validações dos valores
  if (cep == undefined) {
    res.status(400).send('Seu cep está undefined!')
  } else if (estado == undefined) {
    res.status(400).send('Seu estado está undefined!')
  } else if (cidade == undefined) {
    res.status(400).send('Sua cidade está undefined!')
  } else if (rua == undefined) {
    res.status(400).send('Sua rua está undefined!')
  } else if (numero == undefined) {
    res.status(400).send('Sua numero está undefined!')
  }
  //else if (empresaId == undefined) {
  // res.status(400).send("Sua empresa está undefined!");
  //}
  else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarEndereco(cep, estado, cidade, rua, numero)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
      })
  }
}
function cadastrarRL(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeRLServer
  var cpf = req.body.cpfRLServer
  var email = req.body.emailRLServer
  var senha = req.body.senhaRLServer
  var nivel = req.body.nivelRLServer
  var status = req.body.statusRLServer


  //var empresaId = req.body.empresaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!')
  } else if (cpf == undefined) {
    res.status(400).send('Seu cpf está undefined!')
  } else if (email == undefined) {
    res.status(400).send('Seu email está undefined!')
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está undefined!')
  } else if (nivel == undefined) {
    res.status(400).send('Seu nivel está undefined!')
  } else if (status == undefined) {
    res.status(400).send('Seu status está undefined!')
  }
  //else if (empresaId == undefined) {
  // res.status(400).send("Sua empresa está undefined!");
  //}
  else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarRl(nome, cpf, email, senha, nivel, status)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
      })
  }
}


function cadastrarFuncionario(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var fkEmpresa = req.body.empresaServer;
  var fkStatus = req.body.statusServer;
  var fkNivelAcesso = req.body.acessoServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo cadFuncModels.js
    usuarioModel.cadastrarFuncionario(nome, email, senha, cpf, fkEmpresa, fkStatus, fkNivelAcesso)
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
}

function cadastrarMaquina(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var so = req.body.soServer;
  var ip = req.body.ipServer;
  // var andar = req.body.andarServer;
  var fkMaqEmpresa = req.body.empresaMaqServer;
  // var fkLocal = req.body.localServer;
  var fkPLanoEmpresa = req.body.planoServer
  var fkStatusMaquina = req.body.statusMaquinaServer;
  var fkTipoMaquina = req.body.tipoMaquinaServer;

  // Faça as validações dos valores
  if (so == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (ip == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo cadFuncModels.js
    usuarioModel.cadastrarMaquina(so, ip, fkMaqEmpresa, fkPLanoEmpresa, fkStatusMaquina, fkTipoMaquina)
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
}

function cadastrarLocal(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var andar = req.body.andarServer;
  var sala = req.body.salaServer;
  var fkSetor = req.body.fkSetorServer;


  // Faça as validações dos valores
  if (andar == undefined) {
    res.status(400).send("Seu andar está undefined!");
  } else if (sala == undefined) {
    res.status(400).send("Seu andar está undefined!");
  } else if (fkSetor == undefined) {
    res.status(400).send("Seu andar está undefined!");
  }
  else {

    // Passe os valores como parâmetro e vá para o arquivo inovacaoModel.js
    usuarioModel.cadastrarLocal(andar, sala, fkSetor)
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
}


function cadastrarSetores(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeSetor = req.body.nomeSetorServer

  // Faça as validações dos valores
  if (nomeSetor == undefined) {
    res.status(400).send('Seu nome está undefined!')
  }
  else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarSetores(nomeSetor)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function listarSetores(req, res) {
  usuarioModel.listarSetores().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function atualizarDados(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var Nome = req.body.nomeServer;
  var TelFixo = req.body.TelFixoServer;
  var TelCel = req.body.TelCelServer;
  var cpf = req.body.cpfServer;
  var idColaborador = req.body.idColaboradorServer;

  // Faça as validações dos valores
  if (Nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (TelFixo == undefined) {
    res.status(400).send("Seu TelFixo está undefined!");
  } else if (TelCel == undefined) {
    res.status(400).send("Seu TelCel está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else if (idColaborador == undefined) {
    res.status(400).send("Seu idColaborador está undefined!");
  }
  else {

    // Passe os valores como parâmetro e vá para o arquivo inovacaoModel.js
    usuarioModel.atualizarDados(Nome, TelFixo, TelCel, cpf, idColaborador)
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
}

function atualizarSenha(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var NovaSenha = req.body.NovaSenhaServer;
  var idColaborador = req.body.idColaboradorServer;

                    idColaboradorServer: idColaborador

  // Faça as validações dos valores
  if (NovaSenha == undefined) {
    res.status(400).send("Seu NovaSenha está undefined!");
  } else if (idColaborador == undefined) {
    res.status(400).send("Seu idColaborador está undefined!");
  }
  else {

    // Passe os valores como parâmetro e vá para o arquivo inovacaoModel.js
    usuarioModel.atualizarSenha(NovaSenha, idColaborador)
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
}

function updateStatusMaq(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var opcaoUpdate = req.body.opcaoUpdateServer;
  var idMaquina = req.body.idMaquinaServer;

  // Faça as validações dos valores
  if (opcaoUpdate == undefined || idMaquina == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo inovacaoModel.js
    usuarioModel.updateStatusMaq(opcaoUpdate, idMaquina)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao atualizar o status! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function updateStatusFunc(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var opcaoUpdate = req.body.opcaoUpdateServer;
  var idFunc = req.body.idFuncionarioServer;

  // Faça as validações dos valores
  if (opcaoUpdate == undefined || idFunc == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo inovacaoModel.js
    usuarioModel.updateStatusFunc(opcaoUpdate, idFunc)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao atualizar o status! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  entrar,
  cadastrarEmpresa,
  cadastrarEndereco,
  cadastrarRL,
  cadastrarFuncionario,
  cadastrarMaquina,
  cadastrarLocal,
  cadastrarSetores,
  registrar,
  atualizarDados,
  atualizarSenha,
  updateStatusMaq,
  updateStatusFunc,
  listarSetores
}
