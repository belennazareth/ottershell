---
sidebar_position: 56
---

# IC/DC con Jenkins

El objetivo de esta práctica es el desarrollo gradual de un Pipeline que vaya realizando tareas sobre el repositorio de una aplicación.

La aplicación con la que vamos a trabajar será tu fork de la aplicación django Polls. Como hemos visto esta aplicación que implementa el tutorial de Django tiene implementado un módulo de pruebas.

Vamos a construir el Pipeline en varias fases:

## Ejercicio 1: Construcción de una imagen docker

Partimos del pipeline que hemos desarrollado en el [Taller 3: Integración continua de aplicación django (Test)](https://fp.josedomingo.org/iaw2223/7_ic/t3.html), donde hemos automatizado el test de la aplicación.

(URL de mi repositorio: https://github.com/belennazareth/django_tutorial)

Modifica el pipeline para que después de hacer el test sobre la aplicación, genere una imagen docker. Tienes que tener en cuenta que los pasos para generar la imagen lo tienes que realizar en la máquina donde está instalado Jenkins. Tendrás que añadir las siguientes acciones:

1. Construir la imagen con el `Dockerfile` que tengas en el repositorio.
2. Subir la imagen a tu cuenta de Docker Hub.
3. Borrar la imagen que se ha creado.

Por lo tanto tienes que estudiar el apartado [Ejecución de un pipeline en varios runner](https://fp.josedomingo.org/iaw2223/7_ic/jenkins/runner.html) para ejecutar el pipeline en dos runner:

* En el contenedor docker a partir de la imagen python:3 los pasos del taller 3.
* En la máquina de Jenkins los pasos de este ejercicio.

Otras consideraciones:

* Cuando termine de ejecutar el pipeline te mandará un correo de notificación.
* El pipeline se guardará en un fichero Jenkinsfile en tu repositorio, y la configuración del pipeline hará referencia a él.

```groovy
pipeline {
    agent none
    stages {
        stage ('Testing django') { 
            agent { 
                docker { image 'python:3'
                args '-u root:root'
                }
            }
            stages {
                stage('Clone') {
                    steps {
                        git branch:'master',url:'https://github.com/belennazareth/django_tutorial.git'
                    }
                }
                stage('Install') {
                    steps {
                        sh 'pip install -r requirements.txt'
                    }
                }
                stage('Test') {
                    steps {
                        sh 'python3 manage.py test'
                    }
                } 
            }
        }
        stage('Build') {
            agent any
            steps {
                script {
                    def dockerImage = docker.build("belennazareth/django_tutorial:${env.BUILD_ID}")
                }
            }
        }
        stage('Push image') {
            agent any
            steps {
                script {
                    withDockerRegistry([ credentialsId: "DOCKER_HUB", url: "" ]) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove image') {
            agent any
            steps {
                script {
                    sh 'docker rmi belennazareth/django_tutorial:${env.BUILD_ID}'
                }
            }
        }
    }
}
```

## Entrega

### 1. Una captura de pantalla donde se vea la salida de un build que se ha ejecutado de manera correcta.

### 2. Una captura de pantalla de tu cuenta de Docker Hub donde se vea la imagen subida de último build.

### 3. Introduce un fallo en el Dockerfile y muestra la salida del build donde se produce el error.

### 4. Entrega la URL del repositorio para ver el Jenkinsfile.

### 5. Pantallazo con el correo que has recibido de la ejecución del pipeline.


## Ejercicio 2: Despliegue de la aplicación

Amplía el pipeline anterior para que tenga una última etapa donde se haga el despliegue de la imagen que se ha subido a Docker Hub en tu entorno de producción (VPS). Algunas pistas:

* Busca información de cómo hacer el despliegue a un servidor remoto (ssh, buscando algún plugin con esa funcionalidad,…)
* Si vas a hacer conexiones por ssh, tendrás que guardar una credencial en tu Jenkins con el nombre de usuario y contraseña.
* Para el despliegue deberá usar el fichero docker-compose.yaml que has generado en otras prácticas.
* Se deberá borrar el contenedor con la versión anterior, descargar la nueva imagen y crear un nuevo contenedor.

Otras consideraciones:

* Cambia el disparador del pipeline. Configúralo con un webhook de github, para que cada vez que se produce un push se ejecute el pipeline. Para que el webhook pueda acceder a tu Jenkins puedes usar ngrok.

## Entrega

### 1. El contenido del fichero Jenkinsfile.

### 2. Las credenciales que has guardado en Jenkins.

### 3. Demuestra al profesor como se realiza la IC/DC completo.