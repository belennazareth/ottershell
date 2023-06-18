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

Después, debemos mandar el fichero `alfa.csr` a Gonzalo Nazareno (unidad certificadora) para que nos devuelvan el certificado firmado. Una vez lo tengamos, lo guardamos en `/etc/ssl/certs/alfa.crt`.