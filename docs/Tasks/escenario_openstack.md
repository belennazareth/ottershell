---
sidebar_position: 15
---


# Escenario en OpenStack

## Procedimientos

En esta tarea se va a crear el escenario de trabajo que se va a usar durante todo el curso, que va a constar inicialmente de 4 máquinas: 2 instancias en OpenStack y dos contenedores LXC que se ejecutarán en una de las instancias.

Para nombrar las máquinas se va a utilizar alfa, bravo, charlie y delta, que son las primeras letras de un alfabeto que nació antes de la Primera Guerra Mundial en respuesta a los avances en la radio bidireccional compatible con la voz, para mejorar la comunicación en circuitos telefónicos de baja calidad y de larga distancia.

Además el dominio será un subdominio de la forma tunombre.gonzalonazareno.org. De esta forma tendremos:

* Máquina 1: Instancia en OpenStack con Debian 11 Bullseye que se llama alfa.tunombre.gonzalonazareno.org.


* Máquina 2: Instancia en OpenStack con Rocky Linux 9 que se llama bravo.tunombre.gonzalonazareno.org.


* Máquina 3: Contenedor LXC con Ubuntu 20.04 que se llama charlie.tunombre.gonzalonazareno.org.


* Máquina 4: Contenedor LXC con Ubuntu 20.04 que se llama delta.tunombre.gonzalonazareno.org.


La creación y configuración (conexión a las redes, creación de volumen, quitarle la seguridad alos puertos, …) de la máquina1 (alfa) la debes hacer con OSC. Lo demás lo puedes hacer con horizon.



### Instalación de las instancias de OpenStack

1. Crea una red interna que se llame Red DMZ de tu_usuario, con las siguientes características:

* Direccionamiento: 172.16.0.0/16

* Con DHCP y DNS (192.168.202.2).

* La puerta de enlace de los dispositivos conectados a esta red será el 172.16.0.1.


2. Las dos instancias que vamos a crear se van a configurar con cloud-init de la siguiente manera:

* Deben actualizar los paquetes de la distribución de la instancia.

* El dominio utilizado será del tipo tunombre.gonzalonazareno.org. Por lo tanto en la configuración con cloud-init habrá que indicar el hostname y el FQDN.

* Se crearán dos usuarios:

    * Un usuario sin privilegios. Se puede llamar como quieras (pero el nombre será el mismo en todas las máquinas) y accederás a las máquinas usando tu clave ssh privada.

    * Un usuario profesor, que puede utilizar sudo sin contraseña. Copia de las claves públicas de todos los profesores en las instancias para que puedan acceder con el usuario profesor.

* Cambia la contraseña al usuario root.


3. Creación de la máquina1 (alfa):

* Crea una instancia sobre un volumen de 30Gb, usando una imagen de Debian 11 Bullseye. Elige el sabor vol.medium. Y configuralá con cloud-init como se ha indicado anteriormente.

* Está instancia estará conectada a tu red interna. Asigna a la instancia una IP flotante.

Desde línea de comandos montamos el escenario mandándole el fichero de configuración cloud-config.yaml:

```bash
 openstack server create --flavor vol.medium \
 --image "Debian 11 Bullseye" \
 --security-group default \
 --key-name nazareth_local \
 --network "red de nazaret.duran" \
 --user-data cloud-config.yaml
 alfa.nazareth
```

El fichero cloud-config.yaml es el siguiente:

```yaml

#cloud-config

# Actualizar los paquetes de la distribución

package_update: true
package_upgrade: true

# hostname y FQDN

hostname: alfa
fqdn: alfa.nazareth.gonzalonazareno.org

# Crear usuarios

users:

# Usuario sin privilegios

   - name: nazare
   - sudo: ALL=(ALL) NOPASSWD:ALL
   - shell: /bin/bash
   - passwd: nazare
   - ssh_authorized_keys:
       - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC73j7AidXdLgiu5wJw7YgJuvOHyb6U8c04MuQyehYnMknMR8mTnWZr20npVHJ8VHYHDy8RlgbkMMBFgeVCgXJ+Im3A6Efp6HC4yj2SM+73hr1EKCLdRPzCzdtDSUtkqU9k+x2RdF3T6qD6H4Cg/nT8Sg3Qenqds4XORfDWOvntxFja2D0OhZv1MLPUD9pEj+a8D4erfiPx/gKW/Rtu89une+uiwVgK60B5CxnC8XXnXmPO3NhrgyQhVgzQZ658cUbLooxQURVlo1gnOmcqX5h+svUKN1SDbzTyy7HKSk7bbLHEhk7qDh7jSzcf80GLU0li8vXc2to8NpC00EOQ9POPivESz23gMNY8ooDtNU3Ll/xYvhtvXrJNTbuBiuVLzuopMvrQi6LVsQEWmPJzBiJ2qt8JW1KRLcnWRL4AezbxAPXuRYVnYBS3it6L0J4AZjZg63BkIIrfU7GYzrKb+z5mqUgDJhIZ4d5av+OAxPSSzNeVnyWEnWrI0k9kf9qmqhU= nazare@ThousandSunny

# Usuario profesor

   - name: profesor
   - sudo: ALL=(ALL) ALL:ALL
   - shell: /bin/bash
   - passwd: profesor
   - ssh_authorized_keys:
       - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCmjoVIoZCx4QFXvljqozXGqxxlSvO7V2aizqyPgMfGqnyl0J9YXo6zrcWYwyWMnMdRdwYZgHqfiiFCUn2QDm6ZuzC4Lcx0K3ZwO2lgL4XaATykVLneHR1ib6RNroFcClN69cxWsdwQW6dpjpiBDXf8m6/qxVP3EHwUTsP8XaOV7WkcCAqfYAMvpWLISqYme6e+6ZGJUIPkDTxavu5JTagDLwY+py1WB53eoDWsG99gmvyit2O1Eo+jRWN+mgRHIxJTrFtLS6o4iWeshPZ6LvCZ/Pum12Oj4B4bjGSHzrKjHZgTwhVJ/LDq3v71/PP4zaI3gVB9ZalemSxqomgbTlnT jose@debian

# Contraseña al usuario root

chpasswd:
   list: |
       root:root
   expire: False

```

