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

```html
 <!DOCTYPE html>
 <html>
     <body>
         <h1>Nombre: Belén Nazareth</h1>
         <h2>Prueba de docker</h2>
         <img src="https://cataas.com/cat" alt="cat">
     </body>
 </html>
```

    docker cp index.html miweb:/var/www/html


### 4. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html.

![docker](/img/IAW/taller1IAW6.png)


### 5. Borra el contenedor

    docker rm -f miweb

```bash
debian@docker:~$ docker rm -f miweb
miweb
debian@docker:~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
debian@docker:~$ 
```


### 6. Crea un nuevo contenedor y monta el mismo volumen como en el ejercicio anterior.

    docker run -d --name miweb -p 8080:80 -v miweb:/var/www/html php:7.4-apache


### 7. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html. ¿Seguía existiendo ese fichero?

![docker](/img/IAW/taller1IAW6-2.png)

Sí, ya que al montar el volumen, se mantiene la información que se ha guardado en él, y aunque se borre el contenedor, el volumen sigue existiendo.


## Vamos a trabajar con bind mount:

### 1. Crea un directorio en tu host y dentro crea un fichero index.html (donde aparece tu nombre).

```html
 <!DOCTYPE html>
 <html>
     <body>
         <h1>Nombre: Belén Nazareth</h1>
         <h2>Prueba de docker: bind mount</h2>
         <img src="https://cataas.com/cat" alt="cat">
     </body>
 </html>
```

    mkdir bindmount
    mv index.html bindmount/


### 2. Crea un contenedor desde la imagen php:7.4-apache donde montes en el directorio /var/www/html el directorio que has creado por medio de bind mount.

    docker run -d --name miweb -p 8080:80 -v /home/debian/bindmount:/var/www/html php:7.4-apache

```bash
debian@docker:~$ docker run -d --name miweb -p 8080:80 -v /home/debian/bindmount:/var/www/html php:7.4-apache
8c4a49f3523dc94464b67502ac765b1396a24cc2393f2998abecf0403f684adc
debian@docker:~$ docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS                  NAMES
8c4a49f3523d   php:7.4-apache   "docker-php-entrypoi…"   4 seconds ago   Up 3 seconds   0.0.0.0:8080->80/tcp   miweb
debian@docker:~$ 
```


### 3. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html.

![docker](/img/IAW/taller1IAW6-3.png)


### 4. Modifica el contenido del fichero index.html en tu host y comprueba que al refrescar la página ofrecida por el contenedor, el contenido ha cambiado.

    nano bindmount/index.html

```html
 <!DOCTYPE html>
 <html>
     <body>
         <h1>Nombre: Belén Nazareth</h1>
         <h2>Prueba de docker: bind mount 2</h2>
         <img src="https://cataas.com/cat" alt="cat">
     </body>
 </html>
```

![docker](/img/IAW/taller1IAW6-4.png)


### 5. Borra el contenedor

    docker rm -f miweb


### 6. Crea un nuevo contenedor y monta el mismo directorio como en el ejercicio anterior.

    docker run -d --name miweb -p 8080:80 -v /home/debian/bindmount:/var/www/html php:7.4-apache

### 7. Accede al contenedor desde el navegador para ver la información ofrecida por el fichero index.html. ¿Se sigue viendo el mismo contenido?

![docker](/img/IAW/taller1IAW6-5.png)

Sí, porque como hemos montado el mismo volumen se mantiene el mismo contenido.



# Redes

Despliegue de Nextcloud + mariadb/postgreSQL

Vamos a desplegar la aplicación nextcloud con una base de datos (puedes elegir mariadb o PostgreSQL) (NOTA: Para que no te de errores utiliza la imagen mariadb:10.5). Te puede servir el ejercicio que hemos realizado para desplegar Wordpress. Para ello sigue los siguientes pasos:

### 1. Crea una red de tipo bridge.

    docker network create nextcloud_network --driver bridge
    docker network ls

```bash
debian@docker:~$ docker network create nextcloud_network --driver bridge
144e6fc41b25433eb3d1ab5985eb07cf7f3d9e47d0ad4d004595ef9550e0914d
debian@docker:~$ docker network ls
NETWORK ID     NAME                DRIVER    SCOPE
d65cf43a13c1   bridge              bridge    local
c93f21ee2a41   host                host      local
144e6fc41b25   nextcloud_network   bridge    local
c3a9f2b27456   none                null      local
debian@docker:~$ 
```


### 2. Crea el contenedor de la base de datos conectado a la red que has creado. La base de datos se debe configurar para crear una base de datos y un usuario. Además el contenedor debe utilizar almacenamiento (volúmenes o bind mount) para guardar la información. Puedes seguir la documentación de mariadb o la de PostgreSQL.

    docker run -d --name nextcloud-db --network nextcloud_network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud -v nextcloud-db:/var/lib/mysql mariadb:10.5

