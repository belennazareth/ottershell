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

Para exportar la clave se ejecuta el siguiente comando:

    gpg --export -a "Belen Nazareth Duran" > nazareth_duran.asc

Y se la envío a mi compañero Rober.


#### 2. Importa las claves públicas recibidas de vuestro compañero.

Importamos la clave ejecutando:

    gpg --import roberto_rodriguez.asc

![Term](/img/SAD/criptoSAD.png)


#### 3. Comprueba que las claves se han incluido correctamente en vuestro keyring.

Comprobamos que efectivamente se ha incluido:

    gpg --list-keys

![Term](/img/SAD/criptoSAD-2.png)


### Tarea 3: Cifrado asimétrico con claves públicas

#### 1. Cifraremos un archivo cualquiera y lo remitiremos por email a uno de nuestros compañeros que nos proporcionó su clave pública.

Creamos el fichero txt y lo encriptamos:

    echo "Ficherito encriptadito secreto secreto" > encriptadito.txt

    gpg -e -u "Belen Nazareth Duran" -r "Roberto Rodríguez Márquez" encriptadito.txt 

![Term](/img/SAD/criptoSAD-3.png)


#### 2. Nuestro compañero, a su vez, nos remitirá un archivo cifrado para que nosotros lo descifremos.

Cuando recibamos el fichero usaremos el siguiente comando para descifrarlo:

    gpg -d ficheroimportante.txt.gpg

![Term](/img/SAD/criptoSAD-4.png)


#### 3. Tanto nosotros como nuestro compañero comprobaremos que hemos podido descifrar los mensajes recibidos respectivamente.

Para  comprobarlo  voy a meter la salida en un fichero txt:

    gpg -d ficheroimportante.txt.gpg > ficheroimportante_descifrado.txt

![Term](/img/SAD/criptoSAD-5.png)


#### 4. Por último, enviaremos el documento cifrado a alguien que no estaba en la lista de destinatarios y comprobaremos que este usuario no podrá descifrar este archivo.




#### 5. Para terminar, indica los comandos necesarios para borrar las claves públicas y privadas que posees.

Para esto solo es necesario ejecutar:

    gpg --delete-secret-and-public-keys "Belen Nazareth Duran"
 

### Tarea 4: Exportar clave a un servidor público de claves PGP

#### 1. Genera la clave de revocación de tu clave pública para utilizarla en caso de que haya problemas.

Usaremos el comando:

    gpg --gen-revoke "Belen Nazareth Duran" > revokedbn.key 

Obteniendo como salida:

```bash
sec  rsa3072/19CFB634F516F12A 2022-12-04 Belen Nazareth Duran <belennazareth29@gmail.com>

¿Crear un certificado de revocación para esta clave? (s/N) s
Por favor elija una razón para la revocación:
  0 = No se dio ninguna razón
  1 = La clave ha sido comprometida
  2 = La clave ha sido reemplazada
  3 = La clave ya no está en uso
  Q = Cancelar
(Probablemente quería seleccionar 1 aquí)
¿Su decisión? 0
Introduzca una descripción opcional; acábela con una línea vacía:
> Revocacion de mi clave
> 
Razón para la revocación: No se dio ninguna razón
Revocacion de mi clave
¿Es correcto? (s/N) s
se fuerza salida con armadura ASCII.
Certificado de revocación creado.

Por favor consérvelo en un medio que pueda esconder; si alguien consigue
acceso a este certificado puede usarlo para inutilizar su clave.
Es inteligente imprimir este certificado y guardarlo en otro lugar, por
si acaso su medio resulta imposible de leer. Pero precaución: ¡el sistema
de impresión de su máquina podría almacenar los datos y hacerlos accesibles
a otras personas!
```

#### 2. Exporta tu clave pública al servidor pgp.rediris.es

Como el servidor de rendiris no funciona correctamente he usado el de [mit](https://pgp.mit.edu/):

     gpg --keyserver pgp.mit.edu --send-keys 522E1EE9CC010A467AA2318919CFB634F516F12A

Obteniendo:

```bash
nazare@ThousandSunny  ~$  gpg --keyserver pgp.mit.edu --send-keys 522E1EE9CC010A467AA2318919CFB634F516F12A 

gpg: enviando clave 19CFB634F516F12A a hkp://pgp.mit.edu
```


#### 3. Borra la clave pública de alguno de tus compañeros de clase e impórtala ahora del servidor público de rediris.

Borramos la clave de Roberto:

    gpg --delete-keys "Roberto Rodríguez Márquez" 


E importamos las claves:

    gpg --keyserver pgp.mit.edu --recv-keys 564EF4B761565E40

![Term](/img/SAD/criptoSAD-6.png)


### Tarea 5: Cifrado asimétrico con openssl

#### 1. Genera un par de claves (pública y privada).

Para la clave privada:

    openssl genrsa -out clavesita.pem 2048

Para la clave pública: 

    openssl rsa -in clavesita.pem -pubout -out clavesitapub.pem

#### 2. Envía tu clave pública a un compañero.

Le he enviado mi clave a Roberto por scp:

    scp clavesitapub.pem rober@ip


#### 3. Utilizando la clave pública cifra un fichero de texto y envíalo a tu compañero.

Creamos el fichero y lo encriptamos para enviarlo:

    echo "Ficherito encriptadito secreto secreto otra vez" > encriptadito_ossl.txt

    openssl rsautl -pubin -encrypt -in encriptadito_ossl.txt -out encriptadito_ossl.enc -inkey clavepub.pem


#### 4. Tu compañero te ha mandado un fichero cifrado, muestra el proceso para el descifrado.

Para descrifrarlo hacemos el siguiente comando:

    openssl rsautl -decrypt -inkey ~/Escritorio/SAD/clavesita.pem -in openssl.enc -out openssl.txt

![Term](/img/SAD/criptoSAD-7.png)
