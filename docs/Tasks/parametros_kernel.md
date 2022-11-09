---
sidebar_position: 12
---

# Ejercicios de modificación de parámetros del kérnel


### 1. Deshabilita apparmor en el arranque.

**Apparmor** es un sistema encargado de controlar el acceso a la máquina, es decir, se encarga de comprobar que cada proceso esta autorizado una operación otorgando así a cada programa un uso limitado de los recursos.

La información de este paquete se guardan en `/etc/apparmor.d`.

Para deshabilitar `apparmor` podemos seguir dos procedimientos diferentes:

* Editar el fichero `/etc/default/grub` añadiendo la línea:

        GRUB_CMDLINE_LINUX_DEFAULT="$GRUB_CDMLINE_LINUX_DEFAULT apparmor=0"

* Con el comando `systemctl` deshabilitando desde la línea de comandos:

        systemctl disable apparmor

Al reiniciar la máquina, si comprobamos el estado de `apparmor` se puede ver:

![Term](/img/ASO/parmkernelASO.png)


### 2. Deshabilita si es posible el Kernel Mode Setting (KSM) de la tarjeta gráfica.



### 3. Cambia provisionalmente la swappiness para que la swap de tu equipo se active cuando se use más de un 90% de la RAM.

Para cambiar provisionalmente se puede usar el comando `sysctl vm.swappiness=10`, esto hará que de forma temporal se use `swappiness` cuando se esté usando más de un 90% de la RAM.
Los valores son inversos por lo que hay que tener cuidado al modificarlo, de tal manera que si dejamos la swappiness en un valor muy bajo se utilizará únicamente cuando nuestra memoria RAM esté a punto de agotarse, como es nuestro caso. Si se establece la swappiness en valores superiores se irá incrementando el uso de la memoria virtual, por ejemplo en caso de usar 100 la memoria virtual se usará todo el tiempo.

![Term](/img/ASO/parmkernelASO-2.png)

Para que se ejecuten los cambios no es neccesario el reinicio, se aplican de inmediato. Si se reinicia la máquina volverá a su valor por defecto, 60.


### 4. Haz que el cambio de la swappiness sea permanente.

Para que sea permanente será necesario editar el fichero `/etc/sysctl.conf` añadiendo la línea: 

    vm.swappiness=10


### 5. Muestra el valor del bit de forward para IPv6.

Para mostrarlo se usa el comando `sysctl` de la siguiente manera:

        sudo sysctl -a | grep net.ipv6.conf.all.forwarding

![Term](/img/ASO/parmkernelASO-3.png)


### 6. Deshabilita completamente las Magic Sysrq en el arranque y vuelve a habilitarlas después de reiniciar.

**Magic Sysrq** es una combinación de teclas que puede presionar a la que el núcleo responderá independientemente de lo que esté haciendo, a menos que esté completamente bloqueado, realizando un reinicio del sistema.

Para saber si se encuentra activo podemos ver el fichero `/proc/sys/kernel/sysrq`, en este podremos ver alguno de los siguientes valores, entre otros:

* 0 → deshabilitar sysrq por completo

* 1 → habilitar todas las funciones de sysrq

* 438 → permite todas las funciones excepto la posibilidad de enviar señales a procesos.

Para deshabilitarla realizamos el siguiente comando:

        echo 0 >/proc/sys/kernel/sysrq

