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


