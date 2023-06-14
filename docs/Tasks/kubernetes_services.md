---
sidebar_position: 60
---

# Kubernetes: Trabajando con Services

## Ejercicio 1: Despliegue y acceso de la aplicación GuestBook

Una vez que tenemos creado el despliegue de la aplicación GuestBook, que realizamos en el anterioor taller, vamos a crear los Services correspondientes para acceder a ella:

**Service para acceder a la aplicación**

El primer Service que vamos a crear nos va a permitir acceder a la aplicación GuestBook desde el exterior, para ello crea un fichero yaml con la definición del Service a partir de la siguiente plantilla:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: guestbook
  labels:
    app: guestbook
    tier: frontend
spec:
  type: 
  ports:
  - port: 
    targetPort: 
  selector:
    app: guestbook
    tier: frontend
```

Tienes que poner el tipo del Service, el puerto del servicio será el 80 y el nombre del puerto de la aplicación que hemos asignado en el Deployment es http-server.

Realiza los siguientes pasos:

1. Elabora el fichero yaml con la definición del Service, y créalo.
2. Comprueba el puerto que le han asignado al Service para acceder desde el exterior.
3. Accede a la ip del nodo master y al puerto asignado desde un navegador web para ver la aplicación.
4. Responde la siguiente pregunta: ¿Por qué aparece el mensaje de error: Waiting for database connection…?


**Service para acceder a la base de datos**

A continuación vamos a crear el Service para acceder a la base de datos. Vamos a crear el fichero yaml para su definición a partir de la siguiente plantilla:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: redis
  labels:
    app: redis
    tier: backend
spec:
  type: 
  ports:
  - port: 
    targetPort: 
  selector:
    app: redis
    tier: backend
```

Tienes que poner el tipo del Service, el puerto del servicio será el 6379 y el nombre del puerto de la base de datos que hemos asignado en el Deployment es redis-server. Nota: No cambies el nombre del Service, ya que la aplicación guestbook va a acceder por defecto a la base de datos usando el nombre redis.

Realiza los siguientes pasos:

1. Elabora el fichero yaml con la definición del Service, y créalo.
2. Lista los Services que has creado.
3. Accede a la ip del nodo master y al puerto asignado desde un navegador web para ver la aplicación. Comprueba que funciona sin ningún problema.

**Acceso a la aplicación usando Ingress**

Vamos a crear el fichero yaml de definición del recurso Ingress para acceder a la aplicación a partir de la siguiente plantilla:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: guestbook
spec:
  rules:
  - host: 
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: 
            port:
              number: 80
```

Indica un host del tipo www.tunombre.org, indica el nombre del Service que creaste para acceder a la aplicación guestbook y ten en cuenta que el puerto de dicho servicio era el 80.

Realiza los siguientes pasos:

1. Activa el addon ingress en minikube para instalar el Ingress Controller.
2. Crea La definición del recurso Ingress con los datos sugeridos, y crea el recurso Ingress.
3. Modifica el fichero /etc/hosts de tu ordenador para configurar la resolución estática.
4. Accede a la aplicación usando el nombre que has asignado.

## Entrega

1. Pantallazo donde se vea el acceso desde un navegador web a la aplicación cuando sólo tenemos el servicio para acceder a la aplicación (tiene que aparecer el mensaje de error).
2. Pantallazo donde se vea el acceso desde un navegador web a la aplicación usando la ip del nodo master y el puerto asignado al Service.
3. Pantallazo donde se vea el acceso desde un navegador web a la aplicación usando el nombre que hemos configurado en el recurso Ingress.

## Ejercicio 2: Despliegue y acceso de la Aplicación Lets-Chat

[Let’s Chat](https://github.com/sdelements/lets-chat) es una aplicación web escrita en Node.js que utilizando una base de datos MongoDB nos posibilita la creación de salas de chats.

Vamos a realiza el despliegue y acceso a esta aplicación teniendo en cuenta los siguientes aspectos:

* La imagen docker que vamos a usar para el despliegue de Let’s Chat es sdelements/lets-chat y para desplegar mongoDB utilizaremos la imagen mongo. Nota: utiliza imagen mongo:4, Let’s Chat es una aplicación antigua y no funciona con las últimas versiones de mongo.
* Al crear el despliegue de Let’s Chat podemos poner varias replicas, pero el despliegue de la base de datos, sólo creará una replica.
* El puerto en el que responde la aplicación es el 8080. La base de datos utiliza el puerto 27017.
* Vamos acceder desde el exterior a la aplicación. Sin embargo, no es necesario acceder desde el exterior a la base de datos.
* El nombre del Service para acceder a la base de datos debe ser mongo ya que por defecto la aplicación va a conectar a la base de datos usando ese nombre.
* Queremos acceder a la aplicación usando un nombre del tipo www.chat-tunombre.org.

Realiza los siguientes pasos:

1. Utilizando como modelos los ficheros yaml de la actividad anterior, crea los ficheros necesarios para crear los recursos en tu cluster de Kubernetes para desplegar esta aplicación.

## Entrega

1. Los ficheros yaml que has creado.
2. Un pantallazo donde se vea el acceso desde un navegador web a la aplicación usando la ip del nodo master y el puerto asignado al Service.
3. Un pantallazo donde se vea el acceso desde un navegador web a la aplicación usando el nombre que hemos configurado en el recurso Ingress.

