---
sidebar_position: 15
---

# Migración CentOS

## Descripción de la actividad


Debido al anuncio del fin de soporte por parte de Red Hat de Centos8 el pasado 31 de diciembre de 2021, y teniendo en cuentas que el fin de vida de centos 7 está programada para el 30 de junio de 2024. Han salido múltiples distribuciones que cubren el hueco dejado por esta distribución tan extendida y tan usada en el ámbito de servidores.

En la presente práctica, analiza posibles versiones candidatas y opciones desplegadas para la migración de tus servidores CentOS.

El espectro es amplio:

\- Cambiar el rumbo a una nueva distribución, debian, opensuse, slakware, etc.

\- Soluciones aportadas por Red Hat: Red Hat Enterprise Linux, CentOS Stream.

\- Solución aportada por Oracle Linux


Nuevas distribuciones surgidas para paliar el hueco dejado:

\- AlmaLinux

\- Rocky Linux

\- VZLinux

\- euroLinux


## Puntos a tratar


### 1.- Analiza el desencadenante de la retirada de centOS 8 del mercado. ¿Qué opinión tienes al respecto?

Según Red Hat, el motivo de la retirada de CentOS 8 es que sintieron la necesidad de innovar en el desarrollo de centos y buscar una estabilidad resolviendo los problemas que se les presentaron en el pasado. 
Además, vieron que reconstruir o clonar lo que ya estaba hecho no era la mejor opción para seguir avanzando. 
Por lo tanto, decicidieron realizar un cambio de recursos e invertir en el desarrollo de CentOS Stream, que es la versión de desarrollo de RHEL 8. Como consecuencia, CentOS 8 no recibirá más actualizaciones de seguridad, ni correcciones de errores, ni actualizaciones de software.


### 2.- Crea una cuenta en Red Hat y descárgate la iso de Red Hat Enterprise Linux (REL) y evalúa el producto. Comenta el procedimiento de alta.

Después de registrarnos en la página de Red Hat, nos descargamos la iso de RHEL y la instalamos en una máquina virtual:

![cent](/img/ASO/centosASO.png)

Instalación:

- Primero aparecerá el siguiente menu donde podremos elegir entre iniciar la instalación, entrar en el modo de recuperación o probar el sistema sin instalarlo:

![cent](/img/ASO/centosASO-2.png)

- Después de seleccionar el idioma, aparece el menú de instalación:

![cent](/img/ASO/centosASO-3.png)

- Rellenamos todos los campos e iniciamos la instalación:

![cent](/img/ASO/centosASO-4.png)

- Al finalizar la instalación, reiniciamos la máquina virtual y entramos en el sistema:

![cent](/img/ASO/centosASO-5.png)
![cent](/img/ASO/centosASO-6.png)

- Entramos en la terminal y ejecutamos, como administrador, el siguiente comando para registrarnos con nuestra cuenta de Red Hat:

    subscription-manager register

![cent](/img/ASO/centosASO-7.png)

- Con esto ya estaríamos registrados y podremos instalar paquetes de Red Hat Enterprise Linux. Actualizamos para poder tener todos los paquetes actualizados:

    yum update

![cent](/img/ASO/centosASO-8.png)

- Podemos comprobar que tenemos acceso a los repositorios de Red Hat Enterprise Linux con el siguiente comando:

    yum repolist

![cent](/img/ASO/centosASO-9.png)

- Podemos instalar paquetes de Red Hat Enterprise Linux con el siguiente comando:

    yum install {paquete}

- Por ejemplo, instalamos el paquete de apache:

    yum install httpd

![cent](/img/ASO/centosASO-10.png)

- Comprobamos que se ha instalado correctamente ejecutando el siguiente comando:

    systemctl status httpd

![cent](/img/ASO/centosASO-11.png)

Con este análisis podemos ver que RHEL es una distribución muy completa y que tiene una gran variedad de paquetes que podemos instalar. Además, podemos instalar paquetes de Red Hat Enterprise Linux que no están disponibles en otras distribuciones.

ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ💫                  💫                     💫                      💫ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ


### 3.- Descarga la iso de CentOS Stream y evalúa el producto.

