---
sidebar_position: 10
---

# Virtualización en Linux

Vamos a crear una máquina virtual por medio de un script.

## Procedimiento

### Creación de la imagen base

Vamos a crear una imagen base que utilizaremos para la creación de la máquina que utilizaremos en la práctica. Para ello:

1. Crea con `virt-install` una imagen de Debian Bullseye con formato qcow2 y un tamaño máximo de 3GiB. Esta imagen se denominará `bullseye-base.qcow2`. El sistema de ficheros del sistema instalado en esta imagen será XFS. La imagen debe estar configurada para poder usar hasta dos interfaces de red por dhcp. El usuario debian con contraseña debian puede utilizar sudo sin contraseña.

2. Crea un par de claves ssh en formato ecdsa y sin frase de paso y agrega la clave pública al usuario debian.

3. Utiliza la herramienta virt-sparsify para reducir al máximo el tamaño de la imagen.

4. Sube la imagen base a alguna ubicación pública desde la que se pueda descargar.

Cuando hayas finalizado puedes borrar la máquina creada. Lo que nos interesa es la imagen bullseye-base.qcow2 que has creado.

### Script de creación de MV

Escribe un shell script que ejecutado por un usuario con acceso a qemu:///system realice los siguientes pasos:

1. Crea una imagen nueva, que utilice bullseye-base.qcow2 como imagen base y tenga 5 GiB de tamaño máximo. Esta imagen se denominará maquina1.qcow2.

2. Crea una red interna de nombre intra con salida al exterior mediante NAT que utilice el direccionamiento 10.10.20.0/24.

3. Crea una máquina virtual (maquina1) conectada a la red intra, con 1 GiB de RAM, que utilice como disco raíz maquina1.qcow2 y que se inicie automáticamente. Arranca la máquina. Modifica el fichero /etc/hostname con maquina1.

4. Crea un volumen adicional de 1 GiB de tamaño en formato RAW ubicado en el pool por defecto

5. Una vez iniciada la MV maquina1, conecta el volumen a la máquina, crea un sistema de ficheros XFS en el volumen y móntalo en el directorio /var/www/html. Ten cuidado con los propietarios y grupos que pongas, para que funcione adecuadamente el siguiente punto.

6. Instala en maquina1 el servidor web apache2. Copia un fichero index.html a la máquina virtual.

7. Muestra por pantalla la dirección IP de máquina1. Pausa el script y comprueba que puedes acceder a la página web.

8. Instala LXC y crea un linux container llamado container1.

9. Añade una nueva interfaz a la máquina virtual para conectarla a la red pública (al punte br0).

10. Muestra la nueva IP que ha recibido.

11. Apaga maquina1 y auméntale la RAM a 2 GiB y vuelve a iniciar la máquina.

12. Crea un snapshot de la máquina virtual.

Se valorara la limpieza del código, los comentarios, la utilización adecuada de variables, portabilidad (es decir, que no dependa de directorios concretos y se pueda ejecutar en cualquier equipo), si se hacen comprobaciones antes de realizar una acción,…

Alternativamente se puede entregar la tarea sin hacer el script, describiendo paso a paso la secuencia de comandos a ejecutar. En este caso la nota de la tarea será inferior.


## 1. Entrega la URL del repositorio GitHub donde has alojado el proyecto.

https://github.com/belennazareth/linux_virt 


## 2. Indica los pasos que has realizado para la creación de la imagen base.

Primero será necesario crear una red para cada interfaz de red que queramos utilizar. Para ello, hay que crear dos ficheros `.xml` (se guardan automáticamente en `/etc/libvirt/qemu/networks/`) con el siguiente contenido

- red1.xml:

```xml
<network>
  <name>red1</name>
  <bridge name='virbr-red1'/>
  <forward/>
  <ip address='192.168.123.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.123.2' end='192.168.123.254'/>
    </dhcp>
  </ip>
</network>
```

- red2.xml:

```xml
<network>
  <name>red2</name>
  <bridge name='virbr-red2'/>
  <forward/>
  <ip address='192.168.124.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.124.2' end='192.168.124.254'/>
    </dhcp>
  </ip>
</network>
```

Y las activamos:

