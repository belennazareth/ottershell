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
La red externa no es necesario crearla ya que usaremos la red por defecto.

Ahora creamos la máquina router:

```bash
virt-install --connect qemu:///system --virt-type kvm --name router_dhcp --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso --os-variant debian10 --disk size=15 --memory 2000 --vcpus 2 --network network=default,model=virtio --network network=interna,model=virtio 
```

Creamos la máquina cliente:

```bash
virt-install --connect qemu:///system --virt-type kvm --name cliente_dhcp --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso --os-variant debian10 --disk size=15 --memory 2000 --vcpus 2 --network network=default,model=virtio --network network=interna,model=virtio 
```



ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🐚                  🐚                     🐚                      🐚ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ

Queremos instalar un servidor DHCP en la máquina router para que configure de forma automática las máquinas que se conectan en la red interna. Tenemos que tener en cuenta lo siguiente:

1. La máquina cliente de la práctica anterior, que tiene instalado el servidor web, debe tener la misma IP que la que le asígnate estáticamente, por lo tanto haremos una reserva para que tenga la misma IP.

2. Al añadir una nueva máquina a la red local (recuerda que no se le instalará el servidor web) se configurará de forma dinámica.

3. Crea un nuevo rol en el playbook de ansible llamado dhcp que configure el servidor DHCP de forma correcta. Quizás sea necesario modificar el comportamiento de algún rol de la práctica anterior.

4. Todos los parámetros que reparta el servidor DHCP, así como cualquier otro dato, por ejemplo la dirección MAC del cliente se guardarán en variables.

5. Añade una nueva máquina al escenario conectada a la red interna muy aislada. Vuelve a ejecutar el playbook y comprueba que todo funciona de forma correcta.

## Entrega

### 1. Entrega la URL del repositorio GitHub donde has alojado todos los ficheros.



### 2. Entrega el fichero de configuración del servidor DHCP después de ejecutar el playbook de ansible.



### 3. Entrega el fichero de configuración de red del cliente (para comprobar que toma direccionamiento dinámico) y que ha tomado la dirección reservada en el servidor DHCP.



### 4. Entrega el fichero de configuración de red de la otra máquina cliente, la dirección que ha tomado y el fichero de concesiones del servidor donde se demuestra que se ha repartido.



### 5. Comprueba que la nueva máquina cliente no tiene el servidor apache2 instalado, y una captura de pantalla comprobando que sigue siendo accesible el servidor web de cliente.


