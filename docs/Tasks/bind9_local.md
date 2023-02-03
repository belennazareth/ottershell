---
sidebar_position: 15
---

# Instalación y configuración del servidor bind9 en nuestra red local

## Procedimiento

### Instalación y configuración del servidor bind9

En primer lugar, creamos una máquina en proxmox y se configura con el usuario y contraseña, además de la clave ssh. En el fichero `/etc/hosts` añadimos la siguiente línea:

```bash
127.0.1.1 dns1.nazareth.org dns1
```

Y ejecutamos el siguiente comando para actualizar el nombre de la máquina:

```bash
sudo hostnamectl set-hostname dns1
```

Obteniendo como resultado:

```bash
usuario@dns1:~$ hostname 
dns1

usuario@dns1:~$ hostname -f
dns1.nazareth.org
```

Instalamos el servicio bind9 con el siguiente comando:

```bash
sudo apt install bind9
```

## Modificación de la configuración 

\- Para que no se intente resolver usando ipv6, se debe modificar el fichero `/etc/default/named` y añadir la siguiente línea:

    ```bash
      OPTIONS="-4 -f -u bind"
    ```

\- Para que solo se permitan consultas desde la red local, se debe modificar el fichero `/etc/bind/named.conf.options` y añadir la siguiente línea:

    ```bash
      allow-query {172.29.0.0/16; 172.22.0.0/16;};
    ```

\- Reiniciamos el servicio bind9 con el siguiente comando:

    ```bash
    sudo systemctl restart bind9
    ```

\- Hacemos un `dig` para ver que funciona de tal manera que se solicita el nombre de dominio y se obtiene la dirección ip de la máquina:

        dig @<IP de tu servidor DNS> www.josedomingo.org


```bash
nazare@ThousandSunny :~$ dig @172.22.5.136  www.josedomingo.org

; <<>> DiG 9.16.33-Debian <<>> @172.22.5.136 www.josedomingo.org
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 22687
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: a242d4befd4900d80100000063d8e90dae507b3eb8a6ebed (good)
;; QUESTION SECTION:
;www.josedomingo.org.		IN	A

;; ANSWER SECTION:
www.josedomingo.org.	900	IN	CNAME	endor.josedomingo.org.
endor.josedomingo.org.	900	IN	A	37.187.119.60

;; Query time: 656 msec
;; SERVER: 172.22.5.136#53(172.22.5.136)
;; WHEN: Tue Jan 31 11:10:21 CET 2023
;; MSG SIZE  rcvd: 112
```

\- Para que el servidor resuelva los nombres de dominio de la red local, se debe modificar el fichero `/etc/bind/named.conf.local` y añadir la siguiente línea:

```bash
zone "nazareth.org" {
    type master;
    file "db.nazareth.org";
};
```

    Esto hará que la información de la zona se guarde en db.nazareth.org que está en el directorio `/var/cache/bind`

Lo siguiente será crear el fichero `db.nazareth.org` en el directorio `/var/cache/bind` y añadir la siguiente información:

```bash
$TTL    86400
@       IN      SOA     dns1.nazareth.org. root.nazareth.org. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                          86400 )       ; Negative Cache TTL
;
@	IN	NS		dns1.nazareth.org.
@	IN	MX	10	correo.nazareth.org.

$ORIGIN nazareth.org.

dns1			    IN	A	172.22.5.136 #IP de la máquina
correo			    IN	A	172.22.200.101
asterix		        IN	A	172.22.200.102
obelix			    IN	A	172.22.200.103
www			        IN	CNAME	asterix
informatica		    IN	CNAME	asterix
ftp			        IN	CNAME	obelix
```

\- Crearemos una zona inversa para que el servidor resuelva los nombres de dominio de la red local, se debe modificar el fichero `/etc/bind/named.conf.local` y añadir la siguiente línea:

```bash
zone "22.172.in-addr.arpa" {
    type master;
    file "db.172.22.0.0";
};
```

    Esto hará que la información de la zona se guarde en db.172.22.0.0 que está en el directorio `/var/cache/bind` 

