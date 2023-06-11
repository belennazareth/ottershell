---
sidebar_position: 21
---

# Servidor de correos

Instala y configura de manera adecuada el servidor de correos en tu VPS. El nombre del servidor de correo será mail.tudominio.es (este es el nombre que deberá aparecer en el registro MX).


## Gestión de correos desde el servidor

El envío y recepción se hará desde el servidor usando la herramienta mail.

* **Tarea 1:** Documenta una prueba de funcionamiento, donde envíes desde tu servidor local al exterior. Muestra el log donde se vea el envío. Muestra el correo que has recibido. Muestra el registro SPF.
----------------------------------------------------------------------------

Instalamos postfix en la VPS:

    $ sudo apt install postfix

Y bsd-mailx para poder enviar correos desde la VPS:

    $ sudo apt install bsd-mailx

En la VPS añado un registro MX para que apunte a mail.ottershell.es. Compruebo que el registro MX está bien configurado:

    $ dig MX ottershell.es

![Postfix](/img/SRI+HLC/correoSRI6.png)

Añado el puerto 25 al firewall de la VPS.
Y el DNS inverso a `buizel.ottershell.es`

Aquí se puede ver el el mensaje que se ha enviado desde la VPS a mi correo personal y los logs de mail:

![Postfix](/img/SRI+HLC/correoSRI6-2.png)
![Postfix](/img/SRI+HLC/correoSRI6-3.png)

Obtenemos de registro SPF:

![Postfix](/img/SRI+HLC/correoSRI6-4.png)


* **Tarea 2:** Documenta una prueba de funcionamiento, donde envíes un correo desde el exterior (gmail, hotmail,…) a tu servidor local. Muestra el log donde se vea el envío. Muestra cómo has leído el correo. Muestra el registro MX de tu dominio.
----------------------------------------------------------------------------

Para esto voy a responder al correo recibido en la tarea anterior desde mi correo personal a la VPS:

![Postfix](/img/SRI+HLC/correoSRI6-5.png)

Para leer el correo desde la VPS:

    $ mail

![Postfix](/img/SRI+HLC/correoSRI6-6.png)
![Postfix](/img/SRI+HLC/correoSRI6-7.png)

Aquí vemos el log de mail:

![Postfix](/img/SRI+HLC/correoSRI6-8.png)

En el ejercicio anterior se explica el registro MX de mi dominio, como se puede ver en la imagen siguiente al hacer un dig MX a mi dominio:

![Postfix](/img/SRI+HLC/correoSRI6-9.png)


## Uso de alias y redirecciones

* **Tarea 3:** Uso de alias y redirecciones.

Vamos a comprobar como los procesos del servidor pueden mandar correos para informar sobre su estado. Por ejemplo cada vez que se ejecuta una tarea cron podemos enviar un correo informando del resultado. Normalmente estos correos se mandan al usuario `root` del servidor, para ello:

    $ crontab -e

E indico donde se envía el correo:

    MAILTO = root

Puedes poner alguna tarea en el cron para ver como se mandan correo.

Posteriormente usando alias y redirecciones podemos hacer llegar esos correos a nuestro correo personal.

Configura el cron para enviar correo al usuario `root`. Comprueba que están llegando esos correos al root. Crea un nuevo alias para que se manden a un usuario sin privilegios. Comprueba que llegan a ese usuario. Por último crea una redirección para enviar esos correos a tu correo personal (gmail,hotmail,…).
----------------------------------------------------------------------------

Para configurar el cron para enviar correos al usuario root:

    $ crontab -e
    MAILTO = root

Vamos a poner una tarea para ver como se mandan correos:

    MAILTO = root
    * * * * * echo "Hola caracolas :)"

Comprobamos que llegan los correos al root:

    mail

![Postfix](/img/SRI+HLC/correoSRI6-10.png)
![Postfix](/img/SRI+HLC/correoSRI6-11.png)


Creamos un nuevo alias para que se manden a un usuario sin privilegios:

    $ sudo nano /etc/aliases
        root: poke

Actualizamos los cambios:

    $ sudo newaliases

Comprobamos que llegan los correos al usuario poke:

    $ mail

![Postfix](/img/SRI+HLC/correoSRI6-12.png)
![Postfix](/img/SRI+HLC/correoSRI6-13.png)

Por último creamos un fichero que hara de redirección para enviar esos correos a mi correo personal:

    $ nano /home/poke/.forward

Dentro del fichero escribimos el correo personal.

Comprobamos que llegan los correos a mi correo personal:

![Postfix](/img/SRI+HLC/correoSRI6-14.png)
![Postfix](/img/SRI+HLC/correoSRI6-15.png)


## Para asegurar el envío

* **Tarea 4 (No obligatoria):** Configura de manera adecuada DKIM es tu sistema de correos. Comprueba el registro DKIM en la página https://mxtoolbox.com/dkim.aspx. Configura postfix para que firme los correos que envía. Manda un correo y comprueba la verificación de las firmas en ellos.

