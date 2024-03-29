---
sidebar_position: 46
---

# Docker: Creación de imágenes Docker

Para la realización de este taller es necesario tener una cuenta en Docker Hub.

## Creación de una imagen a partir de un Dockerfile

1.- Crea una página web estática (por ejemplo busca una plantilla HTML5). O simplemente crea un index.html.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>DOCKER</title>
    </head>
    <body>
        <h1>CREACION DE IMAGENES DOCKER</h1>
        <p>Docker es un proyecto de codigo abierto que automatiza el despliegue de aplicaciones dentro de contenedores de software, proporcionando una capa adicional de abstraccion y automatizacion de virtualizacion de aplicaciones en multiples sistemas operativos.​</p>
        <img src="https://cataas.com/cat">
    </body>
</html>
```

2.- Crea un fichero Dockerfile que permita crear una imagen con un servidor web sirviendo la página. Puedes usar una imagen base debian o ubuntu, o una imagen que tenga ya un servicio web, como hemos visto en el apartado [Ejemplo 1: Construcción de imágenes con una página estática](https://github.com/josedom24/curso_docker_ies/blob/main/modulo5/ejemplo1.md).

Creamos un directorio para guardar los ficheros de la práctica y creamos el fichero `index.html`:

```bash
mkdir mi_servidor_web
cd mi_servidor_web
touch index.html
```

Creamos el fichero `Dockerfile`:

```bash
touch Dockerfile
```

```dockerfile
FROM debian
MAINTAINER Belen Nazareth Duran "belennazareth29@gmail.com"
RUN apt-get update && apt-get -y install apache2
COPY index.html /var/www/html/index.html
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
```


3.- Ejecuta el comando docker que crea la nueva imagen. La imagen se debe llamar /mi_servidor_web:v1.

    docker build -t mi_servidor_web:v1 .

![DOCKER](/img/IAW/taller3IAW6.png)

Comprobamos que se ha creado la imagen:

    docker images

![DOCKER](/img/IAW/taller3IAW6-2.png)

Para borrar la imagen:

    docker rmi <id_imagen>

Creamos un contenedor a partir de la imagen:

    docker run -d -p 8080:80 --name mi_servidor_web mi_servidor_web:v1

Para borrar el contenedor:

    docker rm -f mi_servidor_web

![DOCKER](/img/IAW/taller3IAW6-3.png)


4.- Conéctate a Docker Hub y sube la imagen que acabas de crear.

Nos conectamos:

    docker login

Preparamos la imagen para subirla:

    docker tag mi_servidor_web:v1 belennazareth/mi_servidor_web:v1

Subimos la imagen:

    docker push belennazareth/mi_servidor_web

![DOCKER](/img/IAW/taller3IAW6-4.png)


5.- Descarga la imagen en otro ordenador donde tengas docker instalado, y crea un contenedor a partir de ella. (Si no tienes otro ordenador con docker instalado, borra la imagen en tu ordenador y bájala de Docker Hub).

Para descargar la imagen:

    docker pull belennazareth/mi_servidor_web

Para crear el contenedor:

    docker run -d -p 8080:80 --name mi_servidor_web belennazareth/mi_servidor_web:v1


6.- Vamos a hacer una modificación de la página web: haz una modificación al fichero index.html.

Modificamos el fichero `index.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>DOCKER</title>
    </head>
    <body>
        <h1>CREACION DE IMAGENES DOCKER</h1>
        <p>Docker es un proyecto de codigo abierto que automatiza el despliegue de aplicaciones dentro de contenedores de software, proporcionando una capa adicional de abstraccion y automatizacion de virtualizacion de aplicaciones en multiples sistemas operativos.​</p>
        <img src="https://cataas.com/cat">
        
        <p>Modificación de la página web</p>
        <img src="https://cataas.com/cat/says/MODIFICACION">
    </body>
</html>
```

7.- Vuelve a crear una nueva imagen, en esta caso pon la etiqueta v2. Súbela a Docker Hub.

Volvemos a crear la imagen:

    docker build -t mi_servidor_web:v2 .

![DOCKER](/img/IAW/taller3IAW6-5.png)

De nuevo, preparamos la imagen para subirla:

    docker tag mi_servidor_web:v2 belennazareth/mi_servidor_web:v2

Subimos la imagen:

    docker push belennazareth/mi_servidor_web:v2

![DOCKER](/img/IAW/taller3IAW6-6.png)

8.- Por último, baja la nueva imagen en el ordenador donde está corriendo el contenedor. Para hacer la implantación de la nueva versión debes borrar el contenedor y crear uno nuevo desde la nueva versión de la imagen.

Borramos el contenedor:

    docker rm -f mi_servidor_web

Creamos el contenedor desde la nueva versión de la imagen:

    docker run -d -p 8080:80 --name mi_servidor_web belennazareth/mi_servidor_web:v2

![DOCKER](/img/IAW/taller3IAW6-7.png)


## Entrega

### 1. Pantallazo donde se vea el contenido del fichero Dockerfile.

![DOCKER](/img/IAW/taller3IAW6-8.png)

### 2. Pantallazo donde se vea el comando que crea la nueva imagen.

![DOCKER](/img/IAW/taller3IAW6-5.png)

### 3. Pantallazo donde se vea el acceso a la página web primera versión.

![DOCKER](/img/IAW/taller3IAW6-3.png)

### 4. Pantallazo donde se vean las dos imágenes subidas a tu cuenta de Docker Hub.

![DOCKER](/img/IAW/taller3IAW6-6.png)

### 5. Pantallazo donde se vea el acceso a la página web segunda versión.

![DOCKER](/img/IAW/taller3IAW6-7.png)