4. Configuración de la máquina1 (alfa):

* Conecta la instancia a tu Red DMZ, asígnale la dirección 172.16.0.1 para que sea la puerta de enlace las máquinas conectadas a esta red.

* Deshabilita la seguridad de los puertos en las dos interfaces de red para que funcione de manera adecuada el NAT.

* Configura de forma permanente la regla SNAT para que las máquinas de la Red DMZ tengan acceso a internet.


5. Creación de la máquina2 (bravo):

* Está instancia se conectará a la red DMZ. Usando un puerto asigna a esta máquina la dirección 172.16.0.200.

* Crea una instancia sobre un vollumen de 30Gb, usando una imagen de Rocky Linux 9. Elige el sabor vol.normal. Y configuralá con cloud-init como se ha indicado anteriormente.

* Deshabilita la seguridad de los puertos en la interfaz de red para que funcione de manera adecuada el NAT.

* Comprueba que tiene acceso a internet. Si no tiene acceso a internet, no se han actualizado los paquetes con cloud-init, hazlo posteriormente..



### Instalación de los contenedores 

En maquina1 vamos a crear dos contenedores en un red interna, para ello:

1. Crea en máquina1 (alfa) un linux bridge llamado br-intra y asigna una dirección IP estática 192.168.0.1. Esta será la IP de máquina1 (alfa) conectada a este switch virtual y será la puerta de enlace de los contenedores.


2. Instala LXC y crea dos contenedores con la distribución Ubuntu 20.04. Estos contenedores serán la máquina3 (charlie) y la máquina4 (delta).


3. Configura de forma permanente la regla SNAT para que los contenedores tengan acceso a internet.


4. Conecta los contenedores al bridge br-intra y configúralo de forma estática con las siguientes direcciones: máquina3 (charlie) la 192.168.0.2 y máquina4 (delta) la 192.168.0.3.


5. Para que la red de OpenStack funcione de forma adecuada las imágenes que usamos tienen configurado la mtu (Unidad máxima de transferencia) a 1450 bytes. Tenemos que adecuar los contenedores a este tamaño de trama. Para ello introduce en la configuración de los contenedores la línea: lxc.net.0.mtu = 1450.


6. Configura los contenedores para que se auto inicien al reiniciar la instancia.


7. Los contenedores tendrán características parecidas a las instancias anteriormente:

* Debes actualizar los paquetes de la distribución instalada.

* El dominio utilizado será del tipo tunombre.gonzalonazareno.org. Por lo tanto configura de manera adecuda el hostname y el FQDN.

* Para acceder a los contenedores vamos a usar ssh.

* Crea dos usuarios:

    * Un usuario sin privilegios. Se puede llamar como quieras (el nombre de usuario que usaste en las instancias) y accederás a los contenedores usando tu clave ssh privada.

    * Un usuario profesor, que puede utilizar sudo sin contraseña. Copia de las claves públicas de todos los profesores en los contenedores para que puedan acceder con el usuario profesor.

* Cambia la contraseña al usuario root.



## Entrega

### 1. Las instrucciones para crear y configurar la máquina1 (alfa).


 

### 2. El fichero cloud-config.yaml para crear la máquina1 (alfa).



### 3. La Ip flotante de la máquina1 (alfa).



### 4. Prueba de funcionamiento de qué los FQDN están bien configurados.



### 5. Prueba de funcionamiento de que se pueden acceder a todas las máquinas por ssh.



### 6. Prueba de funcionamiento de que las máquinas tienen acceso a internet.