Lo primero será descargar la iso de CentOS Stream desde la página oficial de [CentOS](https://www.centos.org/centos-stream/), al ejecutar la iso en una máquina virtual, nos aparecerá el siguiente menú:

![cent](/img/ASO/centosASO-12.png)

Después de seleccionar "Install CentOS Stream", nos aparecerá la selección del idioma. Al seleccionar el idioma, nos aparecerá el siguiente menú muy parecido al de RHEL:

![cent](/img/ASO/centosASO-13.png)

Rellenamos todos los campos y comenzamos la instalación:

![cent](/img/ASO/centosASO-14.png)

Al finalizar la instalación, reiniciamos la máquina virtual y entramos en el sistema:

![cent](/img/ASO/centosASO-15.png)

Podemos comprobar la version de centos que tenemos instalada con el siguiente comando:

    cat /etc/centos-release

![cent](/img/ASO/centosASO-16.png)

Actualizamos para poder tener todos los paquetes actualizados:

    yum update

![cent](/img/ASO/centosASO-17.png)

Podemos comprobar que tenemos acceso a los repositorios de CentOS Stream con el siguiente comando:

    yum repolist

![cent](/img/ASO/centosASO-18.png)

Al igual que en RHEL, podemos instalar paquetes de CentOS Stream con el siguiente comando:

    yum install {paquete}

- Por ejemplo, instalamos el paquete de apache:

    yum install httpd

![cent](/img/ASO/centosASO-19.png)

- Comprobamos que se ha instalado correctamente ejecutando el siguiente comando:

    systemctl status httpd

![cent](/img/ASO/centosASO-20.png)

CentOS Stream es una distribución de Linux de código abierto que se basa en RHEL y ofrece actualizaciones de software continuas. Está diseñado para usuarios que desean estar a la vanguardia de las actualizaciones de software.
La ventaja es que se puede utilizarse tanto en servidores como en estaciones de trabajo, y que es compatible con paquetes de software RHEL.
A diferencia de RHEL, CentOs Stream ofrece actualizaciones de software continuas, por lo que no es necesario actualizar la distribución cada cierto tiempo. Además, CentOs Stream no ofrece soporte oficial, mientras que RHEL ofrece soporte técnico y de actualizaciones de seguridad.

### 4.- Descarga la iso de una de las otras distribuciones candidatas, indica criterios para la elección de la nueva distribución y evalúa el producto.

En este caso vamos a descargar la iso `Eurolinux`. `Eurolinux` es una distribución de software libre y de código abierto basada en `RHEL` (Red Hat Enterprise Linux) que está diseñada para ofrecer soporte técnico y actualizaciones de seguridad a largo plazo. La decisión de utilizar Eurolinux como alternativa a otras distribuciones que ya no cuentan con soporte, como CentOS, puede resultar muy beneficioso para las organizaciones, ya que garantiza la continuidad operativa y la seguridad de los sistemas.

La migración de `RHEL` a `Eurolinux` es un proceso relativamente sencillo que no requiere demasiado esfuerzo ni tiempo, y que puede realizarse mediante un script específico proporcionado por `Eurolinux`. Este script se encarga de la migración de los paquetes y datos de la máquina, y asegura la compatibilidad con los paquetes de software de `RHEL`, se recomienda hacer una copia de seguridad de los datos antes de realizar la migración para evitar la pérdida de información en caso de algún error.

Empezamos descargando la iso de `Eurolinux` desde la página oficial de [Eurolinux](https://en.euro-linux.com/eurolinux/download/), al ejecutar la iso en una máquina virtual, nos aparecerá el siguiente menú donde después de rellenar los campos, comenzaremos la instalación:

![cent](/img/ASO/centosASO-21.png)

Pedirá reiniar la máquina virtual para poder entrar en el sistema:

![cent](/img/ASO/centosASO-22.png)

Iniciamos sesión y ejecutamos el comando `cat /etc/redhat-release` para comprobar la versión de Eurolinux que tenemos instalada:

![cent](/img/ASO/centosASO-23.png)

Actualizamos para poder tener todos los paquetes actualizados e instalamos un programa cualquiera para usarlo de ejemplo:

    yum update
    yum install httpd #instalamos apache
    sudo yum install bind-utils #herraienta para hacer consultas DNS

Inicializamos el servicio de apache y comprobamos que se ha instalado correctamente:

    systemctl start httpd
    systemctl status httpd

Vamos a montar un servidor apache sencillo para comprobar que funciona correctamente:

    sudo firewall-cmd --add-service=http --permanent #abrimos el puerto 80
    sudo firewall-cmd --reload #recargamos el firewall

En el navegador ponemos la ip de la máquina virtual y nos aparecerá la página de apache:

![cent](/img/ASO/centosASO-24.png)

Realmente usar `eurolinux` es muy parecido a usar `RHEL`, ya que es una distribución basada en `RHEL` y ofrece soporte técnico y actualizaciones de seguridad a largo plazo. La ventaja de usar `eurolinux` es que es una distribución de código abierto y gratuita, mientras que `RHEL` es de pago.


### 5.- Instala CentOS 7, y evalúa la herramientas que ofrecen la distribución del punto 3.

- Aparecerá el siguiente menú, seleccionamos la opción `Install`:

![cent](/img/ASO/centosASO-25.png)

- Aparecerá la siguiente pantalla donde seleccionamos el idioma y el teclado:

![cent](/img/ASO/centosASO-26.png)
![cent](/img/ASO/centosASO-27.png)

- Después rellenamos los datos del usuario y la contraseña:

![cent](/img/ASO/centosASO-28.png)

- Al terminar de rellenar los datos, comenzará la instalación que pedirá reiniciar la máquina:

![cent](/img/ASO/centosASO-29.png)
![cent](/img/ASO/centosASO-30.png)

- Por último, ejecutamos `cat /etc/redhat-release` para comprobar la versión de `Centos` que tenemos instalada:

![cent](/img/ASO/centosASO-31.png)

Comparando esta distribución con la del punto 3 (Centos Stream) vemos que `CentOS 7` sigue un modelo de lanzamiento fijo tradicional, mientras que `CentOS Stream 9` está basado en un modelo de lanzamiento continuo. En segundo lugar, `CentOS 7` está basado en Red Hat Enterprise Linux 7 y utiliza paquetes más antiguos, `CentOS Stream 9` está basado en Red Hat Enterprise Linux 9 y ofrece paquetes más nuevos. Además, `CentOS 7` ha llegado al final de su vida útil y ya no recibe actualizaciones, en cambio `CentOS Stream 9` es una distribución soportada que recibirá actualizaciones regulares de Red Hat.

#### 5.1.- Migración de CentOS Stream 8 a Rocky Linux

En este punto deberíamos realizar una migración de `Centos 7` a `Centos 8` pero actualmente esto ya no es posible hacerlo ya que no existen repositorios ni isos de `Centos 8`. Por lo tanto, vamos a realizar una migración de `Centos Stream` (instalado en el punto 3) a `Rocky Linux`.

Ahora vamos a proceder con la migración de `Centos Stream 8` a `Rocky Linux`. Para ello, vamos a seguir estos pasos:

- Actualizamos los paquetes de `Centos Stream` y reiniciamos la máquina:

    sudo dnf update -y
    sudo reboot

- Clonamos el repositorio de migración preparado de `Rocky Linux`:

    curl https://raw.githubusercontent.com/rocky-linux/rocky-tools/main/migrate2rocky/migrate2rocky.sh -o migrate2rocky.sh

- Y le cambiamos los permisos para poder ejecutarlo:

    chmod +x migrate2rocky.sh

- Como administrador, ejecutamos el script de migración:

    sudo ./migrate2rocky.sh -r

![cent](/img/ASO/centosASO-36.png)
![cent](/img/ASO/centosASO-37.png)

- Una vez terminado el proceso, reiniciamos la máquina:

    sudo reboot

- Y comprobamos que se ha migrado correctamente:

    cat /etc/redhat-release

![cent](/img/ASO/centosASO-38.png)

Si nos paramos a analizar el script de migración, vemos que lo que hace es cambiar los repositorios de `Centos Stream` por los de `Rocky Linux` y después actualiza los paquetes.
Tenemos varios parámetros que podemos usar con el script de migración:

- `-r` para migrar a `Rocky Linux` aceptando todos los cambios.
- `-h` para mostrar la ayuda:
```sh
Usage: migrate2rocky.sh [OPTIONS]

Options:
-h Display this help
-r Convert to rocky
-V Verify switch
   !! USE WITH CAUTION !!
```
- `-V` para verificar los cambios que se van a realizar.

También vemos que se aplican unos requisitos de espacio para poder migrar a `Rocky Linux`:

```sh
/usr   250M
/var   1.5G
/boot  50M
```

Hay que tener en cuenta que NO se puede cerrar la terminal mientras se está ejecutando el script de migración, ya que si se cierra la terminal, se cancelará la migración y se quedará el sistema en un estado inestable. 

Si queremos migrar desde máquinas EL que no estan actualizadas hasta la versión 8.0 hay que ejecutar un update antes y cambiar manualmente los repositorios a los de `Rocky Linux`:

```sh
sed -i -r \
    -e 's!^mirrorlist=!#mirrorlist=!' \
    -e 's!^#?baseurl=http://(mirror|vault).centos.org/\$contentdir/\$releasever/!baseurl=https://dl.rockylinux.org/vault/centos/8.5.2111/!i' \
    /etc/yum.repos.d/CentOS-*.repo
```

El script lanza mensajes de error que son repositorios en conflicto que no se pueden migrar, por lo que se encarga de eliminarlos e instalar la rocky-release.


#### Instalación de una máquina Rocky Linux manualmente

- Descargamos la iso de `Rocky Linux` desde la página oficial de [Rocky Linux](https://rockylinux.org/download/), al ejecutar la iso en una máquina virtual, nos aparecerá el siguiente menú:

![cent](/img/ASO/centosASO-32.png)

- Seleccionamos el idioma y el teclado, y después tendremos que rellenar los datos:

![cent](/img/ASO/centosASO-33.png)

- Al terminar de rellenar los datos, comenzará la instalación que pedirá reiniciar la máquina:

![cent](/img/ASO/centosASO-34.png)

- Por último, ejecutamos `cat /etc/redhat-release` para comprobar la versión de `Rocky Linux` que tenemos instalada:

![cent](/img/ASO/centosASO-35.png)
