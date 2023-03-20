---
sidebar_position: 29
---

# Instalación y configuración del servidor DHCP

1.- Crea una infraestructura en QEMU/KVM que te permita tener una máquina donde instalar un servidor dhcp y un cliente que se configuren para tomar la configuración de forma dinámica. El servidor estará conectado al cliente por una red interna muy aislada.

Partimos de la creación de una red muy aislada, para esto se ha creado un fichero llamado `red-muy-aislada.xml`:

```xml
<network>
  <name>red_muy_aislada</name>
  <bridge name='virbr20'/>
</network>
```

Se crea con el comando:

    virsh -c qemu:///system net-define --file red-muy-aislada.xml

Y se activa con el comando:

    virsh -c qemu:///system net-start red_muy_aislada 

Primero creamos las máquinas y copiamos la clave pública para acceder directamente a las máquinas *(ssh-copy-id dhcpclient/dhcpserver)*.

2.- Para instalar nuestro servidor dhcp ejecutamos:

    sudo -y apt-get install isc-dhcp-server

**Nota: Cuando instalamos el servidor por primera se produce un error, ya que no está configurado. Puedes ver los errores producidos por el servidor en el fichero `/var/log/syslog` o `systemctl -u isc-dhcp-server`.**

3.- Vamos a configurar la interfaz por la que va a trabajar el servidor dhcp, para ello editamos el siguiente fichero `/etc/default/isc-dhcp-server`. Donde configuramos el parámetro interfaces (modifícalo según tu escenario), por ejemplo:

    INTERFACES="eth1"

En mi caso, la interfaz que voy a utilizar es `enp1s0`:

    INTERFACESv4="enp1s0"    

Editamos el fichero `/etc/network/interfaces` en el servidor y añadimos la siguiente línea:

```bash
allow-hotplug enp1s0
iface enp1s0 inet static
        address 10.0.0.1    <<<🌸🦎 IP del servidor DHCP 🌸🦎
        netmask 255.255.255.0
```

Reiniciamos la máquina para que se apliquen los cambios.

Se usa una IP estática para que el cliente pueda acceder al servidor dhcp, ya que de otra manera se conectaría al dhcp de la red externa.


4.- Vamos a estudiar el fichero de configuración del servicio `/etc/dhcp/dhcpd.conf`. 

El fichero de configuración está dividido en dos partes:

* **Parte principal (valores por defecto):** especifica los parámetros generales que definen la concesión y los parámetros adicionales que se proporcionarán al cliente.

* **Secciones (concretan a la principal):**

  * **Subnet:** Especifican rangos de direcciones IPs que serán cedidas a los clientes que lo soliciten.
  * **Host:** Especificaciones concretas de equipos.

En la parte principal podemos configurar los siguientes parámetros, que más tarde podremos reescribir en las distintas secciones:

Parámetros de tiempos:

  * **max-lease-time:** Es el tiempo máximo en segundos de concesión que un cliente puede solicitar. Si por ejemplo, un cliente solicita una concesión de 900 segundos pero el tiempo máximo es de 600 segundos, la concesión tendrá una duración de 600 segundos. No tiene por qué ser T3 o temporizador de alquiler.

  * **min-lease-time:** Es el tiempo mínimo en segundos de concesión que un cliente puede solicitar. Si por ejemplo, un cliente solicita una concesión de 900 segundos pero el tiempo mínimo es de 1200 segundos, la concesión tendrá una duración de 1200 segundos.

  * **default-lease-time:** Es el tiempo por defecto en segundos de concesión que se le asignará a un cliente en caso de que éste no haya solicitado ningún periodo en concreto. Estos tres primeros parámetro determinan el tiempo T3 o tiempo de concesión.

  * **option dhcp-renewal-time:** Es el tiempo en segundos que ha de transcurrir hasta que el cliente pase al estado RENEWING. También conocido como T1 o temporizador de renovación de alquiler. No confundir con default-lease-time.

  * **option dhcp-rebinding-time:** Es el tiempo en segundos que ha de transcurrir hasta que el cliente pase al estado REBINDING. También conocido como T2 o temporizador de reenganche.

Parámetros de configuración:

  * **option routers:** Indicamos la dirección red de la puerta de enlace que se utiliza para salir a internet.

  * **option domain-name-servers:** Se pone las direcciones IP de los servidores DNS que va a utilizar el cliente.

  * **option domain-name:** Nombre del dominio que se manda al cliente.

  * **option subnet-mask:** Subred enviada a los clientes.

  * **option broadcast-address:** Dirección de difusión de la red.

Al indicar una sección subnet tenemos que indicar la dirección de la red y la mascara de red y entre llaves podemos poner los siguientes parámetros:

  * **range:** Indicamos el rango de direcciones IP que vamos a asignar.

  * Algunos de los parámetros que hemos explicado en la sección principal.

