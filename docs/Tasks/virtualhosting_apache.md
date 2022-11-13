---
sidebar_position: 11
---

# VirtualHosting con Apache

## 1. Lista los ficheros que se encuentran en el directorio `/etc/apache2/sites-enabled`.

![Term](/img/IAW/taller2IAW2.png)

## 2. Muestra cómo has configurado la resolución estática.

![Term](/img/IAW/taller2IAW2-2.png)

## 3. Capturas de pantallas accediendo a los sitios web.

![Term](/img/IAW/taller2IAW2-3.png)
![Term](/img/IAW/taller2IAW2-4.png)

## 4. Repite el ejercicio cambiando los directorios de trabajo a /srv/www. ¿Qué modificación debes hacer en el fichero /etc/apache2/apache2.conf?

Para poder realizar el mismo procedimiento con `/srv/www` hay que editar el fichero `/etc/apache2/apache2.conf` añadiendo `<Directory /srv/www/>` de tal manera que quede:

![Term](/img/IAW/taller2IAW2-5.png)

