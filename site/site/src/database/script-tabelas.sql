-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

create database HealthTouch;
use HealthTouch;

create table Empresa(
idEmpresa int primary key auto_increment,
NomeFantasia varchar(45),
CNPJ char(18),
StatusEmpresa varchar(45),
inicioContrato date,
telFixo char(10)
-- constraint fkEmp foreign key (fkEmpresa) references empresa(idEmpresa)
);
-- ALTER TABLE funcionario MODIFY COLUMN telCel CHAR(11),	MODIFY COLUMN telFixo CHAR(10);

create table NivelAcesso(
idNivelAcesso int primary key auto_increment,
nivelAcesso char(2)
);


create table Colaborador(
idColaborador int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
CPF char(14)
);

create table Telefone(
idTelefone int primary key auto_increment,
TelCel char(11),
TelFixo char(10)
);



create table Plano(
idPlano Int primary key auto_increment,
tipoPlano varchar(20),
parametro Int
);


create table Endereco(
idEndereco int primary key auto_increment,
num int,
rua varchar(30),
bairro varchar(30),
estado varchar(30),
pais varchar(25),
CEP char(8)
);


create table Dispositivo(
idDispositivo int primary key auto_increment,
SC varchar(45),
IP char(9),
modelo varchar(45)
);



create table TipoDispositivo(
idTipoDispositivo int primary key auto_increment,
tipo varchar(45)
);

create table Local(
idLocal int primary key auto_increment,
setor varchar(45),
sala int,
andar int
);



create table USB(
idUSB int primary key auto_increment,
nomeUSB varchar(45),
qntUSB int,
dtHoraInserção datetime
);


create table Clicks(
idClicks int primary key auto_increment,
nomeBotao varchar(30),
qntClicks int
);



create table Componente(
idComponente int primary key auto_increment,
nome varchar(50)
);



create table Monitoramento(
idMonitoramento int primary key auto_increment,
porcentagem varchar (45),
dataHora datetime
);

-- adicionando as foreign key;
-- tabela colaborador
alter table Colaborador add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table Colaborador add column fkNivelAcesso int, add constraint foreign key(FkNivelAcesso) references NivelAcesso(idNivelAcesso);
-- tabela Telefone
alter table Telefone add column fkColaborador int, add constraint foreign key (fkColaborador) references Colaborador(idColaborador);
-- tabela Endereco
alter table Endereco add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
-- tabela Dispositivo
alter table Dispositivo add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table Dispositivo add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa)  references Plano(idPlano);
alter table Dispositivo add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Local
alter table Local add column fkDispositivo int, add constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo);
alter table Local add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);


alter table Local add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Local add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela USB
alter table USB add column fkDispositivo int, add constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo);
alter table USB add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table USB add column fkPlanoEmpresa int, add constraint foreign key (fkPlanoEmpresa) references Plano(idPlano);
alter table USB add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Clicks
alter table Clicks add column fkDispositivo int, add constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo);
alter table Clicks add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table Clicks add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Clicks add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Componente
alter table Componente add column fkDispositivo int, add constraint foreign key (fkDispositivo) references Dispositivo(idDispositivo);
alter table Componente add column fkEmpresaDispositivo int, add constraint foreign key(fkEmpresaDispositivo) references Empresa(idEmpresa);
alter table Componente add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Componente add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Monitoramento
alter table Monitoramento add column fkComponente int, add constraint foreign key(fkComponente) references Componente(idComponente);
alter table Monitoramento add column fkDispositivo int, add constraint foreign key (fkDispositivo)references Dispositivo(idDispositivo);
alter table Monitoramento add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Monitoramento add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
alter table Monitoramento add column fkEmpresaDispositivo int, add constraint foreign key(fkEmpresaDispositivo) references Empresa(idEmpresa);
-- fim dos foreign key

-- dando os inserts em algumas tabelas;
select * from Empresa;
Insert into Empresa values
(null,'NomeEmpresa','XX.XXX.XXX/0001-XX','Status','2023-10-02','abcd-mcdu');

insert into NivelAcesso values
(null,'AB'),
(null,'CD'),
(null,'XY');

insert into Endereco values
(null,1,'haddock Lobo','Paulista','São Paulo','Brasil',03058-010,1);

insert into Colaborador values
(null,'Kanye West','kanye.West@sptech.school','Senha1234','XXX.XXX.XXX-XX',1,1);
 desc Telefone;
insert into Telefone values
(null,'XXXXXXXXXXX','abcd-mcdu',1);

insert into Plano values
(null,'PlanoA',1);

insert into TipoDispositivo values
(null,'TipoA');

insert into Dispositivo values
(null,'Windows',123456789,'Dell',1,1,1);

insert into Local values
(null,'enfermaria',1,1,1,1,1,1);
-- teste p dash setor 

insert into Colaborador values
(null,'Anthony Bento','antony.bento@sptech.school','Senha1234','XXX.XXX.XXX-XX',1,4);
insert into Colaborador values
(null,'Yasmin Yuri','yasmin.yuri@sptech.school','Senha1234','XXX.XXX.XXX-XX',1,5);

alter table nivelacesso modify column nivelacesso varchar(50);
insert into NivelAcesso values
(null,'CEO');
insert into NivelAcesso values
(null,'linda');

insert into Local values
(null,'pediatria',2,1,1,1,1,1);

insert into componente values
(null, 'CPU', 1, 1, 1, 1);
insert into componente values
(null, 'RAM', 1, 1, 1, 1);
insert into componente values
(null, 'DISCO', 1, 1, 1, 1);

insert into monitoramento values
(null, '50%', now(), 1, 1, 1, 1, 1);

select * from monitoramento;
insert into monitoramento values
(null, '50%', now(), 1, 1, 1, 1, 1);

insert into monitoramento values
(null, '70%', now(), 2, 1, 1, 1, 1),
(null, '90%', now(), 3, 1, 1, 1, 1);

insert into monitoramento values
(null, '70%', '2023-10-04 20:06:37', 2, 1, 1, 1, 1),
(null, '90%', '2023-10-04 20:06:37', 3, 1, 1, 1, 1);

insert into usb values
(null, 'USB florinha', '1', now(), 1, 1 , 1, 1);

create table aviso(
idAviso int primary key auto_increment,
descricao varchar(50),
dtHr DATETIME DEFAULT CURRENT_TIMESTAMP
);

insert into aviso (descricao, dtHr) values
('CPU CHEGOU EM 90%', now()),
('Disco está em 70%',now()),
('USB ATIVO', now()),
('CPU CHEGOU EM 90%', now()),
('Disco está em 70%',now()),
('USB ATIVO', now());

/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE empresa (
	id INT PRIMARY KEY IDENTITY(1,1),
	razao_social VARCHAR(50),
	cnpj VARCHAR(14)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT FOREIGN KEY REFERENCES empresa(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300),
	fk_empresa INT FOREIGN KEY REFERENCES empresa(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
