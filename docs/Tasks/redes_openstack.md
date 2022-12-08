---
sidebar_position: 14
---


# Gestión de redes en OpenStack

## Procedimientos

1. Crea una nueva red (llamada red-externa) y una subred con DHCP, DNS el 192.168.202.2 y direccionamiento 192.168.0.0/24. Crea un nuevo router. Conecta la nueva red al router, y el router a red pública.

Para una red:

```bash
openstack network create red-externa

openstack subnet create --network red-externa --dhcp --dns-nameserver 192.168.202.2 --subnet-range 192.168.0.0/24 subred-externa
```

Para crear un router:

```bash
openstack router create routersin

openstack router set routersin --external-gateway ext-net
openstack router add subnet routersin subred-externa
```


2. Crea una instancia (llamada maquina-router) conectada a la nueva red. Comprueba que la IP fija está en el direccionamiento de la nueva red. ¿Puedes añadirle una IP flotante a la nueva instancia? ¿Por qué?.

Para crear la instancia:

```bash
 openstack server create --flavor m1.mini \
 --image "Debian 11 Bullseye" \
 --security-group default \
 --key-name nazareth_local \
 --network red-externa \
 maquina-router
```

Para añadir la IP flotante:

```bash
 openstack floating ip create ext-net
 openstack server add floating ip  maquina-router {ip}
 ```


3. Crea una nueva red (llamada red-interna) y una subred con DHCP, DNS el 192.168.202.2 y direccionamiento 10.0.100.0/24.

 ```bash
openstack network create red-interna --internal

openstack subnet create --network red-interna --dhcp --dns-nameserver 192.168.202.2 --subnet-range 10.0.100.0/24 subred-interna
 ```


4. Conecta la instancia maquina-router a la nueva red y asígnale la primera dirección: 10.0.100.1.

Para crear un puerto:

```bash
openstack port create --network red-interna --fixed-ip ip-address=10.0.100.1 puertesito
```

Para conectar la instancia `maquina-router`:

```bash
openstack server add port maquina-router puertesito
```


5. Crea una instancia llamada maquina-cliente conectada a la red red-interna. Usando puertos de red asígnale la dirección 10.0.100.200. Comprueba que su puerta de enlace es la instancia maquina-router. ¿Puedes asignarle a esta instancia una IP flotante? ¿Por qué?.

6. A continuación vamos a configurar la instancia maquina-router para que haga de router-nat. Sin embargo, las restricciones y la seguridad del cortafuegos que tenemos configurado en cada una de las intrefaces de las instancias no van a permitir que funcione de forma adecuada. Por lo tanto, desactiva la seguridad de la interfaz de maquina-router y maquina-cliente conectadas a la red-interna.

7. Configura la instancia maquina-router para que funcione como router-nat. Comprueba que el cliente tiene acceso a internet. Instala un servidor web en el cliente.

8. Accede desde el exterior con un navegador web al servidor web del cliente.


## Entrega

### 1. Los comandos OSC para crear la red `red-externa`.

```bash
openstack network create red-externa

openstack subnet create --network red-externa --dhcp --dns-nameserver 192.168.202.2 --subnet-range 192.168.0.0/24 subred-externa
```


### 2. Los comandos OSC y sus salidas, para visualizar las redes que tienes en tu proyecto y los routers.

