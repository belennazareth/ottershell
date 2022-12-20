---
sidebar_position: 17
---


# Montaje NFS mediante systemd

En una instancia del cloud, basada en la distribución de tu elección, anexa un volumen de 2GB. En dicha instancia deberás configurar el servicio nfs de exportación y en el volumen un punto de montaje de la exportación mediante systemd.



## Creación y configuración de las instancias

Las instancias están basadas en la distribución `Debian 11 Bullseye` y se han creado en la red `red de nazaret.duran` con la clave `nazareth_local` y el grupo de seguridad `default` dentro de la aplicación `OpenStack`.



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



## Configuración del servidor NFS

### Configuración del servicio NFS

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

Podemos comprobar que el servicio está instalado y activo con el comando:

```bash
systemctl status rpcbind nfs-server

o

rpcinfo -p
```

Con este último comando podemos ver que el servicio está activo y escuchando en el puerto 2049. Además, podemos ver que el servicio está activo en el puerto 111, que es el puerto por el que se comunica el cliente con el servidor. Obteniendo una salida similar a la siguiente:

```bash
debian@nfs-systemd:~$ rpcinfo -p

   program vers proto   port  service
    100000    4   tcp    111  portmapper
    100000    3   tcp    111  portmapper
    100000    2   tcp    111  portmapper
    100000    4   udp    111  portmapper
    100000    3   udp    111  portmapper
    100000    2   udp    111  portmapper
    100005    1   udp  54467  mountd
    100005    1   tcp  36633  mountd
    100005    2   udp  42675  mountd
    100005    2   tcp  43481  mountd
    100005    3   udp  44012  mountd
    100005    3   tcp  58893  mountd
    100003    3   tcp   2049  nfs
    100003    4   tcp   2049  nfs
    100227    3   tcp   2049
    100003    3   udp   2049  nfs
    100227    3   udp   2049
    100021    1   udp  52555  nlockmgr
    100021    3   udp  52555  nlockmgr
    100021    4   udp  52555  nlockmgr
    100021    1   tcp  43955  nlockmgr
    100021    3   tcp  43955  nlockmgr
    100021    4   tcp  43955  nlockmgr

```



### Configuración del punto de montaje

Configuramos el punto de montaje en el servidor entrando al directorio `/etc/systemd/system` y creamos un fichero con la extensión `.mount`:

```bash 
mkdir /nfs

nano /etc/systemd/system/nfs.mount
```

Dentro del fichero tendremos que añadir lo siguiente:

```bash
[Unit]
Description=Disco montado en /nfs usando volumen añadido
[Mount]
What=/dev/vdb       -- Volumen añadido a la instancia
Where=/nfs          -- Directorio donde se montará el volumen
Type=ext4           -- Tipo de sistema de ficheros
Options=defaults    -- Opciones de montaje
[Install]
WantedBy=multi-user.target -- Servicio que se iniciará al arrancar el sistema
```

Debemos tener en cuenta que el volumen que hemos añadido a la instancia tiene que estar formateado. Para ello, ejecutamos el siguiente comando:

```bash
mkfs.ext4 /dev/vdb
```

Y por último, recargamos el *daemon* y activamos el punto de montaje:

```bash
systemctl daemon.reload
systemctl start nfs.mount
```

Podemos comprobar que el punto de montaje se ha creado correctamente y que el volumen se ha montado en el directorio `/nfs` con el comando `lsblk -f`:

```bash
root@nfs-systemd:~# lsblk -f

NAME    FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINT
vda                                                                            
├─vda1  ext4   1.0         ce1282a1-ced7-40a2-8b01-eed78dc14d62    8.2G    11% /
├─vda14                                                                        
└─vda15 vfat   FAT16       4A0A-DB16                             117.8M     5% /boot/efi
vdb     ext4   1.0         67c14f57-2088-41ad-8abf-6e2b4ddb71cd    1.8G     0% /nfs

```


Al realizar esta configuración con `systemd`, vemos que este daemon tiene dos tipos de configuración de unidades: las unidades de tipo service (automount) y las unidades de tipo mount. En este caso vamos hemos usado las unidades de tipo mount, las cuales se ejecutan en el arranque del sistema y se mantienen activas hasta que se apaga el sistema. Por otro lado, las unidades de tipo service (automount) se ejecutan en el arranque del sistema y se mantienen activas hasta que se desmontan. En este caso, no hemos usado este tipo de unidades porque no queremos que se desmonte el volumen cuando no se esté usando.

Si queremos que el volumen se monte automáticamente al arrancar el sistema, debemos añadir la siguiente línea al fichero `/etc/fstab`:

```bash
/dev/vdb /nfs ext4 defaults 0 0
```

Por último, para que se puedan conectar los clientes NFS, debemos añadir la siguiente línea al fichero `/etc/exports`:

```bash
/nfs 10.0.0.0/24(rw,all_squash,no_subtree_check)
```

