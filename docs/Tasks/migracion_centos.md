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

**4.- Descarga iso de una de las otras distribuciones candidatas, indica criterios para la elección de la nueva distribución y evalúa el producto.**



**5.- Instala CentOS 7, y evalúa la herramientas que ofrecen la distribución del punto 3.**

