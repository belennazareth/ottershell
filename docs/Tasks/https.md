---
sidebar_position: 16
---

# Configuración de HTTPS en el VPS

Vamos a configurar el protocolo HTTPS para el acceso a nuestras aplicaciones, para ello tienes que tener en cuenta los siguiente:

1. Vamos a utilizar el servicio letsencrypt para solicitar los certificados de nuestras páginas.


2. Comprueba que el navegador tiene el certificado de Let’s Encrypt.


3. Solicita un certificado en Let’s Encrypt. Tienes dos opciones:

* Solicitar un certificado para el nombre que tienes: www.tudominio.algo.

* Solicitar un certificado wildcard *.tudominio.algo que te sirve para todos tus nombres. (Esta opción te dará más puntos).


4. Utiliza dos ficheros de configuración de nginx: uno para la configuración del virtualhost HTTP y otro para la configuración del virtualhost HTTPS.


5. Realiza una redirección o una reescritura para que cuando accedas a HTTP te redirija al sitio HTTPS.


6. Comprueba que se ha creado una tarea cron que renueva el certificado cada 3 meses.


7. Comprueba que las páginas son accesible por HTTPS y visualiza los detalles del certificado que has creado.


8. Modifica la configuración del cliente de NextCloud para comprobar que sigue en funcionamiento con HTTPS.


## Procedimientos

El primer paso para obtener el certificado será instalar `cerbot`:

    sudo apt install certbot

Lo siguiente será dejar libre el puerto 80, para ello paramos el servidor nginx:

    systemctl stop nginx

Para solicitar el **wildcard** hay que ejecutar:

```bash
sudo certbot certonly \
--manual \
--preferred-challenges=dns \
--email belennazareth29@gmail.com \
--server https://acme-v02.api.letsencrypt.org/directory \
--agree-tos \
-d *.ottershell.es
```

Los parámetros del comando son los siguientes:

🐸 certonly: obtiene o renueva un certificado, pero no lo instala.

🐸 manual: obtiene el certificado de forma interactiva.

🐸 preferred-challenges=dns: es la forma en la que se le indica a Let’s Encrypt que controlo en dominio (con DNS). Para ello pedirá que creemos un registro DNS de tipo TXT en nuestro dominio.

🐸 email: dirección de correo electrónico para notificaciones importantes relacionadas con el certificado.

🐸 server: el servidor de Let’s Encrypt contra el que se ejecutarán todas las operaciones.

🐸 agree-tos: acepto los términos de servicio de Let’s Encrypt.

🐸 d: dominio para el que quiero obtener el certificado. Lleva un asterisco, lo que indica que va a ser wildcard.

Al ejecutarlo nos da diferentes opciones:

* Primero pregunta si queremos compartir el correo con la EFF para que envíen información sobre su trabajo:

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
```


* La segunda será que la IP desde la que estoy ejecutando el comando será almacenada en registros púbicos:

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
```


* Lo siguiente que nos pide es que creemos una entrada en nuestro registro DNS de tipo TXT con los valores que nos da. El mensaje será parecido a:

```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.dominio with the following value:

{valor_ejemplo}

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue

```


* Por último, al hacer `enter`, comprobará que todo esté correcto y si es así nos dará la ruta en la que se encuentra el certificado:

```bash
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/{dominio}/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/{dominio}/privkey.pem
   Your cert will expire on 2023-03-03. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le

```

Comprobamos que se ha creado el cron, esto hará que el certificado se renueve automáticamente cada 3 meses:

    cat /etc/cron.d/certbot

```bash
# /etc/cron.d/certbot: crontab entries for the certbot package
#
# Upstream recommends attempting renewal twice a day
#
# Eventually, this will be an opportunity to validate certificates
# haven't been revoked, etc.  Renewal will only occur if expiration
# is within 30 days.
#
# Important Note!  This cronjob will NOT be executed if you are
# running systemd as your init system.  If you are running systemd,
# the cronjob.timer function takes precedence over this cronjob.  For
# more details, see the systemd.timer manpage, or use systemctl show
# certbot.timer.
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

0 */12 * * * root test -x /usr/bin/certbot -a \! -d /run/systemd/system && perl -e 'sleep int(rand(43200))' && certbot -q renew
```

En el fichero `/etc/nginx/sites-available` creamos otro fichero, en este caso una copia del que ya teníamos:

    cp vps.conf vps-https.conf

Modificamos el fichero `vps.conf`:

```bash
server {
    listen 80;
    listen [::]:80;

    server_name www.ottershell.es;
    return 301 https://$host$request_uri;
}
```