5.- Configura el servidor DHCP con las siguientes características

  * Rango de direcciones a repartir: 192.168.0.100 - 192.168.0.110
  * Máscara de red: 255.255.255.0
  * Duración de la concesión: 1 hora
  * Puerta de enlace: 192.168.0.1
  * Servidores DNS: 192.168.202.2 y 1.1.1.1

La configuración usando los datos de mis máquinas quedaría:

```bash
subnet 10.0.0.0 netmask 255.255.255.0 {
   default-lease-time 3600;
   max-lease-time 3600;
   range 10.0.0.100 10.0.0.110;
   option subnet-mask 255.255.255.0;
   option broadcast-address 10.0.0.255;
   option routers 10.0.0.1;
   option domain-name-servers 192.168.202.2, 1.1.1.1;
}
```

Reiniciamos el servicio para que se apliquen los cambios.

    sudo systemctl restart isc-dhcp-server

**Nota 1: Si ponemos algún parámetro fuera de la sección subnet afectará a todas las secciones subnet. Si dentro de la sección subnet se reescribe el parámetro no se utilizará el valor del parámetro general.**
**Nota 2: El tiempo T3 será default-lease-time si el cliente no ha solicitado tiempo de concesión. Si el cliente lo ha solicitado no será mayor que max-lease-time ni menor que min-lease-time.**
**Nota 3: No hemos indicado ni el T1, ni el T2, por lo que estos valores se calcularán a partir de T3.**

6.- Configura los clientes para obtener direccionamiento dinámico. Comprueba las configuraciones de red que han tomado los clientes.

**Nota: En Windows la instrucción ipconfig /release libera la concesión, la instrucción ipconfig /renew la renueva. En linux el comando para liberar la concesión es dhclient -r y el que nos permite renovarla será dhclient.**

Configuramos el cliente para que tome la configuración de forma dinámica, para ello editamos el fichero `/etc/network/interfaces` y añadimos la siguiente línea:

```bash
allow-hotplug enp1s0
iface enp1s0 inet dhcp
```

Reiniciamos la máquina.


7.- El servidor debe hacer router-nat para que el cliente tenga acceso a internet. La configuración debe ser persistente.

Para esto tenemos que activar el bit de forwarding editando el fichero `/etc/sysctl.conf` y añadir la siguiente línea:

    net.ipv4.ip_forward=1

Instalamos iptables:

    sudo apt-get install iptables

Para que se haga permanente la configuración NAT, en el servidor, editamos el fichero `/etc/network/interfaces` y añadimos la siguiente línea:

```bash
auto enp1s0
iface enp1s0 inet static
        address 10.0.0.1
        netmask 255.255.255.0
        post-up iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o enp2s0 -j MASQUERADE    <<< 🌼🐸 configura el NAT 🐸🌼
```

Para que se apliquen los cambios de ese fichero, reiniciamos el servicio de red con el comando:

    sudo systemctl restart isc-dhcp-server

O reiniciamos el servidor.

Para comprobar que esta funcionando iptables ejecutamos el comando:

    sudo iptables -t nat -L -n

En mi caso, aparece:

```bash
debian@serverdhcp:~$ sudo iptables -t nat -L

Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination         

Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         

Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination         
MASQUERADE  all  --  10.0.0.0/24          anywhere      <<< 🌈🐝 configuración activa de NAT 🐝🌈
```

Para comprobar que funciona desde el cliente, podemos hacer ping a google:

    ping 8.8.8.8


8.- Cuando el servidor va repartiendo la configuración a los clientes va guardando las concesiones en el fichero /var/lib/dhcp/dhcpd.leases.


## Entrega

**1.- Configuración del cliente para que configure la red de forma dinámica.**

```bash
cat /etc/network/interfaces
```

![SRI](/img/SRI+HLC/taller1SRI2.png)

**2.- Una vez que el cliente se haya configurado, capturas de pantalla donde se vea en el cliente: su dirección IP, su puerta de enlace y su servidor DNS.**

```bash
ip a
ip r
cat /etc/resolv.conf
```

![SRI](/img/SRI+HLC/taller1SRI2-2.png)

**3.- La concesión que se ha hecho en el servidor. Estará en el fichero donde se guarda la lista de concesiones.**

```bash
cat /var/lib/dhcp/dhcpd.leases
```

![SRI](/img/SRI+HLC/taller1SRI2-3.png)

**4.- Una comprobación del que el cliente puede hacer resolución a un nombre de internet.**

```bash
ping 8.8.8.8
```

![SRI](/img/SRI+HLC/taller1SRI2-4.png)
