---
sidebar_position: 15
---

# Instalación de WordPress

## 1. Pantallazo accediendo a WordPress para comprobar que has escrito una entrada del blog.

![Repo](/img/IAW/taller6IAW2.png)
![Repo](/img/IAW/taller6IAW2-2.png)

Para realizar esto fue necesario tener montado un servidor LAMP. 

En `/var/www/html` se realiza la instalación de wordpress con `wget https://es.wordpress.org/latest-es_ES.zip` y ejecutamos `unzip latest-es_ES.zip` para extraer los ficheros.

Después, desde `/var/www` cambiamos el propietario a `www-data` con `chown www-data:www-data html/*`.

En `/etc/hosts` se añade la ip y la dirección url que se le va a asignar para poder configurar y crear el wordpress.

Una vez realizado todo lo anterior se podrá acceder con la url que se le ha asignado anteriormente y empezar la instalación.