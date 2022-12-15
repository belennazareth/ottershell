---
sidebar_position: 17
---

# Montaje NFS mediante systemd

En una instancia del cloud, basada en la distribución de tu elección, anexa un volumen de 2GB. En dicha instancia deberás configurar el servicio nfs de exportación y en el volumen un punto de montaje de la exportación mediante systemd.

## Creación y configuración de las instancias


### Servidor

Primero creamos la instancia que hará de servidor, en este caso será `Debian 11`:

```bash
openstack server create --flavor m1.mini \
--image "Debian 11 Bullseye" \
--security-group default \
--key-name nazareth_local \
--network "red de nazaret.duran" \
nfs_systemd
```

Y le asignamos una ip flotante para poder acceder a ella:

```bash
openstack floating ip create ext-net
openstack server add floating ip nfs_systemd {ip} 
```

Creamos el volumen de 2GB y se lo anexamos a la instancia:

```bash
openstack volume create --size 2 \
--description "Volumen para la máquina nfs" \
--availability-zone "nova" \
--bootable \
volumen_nfs


openstack server add volume nfs_systemd volumen_nfs
```

Tras realizar estos pasos deberá quedar una estructura similar a la siguiente, donde podemos comprobar que el volumen (`vdb`) se ha anexado correctamente a la instancia:

```bash
debian@nfs-systemd:~$ lsblk

NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
vda     254:0    0   10G  0 disk 
├─vda1  254:1    0  9.9G  0 part /
├─vda14 254:14   0    3M  0 part 
└─vda15 254:15   0  124M  0 part /boot/efi
vdb     254:16   0    2G  0 disk 

```


### Cliente

Lo siguiente será crear una maquina cliente para lo cual no será necesario meterle un volumen:

```bash
openstack server create --flavor m1.mini \
--image "Debian 11 Bullseye" \
--security-group default \
--key-name nazareth_local \
--network "red de nazaret.duran" \
nfs_systemd_client
```

Y le asignamos una ip flotante para poder acceder a ella:

```bash
openstack floating ip create ext-net
openstack server add floating ip nfs_systemd {ip} 
```

Tras realizar estos pasos deberá quedar una estructura similar a la siguiente, donde se ve que no se ha anexado ningún volumen a la instancia:

```bash
debian@nfs-systemd-client:~$ lsblk

NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
vda     254:0    0   10G  0 disk 
├─vda1  254:1    0  9.9G  0 part /
├─vda14 254:14   0    3M  0 part 
└─vda15 254:15   0  124M  0 part /boot/efi

```


## Configuración del servicio NFS

En primer lugar, instalamos el servicio NFS en el servidor:

```bash
apt install nfs-kernel-server 
apt install nfs-common
```

Activamos y habilitamos el servicio nfs:

```bash
systemctl start rpcbind nfs-server
systemctl enable rpcbind nfs-server
```



## Configuración del punto de montaje


systemd tiene dos tipos configuración de unidades: las unidades de tipo service (automount) y las unidades de tipo mount. En este caso vamos a utilizar las unidades de tipo mount.