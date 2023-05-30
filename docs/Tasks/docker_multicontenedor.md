---
sidebar_position: 46
---

# Docker: Escenarios multicontenedor en Docker

## Despliegue de Nextcloud

Vamos a desplegar la aplicación nextcloud con una base de datos (puedes elegir mariadb o PostgreSQL) utilizando la aplicación docker-compose. Puedes coger cómo modelo el fichero docker-compose.yml el que hemos estudiado para desplegar WordPress.

1. Instala docker-compose en tu ordenador.

    sudo apt install docker-compose

2. Dentro de un directorio crea un fichero docker-compose.yml para realizar el despliegue de nextcloud con una base de datos. Recuerda las variables de entorno y la persistencia de información.

    mkdir nextcloud_docker
    cd nextcloud_docker
    nano docker-compose.yml


```yml
 version: '3.7'
 services:
   nextcloud:
     image: nextcloud:latest
     container_name: nextcloud
     restart: always
     ports:
       - 8080:80
     volumes:
       - nextcloud:/var/www/html
     environment:
       - MYSQL_HOST=mariadb
       - MYSQL_DATABASE=nextcloud
       - MYSQL_USER=nextcloud
       - MYSQL_PASSWORD=admin
       - MYSQL_ROOT_PASSWORD=nextcloud
   db:
     image: mariadb:latest
     container_name: nextcloud-db
     restart: always
     volumes:
       - nextcloud-db:/var/lib/mysql
     environment:
       - MYSQL_DATABASE=nextcloud
       - MYSQL_USER=nextcloud
       - MYSQL_PASSWORD=admin
       - MYSQL_ROOT_PASSWORD=nextcloud
 volumes:
     nextcloud:
     nextcloud-db:
```

3. Levanta el escenario con docker-compose.

    docker-compose up -d

4. Muestra los contenedores con docker-compose.

    docker-compose ps

5. Accede a la aplicación y comprueba que funciona.
6. Comprueba el almacenamiento que has definido y que se ha creado una nueva red de tipo bridge.
7. Borra el escenario con docker-compose.


## Entrega

### 1. Contenido del fichero docker-compose.yml.

```yml
 version: '3.7'
 services:
   nextcloud:
     image: nextcloud:latest
     container_name: nextcloud
     restart: always
     ports:
       - 8080:80
     volumes:
       - nextcloud:/var/www/html
     environment:
       - MYSQL_HOST=mariadb
       - MYSQL_DATABASE=nextcloud
       - MYSQL_USER=nextcloud
       - MYSQL_PASSWORD=admin
       - MYSQL_ROOT_PASSWORD=nextcloud
   db:
     image: mariadb:latest
     container_name: nextcloud-db
     restart: always
     volumes:
       - nextcloud-db:/var/lib/mysql
     environment:
       - MYSQL_DATABASE=nextcloud
       - MYSQL_USER=nextcloud
       - MYSQL_PASSWORD=admin
       - MYSQL_ROOT_PASSWORD=nextcloud
 volumes:
     nextcloud:
     nextcloud-db:
```


### 2. Instrucción para levantar el escenario con docker-compose.

    docker-compose up -d

### 3. Instrucción para ver los contenedores con docker-compose.

    docker-compose ps

### 4. Pantallazos accediendo a nextcloud para comprobar que funciona de manera correcta.



### 5. Comprobación del almacenamiento que has definido y que se ha creado una nueva red de tipo bridge.


### 6. Instrucción para borrar el escenario con docker-compose.

    docker-compose down