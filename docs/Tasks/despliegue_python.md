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
ALLOWED_HOSTS = ['www.nazareth.gn.org']
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




### Entorno de producción

### Modificación de nuestra aplicación



## Entrega

**1. En este momento, muestra al profesor la aplicación funcionando. Entrega una documentación resumida donde expliques los pasos fundamentales para realizar esta tarea. Y pantallazos que demuestren que la aplicación está funcionando. (3 puntos si eliges como entorno de desarrollo a bravo y 1 punto si eliges como entorno de desarrollo una máquina de openstack).**


**2. En este momento, muestra al profesor la aplicación funcionando. Entrega una documentación resumida donde expliques los pasos fundamentales para realizar esta tarea y pantallazos donde se vea que todo está funcionando.**


**3. Explica los cambios que has realizado en el entorno de desarrollo y cómo lo has desplegado en producción para cada una de las modificaciones. Entrega pantallazos donde se vean las distintas modificaciones y que todo está funcionando.**

