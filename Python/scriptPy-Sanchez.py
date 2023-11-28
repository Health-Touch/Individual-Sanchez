import psutil
import time
import platform
import datetime
from mysql.connector import connect
import pymysql

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='biel2004',
    database='HealthTouch',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

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

    fkPlanoEmpresa = result['fkPlanoEmpresa']
    fkTipoMaquina = result['fkTipoMaquina']

    while True:
        print("idMaquinaInsert:", idMaquinaInsert)
        print("fkPlanoEmpresa:", fkPlanoEmpresa)
        print("fkTipoMaquina:", fkTipoMaquina)
        print("fkEmpresa:", fkEmpresa)

        uso_Ram = round(psutil.virtual_memory().percent, 2)
        data = datetime.datetime.now()

        
        
        if fkPlanoEmpresa is not None and fkTipoMaquina is not None and fkEmpresa is not None:
            query = '''
            INSERT INTO Monitoramento(porcentagem, dataHora, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
            '''
            insert = [
                uso_Ram, data, 3, idMaquinaInsert['idMaquina'], fkPlanoEmpresa, fkTipoMaquina, fkEmpresa['fkEmpresa'] 
            ]

            cursor.execute(query, insert)
            connection.commit()

            print(f"Uso da Memória: {uso_Ram}%\r\n")
        else:
            print("Algum valor do banco de dados está vazio")

        time.sleep(2)
else:
    print("Máquina não está cadastrada")
