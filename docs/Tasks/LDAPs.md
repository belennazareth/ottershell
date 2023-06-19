---
sidebar_position: 6
---

# LDAPs

Configura el servidor LDAP de alfa para que utilice el protocolo ldaps:// a la vez que el ldap:// utilizando el certificado x509 de la práctica de https o solicitando el correspondiente a través de gestiona. Realiza las modificaciones adecuadas en los clientes ldap de alfa para que todas las consultas se realicen por defecto utilizando ldaps://

Primero, en alfa, generamos un certificado público y privado para el servidor LDAP:

```bash
openssl genrsa 4096 > /etc/ssl/private/alfa.key
openssl req -new -key /etc/ssl/private/alfa.key -out alfa.csr
```

Saldrá algo como esto:

```bash
root@alfa:~# openssl genrsa 4096 > /etc/ssl/private/alfa.key
Generating RSA private key, 4096 bit long modulus (2 primes)
.........................................................................................................................................++++
.....................................++++
e is 65537 (0x010001)

root@alfa:~# openssl req -new -key /etc/ssl/private/alfa.key -out alfa.csr
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:ES
State or Province Name (full name) [Some-State]:Sevilla
Locality Name (eg, city) []:Dos Hermanas
Organization Name (eg, company) [Internet Widgits Pty Ltd]:IES Gonzalo Nazareno
Organizational Unit Name (eg, section) []:Informática
Common Name (e.g. server FQDN or YOUR name) []:alfa.nazareth.gonzalonazareno.org
Email Address []:belennazareth29@gmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

Después, debemos mandar el fichero `alfa.csr` a Gonzalo Nazareno (unidad certificadora) para que nos devuelvan nuestro certificado firmado y el suyo propio. Una vez lo tengamos, lo guardamos en `/etc/ssl/certs/alfa.crt`. 


Movemos el fichero ya firmado a `/etc/ssl/certs/`:

```bash
mv alfa.crt /etc/ssl/certs/
mv gonzalonazareno.crt /etc/ssl/certs/
```

Le cambiamos el propietario y el grupo:

```bash
chown root: /etc/ssl/certs/alfa.crt
chown root: /etc/ssl/certs/gonzalonazareno.crt
```

Instalamos `acl` para poder acceder a los certificados:

```bash
sudo apt install acl
```

Le damos permisos a los certificados:

```bash
setfacl -m u:openldap:r-x /etc/ssl/private
setfacl -m u:openldap:r-x /etc/ssl/private/alfa.key
getfacl /etc/ssl/private
getfacl /etc/ssl/private/alfa.key
```

De resultado, debería salir algo como esto:

```bash
root@alfa:~# getfacl /etc/ssl/private         
getfacl: Removing leading '/' from absolute path names
# file: etc/ssl/private
# owner: root
# group: root
user::rwx
user:openldap:r-x
group::---
mask::r-x
other::---

root@alfa:~# getfacl /etc/ssl/private/alfa.key 
getfacl: Removing leading '/' from absolute path names
# file: etc/ssl/private/alfa.key
# owner: root
# group: root
user::rw-
user:openldap:r-x
group::r--
mask::r-x
other::r--

root@alfa:~# 
```

Creamos un fichero `ldif` para configurar el servidor LDAP:

    nano ldap-tls.ldif

```bash
dn: cn=config
changetype: modify
replace: olcTLSCACertificateFile
olcTLSCACertificateFile: /etc/ssl/certs/gonzalonazareno.crt
-
replace: olcTLSCertificateKeyFile
olcTLSCertificateKeyFile: /etc/ssl/private/alfa.key
-
replace: olcTLSCertificateFile
olcTLSCertificateFile: /etc/ssl/certs/alfa.crt
```

Lo aplicamos:

```bash
ldapmodify -Y EXTERNAL -H ldapi:/// -f ldap-tls.ldif
```

Saldrá algo como esto:

```bash
root@alfa:~# ldapmodify -Y EXTERNAL -H ldapi:/// -f ldap-tls.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
modifying entry "cn=config"

root@alfa:~# 
```

Modificamos el fichero de slapd para que utilice el protocolo ldaps://:

    nano /etc/default/slapd

```bash
SLAPD_SERVICES="ldap:/// ldapi:/// ldaps:///"
```

Copiamos el certificado de Gonzalo Nazareno a `/usr/local/share/ca-certificates/`:

```bash
cp /etc/ssl/certs/gonzalonazareno.crt /usr/local/share/ca-certificates/
```

Actualizamos los certificados:

```bash
update-ca-certificates
```

```bash
root@alfa:~# update-ca-certificates
Updating certificates in /etc/ssl/certs...
rehash: warning: skipping duplicate certificate in gonzalonazareno.crt
1 added, 0 removed; done.
Running hooks in /etc/ca-certificates/update.d...

Adding debian:gonzalonazareno.pem
done.
done.
root@alfa:~# 
```

Reiniciamos el servicio:

```bash
systemctl restart slapd
```

Para comprobar el funcionamiento, podemos utilizar el comando `ldapsearch`:

```bash
ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org" -H ldaps://localhost:636
```

**EN LOS CLIENTES**

Copiamos el certificado de la unidad certificadora a los clientes:

```bash
scp /etc/ssl/certs/gonzalonazareno.crt pepe@{ip charlie}:

scp /etc/ssl/certs/gonzalonazareno.crt benito@{ip delta}:
```

Movemos el certificado a `/usr/local/share/ca-certificates/`:

```bash
mv gonzalonazareno.crt /usr/local/share/ca-certificates/
```

Cambiamos los permisos:

```bash
chown root: /usr/local/share/ca-certificates/gonzalonazareno.crt
```

Actualizamos los certificados:

```bash
update-ca-certificates
```

En los clientes instalamos `ldap-utils` para poder utilizar el comando `ldapsearch`:

```bash
sudo apt install ldap-utils
```

Para comprobar el funcionamiento, podemos utilizar el comando `ldapsearch`:

```bash
ldapsearch -x -b "dc=nazareth,dc=gonzalonazareno,dc=org" -H ldaps://alfa.nazareth.gonzalonazareno.org:636
```