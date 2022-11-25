---
sidebar_position: 15
---

# Cifrado asimétrico con gpg y openssl

## Cifrado asimétrico con gpg

### Tarea 1: Generación de claves 

1. Genera un par de claves (pública y privada). ¿En que directorio se guarda las claves de un usuario?


2. Lista las claves públicas que tienes en tu almacén de claves. Explica los distintos datos que nos muestra. ¿Cómo deberías haber generado las claves para indicar, por ejemplo, que tenga un 1 mes de validez?


3. Lista las claves privadas de tu almacén de claves.


### Tarea 2: Importar / exportar clave pública

1. Exporta tu clave pública en formato ASCII y guardalo en un archivo nombre_apellido.asc y envíalo al compañero con el que vas a hacer esta práctica.


2. Importa las claves públicas recibidas de vuestro compañero.


3. Comprueba que las claves se han incluido correctamente en vuestro keyring.


### Tarea 3: Cifrado asimétrico con claves públicas 

1. Cifraremos un archivo cualquiera y lo remitiremos por email a uno de nuestros compañeros que nos proporcionó su clave pública.


2. Nuestro compañero, a su vez, nos remitirá un archivo cifrado para que nosotros lo descifremos.


3. Tanto nosotros como nuestro compañero comprobaremos que hemos podido descifrar los mensajes recibidos respectivamente.


4. Por último, enviaremos el documento cifrado a alguien que no estaba en la lista de destinatarios y comprobaremos que este usuario no podrá descifrar este archivo.


5. Para terminar, indica los comandos necesarios para borrar las claves públicas y privadas que posees.


### Tarea 4: Exportar clave a un servidor público de claves PGP 

1. Genera la clave de revocación de tu clave pública para utilizarla en caso de que haya problemas.


2. Exporta tu clave pública al servidor `pgp.rediris.es`


3. Borra la clave pública de alguno de tus compañeros de clase e impórtala ahora del servidor público de rediris.


## Cifrado asimétrico con openssl

### Tarea 5

1. Genera un par de claves (pública y privada).


2. Envía tu clave pública a un compañero.


3. Utilizando la clave pública cifra un fichero de texto y envíalo a tu compañero.


4. Tu compañero te ha mandado un fichero cifrado, muestra el proceso para el descifrado.

