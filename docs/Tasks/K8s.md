---
sidebar_position: 63
---

# Kubernetes

En IAW has creado dos imágenes de dos aplicaciones: bookmedik (php) y polls (python django). Elige una de ellas y despliégala en kubernetes. Para ello vamos a hacer dos ejercicios:

## Ejercicio1: Despliegue en minikube

Escribe los ficheros yaml que te posibilitan desplegar la aplicación en minikube. Recuerda que la base de datos debe tener un volumen para hacerla persistente. Debes crear ficheros para los deployments, services, ingress, volúmenes,…

Despliega la aplicación en minikube.

- ConfigMap:

```bash
kubectl create cm cm-mariadb --from-literal=bd_user=nazareth  --from-literal=bd_name=bookmedik -o yaml --dry-run=client > configmap-mariadb.yaml

kubectl create secret generic secret-mariadb --from-literal=passwd_user=nazareth --from-literal=passwd_root=root -o yaml --dry-run=client > secret-mariadb.yaml
```

- pvc-bookmedik.yaml:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: pvc-bookmedik
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 4Gi
```

- deployment-mariadb.yaml:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mariadb
  labels:
    app: mariadb
    tier: backend
spec:
    replicas: 1
    selector:
        matchLabels:
            app: mariadb
            tier: backend
    template:
        metadata:
            labels:
                app: mariadb
                tier: backend
        spec:
            containers:
                - name: mariadb
                  image: mariadb:10.5
                  env:
                    - name: MYSQL_ROOT_PASSWORD
                      valueFrom:
                        secretKeyRef:
                            name: secret-mariadb
                            key: passwd_root
                    - name: MYSQL_DATABASE
                      valueFrom:
                        configMapKeyRef:
                            name: cm-mariadb
                            key: bd_name
                    - name: MYSQL_USER
                      valueFrom:
                        configMapKeyRef:
                            name: cm-mariadb
                            key: bd_user
                    - name: MYSQL_PASSWORD
                      valueFrom:
                        secretKeyRef:
                            name: secret-mariadb
                            key: passwd_user
                  ports:
                      - containerPort: 3306
                        name: mariadb
                  volumeMounts:
                      - name: volumen-mariadb
                        mountPath: /var/lib/mysql
            volumes:
                - name: volumen-mariadb
                  persistentVolumeClaim:
                    claimName: pvc-bookmedik
```

- service-mariadb.yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mariadb
  labels:
    app: mariadb
    tier: backend
spec:
  type: ClusterIP
  ports:
  - port: 3306
    targetPort: mariadb
  selector:
    app: mariadb
    tier: backend
```

- deployment-bookmedik.yaml:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bookmedik
  labels:
    app: bookmedik
    tier: frontend
spec:
    replicas: 2
    selector:
        matchLabels:
            app: bookmedik
            tier: frontend
    template:
        metadata:
            labels:
                app: bookmedik
                tier: frontend
        spec:
            containers:
                - name: bookmedik
                  image: belennazareth/bookmedik:v2
                  env:
                    - name: host_database
                      value: mariadb
                    - name: db_name
                      valueFrom:
                        configMapKeyRef:
                          name: cm-mariadb
                          key: bd_name
                    - name: bookmedik_passwd
                      valueFrom:
                        secretKeyRef:
                          name: secret-mariadb
                          key: passwd_user
                    - name: bookmedik_user
                      valueFrom:
                        configMapKeyRef:
                          name: cm-mariadb
                          key: bd_user
                  ports:
                    - containerPort: 80
                      name: bookmedik
```

- service-bookmedik.yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: bookmedik
  labels:
    app: bookmedik
    tier: frontend
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: bookmedik
  selector:
    app: bookmedik
    tier: frontend
```

- ingress-bookmedik.yaml:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: bookmedik
spec:
    rules:
    - host: www.nazareth.org
      http:
          paths:
          - path: /
            pathType: Prefix
            backend:
                service:
                    name: bookmedik
                    port:
                        number: 80
```

    kubectl apply -f .


## Entrega

### 1. Salida de los comando que nos posibilitan ver los recursos que has creado en el cluster.

    kubectl get all

![K8S](/img/SRI+HLC/k8sSRI8.png)

### 2. Pantallazo accediendo a la aplicación utilizando el servicio.

![K8S](/img/SRI+HLC/k8sSRI8-2.png)

### 3. Pantallazo accediendo a la aplicación utilizando el ingress.

![K8S](/img/SRI+HLC/k8sSRI8-3.png)

### 4. Elimina el despliegue de la base datos, vuelve a crearla y comprueba que la aplicación no ha perdido los datos.

![K8S](/img/SRI+HLC/k8sSRI8-4.gif)

### 5. Escala la aplicación con 3 replicas. Muestra la salida oportuna para ver los pods que se han creado.

    kubectl scale deployment bookmedik --replicas=3
    kubectl get pods

![K8S](/img/SRI+HLC/k8sSRI8-5.png)

### 6. Modifica la aplicación, vuelve a crear una imagen con la nueva versión y actualiza el despliegue. No te olvides de anotar la modificación. Muestra la salida del historial de despliegue, la salida de kubectl get all y un pantallazo donde se vea la modificación que has realizado.

Edito el fichero `core/app/view/login-view.php` y cambio el texto del titulo:

    <h4 class="title">BookMedik k8s</h4>

Creo la imagen con la nueva versión:

    docker build -t belennazareth/bookmedik:v2_2 .

Subo la imagen (https://hub.docker.com/repository/docker/belennazareth/bookmedik/general):

    docker push belennazareth/bookmedik:v2_2

Actualizo el despliegue:

    kubectl set image deployment/bookmedik bookmedik=belennazareth/bookmedik:v2_2

Anoto la modificación:

    kubectl annotate deployment/bookmedik kubernetes.io/change-cause="Actualización de la imagen a v2_2"

Reinicio el pod:

    kubectl rollout restart deployment bookmedik

Salida del historial de despliegue:

    kubectl rollout history deployment bookmedik

Aquí se puede ver como se van aplicando los comandos y se ha realizado un cambio en el título a `BookMedik k8s`:

![K8S](/img/SRI+HLC/k8sSRI8-6.gif)

Salida de kubectl get all:

    kubectl get all

![K8S](/img/SRI+HLC/k8sSRI8-7.png)

### 7. Entrega la url del repositorio donde están los ficheros yaml.

https://github.com/belennazareth/k8s/


## Ejercicio2: Despliegue en otra distribución de kubernetes

Instala un clúster de kubernetes (más de un nodo). Tienes distintas opciones para construir un cluster de kubernetes: Alternativas para instalación simple de k8s.

Realiza el despliegue de la aplicación en el nuevo clúster. Es posible que no tenga instalado un ingress controller, por lo que no va a funcionar el ingress (puedes buscar como hacer la instalación: por ejemplo el nginx controller).

Escala la aplicación y ejecuta kubectl get pods -o wide para ver cómo se ejecutan en los distintos nodos del clúster.

## Entrega

### 1. Enseña al profesor la aplicación funcionando en el nuevo clúster.