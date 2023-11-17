var database = require('../database/config')

function entrar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
  var instrucao = `
  select Colaborador.idColaborador, Colaborador.nome, Colaborador.email, Colaborador.senha, Colaborador.CPF,  NivelAcesso.nivelAcesso, Empresa.idEmpresa, Empresa.NomeFantasia, Plano.idPlano
  from Colaborador join NivelAcesso on fkNivelAcesso = idNivelAcesso 
                    join Empresa on fkEmpresa = idEmpresa
                    join Plano on fkPlano = idPlano WHERE email = '${email}' AND senha = '${senha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(nome, cnpj, telefone) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cnpj,
    telefone
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO Empresa (NomeFantasia, CNPJ, inicioContrato, telFixo) VALUES ('${nome}', '${cnpj}', curdate(), '${telefone}');
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function cadastrarEndereco(cep, estado, cidade, rua, numero) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    cep,
    estado,
    cidade,
    rua,
    numero
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

  var instrucao = `
  INSERT INTO Endereco (rua, num, estado, CEP,  cidade, fkEmpresa) VALUES ('${rua}', '${numero}','${estado}', '${cep}', '${cidade}',(select MAX(idEmpresa) from empresa));
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function cadastrarRl(nome, cpf, email, senha, nivel, status) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cpf,
    email,
    senha,
    nivel,
    status
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.

  var instrucao = `
  INSERT INTO Colaborador (nome, email, senha, CPF, fkStatus,  fkNivelAcesso,fkEmpresa) VALUES ('${nome}', '${email}','${senha}', '${cpf}', '${status}', '${nivel}', (select MAX(idEmpresa) from empresa));
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function registrar(nomeBotao, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina) {
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO analiseToten (nomeBotao, dataHora, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina) VALUES ('${nomeBotao}', now(), '${fkMaquina}', '${fkEmpresa}', '${fkPlanoEmpresa}', '${fkTipoMaquina}');
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, senha, cpf, fkEmpresa, fkStatus, fkNivelAcesso) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, email, senha, cpf, fkEmpresa, fkStatus, fkNivelAcesso);

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO Colaborador (nome, email, senha, CPF, fkEmpresa, fkStatus, fkNivelAcesso) VALUES 
      ('${nome}', '${email}', '${senha}', '${cpf}', '${fkEmpresa}', '${fkStatus}', '${fkNivelAcesso}');
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarMaquina(so, ip, fkMaqEmpresa, fkPLanoEmpresa, fkStatusMaquina, fkTipoMaquina) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", so, ip, fkMaqEmpresa, fkPLanoEmpresa, fkStatusMaquina, fkTipoMaquina);
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO Maquina (so, ip, fkEmpresa, fkLocal, fkPlanoEmpresa, fkStatusMaquina, fkTipoMaquina) VALUES 
      ('${so}', '${ip}', ${fkMaqEmpresa}, (select MAX(idLocalSala) from LocalSala), ${fkPLanoEmpresa}, ${fkStatusMaquina}, ${fkTipoMaquina});
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarLocal(andar, sala, fkSetor) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n");

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
  insert into LocalSala (sala, andar, fkSetor) values 
  (${sala}, ${andar}, ${fkSetor});    
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarSetores(nomeSetor) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSetores():", nomeSetor);

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
      INSERT INTO setor (nome) VALUES 
      ('${nomeSetor}');
  `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarSetores() {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
      Select idSetor, nome from setor;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizarDados(Nome, TelFixo, TelCel, cpf, idColaborador) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.",
    Nome,
    TelFixo,
    TelCel,
    cpf,
    idColaborador
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
  update colaborador join telefone on fkColaborador = idColaborador 
	set colaborador.nome = "${Nome}", 
    telefone.telCel = "${TelCel}",
    telefone.TelFixo = "${TelFixo}",
    colaborador.cpf = "${cpf}"
    where idColaborador = ${idColaborador};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function atualizarSenha(NovaSenha, idColaborador) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.",
    NovaSenha,
    idColaborador
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
  update colaborador
	set senha = "${NovaSenha}"
    where idColaborador = ${idColaborador};
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function updateStatusMaq(opcaoUpdate, idMaquina) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.",
    opcaoUpdate,
    idMaquina
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
  update maquina set fkStatusMaquina = ${opcaoUpdate} where idMaquina = ${idMaquina};
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function updateStatusFunc(opcaoUpdate, idFunc) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.",
    opcaoUpdate,
    idFunc
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
  update Colaborador set fkStatus = ${opcaoUpdate} where idColaborador = ${idFunc};
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

module.exports = {
  entrar,
  cadastrarEmpresa,
  cadastrarEndereco,
  cadastrarRl,
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
