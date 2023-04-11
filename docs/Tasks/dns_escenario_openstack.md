---
sidebar_position: 30
---

# Servidores Web, Base de Datos y DNS en nuestros escenario de OpenStack

## Procedimiento

### Servidor DNS

Vamos a instalar un servidor dns en charlie que nos permita gestionar la resolución directa e inversa de nuestros nombres. Cada alumno va a poseer un servidor dns con autoridad sobre un subdominio de nuestro dominio principal `gonzalonazareno.org`, que se llamará `tu_nombre.gonzalonazareno.org.`

Hay que tener en cuenta los siguientes aspectos:

1. Modifica la configuración de la **subred** en las redes que estás usando en OpenStack para que el servidor **DNS principal** sea `charlie` (192.168.0.2). O modifica los ficheros `/etc/resolv.conf` de forma permanente si quieres no tocar los servidores **DHCP**.

2. Modifica la configuración de los contenedores para que usen `charlie` como **DNS**.

3. El servidor **DNS** que vamos a usar va a actuar como `forward/caché`, de tal manera que las consultas la realizará sobre nuestro servidor `192.168.202.2`. Para configurar el servidor como **forwarder** hay que modificar el parámetro en el fichero `named.conf.options`.

4. Será necesario realizar consultas desde el exterior (ya que vamos a hacer una delegación del subdominio). Determina la regla **DNAT** en `alfa` para que podamos hacer consultas **DNS** desde el exterior.

5. Indica al profesor el nombre de tu dominio para que pueda realizar la delegación en el servidor **DNS principal papion-dns**. Recuerda que **papion-dns** (`192.168.202.2`) debe poder realizar consultas a tu servidor **DNS**.

6. El servidor **DNS** se va a configurar en un principio de la siguiente manera:

* El servidor **DNS** se llama `charlie.tu_nombre.gonzalonazareno.org` y va a ser el servidor con autoridad para la zona `tu_nombre.gonzalonazareno.org`.

* El servidor debe resolver el nombre de todas las máquinas.

* El servidor debe resolver los distintos servicios (virtualhost, servidor de base de datos, servidor ldap, …).

* Vamos a usar vistas en `bind9`, para que el nombre de `alfa` se corresponda con una ip distinta según desde se realice la consulta.

* Determina cuantas vistas vamos a crear y que nombres se van a crear en cada vista.

* Vamos a crear las zonas de resolución inversas correspondientes al direccionamiento de las redes privadas.


Primero, en `charlie`, instalamos bind9:

```bash
sudo apt-get install bind9
```

En alfa añadimos la regla DNAT para que podamos hacer consultas DNS desde el exterior:

```bash
post-up iptables -t nat -A PREROUTING -p udp --dport 53 -j DNAT --to 192.168.0.2:53
```

Después, en el fichero `/etc/bind/named.conf.local` configuramos las vistas y las zonas:

```bash
view interna {
    match-clients { 192.168.0.0/24; 127.0.0.1; };
    allow-recursion { any; };
        zone "nazareth.gonzalonazareno.org" 
        {
               type master;
               file "db.interna.nazareth.gonzalonazareno.org";
        };
        zone "0.168.192.in-addr.arpa" 
        {
               type master;
               file "db.0.168.192";
        };
        zone "16.172.in-addr.arpa" 
        {
               type master;
               file "db.16.172";
        };
        include "/etc/bind/zones.rfc1918";
        include "/etc/bind/named.conf.default-zones";
};

view externa {
    match-clients { 172.22.0.0/16; 192.168.202.2; 172.29.0.0/16;};
    allow-recursion { any; };
        zone "nazareth.gonzalonazareno.org" 
        {
               type master;
               file "db.externa.nazareth.gonzalonazareno.org";
        };
        include "/etc/bind/zones.rfc1918";
        include "/etc/bind/named.conf.default-zones";
};

view dmz {
    match-clients { 172.16.0.0/16; };
    allow-recursion { any; };
        zone "nazareth.gonzalonazareno.org"
        {
               type master;
               file "db.dmz.nazareth.gonzalonazareno.org";
        };
        zone "16.172.in-addr.arpa"
        {
               type master;
               file "db.16.172";
        };
        zone "0.168.192.in-addr.arpa"
        {
               type master;
               file "db.0.168.192";
        };
        include "/etc/bind/zones.rfc1918";
        include "/etc/bind/named.conf.default-zones";
};
```

