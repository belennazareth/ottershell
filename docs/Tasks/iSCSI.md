---
sidebar_position: 27
---

# Introducción a iSCSI

## Procedimiento

Utiliza el siguiente fichero [Vagrantfile](https://fp.josedomingo.org/sri2223/7_almacenamiento/files/iscsi/Vagrantfile) para realizar el taller:

*Nota: Primero debes instalar `tgt` en el servidor y `open-iscsi` en el cliente.* 

1. En el servidor, crea un target con una LUN y conéctala a un cliente GNU/Linux. Explica cómo escaneas desde el cliente buscando los targets disponibles y utiliza la unidad lógica proporcionada, formateándola si es necesario y montándola.

Primero creamos el target editando el fichero `/etc/tgt/targets.conf` y añadiendo lo siguiente:

```bash
<target iqn.2023-01-target1>
    backing-store /dev/vdb
</target>
```

Luego reiniciamos el servicio `tgt` y comprobamos que el target se ha creado correctamente y que contiene la LUN que hemos creado:

```bash
sudo systemctl restart tgt

sudo tgtadm --mode target --op show
```

![KP](/img/SRI+HLC/taller2SRI7.png)

Configuramos el cliente para que se conecte al target indicando la IP del servidor y el nombre del target en el siguiente comando:

```bash
sudo iscsiadm --mode discovery --type sendtargets --portal 192.168.121.9
sudo iscsiadm --mode node -T iqn.2023-01-target1 --portal 192.168.121.9 -l
```

Y comprobamos que se ha conectado correctamente viendo la sesión o usando :

```bash
sudo iscsiadm -m session
sudo journalctl -k -f
```

![KP](/img/SRI+HLC/taller2SRI7-2.png)

Para escanear los targets disponibles en el cliente, utilizamos el comando `iscsiadm`:

```bash
sudo iscsiadm --mode discovery --type sendtargets --portal 192.168.121.9
```

![KP](/img/SRI+HLC/taller2SRI7-3.png)

Lo siguiente será formatear la unidad lógica que nos proporciona el target y montarla en el cliente:

```bash
sudo mkfs.ext4 /dev/sda
sudo mkdir /mnt/iscsi
sudo mount /dev/sda /mnt/iscsi
```

Comprobamos que se ha montado correctamente:

```bash
lsblk -f
```

![KP](/img/SRI+HLC/taller2SRI7-4.png)

También podemos crear un fichero en la unidad lógica para comprobar que se ha montado correctamente:

```bash
sudo touch /mnt/iscsi/prueba.txt 
```

![KP](/img/SRI+HLC/taller2SRI7-5.png)



2. Utiliza [systemd mount](https://eltallerdelbit.com/montar-unidades-con-systemd/) para que el target se monte automáticamente al arrancar el cliente.

3. Crea un target con 2 LUN y autenticación por CHAP y conéctala a un cliente windows. Explica cómo se escanea la red en windows y cómo se utilizan las unidades nuevas (formateándolas con NTFS)

4. El sistema debe funcionar después de un reinicio de las máquinas.



## Entrega

**1. Las instrucciones que has ejecutados en el cliente iscsi para escanear los targets y formatear u montar el dispositivo compartido.**

Para escanear los targets disponibles en el cliente, utilizamos el comando `iscsiadm`:

```bash
sudo iscsiadm --mode discovery --type sendtargets --portal 192.168.121.9
```

![KP](/img/SRI+HLC/taller2SRI7-3.png)

Ejecutamos el siguiente comando para conectarnos al target de forma permanente:

```bash
sudo iscsiadm --mode discovery --portal 192.168.121.9 --login
```

Lo siguiente será formatear la unidad lógica que nos proporciona el target y montarla en el cliente:

```bash
sudo mkfs.ext4 /dev/sda
sudo mkdir /mnt/iscsi
sudo mount /dev/sda /mnt/iscsi
```

Comprobamos que se ha montado correctamente:

```bash
lsblk -f
```

![KP](/img/SRI+HLC/taller2SRI7-4.png)

También podemos crear un fichero en la unidad lógica para comprobar que se ha montado correctamente:

```bash
sudo touch /mnt/iscsi/prueba.txt 
```

![KP](/img/SRI+HLC/taller2SRI7-5.png)


**2. La configuración que has realizado para que el montaje sea automático tras iniciar el sistema.**

Primero modificamos el fichero `/etc/iscsi/iscsid.conf` y añadimos lo siguiente:

```bash
node.startup = automatic
```

Y reiniciamos el servicio `iscsid`:

```bash
sudo systemctl restart iscsid
```

Lo habilitamos de forma permanente:

```bash
sudo systemctl enable iscsid open-iscsi.service
```

Creamos la unidad systemd para que se monte el target automáticamente:

```bash
sudo nano /etc/systemd/system/mnt-iscsi.mount
```

Y añadimos lo siguiente:

```bash
[Unit]
Description=Mount target2
Requires=network-online.target
After=network-online.target, iscsid.service

[Mount]
What=/dev/sda
Where=/mnt/iscsi
Type=ext4
Options=defaults

[Install]
WantedBy=multi-user.target
```

Reiniciamos los daemons y habilitamos la unidad systemd:

```bash
sudo systemctl daemon-reload

sudo systemctl enable mnt-iscsi.mount
sudo systemctl start mnt-iscsi.mount
```

![KP](/img/SRI+HLC/taller2SRI7-6.png)


**3. Capturas de pantallas donde se vea cómo se ha escaneado los targets y se han formateado los dispositivos de bloque y se han montado en el cliente windows.**

Conectamos la máquina a la red de vagrant para que pueda conectarse a las otras máquinas (cliente y servidor).
Quitamos el cortafuegos de la máquina windows para que pueda conectarse al servidor y hacer ping a las otras máquinas.

![KP](/img/SRI+HLC/taller2SRI7-7.png)

En la máquina cliente creamos otro target con 2 LUN:

```bash
sudo nano /etc/tgt/conf.d/target2.conf
```

Y añadimos lo siguiente:

```bash
<target iqn.2021-11.org.example:target2>
    driver iscsi
    controller_tid 2
    backing-store /dev/vdc
    backing-store /dev/vdd
    incominguser usuario usuariocontra
</target>
```

*Nota: La contraseña tiene que tener entre 12 y 16 caracteres sino no funciona despues en windows la verificación por CHAP.

Reiniciamos el servicio `tgt`:

```bash
sudo systemctl restart tgt
```

Podemos comprobarlo con el comando:

```bash
sudo tgtadm --lld iscsi --op show --mode target
```

Con esto vemos que en el apartado `Backing store path` aparecen las rutas `/dev/vdc` y `/dev/vdd` que son las unidades lógicas que hemos creado.

```bash
        LUN: 1
            Type: disk
            SCSI ID: IET     00020001
            SCSI SN: beaf21
            Size: 2147 MB, Block size: 512
            Online: Yes
            Removable media: No
            Prevent removal: No
            Readonly: No
            SWP: No
            Thin-provisioning: No
            Backing store type: rdwr
            Backing store path: /dev/vdc        <<<< ⭐🐝 RUTA DE LA UNIDAD LÓGICA ⭐🐝
            Backing store flags: 
        LUN: 2
            Type: disk
            SCSI ID: IET     00020002
            SCSI SN: beaf22
            Size: 3221 MB, Block size: 512
            Online: Yes
            Removable media: No
            Prevent removal: No
            Readonly: No
            SWP: No
            Thin-provisioning: No
            Backing store type: rdwr
            Backing store path: /dev/vdd        <<<< 💐🐥 RUTA DE LA UNIDAD LÓGICA 💐🐥
            Backing store flags: 
    Account information:
        usuario
    ACL information:
        ALL
```

En windows, entramos en `iscsi initiator` y cambiamos en `Discovery` el portal al del servidor para que pueda escanear los targets:

![KP](/img/SRI+HLC/taller2SRI7-8.png)

Después, en el apartado `Targets` vemos que aparece el target2 que hemos creado en el servidor, clicamos en él y a continuación en `Connect` para conectarnos al target:

![KP](/img/SRI+HLC/taller2SRI7-9.png)

Al entrar, usamos la configuración avanzada y activamos `Enable CHAP log on`, ponemos el usuario y la contraseña que hemos puesto en el servidor y le damos a `OK`: 

![KP](/img/SRI+HLC/taller2SRI7-10.png)
![KP](/img/SRI+HLC/taller2SRI7-11.png)

Como podemos ver, se ha conectado correctamente:

![KP](/img/SRI+HLC/taller2SRI7-12.png)

Por último, entramos en `Disks Management` y vemos que se han creado dos unidades lógicas que marcaremos como GPT:

![KP](/img/SRI+HLC/taller2SRI7-13.png)

Para dar formato NTFS, clicamos con el botón derecho en cada unidad lógica y le damos a `crear volumen simple` y le damos formato NTFS:

![KP](/img/SRI+HLC/taller2SRI7-14.png)
![KP](/img/SRI+HLC/taller2SRI7-15.png)
![KP](/img/SRI+HLC/taller2SRI7-16.png)
![KP](/img/SRI+HLC/taller2SRI7-17.png)

**4. Se realizará una prueba delante del profesor para comprobar que el sistema funciona después de un reinicio.**

