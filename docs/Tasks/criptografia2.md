---
sidebar_position: 17
---

# Criptografía II: Integridad, firmas y autenticación

## Tarea 1: Firmas electrónicas 

### 1. Manda un documento y la firma electrónica del mismo a un compañero. Verifica la firma que tu has recibido.


### 2. ¿Qué significa el mensaje que aparece en el momento de verificar la firma?

```bash
 gpg: Firma correcta de "Pepe D <josedom24@gmail.com>" [desconocido]
 gpg: ATENCIÓN: ¡Esta clave no está certificada por una firma de confianza!
 gpg:          No hay indicios de que la firma pertenezca al propietario.
 Huellas dactilares de la clave primaria: E8DD 5DA9 3B88 F08A DA1D  26BF 5141 3DDB 0C99 55FC
```


### 3. Vamos a crear un anillo de confianza entre los miembros de nuestra clase, para ello.

* Tu clave pública debe estar en un servidor de claves

* Escribe tu fingerprint en un papel y dárselo a tu compañero, para que puede descargarse tu clave pública.

* Te debes bajar al menos tres claves públicas de compañeros. Firma estas claves.

* Tu te debes asegurar que tu clave pública es firmada por al menos tres compañeros de la clase.

* Una vez que firmes una clave se la tendrás que devolver a su dueño, para que otra persona se la firme.

* Cuando tengas las tres firmas sube la clave al servidor de claves y rellena tus datos en la tabla 
Claves públicas PGP 2020-2021

* Asegurate que te vuelves a bajar las claves públicas de tus compañeros que tengan las tres firmas.



### 4. Muestra las firmas que tiene tu clave pública.


### 5. Comprueba que ya puedes verificar sin “problemas” una firma recibida por una persona en la que confías.


### 6. Comprueba que puedes verificar con confianza una firma de una persona en las que no confías, pero sin embargo si confía otra persona en la que tu tienes confianza total.



## Tarea 2: Correo seguro con evolution/thunderbird

### 1. Configura el cliente de correo evolution con tu cuenta de correo habitual


### 2. Añade a la cuenta las opciones de seguridad para poder enviar correos firmados con tu clave privada o cifrar los mensajes para otros destinatarios


### 3. Envía y recibe varios mensajes con tus compañeros y comprueba el funcionamiento adecuado de GPG



## Tarea 3: Integridad de ficheros

### 1. Para validar el contenido de la imagen CD, solo asegúrese de usar la herramienta apropiada para sumas de verificación. Para cada versión publicada existen archivos de suma de comprobación con algoritmos fuertes (SHA256 y SHA512); debería usar las herramientas sha256sum o sha512sum para trabajar con ellos.


### 2. Verifica que el contenido del hash que has utilizado no ha sido manipulado, usando la firma digital que encontrarás en el repositorio. Puedes encontrar una guía para realizarlo en este artículo: [How to verify an authenticity of downloaded Debian ISO images](https://linuxconfig.org/how-to-verify-an-authenticity-of-downloaded-debian-iso-images)



## Tarea 4: Integridad y autenticidad (apt secure)

Busca información sobre apt secure y responde las siguientes preguntas:

### 1. ¿Qué software utiliza apt secure para realizar la criptografía asimétrica?


### 2. ¿Para que sirve el comando apt-key? ¿Qué muestra el comando apt-key list?


### 3. En que fichero se guarda el anillo de claves que guarda la herramienta apt-key?


### 4. ¿Qué contiene el archivo Release de un repositorio de paquetes?. ¿Y el archivo Release.gpg?. Puedes ver estos archivos en el repositorio http://ftp.debian.org/debian/dists/Debian10.1/. Estos archivos se descargan cuando hacemos un apt update.


### 5. Explica el proceso por el cual el sistema nos asegura que los ficheros que estamos descargando son legítimos.


### 6. Añade de forma correcta el repositorio de virtualbox añadiendo la clave pública de virtualbox como se indica en la documentación.



## Tarea 5: Autentificación: ejemplo SSH

### 1. Explica los pasos que se producen entre el cliente y el servidor para que el protocolo cifre la información que se transmite? ¿Para qué se utiliza la criptografía simétrica? ¿Y la asimétrica?


### 2. Explica los dos métodos principales de autentificación: por contraseña y utilizando un par de claves públicas y privadas.


### 3. En el cliente para que sirve el contenido que se guarda en el fichero ~/.ssh/know_hosts?


### 4. ¿Qué significa este mensaje que aparece la primera vez que nos conectamos a un servidor?

```bash
 $ ssh debian@172.22.200.74
 The authenticity of host '172.22.200.74 (172.22.200.74)' can't be established.
 ECDSA key fingerprint is SHA256:7ZoNZPCbQTnDso1meVSNoKszn38ZwUI4i6saebbfL4M.
 Are you sure you want to continue connecting (yes/no)? 
```


### 5. En ocasiones cuando estamos trabajando en el cloud, y reutilizamos una ip flotante nos aparece este mensaje:

```bash
 $ ssh debian@172.22.200.74
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
 Someone could be eavesdropping on you right now (man-in-the-middle attack)!
 It is also possible that a host key has just been changed.
 The fingerprint for the ECDSA key sent by the remote host is
 SHA256:W05RrybmcnJxD3fbwJOgSNNWATkVftsQl7EzfeKJgNc.
 Please contact your system administrator.
 Add correct host key in /home/jose/.ssh/known_hosts to get rid of this message.
 Offending ECDSA key in /home/jose/.ssh/known_hosts:103
   remove with:
   ssh-keygen -f "/home/jose/.ssh/known_hosts" -R "172.22.200.74"
 ECDSA host key for 172.22.200.74 has changed and you have requested strict checking.
```


### 6. ¿Qué guardamos y para qué sirve el fichero en el servidor ~/.ssh/authorized_keys?

