---
sidebar_position: 14
---


# Gestión de redes en OpenStack

## Procedimientos

1. Crea una nueva red (llamada red-externa) y una subred con DHCP, DNS el 192.168.202.2 y direccionamiento 192.168.0.0/24. Crea un nuevo router. Conecta la nueva red al router, y el router a red pública.

2. Crea una instancia (llamada maquina-router) conectada a la nueva red. Comprueba que la IP fija está en el direccionamiento de la nueva red. ¿Puedes añadirle una IP flotante a la nueva instancia? ¿Por qué?.

3. Crea una nueva red (llamada red-interna) y una subred con DHCP, DNS el 192.168.202.2 y direccionamiento 10.0.100.0/24.

4. Conecta la instancia maquina-router a la nueva red y asígnale la primera dirección: 10.0.100.1.

5. Crea una instancia llamada maquina-cliente conectada a la red red-interna. Usando puertos de red asígnale la dirección 10.0.100.200. Comprueba que su puerta de enlace es la instancia maquina-router. ¿Puedes asignarle a esta instancia una IP flotante? ¿Por qué?.

6. A continuación vamos a configurar la instancia maquina-router para que haga de router-nat. Sin embargo, las restricciones y la seguridad del cortafuegos que tenemos configurado en cada una de las intrefaces de las instancias no van a permitir que funcione de forma adecuada. Por lo tanto, desactiva la seguridad de la interfaz de maquina-router y maquina-cliente conectadas a la red-interna.

7. Configura la instancia maquina-router para que funcione como router-nat. Comprueba que el cliente tiene acceso a internet. Instala un servidor web en el cliente.

8. Accede desde el exterior con un navegador web al servidor web del cliente.

## Entrega

### 1. Los comandos OSC para crear la red `red-externa`.

openstack network create red-externa

### 2. Los comandos OSC y sus salidas, para visualizar las redes que tienes en tu proyecto y los routers.



### 3. Cuando crees la instancia maquina-router, accede a ella y comprueba la IP fija que ha tomando. Responde: ¿Has podido añadir una IP flotante a esta nueva instancia? Razona la respuesta.



### 4. Comandos OSC para conectar la maquina-router a la red-interna y que tenga la dirección 10.0.100.1.



### 5. Comandos OSC para crear la maquina-cliente con la dirección 10.0.100.200. Responde: ¿Has podido añadir una IP flotante a esta nueva instancia? Razona la respuesta.



### 6. Comandos OSC para deshabilitar la seguridad de los puertos de la red-interna.



### 7. Comprobación de que la maquina-cliente tiene conexión al exterior.



### 8. Comprobación del acceso al servidor web de la maquina-cliente desde el exterior.


