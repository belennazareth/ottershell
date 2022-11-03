---
sidebar_position: 7
---

# Ejercicios de manejo de módulos


## 1. Comprueba los módulos cargados en tu equipo.

Los módulos del kernel se almacenan en el fichero `/lib/modules/[versión]` con la terminación `.ko` (kernel object), se pueden ver con el comando ` ls -R /lib/modules/$(uname -r)`, donde `uname -r` hace la función de variable que nos muestra la versión de kernel de nuestro sistema. 
Sin embargo, para comprobar los módulos **cargados** en el equipo podemos visualizar el fichero `/proc/modules` (fichero que usa `lsmod`) donde aparece la información dividida en tres columnas:

* Module: Muestra los nombres de los módulos cargados.
* Size: Muestra el tamaño que ocupa cada módulo.
* Used: Indica si se está usando un módulo por otros módulos.

Además, podemos usar el comando `lsmod` para ver todos los módulos desde línea de comando:

```

nazare@ThousandSunny:~$ lsmod

Module                  Size  Used by
ctr                    16384  3
ccm                    20480  9
rfcomm                 94208  4
xt_CHECKSUM            16384  1
xt_MASQUERADE          20480  3
nft_chain_nat          16384  2
nf_nat                 57344  2 nft_chain_nat,xt_MASQUERADE
bridge                258048  0
stp                    16384  1 bridge
llc                    16384  2 bridge,stp
cmac                   16384  3
algif_hash             16384  1
algif_skcipher         16384  1
af_alg                 32768  6 algif_hash,algif_skcipher
bnep                   28672  2
btusb                  65536  0
btrtl                  28672  1 btusb
btbcm                  20480  1 btusb
btintel                32768  1 btusb
bluetooth             749568  33 btrtl,btintel,btbcm,bnep,btusb,rfcomm
...
```

Se puede filtrar la información usando el comando `grep`, con esto se consigue de forma más eficiente un resultado más específico:

```

nazare@ThousandSunny:~$ lsmod | grep "bluetooth"
bluetooth             749568  33 btrtl,btintel,btbcm,bnep,btusb,rfcomm
ecdh_generic           16384  2 bluetooth
crc16                  16384  1 bluetooth
libaes                 16384  3 bluetooth,aesni_intel,aes_generic
rfkill                 32768  8 bluetooth,ideapad_laptop,cfg80211

```


## 2. Cuenta el número de módulos disponibles en el núcleo que estás usando.

Para contar el número de módulos disponibles se usa el comando:

```find  /lib/modules/$(uname -r) -type f -iname '*.ko' | wc -l```

Con esto se ejecuta una búsqueda con `find` filtada por todos los terminados en `.ko` contándolo con `wc`.


## 3. Conecta un lápiz USB y observa la salida de la instrucción sudo dmesg.

Con el comando `sudo dmesg` y el parámetro `-w` se puede ver de forma dinámica los mensajes de diagnóstico, como podemos ver en la siguiente imagen aparece la detección de un USB y toda la información recopilada de las características del dispositivo USB:

![Term](/img/ASO/modulosASO.png)


## 4. Elimina el módulo correspondiente a algún dispotivo no esencial y comprueba qué ocurre. Vuelve a cargarlo.

En mi caso he elegido el módulo correspondiente al wifi, para poder saber la etiqueta del módulo he realizado un `dmesg -wH` obteniendo:

![Term](/img/ASO/modulosASO-2.png)

Para deshabilitar el módulo wifi:

```sudo modprobe -r rtw88_8822ce```

Como podemos comprobar con el comando `dmesg` se ha realizado correctamente:

![Term](/img/ASO/modulosASO-3.png)

Y aquí lo comprobamos gráficamente:

![Term](/img/ASO/modulosASO-4.png)

A continuación, para volver a activarlo:

```sudo modprobe rtw88_8822ce```

La salida de `dmesg`:

![Term](/img/ASO/modulosASO-5.png)

Activación y conexión a la red wifi:

![Term](/img/ASO/modulosASO-6.png)

Comprobación en el entorno gráfico:

![Term](/img/ASO/modulosASO-7.png)


## 5. Selecciona un módulo que esté en uso en tu equipo y configura el arranque para que no se cargue automáticamente.



## 6. Carga el módulo loop, obtén información de qué es y para qué sirve. Lista el contenido de /sys/modules/loop/parameters y configura el equipo para que se puedan cargar como máximo 12 dispositvos loop la próxima vez que se arranque.