Descomentamos la siguiente línea en el fichero `/etc/bind/named.conf.local`:

```bash
include "/etc/bind/zones.rfc1918";
```

    De esta manera se incluirán todas las zonas que corresponden a las redes privadas, así evitamos que se pregunte por ellas al servidor DNS raíz.

Entramos en ese mismo fichero y comentamos su definición, ya que la hemos incluido en el fichero anterior:

```bash
...
//zone "22.172.in-addr.arpa"  { type master; file "/etc/bind/db.empty"; };
...
```

\- Creamos el fichero de zona inversa en el fichero `/var/cache/bind/db.172.22.0.0` y añadimos la siguiente información:

```bash
$TTL    86400
@       IN      SOA     dns1.nazareth.org. root.nazareth.org. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                          86400 )       ; Negative Cache TTL
;
@	IN	NS		dns1.nazareth.org.

$ORIGIN 22.172.in-addr.arpa.

136.5			IN	PTR		dns1.nazareth.org.
101.200		IN	PTR		correo.nazareth.org.
102.200		IN 	PTR		asterix.nazareth.org.
103.200		IN 	PTR		obelix.nazareth.org.
```


\- Reiniciamos el servicio bind9 con el siguiente comando:

```bash
sudo systemctl restart bind9
```

\- En otra máquina configuramos el DNS en el fichero `/etc/resolv.conf` colocándolo en primer lugar ya que se va leyendo en orden de posición:

```bash
nameserver 172.22.5.136
```

Y ejecutamos el comando `dig` para comprobar que funciona correctamente:

```bash
dig ns www.nazareth.org
```


## Entrega

**1. Responde a las preguntas del apartado 2.**

-¿Cuánto ha tardado en realizar la consulta? ¿Qué consultas se han realizado para averiguar la dirección IP?

```bash
nazare@ThousandSunny:~$ dig @172.22.5.136  www.josedomingo.org

; <<>> DiG 9.16.33-Debian <<>> @172.22.5.136 www.josedomingo.org
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5587
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: 229329b0860b2be20100000063dcc9b448b8c28492578cca (good)
;; QUESTION SECTION:
;www.josedomingo.org.		IN	A

;; ANSWER SECTION:
www.josedomingo.org.	900	IN	CNAME	endor.josedomingo.org.      #<<<🌈✨
endor.josedomingo.org.	900	IN	A	37.187.119.60                   #<<<🌈✨

;; Query time: 4688 msec        #<<<🔥🔥
;; SERVER: 172.22.5.136#53(172.22.5.136)
;; WHEN: Fri Feb 03 09:45:40 CET 2023
;; MSG SIZE  rcvd: 112
```

La primera consulta ha tardado 4688 milisegundos `;; Query time: 4688 msec`
Se ha realizado la consulta `www.josedomingo.org.	900	IN	CNAME	endor.josedomingo.org.` donde consigue el nombre del servidor, gracias a esto vemos como en la siguiente línea aparece la IP del mismo `endor.josedomingo.org.	900	IN	A	37.187.119.60`


-Realiza de nuevo la consulta. ¿Cuánto ha tardado ahora? ¿Por qué ha tardado menos? ¿Qué consultas se han realizado para averiguar la dirección IP?

```bash
nazare@ThousandSunny:~$ dig @172.22.5.136  www.josedomingo.org

; <<>> DiG 9.16.33-Debian <<>> @172.22.5.136 www.josedomingo.org
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 28371
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: bc2265e384ef0f090100000063dcc9c297e0fbe4f710b738 (good)
;; QUESTION SECTION:
;www.josedomingo.org.		IN	A

;; ANSWER SECTION:
www.josedomingo.org.	886	IN	CNAME	endor.josedomingo.org.      #<<<🌈✨
endor.josedomingo.org.	886	IN	A	37.187.119.60                   #<<<🌈✨

;; Query time: 3 msec       #<<<🔥🔥
;; SERVER: 172.22.5.136#53(172.22.5.136)
;; WHEN: Fri Feb 03 09:45:54 CET 2023
;; MSG SIZE  rcvd: 112
```

