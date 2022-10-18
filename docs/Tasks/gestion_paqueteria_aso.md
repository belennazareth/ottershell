---
sidebar_position: 5
---

# Ejercicios gestión de paquetería

## Trabajo con apt, aptitude, dpkg

Prepara una máquina virtual con Debian bullseye, realizar las siguientes acciones:

1. Que acciones consigo al realizar apt update y apt upgrade. Explica detalladamente.

2. Lista la relación de paquetes que pueden ser actualizados. ¿Qué información puedes sacar a tenor de lo mostrado en el listado?.

3. Indica la versión instalada, candidata así como la prioridad del paquete openssh-client.

4. ¿Cómo puedes sacar información de un paquete oficial instalado o que no este instalado?

5. Saca toda la información que puedas del paquete openssh-client que tienes actualmente instalado en tu máquina.

6. Saca toda la información que puedas del paquete openssh-client candidato a actualizar en tu máquina.

7. Lista todo el contenido referente al paquete openssh-client actual de tu máquina. Utiliza para ello tanto dpkg como apt.

8. Listar el contenido de un paquete sin la necesidad de instalarlo o descargarlo.

9. Simula la instalación del paquete openssh-client.

10. ¿Qué comando te informa de los posible bugs que presente un determinado paquete?

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

Descarga un paquete sin instalarlo, es decir, descarga el fichero .deb correspondiente. Indica diferentes formas de hacerlo.

¿Cómo puedes ver el contenido, que no extraerlo, de lo que se instalará en el sistema de un paquete deb?

Sobre el fichero .deb descargado, utiliza el comando ar. ar permite extraer el contenido de una paquete deb. Indica el procedimiento para visualizar con ar el contenido del paquete deb. Con el paquete que has descargado y utilizando el comando ar, descomprime el paquete. ¿Qué información dispones después de la extracción?. Indica la finalidad de lo extraído.

Indica el procedimiento para descomprimir lo extraído por ar del punto anterior. ¿Qué información contiene?

Trabajo con repositorios
Añade a tu fichero sources.list los repositorios de bullseye-backports y sid.

Configura el sistema APT para que los paquetes de debian bullseye tengan mayor prioridad y por tanto sean los que se instalen por defecto.

Configura el sistema APT para que los paquetes de bullseye-backports tengan mayor prioridad que los de unstable.

¿Cómo añades la posibilidad de descargar paquetería de la arquitectura i386 en tu sistema. ¿Que comando has empleado?. Lista arquitecturas no nativas. ¿Cómo procederías para desechar la posibilidad de descargar paquetería de la arquitectura i386?

Si quisieras descargar un paquete, ¿cómo puedes saber todas las versiones disponible de dicho paquete?

Indica el procedimiento para descargar un paquete del repositorio stable.

Indica el procedimiento para descargar un paquete del repositorio de buster-backports.

Indica el procedimiento para descargar un paquete del repositorio de sid.

Indica el procedimiento para descargar un paquete de arquitectura i386.

Trabajo con directorios
Que cometidos tienen:

/var/lib/apt/lists/
/var/lib/dpkg/available
/var/lib/dpkg/status
/var/cache/apt/archives/