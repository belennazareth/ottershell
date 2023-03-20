---
sidebar_position: 29
---

# Funcionamiento del servidor DHCP

## Procedimiento

1.- Continuamos trabajando en el escenario del taller anterior.

2.- Introduce un cliente Windows y realiza la configuración necesario para que tome configuración de red del servidor DHCP.

3.- Realizar una captura, desde el servidor usando tcpdump, de los cuatro paquetes que corresponden a una concesión: DISCOVER, OFFER, REQUEST, ACK.

Para esto es necesario instalar tcpdump en el servidor:

```bash
sudo apt install tcpdump
```

Y ejecutarlo con el siguiente comando:

```bash
tcpdump -i enp7s0 -pvn port 67 or port 68
```

En windows vamos a liberar la IP y volver a obtenerla:

```powershell
ipconfig /release
ipconfig /renew
```

4.- Para hacer esta prueba configura un tiempo de concesión bajo. Los clientes toman una configuración, y a continuación apagamos el servidor DHCP. ¿qué ocurre con el cliente windows? ¿Y con el cliente linux?. Comprueba el funcionamiento y razona el motivo.

5.- Los clientes toman una configuración, y a continuación cambiamos la configuración del servidor DHCP (por ejemplo el rango). ¿qué ocurriría con un cliente windows? ¿Y con el cliente linux?. Comprueba el funcionamiento y razona el motivo.

6.- Para crear una reserva en el servidor vamos a trabajar en la sección host. En una sección host debemos poner el nombre que identifica al host y los siguientes parámetros:

- hardware ethernet: Es la dirección MAC de la tarjeta de red del host.
- fixed-address: La dirección IP que le vamos a asignar.
- Podemos usar también las opciones ya explicadas en la sección principal.

Realiza una reserva para el cliente Windows, para que tenga la IP 192.168.200.200. La configuración quedaría:

```bash
host cliente-windows {
  hardware ethernet xx:xx:xx:xx:xx:xx;
  fixed-address 192.168.200.200;
}
```



¿Se guarda la reserva en la lista de concesiones?


## Entrega

**1. Una vez que el cliente Windows se haya configurado, capturas de pantalla donde se vea en el cliente: su dirección IP, su puerta de enlace y su servidor DNS.**

*Nota: el cliente windows se configura automáticamente, añadiendole la red muy aislada ya detectará el servidor DHCP y se configurará automáticamente.

![](/img/SRI+HLC/taller2SRI2.png)


**2. Captura de pantalla donde se vean los 4 paquetes que se transmite en la negociación de la concesión.**

*Nota: para que se vean los 4 paquetes es necesario que los clientes estén apagados y ejecutar el comando antes de encender los clientes, o bien apagar el servicio DHCP y ejecutar el comando antes de encender el servicio DHCP.

![](/img/SRI+HLC/taller2SRI2-2.png)


**3. Explica, con pruebas de funcionamiento, el motivo del comportamiento que se indica en los puntos 4 y 5.**

Para el **punto 4**, cambiamos el fichero de configuración del servidor DHCP para que el tiempo de concesión sea de 30 segundos:

```bash
subnet 10.0.0.0 netmask 255.255.255.0 {
   default-lease-time 30;   <<< 🍓🐌 tiempo de concesión por defecto 🍓🐌
   max-lease-time 30;   <<< 🌼🐸 tiempo de concesión máximo 🐸🌼
   range 10.0.0.100 10.0.0.110;
   option subnet-mask 255.255.255.0;
   option broadcast-address 10.0.0.255;
   option routers 10.0.0.1;
   option domain-name-servers 192.168.202.2, 1.1.1.1;
}
```

Reiniciamos el servicio para que se apliquen los cambios.

Después, apagamos el servidor DHCP y esperamos 30 segundos para que los clientes liberen la IP que tenían asignada y vuelvan a pedir una nueva.
Podemos ver que ambos han perdido la dirección IP que tenían asignada y se han quedado sin direccionamiento, ya que no hay ningún servidor DHCP que les pueda asignar una nueva IP:

![](/img/SRI+HLC/taller2SRI2-3.png)

*Nota: para solicitar una nueva ip al servidor DHCP, en windows podemos usar el comando ipconfig /release y después ipconfig /renew. En linux podemos usar el comando dhclient -r y después dhclient.

En el **punto 5**, cambiamos el fichero de configuración del servidor DHCP, `/etc/dhcp/dhcpd.conf`, para que el rango de direcciones IP sea de 10.100.0.100 a 10.100.0.110:

```bash
subnet 10.100.0.0 netmask 255.255.255.0 {
   default-lease-time 30;
   max-lease-time 30;
   range 10.100.0.100 10.100.0.110;   <<< 🐥🎱 rango de direcciones IP 🐥🎱
   option subnet-mask 255.255.255.0;
   option broadcast-address 10.100.0.255;
   option routers 10.100.0.1;
   option domain-name-servers 192.168.202.2, 1.1.1.1;
}
```

Modificamos el fichero `/etc/network/interfaces`:

```bash
allow-hotplug enp1s0
iface enp1s0 inet static
        address 10.100.0.1    <<< 🧋🐛 dirección IP del servidor DHCP 🧋🐛
        netmask 255.255.255.0
        post-up iptables -t nat -A POSTROUTING -s 10.100.0.0/24 -o enp2s0 -j MASQUERADE   <<< 🍑🐕 regla de NAT 🍑🐕
```

Reiniciamos la máquina para que se apliquen los cambios.

Podemos ver que ha cambiado la ip del servidor y los clientes:

![](/img/SRI+HLC/taller2SRI2-4.png)
![](/img/SRI+HLC/taller2SRI2-5.png)


**4. Capturas de pantalla donde se vea el funcionamiento de la reserva. ¿Se guarda la reserva en la lista de concesiones?**

