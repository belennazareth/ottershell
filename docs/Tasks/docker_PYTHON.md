---
sidebar_position: 50
---

# Docker: Implantación de aplicaciones web Python en docker

## Despliegue en docker Django

Queremos desplegar en docker la aplicación escrita en python django: tutorial de django, que desplegamos en la tarea Despliegue de aplicaciones python.

Tienes que tener en cuenta los siguientes aspectos:

* La aplicación debe guardar los datos en una base de datos mariadb.

* La aplicación se podrá configurar para indicar los parámetros de conexión a la base de datos: usuario, contraseña, host y base de datos.

* La aplicación deberá tener creado un usuario administrador para el acceso.

Primero vamos a clonar el repositorio de la aplicación:

```bash
git clone https://github.com/josedom24/django_tutorial.git
```

En el entorno de desarrollo, creamos la red para los contenedores:

```bash
docker network create django_net
```

Creamos el contenedor de la base de datos:

```bash
docker run -d --name mariadb -v vol_polls:/var/lib/mysql --network django_net -e MARIADB_ROOT_PASSWORD=admin -e MARIADB_USER=django -e MARIADB_PASSWORD=admin -e MARIADB_DATABASE=django mariadb
```

Modificamos el fichero `settings.py` de la aplicación para que se conecte a la base de datos:

```python
# import os

import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# base de datos

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get("BASE_DATOS"),
        'USER': os.environ.get('USUARIO'),
        'PASSWORD': os.environ.get("CONTRA"),
        'HOST': os.environ.get('HOST'),
        'PORT': '3306',
    }
}

# host permitidos

ALLOWED_HOSTS = [os.environ.get("ALLOWED_HOSTS")]

# urls

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
CSRF_TRUSTED_ORIGINS = ['http://*.ottershell.es','http://*.127.0.0.1','https://*.ottershell.es','https://*.127.0.0.1']
```

Creamos el fichero `polls.sh`:

```bash
#! /bin/sh

sleep 2
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser --noinput
python3 manage.py collectstatic --noinput
python3 manage.py runserver 0.0.0.0:8006
```

Creamos el fichero `Dockerfile`:

```dockerfile
FROM python:3
WORKDIR /usr/src/app
MAINTAINER Belen Nazareth Duran "belennazareth29@gmail.com"
RUN pip install --root-user-action=ignore --upgrade pip && pip install --root-user-action=ignore django mysqlclient 
COPY django/* /usr/src/app 
RUN mkdir static
ADD polls.sh /usr/src/app/
RUN chmod +x /usr/src/app/polls.sh
ENTRYPOINT ["/usr/src/app/polls.sh"]
```

Creamos la imagen:

```bash
docker build -t belennazareth/django:v1 .
```

Creamos el fichero `docker-compose.yml`:

```yaml
version: '3.3'
services:
  django-tutorial:
    container_name: django-tutorial
    image: belennazareth/django:v1
    restart: always
    environment:
      ALLOWED_HOSTS: "*"
      HOST: bd_mariadb_django
      USUARIO: django
      CONTRA: django
      BASE_DATOS: django
      DJANGO_SUPERUSER_PASSWORD: admin
      DJANGO_SUPERUSER_USERNAME: admin
      DJANGO_SUPERUSER_EMAIL: admin@admin.org
    ports:
      - 8084:8006
    depends_on:
      - db_django
  db_django:
    container_name: bd_mariadb_django
    image: mariadb:10.5
    restart: always
    environment:
      MARIADB_ROOT_PASSWORD: root
      MARIADB_DATABASE: django
      MARIADB_USER: django
      MARIADB_PASSWORD: django
    volumes:
      - mariadb_data_django:/var/lib/mysql
volumes:
    mariadb_data_django:
```

Levantamos los contenedores:

```bash
docker-compose up -d
```

![DOCKER](/img/IAW/dockerPYTHONIAW6.png)
![DOCKER](/img/IAW/dockerPYTHONIAW6-2.png)

Ahora que ya hemos comprobado que funciona, vamos a subir la imagen a docker hub:

```bash
docker push belennazareth/django:v1
```

Para pasarlo al entorno de producción, hay que añadir un registro de tipo A en el DNS que apunte a la IP del servidor. Además, con certbot, generamos un certificado para el dominio:

