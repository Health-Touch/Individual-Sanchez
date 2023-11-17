// Começo da dash setor
var database = require('../database/config')

function setor() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  select
  m.idMaquina, m.fkEmpresa, m.fkPlanoEmpresa, 
  m.fkTipoMaquina, m.fkStatusMaquina, m.fkLocal, 
  l.idLocalSala, l.sala, l.andar, l.fkSetor, 
  s.nome
  from maquina as m join empresa as e on e.idEmpresa = m.fkEmpresa 
  join plano as p on e.fkPlano = p.idPlano
  join tipoMaquina as t on m.fkTipoMaquina = t.idTipoMaquina
  join statusMaquina as sm on m.fkStatusMaquina = sm.idStatusMaquina
  join localSala as l on m.fkLocal = l.idLocalSala
  join setor as s on l.fkSetor = s.idSetor
  where m.fkEmpresa = 1 and m.idMaquina = 1 
  and m.fkTipoMaquina = 1 and m.fkStatusMaquina = 1;
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function buscarMaquinas() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  )
  var instrucao = `
  SELECT * from maquina;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

//analise atual
function buscarUltimasMedidas(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select * from monitoramento
                    where fkMaquina = ${idMaquina}
                    order by idMonitoramento desc limit 3`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select * from monitoramento
    where fkMaquina = ${idMaquina} 
                    order by idMonitoramento desc limit 3`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//avisos
function buscarUltimosAvisos(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `
    SELECT a.idAvisos, DATE_FORMAT(a.dataHora, '%d/%m/%Y %H:%i:%s') as dtHr,
    a.fkMonitoramento, a.fkComponente, a.fkMaquina, a.fkEmpresa,
    a.fkPlanoEmpresa, a.fkTipoMaquina, a.fkNivelAviso
    FROM avisos as a join monitoramento as mt on mt.idMonitoramento = a.fkMonitoramento
    join componente as c on a.fkComponente = c.idComponente
    join maquina as m on a.fkMaquina = m.idMaquina
    join empresa as e on a.fkEmpresa = e.idEmpresa
    join plano as p on a.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on a.fkTipoMaquina = t.idTipoMaquina
    join nivelAvisos as n on a.fkNivelAviso = n.idNivelAvisos
    where a.fkEmpresa = 1 and a.fkMaquina = ${idMaquina} and a.fkTipoMaquina = 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarAvisosEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `    
    SELECT a.idAvisos, DATE_FORMAT(a.dataHora, '%d/%m/%Y %H:%i:%s') as dtHr,
    a.fkMonitoramento, a.fkComponente, a.fkMaquina, a.fkEmpresa,
    a.fkPlanoEmpresa, a.fkTipoMaquina, a.fkNivelAviso
    FROM avisos as a join monitoramento as mt on mt.idMonitoramento = a.fkMonitoramento
    join componente as c on a.fkComponente = c.idComponente
    join maquina as m on a.fkMaquina = m.idMaquina
    join empresa as e on a.fkEmpresa = e.idEmpresa
    join plano as p on a.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on a.fkTipoMaquina = t.idTipoMaquina
    join nivelAvisos as n on a.fkNivelAviso = n.idNivelAvisos
    where a.fkEmpresa = 1 and a.fkMaquina = ${idMaquina} and a.fkTipoMaquina = 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//usb
function buscarUltimosUsb(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select count(idUsb) as status
    from usb join maquina on maquina.idMaquina = usb.fkMaquina 
    where date(dtHoraInserção) = (SELECT CURDATE());`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUsbEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select count(idUsb) as status
    from usb join maquina on maquina.idMaquina = usb.fkMaquina 
    where date(dtHoraInserção) = (SELECT CURDATE());`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//media
function buscarUltimosMedia(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 1) as usoCpuMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 2) as usoRamMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 3) as usoDiscoMensal
    from monitoramento as mt join maquina as m on  m.idMaquina = mt.fkMaquina 
    join plano as p on mt.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on mt.fkTipoMaquina = t.idTipoMaquina
    join empresa as e on mt.fkEmpresaMaquina = e.idEmpresa
    where mt.fkMaquina = ${idMaquina} and mt.fkTipoMaquina = 1 and mt.fkEmpresaMaquina = 1
    limit 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMediaEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 1) as usoCpuMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 2) as usoRamMensal,
    (select format(avg(porcentagem),2) from monitoramento where fkComponente = 3) as usoDiscoMensal
    from monitoramento as mt join maquina as m on  m.idMaquina = mt.fkMaquina 
    join plano as p on mt.fkPlanoEmpresa = p.idPlano
    join tipoMaquina as t on mt.fkTipoMaquina = t.idTipoMaquina
    join empresa as e on mt.fkEmpresaMaquina = e.idEmpresa
    where mt.fkMaquina = ${idMaquina} and mt.fkTipoMaquina = 1 and mt.fkEmpresaMaquina = 1
    limit 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

//Insight
function buscarUltimosInsight(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightCpuMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightRamMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightDiscoMensal
  FROM maquina as m join monitoramento as mt on mt.fkMaquina = m.idMaquina
  join empresa as e on m.fkEmpresa = e.idEmpresa
  join statusMaquina as sm on m.fkStatusMaquina = sm.idStatusMaquina
  join tipoMaquina as t on m.fkTipoMaquina = t.idTipoMaquina
  WHERE m.idMaquina = ${idMaquina} and m.fkEmpresa = 1 and m.fkStatusMaquina = 1 and m.fkTipoMaquina = 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarInsightEmTempoReal(idMaquina) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `SELECT
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 1 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightCpuMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 2 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightRamMensal,
    FORMAT(
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 20) AS subquery) -
      (SELECT AVG(porcentagem) FROM (SELECT porcentagem FROM monitoramento WHERE fkComponente = 3 ORDER BY dataHora DESC LIMIT 10) AS subquery)
    , 2) AS insightDiscoMensal
  FROM maquina as m join monitoramento as mt on mt.fkMaquina = m.idMaquina
  join empresa as e on m.fkEmpresa = e.idEmpresa
  join statusMaquina as sm on m.fkStatusMaquina = sm.idStatusMaquina
  join tipoMaquina as t on m.fkTipoMaquina = t.idTipoMaquina
  WHERE m.idMaquina = ${idMaquina} and m.fkEmpresa = 1 and m.fkStatusMaquina = 1 and m.fkTipoMaquina = 1;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}
module.exports = {
  setor,
  buscarMaquinas,
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  buscarAvisosEmTempoReal,
  buscarUltimosAvisos,
  buscarUltimosUsb,
  buscarUsbEmTempoReal,
  buscarUltimosMedia,
  buscarMediaEmTempoReal,
  buscarUltimosInsight,
  buscarInsightEmTempoReal
}
