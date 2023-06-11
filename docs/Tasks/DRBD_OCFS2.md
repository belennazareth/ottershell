---
sidebar_position: 23
---

# Creación de un clúster DRBD + OCFS2

Configura un escenario con dos máquinas. Cada una tiene que tener dos discos adicionales (tamaño 2Gb para que la sincronización sea rápida).

* Crea dos recursos DRBD: wwwdata y dbdata. Cada uno utilizarán uno de los discos de cada máquina.
* Configura en modo Single-primary el recurso wwwdata.
    * Una vez creado y sincronizado el recurso, formatéalo con XFS.
    * Monta el recurso en el nodo primario y crea un fichero. ¿Se puede montar en el secundario?
    * Desmonta el recurso.
    * Cambia los roles, pon primario el que era secundario, y secundario el primario.
    * Monta el recurso en el que ahora es primario y comprueba que existe el fichero creado anteriormente.
* Configura en modo Dual-primary el recurso dbdata.
    * Una vez creado y sincronizado el recurso, configúralo en modo Dual-primary.
    * Crea un clúster OCFS2.
    * Crea un volumen OCFS2 en el recurso (mkfs.ocfs2).
    * Monta en los nodos el recurso, y prueba a escribir en los dos al mismo tiempo.

Montamos el escenario con dos máquinas virtuales, cada una con dos discos adicionales de 2GB en vagrant.

```ruby
Vagrant.configure("2") do |config|
  config.vm.define "node1" do |node1|
    node1.vm.box = "debian/bullseye64"
    node1.vm.hostname = "node1"
    node1.vm.synced_folder ".", "/vagrant", disabled: true
    node1.vm.network "private_network", ip: "10.1.0.10"
    node1.vm.provider :libvirt do |libvirt|
        libvirt.storage :file, :size => '2G'
        libvirt.storage :file, :size => '2G'
    end

  end
  config.vm.define "node2" do |node2|
    node2.vm.box = "debian/bullseye64"
    node2.vm.hostname = "node2"
    node2.vm.synced_folder ".", "/vagrant", disabled: true
    node2.vm.network "private_network", ip: "10.1.0.11"
    node2.vm.provider :libvirt do |libvirt|
        libvirt.storage :file, :size => '2G'
        libvirt.storage :file, :size => '2G'
    end
  end
end
```

Después de crear las máquinas, instalamos los paquetes necesarios para DRBD y OCFS2.

```bash
apt install drbd-utils ocfs2-tools -y
```

Creamos los recursos DRBD en cada máquina, en el fichero `/etc/drbd.d/wwwdata.res`:

```bash
resource wwwdata {
  protocol C;
  meta-disk internal;
  device /dev/drbd1;
  syncer {
    verify-alg sha1;
  }
  net {
    allow-two-primaries;
  }
  on node1 {
    disk /dev/vdb;
    address 10.1.0.10:7789;
  }
  on node2 {
    disk /dev/vdb;
    address 10.1.0.11:7789;
  }
}
```

Creamos el recurso en cada máquina:

```bash
sudo drbdadm create-md wwwdata
sudo drbdadm up wwwdata
```

![drbd](/img/SRI+HLC/taller3SRI7.png)

Creamos el recurso dbdata en cada máquina, en el fichero `/etc/drbd.d/dbdata.res`:

```bash
resource dbdata {
  protocol C;
  meta-disk internal;
  device /dev/drbd2;
  syncer {
    verify-alg sha1;
  }
  net {
    allow-two-primaries;
  }
  on node1 {
    disk /dev/vdc;
    address 10.1.0.10:7790;
  }
  on node2 {
    disk /dev/vdc;
    address 10.1.0.11:7790;
  }
}
```

Creamos el recurso en cada máquina:

```bash
sudo drbdadm create-md dbdata
sudo drbdadm up dbdata
```

![drbd](/img/SRI+HLC/taller3SRI7-2.png)

