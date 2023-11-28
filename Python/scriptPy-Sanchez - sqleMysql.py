import psutil
import time
import platform
import datetime
from mysql.connector import connect
import pyodbc

# Função para obter a conexão com o banco de dados
def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    return connection

def sql_server_connection(server, database, username, password):
    conn_str = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'
    connection = pyodbc.connect(conn_str)
    return connection



# Conectar ao banco de dados
connection = mysql_connection('localhost', 'root', '12345', 'HealthTouch')

sql_server_connection = sql_server_connection('54.145.218.19', 'HealthTouch', 'sa', 'urubu100')

def insert_data(connection, query, values):
    cursor = connection.cursor()
    cursor.execute(query, values)
    connection.commit()

print("Bem Vindo à Aplicação Health Touch")
email = input("Digite seu e-mail:")
senha = input("Digite sua senha:")
cursor = connection.cursor()
# puxando a fk empresa
query = "SELECT fkEmpresa FROM Colaborador WHERE email = %s AND senha = %s"
cursor.execute(query, (email, senha))
fkEmpresa = cursor.fetchone()

idMaquinaSelect = input("Qual o ID da máquina que você quer monitorar?")
query = "SELECT idMaquina FROM Maquina WHERE idMaquina = %s"
cursor.execute(query, (idMaquinaSelect,))
idMaquinaInsert = cursor.fetchone()

if idMaquinaInsert:
    print("Iniciando o Monitoramento")

    # Puxando a fkPlanoEmpresa
    query = "SELECT fkPlanoEmpresa, fkTipoMaquina FROM Maquina WHERE idMaquina = %s"
    cursor.execute(query, (idMaquinaSelect,))
    result = cursor.fetchone()

    fkPlanoEmpresa = result[0]
    fkTipoMaquina = result[0]

    while True:
        print("idMaquinaInsert:", idMaquinaInsert)
        print("fkPlanoEmpresa:", fkPlanoEmpresa)
        print("fkTipoMaquina:", fkTipoMaquina)
        print("fkEmpresa:", fkEmpresa)

        uso_Ram = round(psutil.virtual_memory().percent, 2)
        data = datetime.datetime.now()

        
         
        
        query = '''
            INSERT INTO Monitoramento(porcentagem, dataHora, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
            '''
        queryServer = '''
            INSERT INTO Monitoramento(porcentagem, dataHora, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            '''
        insert_values = [
                uso_Ram, data, 3, idMaquinaInsert[0], fkPlanoEmpresa, fkTipoMaquina, fkEmpresa[0] 
            ]

        insert_values_sql_server = [
                uso_Ram, data, 3, idMaquinaInsert[0], fkPlanoEmpresa, fkTipoMaquina, fkEmpresa[0] 
            ]
            
        insert_data(sql_server_connection, queryServer, insert_values_sql_server)

            # Criar cursor
        cursor = connection.cursor()

            # Executar a query
        cursor.execute(query, insert_values)
        connection.commit()

        print(f"Uso da Memória: {uso_Ram}%\r\n")
       

        time.sleep(2)
else:
    print("Máquina não está cadastrada")