Esta vez ha tardado 3 milisegundos `;; Query time: 3 msec`, ha tardado menos porque se ha registrado en cache en el fichero `/var/cache/bind/` dentro del servidor dns, por ser recursor.


**2. El resultado de las siguientes consultas desde otra máquina:**
    
\- Dirección IP de una máquina o servicio.

```bash
usuario@debian:~$ dig www.nazareth.org

; <<>> DiG 9.16.27-Debian <<>> www.nazareth.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39622
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: f8cb1d12805018ca0100000063dcd210a9d94c153b8053ac (good)
;; QUESTION SECTION:
;www.nazareth.org.		IN	A

;; ANSWER SECTION:
www.nazareth.org.	86400	IN	CNAME	asterix.nazareth.org.
asterix.nazareth.org.	86400	IN	A	172.22.200.102      #<<<🎷🐛 IP 🎷🐛

;; Query time: 0 msec
;; SERVER: 172.22.5.136#53(172.22.5.136)
;; WHEN: Fri Feb 03 10:21:20 CET 2023
;; MSG SIZE  rcvd: 111

```

\- Servidor DNS con autoridad del dominio.

Para averiguar el servidor DNS con autoridad del dominio, se realiza una consulta de tipo NS, para averiguar el nombre del servidor DNS con autoridad del dominio:

```bash
usuario@debian:~$ dig ns www.nazareth.org

; <<>> DiG 9.16.27-Debian <<>> ns www.nazareth.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 57598
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: b0d19d6dbee3925b0100000063dcd55e6031511c11c36551 (good)
;; QUESTION SECTION:
;www.nazareth.org.		IN	NS    #<<<👻👺 NS 👻👺

;; ANSWER SECTION:
www.nazareth.org.	86400	IN	CNAME	asterix.nazareth.org.  #<<<👻👺 CNAME 👻👺

;; AUTHORITY SECTION:
nazareth.org.		86400	IN	SOA	dns1.nazareth.org. root.nazareth.org. 1 604800 86400 2419200 86400

;; Query time: 0 msec
;; SERVER: 172.22.5.136#53(172.22.5.136)
;; WHEN: Fri Feb 03 10:35:26 CET 2023
;; MSG SIZE  rcvd: 141
```

\- Servidor de correo del dominio.

```bash
usuario@debian:~$ dig mx www.nazareth.org

; <<>> DiG 9.16.27-Debian <<>> mx www.nazareth.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 41144
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: 045220b8900d341c0100000063dcd6c204406c361337968e (good)
;; QUESTION SECTION:
;www.nazareth.org.		IN	MX      #<<<🤩🥳 MX 🤩🥳

;; ANSWER SECTION:
www.nazareth.org.	86400	IN	CNAME	asterix.nazareth.org.   #<<<🤩🥳 CNAME 🤩🥳 

;; AUTHORITY SECTION:
nazareth.org.		86400	IN	SOA	dns1.nazareth.org. root.nazareth.org. 1 604800 86400 2419200 86400

;; Query time: 0 msec
;; SERVER: 172.22.5.136#53(172.22.5.136)
;; WHEN: Fri Feb 03 10:41:22 CET 2023
;; MSG SIZE  rcvd: 141

```

\- Una resolución inversa.

Para esto es necesario conocer la IP de la máquina o servicio.

```bash
usuario@debian:~$ dig -x 172.22.5.136

; <<>> DiG 9.16.27-Debian <<>> -x 172.22.5.136
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5156
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: bd90284350d965fc0100000063dcdab74bf7d2c3bbba5429 (good)
;; QUESTION SECTION:
;136.5.22.172.in-addr.arpa.	IN	PTR      #<<<😍🥰 PTR 😍🥰

;; ANSWER SECTION:
136.5.22.172.in-addr.arpa. 86400 IN	PTR	dns1.nazareth.org.    #<<<😍🥰 PTR 😍🥰

;; Query time: 4 msec
;; SERVER: 172.22.5.136#53(172.22.5.136)
;; WHEN: Fri Feb 03 10:58:15 CET 2023
;; MSG SIZE  rcvd: 113
```
