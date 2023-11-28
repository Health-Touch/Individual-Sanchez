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

    var bdInterServer: JdbcTemplate? = null
        get() {
            if (field == null) {
                val dataSoruceServer = BasicDataSource()
                dataSoruceServer.url = "jdbc:sqlserver://54.145.218.19;databaseName=HealthTouch;encrypt=false";
                dataSoruceServer.driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
                dataSoruceServer.username = "sa"
                dataSoruceServer.password = "urubu100"
                bdInterServer = JdbcTemplate(dataSoruceServer)
            }
            return field
        }

        fun criarTabelas() {
            jdbcTemplate!!.execute(
                """
                 CREATE TABLE IF NOT EXISTS Janela (
            idJanela  INT auto_increment,
            pidJanela int,
            tituloJanela varchar(45),
            dtJanela datetime,
            fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
            fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
            fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
            fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
            constraint pk_composta_janela primary key (idJanela,fkMaquina, fkEmpresa,fkPlanoEmpresa,fkTipoMaquina)
        )
            """
            )
            jdbcTemplate!!.execute(
                    """
                 CREATE TABLE IF NOT EXISTS Colaborador (
           idColaborador int primary key auto_increment,
           nome varchar(45),
           email varchar(45),
           senha varchar(45),
           CPF char(14),
           fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
           fkStatus int, constraint foreign key(fkStatus) references statusColaborador(idStatusColaborador),
           fkNivelAcesso int, constraint foreign key(fkNivelAcesso) references NivelAcesso(idNivelAcesso) 
        )
            """
                    )
            jdbcTemplate!!.execute(
                """
                 CREATE TABLE IF NOT EXISTS Maquina (
            idMaquina int auto_increment,
            SO varchar(45),
            IP char(9),
            fkEmpresa int,
            constraint fk_empresa_maquina foreign key(fkEmpresa) references Empresa(idEmpresa),
            fkLocal int,
            constraint fk_local_sala_maquina  foreign key(fkLocal) references LocalSala(idLocalSala),
            fkPlanoEmpresa int,
            constraint fk_plano_empresa_maquina  foreign key(fkPlanoEmpresa) references Plano(idPlano),
            fkStatusMaquina int,
            constraint fk_status_maquina  foreign key(fkStatusMaquina) references statusMaquina(idStatusMaquina),
            fkTipoMaquina int,
            constraint fk_tipo_maquina  foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
            constraint pk_composta_maquina primary key (idMaquina, fkEmpresa, fkPlanoEmpresa, fkStatusMaquina, fkTipoMaquina)
        );
        
            """
            )





        }

}

