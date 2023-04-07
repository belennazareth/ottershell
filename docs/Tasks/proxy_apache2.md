---
sidebar_position: 33
---

# apache2 como proxy inverso

## Procedimiento

**1. Descarga el siguiente [fichero](https://github.com/belennazareth/ottershell/blob/main/static/img/SRI%2BHLC/ejercicio_proxy%20(2).zip) donde encontrarás un escenario vagrant y una receta ansible para configurar el siguiente escenario:**

**- Una máquina 🔹proxy🔹 conectada al exterior y a una red interna.**
**- Una máquina 🔹servidorweb🔹 conectada a la red interna.**

**En la máquina servidorweb tenemos instalado un apache2 con dos VirtualHosts (interno.example1.org y interno.example2.org). Suponemos que no podemos acceder a ella por la red de mantenimiento. Crea el escenario vagrant y pasa el ansible para configurar la máquina servidorweb.**

Creamos el escenario ejecutando `vagrant up` y pasamos el ansible con `ansible-playbook -i hosts site.yaml` en la carpeta ansible.
Hay que tener en cuenta que el fichero hosts tiene que tener la IP de la máquina servidorweb.

**2. Instala un servidor web apache2 en la máquina proxy. Vamos a configurar el proxy para acceder a las páginas del servidorweb: A la primera página con la URL www.app1.org y a la segunda página con la URL www.app2.org.**

En la máquina proxy ejecutamos `sudo apt install apache2` para instalar apache2. 


**3. Activamos los módulos necesarios:**

    a2enmod proxy proxy_http

**Reinicia el servidor web.**

    systemctl restart apache2

**4. Como se usan dos nombres distintos vamos a usar dos VirtualHosts. Veamos el VirtualHost www.app1.org, crea el fichero de configuración de esta forma:**

```bash
<VirtualHost *:80>
    ServerName www.app1.org
    ProxyPass  / "http://interno.example1.org/" 
</VirtualHost>
```

**Fíjate que no hace falta la directiva DocumentRoot. Otra forma de poner la misma configuración sería:**

```bash
<VirtualHost *:80>
    ServerName www.app1.org
    <Location "/">
        ProxyPass "http://interno.example1.org/"
    </Location>
    ...
```

**Activa el VirtualHost. Crea el VirtualHost www.app2.org**

Creamos los ficheros de configuración de los VirtualHosts en la ruta `/etc/apache2/sites-available/` y los activamos con `a2ensite nombre_fichero.conf`.


**5. Configura la resolución estática de un cliente para acceder a la máquina proxy usando los nombres www.app1.org y www.app2.org. Y accede a las páginas web.**

En la máquina cliente ejecutamos `sudo nano /etc/hosts` y añadimos las siguientes líneas:

```bash
[IP_PROXY] www.app1.org
[IP_PROXY] www.app2.org
```


**6. Al acceder a http://www.app1.org/directorio se debe realizar una redirección al directorio nuevodirectorio. Podemos comprobar que no funciona de manera adecuada, ya que la URL cambia a http://interno.example1.org/nuevodirectorio. Y no podemos acceder a interno.example1.org.**


**7. Para solucionar el problema de la redirección, vamos a usar la directiva ProxyPassReverse, para ello modifica los VirtualHost de esta manera:**

```bash
<VirtualHost *:80>
    ServerName www.app1.org
    ProxyPass  / "http://interno.example1.org/" 
    ProxyPassReverse / "http://interno.example1.org/" 
</VirtualHost>
```

**O de esta forma:**

```bash
<VirtualHost *:80>
    ServerName www.app1.org
    <Location "/">
        ProxyPass "http://interno.example1.org/"
        ProxyPassReverse "http://interno.example1.org/" 
    </Location>
    ...
```


**Vuelve a acceder a la URL http://www.app1.org/directorio y comprueba que ya funciona de manera adecuada.**

**8. Modifica la configuración del proxy para acceder a las páginas web con las siguientes URL: www.servidor.org/app1 y www.servidor.org/app2.**

Para ello creamos un virtualhost en la máquina proxy con la siguiente configuración:

```bash
<VirtualHost *:80>
    ServerName www.servidor.org
    
    <Location "/app1">
        ProxyPass "http://interno.example1.org/"
        ProxyPassReverse "http://interno.example1.org/"
    </Location>

    <Location "/app2">
        ProxyPass "http://interno.example2.org/"
        ProxyPassReverse "http://interno.example2.org/"
    </Location>
</VirtualHost>
```

En el /etc/hosts de la máquina cliente añadimos las siguientes líneas:

```bash
[IP_PROXY] www.servidor.org
```

Y reiniciamos el servicio con `systemctl restart apache2`.

## Entrega

### 1. Configuración de apache2 para la realización del punto 8.

```bash
<VirtualHost *:80>
    ServerName www.servidor.org
    
    <Location "/app1">
        ProxyPass "http://interno.example1.org/"
        ProxyPassReverse "http://interno.example1.org/"
    </Location>

    <Location "/app2">
        ProxyPass "http://interno.example2.org/"
        ProxyPassReverse "http://interno.example2.org/"
    </Location>
</VirtualHost>
```


### 2. Pantallazos donde se compruebe el acceso a las dos páginas web: www.servidor.org/app1 y www.servidor.org/app2.

![proxy](/img/SRI+HLC/taller4SRI3.png)
![proxy](/img/SRI+HLC/taller4SRI3-2.png)


### 3. Quita la directiva ProxyPassReverse y comprueba que no se sigue la redirección. Realiza una petición HEAD con curl a http://www.app1.org/directorio. ¿Qué cabecera tienes que comprobar para asegurar que la redirección no funciona?

```bash
curl -I http://www.app1.org/directorio
```

Aparece el mensaje:

```bash
HTTP/1.1 301 Moved Permanently
Date: Fri, 07 Apr 2023 17:52:04 GMT
Server: Apache/2.4.56 (Debian)
Location: http://interno.example1.org/nuevodirectorio
Content-Type: text/html; charset=iso-8859-1
```

En el `Location` se puede ver que no se sigue la redirección.


### 4. Añade la directiva ProxyPassReverse, y vuelve a hacer una petición HEAD con curl a http://www.app1.org/app/directorio. ¿Qué cabecera debemos mirar para comprobar que la redirección va a funcionar?

Volvemos a ejecutar:

```bash
curl -I http://www.app1.org/directorio
```

Y ahora aparece el mensaje:

```bash
HTTP/1.1 301 Moved Permanently
Date: Fri, 07 Apr 2023 17:54:35 GMT
Server: Apache/2.4.56 (Debian)
Location: http://www.app1.org/nuevodirectorio
Content-Type: text/html; charset=iso-8859-1
```

En el `Location` se puede ver que ahora sí se sigue la redirección.