Instalamos opendkim:

    $ sudo apt install opendkim opendkim-tools -y

Editamos el fichero de configuración:

    $ sudo nano /etc/opendkim.conf

Modificamos la siguiente línea:

```c
Domain                  ottershell.es
Selector                default
KeyFile                 /etc/opendkim/keys/ottershell.es/default.private
Socket                  local:/var/spool/postfix/opendkim/opendkim.sock
PidFile                 /run/opendkim/opendkim.pid
TrustAnchorFile         /usr/share/dns/root.key
```

Añadimos el socket:

    $ sudo nano /etc/default/opendkim

```c
SOCKET=local:/var/spool/postfix/opendkim/opendkim.sock
```

Editamos el fichero de configuración de postfix:

    $ sudo nano /etc/postfix/main.cf

```c
milter_default_action = accept
milter_protocol = 6
smtpd_milters = local:/opendkim/opendkim.sock
non_smtpd_milters = $smtpd_milters
```

Creamos el directorio de las claves:

    sudo mkdir /etc/opendkim/keys/ottershell.es
    cd /etc/opendkim/keys/ottershell.es
    opendkim-genkey -d ottershell.es -D /etc/opendkim/keys/ottershell.es -s mail-dkim -v

Hacemos un cat del fichero default.txt y copiamos el contenido:

    $ cat default.txt

Con esto creamos el registro TXT en el DNS de nuestro dominio:

Entrada: `mail-dkim._domainkey.ottershell.es`
Tipo: `TXT`
Valor:  `v=DKIM1;h=sha256;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppoCIzH/ycc4rS6L4VRU4FAgMyO+HitduBsRWDU1k1C25xRoCj631XdbiODKdf6NfSzcwbHBTRlfc2GY85rD+rtuRG4jvGd6OmnVjs690bVzT+nlhix5fxO4FuxgFxU9Q7DB9Nwan8Cjol+94cfkc1aCqN+zcrtLcDxmp400x783mia/todUZT+5dKCDqeuP3UheQTKWVTyqXuEcYurKMiRPGBG0ePodKiOn/I6WUJXz6/r8k6Rr/KKvfOoccM3q6/tn9Zryp3YDgINK6MXd1LTz/dSbaGj51ZhPLQAzziUhJepQL0GwjgQCi9Z/UHc3jfVfsYxp3L+QoGzCaCuo6wIDAQAB`

![Postfix](/img/SRI+HLC/correoSRI6-16.png)


## Para luchar contra el SPAM

* **Tarea 5 (No obligatorio):** Configura de manera adecuada Postfix para que tenga en cuenta el registro SPF de los correos que recibe. Muestra el log del correo para comprobar que se está haciendo el testeo del registro SPF.

* **Tarea 6 (No obligatoria):** Configura un sistema antispam. Realiza comprobaciones para comprobarlo.

* **Tarea 7 (No obligatoria):** Configura un sistema antivirus. Realiza comprobaciones para comprobarlo.

## Gestión de correos desde un cliente

* **Tarea 8:** Configura el buzón de los usuarios de tipo Maildir. Envía un correo a tu usuario y comprueba que el correo se ha guardado en el buzón Maildir del usuario del sistema correspondiente. Recuerda que ese tipo de buzón no se puede leer con la utilidad mail.

Cambiamos a cambiar el tipo de buzón:

    $ sudo nano /etc/postfix/main.cf

```c
home_mailbox = Maildir/
```

Instalamos el cliente de correo:

    $ sudo apt install mutt -y
    $ sudo systemctl restart postfix

Configuramos el cliente de correo:

    $ nano ~/.muttrc

```c
set mbox_type=Maildir
set mbox="~/Maildir"
set folder="~/Maildir"
set spoolfile="~/Maildir"
set record="+.Sent"
set postponed="+.Drafts"
set mask="!^\\.[^.]"
```

Comprobamos que funciona enviando un correo y verificando que se guarda en el buzón:

    mutt

![Postfix](/img/SRI+HLC/correoSRI6-17.png)
![Postfix](/img/SRI+HLC/correoSRI6-18.png)

Si vemos el directorio Maildir vemos que se han creado los directorios necesarios:

![Postfix](/img/SRI+HLC/correoSRI6-19.png)


* **Tarea 9:** Instala configura `dovecot` para ofrecer el protocolo IMAP. Configura dovecot de manera adecuada para ofrecer autentificación y cifrado.

Para realizar el cifrado de la comunicación crea un certificado en LetsEncrypt para tu dominio mail.tudominio.es. Recuerda que para ofrecer el cifrado tiene varias soluciones:

- IMAP con STARTTLS: STARTTLS transforma una conexión insegura en una segura mediante el uso de SSL/TLS. Por lo tanto usando el mismo puerto 143/tcp tenemos cifrada la comunicación.

- IMAPS: Versión segura del protocolo IMAP que usa el puerto 993/tcp.

- Ofrecer las dos posibilidades.