```bash
debian@docker:~$ docker run -d --name nextcloud-db --network nextcloud_network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud -v nextcloud-db:/var/lib/mysql mariadb:10.5
Unable to find image 'mariadb:10.5' locally
10.5: Pulling from library/mariadb
99803d4b97f3: Pull complete 
b8bc823a83fd: Pull complete 
16685f710f5d: Pull complete 
b5660ff63058: Pull complete 
fb5880d2d359: Pull complete 
baf131972ef1: Pull complete 
2969c5907ed8: Pull complete 
178375b1f8ce: Pull complete 
Digest: sha256:e2e6d26f6419df86e1edef1897fe0e4e28ed40ee65b9b4538e24b0696cc75fd2
Status: Downloaded newer image for mariadb:10.5
372a77b9b0df3ca704a1e9ceae5a4ffa91530c2214dc5938aebd92e112364915
debian@docker:~$ docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                  NAMES
372a77b9b0df   mariadb:10.5     "docker-entrypoint.s…"   2 minutes ago    Up 2 minutes    3306/tcp               nextcloud-db
89ceb01dbc82   php:7.4-apache   "docker-php-entrypoi…"   13 minutes ago   Up 12 minutes   0.0.0.0:8080->80/tcp   miweb
debian@docker:~$ 
```


### 3. A continuación, siguiendo la documentación de la imagen nextcloud, crea un contenedor conectado a la misma red, e indica las variables adecuadas para que se configure de forma adecuada y realice la conexión a la base de datos. El contenedor también debe ser persistente usando almacenamiento.

    docker run -d --name nextcloud --network nextcloud_network -p 8080:80 -v nextcloud:/var/www/html -e MYSQL_HOST=nextcloud-db -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud nextcloud

```bash
debian@docker:~$ docker run -d --name nextcloud --network nextcloud_network -p 8080:80 -v nextcloud:/var/www/html -e MYSQL_HOST=nextcloud-db -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud nextcloud
59b593b2f420ee3350fd43354c661ae4c936e8d1197681324b9b9401ed1cfeb1
debian@docker:~$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                  NAMES
59b593b2f420   nextcloud      "/entrypoint.sh apac…"   14 seconds ago   Up 13 seconds   0.0.0.0:8080->80/tcp   nextcloud
372a77b9b0df   mariadb:10.5   "docker-entrypoint.s…"   7 minutes ago    Up 7 minutes    3306/tcp               nextcloud-db
debian@docker:~$ 
```


### 4. Accede a la aplicación usando un navegador web.


![docker](/img/IAW/taller1IAW6-6.png)


## Entrega

### Almacenamiento con volúmenes docker

### 1. Instrucción para crear el volumen docker.

    docker volume create miweb

### 2. Instrucción para crear el contenedor.

    docker run -d --name miweb -p 8080:80 -v miweb:/var/www/html php:7.4-apache

### 3. Pantallazo accediendo a la página web.

![docker](/img/IAW/taller1IAW6.png)

### 4. Instrucción para borrar el contenedor.

    docker rm -f miweb

### 5. Instrucción para crear de nuevo el contenedor con el volumen y pantallazo accediendo de nuevo a la página.

    docker run -d --name miweb -p 8080:80 -v miweb:/var/www/html php:7.4-apache

![docker](/img/IAW/taller1IAW6-2.png)


### Almacenamiento con bind mount

### 1. Instrucción para crear el contenedor.

    docker run -d --name miweb -p 8080:80 -v /home/debian/bindmount:/var/www/html php:7.4-apache

### 2. Pantallazo accediendo a la página web.

![docker](/img/IAW/taller1IAW6-3.png)

### 3. Pantallazo accediendo a la página web, después de cambiar el fichero index.html en tu host.

![docker](/img/IAW/taller1IAW6-5.png)


### Redes

### 1. Instrucción para crear la red

    docker network create nextcloud_network --driver bridge

### 2. Instrucción para crear el contenedor de base de datos.

    docker run -d --name nextcloud-db --network nextcloud_network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud -v nextcloud-db:/var/lib/mysql mariadb:10.5

### 3. Instrucción para crear el contenedor de nextcloud.

    docker run -d --name nextcloud --network nextcloud_network -p 8080:80 -v nextcloud:/var/www/html -e MYSQL_HOST=nextcloud-db -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud nextcloud

### 4. Pantallazos accediendo a nextcloud para comprobar que funciona de manera correcta.

![docker](/img/IAW/taller1IAW6-6.png)