package app

import Colaborador
import Janela
import Maquina
import Repositorio
import com.github.britooo.looca.api.core.Looca
import java.util.*

class Main {
    companion object {
        @JvmStatic fun main(args: Array<String>) {

            // seu código ficará aqui
            val scanner = Scanner(System.`in`)
            val repositorio = Repositorio()
            repositorio.iniciar()
            val colaborador = Colaborador()
            val locca = Looca()
            val maquina = Maquina()
            val campoJanela = Janela()
            val janelas = locca.grupoDeJanelas

            println("Insira seu email:")
            colaborador.email = scanner.nextLine()

            println("Insira sua senha:")
            colaborador.senha = scanner.nextLine()

            val Colaborador: Int? = repositorio.verificarColaborador(colaborador.email, colaborador.senha)

            if (Colaborador != 0) {
                if (Colaborador != null) {
                    var email = colaborador.email
                    var senha = colaborador.senha
                    var fk_empresa = repositorio.buscarfkEmpresa(email, senha)
                    println("""
                Bem vindo ${colaborador.nome}!!!
                Você está dentro do Sistema da Health Touch.
            """.trimIndent())

                    while (true) {
                        println("""
                        Agora ${colaborador.nome},
                        Escolha uma das opções abaixo :

                        1 - Capturar janelas
                        2 - Sair
                    """.trimIndent())

                        val opcao = scanner.nextInt()

                        when (opcao) {
                            1 -> {
                                println("Qual é o Id da máquina que você quer capturar?")
                                val id_maquina = scanner.nextInt()

                                val vmaquina = repositorio.validarMaquina(id_maquina)

                                if (vmaquina != null) {
                                    if (vmaquina != 0) {
                                        println("""
                                    Id Encontrado
                                    Começando captura
                                """.trimIndent())

                                        repositorio.buscaridMaquina(id_maquina)
                                        repositorio.buscarfkEmpresa(email, senha)
                                        repositorio.buscarfkTipoMaquina(id_maquina)
                                        repositorio.buscarfkPlanoEmpresa(id_maquina)
                                        var novaJanela = repositorio.capturarDadosJ(locca)
                                        repositorio.cadastrarJanela(novaJanela, id_maquina, fk_empresa)
                                    }
                                } else {
                                    println("Id não encontrado")
                                }
                            }
                            2 -> {
                                break
                            }
                        }
                    }
                }
            } else {
                println("""
            Tente Novamente!!!
            Você não está dentro do Sistema da Health Touch.
        """.trimIndent())
            }

        }
    }
}