Elige una de las opciones anterior para realizar el cifrado. Y muestra la configuración de un cliente de correo (evolution, thunderbird, …) y muestra como puedes leer los correos enviado a tu usuario.

----------------------------------------------------------------------------

Instalamos dovecot:

    $ sudo apt install dovecot-imapd -y

Creamos el certificado:

    $ sudo certbot certonly --standalone -d mail.ottershell.es

Editamos el fichero de configuración:

    $ sudo nano /etc/dovecot/conf.d/10-ssl.conf

```c
ssl_cert = </etc/letsencrypt/live/mail.ottershell.es/fullchain.pem
ssl_key = </etc/letsencrypt/live/mail.ottershell.es/privkey.pem
```

Editamos el fichero de configuración de correo:

    $ sudo nano /etc/dovecot/conf.d/10-mail.conf

```c
mail_location = maildir:~/Maildir
```

Reiniciamos el servicio:

    $ sudo systemctl restart dovecot

Abrimos el puerto 993 en el firewall de la VPS.


* **Tarea 10 (No obligatoria):** Instala un webmail (roundcube, horde, rainloop) para gestionar el correo del equipo mediante una interfaz web. Muestra la configuración necesaria y cómo eres capaz de leer los correos que recibe tu usuario.

* **Tarea 11:** Configura de manera adecuada postfix para que podamos mandar un correo desde un cliente remoto. La conexión entre cliente y servidor debe estar autentificada con SASL usando dovecor y además debe estar cifrada. Para cifrar esta comunicación puedes usar dos opciones:

- ESMTP + STARTTLS: Usando el puerto 567/tcp enviamos de forma segura el correo al servidor.
- SMTPS: Utiliza un puerto no estándar (465) para SMTPS (Simple Mail Transfer Protocol Secure). No es una extensión de smtp. Es muy parecido a HTTPS.

Elige una de las opciones anterior para realizar el cifrado. Y muestra la configuración de un cliente de correo (evolution, thunderbird, …) y muestra como puedes enviar los correos.

----------------------------------------------------------------------------

Modificamos el fichero de configuración:

    $ sudo nano /etc/postfix/main.cf

```c
smtpd_tls_cert_file = /etc/letsencrypt/live/ottershell.es/fullchain.pem
smtpd_tls_key_file = /etc/letsencrypt/live/ottershell.es/privkey.pem

smtpd_sasl_auth_enable = yes
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_authenticated_header = yes
broken_sasl_auth_clients = yes
```

Editamos el fichero master.cf:

    $ sudo nano /etc/postfix/master.cf

```c
submission inet n       -       y       -       -       smtpd
  -o content_filter=spamassassin
  -o syslog_name=postfix/submission
  -o smtpd_tls_security_level=encrypt
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_tls_auth_only=yes
  -o smtpd_reject_unlisted_recipient=no
  -o smtpd_client_restrictions=$mua_client_restrictions
  -o smtpd_helo_restrictions=$mua_helo_restrictions
  -o smtpd_sender_restrictions=$mua_sender_restrictions
  -o smtpd_recipient_restrictions=
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING

smtps     inet  n       -       y       -       -       smtpd
  -o syslog_name=postfix/smtps
  -o smtpd_tls_wrappermode=yes
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_reject_unlisted_recipient=no
  -o smtpd_client_restrictions=$mua_client_restrictions
  -o smtpd_helo_restrictions=$mua_helo_restrictions
  -o smtpd_sender_restrictions=$mua_sender_restrictions
  -o smtpd_recipient_restrictions=
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
```

Editamos el fichero de configuración de dovecot:

    $ sudo nano /etc/dovecot/conf.d/10-master.conf

```c
service auth {
  ...
  # Postfix smtp-auth
  unix_listener /var/spool/postfix/private/auth {
    mode = 0666
  }
  ...
}
```

En la VPS abrimos los puertos 465 y el 993 que es el que abrimos en la actividad anterior.
Reinicamos el servicio:

    $ sudo systemctl restart postfix
    $ sudo systemctl restart dovecot

Entramos en evolution y configuramos la cuenta de correo (editar>preferencias>cuentas>añadir):

![Postfix](/img/SRI+HLC/correoSRI6-20.png)
![Postfix](/img/SRI+HLC/correoSRI6-21.png)
![Postfix](/img/SRI+HLC/correoSRI6-22.png)
![Postfix](/img/SRI+HLC/correoSRI6-23.png)

Envío un correo del exterior a mi cuenta de correo en la VPS:

![Postfix](/img/SRI+HLC/correoSRI6-24.png)



* **Tarea 12 (No obligatoria):** Configura el cliente webmail para el envío de correo. Realiza una prueba de envío con el webmail.

## Comprobación final

* **Tarea 13:** Prueba de envío de correo. En esta [página](https://www.mail-tester.com/) tenemos una herramienta completa y fácil de usar a la que podemos enviar un correo para que verifique y puntúe el correo que enviamos. Captura la pantalla y muestra la puntuación que has sacado.


