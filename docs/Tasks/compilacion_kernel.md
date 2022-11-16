---
sidebar_position: 14
---

# Compilación de un Kernel linux a medida

Para empezar a compilar el kernel debemos crear un directorio donde trabajaremos, y además, saber cual es la versión de nuestra máquina. 
Creamos el directorio con `mkdir kernel` y comprobamos la versión con `uname -r`.

Es necesario instalar la paquetería que contiene el compilador en C, make y herramientas que nos permitan modificar la configuración, para ello instalamos:

    apt install linux-source build-essentials qtbase5-dev

Una vez lo tenemos todo, dentro del directorio `kernel`, se descomprime el fichero `.tar.xz` del kernel alojado en la ruta `/usr/src` de tal modo que resulta:

    tar xf /usr/src/linux-source-5.10.tar.xz

Listamos el contenido del directorio resultado de la compresión:

     nazare@ThousandSunny  ~/kernel/linux-source-5.10$ ls
        arch     CREDITS        fs       Kbuild   LICENSES     net      security  virt
        block    crypto         include  Kconfig  MAINTAINERS  README   sound
        certs    Documentation  init     kernel   Makefile     samples  tools
        COPYING  drivers        ipc      lib      mm           scripts  usr

Podemos comprobar con el comando `du -sh` el tamaño del directorio:

     nazare@ThousandSunny  ~/kernel/linux-source-5.10  du -sh              
        1,1G	.

Dentro del directorio podemos usar el comando `make help`, este nos aportará ayuda dando información de las diferentes opciones que se pueden usar en la compilación.

A continuación, copiamos nuestro fichero `/boot/config-5.10.0-19-amd64` el cual hará de fichero de configuración **.config** conteniendo la información sobre los componentes que se van a enlazar de forma estática, dinámica y los que directamente no se van a enlazar:

     cp /boot/config-5.10.0-19-amd64 .config

Acto seguido realizamos `make oldconfig`, el cual lee o compara el archivo de configuración antiguo. Copiando directamente nuestro fichero de configuración evitamos tener que responder a todas las preguntas que lanza el comando, ya que compara trasladando la configuración al nuevo kernel. 
Con esto ya tendríamos una configuración sobreescrita en el fichero **.config**.



