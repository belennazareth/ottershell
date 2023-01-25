---
sidebar_position: 10
---

# Virtualización en Linux

Vamos a crear una máquina virtual por medio de un script.

## Procedimiento

### Creación de la imagen base

Vamos a crear una imagen base que utilizaremos para la creación de la máquina que utilizaremos en la práctica. Para ello:

1. Crea con `virt-install` una imagen de Debian Bullseye con formato qcow2 y un tamaño máximo de 3GiB. Esta imagen se denominará `bullseye-base.qcow2`. El sistema de ficheros del sistema instalado en esta imagen será XFS. La imagen debe estar configurada para poder usar hasta dos interfaces de red por dhcp. El usuario debian con contraseña debian puede utilizar sudo sin contraseña.

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
allow-hotplug enp2s0
iface enp2s0 inet dhcp
```


2. Crea un par de claves ssh en formato ecdsa y sin frase de paso y agrega la clave pública al usuario debian.

Para generar la clave privada y pública usamos el comando `ssh-keygen`:

```bash
ssh-keygen -t ecdsa
```

Una vez generadas, copiamos la clave pública al usuario debian:

```bash
nazare@ThousandSunny ~$ ssh-copy-id -i virt debian@192.168.124.204 
```

Y la probamos ingresando a la máquina de la siguiente forma:

```bash
nazare@ThousandSunny ~$ ssh -i virt debian@{ip}
```

3. Utiliza la herramienta virt-sparsify para reducir al máximo el tamaño de la imagen.



4. Sube la imagen base a alguna ubicación pública desde la que se pueda descargar.



Cuando hayas finalizado puedes borrar la máquina creada. Lo que nos interesa es la imagen bullseye-base.qcow2 que has creado.


## 1. Entrega la URL del repositorio GitHub donde has alojado el proyecto.

https://github.com/belennazareth/linux_virt 


## 2. Indica los pasos que has realizado para la creación de la imagen base.




## 3. Entrega la clave privada que has utilizado y un enlace para descargarme la imagen base.



## 4. Ejecuta el script y cuando se pause. Entrega pantallazo donde se compruebe que se puede acceder al servidor web en la maquina1.



## 5. Al finalizar el script: pantallazo donde se compruebe que se puede acceder al servidor web con la IP pública.



## 6. Al finalizar el script: Pantallazos para comprobar:

### - Que la máquina tiene montado un disco en el directorio /var/www/html.



### - Que la máquina tiene 2G de RAM.



### - Que accediendo a la máquina puedes acceder al contenedor.



### - Que se ha ha creado un snapshot.

