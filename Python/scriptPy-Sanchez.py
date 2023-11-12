import psutil
import time
import platform
import datetime
from mysql.connector import connect

conn = connect(
    host='localhost',
    user='root',
    password='biel2004',
    database='HealthTouch'
)

print("Bem Vindo à Aplicação Health Touch")
email = input("Digite seu e-mail:")
senha = input("Digite sua senha:")
cursor = conn.cursor()
# puxando a fk empresa
query = "SELECT fkEmpresa FROM Colaborador WHERE email = %s AND senha = %s"
cursor.execute(query, (email, senha))
fkEmpresa = cursor.fetchone()

def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    return connection
    
connection = mysql_connection('localhost', 'root', 'biel2004', 'HealthTouch')

idMaquinaSelect = input("Qual o ID da máquina que você quer monitorar?")
query = "SELECT idMaquina FROM Maquina WHERE idMaquina = %s"
cursor.execute(query, (idMaquinaSelect,))
idMaquinaInsert = cursor.fetchone()

if idMaquinaInsert:
    print("Iniciando o Monitoramento")

    # Puxando a fkPlanoEmpresa
    query = "SELECT fkPlanoEmpresa FROM Maquina WHERE idMaquina = %s"
    cursor.execute(query, (idMaquinaSelect,))
    fkPlanoEmpresa = cursor.fetchone()

    # Puxando a fkTipoMaquina
    query = "SELECT fkTipoMaquina FROM Maquina WHERE idMaquina = %s"
    cursor.execute(query, (idMaquinaSelect,))
    fkTipoMaquina = cursor.fetchone()

    while True:
        uso_Ram = round(psutil.virtual_memory().percent,2)
        data = datetime.datetime.now()

        query = '''
        insert into Monitoramento(porcentagem, dataHora, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
        '''
        insert = [
            uso_Ram, data, 3, idMaquinaInsert[0], fkPlanoEmpresa[0], fkTipoMaquina[0], fkEmpresa[0]
        ]
        #[0] pra vir o dado especifico( Só o numero)

        cursor = connection.cursor()
        cursor.execute(query, insert)
        connection.commit()

        print(f"Uso da Memória: {uso_Ram}%\r\n")

        time.sleep(2)

else:
    print("Máquina não está cadastrada")
