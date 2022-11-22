---
sidebar_position: 14
---

# Compilación de un Kernel linux a medida

Para empezar a compilar el kernel debemos crear un directorio donde trabajaremos, y además, saber cual es la versión de nuestra máquina. 
Creamos el directorio con `mkdir kernel` y comprobamos la versión con `uname -r`.

Es necesario instalar la paquetería que contiene el compilador en C, make y herramientas que nos permitan modificar la configuración, para ello instalamos:

    apt install linux-source build-essentials qtbase5-dev

Una vez lo tenemos todo, dentro del directorio `kernel`, se descomprime el fichero `.tar.xz` del kernel descargado de la siguiente [url](https://www.kernel.org/):

    tar xf ~/Descargas/linux-6.0.9.tar.xz

Listamos el contenido del directorio resultado de la compresión:

     nazare@ThousandSunny  ~/kernel$ ls linux-6.0.9
     arch     CREDITS        fs        ipc      lib          mm       scripts   usr
     block    crypto         include   Kbuild   LICENSES     net      security  virt
     certs    Documentation  init      Kconfig  MAINTAINERS  README   sound
     COPYING  drivers        io_uring  kernel   Makefile     samples  tools


Podemos comprobar con el comando `du -sh` el tamaño del directorio:

     nazare@ThousandSunny  ~/kernel$ du -sh linux-6.0.9 
     1,4G	linux-6.0.9
             

Dentro del directorio podemos usar el comando `make help`, este nos aportará ayuda dando información de las diferentes opciones que se pueden usar en la compilación.

Acto seguido realizamos `make oldconfig`, el cual lee o compara el archivo de configuración antiguo. Este nos realizará varias preguntas donde nos dice las opciones que hay por defecto y si queremos o no mantenerlas en el **.config**.

Después realizaremos `make localyesconfig`, con esto solo configura los módulos en uso en el momento de la creación del fichero de configuración convirtiendo los módulos dinámicos en estáticos. Se pueden comprobar los componentes estáticos y dinámicos con los comandos: 

    egrep '=y' .config | wc -l

    egrep '=m' .config | wc -l

En principio cuenta con:

    nazare@ThousandSunny  ~/kernel/linux-6.0.9$ egrep '=y' .config | wc -l
    1930
    nazare@ThousandSunny  ~/kernel/linux-6.0.9$ egrep '=m' .config | wc -l
    3


Se realiza una primera compilación de prueba para asegurar su funcionamiento, con esto vemos en este caso la falta de un paquete:

```bash
 
 nazare@ThousandSunny  ~/kernel/linux-6.0.9$ time make -j $(nproc) bindeb-pkg
  SYNC    include/config/auto.conf.cmd
  UPD     include/config/kernel.release
sh ./scripts/package/mkdebian
dpkg-buildpackage -r"fakeroot -u" -a$(cat debian/arch)  -b -nc -uc
dpkg-buildpackage: información: paquete fuente linux-upstream
dpkg-buildpackage: información: versión de las fuentes 6.0.9-1
dpkg-buildpackage: información: distribución de las fuentes bullseye
dpkg-buildpackage: información: fuentes modificadas por nazare <nazare@ThousandSunny>
dpkg-buildpackage: información: arquitectura del sistema amd64
 dpkg-source --before-build .
dpkg-checkbuilddeps: fallo: Unmet build dependencies: libelf-dev:native
dpkg-buildpackage: aviso: Las dependencias y conflictos de construcción no están satisfechas, interrumpiendo
dpkg-buildpackage: aviso: (Use la opción «-d» para anularlo.)
make[1]: *** [scripts/Makefile.package:83: bindeb-pkg] Error 3
make: *** [Makefile:1558: bindeb-pkg] Error 2
make -j $(nproc) bindeb-pkg  1,51s user 0,53s system 99% cpu 2,050 total

```

Por lo que solo habría que instalarlo:

    sudo apt install libelf-dev

Lo siguiente será volver a ejecutar la compilación:

    time make -j $(nproc) bindeb-pkg

Tras realizar la compilación aparecen en el directorio `kernel` los ficheros `.deb` generados, para llevar un orden se edita el **Makefile** añadiendo `EXTRAVERSION = -v1
`:

```Bash
nazare@ThousandSunny  ~/kernel$ ls -la
total 24728
drwxr-xr-x  3 nazare nazare      259 nov 16 23:42 .
drwxr-xr-x 30 nazare nazare     4096 nov 17 00:20 ..
-rw-r--r--  1 nazare nazare   203668 nov 16 23:09 1.config
drwxr-xr-x 26 nazare nazare     4096 nov 17 00:10 linux-6.0.9
-rw-r--r--  1 nazare nazare  8561460 nov 16 23:42 linux-headers-6.0.9_6.0.9-1_amd64.deb
-rw-r--r--  1 nazare nazare 15260368 nov 16 23:42 linux-image-6.0.9_6.0.9-1_amd64.deb
-rw-r--r--  1 nazare nazare  1266496 nov 16 23:42 linux-libc-dev_6.0.9-1_amd64.deb
-rw-r--r--  1 nazare nazare     5218 nov 16 23:42 linux-upstream_6.0.9-1_amd64.buildinfo
-rw-r--r--  1 nazare nazare     1774 nov 16 23:42 linux-upstream_6.0.9-1_amd64.changes
```

Siempre que queramos realizar la instalación se usará el comando:

    sudo dpkg -i linux-image...

Y para desinstalar:

    sudo dpkg -P linux-image...

Hay que eliminarlo del GRUB ejecutando el comando `update-grub`.

Tras esta prueba se va a ir editando el fichero **.config**, por lo que va a ser necesario mantener una copia del original la cual se ha guardado en el directorio `kernel`.
Para editar **.config** se usa el comando `make xconfig` con el que se nos abrirá una ventana como la siguiente donde podremos seleccionar los módulos que queramos dejar estáticos (✓), dinámicos (·) o directamente sin marcar que no se añadirán a la compilación:

![Repo](/img/ASO/compkernelASO-2.png)

Se vuelven a comprobar los módulos:

    nazare@ThousandSunny  ~/kernel/linux-6.0.9$ egrep '=y' .config | wc -l
    1865
    nazare@ThousandSunny  ~/kernel/linux-6.0.9$ egrep '=m' .config | wc -l
    26

Una vez editado se realiza la compilación y la instalación del nuevo kernel, desde el GRUB seleccionamos el nuevo kernel (aunque por defecto se inicia en la primera opción al encender la máquina). Al entrar, abrimos una terminal y se comprueba la ejecución del comando `lsmod`,  la versión con `uname -r` y el funcionamiento de la red con un `ping`:

![Repo](/img/ASO/compkernelASO.png)

Volvemos a nuestro kernel y en caso de querer seguir reduciendo se vuelve a repetir el proceso. Hay que tener en cuenta que despues de cada compilación hay que realizar un `make clean`.

Comprobamos el tamaño del fichero `.deb`:

    nazare@ThousandSunny  ~/kernel$ ls -lh | egrep linux-image-6.0.9-v2
    -rw-r--r--  1 nazare nazare  15M nov 17 02:08 linux-image-6.0.9-v2_6.0.9-v2-4_amd64.deb

### Ficheros .config

Pincha [aquí](https://github.com/belennazareth/2ASIR/tree/main/ASO/compilacion_kernel) para ver los ficheros **.config**.