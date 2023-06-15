---
sidebar_position: 57
---

# Kubernetes: Trabajando con Pods

Vamos a crear nuestro primer Pod, y para ellos vamos a desplegar una imagen que nos ofrece un servidor web con una página estática. Para ello realiza los siguientes pasos:

**1. Crea un fichero yaml con la descripción del recurso Pod, teniendo en cuenta los siguientes aspectos:**
    - Indica nombres distintos para el Pod y para el contenedor.
    - La imagen que debes desplegar es `iesgn/test_web:latest`.
    - Indica una etiqueta en la descripción del Pod.

  kubectl run test-web --image=iesgn/test_web:latest --dry-run=client -o yaml > test-web.yaml

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-web
  labels:
    app: test-web
spec:
    containers:
    - name: contenedor-test-web
      image: iesgn/test_web:latest
      ports:
      - containerPort: 80
```

**2. Crea el Pod.**

  kubectl apply -f test-web.yaml
  kubectl create -f test-web.yaml

**3. Comprueba que el Pod se ha creado y está corriendo.**

  kubectl get pods

**4. Obtén información detallada del Pod creado.**

  kubectl describe pod test-web

**5. Accede de forma interactiva al Pod y comprueba los ficheros que están en el DocumentRoot (`usr/local/apache2/htdocs/`).**

  kubectl exec -it test-web /bin/bash 

**6. Crea una redirección con `kubectl port-forward` utilizando el puerto de `localhost 8888` y sabiendo que el Pod ofrece el servicio en el `puerto 80`. Accede a la aplicación desde un navegador.**

  kubectl port-forward test-web 8888:80

**7. Muestra los logs del Pod y comprueba que se visualizan los logs de los accesos que hemos realizado en el punto anterior.**

  kubectl logs test-web

**8. Elimina el Pod, y comprueba que ha sido eliminado.**
  kubectl delete pod test-web
  kubectl get pods

## Entrega

### 1. Pantallazo del fichero yaml que has creado con la definición del Pod.

![K8S](/img/SRI+HLC/taller1SRI8.png)

### 2. Pantallazo donde se comprueba que el Pod ha sido creado.

![K8S](/img/SRI+HLC/taller1SRI8-2.png)

### 3. Pantallazo donde se ve la información detallada del Pod.

![K8S](/img/SRI+HLC/taller1SRI8-3.png)

### 4. Pantallazo donde se ve el fichero index.html del DocumentRoot.

![K8S](/img/SRI+HLC/taller1SRI8-4.png)

### 5. Pantallazo del navegador accediendo a la aplicación con el port-forward.

![K8S](/img/SRI+HLC/taller1SRI8-5.png)

### 6. Pantallazo donde se ve los logs de acceso del Pod.

![K8S](/img/SRI+HLC/taller1SRI8-6.png)