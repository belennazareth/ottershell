---
sidebar_position: 16
---


# Cifrado asimétrico con gpg y openssl

## Cifrado asimétrico con gpg

### Tarea 1: Generación de claves

#### 1. Genera un par de claves (pública y privada). ¿En que directorio se guarda las claves de un usuario?

Para esto usaremos el comando:

    gpg --gen-key

Y se guarda en el fichero `/home/{usuario}/.gnupg`.


#### 2. Lista las claves públicas que tienes en tu almacén de claves. Explica los distintos datos que nos muestra. ¿Cómo deberías haber generado las claves para indicar, por ejemplo, que tenga un 1 mes de validez?

Para listar se usa:

    gpg --list-keys

Con salida:

```bash
nazare@ThousandSunny  ~$ gpg --list-keys

/home/nazare/.gnupg/pubring.kbx
-------------------------------
pub   rsa3072 2022-12-04 [SC] [caduca: 2024-12-03]
      522E1EE9CC010A467AA2318919CFB634F516F12A
uid        [  absoluta ] Belen Nazareth Duran <belennazareth29@gmail.com>
sub   rsa3072 2022-12-04 [E] [caduca: 2024-12-03]
```

Y vemos que usa el protocolo `rsa3072` y que su fecha de caducidad es `2024-12-03`, que se creó el `2022-12-04`, el nombre del fichero donde se ha guardado y los datos del propietario.

Para poder especificar los meses de caducidad se usa el comando:

    gpg –full-generate-key

Un ejemplo de salida sería:

```bash
nazare@ThousandSunny  ~$ gpg --full-generate-key 

gpg (GnuPG) 2.2.27; Copyright (C) 2021 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Por favor seleccione tipo de clave deseado:
   (1) RSA y RSA (por defecto)
   (2) DSA y ElGamal
   (3) DSA (sólo firmar)
   (4) RSA (sólo firmar)
  (14) Existing key from card
Su elección: 1
las claves RSA pueden tener entre 1024 y 4096 bits de longitud.
¿De qué tamaño quiere la clave? (3072) 
El tamaño requerido es de 3072 bits
Por favor, especifique el período de validez de la clave.
         0 = la clave nunca caduca
      <n>  = la clave caduca en n días
      <n>w = la clave caduca en n semanas
      <n>m = la clave caduca en n meses
      <n>y = la clave caduca en n años
¿Validez de la clave (0)? 1m
La clave caduca mar 03 ene 2023 13:06:35 CET
¿Es correcto? (s/n) 

```


#### 3. Lista las claves privadas de tu almacén de claves.

Para listar las claves privadas:

    gpg --list-secret-keys

Y, en mi caso, obtengo como respuesta:

```bash
 nazare@ThousandSunny  ~$ gpg --list-secret-keys

/home/nazare/.gnupg/pubring.kbx
-------------------------------
sec   rsa3072 2022-12-04 [SC] [caduca: 2024-12-03]
      522E1EE9CC010A467AA2318919CFB634F516F12A
uid        [  absoluta ] Belen Nazareth Duran <belennazareth29@gmail.com>
ssb   rsa3072 2022-12-04 [E] [caduca: 2024-12-03]
```

### Tarea 2: Importar / exportar clave pública

#### 1. Exporta tu clave pública en formato ASCII y guardalo en un archivo nombre_apellido.asc y envíalo al compañero con el que vas a hacer esta práctica.



#### 2. Importa las claves públicas recibidas de vuestro compañero.



#### 3. Comprueba que las claves se han incluido correctamente en vuestro keyring.



### Tarea 3: Cifrado asimétrico con claves públicas

#### 1. Cifraremos un archivo cualquiera y lo remitiremos por email a uno de nuestros compañeros que nos proporcionó su clave pública.



#### 2. Nuestro compañero, a su vez, nos remitirá un archivo cifrado para que nosotros lo descifremos.




#### 3. Tanto nosotros como nuestro compañero comprobaremos que hemos podido descifrar los mensajes recibidos respectivamente.




#### 4. Por último, enviaremos el documento cifrado a alguien que no estaba en la lista de destinatarios y comprobaremos que este usuario no podrá descifrar este archivo.




#### 5. Para terminar, indica los comandos necesarios para borrar las claves públicas y privadas que posees.



### Tarea 4: Exportar clave a un servidor público de claves PGP

#### 1. Genera la clave de revocación de tu clave pública para utilizarla en caso de que haya problemas.


#### 2. Exporta tu clave pública al servidor pgp.rediris.es



#### 3. Borra la clave pública de alguno de tus compañeros de clase e impórtala ahora del servidor público de rediris.


### Tarea 5: Cifrado asimétrico con openssl

#### 1. Genera un par de claves (pública y privada).


#### 2. Envía tu clave pública a un compañero.



#### 3. Utilizando la clave pública cifra un fichero de texto y envíalo a tu compañero.



#### 4. Tu compañero te ha mandado un fichero cifrado, muestra el proceso para el descifrado.
