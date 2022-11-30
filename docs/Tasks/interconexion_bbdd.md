---
sidebar_position: 15
---

# Interconexión de Servidores de Bases de Datos

## Descripción de la actividad

Las interconexiones de servidores de bases de datos son operaciones que pueden ser muy útiles en diferentes contextos. Básicamente, se trata de acceder a datos que no están almacenados en nuestra base de datos, pudiendo combinarlos con los que ya tenemos.

En esta práctica veremos varias formas de crear un enlace entre distintos servidores de bases de datos.

## Puntos a tratar

Se pide:

    • Realizar un enlace entre dos servidores de bases de datos ORACLE, explicando la configuración necesaria en ambos extremos y demostrando su funcionamiento.
      

    • Realizar un enlace entre dos servidores de bases de datos Postgres, explicando la configuración necesaria en ambos extremos y demostrando su funcionamiento.
      

    • Realizar un enlace entre un servidor ORACLE y otro Postgres o MySQL empleando Heterogeneus Services, explicando la configuración necesaria en ambos extremos y demostrando su funcionamiento.


### Interconexión oracle a oracle

Tenemos dos máquinas oracle con usuarios `oracle` desde las que se realizarán las interconexiones:

* Máquina 1 (`oracle1`):

![Repo](/img/BBDD/interconexion.png)

* Máquina 2 (`oracle2`):

![Repo](/img/BBDD/interconexion-2.png)

Para poder realizar la interconexión de ambas máquinas se realizarán cambios en el fichero `listener.ora` del servidor `oracle1`:

    nano /opt/oracle/product/19c/dbhome_1/network/admin/listener.ora

Añadimos las siguientes líneas con las que se permitirán las conexiones hacia la dirección y puerto que vamos a usar:

```bash
SID_LIST_LISTENER =
 (SID_LIST =
  (SID_DESC =
   (GLOBAL_DBNAME = ORCLCDB)
   (ORACLE_HOME = /opt/oracle/product/19c/dbhome_1)
   (SID_NAME = ORCLCDB)
  )
 )

LISTENER=
 (DESCRIPTION_LIST =
  (DESCRIPTION =
   (ADDRESS_LIST =
    (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
   )
   (ADDRESS_LIST =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.122.230)(PORT = 1521))
   )
  )
 )
```

A continuación, se crea el fichero `tnsnames.ora` (en caso de que no exista) para conectarnos con el que nos vamos a enlazar:

```bash
LISTENER_ORCL =
 (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))

ORCL =
 (DESCRIPTION = 
    (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
    (CONNECT_DATA =
        (SERVER = DEDICATED)
        (SERVICE_NAME = ORCLCDB)
    )
 )

ORACLE2 =
 (DESCRIPTION =             
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.122.16)(PORT = 1521))
    (CONNECT_DATA =
        (SERVER = DEDICATED)
        (SERVICE_NAME = ORCLCDB)
    )
 )

```

Tras esto reiniciamos el servicio usando los comandos:

    lsnrctl stop
    lsnrctl start

**\* Nota:** Hay que asegurarse de que las bases de datos estén iniciadas en ambas máquinas (entramos en la base datos con `sqlplus / as sysdba` y ejecutamos `startup`) y que se este ejecutando el listener en ambas máquinas (`lsnrctl start`).

Lo siguiente será dar permisos al usuario (con `sysdba`), en este caso se llama `'nazareth'`:

    grant create database link to nazareth;

Creamos un link o enlace hacia la otra máquina entrando primero a `sqlplus` con el usuario `oracle` y creando la siguiente base de datos:

```bash
create database link enlaceoracle3
connect to nazareth identified by nazareth
using '192.168.122.16/ORCLCDB';
```

Para comprobar que funciona la interconexión se ha realizado una consulta usando el enlace creado anteriormente:

    select ename from EMP@enlaceoracle3;

![Repo](/img/BBDD/interconexion-3.png)


### Interconexión postgres a postgres

Para realizar esta interconexión se van a usar dos máquinas con postgresql instalado.

* Máquina 1 (`postgres1`):

![Repo](/img/BBDD/interconexion-4.png)

* Máquina 2 (`postgres2`):

![Repo](/img/BBDD/interconexion-5.png)


Entrando con el usuario postgres (`su postgres`; psql), se han creado en ambas máquinas una base de datos, `inter` para la máquina 1 e `inter2` para la máquina 2. Además de un usuario para cada una.

    create database inter;
    create user nazareth with password 'nazareth';
    grant all privileges on database inter to nazareth;

    create database inter2;
    create user nazareth with password 'nazareth';
    grant all privileges on database inter2 to nazareth;

Después, entrando con el usuario postgres se ha entrado en la base de datos creando la extensión dblink:

![Repo](/img/BBDD/interconexion-6.png)

Editamos el fichero de configuración de `postgres2`:

      /etc/postgresql/13/main/postgresql.conf 

Y descomentamos la línea añadiendo la ip del `postgres1`:

    listen_addresses = '192.168.122.230, localhost'


En `postgres1` y `postgres2` añadimos un nuevo registro de autentificación en el fichero:

    /etc/postgresql/13/main/pg_hba.conf 

Agregamos la línea:

