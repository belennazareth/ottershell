---
sidebar_position: 30
---


# Instalación de phpmyadmin

## Procedimiento

En primer lugar, configura en tu servidor web un **servicio LAMP** para instalar una aplicación PHP y tener disponible un gestor de base de datos `(Puedes usar cualquier máquina donde tengas ya instalado el servidor LAMP)`. 
[phpmyadmin](https://www.phpmyadmin.net/) es una aplicación web escrita en PHP que nos posibilita la gestión de una base de datos **mysql/mariadb**. Normalmente vamos a instalar las aplicaciones web descargando directamente el código de la aplicación al servidor, pero en este ejercicio vamos a instalar la aplicación desde los repositorios de Debian.

Para hacer este taller he usado el siguiente vagrantfile:

```ruby
Vagrant.configure("2") do |config|
    config.vm.box = "debian/bullseye64"
    config.vm.synced_folder ".", "/vagrant", disabled: true

    config.vm.define :serverlamp do |serverlamp|
        serverlamp.vm.hostname = "serverlamp"
        serverlamp.vm.network :public_network,
		    :dev => "br0",
		    :mode => "bridge",
		    :type => "bridge"
    end
end
```

Para hacer el servidor LAMP, primero instalamos apache2, mysql y php:

```bash
sudo apt update
sudo apt install apache2 mysql-server php php-mysql libapache2-mod-php -y
```


Realiza los siguientes pasos:

**1. Accede desde el terminal a la base de datos con el root (con contraseña) y crea una base de datos y un usuario que tenga permiso sobre ella.**

Primero damos contraseña al usuario root:

```bash
passwd root
```

Ahora accedemos a la base de datos con el usuario root:

```bash
mysql -u root -p
(sudo mysql)
```

Y creamos la base de datos y el usuario:

```sql
CREATE DATABASE phplamp;
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'usuario';
GRANT ALL PRIVILEGES ON phplamp.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;
```

**2. Instala desde los repositorios la aplicación phpmyadmin. En la instalación nos pregunta que servidor estamos usando, en nuestro caso elegimos apache2. Además elegimos que NO se configure la base de datos en el proceso de instalación-. Accede con un navegador a la URL http://ip_servidor/phpmyadmin (usa el nombre de usuario creado en el punto anterior).**

Instalamos phpmyadmin:

```bash
sudo apt install phpmyadmin -y
```

Seleccionamos apache2:

![phpma](/img/SRI+HLC/taller3SRI3.png)

Y no configuramos la base de datos:

![phpma](/img/SRI+HLC/taller3SRI3-2.png)

Ahora accedemos a la aplicación desde el navegador:

![phpma](/img/SRI+HLC/taller3SRI3-3.png)
![phpma](/img/SRI+HLC/taller3SRI3-4.png)


**3. ¿Se ha creado en el DocumentRoot (/var/www/html) un directorio que se llama phpmyadmin? Entonces, ¿cómo podemos acceder?**

No se ha creado ningún directorio en el DocumentRoot, pero sí se ha creado un enlace simbólico en /etc/apache2/conf-available/phpmyadmin.conf que apunta a /etc/phpmyadmin/apache.conf. Dentro del fichero vemos que apunta a /usr/share/phpmyadmin. Por lo tanto, para acceder a la aplicación, tenemos que acceder a la ruta /usr/share/phpmyadmin.


**4. La instalación de phpmyadmin ha creado un fichero de configuración en apache2: /etc/apache2/conf-available/phpmyadmin.conf (que es un enlace simbólico a /etc/phpmyadmin/apache.conf). La primera línea del fichero es:**

    Alias /phpmyadmin /usr/share/phpmyadmin

**La directiva Alias nos permite crear una ruta phpmyadmin que nos muestra los ficheros que hay en un directorio que está fuera del DocumentRoot, en este caso /usr/share/phpmyadmin, es decir, la aplicación está realmente en ese directorio.**



**5. Quita la configuración de acceso a phpmyadmin con el comando a2disconf y comprueba que ya no puedes acceder. A continuación crea un virtualhost, al que hay que acceder con el nombre basededatos.tunombre.org, y que nos muestre la aplicación.**
`Nota: En la configuración del virtualhost copia las 3 directivas directory que se encuentran en el fichero /etc/apache2/conf-available/myphpadmin.conf.`

Después de deshabilitar la configuración de acceso a phpmyadmin, ya no podemos acceder a la aplicación dando un error:

```
Not Found
The requested URL was not found on this server.

Apache/2.4.56 (Debian) Server at 192.168.1.90 Port 80
```

*Nota: lo contrario de a2disconf es a2enconf.

Ahora creamos el virtualhost:

```bash
sudo nano /etc/apache2/sites-available/phplamp.nazareth.conf
```

Las directivas directory que se encuentran en el fichero /etc/apache2/conf-available/myphpadmin.conf son:

```xml
<Directory /usr/share/phpmyadmin>
    Options SymLinksIfOwnerMatch
    DirectoryIndex index.php

    # limit libapache2-mod-php to files and directories necessary by pma
    <IfModule mod_php7.c>
        php_admin_value upload_tmp_dir /var/lib/phpmyadmin/tmp
        php_admin_value open_basedir /usr/share/phpmyadmin/:/usr/share/doc/phpmyadmin/:/etc/phpmyadmin/:/var/lib/phpmyadmin/:/usr/share/php/:/usr/share/javascript/
    </IfModule>

</Directory>

<Directory /usr/share/phpmyadmin/templates>
    Require all denied
</Directory>

<Directory /usr/share/phpmyadmin/libraries>
    Require all denied
</Directory>
```

Y el virtualhost queda así:

```xml
<VirtualHost *:80>
    ServerName phplamp.nazareth
    ServerAlias www.phplamp.nazareth.org
    ServerAdmin webmaster@localhost
    DocumentRoot /usr/share/phpmyadmin

    <Directory /usr/share/phpmyadmin>
        Options SymLinksIfOwnerMatch
        DirectoryIndex index.php

        <IfModule mod_php7.c>
            php_admin_value upload_tmp_dir /var/lib/phpmyadmin/tmp
            php_admin_value open_basedir /usr/share/phpmyadmin/:/usr/share/doc/phpmyadmin/:/etc/phpmyadmin/:/var/lib/phpmyadmin/:/usr/share/php/:/usr/share/javascript/
        </IfModule>

    </Directory>

    <Directory /usr/share/phpmyadmin/templates>
        Require all denied
    </Directory>

    <Directory /usr/share/phpmyadmin/libraries>
        Require all denied
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Para que el virtualhost funcione, tenemos que habilitarlo:

```bash
sudo a2ensite phplamp.nazareth.conf
```

Y reiniciar el servicio:

```bash
sudo systemctl restart apache2
```

Editamos el fichero `/etc/hosts` para añadir la nueva dirección:

```bash
192.168.1.90 www.phplamp.nazareth.org
```

![phpma](/img/SRI+HLC/taller3SRI3-5.png)


**6. Accede a phpmyadmin y comprueba que puedes acceder con el usuario que creaste en el punto 1 y que puede gestionar su base de datos.**

![phpma](/img/SRI+HLC/taller3SRI3-6.png)


## Entrega

### 1. Una captura donde se vea la base de datos que has creado en el punto 1.

![phpma](/img/SRI+HLC/taller3SRI3-6.png)

### 2. ¿Cómo has quitado la configuración de acceso a phpmyadmin en el punto 5?

Usando el comando `a2disconf`.

### 3. Entrega una captura de la configuración del virtualhost.

![phpma](/img/SRI+HLC/taller3SRI3-7.png)

### 4. Entrega una captura con el acceso a phpmyadmin con el usuario que creaste en el punto 1.

![phpma](/img/SRI+HLC/taller3SRI3-8.png)
