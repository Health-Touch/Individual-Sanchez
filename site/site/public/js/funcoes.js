// sessão
function validarSessao() {
  var email = sessionStorage.EMAIL_COLABORADOR
  var colaborador = sessionStorage.NOME_COLABORADOR
  var idColaborador = sessionStorage.ID_COLABORADOR
  var senha = sessionStorage.SENHA_COLABORADOR
  var cargo = sessionStorage.NIVELACESSO_COLABORADOR
  var idEmpresa = sessionStorage.ID_EMPRESA_COLABORADOR
  var empresa = sessionStorage.NOME_FANTASIA_COLABORADOR

  var tituloPerfil = document.getElementById('tituloPerfil')
  var cargoPerfil = document.getElementById('cargoPerfil')
  var nomeEmpresa = document.getElementById('empresa')

  if (email != null && colaborador != null) {
    // window.alert(`Seja bem-vindo, ${nome}!`);
    tituloPerfil.innerHTML = colaborador
    cargoPerfil.innerHTML = cargo
    nomeEmpresa.innerHTML = empresa

    // finalizarAguardar();
  } else {
    window.location = '../login.html'
  }
}

function limparSessao() {
  // aguardar();
  sessionStorage.clear()
  // finalizarAguardar();
  window.location = './login.html'
}

// carregamento (loading)
function aguardar() {
  var divAguardar = document.getElementById('div_aguardar')
  divAguardar.style.display = 'flex'
}

function finalizarAguardar(texto) {
  var divAguardar = document.getElementById('div_aguardar')
  divAguardar.style.display = 'none'

  var divErrosLogin = document.getElementById('div_erros_login')
  if (texto) {
    divErrosLogin.style.display = 'flex'
    divErrosLogin.innerHTML = texto
  }
}

// modal
function mostrarModal() {
  var divModal = document.getElementById('div_modal')
  divModal.style.display = 'flex'
}

function fecharModal() {
  var divModal = document.getElementById('div_modal')
  divModal.style.display = 'none'
}