```bash
(RedLine)  nazare@ThousandSunny  ~$  openstack network list

+--------------------------------------+--------------------------+--------------------------------------+
| ID                                   | Name                     | Subnets                              |
+--------------------------------------+--------------------------+--------------------------------------+
| 2ebd4d15-00e3-44c6-a9a7-aeebef5f6540 | ext-net                  | fedce2ca-083e-4df8-bf1c-abbf4ab19cd1 |
| 705f009c-06ec-4b44-82c9-8492713f0a1f | red de nazaret.duran     | c51bfa29-134c-4b8e-b1e0-e409a677cd56 |
| 98c1cf52-b499-44fc-bcb1-47c1e1fc5872 | Red DMZ de nazaret.duran | 5c49862b-4cf8-4e18-af20-24a348692a10 |
| fcfaba89-33f9-41f8-9971-72ac95435783 | red-externa              | ca685547-1fe3-41a4-bf5b-ce402f807abd |
+--------------------------------------+--------------------------+--------------------------------------+

(RedLine)  nazare@ThousandSunny  ~$  openstack subnet list

+--------------------------------------+----------------+--------------------------------------+----------------+
| ID                                   | Name           | Network                              | Subnet         |
+--------------------------------------+----------------+--------------------------------------+----------------+
| 5c49862b-4cf8-4e18-af20-24a348692a10 |                | 98c1cf52-b499-44fc-bcb1-47c1e1fc5872 | 172.16.0.0/16  |
| c51bfa29-134c-4b8e-b1e0-e409a677cd56 |                | 705f009c-06ec-4b44-82c9-8492713f0a1f | 10.0.0.0/24    |
| ca685547-1fe3-41a4-bf5b-ce402f807abd | subred-externa | fcfaba89-33f9-41f8-9971-72ac95435783 | 192.168.0.0/24 |
+--------------------------------------+----------------+--------------------------------------+----------------+

(RedLine)  nazare@ThousandSunny  ~$  openstack router list

+--------------------------------------+-------------------------+--------+-------+----------------------------------+
| ID                                   | Name                    | Status | State | Project                          |
+--------------------------------------+-------------------------+--------+-------+----------------------------------+
| e6dd515b-321f-431d-8a7f-55ce596a142e | routersin               | ACTIVE | UP    | cdb0ff7eeae74b1cbb06e4c476c52889 |
| f3f45b48-ec65-4b7f-9e8e-f8034bff6b99 | router de nazaret.duran | ACTIVE | UP    | cdb0ff7eeae74b1cbb06e4c476c52889 |
+--------------------------------------+-------------------------+--------+-------+----------------------------------+
```


### 3. Cuando crees la instancia maquina-router, accede a ella y comprueba la IP fija que ha tomando. Responde: ¿Has podido añadir una IP flotante a esta nueva instancia? Razona la respuesta.

Como podemos comprobar se ha accedido a la máquina por la IP flotante que se le ha asignado, y si ejecutamos un `ip a` veremos que la IP fija que ha tomado es de la red:  

![Term](/img/SRI+HLC/taller2SRI4-3.png)

Sí que se ha podido asignar una IP flotante a la instancia debido a que la red creada está conectada por medio de un router a la red ext-net, la cual es la encargada de proporcionar las IP flotantes y asignarlas.

![Term](/img/SRI+HLC/taller2SRI4-4.png)


### 4. Comandos OSC para conectar la maquina-router a la red-interna y que tenga la dirección 10.0.100.1.

Lo primera será crear un puerto con la dirección que se le quiere asignar a la máquina:

```bash
openstack port create --network red-interna --fixed-ip ip-address=10.0.100.1 puertesito
```

Para conectar la instancia `maquina-router` añadimos el puerto creado:

```bash
openstack server add port maquina-router puertesito
```

![Term](/img/SRI+HLC/taller2SRI4-5.png)


### 5. Comandos OSC para crear la maquina-cliente con la dirección 10.0.100.200. Responde: ¿Has podido añadir una IP flotante a esta nueva instancia? Razona la respuesta.



### 6. Comandos OSC para deshabilitar la seguridad de los puertos de la red-interna.



### 7. Comprobación de que la maquina-cliente tiene conexión al exterior.



### 8. Comprobación del acceso al servidor web de la maquina-cliente desde el exterior.



## Notas

Para poder acceder al entorno:

* Primero ejecutamos el entorno virtual:

    source RedLine/bin/activate

* Luego dentro ejecutamos:

    source Proyecto\ de\ nazaret.duran-openrc.sh