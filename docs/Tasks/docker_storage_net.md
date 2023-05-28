---
sidebar_position: 45
---

# Almacenamiento y redes

## Almacenamiento

## Vamos a trabajar con volúmenes docker:

### 1. Crea un volumen docker que se llame miweb.

    docker volume create miweb
    docker volume ls

```bash
root@docker:~#  docker volume create miweb
miweb
root@docker:~#  docker volume ls
DRIVER    VOLUME NAME
local     miweb
root@docker:~#
```


### 2. Crea un contenedor desde la imagen php:7.4-apache donde montes en el directorio /var/www/html (que sabemos que es el DocumentRoot del servidor que nos ofrece esa imagen) el volumen docker que has creado.

    docker run -d --name miweb -p 8080:80 -v miweb:/var/www/html php:7.4-apache
    docker ps

```bash
root@docker:~# docker run -d --name miweb -p 8080:80 -v miweb:/var/www/html php:7.4-apache
Unable to find image 'php:7.4-apache' locally
7.4-apache: Pulling from library/php
a603fa5e3b41: Pull complete 
c428f1a49423: Pull complete 
156740b07ef8: Pull complete 
fb5a4c8af82f: Pull complete 
25f85b498fd5: Pull complete 
9b233e420ac7: Pull complete 
fe42347c4ecf: Pull complete 
d14eb2ed1e17: Pull complete 
66d98f73acb6: Pull complete 
d2c43c5efbc8: Pull complete 
ab590b48ea47: Pull complete 
80692ae2d067: Pull complete 
05e465aaa99a: Pull complete 
Digest: sha256:c9d7e608f73832673479770d66aacc8100011ec751d1905ff63fae3fe2e0ca6d
Status: Downloaded newer image for php:7.4-apache
fe5f52e0f6b1dd279f01f08da715ba683427df974749857b018d7d2437a83099
root@docker:~# docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                  NAMES
fe5f52e0f6b1   php:7.4-apache   "docker-php-entrypoi…"   17 seconds ago   Up 16 seconds   0.0.0.0:8080->80/tcp   miweb
root@docker:~# 
```


### 3. Utiliza el comando docker cp para copiar un fichero index.html (donde aparece tu nombre) en el directorio /var/www/html.

    docker cp index.html miweb:/var/www/html

```html
 <!DOCTYPE html>
 <html>
     <body>
         <h1>Nombre: Belén Nazareth</h1>
         <h2>Prueba de docker</h2>
         <img src="https://cataas.com/cat" alt="cat">
     </body>
 </html>

### 4. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html.

### 5. Borra el contenedor

### 6. Crea un nuevo contenedor y monta el mismo volumen como en el ejercicio anterior.

### 7. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html. ¿Seguía existiendo ese fichero?


## Vamos a trabajar con bind mount:

### 1. Crea un directorio en tu host y dentro crea un fichero index.html (donde aparece tu nombre).

### 2. Crea un contenedor desde la imagen php:7.4-apache donde montes en el directorio /var/www/html el directorio que has creado por medio de bind mount.

### 3. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html.

### 4. Modifica el contenido del fichero index.html en tu host y comprueba que al refrescar la página ofrecida por el contenedor, el contenido ha cambiado.

### 5. Borra el contenedor

### 6. Crea un nuevo contenedor y monta el mismo directorio como en el ejercicio anterior.

### 7. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html. ¿Se sigue viendo el mismo contenido?


# Redes

Despliegue de Nextcloud + mariadb/postgreSQL

Vamos a desplegar la aplicación nextcloud con una base de datos (puedes elegir mariadb o PostgreSQL) (NOTA: Para que no te de errores utiliza la imagen mariadb:10.5). Te puede servir el ejercicio que hemos realizado para desplegar Wordpress. Para ello sigue los siguientes pasos:

### 1. Crea una red de tipo bridge.

### 2. Crea el contenedor de la base de datos conectado a la red que has creado. La base de datos se debe configurar para crear una base de datos y un usuario. Además el contenedor debe utilizar almacenamiento (volúmenes o bind mount) para guardar la información. Puedes seguir la documentación de mariadb o la de PostgreSQL.

### 3. A continuación, siguiendo la documentación de la imagen nextcloud, crea un contenedor conectado a la misma red, e indica las variables adecuadas para que se configure de forma adecuada y realice la conexión a la base de datos. El contenedor también debe ser persistente usando almacenamiento.

### 4. Accede a la aplicación usando un navegador web.