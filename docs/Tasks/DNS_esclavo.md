---
sidebar_position: 27
---

# Instalación y configuración de un servidor DNS esclavo

## Procedimiento

Un servidor DNS esclavo contiene una réplica de las zonas del servidor maestro. Se debe producir una transferencia de zona (el esclavo hace una solicitud de la zona completa al maestro) para que se sincronicen los servidores.

*********************
        IPs

Servidor: 172.22.5.136
Cliente: 172.22.1.35
Esclavo: 172.22.4.145
*********************


1.- Crea otra máquina en Proxmox que tendrá el rol de servidor DNS esclavo. Instala bind9 y nombralo de manera adecuada para que tenga el nombre dns2.tunombre.org. Voy a suponer que la dirección de esta nueva máquina es la 172.22.200.110. La transferencia de zona entre maestro y esclavo usa el puerto 53/tcp, ábrelo en el grupo de seguridad.

Para esto ejecutamos el siguiente comando:

```bash
sudo hostnamectl set-hostname dns2
```

Y editamos el fichero /etc/hosts para que tenga el nombre dns2.tunombre.org:

```bash
127.0.1.1 dns2.nazareth.org dns2
```

2.- Por seguridad, sólo debemos aceptar transferencias de zonas hacía los esclavos autorizados, para ello en el fichero /etc/bind/named.conf.options, deshabilitamos las transferencias:

```bash
 options {
     ...
     allow-transfer { none; };
     ...
```

3.- Modificamos la definición de las zona en el servidor DNS maestro. Modificamos el fichero /etc/bind/named.conf.local:

```bash
include "/etc/bind/zones.rfc1918";
zone "nazareth.org" {
    type master;
    file "db.nazareth.org";
    allow-transfer { 172.22.4.145; };
    notify yes;
};
zone "22.172.in-addr.arpa" {
    type master;
    file "db.172.22.0.0";
    allow-transfer { 172.22.4.145; };
    notify yes;
};
```

* allow-tranfer: Se permite las transferencias de zonas al servidor DNS esclavo (172.22.200.110).

* notify yes: Cuando se reinicie el servidor DNS maestro se notificará al esclavo que ha habido cambios para que solicite una transferencia de zona.

4.- Modificamos la definición de las zona en el servidor DNS esclavo. Modificamos el fichero /etc/bind/named.conf.local:

```bash
 include "/etc/bind/zones.rfc1918";
 zone "nazareth.org" {
     type slave;
     file "db.nazareth.org";
     masters { 172.22.4.145; };
 };
 zone "22.172.in-addr.arpa" {
     type slave;
     file "db.172.22.0.0";
     masters { 172.22.4.145; };
 };	
```

* type slave: Se indica que este servidor será esclavo para estas zonas.
* masters: Se indica cuál es el maestro, para saber a que servidor hay que solicitar la transferencia de zona.

5.- En el servidor DNS maestro añadimos la información del servidor DNS esclavo en las zonas. En la zona de resolución directa, en el fichero /var/cache/bind/db.tunombre.org añadimos un nuevo registro NS y su correspondiente registro A:

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
@	IN	NS		dns2.nazareth.org.
@	IN	MX	10	correo.nazareth.org.

$ORIGIN nazareth.org.

dns1		IN	A	172.22.5.136
dns2		IN	A	172.22.4.145
...
```

La zona de resolución inverso quedaría de la siguiente forma, modificando el fichero /var/cache/bind/db.172.22.0.0:

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
@	IN	NS		dns2.nazareth.org.

$ORIGIN 22.172.in-addr.arpa.

136.5		IN	PTR		dns1.nazareth.org.
145.4   	IN	PTR		dns2.nazareth.org.
...
```

*Nota: La información de los registros de las zonas sólo se modifican en el servidor DNS maestro. Estás modificaciones se copia en el esclavo por medio de una transferencia de zona.

