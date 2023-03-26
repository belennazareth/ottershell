---
sidebar_position: 16
---

# Desplegando aplicaciones flask con apache2 + mod_wsgi

## Ejercicio: Ejecución de aplicaciones python flask

1. Crea una máquina en OpenStack con la que vamos a trabajar los ejercicios y talleres de esta unidad.

2. Clona el repositorio de la aplicación [guestbook](https://github.com/josedom24/guestbook).

    git clone {dirección del repositorio}

3. `guestbook` es una aplicación escrita en python flask. Es una aplicación donde podemos dejar guardados mensajes en un **“libro de visita”**. Los mensajes se van a guardar en una base de datos no relacional llamada `redis`. `redis` es una base de datos clave-valor y necesitamos instalarla:

    apt install redis

Para más información sobre `redis` puedes leer este interesante artículo: [Redis, base de datos no relacional](https://www.josedomingo.org/pledin/2015/02/redis-base-de-datos-no-relacional/).

4. Crea un entorno virtual donde vamos a instalar las librerías necesarias para que funcione nuestra aplicación (fichero requirements.txt).

Para esto hemos creado el directorio venv y dentro un directorio flask:

    mkdir -p venv/flask
    cd venv/flask
    python3 -m venv .
    source bin/activate
    pip install -r /home/debian/guestbook/app/requirements.txt

5. Ejecuta el servidor web de desarrollo ejecutando la siguientes instrucción: python3 app.py. Recuerda abrir el puerto 5000 en el grupo de seguridad y accede desde el navegador a la URL http://172.22.X.X:5000.

Para abrir el puerto 5000 desde el panel de control de OpenStack debes ir a la pestaña de seguridad y añadir una regla de entrada para el puerto 5000. Para que se aplique la regla debes reiniciar la máquina. Después, para acceder a la página web desde el navegador debes poner la dirección IP de la máquina seguido de :5000.

Si te interesa, puedes ver en el código del programa cómo conectamos a redis en la dirección `127.0.0.1` en el puerto `6379`. Los mensajes se guardan en una clave que es una lista que se llama `lista`. Puedes acceder a la base de datos y ver el contenido de esa clave:

```bash
$ redis-cli 
127.0.0.1:6379> lrange lista 0 -1
1) "Hola"
```

## Procedimiento

Podemos seguir trabajando en la máquina de OpenStack del ejercicio anterior. Suponemos que ya tienes clonado el repositorio de la aplicación guestbook, y que has creado un entorno virtual donde has instalado las librería para que la aplicación funcione.

### Configuración de apache2 para servir una aplicación web flask

Lo primero que tenemos que hacer es instalar el módulo de apache2 wsgi:

    apt install libapache2-mod-wsgi-py3

- Suponemos que tenemos un servidor web apache2 con el módulo wsgi activado.

- Suponemos que nuestra aplicación se encuentra en `/home/debian/guestbook`.

- Suponemos que hemos creado un entorno virtual con los paquetes instalados en `/home/debian/venv/flask`.


### Creación del fichero wsgi

Lo primero que vamos a hacer es crear el fichero WSGI, que vamos a llamar `wsgi.py` estará en `/home/debian/guestbook/` y tendrá el siguiente contenido:

    from app import prog as application

Veamos:

- El `app` corresponde con el nombre del módulo, es decir, el fichero del programa, en nuestro caso se llama `app.py`.
- El `prog` corresponde a la aplicación flask creada en `app.py: prog = Flask(__name__)`.
- Importamos la aplicación flask, pero la llamamos application necesario para que el servidor web pueda enviarle peticiones.


### Configuración de apache2

Crea un virtualhost que se acceda con el nombre `flask.tunombre.org`, esta configuración irá en el fichero correspondiente:

```bash
DocumentRoot /home/debian/guestbook
WSGIDaemonProcess flask_guestbook python-path=/home/debian/guestbook:/home/debian/venv/flask/lib/python3.9/site-packages
WSGIProcessGroup flask_guestbook
WSGIScriptAlias / /home/debian/guestbook/wsgi.py process-group=flask_guestbook
<Directory /home/debian/guestbook>
        Require all granted
</Directory>
```

Para crear un virtualhost en apache2 debes crear un fichero en `/etc/apache2/sites-available/` con el nombre del dominio que quieres usar. En este caso vamos a crear el fichero `flask.nazareth.org.conf` con el siguiente contenido:

```bash
<VirtualHost *:80>

    ServerName flask.nazareth.org
    DocumentRoot /home/debian/guestbook

    <Directory /home/debian/guestbook>
            Require all granted
    </Directory>

    WSGIDaemonProcess flask_guestbook python-path=/home/debian/guestbook:/home/debian/venv/flask/lib/python3.9/site-packages
    WSGIProcessGroup flask_guestbook
    WSGIScriptAlias / /home/debian/guestbook/wsgi.py process-group=flask_guestbook

</VirtualHost>
```

Vamos a explicar la configuración:

- El `DocumentRoot` se indica el directorio donde está la aplicación. Realmente el servidor web siempre va a llamar al fichero WSGI `wsgi.py`, pero el DocumentRoot es necesario para servir el contenido estático.

- La directiva `WSGIDaemonProcess`: Se define un grupo de procesos que se van a encargar de ejecutar la aplicación (servidor de aplicaciones). A estos procesos se le ponen un nombre (`flask_guestbook`) y se indica los directorios donde se encuentran la aplicación y los paquetes necesarios (`python-path`), como puedes observar se pone el directorio donde esta la aplicación y el directorio donde se encuentran los paquetes en el entorno virtual, separados por dos puntos.

- `WSGIProcessGroup`: Nos permite agrupar procesos. Se pone el mismo nombre que hemos definido en la directiva anterior.

- La directiva `WSGIScriptAlias` nos permite indicar que programa se va a ejecutar (el fichero WSGI: `/home/debian/guestbook/wsgi.py`) cuando se haga una petición a la url / y que proceso lo va a ejecutar.

Reinicia el servicio web y prueba el funcionamiento. Si te da algún error 500 puedes ver los errores, en `/var/log/apache2/error.log`.

Para que el servidor web pueda acceder a la aplicación debemos activar el virtualhost:

    a2ensite flask.nazareth.org.conf
    a2enmod wsgi

En local, editamos el fichero `/etc/hosts` y añadimos la siguiente línea:

    172.22.200.117 flask.nazareth.org

Reiniciamos el servicio web y probamos el funcionamiento en el navegador:

    systemctl restart apache2

Dará un error 500, ya que app es un directorio y no un fichero. Para esto hay que indicarle al servidor web que el fichero WSGI se encuentra en el directorio `app` editando el fichero `wsgi.py`:

```bash
from app.app import prog as application
```

Con esto ya aparecerá la página web:

![wsgi](/img/IAW/taller1IAW4.png)


## Entrega

### 1. Entrega la configuración del virtualhost.

La configuración del virtualhost es la siguiente:

```bash
<VirtualHost *:80>

    ServerName flask.nazareth.org
    DocumentRoot /home/debian/guestbook

    <Directory /home/debian/guestbook>
            Require all granted
    </Directory>

    WSGIDaemonProcess flask_guestbook python-path=/home/debian/guestbook:/home/debian/venv/flask/lib/python3.9/site-packages
    WSGIProcessGroup flask_guestbook
    WSGIScriptAlias / /home/debian/guestbook/wsgi.py process-group=flask_guestbook

</VirtualHost>
```

### 2. Entrega una captura de pantalla accediendo a la aplicación web.

![wsgi](/img/IAW/taller1IAW4-2.png)