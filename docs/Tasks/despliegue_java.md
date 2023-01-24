---
sidebar_position: 22
---

# Despliegue de aplicaciones Java

    IMPORTANTE: Para esta práctica es importante que la instancia que se use tenga al menos las siguientes características:
    - 2 GB de RAM
    - 2 vCPUs
    - 20 GB de disco


## Procedimiento

### Creación y configuración de proyecto Java

Como vimos en el [taller 1](https://ottershell.vercel.app/docs/Tasks/tomcat), se puede crear un proyecto Java con Maven. En este caso, tenemos el repositorio [rock-paper-scissors](https://github.com/josedom24/rock-paper-scissors) por lo que no es necesario crearlo. Solo debemos clonarlo en el servidor con git clone, o en mi caso realice un scp para copiarlo.

```bash
scp -r rock-paper-scissors user@{ip_server}:/home/user/
```

Ejecutar el siguiente comando para compilar el proyecto:

```bash
mvn package
```

### Desarrollo y despliegue de una aplicación Java simple

Para desplegar la aplicación, se va a utilizar el servicio de Tomcat. Manualmente, introducimos el fichero `war` en la carpeta `webapps` de Tomcat. En este caso, se va a utilizar el servicio de Tomcat Manager, para ello, se debe acceder a la url `http://{ip_server}:8080/manager/html` y se debe introducir el usuario y contraseña que se ha creado en el [taller 1](https://ottershell.vercel.app/docs/Tasks/tomcat).

```bash
sudo cp /rock-paper-scissors/target/roshambo.war /var/lib/tomcat9/webapps/
```

Después de copiar el fichero, se puede acceder a la aplicación en la url `http://{ip_server}:8080/roshambo/`. Para poder acceder antes hay que activarla desde el Tomcat Manager para que aparezca de la siguiente forma:

![tomcat](/img/SRI+HLC/javaSRI.png)

Si accedemos a la página, nos aparecerá el siguiente mensaje:

![tomcat](/img/SRI+HLC/javaSRI-2.png)

Es interactivo y nos permite seleccionar entre piedra, papel o tijera, dado como respuesta un registro de la partida y el resultado:

![tomcat](/img/SRI+HLC/javaSRI-3.png)

Aquí una demostración de la aplicación funcionando:

![tomcat](/img/SRI+HLC/javaSRI-4.gif)

ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🦦                  🦦                     🦦                      🦦ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ


## Despliegue de un CMS Java 

Lo primero será crear un usuario en la base de datos MySQL para que OpenCMS pueda acceder a ella. Para ello, se debe acceder a la base de datos y ejecutar el siguiente comando:

```sql
CREATE USER 'java'@'localhost' IDENTIFIED BY 'admin';
grant all privileges on * . * to 'java'@'localhost' with grant option;
flush privileges;
```

Para el despliegue de OpenCMS es necesario tener además el fichero [`.war`](https://cloud.josedomingo.org/index.php/s/cwMj6NAZ4fNMoRA). Para su despliegue, se debe copiar el fichero en la carpeta `/var/lib/tomcat9/webapps` y reiniciar el servicio de Tomcat:

```bash
sudo cp /opencms.war /var/lib/tomcat9/webapps/
sudo systemctl restart tomcat9.service
```

Después de realizar el despliegue, se puede acceder a la aplicación en la url `http://{ip_server}:8080/opencms/setup/`. Para poder acceder antes hay que activarla desde el Tomcat Manager para que aparezca de la siguiente forma:

![tomcat](/img/SRI+HLC/javaSRI-5.png)

**Nota: hay que tener en cuenta que la ruta por defecto de OpenCMS es `/opencms` por lo que hay que escribir a mano la ruta `/setup/` para poder acceder a la aplicación.*

Aceptamos todos los términos y condiciones y pulsamos en `Next`. Aparecerá la siguiente pantalla donde nos indica que el sistema es apto y que podemos continuar con la instalación:

![tomcat](/img/SRI+HLC/javaSRI-6.png)

Lo siguiente será la introducción de los datos de la base de datos. En este caso, se ha creado un usuario `java` con contraseña `admin` y se ha creado una base de datos llamada `opencms`:

![tomcat](/img/SRI+HLC/javaSRI-7.png)

**Nota: es importante marcar la opción `drop database` para que se borre la base de datos si ya existe y no surjan problemas.*

Al pulsar en `Next`, se nos mostrará la siguiente pantalla donde se nos indica que se ha creado la base de datos correctamente:

![tomcat](/img/SRI+HLC/javaSRI-8.png)

Nos pedirá la dirección URL, en este caso, se ha dejado la que viene por defecto `http://localhost:8080` con ID de servidor `OpenCmsServer`:

![tomcat](/img/SRI+HLC/javaSRI-9.png)

Por último, aparecerá el proceso de instalación seguido de un mensaje de éxito:

![tomcat](/img/SRI+HLC/javaSRI-10.png)
![tomcat](/img/SRI+HLC/javaSRI-11.png)

Podemos acceder a la aplicación de de OpenCMS desde la url `http://{ip_server}:8080/opencms/overview`:

![tomcat](/img/SRI+HLC/javaSRI-12.png)

Para realizar una modificación en la aplicación, desde la página de inicio sobre cada zona de la misma hay un botón `Edit` que nos permite modificar el contenido (esquina superior derecha). Por ejemplo:

![tomcat](/img/SRI+HLC/javaSRI-13.png)


### Acceso a las aplicaciones

Para poder acceder directamente al servidor desde el navegador web, se debe configurar un proxy inverso en el servidor para que las URL queden de forma `java.nazareth.org/game` y `java.nazareth.org` respectivamente. Para ello, primero instalamos nginx y creamos un virtual host:

```bash
sudo apt install nginx

sudo nano /etc/nginx/sites-available/java.conf
```

Dentro del fichero, metemos para que nos redirija a la aplicación de rock-paper-scissors y a la de OpenCMS con las URL que hemos indicado anteriormente:

```bash
server {
    listen 80;
    listen [::]:80;

    index index.html index.htm index.nginx-debian.html;

    server_name java.nazareth.org;

    location /game {
        proxy_pass http://localhost:8080/roshambo/;
        include proxy_params;
    }

    location / {
        proxy_pass http://localhost:8080/opencms/;
        include proxy_params;
    }
}
```

Lo siguiente será activar el virtual host y reiniciar el servicio de nginx:

```bash
sudo ln -s /etc/nginx/sites-available/java.conf /etc/nginx/sites-enabled/

sudo systemctl restart nginx
```

Por último, en local, editamos el fichero `/etc/hosts` y añadimos la siguiente línea:

```bash
{ip_server} java.nazareth.org
```

Ahora, desde el navegador web, podemos acceder a las aplicaciones con las URL `java.nazareth.org/game` y `java.nazareth.org` respectivamente:

![tomcat](/img/SRI+HLC/javaSRI-14.png)
![tomcat](/img/SRI+HLC/javaSRI-15.png)


ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🦦                  🦦                     🦦                      🦦ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ



## Entrega

**1. Entrega una captura de la aplicación de administración Tomcat-Manager donde se compruebe que las aplicaciones están desplegadas.**

![tomcat](/img/SRI+HLC/javaSRI-16.png)

**2. Configuración del proxy inverso para acceder a las aplicaciones cómo nos indica la práctica.**



**3. Acceso desde un navegar web a la aplicación rock-paper-scissors con la url java.tunombre.org/game.**



**4. Acceso desde un navegar web a la aplicación OpenCMS con la url java.tunombre.org.**


