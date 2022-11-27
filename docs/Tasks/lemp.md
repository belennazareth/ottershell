---
sidebar_position: 15
---

# Instalación de un servidor LEMP


## 1. Muestra un pantallazo de la salida del fichero info.php donde se vea que se está ejecutando PHP sobre un servidor nginx.

![Repo](/img/IAW/taller5IAW2.png)


## 2. En el punto 2, muestra si FPM-PHP está escuchando con Unix socket o TCP Socket) y la configuración que has hecho en nginx para trabajar con PHP-FPM.

Para configurarlo se ha editado el fichero:

    /etc/nginx/sites-available/bookmedik 

Descomentando la línea para tcp quedando de la siguiente manera:

```bash
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;

        #       # With php-fpm (or other unix sockets):
        #       fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
                fastcgi_pass 127.0.0.1:9000;
        }
```

Una posible comprobación sería ejecutar el comando `netstat -putan`:

![Repo](/img/IAW/taller5IAW2-2.png)


## 3. Pantallazos de bookmedik funcionando (después del login).

![Repo](/img/IAW/taller5IAW2-3.png)


## 4. Configuración de PHP-FPM y nginx para que funcione el punto 4.

Primero se ha descomentado en el fichero `/etc/php/7.4/fpm/pool.d/www.conf` la línea:

    listen = /run/php/php7.4-fpm.sock

Y en el fichero `/etc/nginx/sites-available/bookmedik` editamos para descomentando la línea para sockets:

```bash
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;

        #       # With php-fpm (or other unix sockets):
                fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        }
```

Y se ve que sigue funcionando la página:

![Repo](/img/IAW/taller5IAW2-4.png)


## 5. Si has utilizado el escenario anterior, ¿has cambiado algún fichero para cambiar la memoria utilizada?¿Por qué?. Si no has usado el escenario anterior, indica el fichero que has modificado.

Como se uso el mismo escenario no es necesario cambiar la memoria en  el fichero:

    /etc/php/7.4/fpm/php.ini

Y en la linea 
    
    memory_limit = 256M

Porque la configuracion php es la misma, lo unico que cambió es el servidor web de apache a nginx (no afecta a php).
