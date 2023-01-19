---
sidebar_position: 20
---

# Servidor de correo en los servidores de clase

En esta ocasión, se va a realizar un servidor de correo en los servidores de clase, para ello se va a utilizar el servicio de postfix, que se encarga de enviar y recibir correos electrónicos. En mi caso, voy a usar el escenario montado en OpenStack compuesto por alfa, bravo, charlie y delta.

## Configuración de los servidores

Para que resuelva los nombres de los servidores, se va a utilizar el servicio de DNS, en caso de que no resuelva las direcciones se debe editar el fichero `/etc/netplan/10-lxc.yaml`y añadir las siguientes líneas:

```yaml 
network: 
  ethernets: 
    eth0: # Nombre de la interfaz de red.
     dhcp4: no # Desactivamos el DHCP.
     addresses:
     - 192.168.0.3/24 # IP del servidor.
     gateway4: 192.168.0.1 # IP del router.
     nameservers: 
       addresses: [192.168.202.2] # IP del servidor DNS, en este caso el servidor DNS de la red de clase.
```

Para aplicar los cambios se debe ejecutar el siguiente comando:

```bash
sudo netplan apply
```

Podemos consultar el estado de la misma usando:

```bash
systemd-resolve --status | grep 'DNS Servers' -A2
```

Como prueba de que funciona, se puede realizar un ping a `www.google.com`.


## Instalación de postfix

Para instalar postfix, se va a utilizar el siguiente comando:

```bash
sudo apt install postfix
```

Al instalar postfix, se nos va a pedir que introduzcamos el nombre del sistema de correo, en mi caso, voy a poner mi dominio `nazareth.gonzalonazareno.org`.

![Postfix](/img/SRI+HLC/taller1SRI6.png)

## Instalación de mail

Para el envío de correos, se va a utilizar el comando mail, para ello, se va a instalar el paquete `bsd-mailx`, con el siguiente comando:

```bash