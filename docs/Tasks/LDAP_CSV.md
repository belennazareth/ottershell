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

Debemos crear un fichero CSV con la información de los alumnos. Para ello, podemos utilizar la siguiente plantilla:

```csv
<!-- Nombre,Apellidos,Correo,Usuario,Clave pública -->

Benito,Martinez,benitoporfa@gmail.com,benito,ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDV+bGsINuRN5PH+ylMp6mHjNr7xIxqxza13dJDgzK2tUtotC1OTQJ7gH5pGpMRh90+8EwtLZUFl+pGNxPyFW6QuXW9IJygyHimrQtOrFUkSenkL/nBIVaRWErwdb7mgIpExpHMMwXDksFIUvsjD1TNVVV6mjFr9CGv2m44v9+laNSw9tRRdMQXVPsLIl52E4m035eUu3V7pjOHXB0HGQOMSRI6RYRLl3yrOaqYjq7uIuWeDsUD6krpEF+rW4DYpj5+C1exsKMlwQMAGB6EZ8e43NfDhrsgw7nGKRYbGRBHFhDmVS0AuHB0ewd18vVuyWaJGhu3qpNXimHiodEWcpmjjepOV2cY68G1RqMDVHY3DZ+V7nxkVb4VJlMUIkyixcULcNgmKDKji3bUuIvayEiVI+nnNHwYbGD8knaf8PhcE00PSZdNFihVaeiUzXJLUUXXl5E0YF5Ef0F/i+0gDt22ZJWkk0z1U7w4VDYWGKTa6qiMEensscLTpWRb9PhG0yc= benito@delta

Pepe,Ejemplo,pepeapruebame@gmail.com,pepe,ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDCJSZC7mb/m9zJkKJ2OMABtEP1hWvUzRx/fjrRylzEME6DvdMmZYzGxmA+r4xbvBhpB0Ypx0Kk7hJXBciZdzHVxHdeSLNpGw+YyGmn3f7ygDvsWGwXi4xbPAthUQuEWswGu/N+9uAYkAKJTiOkuvVmdbq8zVApvlEsptVyaUG4RNhsgP0bCAD3STWdkBlW9NvZbkBvDIPktmuHncKshQmjd4ZjlS7ApzqgfjlM/hFnx6gaybIE2hFaeLS2yLkeeISUoWpSlDejh9+HC7WIc2mcxRypHwN3pDO9qOzGjwY3RDvttG7YxhUsu+t3dBU/rr7HqqGfbuf4ulhbh+dG0phH8HQ2t1AX4H+Vs1FaFkk5PuLdWKPkm22Pe1j1Vd5TtTXwfMx2NG+n64jmVychAQs5bMIWDKVxk14RUwvxb8mU4f5DHeKNQf/jWk1oP3mzVBcwe+pP/dBfdcsn0E42m0aROaJTCcH93ECDURAcAv/Fb/tbnB0uJhI5fGXkPLo2ZI0= pepe@charlie
```

## Añadir el esquema `openssh-lpk`

Para añadir el esquema `openssh-lpk` al directorio, creamos un fichero `openssh-lpk.ldif` con el siguiente contenido:

    nano /etc/ldap/schema/openssh-lpk.ldif

```ldif
dn: cn=openssh-lpk,cn=schema,cn=config
objectClass: olcSchemaConfig
cn: openssh-lpk
olcAttributeTypes: ( 1.3.6.1.4.1.24552.500.1.1.1.13 NAME 'sshPublicKey'
  DESC 'MANDATORY: OpenSSH Public key'
  EQUALITY octetStringMatch
  SYNTAX 1.3.6.1.4.1.1466.115.121.1.40 )
olcObjectClasses: ( 1.3.6.1.4.1.24552.500.1.1.2.0 NAME 'ldapPublicKey' SUP top AUXILIARY
  DESC 'MANDATORY: OpenSSH LPK objectclass'
  MAY ( sshPublicKey $ uid )
  )
```

Y lo añadimos al directorio:

    ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/openssh-lpk.ldif

Dará como resultado:

```bash
root@alfa:/home/nazare# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/openssh-lpk.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=openssh-lpk,cn=schema,cn=config"
```

