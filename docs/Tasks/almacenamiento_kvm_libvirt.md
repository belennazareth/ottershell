---
sidebar_position: 17
---

# Gestión de pool de almacenamiento lógico en KVM/libvirt

1. Crea con virsh un nuevo pool de almacenamiento de tipo lógico. Para ello, lo más fácil, es tener un grupo de volúmenes con espacio libre.

```bash
virsh -c qemu:///system pool-define-as --name pool1 --type logical --source-name /dev/vg01

virsh -c qemu:///system pool-start pool1
virsh -c qemu:///system v
```

*Nota: **IMPORTANTE** primero hay que crearlo, luego definirlo y por último ativarlo.


2. Crea un volumen en ese pool de almacenamiento. Comprueba que se ha creado un volumen lógico nuevo en el grupo de volúmenes.

```bash
virsh -c qemu:///system vol-create-as pool1 vol_mv1 10G

sudo lvs
```

![lvs](/img/SRI+HLC/taller1SRI7.png)


3. Usa virt-install para crear una máquina virtual cuyo disco corresponda al volumen que has creado anteriormente.

```bash
virt-install --connect qemu:///system \
             --virt-type kvm \
             --name mv1 \
             --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso \ 
             --os-variant debian10 \
             --disk vol = pool1/vol_mv1 \
             --disk size = 3 \ 
             --memory 2048 \
             --vcpus 2  

```


4. Una vez que la máquina este funcionando, crea un nuevo volumen y añádelo a la máquina.

```bash
virsh vol-create-as pool1 vol_mv2 2G
virsh attach-disk mv1 /dev/vg01/vol_mv2 vdb --persistent
```


5. Apaga la máquina, y siguiendo el artículo [Acceder a una imagen de disco KVM ubicada en un volumen lógico](https://albertomolina.wordpress.com/2009/12/14/acceder-a-una-imagen-de-disco-kvm-ubicada-en-un-volumen-logico/) monta la partición del disco de la máquina en tu anfitrión para acceder a sistema de archivos.

```bash
virsh shutdown mv1
```

Para montar la partición del disco de la máquina en tu anfitrión para acceder a sistema de archivos:

```bash
sudo kpartx -va /dev/vg1/vol2
ls -l /dev/mapper

sudo mount /dev/mapper/vg1-vol2p1 /mnt
ls -l /mnt
```


## Entrega

**1. Instrucción para crear el pool de almacenamiento.**


**2. Instrucción para crear el volumen.**


**3. Una vez instalado el sistema, la configuración XML de la máquina donde se ve el almacenamiento de la misma (se deben ver los dos discos).**


**4. Las instrucciones ejecutadas para montar la partición del disco, y la lista de ficheros del sistema de archivos.**

