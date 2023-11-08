
import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.processos.ProcessoGrupo


fun main() {
    val looca = Looca()
    val janelas = looca.grupoDeJanelas
    val campoJanelas = Janela()


    janelas.janelas.forEachIndexed{p, janela ->
        campoJanelas.nomeJanela = janela.titulo
        campoJanelas.id = janela.janelaId

    println(
        """
            janela ${p + 1}
            Id: ${janela.janelaId}
            Titulo: ${janela.titulo}
        """.trimIndent()
    )


    }








}