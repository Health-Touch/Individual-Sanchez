import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate
object Conexao {
        var jdbcTemplate: JdbcTemplate? = null
            get() {
                if (field == null) {
                    val dataSource = BasicDataSource()
                    dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                    dataSource.url = "jdbc:mysql://localhost:3306/HealthTouch"
                    dataSource.username = "root"
                    dataSource.password = "biel2004"
                    val novoJdbcTemplate = JdbcTemplate(dataSource)
                    field = novoJdbcTemplate
                }
                return field
            }

        fun criarTabelas() {
            jdbcTemplate!!.execute(
                """
                 CREATE TABLE IF NOT EXISTS Janela (
            idJanela INT ,
            tituloJanela varchar(45),
            fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
            fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
            fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
            fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
            constraint pk_composta_usb primary key (idJanela,fkMaquina, fkEmpresa,fkPlanoEmpresa,fkTipoMaquina)
        )
            """
            )




        }

}