Vamos a crear un grupo de usuarios llamado `alumnos`:

    nano alumnos.ldif

```ldif
dn: cn=alumnos,ou=Grupos,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: posixGroup
gidNumber: 10001
cn: alumnos
```

Y lo añadimos al directorio:

    ldapadd -x -D cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org -W -f alumnos.ldif

Podemos comprobarlo con:

    ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org"


## Script en python

Creamos e iniciamos el entorno virtual:

    apt install python3-venv
    python3 -m venv ldap-venv
    source ldap-venv/bin/activate

Instalamos las librerías necesarias:

    pip install python3-ldap
    pip install ldap3==2.6

Creamos un script en python que nos permita añadir los usuarios al directorio LDAP. Para ello, creamos el fichero `ldap.py` con el siguiente contenido:

    nano ldap.py

```python
#!/usr/bin/env python

import ldap3
from ldap3 import Connection, ALL
from getpass import getpass
from sys import exit

# Shell para los usuarios
shell = '/bin/bash'

# Ruta del directorio home de los usuarios
home_dir = '/home/ldap-users/'

# UID inicial para los usuarios
uid_number = 2001

# El GID del grupo de usuarios
gid = 10001

# Leemos el fichero .csv de los usuarios y guardamos cada linea en una lista.
with open('alumnos.csv', 'r') as usuarios:
  usuarios = usuarios.readlines()


### Parametros para la conexion
ldap_ip = 'ldap://alfa.nazareth.gonzalonazareno.org:389'
dominio_base = 'dc=nazareth,dc=gonzalonazareno,dc=org'
user_admin = 'admin' 
contrasena = getpass('Contrasena LDAP admin: ')

# Intenta realizar la conexion.
conn = Connection(ldap_ip, 'cn={},{}'.format(user_admin, dominio_base),contrasena)

# conn.bind() devuelve "True" si se ha establecido la conexion y "False" en caso contrario.

# Comprueba si se ha establecido la conexion.
if not conn.bind():
  print('No se ha podido conectar con ldap') 
  if conn.result['description'] == 'invalidCredentials':
    print('Credenciales no validas.')
  # Termina el script.
  exit(0)

# Recorre la lista de usuarios
for user in usuarios:
  # Separa los valores del usuario usando como delimitador ",", y asigna cada valor a la variable correspondiente.
  user = user.split(',')
  cn = user[0]
  sn = user[1]
  mail = user[2]
  uid = user[3]
  ssh = user[4]

  #Anade el usuario.
  conn.add(
    'uid={},ou=Personas,{}'.format(uid, dominio_base),
    object_class = 
      [
      'inetOrgPerson',
      'posixAccount', 
      'ldapPublicKey'
      ],
    attributes =
      {
      'cn': cn,
      'sn': sn,
      'mail': mail,
      'uid': uid,
      'uidNumber': str(uid_number),
      'gidNumber': str(gid),
      'homeDirectory': '{}{}'.format(home_dir,uid),
      'loginShell': shell,
      'sshPublicKey': str(ssh)
      })

  if conn.result['description'] == 'entryAlreadyExists':
    print('El usuario {} ya existe.'.format(uid))

  # Aumenta el contador para asignar un UID diferente a cada usuario (cada vez que ejecutemos el script debemos asegurarnos de ante mano que no existe dicho uid en el directorio ldap, o se solaparian los datos)
  uid_number += 1

#Cierra la conexion.
conn.unbind()
```

Y lo ejecutamos:

    python3 ldap.py


Para borrar las entradas:

    ldapdelete -x -D cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org -W "uid=nazare,ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org"


Si ejecutamos una búsqueda dará como salida:

```bash
# alumnos, Grupos, nazareth.gonzalonazareno.org
dn: cn=alumnos,ou=Grupos,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: posixGroup
gidNumber: 10001
cn: alumnos

# nazare, Personas, nazareth.gonzalonazareno.org
dn: uid=nazare,ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org
cn: Belen
sn: Duran
mail: belenn.457@gmail.com
uid: nazare
uidNumber: 2001
gidNumber: 10001
homeDirectory: /home/ldap-users/nazare
loginShell: /bin/bash
sshPublicKey:: c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCZ1FEQXFhRlFGTGh
 4bjNEd2VrL2h5UlhSSjZlaWxhbXJPSzlOUklFN1FyYmg4S0RISEFlOElNbXlaSno0YkROWlRTd29T
 NlNwOWtMYUlFR2ZCMWU4VEpnWTNwL05PSjEvWHVObFpmcGpxQXRaWDNoL2FNUHNxM1FtZXkvMnRQQ
 zgrc3NmOXNCREMzekpEVkNCeUJvQ2crRmFxcUtiSVRmUGE4OWV1K2cxaWZDci8xem5EZlJkamRUS0
 5aTmtlUWNBbklUQks5SGF6bXpiN1F2eWZSOGVEMThvckFJbnNCWkRzM2JndGU4WlpBSjNPcGI4dVU
 ySkxIaU8vT1lrcDFveVU4RXZsTkc4ZmtaWmNQeWMyUGJvajkvYlFacnNDOVo5eENyU0pzWUg5N0Nu
 QUtiY3p5NFNCdmtiUWl6UHAxODVtV1FIbTZlU2ttczJNNDhnTGRJRTRDUHVGYzBiM2MxdytzYThrW
 Xhsa2cxUnNjeE5RajdLTk85NnErd0dyNVRCN0lFREY1SU5QakFnV1VFd2t2b2F2VVJvSXlxdXYvVl
 lLamhaZWg5RHkzTGRWZ0VaSDlUbjFOUUJta0tVUEU4Wlg0TlhUQkVpOVNxc3RoekRRb0grdTM3ZjZ
 Nckx6V3pzQnlraTc3VXAxRkMxT2J1N0VpMkRkZU52YzN6MHlQenpzUlU9IG5hemFyZUBkZWx0YQo=
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: ldapPublicKey

# pepe, Personas, nazareth.gonzalonazareno.org
dn: uid=pepe,ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org
cn: Pepe
sn: Ejemplo
mail: pepeapruebame@gmail.com
uid: pepe
uidNumber: 2002
gidNumber: 10001
homeDirectory: /home/ldap-users/pepe
loginShell: /bin/bash
sshPublicKey:: c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCZ1FEQ0pTWkM3bWI
 vbTl6SmtLSjJPTUFCdEVQMWhXdlV6UngvZmpyUnlsekVNRTZEdmRNbVpZekd4bUErcjR4YnZCaHBC
 MFlweDBLazdoSlhCY2laZHpIVnhIZGVTTE5wR3crWXlHbW4zZjd5Z0R2c1dHd1hpNHhiUEF0aFVRd
 UVXc3dHdS9OKzl1QVlrQUtKVGlPa3V2Vm1kYnE4elZBcHZsRXNwdFZ5YVVHNFJOaHNnUDBiQ0FEM1
 NUV2RrQmxXOU52WmJrQnZESVBrdG11SG5jS3NoUW1qZDRaamxTN0FwenFnZmpsTS9oRm54NmdheWJ
 JRTJoRmFlTFMyeUxrZWVJU1VvV3BTbERlamg5K0hDN1dJYzJtY3hSeXBId04zcERPOXFPekdqd1kz
 UkR2dHRHN1l4aFVzdSt0M2RCVS9ycjdIcXFHZmJ1ZjR1bGhiaCtkRzBwaEg4SFEydDFBWDRIK1ZzM
 UZhRmtrNVB1TGRXS1BrbTIyUGUxajFWZDVUdFRYd2ZNeDJORytuNjRqbVZ5Y2hBUXM1Yk1JV0RLVn
 hrMTRSVXd2eGI4bVU0ZjVESGVLTlFmL2pXazFvUDNtelZCY3dlK3BQL2RCZmRjc24wRTQybTBhUk9
 hSlRDY0g5M0VDRFVSQWNBdi9GYi90Ym5CMHVKaEk1ZkdYa1BMbzJaSTA9IHBlcGVAY2hhcmxpZQo=
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: ldapPublicKey

# search result
search: 2
result: 0 Success

# numResponses: 9
# numEntries: 8
```

## Validación de usuarios

Para esto, los clientes, deben de añadir en el fichero `/etc/ldap/ldap.conf` la siguiente línea:

