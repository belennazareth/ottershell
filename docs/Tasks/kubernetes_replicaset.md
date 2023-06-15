---
sidebar_position: 58
---

# Kubernetes: Trabajando con ReplicaSet

Como indicamos en el contenido de este módulo, no se va a trabajar directamente con los Pods (realmente tampoco vamos a trabajar directamente con los ReplicaSet, en el siguiente módulo explicaremos los Deployments que serán el recurso con el que trabajaremos). En este ejercicio vamos a crear un ReplicaSet que va a controlar un conjunto de Pods. Para ello, realiza los siguientes pasos:

1. Crea un fichero yaml con la descripción del recurso ReplicaSet, teniendo en cuenta los siguientes aspectos:
    * Indica nombres distintos para el ReplicaSet y para el contenedor de los Pods que va a controlar.
    * El ReplicaSet va a crear 3 réplicas.
    * La imagen que debes desplegar es iesgn/test_web:latest.
    * Indica de manera adecuada una etiqueta en la especificación del Pod que vas a definir que coincida con el selector del ReplicaSet.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: test-web-rs
  labels:
    app: test-web-rs
spec:
    replicas: 3
    selector:
        matchLabels:
            app: test-web-rs
    template:
        metadata:
            labels:
                app: test-web-rs
        spec:
            containers:
            - name: contenedor-test-web-rs
              image: iesgn/test_web:latest
              ports:
              - containerPort: 80
```

2. Crea el ReplicaSet.

kubectl apply -f replicaset.yaml

3. Comprueba que se ha creado el ReplicaSet y los 3 Pods.

kubectl get pods
kubectl get replicaset

4. Obtén información detallada del ReplicaSet creado.

kubectl describe replicaset test-web-rs

5. Vamos a probar la tolerancia a fallos: Elimina uno de los 3 Pods, y comprueba que inmediatamente se ha vuelto a crear un nuevo Pod.

kubectl delete pod test-web-rs-jzltg
kubectl get pods

6. Vamos a comprobar la escalabilidad: escala el ReplicaSet para tener 6 Pods de la aplicación.

kubectl scale --replicas=6 replicaset test-web-rs
kubectl get pods

7. Elimina el ReplicaSet y comprueba que se han borrado todos los Pods.

kubectl delete replicaset test-web-rs
kubectl get pods

## Entrega

### 1. Pantallazo del fichero yaml que has creado con la definición del ReplicaSet.

![K8S](/img/SRI+HLC/taller2SRI8.png)

### 2. Pantallazo donde se comprueba que el ReplicaSet y los 3 Pods se han creado.

![K8S](/img/SRI+HLC/taller2SRI8-2.png)

### 3. Pantallazo donde se ve la información detallada del ReplicaSet.

![K8S](/img/SRI+HLC/taller2SRI8-3.png)

### 4. Pantallazo donde se ven los Pods que se han creado, después de eliminar uno de ellos.

![K8S](/img/SRI+HLC/taller2SRI8-4.png)

### 5. Pantallazo donde se ven los Pods que se han creado después del escalado.

![K8S](/img/SRI+HLC/taller2SRI8-5.png)