Modificamos el fichero `vps-https.conf`:

```bash
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name www.ottershell.es;
    root /var/www/html;

    index index.php index.html index.htm index.nginx-debian.html;


    ssl    on;
    ssl_certificate    /etc/letsencrypt/live/ottershell.es/fullchain.pem;
    ssl_certificate_key    /etc/letsencrypt/live/ottershell.es/privkey.pem;
...
```

Es necesario importar el certificado de Let's Encrypt si usamos google chrome.

## Entrega


### 1. Captura de pantalla para comprobar que el navegador tiene el certificado de Let’s Encrypt.

![Term](/img/IAW/migracionPHPIAW2-20.png)


### 2. ¿Qué opción has elegido? ¿Qué pruebas realiza Let’s Encrypt para asegurar que somos los administradores del sitio web al elegir esa opción?

En mi caso he elegido la opción con wildcard. He podido comprobar que Let’s Encrypt, con este tipo de certificación, pide que creemos un registro DNS de tipo TXT en nuestro dominio con un valor proporcionado por el mismo programa.

### 3. Entrega la configuración de nginx (los dos ficheros) para que funcione HTTPS y la redirección.

Para la redirección se ha creado el fichero `vps.conf` en `/etc/nginx/sites-available` con contenido:

```bash
server {
    listen 80;
    listen [::]:80;

    server_name www.ottershell.es;
    return 301 https://$host$request_uri;
}
```

Y un fichero para https llamado `vps-https.conf` `/etc/nginx/sites-available` con contenido:

```bash
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name www.ottershell.es;
    root /var/www/html;

    index index.php index.html index.htm index.nginx-debian.html;


    ssl    on;
    ssl_certificate    /etc/letsencrypt/live/ottershell.es/fullchain.pem;
    ssl_certificate_key    /etc/letsencrypt/live/ottershell.es/privkey.pem;

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

#    location /portal {
#        try_files $uri $uri/ =404;
#    }
  
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

# nextcloud
 
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

# portal

    location ^~ /portal {
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
        # HTTP response headers borrowed from portal `.htaccess`
        add_header Referrer-Policy                      "no-referrer"   always;
        add_header X-Content-Type-Options               "nosniff"       always;
        add_header X-Download-Options                   "noopen"        always;
        add_header X-Frame-Options                      "SAMEORIGIN"    always;
        add_header X-Permitted-Cross-Domain-Policies    "none"          always;
        add_header X-Robots-Tag                         "none"          always;
        add_header X-XSS-Protection                     "1; mode=block" always;

        # Remove X-Powered-By, which is an information leak
        fastcgi_hide_header X-Powered-By;
        index index.php index.html /portal/index.php$request_uri;

        # Rule borrowed from `.htaccess` to handle Microsoft DAV clients
        location = /portal {
            if ( $http_user_agent ~ ^DavClnt ) {
                return 302 /portal/remote.php/webdav/$is_args$args;
            }
        }

        # Rules borrowed from `.htaccess` to hide certain paths from clients
        location ~ ^/portal/(?:build|tests|config|lib|3rdparty|templates|data)(?:$|/)    { return 404; }
        location ~ ^/portal/(?:\.|autotest|occ|issue|indie|db_|console)                  { return 404; }
        location ~ \.php(?:$|/) {
            # Required for legacy support
            rewrite ^/portal/(?!index|remote|public|cron|core\/ajax\/update|status|ocs\/v[12]|updater\/.+|oc[ms]-provider\/.+|.+\/richdocumentscode\/proxy) /portal/index.php$request_uri;

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
            try_files $uri /portal/index.php$request_uri;
            add_header Cache-Control "public, max-age=15778463";
            access_log off;     # Optional: Don't log access to assets

            location ~ \.wasm$ {
                default_type application/wasm;
            }
        }
        location ~ \.woff2?$ {
            try_files $uri /portal/index.php$request_uri;
            expires 7d;         # Cache-Control policy borrowed from `.htaccess`
            access_log off;     # Optional: Don't log access to assets
        }
        # Rule borrowed from `.htaccess`
        location /portal/remote {
            return 301 /portal/remote.php$request_uri;
        }
        location /portal {
            try_files $uri $uri/ /portal/index.php$request_uri;
        }
    }

}
```

### 4. Entrega la configuración del cron donde se ve que se hará la renovación cada 3 meses.



### 5. Captura de pantalla accediendo a las dos páginas con https. Captura de pantalla con los detalles del certificado.



### 6. Captura de pantalla donde se vea el cliente de NextCloud conectado por https.

