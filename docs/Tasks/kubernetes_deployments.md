---
sidebar_position: 59
---

# Kubernetes: Trabajando con Deployments

## EJERCICIIO 1: Trabajando con Deployments

En este taller vamos a crear un Deployment de una aplicación web. Sigamos los siguientes pasos:

1. Crea un fichero yaml con la descripción del recurso Deployment, teniendo en cuenta los siguientes aspectos:
    * Indica nombres distintos para el Deployment y para el contenedor de los Pods que va a controlar.
    * El Deployment va a crear 2 réplicas.
    * La imagen que debes desplegar es iesgn/test_web:latest.
    * Indica de manera adecuada una etiqueta en la especificación del Pod que vas a definir que coincida con el selector del Deployment.
2. Crea el Deployment.
3. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
4. Obtén información detallada del Deployment creado.
5. Crea un una redirección utilizando el port-forward para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.
6. Accede a los logs del despliegue para comprobar el acceso que has hecho en el punto anterior.
7. Elimina el Deployment y comprueba que se han borrado todos los recursos creados.

## Entrega

### 1. Pantallazo del fichero yaml que has creado con la definición del Deployment.
### 2. Pantallazo donde se comprueba los recursos que se han creado.
### 3. Pantallazo donde se ve la información detallada del Deployment.
### 4. Pantallazo donde se vea el acceso desde un navegador web a la aplicación usando el port-forward.
### 5. Pantallazo donde se vea los logs del despliegue después del acceso.

## EJERCICIO 2: Actualización y desactualización de nuestra aplicación

El equipo de desarrollo ha creado una primera versión preliminar de una aplicación web y ha creado una imagen de contenedor con el siguiente nombre: iesgn/test_web:version1.

Vamos a desplegar esta primera versión de la aplicación, para ello:

1. Crea un fichero yaml (puedes usar el de la actividad anterior) para desplegar la imagen: iesgn/test_web:version1.
2. Crea el Deployment, recuerda realizar una anotación para indicar las características del despliegue.
3. Crea una redirección utilizando el port-forward para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

Nuestro equipo de desarrollo ha seguido trabajando y ya tiene lista la versión 2 de nuestra aplicación, han creado una imagen que se llama: iesgn/test_web:version2. Vamos a actualizar nuestro despliegue con la nueva versión, para ello:

1. Realiza la actualización del despliegue utilizando la nueva imagen (no olvides anotar la causa).
2. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
3. Visualiza el historial de actualizaciones.
4. Crea una redirección utilizando el port-forward para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

Finalmente después de un trabajo muy duro, el equipo de desarrollo ha creado la imagen iesgn/test_web:version3 con la última versión de nuestra aplicación y la vamos a poner en producción, para ello:

1. Realiza la actualización del despliegue utilizando la nueva imagen (no olvides anotar la causa).
2. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
3. Visualiza el historial de actualizaciones.
4. Crea una redirección utilizando el port-forward para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

¡Vaya!, parece que esta versión tiene un fallo, y no se ve de forma adecuada la hoja de estilos, tenemos que volver a la versión anterior:

1. Ejecuta la instrucción que nos permite hacer un rollback de nuestro despliegue.
2. Comprueba los recursos que se han creado: Deployment, ReplicaSet y Pods.
3. Visualiza el historial de actualizaciones.
4. Crea una redirección utilizando el port-forward para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 80, y accede a la aplicación con un navegador web.

## Entrega

### 1. Pantallazo donde se vea el acceso desde un navegador web a la version 1 de la aplicación.
### 2. Pantallazo donde se vea el acceso desde un navegador web a la version 2 de la aplicación.
### 3. Pantallazo donde se visualice el historial de actualización del despliegue después de actualizar a la versión 2.
### 4. Pantallazo donde se vea el acceso desde un navegador web a la version 3 de la aplicación (¡¡¡No se visualiza bien la hoja de estilos!!!).
### 5. Pantallazo donde se visualice el historial de actualización después de realizar el rollback del despliegue.
### 6. Pantallazo donde se vea el acceso desde un navegador web a la version de la aplicación que queda después de hacer el rollout.

## EJERCICIO 3: Despliegue de la aplicación GuestBook

En esta tarea vamos a desplegar una aplicación web que requiere de dos servicios para su ejecución. La aplicación se llama GuestBook y necesita los siguientes servicios:

* La aplicación Guestbook es una aplicación web desarrollada en python que es servida en el puerto 5000/tcp. Utilizaremos la imagen iesgn/guestbook.
* Esta aplicación guarda la información en una base de datos no relacional redis, que utiliza el puerto 6379/tcp para recibir las conexiones. Usaremos la imagen redis.

Por lo tanto si tenemos dos servicios distintos, tendremos dos ficheros yaml para crear dos recursos Deployment, uno para cada servicio. Con esta manera de trabajar podemos obtener las siguientes características:

1. Cada conjunto de Pods creado en cada despliegue ejecutarán un solo proceso para ofrecer el servicio.
2. Cada conjunto de Pods se puede escalar de manera independiente. Esto es importante, si identificamos que al acceder a alguno de los servicios se crea un cuello de botella, podemos escalarlo para tener más Pods ejecutando el servicio.
3. Las actualizaciones de los distintos servicios no interfieren en el resto.
4. Lo estudiaremos en un módulo posterior, pero podremos gestionar el almacenamiento de cada servicio de forma independiente.

Por lo tanto para desplegar la aplicaciones tendremos dos ficheros.yaml:

* [guestbook-deployment.yaml]()
* [redis-deployment.yaml]()

Para realizar el despliegue realiza los siguientes pasos:

1. Usando los ficheros anteriores crea los dos Deployments.
2. Comprueba que los recursos que se han creado: Deployment, ReplicaSet y Pods.
3. Crea una redirección utilizando el port-forward para acceder a la aplicación, sabiendo que la aplicación ofrece el servicio en el puerto 5000, y accede a la aplicación con un navegador web.

¿Qué aparece en la página principal de la aplicación?. Aparece el siguiente mensaje: Waiting for database connection…. Por lo tanto podemos indicar varias conclusiones:

1. Hasta ahora no estamos accediendo de forma “normal” a las aplicaciones. El uso de la opción port-forward es un mecanismo que realmente nos posibilita acceder a la aplicación, pero utilizando un proxy. Deberíamos acceder a las aplicaciones usando una ip y un puerto determinado.
2. Parece que tampoco hay acceso entre los Pods de los distintos despliegues. Parece que los Pods de la aplicación guestbook no pueden acceder al Pod donde se está ejecutando la base de datos redis.

En el siguiente módulo estudiaremos los recursos que nos ofrece la API de Kubernetes para permitirnos el acceso a las aplicaciones desde el exterior, y para que los distintos Pods de los despliegues puedan acceder entre ellos.

## Entrega

### 1. Pantallazo donde se comprueba los recursos que se han creado.
### 2. Pantallazo donde se vea el acceso desde un navegador web a la aplicación usando el port-forward, y se vea el mensaje de error al no poder acceder a la base de datos.