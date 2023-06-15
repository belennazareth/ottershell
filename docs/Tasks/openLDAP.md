---
sidebar_position: 6
---

# Instalación y configuración inicial de OpenLDAP

Realiza la instalación y configuración básica de OpenLDAP en alfa,utilizando como base el nombre DNS asignado. Deberás crear un usuario llamado prueba y configurar una máquina cliente basada en Debian y Rocky para que pueda validarse en el servidor ldap configurado anteriormente con el usuario prueba.

## Instalación de OpenLDAP

Para instalar OpenLDAP en alfa, ejecutamos el siguiente comando:

```bash
sudo apt update
sudo apt install slapd
```

Al instalarlo pedirá una contraseña para el administrador de la base de datos:

![Term](/img/ASO/ldapASO.png)

Después de instalarlo, comprobamos en que puerto está escuchando:

```bash
sudo netstat -tulpn | grep slapd
```

![Term](/img/ASO/ldapASO-2.png)

Una vez comprobado que se está ejecutando, podemos buscar sobre el directorio LDAP con el comando `ldapsearch` para verificar que la conexión *(con el servidor LDAP)* está permitida:

- Búsqueda de todos los registros:

```bash
ldapsearch -x -b '' -s base '(objectclass=*)' namingContexts
```

![Term](/img/ASO/ldapASO-3.png)

- Búsqueda de un registro en concreto como puede ser mi propio usuario:

```bash
ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org"
```

    Donde -x indica que se va a utilizar el modo simple de autenticación, -b indica la base de búsqueda y dc= indica el dominio de búsqueda (en este caso nazareth.gonzalonazareno.org).

![Term](/img/ASO/ldapASO-4.png)


## Configuración inicial de OpenLDAP

Para organizar la estructura de nuestro directorio LDAP, vamos a crear un fichero llamado `base.ldif` donde meteremos la configuración y la estructura de nuestro directorio:

```ldif
dn: ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: organizationalUnit
ou: Personas 

dn: ou=Grupos,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: organizationalUnit
ou: Grupos
```

- `dn` es el nombre del objeto, es decir, el nombre del contenedor.
- `objectClass` es el tipo de objeto que vamos a crear.
- `ou` es el nombre del contenedor.

En este caso, vamos a crear dos contenedores, uno para las personas y otro para los grupos.

Una vez creado el fichero, lo ejecutamos con el siguiente comando:

```bash
ldapadd -x -D "cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org" -f base.ldif -W
```

*Nota: El parámetro -W indica que se va a solicitar la contraseña del usuario administrador.

Y comprobamos que se ha creado correctamente:

```bash
ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org"
```

![Term](/img/ASO/ldapASO-5.png)

Si queremos borrarlos podemos ejecutar el siguiente comando:

```bash
ldapdelete -x -D "cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org" -W "ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org"

ldapdelete -x -D "cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org" -W "ou=Grupos,dc=nazareth,dc=gonzalonazareno,dc=org"
```

## Creación de usuarios y grupos

Para crear usuarios y grupos, vamos a crear dos ficheros, uno para los usuarios y otro para los grupos.

Para crear los grupos, creamos un fichero llamado `grupos.ldif` con el siguiente contenido:

```ldif
dn: cn=profesores,ou=Grupos,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: posixGroup
gidNumber: 10000
cn: profesores
```

Y lo ejecutamos con el siguiente comando:

```bash
ldapadd -x -D "cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org" -f grupos.ldif -W
```

Volveremos a comprobar que se ha creado correctamente:

```bash
ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org"
```

![Term](/img/ASO/ldapASO-6.png)

Para crear un usuario es necesario darle una contraseña cifrada en SHA-1 (cifrada), para ello, podemos utilizar la herramienta `slappasswd`:

```bash
root@alfa:~# slappasswd
New password: 
Re-enter new password: 
{SSHA}k7x2PexggWdDPHL7JWJ7KrPXendF44+F
root@alfa:~# 
```

Una vez cifrada la contraseña, creamos un fichero llamado `usuarios.ldif` con el siguiente contenido:

```cs
dn: uid=prueba,ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: posixAccount
objectClass: inetOrgPerson
objectClass: person
cn: prueba
uid: prueba
uidNumber: 2000
gidNumber: 10000
homeDirectory: /home/prueba
loginShell: /bin/bash
userPassword: {SSHA}k7x2PexggWdDPHL7JWJ7KrPXendF44+F
sn: prueba
mail: prueba@gmail.com
givenName: prueba
```

Y lo ejecutamos con el siguiente comando:

