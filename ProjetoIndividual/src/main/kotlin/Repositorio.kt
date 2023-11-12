import org.springframework.jdbc.core.JdbcTemplate

class Repositorio {
    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {
        jdbcTemplate = Conexao.jdbcTemplate!!
    }

    fun cadastrar(campos:Janela){
        jdbcTemplate.update("""
            insert into Janela(idJanela, tituloJanela, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina) values
           ('${campos.id}', '${campos.nomeJanela}', ${campos.fkMaquina},  ${campos.fkEmpresa},  ${campos.fkPlanoEmpresa},  ${campos.fkTipoMaquina})
        """.trimIndent())
    }
}