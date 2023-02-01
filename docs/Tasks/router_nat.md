---
sidebar_position: 6
---

# Creación y configuración de un escenario router-nat

## Procedimiento


Queremos automatizar la creación de la siguiente infraestructura usando Vagrant, el esquema que queremos desarrollar, que vemos en la imagen, tiene las siguientes características:

Es escenario tiene dos máquinas:

- router: que está conectada a una red pública y a una red privada (muy aislada).

- cliente: esta máquina está conectada a la misma red privada que la máquina anterior.

- La máquina router debe salir por la red pública. Esta máquina no va a utilizar eth0 para acceder al exterior.


Para esto se ha creado un fichero Vagrantfile que contiene la configuración de las máquinas. El fichero Vagrantfile que se ha creado es el siguiente:

```ruby


  Vagrant.configure("2") do |config|
    config.vm.box = "debian/bullseye64"
    config.vm.synced_folder ".", "/vagrant", disabled: true
    
    config.vm.define :router do |router|
      router.vm.hostname = "router"
      router.vm.network :public_network,
			  :dev => "bridge0",
			  :mode => "bridge",
			  :type => "bridge"
      router.vm.network :private_network,
        :libvirt__network_name => "redaislada",
        :libvirt__dhcp_enabled => false,
        :ip => "10.0.0.1",
        :libvirt__forward_mode => "veryisolated"
    end

    config.vm.define :client do |client|
      client.vm.hostname = "client"
      client.vm.network :private_network,
        :libvirt__network_name => "redaislada",
        :libvirt__dhcp_enabled => false,
        :ip => "10.0.0.2",
        :libvirt__forward_mode => "veryisolated"
    end
	  
  end
    
```

Para crear el escenario, debemos ejecutar el siguiente comando:

```bash
vagrant up
```

Para acceder a las máquinas, debemos ejecutar el siguiente comando:

```bash
vagrant ssh router
vagrant ssh client
```

Para destruir el escenario, debemos ejecutar el siguiente comando:

```bash
vagrant destroy -f
```


ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🦦                  🦦                     🦦                      🦦ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ


Queremos configurar el escenario con ansible, para que cumpla lo siguiente:

- La máquina cliente debe tener acceso a internet. Para ello debe salir por eth1 y la máquina router debe estar configurada para enrutar las peticiones de las máquinas conectadas a la red privada. Del mismo modo, eth0 sólo se utiliza para acceder con vagrant ssh. Debes pensar qué configuración debe tener la máquina cliente: puerta de enlace, configuración dns,…

- La máquina cliente tendrá un servidor web instalado, la máquina router hará DNAT para que podamos acceder a la página usando su IP pública.

La receta ansible debe tener al menos 4 roles:

- common: Estas tareas se deben ejecutar en todos los nodos: actualizar los paquetes y añadir tu clave pública a la máquinas para poder acceder a ellas con ssh. ¿Existe algún módulo de ansible que te permita copiar claves públicas?.

- router: Todas las tareas necesarias para configurar router cómo router-nat y que salga a internet por eth1. Las configuraciones deben ser permanentes. ¿Existe algún módulo de ansible que te permita ejecutar sysctl?.

- cliente: Todas las tareas necesarias para que las máquinas conectadas a la red privada salgan a internet por eth1.

- web: Las tareas necesarias para instalar y configurar un servidor web con una página estática en la máquina cliente.


Al configurar ansible se ejecuta el siguiente comando:

```bash
ansible-playbook site.yaml
```

Y obtenemos el siguiente resultado:

![Term](/img/SRI/practicaSRI-8.png)


ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🦦                  🦦                     🦦                      🦦ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ


## Entrega

1. Entrega la URL del repositorio GitHub donde has alojado todos los ficheros.

[Repositorio](https://github.com/belennazareth/vagrant_ansible)


2. Entrega una captura de pantalla accediendo por ssh a las dos máquinas (sin utilizar vagrant ssh, es decir sin hacer conexiones a eth0). Usa la opción -A de ssh para acceder al cliente.

```bash
ssh -A vagrant@192.168.1.105

ssh -AJ vagrant@192.168.1.105 vagrant@10.0.0.2
```

![Term](/img/SRI/practicaSRI-10.png)

*Nota: accedemos al cliente por con -AJ para que haga puente con el router y así poder acceder a la máquina cliente desde el router.


3. Entrega capturas de pantalla donde se vean las puertas de enlaces de los dos equipos.

```bash
ip route
```

* Router
![Term](/img/SRI/practicaSRI-11.png)

* Cliente
![Term](/img/SRI/practicaSRI-12.png)


4. Entrega capturas de pantalla donde se vean las máquinas haciendo ping al exterior.

```bash
ping 8.8.8.8
```

* Router
![Term](/img/SRI/practicaSRI-13.png)

* Cliente
![Term](/img/SRI/practicaSRI-14.png)

*Nota: para que esto funcione se tienen que conectar las dos máquinas para que el cliente pueda acceder al exterior a través del router:

```bash
up iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth1 -j MASQUERADE
```


5. Entrega una captura de pantalla donde se vea un acceso a la página web alojada en la máquina cliente.

![Term](/img/SRI/practicaSRI-15.png)


*Nota: para que esto funcione es necesario meter en el router una línea en interfaces para que todo lo que llegue al router por el puerto 80 se mande al cliente:

```bash
up iptables -t nat -A PREROUTING -p tcp --dport 80 -i eth1 -j DNAT --to 10.0.0.2
```