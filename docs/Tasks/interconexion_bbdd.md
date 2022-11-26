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

* Máquina 1 (`debian10`):

![Repo](/img/BBDD/interconexion.png)

* Máquina 2 (`oraclesito`):

![Repo](/img/BBDD/interconexion-2.png)

Para poder realizar la interconexión de ambas máquinas se realizarán cambios en el fichero `listener.ora` :

    nano /opt/oracle/product/21c/dbhomeXE/network/admin/listener.ora

Añadimos las siguientes líneas con las que se permitirán las conexiones hacia otras `IPs`:

```bash
SID_LIST_LISTENER =
 (SID_LIST =
  (SID_DESC =
   (GLOBAL_DBNAME = orcl)
   (ORACLE_HOME = /opt/oracle/product/21c/dbhomeXE)
   (SID_NAME = orcl)
  )
 )

LISTENER=
 (DESCRIPTION_LIST =
  (DESCRIPTION =
   (ADDRESS_LIST =
    (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
   )
   (ADDRESS_LIST =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 0.0.0.0)(PORT = 1521))
   )
  )
 )
```

A continuación, se crea el fichero `tnsnames.ora` donde se declarará el destino de la conexión desde la máquina `debian10` a `oraclesito`:

```bash
LISTENER_ORACLE1 =
  (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))


ORACLE1 =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = oracle1)
    )
  )

ORACLE2 =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.122.163)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )
  )
```