Donde indicamos que para ese directorio solo se puedan conectar desde la red **10.0.0.0** y tenga permisos de `lectura y escritura`, además de la opción **all_squash** que indica el uso de *root_squash* para todos los usuarios considerándolos anónimos, dicha opción hace que se realicen las consultas desde el usuario `nobody` obteniendo los permisos de `otros`. Y con la opción **no_subtree_check** indicamos que no se compruebe si el directorio es un subdirectorio de otro directorio compartido, es decir, permite que no se compruebe el camino hasta el directorio que se exporta, en el caso de que el usuario no tenga permisos sobre el directorio exportado.

Para realizar la **[modificación anterior](https://ottershell.vercel.app/docs/Tasks/nfs_systemd#configuraci%C3%B3n-del-punto-de-montaje)** sin necesidad de reiniciar el servicio podemos usar el comando **exportfs**, al aplicarle la opción **-r** realiza el reinicio añadiendo las modificaciones a su vez. 



## Configuración del cliente NFS

Los clientes NFS que usan el directorio compartido no usan ningún tipo de identificación ya que considera que los identificadores  de los usuarios son iguales:

    cat /etc/passwd | grep debian

```bash
# En el servidor

debian@nfs-systemd:~$ cat /etc/passwd | egrep debian

debian:x:1000:1000:Debian:/home/debian:/bin/bash

# En el cliente

debian@nfs-systemd-client:~$ cat /etc/passwd | egrep debian

debian:x:1000:1000:Debian:/home/debian:/bin/bash
```

*Nota: De esta manera el cliente puede acceder al directorio compartido del servidor y viceversa, pero no puede editar los ficheros o directorios del servidor, ya que el usuario que se usa es el del cliente y no el del servidor, por lo que en caso de querer editar algo del servidor, se debería cambiar el usuario del fichero con `chown` a nobody y los permisos a 750 con `chmod`. En mi caso, he realizado este procedimiento para poder editar los ficheros del servidor desde el cliente y poder ver los cambios en el servidor.

Gracias a esto cuando un cliente se conecta a un recurso compartido, el usuario de ese cliente, pasa a tener los mismos permisos que el usuario de la máquina servidor.  

En cuanto al usuario root, gracias a la configuración `root_squash` (que se uso en la configuración en el servidor en `/etc/exports`) evita que sea usado como tal asignado valores de usuarios `otros` al mismo.



### Instalación del cliente NFS

Para realizar la instalación en el cliente del servicio NFS ejecutamos el siguiente comando:

    sudo apt install nfs-common

Podemos comprobar los puntos de montaje que tenemos en el sistema usando:

```bash
root@nfs-systemd-client:~# showmount -e 10.0.0.26 <-[ip del servidor]

Export list for 10.0.0.26:
/nfs 10.0.0.0/24
```



### Configuración del punto de montaje

Para esto creamos el directorio donde se montará el recurso compartido:

    mkdir /nfs_cliente

Y dentro del fichero `/etc/systemd/system/nfs_client.mount` añadimos la siguiente configuración:

```bash
[Unit]
Description=Disco montado en /nfs_cliente                       
[Mount]
What=10.0.0.26:/nfs     -- [ip del servidor]:[directorio compartido]
Where=/nfs_cliente      -- directorio donde se montará el recurso compartido en el cliente
Type=nfs                -- tipo de recurso compartido 
Options=defaults        -- opciones de montaje
[Install]
WantedBy=multi-user.target      -- para que se monte al arrancar el sistema
```

Lo siguiente será activar el servicio:

    systemctl enable nfs_client.mount

Y por último montar el recurso compartido:

    systemctl start nfs_client.mount

Con esto ya tendremos el recurso compartido montado en el cliente, pudiendo comprobarlo con el comando `mount`:

```bash
debian@nfs-systemd-client:~$ df -h | egrep nfs

10.0.0.26:/nfs  2.0G     0  1.8G   0% /nfs_cliente
```

Para que el recurso compartido se monte automáticamente al arrancar el sistema, debemos añadir la siguiente línea al fichero `/etc/fstab`:

```bash
10.0.0.26:/nfs /nfs_cliente nfs defaults 0 0
```



## Comprobación de funcionamiento

Para comprobar que funciona correctamente podemos crear un fichero en el directorio compartido del servidor y verificar que se ha creado en el cliente:

```bash
sudo touch /nfs/pruebesita  -- [directorio compartido del servidor]

ls /nfs_cliente/    -- [listado del directorio compartido del cliente]
```

![img](/img/ASO/nfsASO.png)


Como se hizo un cambio en el directorio compartido del servidor tanto de permisos como de propietario, se puede editar ficheros, crear directorios, etc. desde el cliente y ver los cambios en el servidor, y viceversa.

Por ejemplo, desde el cliente podemos editar el fichero y verlo desde el servidor:

```bash
sudo nano /nfs_cliente/pruebesita -- [edición del fichero compartido del cliente]

cat /nfs/pruebesita -- [visualización del fichero compartido del servidor]
```

![img](/img/ASO/nfsASO-2.png)
