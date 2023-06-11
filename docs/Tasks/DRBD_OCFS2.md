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
    node1.vm.network "private_network", ip: "10.1.0.10"
    node1.vm.provider :libvirt do |libvirt|
        libvirt.storage :file, :size => '2G'
        libvirt.storage :file, :size => '2G'
    end

  end
  config.vm.define "node2" do |node2|
    node2.vm.box = "debian/bullseye64"
    node2.vm.hostname = "node2"
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




## Entrega

### 1. La salida del comando drbdadm status wwwdata.

### 2. Prueba de funcionamiento del modo Single-primary.

### 3. La salida del comando drbdadm status dbdata.

### 4. Prueba de funcionamiento del modo Dual-primary.

### 5. Muestra al profesor el funcionamiento del modo Dual-primary.