```bash
ldapadd -x -D "cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org" -f usuarios.ldif -W
```

Volveremos a comprobar que se ha creado correctamente:

```bash
ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org"
```

![Term](/img/ASO/ldapASO-7.png)


## Configuración de clientes LDAP


### NFS

Ahora que ya sabemos como configurar nuestro directorio LDAP, vamos a configurar el servidor NFS para que los usuarios puedan acceder a sus carpetas personales desde cualquier máquina de la red.

Instalamos `nfs-kernel-server`:

```bash
sudo apt install nfs-kernel-server -y
```

Creamos el directorio `/nfs/prueba` y le damos permiso al usuario `prueba` para que pueda acceder a él:

```bash
mkdir /nfs/prueba
chown 2000:10000 /nfs/prueba
```

Editamos el fichero `/etc/exports` y añadimos la siguiente línea:

```bash
/nfs    *(rw,sync,no_root_squash)
```

Con esto, estamos indicando que el directorio `/nfs` se va a compartir con todos los equipos de la red que se conecten al servidor NFS dentro de la red local.

- rw: indica que se va a compartir en modo lectura y escritura.
- sync: indica que se va a sincronizar el servidor NFS con el cliente.
- no_root_squash: indica que el usuario root del cliente tendrá los mismos privilegios que el usuario root del servidor.

Reiniciamos el servicio:

```bash
systemctl restart nfs-server
```

Vamos a modificar el fichero de configuración de los usuarios creado anteriormente para que el usuario `prueba` tenga su carpeta personal en el servidor NFS:

![Term](/img/ASO/ldapASO-8.png)

### Resolución de nombres

Para que el servidor LDAP pueda resolver nombres y que puedan consultar información de los usuarios, vamos a instalar:

```bash
sudo apt install libpam-ldapd nscd libnss-ldapd -y
```

- libpam-ldapd: librería para que el servidor LDAP pueda resolver nombres.
- nscd: servicio para cachear las consultas DNS.
- libnss-ldapd: librería para que el servidor LDAP pueda resolver nombres.

Durante la instalación, nos pedirá que introduzcamos la URI del servidor LDAP, el DN de búsqueda y la versión del protocolo LDAP, dejaremos todos por defecto excepto el DN de búsqueda, que lo cambiaremos por `dc=nazareth,dc=gonzalonazareno,dc=org`, en la siguiente nos pedira la cuenta para peticiones nss con privilegios de administrador, introduciremos `cn=admin,dc=nazareth,dc=gonzalonazareno,dc=org`:

![Term](/img/ASO/ldapASO-9.png)
![Term](/img/ASO/ldapASO-10.png)

Tal y como nos indica al final de la instalación, debemos modificar el fichero `/etc/nsswitch.conf` para que obtenga la información de los usuarios de LDAP:

![Term](/img/ASO/ldapASO-11.png)

```conf
passwd:         files ldap
group:          files ldap
shadow:         files ldap
gshadow:        files ldap

hosts:          files dns mymachines
networks:       files

protocols:      db files
services:       db files
ethers:         db files
rpc:            db files

netgroup:       nis
```

Reiniciamos el servicio:

```bash
systemctl restart nscd
```

Para comprobar que funciona correctamente vamos a ver si podemos obtener información del usuario `prueba`:

```bash
id prueba
```

![Term](/img/ASO/ldapASO-12.png)

E iniciamos sesión con el usuario `prueba` en el servidor NFS:

```bash
login prueba
```

*Nota: la contraseña es la que le metimos en el fichero `usuarios.ldif`.

![Term](/img/ASO/ldapASO-13.png)


### Cliente Rocky Linux

Para configurar el cliente LDAP en Rocky Linux, vamos a instalar los siguientes paquetes:

```bash
sudo dnf install openldap-clients sssd sssd-ldap oddjob-mkhomedir sssd-tools -y
```

- openldap-clients: librería para que el servidor LDAP pueda resolver nombres.
- sssd: librería para que el servidor LDAP pueda resolver nombres.
- sssd-ldap: librería para que el servidor LDAP pueda resolver nombres.
- oddjob-mkhomedir: librería para que el servidor LDAP pueda resolver nombres.
- sssd-tools: librería para que el servidor LDAP pueda resolver nombres.

Editamos el fichero de configuración PAM `/etc/pam.d/system-auth` y añadimos la siguiente línea:

```bash
...
auth        sufficient    pam_ldap.so
```

