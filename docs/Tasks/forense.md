---
sidebar_position: 30
---

# Informática Forense


La informática forense es el conjunto de técnicas que nos permite obtener la máxima información posible tras un incidente o delito informático.

En esta práctica, realizarás la fase de toma de evidencias y análisis de las mismas sobre una máquina Linux y otra Windows. Supondremos que pillamos al delincuente in fraganti y las máquinas se encontraban encendidas. Opcionalmente, podéis realizar el análisis de un dispositivo Android.

Sobre cada una de las máquinas debes realizar un volcado de memoria y otro de disco duro, tomando las medidas necesarias para certificar posteriormente la cadena de custodia.


## Apartado A - Máquina Windows

### Volcado de memoria

Para esto tenemos una máquina Linux con Volatility instalado y una máquina Windows con el fichero de volcado de memoria. Para realizar el volcado de memoria descargamos FTK Imager en la máquina windows y hacemos una captura de la memoria. Una vez hecho esto, copiamos el fichero de volcado de memoria a la máquina Linux y lo analizamos con Volatility.
Así se vería el proceso de volcado de memoria con FTK Imager:

![forense](/img/SAD/forenseSAD.png)

### Por comandos

1. Procesos en ejecución.

    python3 vol.py -f "/home/usuario/memdump.mem" windows.pslist

![forense](/img/SAD/forenseSAD-2.png)

2. Servicios en ejecución.

    python3 vol.py -f "/home/usuario/memdump.mem" windows.getservicesids

![forense](/img/SAD/forenseSAD-7.png)

3. Puertos abiertos.

    python3 vol.py -f /home/usuario/memdump.mem windows.netscan
    o
    python3 vol.py -f /home/usuario/memdump.mem windows.netstat

![forense](/img/SAD/forenseSAD-8.png)
![forense](/img/SAD/forenseSAD-10.png)

4. Conexiones establecidas por la máquina.

    python3 vol.py -f /home/usuario/memdump.mem windows.netscan

5. Sesiones de usuario establecidas remotamente.

    python3 vol.py -f /home/usuario/memdump.mem windows.sessions

![forense](/img/SAD/forenseSAD-11.png)

6. Ficheros transferidos recientemente por NetBios.

    python3 vol.py -f /home/usuario/memdump.mem windows.netscan

7. Contenido de la caché DNS.

    python3 vol.py -f /home/usuario/memdump.mem windows.dns_cache

8. Variables de entorno.

    python3 vol.py -f /home/usuario/memdump.mem windows.envars

![forense](/img/SAD/forenseSAD-15.png)

### Volcado de registro

Con ftk imager hacemos una captura del registro de windows usando obtain system files:

![forense](/img/SAD/forenseSAD-17.png)

Descargamos Registry Viewer y abrimos el registro de windows:

IMAGEN


10. Redes wifi utilizadas recientemente.

11. Configuración del firewall de nodo.

12. Programas que se ejecutan en el Inicio.

13. Asociación de extensiones de ficheros y aplicaciones.


### Volcado de disco

En la maquina windows usando la aplicación FTK Imager, hacemos una captura del disco duro:

![forense](/img/SAD/forenseSAD-3.png)
![forense](/img/SAD/forenseSAD-4.png)
![forense](/img/SAD/forenseSAD-5.png)
![forense](/img/SAD/forenseSAD-6.png)
![forense](/img/SAD/forenseSAD-9.png)

Con autopsy analizamos el disco duro:

- Primero creamos un nuevo caso.

- Seleccionamos el tipo en este caso disco:

![forense](/img/SAD/forenseSAD-12.png)

- Así se ve cuando termina de analizar el disco:

![forense](/img/SAD/forenseSAD-13.png)

- Por último, podemos ver los archivos que se han encontrado:

![forense](/img/SAD/forenseSAD-14.png)


### Analizando el Registro de Windows

9. Dispositivos USB conectados

data artifacts > usb device attached

![forense](/img/SAD/forenseSAD-19.png)

14. Aplicaciones usadas recientemente.

disco volcado > summary > user activity

