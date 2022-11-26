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

* Máquina 1:

![Repo](/img/BBDD/interconexion.png)

* Máquina 2:

![Repo](/img/BBDD/interconexion-2.png)