```bash
virsh -c qemu:///system net-define red1.xml
virsh -c qemu:///system net-define red2.xml

virsh -c qemu:///system net-start red1
virsh -c qemu:///system net-start red2
```

Para esto puedes utilizar el siguiente script:

```bash
virt-install --connect qemu:///system \
                         --virt-type kvm \
                         --name bullseye-base \
                         --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso \
                         --os-variant debian10 \
                         --network network=red1 \
                         --network network=red2 \
                         --disk size=3 \
                         --memory 2048 \
                         --vcpus 2
```

Durante la instalación se selecciona XFS como sistema de ficheros y se crea el usuario debian con contraseña debian:

![virt](/img/HLC/virtHLC.png)

Metemos al usuario dentro de sudoers para que pueda utilizar sudo sin contraseña:

```bash
echo "debian ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
```

Para que se realice DHCP en las dos interfaces de red, hay que editar el fichero `/etc/network/interfaces` y añadir las siguientes líneas:

```bash
auto enp1s0
iface enp1s0 inet dhcp

auto enp2s0
iface enp2s0 inet dhcp
```

Para generar la clave privada y pública usamos el comando `ssh-keygen`:

```bash
ssh-keygen -t ecdsa
```

Una vez generadas, copiamos la clave pública al usuario debian:

```bash
nazare@ThousandSunny :~$ ssh-copy-id -i virt.pub debian@192.168.124.204 
```

Y la probamos ingresando a la máquina de la siguiente forma:

```bash
nazare@ThousandSunny :~$ ssh -i virt debian@{ip}
```

Para reducir la imagen la máquina debe estar apagada, por lo que primero la apagamos:

```bash
virsh -c qemu:///system shutdown bullseye-base
```

He copiado la imagen a mi directorio home:

```bash
nazare@ThousandSunny :~$ sudo cp /var/lib/libvirt/images/bullseye-base.qcow2 ~/home/nazare/
```

Después, he cambiado el usuario de propietario de la imagen a mi usuario:

```bash
sudo chown nazare:nazare bullseye-base.qcow2
```

Por último, he reducido el tamaño de la imagen con `virt-sparsify`:

```bash
virt-sparsify bullseye-base.qcow2 bullseye-base-sparse.qcow2
```

Cuya salida es la siguiente:

```bash
 nazare@ThousandSunny :~$ virt-sparsify bullseye-base.qcow2 bullseye-base-sparse.qcow2

[   0.0] Create overlay file in /tmp to protect source disk
[   0.0] Examine source disk
 100% ⟦▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒⟧ --:--
[   6.8] Fill free space in /dev/sda1 with zero
[   7.3] Clearing Linux swap on /dev/sda5
[   8.5] Copy to destination and make sparse
[  11.9] Sparsify operation completed with no errors.
virt-sparsify: Before deleting the old disk, carefully check that the 
target disk boots and works correctly.
```


## 3. Entrega la clave privada que has utilizado y un enlace para descargarme la imagen base.

La clave se encuentra alojada en el repositorio de Github del ejercio 1, [linux_virt](https://github.com/belennazareth/linux_virt/tree/main/keys) y la imagen base se encuentra en el siguiente enlace: [Imagen base](https://mega.nz/file/5iYE1QDY#94qGT8iHVpDCLK6b85XWsrJvlg-EJ77n2tUXBkuKYaw).


## 4. Ejecuta el script y cuando se pause. Entrega pantallazo donde se compruebe que se puede acceder al servidor web en la maquina1.

![web](/img/HLC/virtHLC-2.png)


## 5. Al finalizar el script: pantallazo donde se compruebe que se puede acceder al servidor web con la IP pública.

![web2](/img/HLC/virtHLC-3.png)


## 6. Al finalizar el script: Pantallazos para comprobar:

### - Que la máquina tiene montado un disco en el directorio /var/www/html.

``lsblk -f``

![lsblk](/img/HLC/virtHLC-4.png)


### - Que la máquina tiene 2G de RAM.

``free -h``

![free](/img/HLC/virtHLC-5.png)


### - Que accediendo a la máquina puedes acceder al contenedor.

``lxc attach container1``

![lxc](/img/HLC/virtHLC-6.png)


### - Que se ha ha creado un snapshot.

``ls -la | grep maquina1``

![snap](/img/HLC/virtHLC-7.png)