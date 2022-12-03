---
sidebar_position: 16
---

# Instalación/migración de aplicaciones web PHP

## Escenario


**Crea un escenario con vagrant o kvm con las siguiente características:**

* **Dos máquinas virtuales que se llamen servidor_web_tunombre y servidor_bd_tunombre.**

* **La máquina servidor_web_tunombre estará conectada una red pública.**

* **Las dos máquinas están conectadas entre si por una red muy aislada.**

Se ha creado un escenario con vagrant de tal manera que queda de la siguiente manera el fichero `Vagrantfile`:

```bash
Vagrant.configure("2") do |config|

    config.vm.define :web do |web|
      web.vm.box = "debian/bullseye64"
      web.vm.hostname = "servidor-web-nazareth"
      web.vm.synced_folder ".", "/vagrant", disabled: true

    web.vm.network :private_network,
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.2"

    web.vm.network :public_network,
      :dev => "virbr0",
      :mode => "bridge",
      :type => "bridge"

    web.vm.network :private_network,
      :libvirt__network_name => "red1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.10",
      :libvirt__forward_mode => "veryisolated"
    end

##################################################################

    config.vm.define :bd do |bd|
      bd.vm.box = "generic/ubuntu2010"
      bd.vm.hostname = "servidor-bd-nazareth"
      bd.vm.synced_folder ".", "/vagrant", disabled: true

    bd.vm.network :private_network,
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.4"

    bd.vm.network :public_network,
      :dev => "virbr0",
      :mode => "bridge",
      :type => "bridge"

    bd.vm.network :private_network,
      :libvirt__network_name => "red1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.11",
      :libvirt__forward_mode => "veryisolated"
    end

end
```

### Instalación de un CMS PHP en mi servidor local


* **Selecciona un CMS escrito en PHP para desplegarlo en nuestra infraestructura. No se puede elegir ni WordPress (que lo hemos visto en un vídeo, ni NextCloud que lo instalaremos a continuación).**

* **Configura en la máquina servidor_web_tunombre un servidor web apache2 que ejecute PHP, con un VirtualHost, para que el CMS sea accesible desde la dirección: www.nombrealumno.org.**

* **Configura en la máquina servidor_bd_tunombre una base de datos. Crea un usuario con privilegios sobre la base de datos donde se van a guardar los datos del CMS. Configura la base de datos para que permita conexión desde la otra máquina.**

* **Descarga el CMS seleccionado y realiza la instalación.**

* **Realiza una configuración mínima de la aplicación (Cambia la plantilla, crea algún contenido, …)**

* **Instala un módulo para añadir alguna funcionalidad al CMS.**


### Instalación de un CMS NextCloud


* **Instala el CMS PHP NextCloud en otro host virtual con el que accedemos con el nombre cloud.nombrealumno.org.**


### Migración a tu VPS


* **Configura en tu VPS un servidor LEMP.**

* **Configura un registro DNS en tu servidor DNS de tipo CNAME para que el nombre www apunte al nombre de vuestro servidor.**

* **Realiza la migración de tus aplicaciones web a tu VPS. La primera aplicación debe ser accesible desde la URL www.tudominio.algo/portal, y el NextCloud con la URL www.tudominio.algo/cloud. ¿Cuántos virtual hosts tendrás que configurar en el servidor web de tu VPS?**

* **Al acceder a www.tudominio.algo se debe hacer una redirección a www.tudominio.algo/portal.**

* **Instala en un ordenador el cliente de NextCloud y realiza la configuración adecuada para acceder a “tu nube”.**


## Entrega


### 1. De la Tarea 1, entrega la configuración del virtualhost.

Antes de esto se ha instalado en el servidor `apache2`, `libapache2-mod-php` y `libapache2-mpm-itk`(este es necesario para poder usar el CMS **drupal**).

Para realizar la configuración del virtualhost se ha creado y modificado el fichero `/etc/apache2/sites-available/drupal.conf` con contenido:

```bash
<VirtualHost *:80>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/drupal-9.4.8
        ServerName www.belennazareth.org

        <Directory /var/www/html/drupal-9.4.8/>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>    

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```


### 2. De la Tarea 1, la configuración de resolución estática.

En el fichero `/etc/hosts` de nuestra máquina ponemos las siguientes líneas:

```bash
# drupal

192.168.122.168 www.belennazareth.org
```

Y en el servidor web también lo modificamos para que pueda acceder a la base de datos mediante resolución estática:

```bash
# drupal

192.168.0.11 mariadb
```


### 3. De la Tarea 1, una captura de pantalla donde se vea el acceso a la aplicación.

Primero creamos la base de datos y el usuario para `drupal`:

![Term](/img/IAW/migracionPHPIAW2-2.png)

Accedemos a la página escribiendo las credenciales de la base de datos:

![Term](/img/IAW/migracionPHPIAW2.png)

Instalamos las extensiones php necesarias para el funcionamiento de drupal

    apt install php-common php-mysql php-gmp php-curl php-intl php-mbstring php-xmlrpc php-gd php-xml php-cli php-zip unzip -y

Habilitamos el directorio de translations:

    mkdir sites/default/files/translations

Y damos permisos al servidor web cambiando roles:

    chown -R www-data:www-data /var/www/html/drupal-9.4.8

En la aplicación web configuramos las credenciales hacia la base de datos:

![Term](/img/IAW/migracionPHPIAW2-3.png)

Al terminar la configuración aparecerá la siguiente página:

![Term](/img/IAW/migracionPHPIAW2-4.png)

Y creamos un primer post:

![Term](/img/IAW/migracionPHPIAW2-5.png)


### 4. De la Tarea 1, indica que plugin has instalado.

Se ha instalado el plugin para añadir un calendario y el plugin para añadir vídeos de Youtube.
Para esto se ha introducido la URL del módulo en el apartado 'ampliar', de este modo se añadirá como otra opción más de ampliación.
Por ejemplo:

![Term](/img/IAW/migracionPHPIAW2-9.png)

Al aceptar la instalación aparecerá un mensaje parecido al siguiente:

![Term](/img/IAW/migracionPHPIAW2-10.png)

Para poder añadir las extensiones a los artículos o a las páginas entramos en `inicio > Administración > Estructura > Tipos de contenido > [Artículo/Página] > Administrar campos` y entramos en `Añadir un campo`, apareciendo algo similar a:

![Term](/img/IAW/migracionPHPIAW2-11.png)

Se indican el número de valores permitidos y se configuran los valores que va a tomar la extensión en la página o artículo:

![Term](/img/IAW/migracionPHPIAW2-12.png)
![Term](/img/IAW/migracionPHPIAW2-13.png)

Vemos como aparecen las opciones en la creación del artículo:

![Term](/img/IAW/migracionPHPIAW2-15.png)

Y el resultado:

![Term](/img/IAW/migracionPHPIAW2-16.png)


### 5. De la Tarea 2, una captura de pantalla donde se vea el acceso a la aplicación.

El primer paso será instalar los módulos de PHP exigidos por nextcloud:

     sudo apt install -y php php-gd php-curl php-zip php-dom php-xml php-simplexml php-mbstring

Creamos el fichero para el virtualhost en `/etc/apache2/sites-available/` como `nextcloud.conf` añadiendo:

```bash
<VirtualHost *:80>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/nextcloud
        ServerName cloud.belennazareth.org

        <Directory /var/www/html/nextcloud/>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>    

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

Cambiamos al usuario `www-data` el directorio `/var/www/html/nextcloud` de forma recursiva:

    chown -R www-data: nextcloud/

Para habilitar la configuración ejecutamos:

    a2ensite nextcloud.conf

Y reiniciamos apache con `systemctl restart apache2`.

En el servidor de base de datos Mariadb creamos una base de datos y un usuario para nextcloud:

```bash
create database nextcloud;
create user nextcloud identified by 'nextcloud';
grant all privileges on nextcloud.* to nextcloud;
```

Después para poder acceder a la página de forma local añadimos la siguiente línea al fichero local `/etc/hosts`:

```bash
# nextcloud

