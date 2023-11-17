function entrar() {
  // aguardar();

  console.log('Na func entrar')

  var emailVar = input_email.value
  var senhaVar = input_senha.value

  if (emailVar == '' || senhaVar == '') {
    Swal.fire({
      title: 'Login inválido!',
      text: 'Por favor preencha todos os campos!',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    console.log('(Mensagem de erro para todos os campos em branco)')

    return false
  }

  console.log('FORM LOGIN: ', emailVar)
  console.log('FORM SENHA: ', senhaVar)

  fetch('/usuarios/autenticar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar
    })
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        let timerInterval
        Swal.fire({
          title: 'Login realizado com sucesso!',
          html: 'Redirecionando para Dashboard em <b></b>...',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then(result => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })

        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.EMAIL_COLABORADOR = json.email
          sessionStorage.NOME_COLABORADOR = json.nome
          sessionStorage.ID_COLABORADOR = json.idColaborador
          sessionStorage.SENHA_COLABORADOR = json.senha
          sessionStorage.NIVELACESSO_COLABORADOR = json.nivelAcesso
          sessionStorage.ID_EMPRESA_COLABORADOR = json.idEmpresa
          sessionStorage.NOME_FANTASIA_COLABORADOR = json.NomeFantasia
          sessionStorage.PLANO_EMPRESA = json.idPlano

          setTimeout(function () {
            window.location = '/setores.html'
          }, 2000) // apenas para exibir o loading
        })
      } else {
        Swal.fire({
          title: 'Login inválido!',
          text: 'Usuário não encontrado',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        console.log('Houve um erro ao tentar realizar o login!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function esqueceuSenha() {
  swal.fire('Entre em contato conosco para redefinir sua senha')
}

function criarConta() {
  swal.fire('Entre em contato conosco para se cadastrar')
}

function home() {
  window.location = 'index.html'
}

function buscarMaquinas() {
  console.log('Entrei na função maquina')
  fetch('/dashboard/maquinas', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO maquina()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))
          console.log(JSON.stringify(json.maquina))

          console.log(json.maquina)

          sessionStorage.MAQUINAS = JSON.stringify(json.maquina)
        })
      } else {
        console.log('Houve um erro no maquina!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarSetor() {
  console.log('Entrei na função validar setor')
  fetch('/dashboard/setor', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.NOME_SETOR = json.setor
          sessionStorage.ID_SALA = json.sala
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

//Função dos botões
function btnLogin() {
  window.location.href = 'login.html'
}

function home() {
  window.location = '/index.html'
}
