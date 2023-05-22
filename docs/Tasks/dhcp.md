---
sidebar_position: 27
---

# Protocolo DHCP

## Procedimiento

Vamos a continuar trabajando en el escenario que desarrollamos en la [Práctica: Creación y configuración de un escenario router-nat](https://ottershell.vercel.app/docs/Tasks/router_nat).

Para evitar los problemas que nos puede causar vagrant a la hora de trabajar con el DHCP (los clientes tendrían dos servidores DHCP, el que estamos configurando y el de la red de mantenimiento por eth0), os sugiero:

1. Que montéis el mismo escenario pero en kvm/libvirt, en relación a las redes:

* No tendríamos la interfaz conectada a la red de mantenimiento de vagrant.

* Conectaríamos las máquinas a una red NAT sin dhcp (con IP estática) que utilizaríamos para configurar las máquinas por ansible. Esto soluciona el problema de que las direcciones IP cambien en vagrant y tengamos que cambiar el inventario cada vez que creemos el escenario.

2. Ejecutamos el playbook de la práctica anterior y comprobamos que las máquinas tienen el funcionamiento esperado.

A partir de esta configuración podríamos seguir con esta práctica.

Para esta práctica vamos a utilizar una máquina router que tendrá dos interfaces de red, una por defecto para la conexión al exterior y otra para la red interna que será la que haga DHCP a las máquinas clientes. Los clientes tendran una red interna que se conectará a la red interna del router por DHCP.

**TODAS LAS MÁQUINAS TENDRÁN UNA RED AISLADA DE "MANTENIMIENTO" PARA PODER USAR ESAS IPs PARA EJECUTARLES EL PLAYBOOK DEL ANSIBLE**


Primero creamos una red aislada que usarán como red interna las máquinas clientes y el router:

```bash
<network>
  <name>interna</name>
  <bridge name='virbr17'/>
  <ip address='192.168.123.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.123.2' end='192.168.123.254'/>
    </dhcp>
  </ip>
</network>
```

La definimos en libvirt:

```bash
virsh -c qemu:///system net-define interna.xml
virsh -c qemu:///system net-start interna
virsh -c qemu:///system net-autostart interna
```

Usaremos la red interna para conectar las máquinas clientes y el router.
La red externa/mantenimientoparaejecutarelplaybook no es necesario crearla ya que usaremos la red por defecto (`default`).

Ahora creamos la máquina router:

```bash
virt-install --connect qemu:///system --virt-type kvm --name router-dhcp --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso --os-variant debian10 --disk size=15 --memory 2000 --vcpus 2 
```

Creamos la máquina cliente:

```bash
virt-install --connect qemu:///system --virt-type kvm --name cliente-dhcp --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso --os-variant debian10 --disk size=15 --memory 2000 --vcpus 2 
```

Añadimos la red interna con virsh:

```bash
virsh -c qemu:///system attach-interface --domain router-dhcp --type network --source interna --model virtio --persistent
virsh -c qemu:///system attach-interface --domain cliente-dhcp --type network --source interna --model virtio --persistent
```

Editamos los ficheros de ambas máquinas para que tengan una IP estática en la red de mantenimiento y una IP dinámica en la red interna, la cual se añadirá si no existe en el fichero `/etc/network/interfaces`:

```bash
--- /etc/network/interfaces ROUTER

# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug enp1s0
iface enp1s0 inet static
        address 192.168.132.202
        netmask 255.255.255.0
        network 192.168.132.0
        broadcast 192.168.132.255
        gateway 192.168.132.1

allow-hotplug enp7s0
iface enp7s0 inet dhcp

*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

--- /etc/network/interfaces CLIENTE

# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug enp1s0
iface enp1s0 inet static
        address 192.168.132.103
        netmask 255.255.255.0
        network 192.168.132.0
        broadcast 192.168.132.255
        gateway 192.168.132.1

allow-hotplug enp7s0
iface enp7s0 inet dhcp
```

Después de esto, levantamos las interfaces de las máquinas:

```bash
ifup enp1s0
ifup enp7s0
```

| maquina | ip |
| --- | --- |
| router-dhcp | 192.168.132.202 |
| cliente-dhcp | 192.168.132.103 |

Modificamos el ansible con las nuevas ip en el fichero `hosts`:

```yaml
all:
  children:
    router_client:
      hosts:
        router-dhcp: 
          ansible_ssh_host: 192.168.132.104
          ansible_ssh_user: usuario
          ansible_ssh_pass: usuario
          ansible_become_pass: usuario
          
        cliente-dhcp:
          ansible_ssh_host: 192.168.132.103
          ansible_ssh_user: usuario
          ansible_ssh_pass: usuario
          ansible_become_pass: usuario
```

Las variables que usaremos en el playbook son las siguientes:

```bash
r_privada: 192.168.123.0/24
ip_router: 192.168.123.130
ip_cliente: 192.168.123.227
```

Con esto ya podemos ejecutar el playbook de la práctica anterior y comprobar que las máquinas tienen el funcionamiento esperado.


ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🐚                  🐚                     🐚                      🐚ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ

Queremos instalar un servidor DHCP en la máquina router para que configure de forma automática las máquinas que se conectan en la red interna. Tenemos que tener en cuenta lo siguiente:

1. La máquina cliente de la práctica anterior, que tiene instalado el servidor web, debe tener la misma IP que la que le asígnaste estáticamente, por lo tanto haremos una reserva para que tenga la misma IP.

2. Al añadir una nueva máquina a la red local (recuerda que no se le instalará el servidor web) se configurará de forma dinámica.

3. Crea un nuevo rol en el playbook de ansible llamado dhcp que configure el servidor DHCP de forma correcta. Quizás sea necesario modificar el comportamiento de algún rol de la práctica anterior.

4. Todos los parámetros que reparta el servidor DHCP, así como cualquier otro dato, por ejemplo la dirección MAC del cliente se guardarán en variables.

5. Añade una nueva máquina al escenario conectada a la red interna muy aislada. Vuelve a ejecutar el playbook y comprueba que todo funciona de forma correcta.


Creamos una nueva máquina que se llamará `cliente-dhcp2` y la añadimos a la red interna:

```bash
virsh -c qemu:///system attach-interface --domain cliente-dhcp2 --type network --source interna --model virtio --persistent
```

Editamos el fichero `/etc/network/interfaces` para que tenga una IP dinámica en la red interna:

```bash
--- /etc/network/interfaces CLIENTE2

# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug enp1s0
iface enp1s0 inet static
        address 192.168.132.105
        netmask 255.255.255.0
        network 192.168.132.0
        broadcast 192.168.132.255
        gateway 192.168.132.1

allow-hotplug enp7s0
iface enp7s0 inet dhcp
```

Levantamos la interfaz:

```bash
ifup enp7s0
```

En todas las máquina metemos la ip pública de mi máquina para ejecutar el ansible más facilmente.

| maquina | ip |
| --- | --- |
| router-dhcp | 192.168.132.202 |
| cliente-dhcp | 192.168.132.103 |
| cliente-dhcp2 | 192.168.132.105 |

```bash
r_privada: 192.168.123.0/24
ip_router: 192.168.123.130
ip_cliente: 192.168.123.227
ip_cliente2: 192.168.123.209
```


Ahora creamos los ficheros de configuración:


- playbook.yml

```yaml
- hosts: all
  become: true
  roles:
    - common

- hosts: router
  become: true
  roles:
    - router
    - dhcp

- hosts: web
  become: true
  roles:
    - web
    - clientes

- hosts: cliente
  become: true
  roles:
    - clientes

- hosts: all
  become: true
  roles:
    - reboot
```

- hosts

```yaml
  children:
    routers:
      hosts:
        router:
          ansible_ssh_host: 192.168.132.104
          ansible_ssh_private_key_file: ~/.ssh/id_rsa
    clientes:
      hosts:
        web:
          ansible_ssh_host: 192.168.132.103
          ansible_ssh_private_key_file: ~/.ssh/id_rsa
        cliente:
          ansible_ssh_host: 192.168.132.105
          ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

Creamos todos los demás ficheros de configuración y los roles necesarios para que funcione todo correctamente y ejecutamos el playbook:

```bash
ansible-playbook -i hosts playbook.yaml
o
ansible-playbook playbook.yaml -k
```


## Entrega

### 1. Entrega la URL del repositorio GitHub donde has alojado todos los ficheros.

https://github.com/belennazareth/Protocolo_DHCP/tree/main/ansible

### 2. Entrega el fichero de configuración del servidor DHCP después de ejecutar el playbook de ansible.

```bash
cat /etc/dhcp/dhcpd.conf
```

![dns](/img/SRI+HLC/DHCPSRI2.png)


### 3. Entrega el fichero de configuración de red del cliente (para comprobar que toma direccionamiento dinámico) y que ha tomado la dirección reservada en el servidor DHCP.

```bash
cat /etc/network/interfaces
ip a
```

![dns](/img/SRI+HLC/DHCPSRI2-2.png)
![dns](/img/SRI+HLC/DHCPSRI2-3.png)


### 4. Entrega el fichero de configuración de red de la otra máquina cliente, la dirección que ha tomado y el fichero de concesiones del servidor donde se demuestra que se ha repartido.

```bash
cat /etc/network/interfaces
ip a
```

![dns](/img/SRI+HLC/DHCPSRI2-4.png)
![dns](/img/SRI+HLC/DHCPSRI2-5.png)

```bash

usuario@router-dhcp:~$ cat /var/lib/dhcp/dhclient.enp7s0.leases 
default-duid "\000\001\000\001+\375D\333RT\000\361\356\266";
lease {
  interface "enp7s0";
  fixed-address 192.168.123.100;
  option subnet-mask 255.255.255.0;
  option dhcp-lease-time 3600;
  option dhcp-message-type 5;
  option domain-name-servers 192.168.123.1;
  option dhcp-server-identifier 192.168.123.1;
  option dhcp-renewal-time 1651;
  option broadcast-address 192.168.123.255;
  option dhcp-rebinding-time 3001;
  option host-name "router-dhcp";
  renew 1 2023/05/22 01:43:59;
  rebind 1 2023/05/22 01:43:59;
  expire 1 2023/05/22 01:43:59;
}
lease {
  interface "enp7s0";
  fixed-address 192.168.123.100;
  option subnet-mask 255.255.255.0;
  option dhcp-lease-time 3600;
  option dhcp-message-type 5;
  option domain-name-servers 192.168.123.1;
  option dhcp-server-identifier 192.168.123.1;
  option dhcp-renewal-time 1800;
  option broadcast-address 192.168.123.255;
  option dhcp-rebinding-time 3150;
  option host-name "router-dhcp";
  renew 1 2023/05/22 02:08:46;
  rebind 1 2023/05/22 02:37:06;
  expire 1 2023/05/22 02:44:36;
}
```


### 5. Comprueba que la nueva máquina cliente no tiene el servidor apache2 instalado, y una captura de pantalla comprobando que sigue siendo accesible el servidor web de cliente.

```bash
apt policy apache2
curl 192.169.123.2
```

![dns](/img/SRI+HLC/DHCPSRI2-6.png)
![dns](/img/SRI+HLC/DHCPSRI2-7.png)
![dns](/img/SRI+HLC/DHCPSRI2-8.png)

*Nota: Tuve problemas con la red default dandome un error al iniciarla donde decía que ya existía o estaba en uso, aunque seguía estando inactiva realmente y no me dejaba la opción de iniciarla. Para solucionarlo seguí estos pasoss:

- Quitar la definición de la red default con virsh:

  virsh -c qemu:///system net-undefine default

- Editar el fichero de la red default:

  sudo nano /etc/libvirt/qemu/networks/default.xml

- En mi caso, decidi cambiar el rango que tenía por defecto:

  <network>
  <name>default</name>
  <bridge name='virbr0'/>
  <forward/>
  <ip address='192.168.132.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.132.2' end='192.168.132.254'/>
    </dhcp>
  </ip>
  </network>

- Eliminar el bridge que se había creado:

  sudo ip link set virbr0 down
  sudo brctl delbr virbr0

- Definir la red default con virsh:

  virsh -c qemu:///system net-define /etc/libvirt/qemu/networks/default.xml

- Y la iniciamos:

  virsh -c qemu:///system net-start default

- También ponemos que se autoinicie:

  virsh -c qemu:///system net-autostart default

- Comprobamos que se ha creado correctamente:

  virsh -c qemu:///system net-list --all

- Y que está activa:

  virsh -c qemu:///system net-dhcp-leases default



