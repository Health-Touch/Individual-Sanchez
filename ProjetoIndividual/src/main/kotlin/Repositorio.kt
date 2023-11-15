import com.github.britooo.looca.api.core.Looca
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime
import javax.swing.JOptionPane

class Repositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    val looca = Looca()
    val janelas = looca.grupoDeJanelas
    var campoJanela = Janela()
    fun iniciar() {
        jdbcTemplate = Conexao.jdbcTemplate!!
    }


    fun cadastrarjanela(janela: Janela){

        janelas.janelas.forEachIndexed { p, janela ->
            campoJanela.nomeJanela = janela.titulo
            campoJanela.id = janela.janelaId
            campoJanela.dtJanela = LocalDateTime.now()

            if (janela.titulo != null && janela.titulo.isNotBlank()) {
                println(
                    """
            janela ${p + 1}
            Id: ${janela.janelaId}
            Titulo: ${janela.titulo}
        """.trimIndent())

                jdbcTemplate.update("""
            insert into Janela(pidJanela, tituloJanela, dtJanela, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina) values
           ('${campoJanela.id}', '${campoJanela.nomeJanela}', '${campoJanela.dtJanela}', ${campoJanela.fkMaquina},  ${campoJanela.fkEmpresa},  ${campoJanela.fkPlanoEmpresa},  ${campoJanela.fkTipoMaquina})
        """.trimIndent())
            }







        }


    }

    fun buscaridMaquina(id: Int){


        var idMaquina=  jdbcTemplate.queryForObject(
            """
                 select idMaquina from maquina where idMaquina = ${id};
                """, Int::class.java
        );

        if (idMaquina != null) {
            campoJanela.fkMaquina =idMaquina
        }


    }

    fun buscarfkEmpresa(id: Int){



        var fkEmpresa=  jdbcTemplate.queryForObject(
            """
                 select fkEmpresa from maquina where idMaquina = ${id};
                """, Int::class.java
        );

        if (fkEmpresa != null) {
            campoJanela.fkEmpresa =fkEmpresa
        }
    }

    fun buscarfkTipoMaquina(id: Int){


        var fkTipoMaquina=  jdbcTemplate.queryForObject(
            """
                 select fkTipoMaquina from maquina where idMaquina = ${id};
                """, Int::class.java
        );

        if (fkTipoMaquina != null) {
            campoJanela.fkTipoMaquina = fkTipoMaquina
        }
    }

    fun buscarfkPlanoEmpresa(id: Int){


        var fkPlanoEmpresa=  jdbcTemplate.queryForObject(
            """
                 select fkPlanoEmpresa from maquina where idMaquina = ${id};
                """, Int::class.java
        );

        if (fkPlanoEmpresa != null) {
            campoJanela.fkPlanoEmpresa = fkPlanoEmpresa
        }
    }



    fun verificarColaborador(email: String, senha: String) : Int?{

        val colaborador = jdbcTemplate.queryForObject(
            """
                  select count(idColaborador) from Colaborador where email = '${email}' and senha = '${senha}';
                """, Int::class.java
        );

        return colaborador
    }





    fun validarMaquina(id: Int): Int? {



        val maquina=  jdbcTemplate.queryForObject(
            """
                 select count(idMaquina) from maquina where IdMaquina = '${id}';
                """, Int::class.java
        );

        return maquina

    }

}