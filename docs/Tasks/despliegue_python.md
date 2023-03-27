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

Creamos un fichero de configuración para el servidor apache, `/etc/httpd/sites-available/django.conf`:

```bash
<VirtualHost *:80>
    ServerName python.tunombre.gonzalonazareno.org
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/django_tutorial

    Alias /static /var/www/html/django_tutorial/static

    <Directory /var/www/html/django_tutorial/static>
        Require all granted
    </Directory>

    <Directory /var/www/html/django_tutorial>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    WSGIDaemonProcess django_tutorial python-path=/var/www/html/django_tutorial:/var/www/html/django/lib/python3.6/site-packages
    WSGIProcessGroup django_tutorial
    WSGIScriptAlias / /var/www/html/django_tutorial/django_tutorial/wsgi.py

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined


### Entorno de producción

### Modificación de nuestra aplicación



