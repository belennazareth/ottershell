---
sidebar_position: 60
---

# Kubernetes: Despliegues parametrizados

## Ejercicio 1: Configurando nuestra aplicación Temperaturas

En un ejemplo anterior: [Ejemplo completo: Desplegando y accediendo a la aplicación Temperaturas](https://github.com/josedom24/curso_kubernetes_ies/blob/main/modulo6/temperaturas.md) habíamos desplegado una aplicación formada por dos microservicios que nos permitía visualizar las temperaturas de municipios.

Recordamos que el componente frontend hace peticiones al componente `backend` utilizando el nombre `temperaturas-backend`, que es el nombre que asignamos al `Service ClusterIP` para el acceso al `backend`.

Vamos a cambiar la configuración de la aplicación para indicar otro nombre.

Podemos configurar el nombre del servidor backend al que vamos a acceder desde el frontend modificando la variable de entorno `TEMP_SERVER` a la hora de crear el despliegue del frontend.

Por defecto el valor de esa variable es:

    TEMP_SERVER temperaturas-backend:5000

Ficheros:

- frontend-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: temperaturas-frontend
  labels:
    app: temperaturas
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: temperaturas
      tier: frontend
  template:
    metadata:
      labels:
        app: temperaturas
        tier: frontend
    spec:
      containers:
      - name: contenedor-temperaturas
        image: iesgn/temperaturas_frontend
        ports:
          - name: http-server
            containerPort: 3000
```

- frontend-srv.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: temperaturas-frontend
  labels:
    app: temperaturas
    tier: frontend
spec:
  type: NodePort
  ports:
  - port: 3000
    targetPort: http-server
  selector:
    app: temperaturas
    tier: frontend
```

- backend-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: temperaturas-backend
  labels:
    app: temperaturas
    tier: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: temperaturas
      tier: backend
  template:
    metadata:
      labels:
        app: temperaturas
        tier: backend
    spec:
      containers:
        - name: contendor-servidor-temperaturas
          image: iesgn/temperaturas_backend
          ports:
            - name: api-server
              containerPort: 5000
```

- backend-srv.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: temperaturas-backend
  labels:
    app: temperaturas
    tier: backend
spec:
  type: ClusterIP
  ports:
  - port: 5000
    targetPort: api-server
  selector:
    app: temperaturas
    tier: backend
```

- ingress.yaml

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: temperaturas-ingress
spec:
  rules:
  - host: www.temperaturas.org
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: temperaturas
            port:
              number: 3000
```

Vamos a modificar esta variable en el despliegue del frontend y cambiaremos el nombre del Service del backend para que coincidan, para ello realiza los siguientes pasos:

1. Crea un recurso `ConfigMap` con un dato que tenga como clave `SERVIDOR_TEMPERATURAS` y como contenido servidor-temperaturas:5000.

    kubectl create configmap servidor-temperaturas --from-literal=SERVIDOR_TEMPERATURAS=servidor-temperaturas:5000
    kubectl get configmap 

2. Modifica el fichero de despliegue del frontend: frontend-deployment.yaml para añadir la modificación de la variable TEMP_SERVER con el valor que hemos guardado en el `ConfigMap`.

```yaml
        env:
          - name: TEMP_SERVER
            valueFrom:
               configMapKeyRef:
                   name: servidor-temperaturas
                   key: SERVIDOR_TEMPERATURAS
```

3. Realiza el despliegue y crea el Service para acceder al frontend.

    kubectl apply -f frontend-deployment.yaml
    kubectl apply -f frontend-srv.yaml

4. Despliega el microservicio backend.

    kubectl apply -f backend-deployment.yaml

5. Modifica el fichero backend-srv.yaml para cambiar el nombre del Service por servidor-temperaturas y crea el Service.

```yaml
    metadata:
        name: servidor-temperaturas
```

    kubectl apply -f backend-srv.yaml

6. Accede a la aplicación usando el puerto asignado al Service NodePort del frontend o creando el recurso Ingress.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: temperaturas
  labels:
    app: temperaturas
    type: frontend
spec:
    rules:
    - host: www.temperaturas.org
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: temperaturas-frontend
              port:
                number: 3000
```

    kubectl apply -f ingress.yaml


## Entrega

### 1. Pantallazo donde se vea la definición del recurso `ConfigMap`.

![K8S](/img/SRI+HLC/taller5SRI8.png)

### 2. Pantallazo donde se vea la modificación del fichero frontend-deployment.yaml.

![K8S](/img/SRI+HLC/taller5SRI8-2.png)

### 3. Pantallazo donde se vea la modificación del fichero backend-srv.yaml.

![K8S](/img/SRI+HLC/taller5SRI8-3.png)

### 4. Pantallazo donde se compruebe que la aplicación está funcionando.

![K8S](/img/SRI+HLC/taller5SRI8-4.png)


## Ejercicio 2: Despliegue y acceso de la aplicación Nextcloud

Basándonos en el [Ejemplo completo: Despliegue y acceso a Wordpress + MariaDB](https://github.com/josedom24/curso_kubernetes_ies/blob/main/modulo7/wordpress.md) vamos a realizar el despliegue de la aplicación `NextCloud + MariaDB`. Para ello ten en cuenta lo siguiente:

* El despliegue de la base de datos se haría de la misma forma que encontramos en el ejemplo de Wordpress, pero para esta actividad vamos a usar la imagen mariadb:10.5.
* Según la documentación de [NextCloud en DockerHub](https://hub.docker.com/_/nextcloud) las variables de entorno que tienes que modificar serían: `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` y `MYSQL_HOST`.
* Al igual que en el ejemplo utiliza un recurso ``ConfigMap`` para guardar los valores de configuración no sensibles, y un recurso `Secret` para los datos sensibles.
* Utiliza los ficheros `yaml` del ejemplo haciendo las modificaciones oportunas.

## Entrega 

### 1. Pantallazo donde se vea el contenido del fichero de despliegue de NextCloud.

![K8S](/img/SRI+HLC/taller5SRI8-5.png)

### 2. Pantallazo donde se vean los recursos que se han creado.

![K8S](/img/SRI+HLC/taller5SRI8-6.png)

### 3. Pantallazo donde se compruebe que la aplicación está funcionando.

![K8S](/img/SRI+HLC/taller5SRI8-7.png)
