---
sidebar_position: 20
---

# Servidor de correo en los servidores de clase

En esta ocasión, se va a realizar un servidor de correo en los servidores de clase, para ello se va a utilizar el servicio de postfix, que se encarga de enviar y recibir correos electrónicos. En mi caso, voy a usar el escenario montado en OpenStack compuesto por alfa, bravo, charlie y delta.

## Procedimiento

### Configuración de los servidores

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


### Instalación de postfix

Para instalar postfix, se va a utilizar el siguiente comando:

```bash
sudo apt install postfix
```

Al instalar postfix, se nos va a pedir que introduzcamos el nombre del sistema de correo, en mi caso, voy a poner mi dominio `nazareth.gonzalonazareno.org`.

![Postfix](/img/SRI+HLC/taller1SRI6.png)


### Instalación de mail

Para el envío de correos, se va a utilizar el comando mail, para ello, se va a instalar el paquete `bsd-mailx`, con el siguiente comando:

```bash
sudo apt install bsd-mailx
```

### Envío de correos entre usuarios locales del servidor

Para enviar correos entre usuarios locales del servidor, se va a utilizar el comando `mail` seguido del destinatario, siendo un ejemplo del mismo lo siguiente:

```bash
nazare@delta:~$ mail root@localhost

Subject: Ejercicio 1 <3
Envío local, entre usuarios del mismo servidor
Cc: 
```

Una vez enviado el correo, se puede comprobar que se ha enviado correctamente, usando el comando `mail` en este caso dentro del usuario root. Después, seleccionamos el correo que queremos leer y lo leemos (*##Entrega > Ejercicio 1). 

Para comprobar el estado del correo enviado se puede ver el directorio de logs de postfix `/var/log/mail.log`.


## Entrega

1. Prueba de funcionamiento del ejercicio1. Se debe mostrar el log para asegurarse que se ha enviado el correo.

Prueba de recepción de correo en el servidor root@delta:
![Postfix](/img/SRI+HLC/taller1SRI6-2.png)

Fichero de logs de postfix:
![Postfix](/img/SRI+HLC/taller1SRI6-3.png)

2. Muestra las cabeceras del correo recibido en el ejercicio 2 mostrando las cabeceras donde vemos los servidores por los que ha pasado el correo.

3. Muestra el log del sistema donde se comprueba que el correo se ha recibido con éxito en el ejercicio 3.

4. Realiza el ejercicio que os va a plantear el profesor.

