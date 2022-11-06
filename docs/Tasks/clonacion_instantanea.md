---
sidebar_position: 7
---

# Clonación e instantáneas de máquinas virtuales

## 1. Indica la instrucción virt-clone que has usado para clonar la máquina. ¿Qué cambios has hecho en la nueva máquina para que no sea igual a la original?

    `virt-clone --connect=qemu:///system --original rumpeltinski --name maquina-clonada --file /var/lib/libvirt/images/maquinaclonada.qcow2`

![Term](/img/HLC/taller5HLC.png)

## 2. Lista las máquinas que tienes creadas, donde se vea la plantilla que has creado. Pon una captura donde se vea que nos da un error al intentar iniciarla.

![Term](/img/HLC/taller5HLC-2.png)
![Term](/img/HLC/taller5HLC-3.png)

## 3. Una vez creada la máquina clone-full, una captura de pantalla donde se vea la dirección IP que ha tomado.  Otra captura donde se vea el acceso por SSH.

![Term](/img/HLC/taller5HLC-4.png)
![Term](/img/HLC/taller5HLC-5.png)

## 4. Una vez realizada la clonación enlazada: La lista de máquinas donde se vea la máquina clone-link. La salida del comando `virsh -c qemu:///system vol-info <\fichero.qcow2> <\pool de almacenamiento>` para comprobar que el volumen creado tiene un disco de Backing Store. Comprueba lo que ocupa el disco creado. Debe ocupar muy poco en disco. ¿Por qué?

![Term](/img/HLC/taller5HLC-6.png)
![Term](/img/HLC/taller5HLC-7.png)

Ocupa poco espacio porque no copia el volumen original al nuevo sino que lo usa compartiendo disco con la máquina origen, de ahí su nombre enlazada.

## 5. Muestra con capturas de pantallas el funcionamiento del ejercicio 5. Una vez creada la instantánea entrega la salida del comando `virsh -c qemu:///system snapshot-list <\máquina>`.

![Term](/img/HLC/taller5HLC-8.png)
