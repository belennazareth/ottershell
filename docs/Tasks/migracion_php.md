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

Y damos permisos al servidor web:

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

     sudo apt-get install -y php php-gd php-curl php-zip php-dom php-xml php-simplexml php-mbstring

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




 
### 6. De la Tarea 3, documenta de la forma más precisa posible cada uno de los pasos que has dado para migrar una de las dos aplicaciones.


 
### 7. De la Tarea 3, las URL de acceso a las aplicaciones.



### 8. Capturas de pantalla donde se demuestre que esta funcionando el cliente de NextCloud.




## Notas

Para permitir que la base de datos (Mariadb) tenga acceso desde cualquier ip se modifica el fichero `/etc/mysql/mariadb.conf.d/50-server.cnf` añadiendo:

    bind-address            = 0.0.0.0