```bash
BASE dc=nazareth,dc=gonzalonazareno,dc=org
URI ldap://alfa.nazareth.gonzalonazareno.org
```

## Configuración ssh

Para que los clientes se puedan conectar por ssh sin usar `.ssh/known_hosts` y usando las claves públicas de LDAP, es decir, que solo se permita si el usuario está en LDAP, ejecutamos el siguiente comando en el servidor:

```bash
echo "session    required        pam_mkhomedir.so" >> /etc/pam.d/common-session
```

- `pam_mkhomedir.so` crea el directorio home del usuario si no existe.
- `common-session` es el fichero de configuración de PAM que se encarga de crear el directorio home del usuario.

Creamos un script (`sshkey-search.sh`) en /opt (ya que es tiene que ser un directorio que pueda ejecutar ssh desde el cliente) que busque las claves públicas de los usuarios en LDAP:

```bash
#!/bin/bash

# Script para buscar las claves públicas de los usuarios en LDAP

ldapsearch -x -u -LLL -o ldif-wrap=no '(&(objectClass=posixAccount)(uid='"$1"'))' -b "dc=nazareth,dc=gonzalonazareno,dc=org" 'sshPublicKey' | sed -n 's/^[ \t]*sshPublicKey::[ \t]*\(.*\)/\1/p' | base64 -d
```

- `ldapsearch -x -u -LLL -o ldif-wrap=no '(&(objectClass=posixAccount)(uid='"$1"'))' 'sshPublicKey'` busca en LDAP las claves públicas de los usuarios.
- `-b "dc=nazareth,dc=gonzalonazareno,dc=org"` busca en el dominio LDAP.
- `sed -n 's/^[ \t]*sshPublicKey::[ \t]*\(.*\)/\1/p'` elimina la cabecera de la clave pública.
- `base64 -d` decodifica la clave pública.

Damos permisos:

    chmod 755 /opt/sshkey-search.sh

Ejecutamos el script:

    /opt/sshkey-search.sh pepe

```bash
(ldap-venv) root@alfa:~# ./sshkey-search.sh pepe
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDCJSZC7mb/m9zJkKJ2OMABtEP1hWvUzRx/fjrRylzEME6DvdMmZYzGxmA+r4xbvBhpB0Ypx0Kk7hJXBciZdzHVxHdeSLNpGw+YyGmn3f7ygDvsWGwXi4xbPAthUQuEWswGu/N+9uAYkAKJTiOkuvVmdbq8zVApvlEsptVyaUG4RNhsgP0bCAD3STWdkBlW9NvZbkBvDIPktmuHncKshQmjd4ZjlS7ApzqgfjlM/hFnx6gaybIE2hFaeLS2yLkeeISUoWpSlDejh9+HC7WIc2mcxRypHwN3pDO9qOzGjwY3RDvttG7YxhUsu+t3dBU/rr7HqqGfbuf4ulhbh+dG0phH8HQ2t1AX4H+Vs1FaFkk5PuLdWKPkm22Pe1j1Vd5TtTXwfMx2NG+n64jmVychAQs5bMIWDKVxk14RUwvxb8mU4f5DHeKNQf/jWk1oP3mzVBcwe+pP/dBfdcsn0E42m0aROaJTCcH93ECDURAcAv/Fb/tbnB0uJhI5fGXkPLo2ZI0= pepe@charlie
```

Modificamos el fichero `/etc/ssh/sshd_config` para que use el script:

```bash
AuthorizedKeysCommand /opt/sshkey-search.sh
AuthorizedKeysCommandUser nobody
```

Reiniciamos el servicio:

    systemctl restart sshd

## Comprobación


* Charlie:

```bash
ssh pepe@alfa
```

![Term](/img/ASO/ldapCSVASO.png)

* Delta:

```bash
ssh benito@alfa
```

![Term](/img/ASO/ldapCSVASO-2.png)

Desde el servidor:

![Term](/img/ASO/ldapCSVASO-3.png)

![Term](/img/ASO/ldapCSVASO-4.gif)

*Nota: cada usuario tiene que tener en el /etc/host el nombre del servidor y su IP.