🟪👾⏩**IMPORTANTE:** HAY QUE MODIFICAR EL FICHERO `/etc/bind/named.conf` Y COMENTAR LA LINEA `include "/etc/bind/named.conf.default-zones";` PARA QUE NO SE CARGUEN LAS ZONAS POR DEFECTO Y PODAMOS USAR `include` EN EL FICHERO `/etc/bind/named.conf.local`.⏪👾🟪

Donde, meteremos por zonas lo que va a resolver cada vista. En este caso, la vista `interna` resolverá las zonas `nazareth.gonzalonazareno.org` y las zonas de resolución inversa de las redes privadas. La vista `externa` resolverá las zonas `nazareth.gonzalonazareno.org` y las zonas de resolución inversa de las redes privadas. La vista `dmz` resolverá las zonas `nazareth.gonzalonazareno.org` y las zonas de resolución inversa de las redes privadas.

En el fichero `/etc/bind/named.conf` añadimos las vistas:

```bash
include "/etc/bind/named.conf.local";
include "/etc/bind/named.conf.options";
include "/etc/bind/named.conf.default-zones";
```

Después, creamos los ficheros de configuración de las zonas:

```bash
touch /var/cache/bind/db.interna.nazareth.gonzalonazareno.org
touch /var/cache/bind/db.externa.nazareth.gonzalonazareno.org
touch /var/cache/bind/db.dmz.nazareth.gonzalonazareno.org
```

Y, por último, configuramos las zonas:

* `db.interna.nazareth.gonzalonazareno.org`:

```bash
$TTL 86400
@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (
                             1         ; Serial
                        604800         ; Refresh
                         86400         ; Retry
                       2419200         ; Expire
                        86400 )        ; Negative Cache TTL
;
@       IN      NS      charlie.nazareth.gonzalonazareno.org.

$ORIGIN nazareth.gonzalonazareno.org.

alfa    IN      A       192.168.0.1
bravo   IN      A       172.16.0.200
charlie IN      A       192.168.0.2
delta   IN      A       192.168.0.3
bd      IN      CNAME   delta
dns     IN      CNAME   charlie
www     IN      CNAME   bravo
```

*Nota: En alfa se pone la red a la que se conectan los contenedores, en este caso la 192.168.0.1

![dns](/img/SRI+HLC/DNSSRI5.png)


* `db.externa.nazareth.gonzalonazareno.org`:

```bash
$TTL 86400
@       IN      SOA     alfa.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (
                             1         ; Serial
                        604800         ; Refresh
                         86400         ; Retry
                       2419200         ; Expire
                        86400 )        ; Negative Cache TTL
;
@       IN      NS      alfa.nazareth.gonzalonazareno.org.

$ORIGIN nazareth.gonzalonazareno.org.

alfa    IN      A       172.22.200.255
dns     IN      CNAME   alfa
www     IN      CNAME   alfa
```

*Nota: En alfa se pone la red a la que se accede al exterior, en este caso la 172.22.200.255, además, en este caso, al ser la red externa, no se pone la red a la que se conectan los contenedores, ya que no se conectan a ninguna. Y se pone en origin el nombre de alfa, ya que es el servidor que resuelve las zonas externas.

![dns](/img/SRI+HLC/DNSSRI5-2.png)


* `db.dmz.nazareth.gonzalonazareno.org`:

```bash
$TTL 86400
@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (
                             1         ; Serial
                        604800         ; Refresh
                         86400         ; Retry
                       2419200         ; Expire
                        86400 )        ; Negative Cache TTL
;
@       IN      NS      charlie.nazareth.gonzalonazareno.org.

$ORIGIN nazareth.gonzalonazareno.org.

alfa    IN      A       172.16.0.1
bravo   IN      A       172.16.0.200
charlie IN      A       192.168.0.2
delta   IN      A       192.168.0.3
bd      IN      CNAME   delta
dns     IN      CNAME   charlie
www     IN      CNAME   bravo
```

*Nota: En alfa la red conectada a la DMZ, en este caso la 172.16.0.1

![dns](/img/SRI+HLC/DNSSRI5-3.png)


Lo siguiente será configurar las zonas inversas dentro del directori `/var/cache/bind/`:

* `db.0.168.192`:

```bash
$TTL 86400
@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (
                             1         ; Serial
                        604800         ; Refresh
                         86400         ; Retry
                       2419200         ; Expire
                        86400 )        ; Negative Cache TTL
;
@       IN      NS      charlie.nazareth.gonzalonazareno.org.

$ORIGIN 0.168.192.in-addr.arpa.

1       IN      PTR     alfa.nazareth.gonzalonazareno.org.
2       IN      PTR     charlie.nazareth.gonzalonazareno.org.
3       IN      PTR     delta.nazareth.gonzalonazareno.org.
```

*Nota: En este caso, en origin se pone la dirección inversa de la red a la que se conectan los contenedores, en este caso la 0.168.192.in-addr.arpa. Y en el PTR se pone el nombre de la máquina y el dominio. En este caso, al ser la red interna, se pone el nombre de la máquina y el dominio, ya que es el servidor que resuelve las zonas internas por eso no es necesario poner la ip.

![dns](/img/SRI+HLC/DNSSRI5-4.png)


* `db.16.172`:

```bash
$TTL 86400
@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (
                             1         ; Serial
                        604800         ; Refresh
                         86400         ; Retry
                       2419200         ; Expire
                        86400 )        ; Negative Cache TTL
;
@       IN      NS      charlie.nazareth.gonzalonazareno.org.

$ORIGIN 16.172.in-addr.arpa.

1.0       IN      PTR     alfa.nazareth.gonzalonazareno.org.
200.0     IN      PTR     bravo.nazareth.gonzalonazareno.org.
```

*Nota: Se debe poner 1.0 y 200.0 porque para que sea válido el PTR, debe incluir los dos octetos de la dirección ip separados por un punto en orden inverso.

![dns](/img/SRI+HLC/DNSSRI5-5.png)


Hay que desactivar las zonas inversas por defecto que se crean al instalar el servidor DNS, para ello, hay que editar el archivo `/etc/bind/zones.rfc1918` y comentar las líneas que contienen las zonas inversas.

![dns](/img/SRI+HLC/DNSSRI5-6.png)

Configuramos el archivo `/etc/bind/named.conf.options` para que el servidor papión haga de forwarder (es decir, que resuelva las zonas externas):

![dns](/img/SRI+HLC/DNSSRI5-7.png)

Reiniciamos el servicio DNS:

```bash
systemctl restart bind9
```

En alfa editamos el fichero `/etc/resolvconf/resolv.conf.d/head` para que el servidor DNS sea el servidor DNS de la DMZ y reiniciamos el servicio para que se apliquen los cambios en el fichero `/etc/resolv.conf`, de esta manera si se reinicia la máquina, el fichero `/etc/resolv.conf` se volverá a generar con los cambios que hemos hecho:

```bash
sudo nano /etc/resolvconf/resolv.conf.d/head

nameserver 192.168.0.2

sudo resolvconf -u
```


### Servidor Web

En `bravo` vamos a instalar un servidor web apache. Configura el servidor para que sea capaz de ejecutar código php. Investiga las reglas DNAT de cortafuegos que tienes que configurar en `alfa` para, cuando accedamos a la IP flotante/pública se acceda al servidor web. La página web será accesible con el nombre `www.tu_nombre.gonzalonazareno.org.`

En alfa hay que añadir en `/etc/network/interfaces/50-cloud-init` la siguiente línea:

```bash
post-up iptables -t nat -A PREROUTING -p tcp --dport 80 -i ens3 -j DNAT --to 172.16.0.200
```

Para instalar el servidor web apache, ejecutamos el siguiente comando:

```bash
sudo dnf install httpd
```

Para instalar el módulo de php, ejecutamos el siguiente comando:

```bash
sudo dnf install php php-mysqlnd php-gd php-fpm
```

Iniciamos el servicio apache y php-fpm:

```bash
sudo systemctl enable httpd
sudo systemctl enable php-fpm
```

**SI NO EXISTEN** creamos `sites-available` y `sites-enabled` dentro de `/etc/httpd/`:

```bash
sudo mkdir /etc/httpd/sites-available
sudo mkdir /etc/httpd/sites-enabled
```

Añadimos la siguiente línea al final del archivo `/etc/httpd/conf/httpd.conf`:

```bash
IncludeOptional sites-enabled/*.conf
```

Creamos el archivo `/etc/httpd/sites-available/www.nazareth.gonzalonazareno.org.conf` con el siguiente contenido:

