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
--------------------------------------------------------------------------------------------------------------


Voy a usar kubeadm para instalar un clúster de kubernetes en Debian.
Primero creo el vagrantfile donde se van a definir 3 máquinas, una hará de master y las otras dos de worker:

```ruby
Vagrant.configure("2") do |config|

    config.vm.define "master" do |master|
        master.vm.box = "debian/bullseye64"
        master.vm.hostname = "master"
        master.vm.network "private_network", ip: "10.1.0.17"
        master.vm.synced_folder ".", "/vagrant", disabled: true
        master.vm.provider :libvirt do |libvirt|
            libvirt.memory = 6144
            libvirt.cpus = 4
        end
    end

    config.vm.define "worker1" do |worker1|
        worker1.vm.box = "debian/bullseye64"
        worker1.vm.hostname = "worker1"
        worker1.vm.network "private_network", ip: "10.1.0.18"
        worker1.vm.synced_folder ".", "/vagrant", disabled: true
        worker1.vm.provider :libvirt do |libvirt|
            libvirt.memory = 2048
            libvirt.cpus = 2
        end
    end

    config.vm.define "worker2" do |worker2|
        worker2.vm.box = "debian/bullseye64"
        worker2.vm.hostname = "worker2"
        worker2.vm.network "private_network", ip: "10.1.0.19"
        worker2.vm.synced_folder ".", "/vagrant", disabled: true
        worker2.vm.provider :libvirt do |libvirt|
            libvirt.memory = 2048
            libvirt.cpus = 2
        end
    end
end
```

*Nota: Para que funcione correctamente la instalación debe de tener como mínimo 2GB de RAM y 2 CPUs. En master ponle al menos 6GB de RAM y 4 CPUs.

### Instalación de Docker

Usando terminator difundimos los comandos de este apartado a todas las máquinas.

Actualizamos:

    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg

Agregamos la clave GPG oficial de Docker:

    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

Añadimos el repo:

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Actualizamos de nuevo:

    sudo apt-get update

Instalamos la última versión de Docker Engine y containerd:

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin



### Instalación de kubeadm, kubelet y kubectl

Igualmente en las tres máquinas:

```bash
apt-get update && apt-get install -y apt-transport-https curl

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF

apt-get update

apt-get install -y kubelet kubeadm kubectl
```

### Inicialización de 🔷 master 🔷

**SOLO** en la máquina **master**:

    kubeadm init --pod-network-cidr=192.168.100.0/16 --apiserver-cert-extra-sans=192.168.121.157 --apiserver-advertise-address=10.1.0.17

- `--pod-network-cidr=` es la red que vamos a crear para los pods.
- `--apiserver-cert-extra-sans=` es la IP secundaria (eth0) de la máquina master.
- `--apiserver-advertise-address=` es la IP primaria (eth1) de la máquina master.

*Nota: Es necesario apagar la swap para que funcione correctamente (sudo swapoff -a).

```bash
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/kubelet.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf # poner export KUBECONFIG=/etc/kubernetes/kubelet.conf 

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.121.40:6443 --token 6a01lf.ygf0v05wey1wxphe \
	--discovery-token-ca-cert-hash sha256:2c3852180c76f0cf0b488968f932158cb6d82ffa9cd9decb8bef007d4c11f0d3 
```

*Nota: en caso de necesitar borrar el init ejecutamos systemctl stop kubelet && kubeadm reset, ejecutamos systemctl start kubelet y volvemos a ejecutar el init. IMPORTANTE BORRAR LOS FICHEROS rm -rf /etc/kubernetes/ , sudo rm -rf $HOME/.kube/ , rm -r /etc/cni/net.d

Podemos comprobar ejecutando:

    kubectl get nodes
    kubeclt get pods --all-namespaces

Lo siguiente será instalar `calico` para que las máquinas puedan comunicarse entre ellas:

    kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/tigera-operator.yaml

    kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/custom-resources.yaml



## Entrega

### 1. Enseña al profesor la aplicación funcionando en el nuevo clúster.