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

6. Ficheros transferidos recientemente por NetBios.

7. Contenido de la caché DNS.

8. Variables de entorno.


### Volcado de disco

En la maquina windows usando la aplicación FTK Imager, hacemos una captura del disco duro:

![forense](/img/SAD/forenseSAD-3.png)
![forense](/img/SAD/forenseSAD-4.png)
![forense](/img/SAD/forenseSAD-5.png)
![forense](/img/SAD/forenseSAD-6.png)
![forense](/img/SAD/forenseSAD-9.png)



### Volcado de registro



### Analizando el Registro de Windows

9. Dispositivos USB conectados

10. Redes wifi utilizadas recientemente.

11. Configuración del firewall de nodo.

12. Programas que se ejecutan en el Inicio.

13. Asociación de extensiones de ficheros y aplicaciones.

14. Aplicaciones usadas recientemente.

15. Ficheros abiertos recientemente.

16. Software Instalado.

17. Contraseñas guardadas.

18. Cuentas de Usuario

### Con Aplicaciones de terceros

19. Historial de navegación y descargas. Cookies.

20. Volúmenes cifrados

### Sobre la imagen del disco

21. Archivos con extensión cambiada.

22. Archivos eliminados.

23. Archivos Ocultos.

24. Archivos que contienen una cadena determinada.

25. Búsqueda de imágenes por ubicación.

26. Búsqueda de archivos por autor.





## Apartado B - Máquina Linux

