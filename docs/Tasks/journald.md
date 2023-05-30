---
sidebar_position: 20
---

# Recolección centralizada de logs del sistema

En esta ocasión, se va a realizar un sistema de recogida de logs de sistema, para ello se va a utilizar el servicio de `journald`, que se encarga de recoger los logs de los servicios del sistema, y de los servicios que se ejecutan en el mismo. En mi caso, voy a usar el escenario montado en OpenStack compuesto por alfa, bravo, charlie y delta. Para esto, se van a seguir los siguientes pasos:

- Instalamos en todas las máquinas el paquete `sytemd-journal-remote`, que es el que nos permite enviar los logs a un servidor remoto:

```bash
sudo apt install systemd-journal-remote
sudo sudo dnf install systemd-journal-remote #para bravo
```

- En el servidor, que en mi caso es alfa, se va a configurar el servicio editando el fichero `/lib/systemd/system/systemd-journal-remote.service` modificando la línea `ExecStart` para que quede de la siguiente forma:

```bash
ExecStart=/lib/systemd/systemd-journal-remote --listen-http=-3 --output=/var/log/journal/remote/
```

- Iniciamos y habilitamos el servicio:

```bash
sudo systemctl enable --now systemd-journal-remote.socket
sudo systemctl enable --now systemd-journal-remote.service
```

- En los clientes, charlie, delta y bravo, se crea un usuario para el envío de logs:

```bash
sudo adduser --system --home /run/systemd --no-create-home --disabled-login --group systemd-journal-upload

sudo adduser --system --home-dir /run/systemd --no-create-home --user-group systemd-journal-upload #para bravo
```

- Modificamos el fichero `/etc/systemd/journal-upload.conf` para que quede de la siguiente forma:

```bash
URL=http://alfa.nazareth.gonzalonazareno.org:19532
```

- Reiniciamos el servicio:

```bash
sudo systemctl restart systemd-journal-upload.service
```

- Para ver los logs en el servidor de los clientes, se ejecuta el siguiente comando:

```bash
sudo journalctl --file /var/log/journal/remote/remote-192.168.0.3.journal
```