```bash
# TYPE  DATABASE        USER            ADDRESS                 METHOD

host    all             all             192.168.122.9/24        md5 #en postgres1
host    all             all             192.168.122.142/24        md5 #en postgres2
```

Después de hacer cada cambio hay que reiniciar el servicio postgresql para que se ejecuten los cambios.

Por último, entramos en la base de datos `inter` y ejecutamos una consulta para comprobar que funciona el enlace:

    select * from dblink('dbname=inter2 host=192.168.122.9 user=nazareth password=nazareth', 'select * from dept') as dept (deptno integer, dname text, loc text);

![Repo](/img/BBDD/interconexion-7.png)


### Interconexión oracle a postgres

Tenemos dos máquinas:

* Máquina 1, oracle (`oracle1`):

![Repo](/img/BBDD/interconexion.png)

* Máquina 2, postgres (`postgres2`):

![Repo](/img/BBDD/interconexion-5.png)


En la máquina postgres configuramos el fichero `/etc/postgresql/13/main/pg_hba.conf ` añadiendo la ip de `oracle`:

```bash
# TYPE  DATABASE        USER            ADDRESS                 METHOD

host    all             all             192.168.122.230/24        md5
```

Y también permitiremos la conexión de la máquina `oracle` en el fichero `/etc/postgresql/13/main/postgresql.conf`:

```bash
listen_addresses  = '192.168.122.230, localhost'
```

Primero vamos a instalar en la máquina oracle el paquete odbc para permitir el acceso a postgres:

    apt install odbc-postgresql unixodbc

Con esto se creará el fichero `/etc/odbcinst.ini` con contenido:

```bash
[PostgreSQL ANSI]
Description=PostgreSQL ODBC driver (ANSI version)
Driver=psqlodbca.so
Setup=libodbcpsqlS.so
Debug=0
CommLog=1
UsageCount=1

[PostgreSQL Unicode]
Description=PostgreSQL ODBC driver (Unicode version)
Driver=psqlodbcw.so
Setup=libodbcpsqlS.so
Debug=0
CommLog=1
UsageCount=1
```

Para comprobar que la configuración este correcta se ejecutará:

    odbcinst -q -d

![Repo](/img/BBDD/interconexion-8.png)

En el fichero `/etc/odbc.ini` añadimos:

```bash
[PSQLA]
Debug = 0
CommLog = 0
ReadOnly = 1
Driver = PostgreSQL ANSI
Servername = 192.168.122.9
Username = nazareth 
Password = nazareth
Port = 5432
Database = inter2
Trace = 0
TraceFile = /tmp/sql.log

[PSQLU]
Debug = 0
CommLog = 0
ReadOnly = 0
Driver = PostgreSQL Unicode
Servername = 192.168.122.9
Username = nazareth
Password = nazareth
Port = 5432
Database = inter2
Trace = 0
TraceFile = /tmp/sql.log

[Default]
Driver = /usr/lib/x86_64-linux-gnu/odbc/liboplodbcS.so
```

Para comprobar que funciona ejecutamos:

    odbcinst -q -s

![Repo](/img/BBDD/interconexion-9.png)

Comprobamos la conexión al servidor postgres:

    isql -v PSQLU


![Repo](/img/BBDD/interconexion-10.png)


Ahora vamos a configurar el servicio de Heterogeneus Services para hacer un link en la base de datos de oracle, para ello creamos el fichero `/opt/oracle/product/19c/dbhome_1/hs/admin/initPSQLU.ora` añadiendo:

```bash
HS_FDS_CONNECT_INFO = PSQLU
HS_FDS_TRACE_LEVEL = Debug
HS_FDS_SHAREABLE_NAME = /usr/lib/x86_64-linux-gnu/odbc/psqlodbcw.so
HS_LANGUAGE = AMERICAN_AMERICA.WE8ISO8859P1
set ODBCINI=/etc/odbc.ini
```

A continuación, modificamos el fichero listener de oracle:

```bash
SID_LIST_LISTENER =
 (SID_LIST =
  (SID_DESC =
   (GLOBAL_DBNAME = ORCLCDB)
   (ORACLE_HOME = /opt/oracle/product/19c/dbhome_1)
   (SID_NAME = ORCLCDB)
  )
  (SID_DESC =
    (SID_NAME = PSQLU)
    (PROGRAM = dg4odbc)
    (ORACLE_HOME = /opt/oracle/product/19c/dbhome_1)
  )
 )
```

Y en el fichero tnsnames añadimos:

```bash
PSQLU =
 (DESCRIPTION=
 (ADDRESS=(PROTOCOL=tcp)(HOST=localhost)(PORT=1521))
   (CONNECT_DATA=(SID=PSQLU))
   (HS=OK)
 )
 ```

Después reiniciamos ejecutando `lsnrctl stop` y `lsnrctl start`. Veremos que devuelve:

    Service "PSQLU" has 1 instance(s).
    Instance "PSQLU", status UNKNOWN, has 1 handler(s) for this service...

Asignamos privilegios al usuario `'nazareth'` de oracle:

    GRANT CREATE PUBLIC DATABASE LINK to nazareth

Y creamos el link en el usuario nazareth:

```bash
CREATE PUBLIC DATABASE LINK enlacepostgres2
CONNECT TO "nazareth"
IDENTIFIED BY "nazareth"
USING 'PSQLU';
```
