---
sidebar_position: 22
---

# Despliegue de aplicaciones Java

## Procedimiento

### Creación y configuración de proyecto Java

Como vimos en el [taller 1](https://ottershell.vercel.app/docs/Tasks/tomcat), se puede crear un proyecto Java con Maven. En este caso, tenemos el repositorio [rock-paper-scissors](https://github.com/josedom24/rock-paper-scissors) por lo que no es necesario crearlo.
Ejecutar el siguiente comando para compilar el proyecto:

```bash
mvn package
```

### Despliegue de la aplicación

Para desplegar la aplicación, se va a utilizar el servicio de Tomcat. Manualmente, introducimos el fichero `war` en la carpeta `webapps` de Tomcat. En este caso, se va a utilizar el servicio de Tomcat Manager, para ello, se debe acceder a la url `http://{ip_server}:8080/manager/html` y se debe introducir el usuario y contraseña que se ha creado en el [taller 1](https://ottershell.vercel.app/docs/Tasks/tomcat).

```bash
sudo cp /rock-paper-scissors/target/roshambo.war /var/lib/tomcat9/webapps/
```

Después de copiar el fichero, se puede acceder a la aplicación en la url `http://{ip_server}:8080/roshambo/`. Para poder acceder antes hay que activarla desde el Tomcat Manager para que aparezca de la siguiente forma:

![tomcat](/img/SRI+HLC/javaSRI.png)

Si accedemos a la página, nos aparecerá el siguiente mensaje:

![tomcat](/img/SRI+HLC/javaSRI-2.png)

Es interactivo y nos permite seleccionar entre piedra, papel o tijera, dado como respuesta un registro de la partida y el resultado:

![tomcat](/img/SRI+HLC/javaSRI-3.png)


## Entrega

**1. Entrega una captura de la aplicación de administración Tomcat-Manager donde se compruebe que las aplicaciones están desplegadas.**




**2. Configuración del proxy inverso para acceder a las aplicaciones cómo nos indica la práctica.**

**3. Acceso desde un navegar web a la aplicación rock-paper-scissors con la url java.tunombre.org/game.**

**4. Acceso desde un navegar web a la aplicación OpenCMS con la url java.tunombre.org.**
