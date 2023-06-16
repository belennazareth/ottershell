---
sidebar_position: 60
---

# Kubernetes: Trabajando con Services

## Ejercicio 1: Despliegue y acceso de la aplicación GuestBook

Una vez que tenemos creado el despliegue de la aplicación GuestBook, que realizamos en el anterior taller, vamos a crear los Services correspondientes para acceder a ella:

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

```yaml
apiVersion: v1
kind: Service
metadata:
  name: guestbook
  labels:
    app: guestbook
    tier: frontend
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: http-server
  selector:
    app: guestbook
    tier: frontend
```

  kubectl apply -f guestbook-service.yaml

2. Comprueba el puerto que le han asignado al Service para acceder desde el exterior.

  kubectl get svc

```bash
nazare@ThousandSunny:~/k8s$ kubectl get svc                        
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
guestbook    NodePort    10.108.94.225   <none>        80:31345/TCP   33s
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        5h42m
```

3. Accede a la ip del nodo master y al puerto asignado desde un navegador web para ver la aplicación.

  kubectl get nodes -o wide

```bash
nazare@ThousandSunny:~/k8s$ kubectl get nodes -o wide

NAME       STATUS   ROLES           AGE     VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION    CONTAINER-RUNTIME
minikube   Ready    control-plane   5h49m   v1.26.1   192.168.49.2   <none>        Ubuntu 20.04.5 LTS   5.10.0-20-amd64   docker://20.10.23
```

4. Responde la siguiente pregunta: ¿Por qué aparece el mensaje de error: Waiting for database connection…?

Porque no hemos creado el servicio para acceder a la base de datos.


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

Tienes que poner el tipo del Service, el puerto del servicio será el 6379 y el nombre del puerto de la base de datos que hemos asignado en el Deployment es redis-server. **Nota: No cambies el nombre del Service, ya que la aplicación guestbook va a acceder por defecto a la base de datos usando el nombre redis.**

Realiza los siguientes pasos:

1. Elabora el fichero yaml con la definición del Service, y créalo.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: redis
  labels:
    app: redis
    tier: backend
spec:
  type: NodePort
  ports:
  - port: 6379
    targetPort: redis-server
  selector:
    app: redis
    tier: backend
```

  kubectl apply -f redis-service.yaml

2. Lista los Services que has creado.

  kubectl get svc

```bash
nazare@ThousandSunny:~/k8s$ kubectl get svc

NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
guestbook    NodePort    10.108.94.225   <none>        80:31345/TCP     17m
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP          5h59m
redis        NodePort    10.110.36.109   <none>        6379:30595/TCP   2s
```

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

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: guestbook
spec:
  rules:
  - host: www.nazareth.org
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: guestbook
            port:
              number: 80
```

Realiza los siguientes pasos:

1. Activa el addon ingress en minikube para instalar el Ingress Controller.

  minikube addons enable ingress

2. Crea La definición del recurso Ingress con los datos sugeridos, y crea el recurso Ingress.

  kubectl apply -f guestbook-ingress.yaml
  kubectl delete -f guestbook-ingress.yaml

3. Modifica el fichero /etc/hosts de tu ordenador para configurar la resolución estática.

```bash
192.168.49.2 www.nazareth.org
```

4. Accede a la aplicación usando el nombre que has asignado.

## Entrega

### 1. Pantallazo donde se vea el acceso desde un navegador web a la aplicación cuando sólo tenemos el servicio para acceder a la aplicación (tiene que aparecer el mensaje de error).

![K8S](/img/SRI+HLC/taller4SRI8.png)

### 2. Pantallazo donde se vea el acceso desde un navegador web a la aplicación usando la ip del nodo master y el puerto asignado al Service.

![K8S](/img/SRI+HLC/taller4SRI8-2.png)

### 3. Pantallazo donde se vea el acceso desde un navegador web a la aplicación usando el nombre que hemos configurado en el recurso Ingress.

![K8S](/img/SRI+HLC/taller4SRI8-3.png)


## Ejercicio 2: Despliegue y acceso de la Aplicación Lets-Chat

[Let’s Chat](https://github.com/sdelements/lets-chat) es una aplicación web escrita en Node.js que utilizando una base de datos MongoDB nos posibilita la creación de salas de chats.

Vamos a realizar el despliegue y acceso a esta aplicación teniendo en cuenta los siguientes aspectos:

* La imagen docker que vamos a usar para el despliegue de Let’s Chat es sdelements/lets-chat y para desplegar mongoDB utilizaremos la imagen mongo. Nota: utiliza imagen mongo:4, Let’s Chat es una aplicación antigua y no funciona con las últimas versiones de mongo.

* Al crear el despliegue de Let’s Chat podemos poner varias replicas, pero el despliegue de la base de datos, sólo creará una replica.
* El puerto en el que responde la aplicación es el 8080. La base de datos utiliza el puerto 27017.
* Vamos acceder desde el exterior a la aplicación. Sin embargo, no es necesario acceder desde el exterior a la base de datos.
* El nombre del Service para acceder a la base de datos debe ser mongo ya que por defecto la aplicación va a conectar a la base de datos usando ese nombre.
* Queremos acceder a la aplicación usando un nombre del tipo www.chat-tunombre.org.

Realiza los siguientes pasos:

1. Utilizando como modelos los ficheros yaml de la actividad anterior, crea los ficheros necesarios para crear los recursos en tu cluster de Kubernetes para desplegar esta aplicación.



## Entrega

### 1. Los ficheros yaml que has creado.

  lc-ingress.yaml

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: lets-chat
spec:
  rules:
  - host: www.nazareth.org
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: lets-chat
            port:
              number: 8080
```

  lc-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: lets-chat
  labels:
    app: lets-chat
    tier: frontend
spec:
  type: NodePort
  ports:
  - port: 8080
    targetPort: lets-chat-port 
  selector:
    app: lets-chat
    tier: frontend
```

  lc-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: lets-chat
  labels:
    app: lets-chat
    tier: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: lets-chat
      tier: frontend
  template:
    metadata:
      labels:
        app: lets-chat
        tier: frontend
    spec:
      containers:
      - name: lets-chat
        image: sdelements/lets-chat
        ports:
        - containerPort: 8080
          name: lets-chat-port
```

  mongo-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongo
  labels:
    app: mongo
    tier: backend
spec:
  type: ClusterIP
  ports:
  - port: 27017
    targetPort: mongo-port
  selector:
    app: mongo
    tier: backend
```

  mongo-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
  labels:
    app: mongo
    tier: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
      tier: backend
  template:
    metadata:
      labels:
        app: mongo
        tier: backend
    spec:
      containers:
      - name: contenedor-mongo
        image: mongo:4
        ports:
        - containerPort: 27017
          name: mongo-port
```

  kubectl apply -f lc-ingress.yaml
  kubectl apply -f lc-service.yaml
  kubectl apply -f lc-deployment.yaml
  kubectl apply -f mongo-service.yaml
  kubectl apply -f mongo-deployment.yaml


### 2. Un pantallazo donde se vea el acceso desde un navegador web a la aplicación usando la ip del nodo master y el puerto asignado al Service.

  kubectl get svc
  kubectl get nodes -o wide

![K8S](/img/SRI+HLC/taller4SRI8-4.png)

### 3. Un pantallazo donde se vea el acceso desde un navegador web a la aplicación usando el nombre que hemos configurado en el recurso Ingress.

![K8S](/img/SRI+HLC/taller4SRI8-5.png)