192.168.122.168 cloud.belennazareth.org
```

Al entrar a la dirección `cloud.belennazareth.org` aparecerá la página de configuración de nextcloud:

![Term](/img/IAW/migracionPHPIAW2-17.png)

Aparecerá como sugerencia la instalación de varias aplicaciones dentro de nuestro nextcloud, y una vez que termine aparecerá el entorno:

![Term](/img/IAW/migracionPHPIAW2-18.png)
![Term](/img/IAW/migracionPHPIAW2-19.png)

 
### 6. De la Tarea 3, documenta de la forma más precisa posible cada uno de los pasos que has dado para migrar una de las dos aplicaciones.

Se realizará la configuración de un servidor LEMP en la VPS instalando Nginx y Mariadb, además de los módulos necesarios para PHP tanto para drupal como para nextcloud:

    apt install nginx
    apt install mariadb-server

    apt install php-common php-mysql php-gmp php-curl php-intl php-mbstring php-xmlrpc php-gd php-xml php-cli php-zip unzip -y

    apt install -y php php-gd php-curl php-zip php-dom php-xml php-simplexml php-mbstring php-fpm
  
Una vez instalado todo lo anterior se transfieren desde el servidor web los datos de `drupal` y `nextcloud` por scp a la máquina VPS:

    scp drupal-9.4.8 poke@ip:
    scp nextcloud poke@ip:

Desde el servidor de la base de datos se transfieren los datos de ambas bases de datos (`drupal` y `nextcloud`), ejecutando primero el siguiente comando que guardará en un fichero `.sql` todas las bases de datos:

    mysqldump -u root -p --all-databases > alldb.sql

Después, se transfieren por scp a la máquina VPS:

    scp alldb.sql poke@ip:

Cuando tengamos todo copiado en la VPS pasamos los ficheros `drupal` y `nextcloud` al directorio `/var/www/html` y le asignamos como usuario `www-data` para que puedan acceder a los recursos:

    cp -r drupal-9.4.8/ /var/www/html/
    cp -r nextcloud/ /var/www/html/

    chown www-data: drupal-9.4.8/
    chown www-data: nextcloud/

Para facilitar la asignación de rutas en la configuración del virtualhost se han modificado los nombres de los ficheros:

    mv drupal-9.4.8/ portal
    mv nextcloud/ cloud

Dentro de la VPS se ejecuta el comando de restauración para meter los datos de la base de datos de la máquina anterior:

    mysql -u root -p < alldb.sql

Al copiarse, tal vez, no nos permita la entrada a la base de datos desde el usuario `drupal` o `nextcloud`, para ello recargamos los permisos de la base de datos entrando como root (`mysql -u root -p`) y ejecutando:

    flush privileges;

Una vez restaurado todo, se crea el fichero de configuración del virtualhost en `/etc/nginx/sites-available/vps.conf` (como hemos puesto de nombre a los directorios /portal /cloud no es necesario crear un apartado location para cada uno):

```bash
server {
    listen 80;
    listen [::]:80;

    server_name www.ottershell.es;
    root /var/www/html;

    index index.php index.html index.htm index.nginx-debian.html;

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }
    location = / {
        return 301 /portal;
    }

    location /portal {
        try_files $uri $uri/ =404;
    }
  
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_intercept_errors on;
        fastcgi_request_buffering off;
    }

    location ~ /\.ht {
         deny all;
    }
 
    location ^~ /cloud {
        # set max upload size and increase upload timeout:
        client_max_body_size 512M;
        client_body_timeout 300s;
        fastcgi_buffers 64 4K;
        # Enable gzip but do not remove ETag headers
        gzip on;
        gzip_vary on;
        gzip_comp_level 4;
        gzip_min_length 256;
        gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
        gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/wasm application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;
        # HTTP response headers borrowed from cloud `.htaccess`
        add_header Referrer-Policy                      "no-referrer"   always;
        add_header X-Content-Type-Options               "nosniff"       always;
        add_header X-Download-Options                   "noopen"        always;
        add_header X-Frame-Options                      "SAMEORIGIN"    always;
        add_header X-Permitted-Cross-Domain-Policies    "none"          always;
        add_header X-Robots-Tag                         "none"          always;
        add_header X-XSS-Protection                     "1; mode=block" always;

        # Remove X-Powered-By, which is an information leak
        fastcgi_hide_header X-Powered-By;
        index index.php index.html /cloud/index.php$request_uri;

        # Rule borrowed from `.htaccess` to handle Microsoft DAV clients
        location = /cloud {
            if ( $http_user_agent ~ ^DavClnt ) {
                return 302 /cloud/remote.php/webdav/$is_args$args;
            }
        }

        # Rules borrowed from `.htaccess` to hide certain paths from clients
        location ~ ^/cloud/(?:build|tests|config|lib|3rdparty|templates|data)(?:$|/)    { return 404; }
        location ~ ^/cloud/(?:\.|autotest|occ|issue|indie|db_|console)                  { return 404; }
        location ~ \.php(?:$|/) {
            # Required for legacy support
            rewrite ^/cloud/(?!index|remote|public|cron|core\/ajax\/update|status|ocs\/v[12]|updater\/.+|oc[ms]-provider\/.+|.+\/richdocumentscode\/proxy) /cloud/index.php$request_uri;

            fastcgi_split_path_info ^(.+?\.php)(/.*)$;
            set $path_info $fastcgi_path_info;

            try_files $fastcgi_script_name =404;

            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param PATH_INFO $path_info;
           # fastcgi_param HTTPS on;

            fastcgi_param modHeadersAvailable true;         # Avoid sending the security headers twice
            fastcgi_param front_controller_active true;     # Enable pretty urls
            fastcgi_pass unix:/run/php/php7.4-fpm.sock;

            fastcgi_intercept_errors on;
            fastcgi_request_buffering off;

            fastcgi_max_temp_file_size 0;
        }
        location ~ \.(?:css|js|svg|gif|png|jpg|ico|wasm|tflite|map)$ {
            try_files $uri /cloud/index.php$request_uri;
            add_header Cache-Control "public, max-age=15778463";
            access_log off;     # Optional: Don't log access to assets

            location ~ \.wasm$ {
                default_type application/wasm;
            }
        }
        location ~ \.woff2?$ {
            try_files $uri /cloud/index.php$request_uri;
            expires 7d;         # Cache-Control policy borrowed from `.htaccess`
            access_log off;     # Optional: Don't log access to assets
        }
        # Rule borrowed from `.htaccess`
        location /cloud/remote {
            return 301 /cloud/remote.php$request_uri;
        }
        location /cloud {
            try_files $uri $uri/ /cloud/index.php$request_uri;
        }
    }

}
```

También debemos configurar los ficheros de configuración de drupal y nextcloud para que apunte hacia la base de datos local:

```bash
#Drupal: /var/www/html/portal/sites/default/settings.php