- sufficient: indica que si la autenticación es correcta, no se comprueban más módulos.
- pam_ldap.so: módulo para que el servidor LDAP pueda resolver nombres.

Modificamos el fichero `/etc/openldap/ldap.conf` y añadimos la siguiente línea:

```bash
...
BASE    dc=nazareth,dc=gonzalonazareno,dc=org
URI     ldap://alfa.nazareth.gonzalonazareno.org
```

- BASE: indica el DN de búsqueda.
- URI: indica la URI del servidor LDAP.

Para que el usuario `prueba` pueda conectarse al servidor hay que editar el fichero `/etc/pam.d/system-auth` y añadir la siguiente línea:

```bash
...
session sufficient pam_mkhomedir.so umask=0022 skel=/etc/skel
```

Comprobamos que podemos obtener información del usuario `prueba`:

```bash
ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org"
```

```bash
[root@bravo ~]# ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org"
# extended LDIF
#
# LDAPv3
# base <dc=nazareth,dc=gonzalonazareno,dc=org> with scope subtree
# filter: (objectclass=*)
# requesting: ALL
#

# nazareth.gonzalonazareno.org
dn: dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: top
objectClass: dcObject
objectClass: organization
o: nazareth.gonzalonazareno.org
dc: nazareth

# Personas, nazareth.gonzalonazareno.org
dn: ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: organizationalUnit
ou:: UGVyc29uYXMg

# Grupos, nazareth.gonzalonazareno.org
dn: ou=Grupos,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: organizationalUnit
ou: Grupos

# profesores, Grupos, nazareth.gonzalonazareno.org
dn: cn=profesores,ou=Grupos,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: posixGroup
gidNumber: 10000
cn: profesores

# prueba, Personas, nazareth.gonzalonazareno.org
dn: uid=prueba,ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org
objectClass: posixAccount
objectClass: inetOrgPerson
objectClass: person
cn: prueba
uid: prueba
uidNumber: 2000
gidNumber: 10000
homeDirectory: /nfs/prueba
loginShell: /bin/bash
sn: prueba
mail: prueba@gmail.com
givenName: prueba

# search result
search: 2
result: 0 Success

# numResponses: 6
# numEntries: 5
```

![Term](/img/ASO/ldapASO-14.png)

Incluso podemos ejecutar whoami con ldap para ver que uid tiene el usuario y como se ha conectado correctamente:

```bash
ldapwhoami -x -D 'uid=prueba,ou=Personas,dc=nazareth,dc=gonzalonazareno,dc=org' -W
```

*Nota: la contraseña es la de prueba ya que es con el usuario que nos queremos conectar.

![Term](/img/ASO/ldapASO-15.png)

Para poder loguearnos con el usuario `prueba`, instalamos ssd y sssd-ldap, como indicamos al principio de la práctica, y editamos el fichero `/etc/sssd/sssd.conf`:

```conf
[domain/default]
id_provider = ldap
autofs_provider = ldap
auth_provider = ldap
chpass_provider = ldap
ldap_uri = ldap://alfa.nazareth.gonzalonazareno.org
ldap_search_base = dc=nazareth,dc=gonzalonazareno,dc=org
ldap_id_use_start_tls = True
ldap_tls_cacertdir = /etc/openldap/cacerts
cache_credentials = True
ldap_tls_reqcert = allow

[sssd]
services = nss, pam, autofs
domains = default

[nss]
homedir_substring = /nfs/
```

Cambiamos los permisos del fichero:

```bash
chmod 600 /etc/sssd/sssd.conf
```

Reiniciamos y habilitamos el servicio:

```bash
systemctl restart sssd
systemctl enable sssd
```

Creamos el directorio `/nfs/prueba` y le cambiamos los permisos:

```bash
mkdir /nfs/prueba
chown 2000:10000 /nfs/prueba
```

Lo montamos:

```bash
nano /etc/systemd/system/nfs.mount
```

```conf
[Unit]
Description=Mount NFS share
Requires=NetworkManager.service
After=NetworkManager.service

[Mount]
What=172.16.0.1:/nfs
Where=/nfs
Options=_netdev,auto
Type=nfs

[Install]
WantedBy=multi-user.target
```

Reiniciamos el daemon y habilitamos el servicio:

```bash
systemctl daemon-reload
systemctl start nfs.mount
systemctl enable nfs.mount
```

![Term](/img/ASO/ldapASO-16.png)

**Ahora si creamos cualquier cosa dentro de /nfs/prueba se va a poder ver tanto desde alfa como desde bravo**

![Term](/img/ASO/ldapASO-17.png)