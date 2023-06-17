---
sidebar_position: 62
---

# Kubernetes: Instalación de un CMS con Helm

Vamos a instalar el CMS Wordpress usando Helm. Para ello, realiza los siguientes pasos:

1. Instala la última versión de Helm.

```bash
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

2. Añade el repositorio de bitnami

    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm repo list

3. Busca el chart de bitnami para la instalación de Wordpress.

    helm search repo wordpress

4. Busca la documentación del chart y comprueba los parámetros para cambiar el tipo de Service y el nombre del blog.

    --set service.type= # Cambia el tipo de Service
    --set wordpressBlogName=miNombre # Cambia el nombre del blog

5. Instala el chart definiendo el tipo del Service como NodePort y poniendo tu nombre como nombre del blog.

    helm install servidor-web bitnami/wordpress --set service.type=NodePort --set wordpressBlogName=nazareth-helm

```bash
To access your WordPress site from outside the cluster follow the steps below:

1. Get the WordPress URL by running these commands:

   export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services servidor-web-wordpress)
   export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
   echo "WordPress URL: http://$NODE_IP:$NODE_PORT/"
   echo "WordPress Admin URL: http://$NODE_IP:$NODE_PORT/admin"

2. Open a browser and access WordPress using the obtained URL.

3. Login with the following credentials below to see your blog:

  echo Username: user
  echo Password: $(kubectl get secret --namespace default servidor-web-wordpress -o jsonpath="{.data.wordpress-password}" | base64 -d)
```

6. Comprueba los Pods, ReplicaSet, Deployment y Services que se han creado.

    kubectl get all

7. Accede a la aplicación.

## Entrega

### 1. Pantallazo con la búsqueda del chart con el comando helm.

![K8S](/img/SRI+HLC/taller7SRI8.png)

### 2. Pantallazo donde se compruebe que se ha desplegado de forma correcta.

![K8S](/img/SRI+HLC/taller7SRI8-2.png)

### 3. Pantallazo donde se vean los Pods, ReplicaSets, Deployments y Services que se han creado.

![K8S](/img/SRI+HLC/taller7SRI8-3.png)

### 4. Pantallazo donde se vea el acceso al blog y se vea tu nombre como título del blog.

![K8S](/img/SRI+HLC/taller7SRI8-4.png)
![K8S](/img/SRI+HLC/taller7SRI8-5.png)
![K8S](/img/SRI+HLC/taller7SRI8-6.png)