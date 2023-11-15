import com.github.britooo.looca.api.core.Looca
import javax.swing.JOptionPane

fun main() {

    val repositorio = Repositorio ()
    repositorio.iniciar()
    val colaborador = Colaborador()
    val locca = Looca()
    val maquina = Maquina ()
    val campoJanela = Janela()
    val janelas = locca.grupoDeJanelas


    colaborador.email = JOptionPane.showInputDialog("""
        Insira seu email:
    """.trimIndent())
    colaborador.senha  = JOptionPane.showInputDialog("""
        Insira sua senha :
    """.trimIndent())


    val Colaborador : Int? = repositorio.verificarColaborador(colaborador.email, colaborador.senha)



    if (Colaborador != 0){
        if (Colaborador != null){
            JOptionPane.showMessageDialog(null, """
                Bem vindo ${colaborador.nome}!!!
                Você está dentro do Sistema da Health Touch.
            """.trimIndent())


            while (true){

                val opcao = JOptionPane.showInputDialog("""
                        Agora ${colaborador.nome },
                        Escolha uma das opções abaixo : 

                        1 - Capturar janleas
                        2 - sair


                    """.trimIndent()).toInt()


                when(opcao){
                    1 -> {
                        val id =  JOptionPane.showInputDialog("""
                            Qual é o Id da máquina que você quer capturar ?
                        """.trimIndent()).toInt()

                        val vmaquina =   repositorio.validarMaquina(id)

                        if (vmaquina != null) {
                            if (vmaquina != 0) {


                                JOptionPane.showMessageDialog(
                                    null, """
                                id Encontrado
                                começando captura
                            """.trimIndent()
                                )


                                repositorio.buscaridMaquina(id)
                                repositorio.buscarfkEmpresa(id)
                                repositorio.buscarfkTipoMaquina(id)
                                repositorio.buscarfkPlanoEmpresa(id)
                                repositorio.cadastrarjanela(campoJanela)



                            }
                        }

                        else{
                            JOptionPane.showMessageDialog(null, """
                                Id não encontrado
                            """.trimIndent())
                        }





                    }
                    2 -> {
                        break
                    }

            }





        }
    }
    else {
        JOptionPane.showMessageDialog(null, """
            Tente Novamente!!!
            Você não está dentro do Sistema da Health Touch.
        """.trimIndent())
    }
}
}