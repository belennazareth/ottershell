---
sidebar_position: 5
---

# Ejercicios gestión de paquetería

## Trabajo con apt, aptitude, dpkg


Prepara una máquina virtual con Debian bullseye, realizar las siguientes acciones:

1. Que acciones consigo al realizar apt update y apt upgrade. Explica detalladamente.

    * apt update: se ejecuta como superusuario, conseguimos actualizar la paquetería disponible además de las versiones, la información que usa se encuentra en el fichero **/etc/apt/sources.list**.

    * apt upgrade: se ejecuta una vez se actualizan los repositorios e instala y actualiza versiones de los paquetes ya instalados.

2. Lista la relación de paquetes que pueden ser actualizados. ¿Qué información puedes sacar a tenor de lo mostrado en el listado?.

Para poder listar los paquetes actualizables se usa el comando **apt list --upgradable**.
Con esto podemos ver el paquete que tiene una versión actualizada en el repositorio y la arquitectura del sistema:

![Repo](/img/ASO/paqueteriaASO.png)

3. Indica la versión instalada, candidata así como la prioridad del paquete openssh-client.

Para esto se ha usado el comando **apt policy**:

![Repo](/img/ASO/paqueteriaASO-2.png)

4. ¿Cómo puedes sacar información de un paquete oficial instalado o que no este instalado?

**apt show**: detalla la información de paquetes pudiendo estar este instalado o no.

Un ejemplo sería:

![Repo](/img/ASO/paqueteriaASO-3.png)

5. Saca toda la información que puedas del paquete openssh-client que tienes actualmente instalado en tu máquina.

Para ver toda la información de este paquete se puede usar **apt-cache showpkg**, este nos da mucha información de las dependencias inversas, versión, descripciones, dependencias...

6. Saca toda la información que puedas del paquete openssh-client candidato a actualizar en tu máquina.

Para sacar toda la información se he usado el comando **aptitude show** donde vemos:

![Repo](/img/ASO/paqueteriaASO-4.png)

7. Lista todo el contenido referente al paquete openssh-client actual de tu máquina. Utiliza para ello tanto dpkg como apt.

* `dpkg -L openssh-client`

* `apt-file list openssh-client`

8. Listar el contenido de un paquete sin la necesidad de instalarlo o descargarlo.

* `apt-file list`

9. Simula la instalación del paquete openssh-client.

* `apt-get install -s openssh-client`
![Repo](/img/ASO/paqueteriaASO-5.png)

10. ¿Qué comando te informa de los posible bugs que presente un determinado paquete?

* `apt-listbugs -s all list`

11. Después de realizar un apt update && apt upgrade. Si quisieras actualizar únicamente los paquetes que tienen de cadena openssh. ¿Qué procedimiento seguirías?. Realiza esta acción, con las estructuras repetitivas que te ofrece bash, así como con el comando xargs.



12. ¿Cómo encontrarías qué paquetes dependen de un paquete específico.



13. ¿Cómo procederías para encontrar el paquete al que pertenece un determinado fichero?

14. ¿Que procedimientos emplearías para liberar la caché en cuanto a descargas de paquetería?

15. Realiza la instalación del paquete keyboard-configuration pasando previamente los valores de los parámetros de configuración como variables de entorno.

16. Reconfigura el paquete locales de tu equipo, añadiendo una localización que no exista previamente. Comprueba a modificar las variables de entorno correspondientes para que la sesión del usuario utilice otra localización.

17. Interrumpe la configuración de un paquete y explica los pasos a dar para continuar la instalación.

18. Explica la instrucción que utilizarías para hacer una actualización completa de todos los paquetes de tu sistema de manera completamente no interactiva

19. Bloquea la actualización de determinados paquetes.

## Trabajo con ficheros .deb

1. Descarga un paquete sin instalarlo, es decir, descarga el fichero .deb correspondiente. Indica diferentes formas de hacerlo.

2. ¿Cómo puedes ver el contenido, que no extraerlo, de lo que se instalará en el sistema de un paquete deb?

3. Sobre el fichero .deb descargado, utiliza el comando ar. ar permite extraer el contenido de una paquete deb. Indica el procedimiento para visualizar con ar el contenido del paquete deb. Con el paquete que has descargado y utilizando el comando ar, descomprime el paquete. ¿Qué información dispones después de la extracción?. Indica la finalidad de lo extraído.

4. Indica el procedimiento para descomprimir lo extraído por ar del punto anterior. ¿Qué información contiene?

## Trabajo con repositorios

1. Añade a tu fichero sources.list los repositorios de bullseye-backports y sid.

2. Configura el sistema APT para que los paquetes de debian bullseye tengan mayor prioridad y por tanto sean los que se instalen por defecto.

3. Configura el sistema APT para que los paquetes de bullseye-backports tengan mayor prioridad que los de unstable.

4. ¿Cómo añades la posibilidad de descargar paquetería de la arquitectura i386 en tu sistema. ¿Que comando has empleado?. Lista arquitecturas no nativas. ¿Cómo procederías para desechar la posibilidad de descargar paquetería de la arquitectura i386?

5. Si quisieras descargar un paquete, ¿cómo puedes saber todas las versiones disponible de dicho paquete?

6. Indica el procedimiento para descargar un paquete del repositorio stable.

7. Indica el procedimiento para descargar un paquete del repositorio de buster-backports.

8. Indica el procedimiento para descargar un paquete del repositorio de sid.

9. Indica el procedimiento para descargar un paquete de arquitectura i386.

## Trabajo con directorios

Que cometidos tienen:

    1. /var/lib/apt/lists/
    2. /var/lib/dpkg/available
    3. /var/lib/dpkg/status
    4. /var/cache/apt/archives/