---
sidebar_position: 52
---

# Jenkins: Comprobación de HTML5 válido y despliegue en surge.sh (test y deploy)

En este ejercicio queremos desplegar una página HTML5 en el servicio surge.sh, además queremos comprobar si el código HTML5 es válido. Estas dos operaciones: comprobar si el HTML5 es válido (test) y el despliegue en surge.sh (deploy) lo vamos a hacer con Jenkins de forma automática (IC y DC). Recuerda que el repositorio es https://github.com/josedom24/ic-html5.

Como vimos en el ejemplo 2, para hacer el despliegue necesitamos guardar el token que hemos obtenido de surge para que nos autentifiquemos. veamos como trabajar con credenciales en Jenkins.

## Crear credenciales

Podemos crear varios tipos de credenciales: usuario y contraseña, credenciales ssh,… Nosotros vamos a crear un Secret text para guardar el token de surge.

Para crear la credencial:

![jenkins](https://fp.josedomingo.org/iaw2223/7_ic/img/cred1.png)
![jenkins](https://fp.josedomingo.org/iaw2223/7_ic/img/cred2.png)

![jenkins](https://fp.josedomingo.org/iaw2223/7_ic/img/cred3.png)
![jenkins](https://fp.josedomingo.org/iaw2223/7_ic/img/cred4.png)

## Creación del pipeline

En el repositorio puedes encontrar el fichero Jenkinsfile con el siguiente contenido:

```groovy
pipeline {
    environment {
        TOKEN = credentials('SURGE_TOKEN')
      }
    agent {
        docker { image 'josedom24/debian-npm'
        args '-u root:root'
        }
    }
    stages {
        stage('Clone') {
            steps {
                git branch:'master',url:'https://github.com/josedom24/ic-travis-html5.git'
            }
        }
        
        stage('Install surge')
        {
            steps {
                sh 'npm install -g surge'
            }
        }
        stage('Deploy')
        {
            steps{
                sh 'surge ./_build/ josedom24.surge.sh --token $TOKEN'
            }
        }
        
    }
}
```

1. En el apartado environment leo una variable de entorno a a partir de la credencial que habíamos creado.

2. Uso la imagen josedom24/debian-npm, imagen que yo he generado de una debian con npm instalado. De esta manera no necesito instalar npm que es un proceso lento.

3. Clono el repositorio.

4. Instalo surge. En realidad podría haberlo instalado en la imagen que he generado.

5. En el stage Deploy hago el despliegue.

## Disparador del pipeline

¿Podríamos activar el pipeline cuando hagamos un push al repositorio? La respuesta es sí, tendríamos que escoger como Build Trigger la opción GitHub hook trigger for GITScm polling.

A continuación tendríamos que crear un Webhook en tu repositorio de gitHub. Los webhooks ofrecen una manera de enviar las notificaciones a un servidor web externo siempre que ciertas acciones ocurran en un repositorio o una organización.

Para más información: [Triggering a Jenkins build on push using GitHub webhooks](https://faun.pub/triggering-jenkins-build-on-push-using-github-webhooks-52d4361542d4).

Tenemos un problema: al crear el webhook debemos indicar la dirección de nuestro jenkins, que tiene que ser accesible desde internet, pero nuestra instalación es local. Para hacer una prueba en nuestro servidor de jenkins local podríamos hacer uso de [ngrok](https://ngrok.com/).



## Entrega

### 1. La URL del tu repositorio GitHub.

https://github.com/belennazareth/ic-html5

### 2. El contenido de la tu fichero Jenkinfile.

```groovy
pipeline {
    environment {
        TOKEN = credentials('SURGE_TOKEN')
      }
    agent {
        docker { image 'josedom24/debian-npm'
        args '-u root:root'
        }
    }
    stages {
        stage('Clone') {
            steps {
                git branch:'master',url:'https://github.com/belennazareth/ic-html5.git'
            }
        }
        
        stage('Install surge')
        {
            steps {
                sh 'npm install -g surge'
            }
        }
        stage('Deploy')
        {
            steps{
                sh 'surge ./_build/ nazareth24.surge.sh --token $TOKEN'
            }
        }
        
    }
}
```

### 3. Captura de pantalla donde se vea donde has creado las credenciales necesarias.

![surge](/img/IAW/taller2IAW7-4.png)

### 4. Explica la configuración necesaria y una prueba de funcionamiento para que se dispare el pipeline cuando hagamos un push al repositorio.

Para esto primero debemos entrar en nuestro repositorio de GitHub y en la pestaña de Settings, en la parte izquierda, seleccionamos Webhooks. Una vez dentro, pulsamos en el botón de Add webhook.

![surge](/img/IAW/taller2IAW7.png)

Para conseguir la url de nuestro webhook, debemos ejecutar el siguiente comando en la terminal de la máquina donde tengamos instalado jenkins para instalarnos ngrok:

```bash
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
```

Como ngrok no esta actualizado para realizar esta tarea tendremos que actualizarlo manualmente. Para ello descargamos la ultima versión de ngrok y la descomprimimos:

```bash
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar xvzf ngrok-v3-stable-linux-amd64.tgz
```

Una vez descomprimido, copiamos el archivo ngrok a la carpeta `/bin/` para que sea accesible desde cualquier lugar:

```bash
sudo cp ngrok /bin/
```

Para poder usar ngrok, debemos registrarnos en su página web y obtener un token. Una vez obtenido el token, lo introducimos en la terminal con el siguiente comando:

```bash
ngrok config add-authtoken {token que te da la página de ngrok al registrarte} 
```

Una vez hecho esto, ejecutamos el siguiente comando para iniciar ngrok en segundo plano y que nos de la url de nuestro webhook:

```bash
nohup ./ngrok http 8080 & curl http://127.0.0.1:4040/api/tunnels

o

ngrok http 8080
```

*Recursos: https://gist.github.com/mudssrali/acfb8b57e5847c7308e1064a739971da, https://ngrok.com/docs/getting-started/, https://stackoverflow.com/questions/27162552/how-to-run-ngrok-in-background

![surge](/img/IAW/taller2IAW7-2.png)

Con esta configuración, cada vez que hagamos un push en nuestro repositorio de GitHub, se ejecutará el pipeline de Jenkins:


![surge](/img/IAW/taller2IAW7-3.png)
