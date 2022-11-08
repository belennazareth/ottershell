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



### 4. Haz que el cambio de la swappiness sea permanente.



### 5. Muestra el valor del bit de forward para IPv6.



### 6. Deshabilita completamente las Magic Sysrq en el arranque y vuelve a habilitarlas después de reiniciar.


