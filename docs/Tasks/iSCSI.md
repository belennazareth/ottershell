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



**4. Se realizará una prueba delante del profesor para comprobar que el sistema funciona después de un reinicio.**

