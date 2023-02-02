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
correo			  IN	A	172.22.200.101
asterix		    IN	A	172.22.200.102
obelix			  IN	A	172.22.200.103
www			      IN	CNAME	asterix
informatica		IN	CNAME	asterix
ftp			      IN	CNAME	obelix
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

\- En otra máquina configuramos el DNS en el fichero `/etc/resolv.conf`:

```bash
nameserver 172.22.5.136
```

Y ejecutamos el comando `dig` para comprobar que funciona correctamente:

```bash
dig www.nazareth.org
```
## Entrega