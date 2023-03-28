---
sidebar_position: 24
---

# Despliegue de aplicaciones python

## Procedimiento

### Entorno de desarrollo

Lo primero será crear el entorno virtual y activarlo:

```bash
mkdir venv  
cd venv

python3 -m venv django
source django/bin/activate
```

Además, instalaremos la aplicación de Django:

```bash
pip install django
```

Después de realizar un fork del [repositorio de la aplicación](https://github.com/josedom24/django_tutorial), clonaremos el repositorio en la máquina local usando el comando `git clone` con el [repositorio](https://github.com/belennazareth/django_tutorial).

Para usar esta aplicación se va a trabajar usando una base de datos SQLite, por lo que no es necesario instalar ningún servicio de base de datos. Para consultar el nombre de la base de datos, se puede ver el fichero `/django_tutorial/settings.py` y vemos que su nombre es `db.sqlite3`:

```python
# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

A continuación, se va a crear una base de datos vacía para la aplicación y un superusuario para poder acceder a la aplicación:

```bash
python manage.py migrate
python manage.py createsuperuser
```

Además, es necesario editar el fichero `django_tutorial/settings.py` y modificar la variable `ALLOWED_HOSTS` para que pueda acceder sin problemas a la aplicación desde cualquier host:

```python
ALLOWED_HOSTS = ['*']
```

Para poder acceder, como estamos usando `bravo`, debemos añadir una nueva regla **DNAT** para que se redirija el tráfico de la máquina `bravo` al puerto `8000` de la máquina `alfa` editando el fichero `/etc/network/interfaces.d/50-cloud-init`:

```bash
post-up iptables -t nat -A PREROUTING -p tcp --dport 8000 -i ens3 -j DNAT --to 172.16.0.200
```

![py](/img/IAW/desplieguePYIAW4.png)

Y reiniciamos la maquina para que se apliquen los cambios. 

Lo siguiente es ejecutar el servidor web de desarrollo para comprobar los datos que se han modificado entrando en la zona de administración de la aplicación (`/admin`):

```bash
python manage.py runserver 0.0.0.0:8000
```

Aparecerá una pantalla como la siguiente:

![py](/img/IAW/desplieguePYIAW4-2.png)

Si entramos en la zona de administración de la aplicación (`/admin`), aparecerá una pantalla como la siguiente:

![py](/img/IAW/desplieguePYIAW4-3.png)

Lo siguiente será entrar como administrador y crear un par de cuestiones. El usuario y contraseña que pide la página `/admin` es el que se ha creado con el comando `python manage.py createsuperuser`:

![py](/img/IAW/desplieguePYIAW4-4.png)
![py](/img/IAW/desplieguePYIAW4-5.png)

Una vez creadas las preguntas, podemos comprobar que se han creado correctamente entrando en `/polls`:

![py](/img/IAW/desplieguePYIAW4-6.png)
![py](/img/IAW/desplieguePYIAW4-7.png)
![py](/img/IAW/desplieguePYIAW4-8.png)

Si entramos en la zona de administración de la aplicación (`/admin`), y seleccionamos una de las dos preguntas que hemos creado, aparecerá una pantalla como la siguiente mostrando los detalles de la pregunta y las votaciones que ha recibido:

![py](/img/IAW/desplieguePYIAW4-9.png)

* Configura el servidor web apache2 con el módulo wsgi para servir la página web. Si utilizas como entorno de desarrollo la máquina bravo, se accederá con el nombre python.tunombre.gonzalonazareno.org.

A continuación, vamos a **configurar el servidor web Apache** para que pueda servir la aplicación Django usando wsgi. Para ello, debemos instalar el módulo para wsgi:

    sudo dnf install python3-mod_wsgi

*Nota: Para hacer este apartado se han usado los talleres: [Desplegando aplicaciones flask con apache2 + mod_wsgi](https://ottershell.vercel.app/docs/Tasks/apache_wsgi) y [Desplegando aplicaciones flask con apache2/nginx + uwsgi](https://ottershell.vercel.app/docs/Tasks/apache_uwsgi)

Movemos el directorio `django_tutorial` y el entorno virtual a la carpeta `/var/www/html` para que sea accesible desde el servidor web:

```bash
mv github/django_tutorial /var/www/html
mv venv/django /var/www/html
```

Lo siguiente será editar el fichero `django_tutorial/settings.py` y modificar la variable `ALLOWED_HOSTS` para que pueda acceder sin problemas a la aplicación desde cualquier host y añadimos `STATIC_ROOT` para que se pueda acceder a los ficheros estáticos:

```python
ALLOWED_HOSTS = ['*']
STATIC_ROOT = '/var/www/html/django_tutorial/static/'
```

Dentro de `django_tutorial` creamos el contenido estático de la aplicación:

```bash
sudo python3 manage.py collectstatic
```

Creamos un fichero de configuración para el servidor apache, `/etc/httpd/sites-available/django_apache.conf`:

```bash
<VirtualHost *:80>

    ServerName python.nazareth.gonzalonazareno.org
    DocumentRoot /var/www/html/django_tutorial

    Alias /static/ /var/www/html/django_tutorial/static/

    WSGIDaemonProcess django_tutorial python-path=/var/www/html/django_tutorial:/var/www/html/django/lib/python3.9/site-packages
    WSGIProcessGroup django_tutorial
    WSGIScriptAlias / /var/www/html/django_tutorial/django_tutorial/wsgi.py

    ErrorLog /var/log/httpd/django_tutorial_error.log
    CustomLog /var/log/httpd/django_tutorial_access.log combined
</VirtualHost>
```

Y lo activamos:

```bash
sudo ln -s /etc/httpd/sites-available/django_apache.conf /etc/httpd/sites-enabled/
sudo systemctl restart httpd
```

Ya podemos entrar en la aplicación desde el navegador introduciendo la dirección:

    python.nazareth.gonzalonazareno.org

![py](/img/IAW/desplieguePYIAW4-10.png)


### Entorno de producción

Vamos a realizar el despliegue de nuestra aplicación en un entorno de producción, para ello vamos a utilizar nuestro VPS.

Lo primero será clonar el repositorio de la aplicación en el VPS:

```bash
git clone https://github.com/belennazareth/django_tutorial.git
```

Instalamos python3 y pip3:

```bash
apt-get install python3-venv
apt-get install python3-pip
```

Creamos un entorno virtual para la aplicación y lo activamos:

```bash
python3 -m venv venv/django
source venv/django/bin/activate
```

Instalamos las dependencias de la aplicación:

```bash
pip install -r django_tutorial/requirements.txt
```

Necesitamos poder trabajar con mysql desde python, para ello instalamos el conector:

```bash
sudo apt install libmariadb-dev
pip install mysqlclient
pip install pymysql
```

Creamos la base de datos y el usuario para la aplicación, es importante que el usuario y la contraseña sean los mismos que en sqlite:

```bash
sudo mysql 
```

```sql
CREATE DATABASE django;
CREATE USER 'django'@'localhost' IDENTIFIED BY 'django';
GRANT ALL PRIVILEGES ON django.* TO 'django'@'localhost';
FLUSH PRIVILEGES;
```

Modificamos el fichero `django_tutorial/settings.py` para que la aplicación pueda conectarse a la base de datos:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django',
        'USER': 'django',
        'PASSWORD': 'django',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

En bravo, creamos una copia de seguridad de la aplicación:

```bash
sudo python3 manage.py dumpdata > db.json
```

Subimos la copia al repositorio:

```bash
git add db.json
git commit -m "Copia de seguridad"
git push
```

En la máquina del VPS, actualizamos el repositorio:

```bash
git pull
```

Y restauramos la copia de seguridad en el VPS:

```bash
python3 manage.py migrate
python3 manage.py loaddata db.json
```

Editamos el fichero `django_tutorial/settings.py` para que la aplicación pueda servir los ficheros estáticos:

```python
ALLOWED_HOSTS = ['*']
STATIC_ROOT = '/home/poke/django_tutorial/static/'
```

Y generamos el contenido estático:

```bash
python3 manage.py collectstatic
```

**Configuraremos nginx** instalando primero el paquete `nginx` y `uwsgi`:

```bash
sudo apt install nginx
pip install uwsgi
```

Creamos dentro de la carpeta del entorno virtual el fichero de configuración de nginx, `/home/poke/venv/django/servidor.ini`:

```bash
[uwsgi]
http = :8080
chdir = /home/poke/django_tutorial 
wsgi-file = django_tutorial/wsgi.py
processes = 4
threads = 2
```

Como vimos en el taller, creamos una unidad systemd para que el servicio se inicie automáticamente editando el fichero `/etc/systemd/system/uwsgi-django.service`:

```bash
[Unit]
Description=uwsgi-django
After=network.target

[Install]
WantedBy=multi-user.target

[Service]
User=www-data
Group=www-data
Restart=always

ExecStart=/home/poke/venv/django/bin/uwsgi /home/poke/venv/django/servidor.ini
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID

WorkingDirectory=/home/poke/django_tutorial
Environment=PYTHONPATH='/home/poke/django_tutorial:/home/poke/venv/django/lib/python3.9/site-packages'

PrivateTmp=true
```

Y lo activamos:

```bash
sudo systemctl enable uwsgi-django
sudo systemctl start uwsgi-django
```

Por último, creamos el fichero de configuración de nginx, `/etc/nginx/sites-available/django.conf` copiando el existente con https y cambiando la línea `location /` y servername por `python.ottershell.es`:

```bash
server {
    listen 80;
    listen 443 ssl http2;

    server_name pyhton.ottershell.es;

    access_log /var/log/nginx/python.com-access.log;
    error_log /var/log/nginx/python.com-error.log;

    ssl_certificate    /etc/letsencrypt/live/ottershell.es/fullchain.pem;
    ssl_certificate_key    /etc/letsencrypt/live/ottershell.es/privkey.pem;

    root /home/poke/django_tutorial;

    index index.php;
    location / {
    proxy_pass http://localhost:8080;
    include proxy_params;
    }
    location /static/polls {
    alias /home/poke/django_tutorial/polls/static/polls;
    }
    location /static/admin {
    alias /home/poke/venv/django/lib/python3.9/site-packages/django/contrib/admin/static/admin/;
    }
}

```

Desactivamos el DEBUG en el fichero `django_tutorial/settings.py` para que no se muestren los errores y den información sensible:

```python
DEBUG = False
```

Creamos el enlace simbólico y reiniciamos el servicio:

```bash
sudo ln -s /etc/nginx/sites-available/django /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

En la página donde tenemos contratado el dominio, añadimos un nuevo registro de tipo `CNAME` con el nombre `python` y el valor `ottershell.es`.

Si entramos en python.ottershell.es, veremos nuestra aplicación funcionando:

![py](/img/IAW/desplieguePYIAW4-11.png)
![py](/img/IAW/desplieguePYIAW4-12.png)
![py](/img/IAW/desplieguePYIAW4-13.png)


### Modificación de nuestra aplicación

Las modificaciones se realizarán en el entorno de desarrollo, en mi caso `bravo`. Una vez realizadas, se subirán al repositorio y se actualizará el entorno de producción.

#### Desarrollo

Modificamos la página inicial donde se ven las encuestas para que aparezca tu nombre editando el archivo `django_tutorial/polls/templates/polls/index.html`:

```html
{% load static %}

<link rel="stylesheet" type="text/css" href="{% static 'polls/style.css' %}">

<h1>Belén Nazareth Durán Meléndez</h1>

{% if latest_question_list %}
    <ul>
    {% for question in latest_question_list %}
    <li><a href="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
{% else %}
    <p>No polls are available.</p>
{% endif %}
```



