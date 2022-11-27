---
sidebar_position: 15
---


# Configuración Apache2 + fpm+php


## 1. Pantallazo donde se compruebe que tienes corriendo en tu servidor procesos PHP-FPM.

![Repo](/img/IAW/taller4IAW2.png)


## 2. Configuración que has hecho en apache2 para trabajar con PHP-FPM.

La configuración realizada ha sido primero instalar php-fpm:

    sudo apt install php-fpm

A continuación, se han ejecutado los siguientes comandos para habilitar el servicio:

    a2enmod proxy_fcgi setenvif
    a2enconf php7.4-fpm

Al ejecutarlo es necesario reiniciar apache (`systemctl restart apache2`).

Lo siguiente sera deshabilitar el módulo php y reiniciar apache para que se apliquen los cambios:

    a2dismod php7.4
    systemctl restart apache2


## 3. Pantallazo donde se vea la salida del fichero info.php donde se ve que la ejecución de PHP se hace con PHP-FPM.

![Repo](/img/IAW/taller4IAW2-2.png)


## 4. Pantallazos de bookmedik funcionando (después del login).

![Repo](/img/IAW/taller4IAW2-3.png)


## 5. Configuración de PHP-FPM y apache2 para que funcione el punto 5.

Para poder cambiar el puerto a 9000, se ha modificado el fichero de php:

    nano /etc/php/7.4/fpm/pool.d/www.conf 

Y se ha añadido la línea:

    listen = localhost:9000

En el fichero del virtualhost se añade el bloque:

```bash
        <FilesMatch \.php$>
                SetHandler "proxy:fcgi://localhost:9000"
        </FilesMatch>

```

Por último se reinicia el servicio php y apache2.

## 6. Indica el fichero que has modificado (con el path completo) para modificar el límite de memoria. Muestra un pantallazo de la salida del fichero info.php donde se vea el cambio.

Se modifica el fichero:

    /etc/php/7.4/fpm/php.ini

Cambiando el valor de la línea:

    memory_limit = 256M

![Repo](/img/IAW/taller4IAW2-4.png)

### Nota

A partir del punto 4 se ha añadido al `/etc/hosts` la dirección del virtualhost, lo que hace que aparezca la dirección `bookmedik.nazareth.org`.

