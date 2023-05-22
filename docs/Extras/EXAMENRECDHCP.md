## Examen Recuperación

### Prueba de funcionamiento de la práctica 1

ansible: https://github.com/belennazareth/vagrant_ansible
He tenido que cambiar los nombres quitandoles la barra baja:

```yaml
Vagrant.configure("2") do |config|
config.vm.define :router do |router|
    router.vm.box = "debian/bullseye64"
    router.vm.hostname = "routerprueba"
    router.vm.synced_folder ".", "/vagrant", disabled: true
    router.vm.network :public_network,
      :dev => "br0",
      :mode => "bridge",
      :type => "bridge",
      use_dhcp_assigned_default_route: true
    router.vm.network :private_network,
      :libvirt__network_name => "net1",
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.1",
      :libvirt__forward_mode => "veryisolated"
  end
  config.vm.define :cliente do |cliente|
    cliente.vm.box = "debian/bullseye64"
    cliente.vm.hostname = "clienteprueba"
    cliente.vm.synced_folder ".", "/vagrant", disabled: true
    cliente.vm.network :private_network,
      :libvirt__network_name => "net1",
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.2",
      :libvirt__forward_mode => "veryisolated"
  end
end
```

- ssh + ip r:

![dhcp](/img/SRI+HLC/EXAMENREC1.png)

- ping:

![dhcp](/img/SRI+HLC/EXAMENREC2.png)

- web:

![dhcp](/img/SRI+HLC/EXAMENREC3.png)


### Prueba de funcionamiento de la práctica 2

ansible: https://github.com/belennazareth/Protocolo_DHCP/tree/main/ansible

- puerta de enlace:

![dhcp](/img/SRI+HLC/EXAMENREC4.png)

- direccionamiento:

![dhcp](/img/SRI+HLC/EXAMENREC5.png)

- ping:

![dhcp](/img/SRI+HLC/EXAMENREC6.png)

- web:

![dhcp](/img/SRI+HLC/EXAMENREC7.png)

### Modificación de la práctica 2

creo la red aisladaex.xml:

```xml
<network>
  <name>aisladaex</name>
  <bridge name='virbr19'/>
  <ip address='10.20.30.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='10.20.30.2' end='10.20.30.254'/>
    </dhcp>
  </ip>
</network>
```

la añado a libvirt:

```bash
virsh -c qemu:///system net-define aisladaex.xml
virsh -c qemu:///system net-start aisladaex
```

la añado a router:

```yaml
virsh -c qemu:///system attach-interface --domain router-dhcp --type network --source aisladaex --model virtio --persistent
```

le asigno una ip fija a router:

![dhcp](/img/SRI+HLC/EXAMENREC8.png)

editamos el fichero dhcpd.conf:

![dhcp](/img/SRI+HLC/EXAMENREC9.png)

reiniciamos el servicio:

sudo systemctl restart isc-dhcp-server

en el cliente agregamos una nueva interfaz con configuración en interfaces:

![dhcp](/img/SRI+HLC/EXAMENREC10.png)

y vemos la ip que ha tomado del servidor:

![dhcp](/img/SRI+HLC/EXAMENREC11.png)

vemmos ip r y ping:

![dhcp](/img/SRI+HLC/EXAMENREC12.png)

