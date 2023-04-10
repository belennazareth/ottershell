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

**IMPORTANTE:** HAY QUE MODIFICAR EL FICHERO `/etc/bind/named.conf` Y COMENTAR LA LINEA `include "/etc/bind/named.conf.default-zones";` PARA QUE NO SE CARGUEN LAS ZONAS POR DEFECTO Y PODAMOS USAR `include` EN EL FICHERO `/etc/bind/named.conf.local`.

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


### Servidor Web

En `bravo` vamos a instalar un servidor web apache. Configura el servidor para que sea capaz de ejecutar código php. Investiga las reglas DNAT de cortafuegos que tienes que configurar en `alfa` para, cuando accedamos a la IP flotante/pública se acceda al servidor web. La página web será accesible con el nombre `www.tu_nombre.gonzalonazareno.org.`



### Servidor de Base de Datos

En `delta` vamos a instalar un servidor de base de datos mariadb (`bd.tu_nombre.gonzalonazareno.org`). A este servidor de base de datos se debe permitir el acceso desde todas las máquinas del escenario.

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