![forense](/img/SAD/forenseSAD-16.png)

15. Ficheros abiertos recientemente.

data artifacts > recent documents

![forense](/img/SAD/forenseSAD-20.png)

16. Software Instalado.

data artifacts > installed programs

![forense](/img/SAD/forenseSAD-21.png)

17. Contraseñas guardadas.

18. Cuentas de Usuario

Tanto 17. como 18. se pueden ver en el apartado de usuarios:

os accounts

![forense](/img/SAD/forenseSAD-22.png)

### Con Aplicaciones de terceros

19. Historial de navegación y descargas. Cookies.

data artifacts > web history

![forense](/img/SAD/forenseSAD-23.png)

data artifacts > web cookies

![forense](/img/SAD/forenseSAD-24.png)

data artifacts > web downloads

![forense](/img/SAD/forenseSAD-25.png)

20. Volúmenes cifrados

analysis results > encryption suspected

![forense](/img/SAD/forenseSAD-26.png)


### Sobre la imagen del disco

21. Archivos con extensión cambiada.

analysis results > extension mismatch detected

![forense](/img/SAD/forenseSAD-27.png)

22. Archivos eliminados.

file views > deleted files

![forense](/img/SAD/forenseSAD-28.png)

23. Archivos Ocultos.

Esto se puede ver en el archivo entrando en file metadata donde veremos la opción de hidden.

24. Archivos que contienen una cadena determinada.

Usando el buscador de ficheros:

![forense](/img/SAD/forenseSAD-29.png)

25. Búsqueda de imágenes por ubicación.

Usando la opción geolocation.

26. Búsqueda de archivos por autor.

data artifacts > metadata

![forense](/img/SAD/forenseSAD-30.png)

## Apartado B - Máquina Linux

### Volcado de memoria

Para esto he descargado Lime desde el repositorio `git clone https://github.com/504ensicsLabs/LiME.git` y he seguido los siguientes pasos:

```bash
uname -r # Para saber la versión del kernel ya que Lime tiene que ser de la misma versión y nos la pedirá más adelante
sudo apt-get install make build-essential linux-headers
cd LiME/src
make
sudo insmod lime-5.10.0-22-amd64.ko "path=/home/usuario/memdumplinux format=lime"
```

Si al hacer la compilación de Lime nos da de error:

```bash
usuario@debian:~/LiME/src$ make
make -C /lib/modules/5.10.0-22-amd64/build M="/home/usuario/LiME/src" modules
make[1]: *** /lib/modules/5.10.0-22-amd64/build: No existe el fichero o el directorio.  Alto.
make: *** [Makefile:35: default] Error 2
```

Tenemos que instalar los headers del kernel:

```bash
sudo apt-get install linux-headers-5.10.0-22-amd64
```

Una vez hecho esto, volvemos a hacer la compilación de Lime y ya no nos dará error.

1. Procesos en ejecución.

    ps -aux

2. Servicios en ejecución.

    systemctl list-units --type=service --state=running

3. Puertos abiertos.

    apt install net-tools
    netstat -tulpn

4. Conexiones establecidas por la máquina.

    netstat -tulpn

5. Sesiones de usuario establecidas remotamente.

    who -a

6. Ficheros transferidos recientemente por NetBios.

    apt install samba -y
    smbstatus
    o
    sudo apt-get install smbclient -y
    smbclient -L localhost 
    o
    smbclient //hostname/sharename -U username -c 'recurse; ls'


7. Contenido de la caché DNS.

    strings /var/cache/nscd/hosts

8. Variables de entorno.

    env

### Volcado de disco

```bash
usuario@debian:~$ sudo mkdir /mnt/linux
usuario@debian:~$ sudo dd if=/dev/vda2 of=/mnt/linux/volcado_linux.001 bs=64K
0+1 registros leídos
0+1 registros escritos
1024 bytes (1,0 kB, 1,0 KiB) copied, 0,00149033 s, 687 kB/s
usuario@debian:~$ 
```

Con autopsy analizamos el disco duro y dará resultados similares a los de la máquina windows.