```bash
sudo certbot certonly --standalone -d django.ottershell.es
```


Una vez hecho esto, en el entorno de producción (VPS), creamos el proxy inverso con nginx:

```bash
nano /etc/nginx/sites-available/django.ottershell.es.conf
```

```bash
server {
        listen 80;
        listen [::]:80;

        server_name django.ottershell.es;

        return 301 https://$host$request_uri;
}

server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;

        ssl    on;
        ssl_certificate    /etc/letsencrypt/live/django.ottershell.es/fullchain.pem;
        ssl_certificate_key    /etc/letsencrypt/live/django.ottershell.es/privkey.pem;

        index index.html index.php index.htm index.nginx-debian.html;

        server_name django.ottershell.es;

        location / {
                proxy_pass http://localhost:8084;
                include proxy_params;
        }
}
```

Generamos el enlace simbólico:

```bash
ln -s /etc/nginx/sites-available/django.ottershell.es.conf /etc/nginx/sites-enabled/
```

Reiniciamos nginx:

```bash
systemctl restart nginx
```

Hacemos un pull de la imagen de docker hub:

```bash
docker pull belennazareth/django:v1
```

Y copiamos el fichero `docker-compose.yml` descrito anteriormente en el VPS. Lo levantamos:

```bash
docker-compose up -d
```

![DOCKER](/img/IAW/dockerPYTHONIAW6-3.png)
![DOCKER](/img/IAW/dockerPYTHONIAW6-4.png)
![DOCKER](/img/IAW/dockerPYTHONIAW6-5.png)
![DOCKER](/img/IAW/dockerPYTHONIAW6-6.png)



## Entrega

### 1. Crea una imagen docker para poder desplegar un contenedor con la aplicación. La imagen la puedes hacer desde una imagen base o desde la imagen oficial de python.

```dockerfile
FROM python:3
WORKDIR /usr/src/app
MAINTAINER Belen Nazareth Duran "belennazareth29@gmail.com"
RUN pip install --root-user-action=ignore --upgrade pip && pip install --root-user-action=ignore django mysqlclient 
COPY django/* /usr/src/app 
RUN mkdir static
ADD polls.sh /usr/src/app/
RUN chmod +x /usr/src/app/polls.sh
ENTRYPOINT ["/usr/src/app/polls.sh"]
```

### 2. Crea un docker-compose para desplegar los contenedores necesarios. Configura los volúmenes que creas necesarios para que la aplicación sea persistente.

```yaml
version: '3.3'
services:
  django-tutorial:
    container_name: django-tutorial
    image: belennazareth/django:v1
    restart: always
    environment:
      ALLOWED_HOSTS: "*"
      HOST: bd_mariadb_django
      USUARIO: django
      CONTRA: django
      BASE_DATOS: django
      DJANGO_SUPERUSER_PASSWORD: admin
      DJANGO_SUPERUSER_USERNAME: admin
      DJANGO_SUPERUSER_EMAIL: admin@admin.org
    ports:
      - 8084:8006
    depends_on:
      - db_django
  db_django:
    container_name: bd_mariadb_django
    image: mariadb:10.5
    restart: always
    environment:
      MARIADB_ROOT_PASSWORD: root
      MARIADB_DATABASE: django
      MARIADB_USER: django
      MARIADB_PASSWORD: django
    volumes:
      - mariadb_data_django:/var/lib/mysql
volumes:
    mariadb_data_django:
```

### 3. Una vez probada en el entorno de desarrollo, despliega la aplicación en tu VPS usando el docker-compose y configurando el nginx como proxy inveso para acceder por nombre a la aplicación.

Usamos el `docker-compose.yml` descrito anteriormente. Además, creamos un proxy inverso con nginx:

```bash
server {
        listen 80;
        listen [::]:80;

        server_name django.ottershell.es;

        return 301 https://$host$request_uri;
}

server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;

        ssl    on;
        ssl_certificate    /etc/letsencrypt/live/django.ottershell.es/fullchain.pem;
        ssl_certificate_key    /etc/letsencrypt/live/django.ottershell.es/privkey.pem;

        index index.html index.php index.htm index.nginx-debian.html;

        server_name django.ottershell.es;

        location / {
                proxy_pass http://localhost:8084;
                include proxy_params;
        }
}
```