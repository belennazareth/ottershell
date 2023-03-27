---
sidebar_position: 16
---

# Desplegando aplicaciones flask con apache2/nginx + uwsgi

## Procedimiento

`uwsgi` es un servidor de aplicaciones WSGI HTTP para Python.

Debemos tener instalado el paquete `python3-dev` que es una dependencia necesaria. También es posible que necesites las herramientas para compilar, instala el paquete `build-essential` Podríamos instalar el paquete `uwsgi` desde los repositorios, pero lo vamos a instalar en el entorno virtual:

    (flask)$ pip install uwsgi

### Despliegue de una aplicación flask con uwsgi

* Suponemos que nuestra aplicación se encuentra en `/home/debian/guestbook`.
* Suponemos que hemos creado un entorno virtual con los paquetes instalados en `/home/debian/venv/flask.`

Para probar el servidor `uwsgi` podemos ejecutar en la línea de comandos:

    (flask)$ uwsgi --http :8080 --chdir /home/debian/guestbook --wsgi-file wsgi.py --process 4 --threads 2 --master

Otra alternativa es crear un fichero `.ini` de configuración, `ejemplo.ini` de la siguiente manera:

```ini
[uwsgi]
http = :8080
chdir = /home/debian/guestbook 
wsgi-file = wsgi.py
processes = 4
threads = 2
```

Y para ejecutar el servidor, simplemente:

    (flask)$ uwsgi ejemplo.ini

De esta forma puedo tener varios ficheros de configuración del servidor uwsgi para las distintas aplicaciones python que sirve el servidor.

La instalación se está sirviendo por el servidor `uwsgi` en `localhost:8080`.

### Creación de una unidad systemd

Evidentemente no vamos a ejecutar “a mano” el programa `uwsgi`, vamos a crear una unidad `systemd`, para controlarla con `systemctl`, para ello, vamos a crear el fichero `/etc/systemd/system/uwsgi-guestbook.service` con el siguiente contenido:

```ini
[Unit]
Description=uwsgi-guestbook
After=network.target

[Install]
WantedBy=multi-user.target

[Service]
User=www-data
Group=www-data
Restart=always

ExecStart=/home/debian/venv/flask/bin/uwsgi /home/debian/venv/flask/ejemplo.ini
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID

WorkingDirectory=/home/debian/guestbook
Environment=PYTHONPATH='/home/debian/guestbook:/home/debian/venv/flask/lib/python3.9/site-packages'

PrivateTmp=true
```

Activamos la unidad de `systemd`, y la iniciamos:

```bash
systemctl enable uwsgi-guestbook.service
systemctl start uwsgi-guestbook.service
```

Si cambias el contenido de la unidad tendrás que hacer la recarga:

    systemctl daemon-reload

### Proxy inversos para uwsgi

#### Apache2 como proxy inverso de uwsgi

Activamos el módulo `proxy_http` (`a2enmod proxy_http`) y en la configuración de algún virtualhost:

```bash
DocumentRoot /home/debian/flask_temperaturas
ProxyPass / http://127.0.0.1:8080/
ProxyPassReverse / http://127.0.0.1:8080/ 

<Directory /home/debian/flask_temperaturas>
        Require all granted
</Directory>
```

*Nota: usando el virtualhost creado en el [taller anterior](https://ottershell.vercel.app/docs/Tasks/apache_wsgi)

Lo que resulta en:

```bash
<VirtualHost *:80>

    ServerName flask.nazareth.org
    DocumentRoot /home/debian/guestbook

    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    <Directory /home/debian/guestbook>
            Require all granted
    </Directory>

    WSGIDaemonProcess flask_guestbook python-path=/home/debian/guestbook:/home/debian/venv/fl>
    WSGIProcessGroup flask_guestbook
    WSGIScriptAlias / /home/debian/guestbook/wsgi.py process-group=flask_guestbook

</VirtualHost>
```

Reiniciamos el servicio `apache2` y accedemos a la aplicación web. Desde el navegador accedemos a `http://flask.nazareth.org/` y vemos que funciona correctamente. 
Con el proxy inverso se ha indicado que el servidor `uwsgi` está escuchando en `localhost:8080`, todo lo que llegue a `http://flask.nazareth.org/` se redirigirá a `http://localhost:8080/`.

Podemos ejecutar el comando `netstat -putan | egrep 8080` para ver que el servidor `uwsgi` está escuchando en ese puerto, obtenemos como salida:

```bash
debian@apache-wsgi:~$ sudo netstat -putan | egrep 8080

tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      23514/uwsgi   
```


#### nginx como proxy inverso de uwsgi

En la configuración de un virtualhost:

```bash
location / {
    proxy_pass http://localhost:8080;
    include proxy_params;
}
```

*Nota: usando el virtualhost creado en el [taller anterior](https://ottershell.vercel.app/docs/Tasks/apache_wsgi)

Quedaría:

```bash
server {
    listen 80;
    server_name flask.nazareth_nginx.org;

    root /home/debian/guestbook;
    location / {
        proxy_pass http://localhost:8080;
        include proxy_params;
    }
}
```

Activamos el virtualhost y reiniciamos el servicio `nginx`:

```bash
ln -s /etc/nginx/sites-available/flask.nazareth_nginx.org /etc/nginx/sites-enabled/
systemctl restart nginx
```

**Añadir al /etc/hosts:**

    172.22.200.117 flask.nazareth_nginx.org

Desde el navegador accedemos a `flask.nazareth_nginx.org/` y vemos que funciona correctamente.


## Entrega

### 1. Entrega el contenido del fichero de configuración de la unidad systemctl.

![uwsgi](/img/IAW/taller2IAW4.png)

### 2. Entrega la salida del comando systemctl status uwsgi-guestbook.service.

![uwsgi](/img/IAW/taller2IAW4-2.png)

### 3. Configura apache2 como proxy inverso. Entrega la configuración del virtualhost (el mismo que el del taller anterior) y una captura accediendo a la aplicación web.

```bash
<VirtualHost *:80>

    ServerName flask.nazareth.org
    DocumentRoot /home/debian/guestbook

    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    <Directory /home/debian/guestbook>
            Require all granted
    </Directory>

    WSGIDaemonProcess flask_guestbook python-path=/home/debian/guestbook:/home/debian/venv/fl>
    WSGIProcessGroup flask_guestbook
    WSGIScriptAlias / /home/debian/guestbook/wsgi.py process-group=flask_guestbook

</VirtualHost>
```

![uwsgi](/img/IAW/taller2IAW4-3.png)

### 4. Instala nginx. Configura nginx como proxy inverso. Entrega la configuración del virtualhost y una captura accediendo a la aplicación web.

```bash
server {
    listen 80;
    server_name flask.nazareth_nginx.org;

    root /home/debian/guestbook;
    location / {
        proxy_pass http://localhost:8080;
        include proxy_params;
    }
}
```

![uwsgi](/img/IAW/taller2IAW4-4.png)