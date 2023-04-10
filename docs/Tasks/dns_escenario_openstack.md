---
sidebar_position: 30
---

# Servidores Web, Base de Datos y DNS en nuestros escenario de OpenStack

## Procedimiento

### Servidor DNS

Vamos a instalar un servidor dns en charlie que nos permita gestionar la resolución directa e inversa de nuestros nombres. Cada alumno va a poseer un servidor dns con autoridad sobre un subdominio de nuestro dominio principal `gonzalonazareno.org`, que se llamará `tu_nombre.gonzalonazareno.org.`

Hay que tener en cuenta los siguientes aspectos:

1.- Modifica la configuración de la subred en las redes que estás usando en OpenStack para que el servidor DNS principal sea charlie (192.168.0.2). O modifica los ficheros /etc/resolv.conf de forma permanente si quieres no tocar los servidores DHCP.

2.- Modifica la configuración de los contenedores para que usen charlie como DNS.

3.- El servidor DNS que vamos a usar va a actuar como forward/caché, de tal manera que las consultas la realizará sobre nuestro servidor 192.168.202.2. Para configurar el servidor como forwarder hay que modificar el parámetro en el fichero named.conf.options.

4.- Será necesario realizar consultas desde el exterior (ya que vamos a hacer una delegación del subdominio). Determina la regla DNAT en alfa para que podamos hacer consultas DNS desde el exterior.

5.- Indica al profesor el nombre de tu dominio para que pueda realizar la delegación en el servidor DNS principal papion-dns. Recuerda que papion-dns (192.168.202.2) debe poder realizar consultas a tu servidor DNS.

6.- El servidor DNS se va a configurar en un principio de la siguiente manera:

* El servidor DNS se llama charlie.tu_nombre.gonzalonazareno.org y va a ser el servidor con autoridad para la zona tu_nombre.gonzalonazareno.org.

* El servidor debe resolver el nombre de todas las máquinas.

* El servidor debe resolver los distintos servicios (virtualhost, servidor de base de datos, servidor ldap, …).

* Vamos a usar vistas en bind9, para que el nombre de alfa se corresponda con una ip distinta según desde se realice la consulta.

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



### Servidor Web

En `bravo` vamos a instalar un servidor web apache. Configura el servidor para que sea capaz de ejecutar código php. Investiga las reglas DNAT de cortafuegos que tienes que configurar en `alfa` para, cuando accedemos a la IP flotante/pública se acceda al servidor web. La página web será accesible con el nombre `www.tu_nombre.gonzalonazareno.org.`

### Servidor de Base de Datos

En delta vamos a instalar un servidor de base de datos mariadb (`bd.tu_nombre.gonzalonazareno.org`). A este servidor de base de datos se debe permitir el acceso desde todas las máquinas del escenario.

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