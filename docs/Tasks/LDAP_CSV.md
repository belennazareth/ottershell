---
sidebar_position: 6
---

# Poblar un directorio LDAP desde un fichero CSV

Crear entre todos los alumnos de la clase que vayan a hacer esta tarea un `fichero CSV` que incluya información personal de cada uno incluyendo los siguientes datos:

- Nombre
- Apellidos
- Dirección de correo electrónico
- Nombre de usuario
- Clave pública ssh

Añadir otro fichero con la información de las máquinas de los alumnos:

- Hostname
- IPv4
- clave pública ssh de la máquina

Añadir el esquema `openssh-lpk` al directorio para poder incluir claves públicas ssh en un directorio LDAP.

Hacer un script en bash o en python que utilice el fichero como entrada y pueble el directorio LDAP con un objeto para cada alumno utilizando los ObjectClass `posixAccount` e `inetOrgPerson`.

Configurar el sistema para que sean válidos los usuarios del LDAP.

Configurar el servicio ssh para que permita acceder a los usuarios del LDAP utilizando las claves públicas que hay allí, en lugar de almacenarlas en `.ssh/authorized_keys`, que sólo permita acceder a los equipos que estén en el LDAP en lugar del fichero `.ssh/known_hosts` y que se cree el directorio `"home"` al vuelo.


## Fichero CSV

E