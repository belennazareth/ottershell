---
sidebar_position: 26
---

# Gestión de pool de almacenamiento lógico en KVM/libvirt

1.- Crea con virsh un nuevo pool de almacenamiento de tipo lógico. Para ello, lo más fácil, es tener un grupo de volúmenes con espacio libre.

```bash
virsh -c qemu:///system pool-define-as --name pool1 --type logical --source-name /dev/vg01

virsh -c qemu:///system pool-start pool1
virsh -c qemu:///system v
```

*Nota: **IMPORTANTE** primero hay que crearlo, luego definirlo y por último ativarlo.


2.- Crea un volumen en ese pool de almacenamiento. Comprueba que se ha creado un volumen lógico nuevo en el grupo de volúmenes.

```bash
virsh -c qemu:///system vol-create-as pool1 vol_mv1 10G

sudo lvs
```

![lvs](/img/SRI+HLC/taller1SRI7.png)


3.- Usa virt-install para crear una máquina virtual cuyo disco corresponda al volumen que has creado anteriormente.

```bash
virt-install --connect qemu:///system \
             --virt-type kvm \
             --name mv1 \
             --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso \
             --os-variant debian10 \
             --disk=/dev/vg01/vol_mv1 \
             --memory 1024 \
             --vcpus 1
```

*Nota: en **ZSH** no funciona el comando con los espacios, por lo que hay que usar el comando con los parámetros en una sola línea.

```bash
virt-install --connect qemu:///system --virt-type kvm --name mv1 --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso --os-variant debian10 --disk=/dev/vg01/vol_mv1 --memory 1024 --vcpus 1
```


4.- Una vez que la máquina este funcionando, crea un nuevo volumen y añádelo a la máquina.

```bash
virsh -c qemu:///system vol-create-as pool1 vol_mv2 2G
virsh -c qemu:///system attach-disk mv1 /dev/vg01/vol_mv2 vdb --persistent
```


5.- Apaga la máquina, y siguiendo el artículo [Acceder a una imagen de disco KVM ubicada en un volumen lógico](https://albertomolina.wordpress.com/2009/12/14/acceder-a-una-imagen-de-disco-kvm-ubicada-en-un-volumen-logico/) monta la partición del disco de la máquina en tu anfitrión para acceder a sistema de archivos.

```bash
virsh -c qemu:///system shutdown mv1
```

Para montar la partición del disco de la máquina en tu anfitrión para acceder a sistema de archivos:

```bash
sudo kpartx -va /dev/vg01/vol_mv1
ls -l /dev/mapper
```

![KP](/img/SRI+HLC/taller1SRI7-2.png)
![KP](/img/SRI+HLC/taller1SRI7-3.png)


```bash
mount /dev/mapper/vg01-vol_mv1p1 /mnt_vg/ #como root
ls -l /mnt_vg/
```

Con salida:

```bash
root@ThousandSunny:~# mount /dev/mapper/vg01-vol_mv1p1 /mnt_vg/
root@ThousandSunny:~# ls -l /mnt_vg/
total 76

lrwxrwxrwx  1 root root     7 feb  2 10:20 bin -> usr/bin
drwxr-xr-x  3 root root  4096 feb  2 10:25 boot
drwxr-xr-x  4 root root  4096 feb  2 10:20 dev
drwxr-xr-x 68 root root  4096 feb  2 10:26 etc
drwxr-xr-x  3 root root  4096 feb  2 10:25 home
lrwxrwxrwx  1 root root    31 feb  2 10:22 initrd.img -> boot/initrd.img-5.10.0-21-amd64
lrwxrwxrwx  1 root root    31 feb  2 10:20 initrd.img.old -> boot/initrd.img-5.10.0-18-amd64
lrwxrwxrwx  1 root root     7 feb  2 10:20 lib -> usr/lib
lrwxrwxrwx  1 root root     9 feb  2 10:20 lib32 -> usr/lib32
lrwxrwxrwx  1 root root     9 feb  2 10:20 lib64 -> usr/lib64
lrwxrwxrwx  1 root root    10 feb  2 10:20 libx32 -> usr/libx32
drwx------  2 root root 16384 feb  2 10:20 lost+found
drwxr-xr-x  3 root root  4096 feb  2 10:20 media
drwxr-xr-x  2 root root  4096 feb  2 10:20 mnt
drwxr-xr-x  2 root root  4096 feb  2 10:20 opt
drwxr-xr-x  2 root root  4096 sep  3 14:10 proc
drwx------  2 root root  4096 feb  2 10:20 root
drwxr-xr-x  2 root root  4096 feb  2 10:26 run
lrwxrwxrwx  1 root root     8 feb  2 10:20 sbin -> usr/sbin
drwxr-xr-x  2 root root  4096 feb  2 10:20 srv
drwxr-xr-x  2 root root  4096 sep  3 14:10 sys
drwxrwxrwt  7 root root  4096 feb  2 10:36 tmp
drwxr-xr-x 14 root root  4096 feb  2 10:20 usr
drwxr-xr-x 11 root root  4096 feb  2 10:20 var
lrwxrwxrwx  1 root root    28 feb  2 10:22 vmlinuz -> boot/vmlinuz-5.10.0-21-amd64
lrwxrwxrwx  1 root root    28 feb  2 10:20 vmlinuz.old -> boot/vmlinuz-5.10.0-18-amd64
```


## Entrega

**1. Instrucción para crear el pool de almacenamiento.**



**2. Instrucción para crear el volumen.**


**3. Una vez instalado el sistema, la configuración XML de la máquina donde se ve el almacenamiento de la misma (se deben ver los dos discos).**


**4. Las instrucciones ejecutadas para montar la partición del disco, y la lista de ficheros del sistema de archivos.**