```bash
<VirtualHost *:80>
       ServerName www.nazareth.gonzalonazareno.org
       DocumentRoot /var/www/html/nazareth
       ErrorLog /var/log/httpd/nazareth-error.log
       CustomLog /var/log/httpd/access-nazareth-error.log combined
       <FilesMatch \.php$>
              SetHandler "proxy:unix:/run/php-fpm/www.sock|fcgi://localhost"
       </FilesMatch>
</VirtualHost>
```
curl www.nazareth.gonzalonazareno.org

Hacemos el enlace simbólico del archivo creado en `sites-available` a `sites-enabled`:

```bash
sudo ln -s /etc/httpd/sites-available/www.nazareth.gonzalonazareno.org.conf /etc/httpd/sites-enabled/www.nazareth.gonzalonazareno.org.conf
```

Creamos el fichero `info.php` en `/var/www/html/nazareth` con el siguiente contenido:

```bash
<?php
phpinfo();
?>
```

Creamos el `index.html` en `/var/www/html/nazareth` con el siguiente contenido:

```bash
<html>
       <head>
              <title> Welcome :) </title>
       </head>
       
       <body>
              <h1> · Web en escenario Rocky Linux · </h1>
              <p>...</p>
       </body>
</html>
```

Modificamos el fichero `/etc/sysconfig/selinux` para que el SELinux funcione correctamente:

```bash
SELINUX=disabled
```

*Nota: sestatus para ver el estado del SELinux.

Reiniciamos la máquina para que se apliquen los cambios.


*Nota: Si aparece un error del servicio y en systemctl status no da info del error, se puede ver en el log del servicio en el fichero `/var/log/httpd/error_log` o `/var/log/httpd/access_log` si es un error de permisos, por ejemplo.

Entramos en la web desde el navegador y comprobamos que funciona correctamente:

![dns](/img/SRI+HLC/DNSSRI5-8.png)


### Servidor de Base de Datos

En `delta` vamos a instalar un servidor de base de datos mariadb (`bd.tu_nombre.gonzalonazareno.org`). A este servidor de base de datos se debe permitir el acceso desde todas las máquinas del escenario.

En delta instalamos mariadb:

```bash
sudo apt install mariadb-server
```

Configuramos Mariadb para poder acceder de forma remota:

```bash
sudo mysql_secure_installation
```

Obteniendo como salida:

```bash
nazare@delta:~$ sudo mysql_secure_installation

NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MariaDB to secure it, we'll need the current
password for the root user.  If you've just installed MariaDB, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

Enter current password for root (enter for none): 
OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MariaDB
root user without the proper authorisation.

You already have a root password set, so you can safely answer 'n'.

Change the root password? [Y/n] n
 ... skipping.

By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] 
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] 
 ... Success!

By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] 
 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] 
 ... Success!

Cleaning up...

All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!
```

Creamos el usuario `nazareth` y le damos permisos para acceder desde cualquier máquina:

```bash
CREATE USER 'nazareth'@'%' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON *.* TO 'nazareth'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

Habilitamos el acceso remoto a la base de datos editando el fichero `/etc/mysql/mariadb.conf.d/50-server.cnf` en la línea `bind-address` añadiendo:

```bash
bind-address = 0.0.0.0
```

De esta forma, el servidor de base de datos escuchará en todas las interfaces de red. Después reiniciamos el servicio:

```bash
sudo systemctl restart mariadb
```


## Entrega

### 1. Entrega la configuración DNS de cada máquina.


### 2. Entrega la definición de las vistas y de las zonas.


### 3. Entrega el resultado de las siguientes consultas desde una máquina interna a nuestra red y otro externo:

* El servidor DNS con autoridad sobre la zona del dominio tu_nombre.gonzalonazareno.org.

* La dirección IP de alfa.

* Una resolución de www.

* Una resolución de bd.

* Un resolución inversa de IP fija en cada una de las redes. (Esta consulta sólo funcionará desde una máquina interna).

### 4. Entrega una captura de pantalla accediendo a www.tunombre.gonzalonazareno.org/info.php donde se vea la salida del fichero info.php.



### 5. Entrega una prueba de funcionamiento donde se vea como se realiza una conexión a la base de datos desde bravo.



*Nota: Para las views y zones ext.,int. y dmz → https://www.josedomingo.org/pledin/2017/12/vistas-views-en-el-servidor-dns-bind9/ 