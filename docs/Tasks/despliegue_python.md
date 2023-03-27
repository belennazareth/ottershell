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

A continuación, vamos a **configurar el servidor web Apache** para que pueda servir la aplicación Django usando wsgi.


### Entorno de producción

### Modificación de nuestra aplicación