6.- Reinicia el servidor DNS maestro y esclavo. Puedes ver en el esclavo que se han producidos las transferencias de zonas:

```bash
 root@dns2:~# systemctl restart bind9
 root@dns2:~# tail /var/log/syslog
 ... dns2 named[5739]: zone 22.172.in-addr.arpa/IN: transferred serial 1
 ... dns2 named[5739]: transfer of '22.172.in-addr.arpa/IN' from 172.22.200.100#53: Transfer status: success
 ... dns2 named[5739]: transfer of '22.172.in-addr.arpa/IN' from 172.22.200.100#53: Transfer completed: ...
 ... dns2 named[5739]: managed-keys-zone: Key 20326 for zone . acceptance timer complete: key now trusted
 ... dns2 named[5739]: resolver priming query complete
 ... dns2 named[5739]: zone tunombre.org/IN: Transfer started.
 ... dns2 named[5739]: transfer of 'tunombre.org/IN' from 172.22.200.100#53: connected using 172.22.200.110#58461
 ... dns2 named[5739]: zone tunombre.org/IN: transferred serial 1
 ... dns2 named[5739]: transfer of 'tunombre.org/IN' from 172.22.200.100#53: Transfer status: success
 ... dns2 named[5739]: transfer of 'tunombre.org/IN' from 172.22.200.100#53: Transfer completed: ...
```

7.- Si al reiniciar los servidores DNS tienes algún error, puedes detectar errores de sintaxis usando los siguientes comandos:

```bash
 named-checkzone tunombre.org /var/cache/bind/db.tunombre.org
 named-checkzone 22.172.in-addr.arpa /var/cache/bind/db.172.22.0.0  Para detectar errores de configuración en `named.conf`, podemos usar:
 named-checkconf
```

8.- Configura el cliente con los dos servidores DNS. Para ello en su fichero /etc/resolv.conf utiliza dos directivas nameserver. Si hacemos una consulta desde un cliente, y el dns maestro no responde, responderá el esclavo. Prueba a realizar una consulta. ¿Quién ha respondido?. Apaga el servidor maestro, y vuelve a hacer la misma consulta. ¿Ha respondido el servidor DNS esclavo?

9.- Vamos a modificar la información de la zona. Para ello vamos a modificar en el servidor DNS maestro y en su fichero /var/cache/bind/db.tunombre.org vamos a añadir un nuevo registro:

```bash
 ...
 prueba		IN	A	172.22.200.120

```

**Recuerda incrementar el número de serie, para que al reiniciar el servidor DNS maestro se produzca la transferencia de zona.**

10.- Desde el cliente realiza una consulta para preguntar por la dirección IP de prueba.tunombre.org. ¿Quién ha respondido?. Apaga el servidor maestro, y vuelve a hacer la misma consulta. ¿Ha respondido el servidor DNS esclavo?. Comprueba en el esclavo que se ha producido la transferencia.

11.- Algunos trucos adicionales:

* Puedes manejar el servidor DNS con el comando rndc. Por ejemplo rndc reload: reinicia el servicio; rndc reload tunombre.org: Reinicia sólo esa zona; rndc flush: Borra la caché de resoluciones guardadas en el servidor.

* Realiza una consulta al servidor maestro y el esclavo para comprobar que las respuestas son autorizadas (bit AA), además asegúrate que coinciden los números de serie:

      dig +norec @x.x.x.x tunombre.org. soa

* Solicita una copia completa de la zona y comprueba que sólo se puede hacer desde el esclavo:

      dig @x.x.x.x tunombre.org. axfr

* **Cada vez que realice una modificación en el servidor DNS maestro recuerda incrementar el número de serie.**


## Entrega

**1. Realización del apartado 8.**



**2. Transferencia de zonas: indica para que sirve el número de serie. Explica con tus palabras qué indican los tiempos que se configuran en el registro SOA.**


**3. Realización del apartado 10.**


**4. Realiza el ejercicio que te va a proponer el profesor.**

