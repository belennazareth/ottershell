---
sidebar_position: 14
---

# Instalación de nginx con PHP

## 1. Entrega la URL del repositorio GitHub donde has alojado la práctica.

https://github.com/belennazareth/nginx_php


## 2. Pantallazos para comprobar que se han creado los dos virtualhost después de ejecutar la receta ansible.

Al realizar la receta ansible resulta:

![Term](/img/SRI+HLC/nginxphpSRI.png)

Y si consultamos en la máquina `servidorweb` podemos ver los virtualhosts:

![Term](/img/SRI+HLC/nginxphpSRI-2.png)


## 3. Comprobación de que al acceder a www.pagina1.org se produce una redirección. Pantallazo accediendo desde un navegador web.

Para realizar la redirección se edita el fichero `/etc/nginx/sites-available/vhost1.conf` en la máquina **servidorweb** añadiendo:

```bash
location = / {
  return 301 /principal;
}
```

Además de la línea para `principal`:

```bash
location /principal {
    try_files $uri $uri/ /index.html;
}
```

Se tiene que crear el directorio `/principal` con un fichero `index.html`, en `/srv/www/pagina1`.

![Term](/img/SRI+HLC/nginxphpSRI-3.png)

Podemos mostrar una página web estática copiando el fichero de construcción de la página en el directorio `/srv/www/pagina1/` poniéndole de nombre `principal`, después será necesario ejecutar el siguiente comando para que cambie las rutas del `index` a `/principal`:

    sed -i 's/"\//"\/principal\//g' index.html

![Term](/img/SRI+HLC/nginxphpSRI-4.png)


## 4. Pantallazo accediendo a www.pagina1.org/principal/documentos (pon algunos ficheros para que se vea la lista).

Se crea el directorio `/srv/doc` con ficheros dentro de ejemplo.
A `/etc/nginx/sites-available/vhost1.conf` se le añade un alias para poder entrar a los ficheros alojados en `/srv/doc`:

```bash
        location /principal/documentos {
        alias /srv/doc;
        autoindex on;
    }
```
![Term](/img/SRI+HLC/nginxphpSRI-5.png)

![Term](/img/SRI+HLC/nginxphpSRI-6.png)

Entra [aquí](https://github.com/belennazareth/2ASIR/tree/main/SRI%2BHLC/nginx%2Bphp) para ver los ficheros de `/srv/doc` y la copia de `/etc/nginx/sites-available/vhost1.conf`.


## 5. Pantallazos de la autentificación básica.

Para la autentificación básica primero se instala el paquete:

    apt-get install nginx apache2-utils

Se crea el usuario y contraseña:

    htpasswd -c /etc/nginx/.htpasswd totakeke

![Term](/img/SRI+HLC/nginxphpSRI-7.png)

Se crea el directorio `/secreto` en `/srv/www/pagina1` con un fichero `index.html`. (igualmente se puede encontrar en este [repositorio](https://github.com/belennazareth/2ASIR/tree/main/SRI%2BHLC/nginx%2Bphp))

Se añade en `/etc/nginx/sites-available/vhost1.conf`:

    location /secreto {
            try_files $uri $uri/ =404;
            auth_basic "contraseñita y eso";
            auth_basic_user_file /etc/nginx/.htpasswd;
    }

![Term](/img/SRI+HLC/nginxphpSRI-8.png)

![Term](/img/SRI+HLC/nginxphpSRI-9.png)


## 6. Finalmente, configura la receta ansible para desactivar el virtualhost www.pagina2.org. Pasa de nuevo la receta y manda algún prueba de que se ha borrado dicho VirtualHost.



### Notas

Para crear un nuevo virtualhost tendremos que crear dentro de `ansible/group_vars/all` un nuevo **vhost** y hay que crear un fichero llamado `index_vhost[numero].html` en `ansible/roles/nginx/files/`.