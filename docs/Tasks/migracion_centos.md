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

- Al finalizar la instalación, nos pedirá que creemos un usuario:



**3.- Descarga la iso de CentOS Stream y evalúa el producto.**



**4.- Descarga iso de una de las otras distribuciones candidatas, indica criterios para la elección de la nueva distribución y evalúa el producto.**



**5.- Instala CentOS 7, y evalúa la herramientas que ofrecen la distribución del punto 3.**

