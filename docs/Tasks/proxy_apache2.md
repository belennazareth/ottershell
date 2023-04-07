---
sidebar_position: 33
---

# apache2 como proxy inverso

## Procedimiento

**1. Descarga el siguiente fichero donde encontrarás un escenario vagrant y una receta ansible para configurar el siguiente escenario:**

**- Una máquina proxy conectada al exterior y a una red interna.**
**- Una máquina servidorweb conectada a la red interna.**

**En la máquina servidorweb tenemos instalado un apache2 con dos VirtualHosts (interno.example1.org y interno.example2.org). Suponemos que no podemos acceder a ella por la red de mantenimiento. Crea el escenario vagrant y pasa el ansible para configurar la máquina servidorweb.**

**2. Instala un servidor web apache2 en la máquina proxy. Vamos a configurar el proxy para acceder a las páginas del servidorweb: A la primera página con la URL www.app1.org y a la segunda página con la URL www.app2.org.**


**3. Activamos los módulos necesarios:**

    a2enmod proxy proxy_http

**Reinicia el servidor web.**


**4. Como se usan dos nombres distintos vamos a usar dos VirtualHosts. Veamos el VirtualHost www.app1.org, crea el fichero de configuración de esta forma:**

```bash
<VirtualHost *:80>
    ServerName www.app1.org
    ProxyPass  / "http://interno.example1.org/" 
    ...
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

**5. Configura la resolución estática de un cliente para acceder a la máquina proxy usando los nombres www.app1.org y www.app2.org. Y accede a las páginas web.**


**6. Al acceder a http://www.app1.org/directorio se debe realizar una redirección al directorio nuevodirectorio. Podemos comprobar que no funciona de manera adecuada, ya que la URL cambia a http://interno.example1.org/nuevodirectorio. Y no podemos acceder a interno.example1.org.**


**7. Para solucionar el problema de la redirección, vamos a usar la directiva ProxyPassReverse, para ello modifica los VirtualHost de esta manera:**

```bash
<VirtualHost *:80>
    ServerName www.app1.org
    ProxyPass  / "http://interno.example1.org/" 
    ProxyPassReverse / "http://interno.example1.org/" 
    ...
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



## Entrega

### 1. Configuración de apache2 para la realización del punto 8.


### 2. Pantallazos donde se compruebe el acceso a las dos páginas web: www.servidor.org/app1 y www.servidor.org/app2.


### 3. Quita la directiva ProxyPassReverse y comprueba que no se sigue la redirección. Realiza una petición HEAD con curl a http://www.app1.org/directorio. ¿Qué cabecera tienes que comprobar para asegurar que la redirección no funciona?

### 4. Añade la directiva ProxyPassReverse, y vuelve a hacer una petición HEAD con curl a http://www.app1.org/app/directorio. ¿Qué cabecera debemos mirar para comprobar que la redirección va a funcionar?