$databases['default']['default'] = array (
  'database' => 'drupal',
  'username' => 'drupal',
  'password' => 'drupal',
  'prefix' => '',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'driver' => 'mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);

#Nextcloud: /var/www/html/cloud/config/config.php

<?php
$CONFIG = array (
  'instanceid' => 'oca96tkwkj38',
  'passwordsalt' => 'qCqIfJNFhm14oSwHnr56bjqKHIiqTJ',
  'secret' => 'UwL0SItmMikTLgZhJoEX9n57wNZTtjf7/T/1ReyUtvtNVWKz',
  'trusted_domains' => 
  array (
    0 => 'www.ottershell.es',
  ),
  'datadirectory' => '/var/www/html/cloud/data',
  'dbtype' => 'mysql',
  'version' => '25.0.1.1',
  'overwrite.cli.url' => 'http://www.ottershell.es',
  'dbname' => 'nextcloud',
  'dbhost' => 'localhost:3306',
  'dbport' => '',
  'dbtableprefix' => 'oc_',
  'mysql.utf8mb4' => true,
  'dbuser' => 'nextcloud',
  'dbpassword' => 'nextcloud',
  'installed' => true,
);
```

Configuramos el DNS añadiendo una entrada CNAME haciendo que www apunte a mi servidor.

Quedaría una estructura similar a:

    www.dominio.x
    CNAME
    VPS.dominio.x




### 7. De la Tarea 3, las URL de acceso a las aplicaciones.



### 8. Capturas de pantalla donde se demuestre que esta funcionando el cliente de NextCloud.




## Notas

Para permitir que la base de datos (Mariadb) tenga acceso desde cualquier ip se modifica el fichero `/etc/mysql/mariadb.conf.d/50-server.cnf` añadiendo:

    bind-address            = 0.0.0.0

Para poder acceder a nextcloud es necesario tener instalado la versión `php 7.4` al menos, para ello descargamos la clave GPG y el repositorio PPA:

    sudo apt -y install lsb-release apt-transport-https ca-certificates 
    sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
    echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list

Actualizamos para que se apliquen los paquetes de la versión `7.4`:

    sudo apt update

    apt install php7.4-common php7.4-mysql php7.4-gmp php7.4-curl php7.4-intl php7.4-mbstring php7.4-xmlrpc php7.4-gd php7.4-xml php7.4-cli php7.4-zip unzip -y

    apt install -y php7.4 php7.4-gd php7.4-curl php7.4-zip php7.4-dom php7.4-xml php7.4-simplexml php7.4-mbstring php7.4-fpm

