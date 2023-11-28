
import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.janelas.Janela
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime



class Repositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    val looca = Looca()
    val janelas = looca.grupoDeJanelas
    var campoJanela = Janela()
    var bdInterServer = Conexao.bdInterServer!!
    fun iniciar() {
        jdbcTemplate = Conexao.jdbcTemplate!!
    }


    fun cadastrarJanela(novaJanela: MutableList<Janela>?, id_maquina: Int, fk_empresa: Int) {
        val janelasNoBanco = bdInterServer.queryForList(
            "SELECT tituloJanela FROM Janela where fkMaquina = $id_maquina and fkEmpresa = $fk_empresa",
            String::class.java
        )

        val janelasListadas = novaJanela?.filter { it.titulo != null && it.titulo.isNotBlank() }?.map { it.titulo }

        novaJanela?.forEach { janela ->
            if (janela.titulo != null && janela.titulo.isNotBlank()) {
                val janelaExisteNoBanco = janelasNoBanco.contains(janela.titulo)

                if (janelaExisteNoBanco) {
                    // A janela existe no banco, atualize-a definindo status_abertura como verdadeiro.
                    bdInterServer.update(
                        """
                UPDATE Janela
                SET dtJanela = ?,
                    statusJanela = ?
                WHERE tituloJanela = ? AND fkMaquina = $id_maquina AND fkEmpresa = $fk_empresa
                """,
                        LocalDateTime.now(),
                        true,
                        janela.titulo
                    )
                } else {
                    // A janela não existe no banco, insira-a com status_abertura como verdadeiro.
                    jdbcTemplate.update(
                        """
                INSERT INTO Janela (pidJanela, titulojanela, dtJanela, statusjanela, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina)
                VALUES (?, ?, ?, ?, $id_maquina, $fk_empresa, ${buscarfkPlanoEmpresa(id_maquina)}, ${buscarfkTipoMaquina(id_maquina)})
                """,
                        janela.pid,
                        janela.titulo,
                        LocalDateTime.now(),
                        true
                    )
                    bdInterServer.update(
                        """
                INSERT INTO Janela (pidJanela, titulojanela, dtJanela, statusjanela, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina)
                VALUES (?, ?, ?, ?, $id_maquina, $fk_empresa, ${buscarfkPlanoEmpresa(id_maquina)}, ${buscarfkTipoMaquina(id_maquina)})
                """,
                        janela.pid,
                        janela.titulo,
                        LocalDateTime.now(),
                        true
                    )
                }
            }
        }

        if (janelasListadas != null && janelasListadas.isNotEmpty()) {
            val placeholders = janelasListadas.map { "?" }.joinToString(", ")
            val updateQuery = "UPDATE Janela SET statusJanela = ? WHERE tituloJanela NOT IN ($placeholders)"
            val params = arrayOf(false, *janelasListadas.toTypedArray())
            val queryJanela = bdInterServer.update(updateQuery, *params)
            println("$queryJanela registros atualizados na tabela de janelas")
        }

    }

    fun validarJanela(nome_janela: String, id_maquina: Int, fk_empresa: Int): Boolean {
        val queryValidacao = bdInterServer.queryForObject(
            "SELECT count(*) FROM janela WHERE tituloJanela = ? and fkMaquina = $id_maquina and fkEmpresa = $fk_empresa",
            Int::class.java,
            nome_janela
        )
        return queryValidacao > 0
    }
    fun capturarDadosJ(looca: Looca): MutableList<Janela>? {
        val janela = looca.grupoDeJanelas
        var janelasVisiveis = janela.janelasVisiveis

        return janelasVisiveis
    }


        fun buscaridMaquina(id_maquina: Int) {


            var idMaquina = bdInterServer.queryForObject(
                """
                 select idMaquina from maquina where idMaquina = ${id_maquina};
                """, Int::class.java
            );

            if (idMaquina != null) {
                campoJanela.fkMaquina = idMaquina
            }


        }

        fun buscarfkEmpresa(email: String, senha: String): Int {


            var fkEmpresa = bdInterServer.queryForObject(
                """
                 select fkEmpresa from Colaborador where (email = '${email}' and senha = '${senha}');
                """, Int::class.java
            );

            if (fkEmpresa != null) {
                campoJanela.fkEmpresa = fkEmpresa
            }
            return fkEmpresa
        }

        fun buscarfkTipoMaquina(id_maquina: Int): Int {


            var fkTipoMaquina = bdInterServer.queryForObject(
                """
                 select fkTipoMaquina from maquina where idMaquina = ${id_maquina};
                """, Int::class.java
            );

            if (fkTipoMaquina != null) {
                campoJanela.fkTipoMaquina = fkTipoMaquina
            }
            return fkTipoMaquina
        }

        fun buscarfkPlanoEmpresa(id_maquina: Int): Int {


            var fkPlanoEmpresa = bdInterServer.queryForObject(
                """
                 select fkPlanoEmpresa from maquina where idMaquina = ${id_maquina};
                """, Int::class.java
            );

            if (fkPlanoEmpresa != null) {
                campoJanela.fkPlanoEmpresa = fkPlanoEmpresa
            }
            return  fkPlanoEmpresa
        }


        fun verificarColaborador(email: String, senha: String): Int? {

            val colaborador = bdInterServer.queryForObject(
                """
                  select count(idColaborador) from Colaborador where email = '${email}' and senha = '${senha}';
                """, Int::class.java
            );

            return colaborador
        }


        fun validarMaquina(id_maquina: Int): Int? {


            val maquina = bdInterServer.queryForObject(
                """
                 select count(idMaquina) from maquina where IdMaquina = '${id_maquina}';
                """, Int::class.java
            );

            return maquina

        }

    }