Configuramos el recurso wwwdata en modo Single-primary:

```bash
sudo drbdadm primary --force wwwdata 
```

Y comprobamos el estado del recurso:

```bash
sudo drbdadm status wwwdata
``` 

Esperamos a que se sincronice el recurso y vemos que el estado es `UpToDate/UpToDate`:

![drbd](/img/SRI+HLC/taller3SRI7-4.png)

En el nodo primario formateamos el recurso con XFS:

```bash
sudo apt install xfsprogs -y
sudo mkfs.xfs /dev/drbd1
```

![drbd](/img/SRI+HLC/taller3SRI7-5.png)

Montamos y creamos un fichero en el nodo primario:

```bash
mount /dev/drbd1 /mnt
echo "Hola :)" > /mnt/fichero.txt
```

Si intentamos montar el recurso en el nodo secundario, vemos que no se puede, si queremos hacer esto debemos desmontar el recurso en el nodo primario y cambiar los roles:


![drbd](/img/SRI+HLC/taller3SRI7-6.png)

```bash
sudo umount /mnt
sudo drbdadm secondary wwwdata #node1
sudo drbdadm primary wwwdata #node2
```

![drbd](/img/SRI+HLC/taller3SRI7-7.png)

Montamos el recurso en el nodo secundario y comprobamos que existe el fichero creado anteriormente:

```bash
sudo mount /dev/drbd1 /mnt
cat /mnt/fichero.txt
```

![drbd](/img/SRI+HLC/taller3SRI7-8.png)

-------------------------------------------------------------------------------

Configuramos el recurso dbdata en modo Dual-primary:

```bash
sudo drbdadm up dbdata
sudo drbdadm status dbdata 
```

![drbd](/img/SRI+HLC/taller3SRI7-9.png)

Ahora, a diferencia del apartado anterior, vamos a configurar el recurso como primario en ambos nodos:

```bash
sudo drbdadm primary --force dbdata
sudo drbdadm status dbdata
```

![drbd](/img/SRI+HLC/taller3SRI7-10.png)

Para poder tener el recurso como primario en ambos nodos, debemos configurar el sistema de ficheros OCFS2, para ello instalamos el paquete `ocfs2-tools` en ambos nodos:

```bash
sudo apt install ocfs2-tools -y
```

Creamos el cluster y añadimos los nodos:

```bash
o2cb add-cluster ocfs2
o2cb add-node ocfs2 node1 --ip 10.1.0.10
o2cb add-node ocfs2 node2 --ip 10.1.0.11
```

Vemos que los nodos están añadidos:

```bash
cat /etc/ocfs2/cluster.conf
```

![drbd](/img/SRI+HLC/taller3SRI7-11.png)

Modificamos el fichero `/etc/default/o2cb` para que se inicie el cluster al arrancar el sistema:

```bash
O2CB_ENABLED=true #modificamos esta línea
O2CB_BOOTCLUSTER=ocfs2
O2CB_HEARTBEAT_THRESHOLD=31
O2CB_IDLE_TIMEOUT_MS=30000
O2CB_KEEPALIVE_DELAY_MS=2000
O2CB_RECONNECT_DELAY_MS=2000
```

Modificamos el fichero `/etc/sysctl.conf`:

```bash
kernel.panic = 30
kernel.panic_on_oops = 1
```

Aplicamos los cambios:

```bash
sudo sysctl -p
```

Ponemos en marcha el cluster:

```bash
o2cb register-cluster ocfs2
o2cb cluster-status ocfs2
```

![drbd](/img/SRI+HLC/taller3SRI7-12.png)



## Entrega

### 1. La salida del comando drbdadm status wwwdata.

### 2. Prueba de funcionamiento del modo Single-primary.

### 3. La salida del comando drbdadm status dbdata.

### 4. Prueba de funcionamiento del modo Dual-primary.

### 5. Muestra al profesor el funcionamiento del modo Dual-primary.
