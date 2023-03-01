---
sidebar_position: 29
---

# Delegación de subdominios con bind9

# Procedimiento

**************************
| IPs |
| :-: |
| Servidor: 172.22.5.136 |
| Cliente: 172.22.1.35 |
| Esclavo: 172.22.4.145 |
| Delegado: 172.22.2.233 |
**************************

1.- Crea una nueva máquina e instala un servidor DNS bind9, será el servidor DNS con autoridad para la zona delegada que será informatica.tunombre.org. Nombra de manera adecuada esta máquina para que tenga el nombre dns.informatica.tunombre.org. Voy a suponer que la dirección de esta nueva máquina es la 172.22.200.120.

Para esto ejecutamos el siguiente comando:

```bash
sudo hostnamectl set-hostname dns
```

Y editamos el fichero /etc/hosts para que tenga el nombre dns2.tunombre.org:

```bash
127.0.1.1 dns.informatica.nazareth.org dns
```

* Tendremos el servidor dns1.tunombre.org (y el esclavo dns2.tunombre.org) con autoridad para la zona tunombre.org. En esta zona, por ejemplo, puede existir el nombre www.tunombre.org. `(El fichero /etc/bind/named.conf.local del servidor es el que se encarga de indicar que zonas son administradas por el servidor. En este fichero debe existir una línea que indique que el servidor es el autoritativo de la zona tunombre.org. Dentro se indica el fichero de configuración de la zona, en este caso /var/cache/bind/db.tunombre.org.)`


* Tendremos el servidor dns.informatica.tunombre.org con autoridad sobre el subdominio delegado, es decir tendrá autoridad para la zona informatica.tunombre.org. En esta zona, por ejemplo, puede existir el nombre www.informatica.tunombre.org.

Para esto tenemos que modificar el fichero /etc/bind/named.conf.local y añadir la IP del servidor DNS con autoridad para la zona delegado en el apartado `allow-transfer`, además en el fichero /var/cache/bind/db.tunombre.org 


2.- Vamos a realizar la delegación de autoridad para el subdominio en el servidor DNS principal (en dns1.tunombre.org) para ello modificamos el fichero /var/cache/bind/db.tunombre.org añadiendo las siguientes líneas donde realizamos la delegación:

```bash
 ...
$ORIGIN informatica.nazareth.org.
@		  IN	 NS		dns
dns 	IN	 A 		172.22.2.233
```

* El parámetro $ORIGIN nos permite usar nombres no cualificados totalmente.

* Indicamos que el servidor con autoridad para la zona informatica.tunombre.org (registro NS), es dns.informatica.tunombre.org.

* Y se indica la dirección IP del servidor DNS.

* Si incrementas el número de serie la delegación que hemos realizado se transferirá al servidor DNS esclavo.

3.- Ahora vamos a configurar el servidor DNS delegado. Por lo tanto en el servidor dns.informatica.tunombre.org creamos una nueva zona en el fichero /etc/bind/named.conf.local:

```bash
zone "informatica.tunombre.org" {
    type master;
    file "db.informatica.tunombre.org";
};
```

Y creamos la zona en el fichero db.informatica.tunombre.org: (`/var/cache/bind/db.informatica.nazareth.org`)

```bash
$TTL    86400
@       IN      SOA     dns.informatica.tunombre.org. root.informatica.tunombre.org. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                          86400 )       ; Negative Cache TTL
;
@	IN	NS		dns.informatica.tunombre.org.
@	IN	MX	10	mail.informatica.tunombre.org.

$ORIGIN informatica.tunombre.org.

dns			IN	A		172.22.200.120
mail		IN	A		172.22.200.121 
web			IN	A 	172.22.200.122
www			IN 	CNAME 		web
...
```

De tal manera que quede:

```bash
$TTL    86400
@       IN      SOA     dns.informatica.nazareth.org. root.informatica.nazareth.org. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                          86400 )       ; Negative Cache TTL
;
@	IN	NS		dns.informatica.nazareth.org.
@	IN	MX	10	mail.informatica.nazareth.org.

$ORIGIN informatica.nazareth.org.

dns			IN	A		      172.22.2.233
mail		IN	A		      172.22.200.121 
web			IN	A 	      172.22.200.122
www			IN 	CNAME 		web
...
```

4.- No modifiques el fichero /etc/resolv.conf del cliente, es decir, las consultas se hacen al servidor DNS principal, cuando preguntemos por un nombre en la zona delegada el servidor DNS principal, preguntará al servidor DNS delegado y guardara la respuesta en su caché. Pregunta por la dirección ip del nombre www.informatica.tunombre.org. ¿Quién ha respondido?.

Si no aparacen en el fichero, ponemos las dos directivas nameserver del servidor DNS maestro y del servidor DNS esclavo en el fichero /etc/resolv.conf del cliente:

```bash
nameserver 172.22.5.136
nameserver 172.22.4.145
```

# Entrega

**1.- Una captura de pantalla donde se vea la consulta para averiguar la dirección IP de www.informatica.tunombre.org.**



**2.- Una captura de pantalla donde se vea la consulta para averiguar el servidor DNS con autoridad para la zona del dominio informatica.tunombre.org. ¿Es el mismo que el servidor DNS con autoridad para la zona tunombre.org?**



**3.- Una captura de pantalla donde se vea la consulta para averiguar el servidor de correo configurado para informatica.tunombre.org.**



**4.- Realiza el ejercicio que te va a proponer el profesor.**

