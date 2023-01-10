---
sidebar_position: 15
---

# Desarrollo y despliegue de una aplicación Java simple

Primero hay que instalar **tomcat9** (al realizar esta acción obtenemos automáticamente **openjdk-11-jre-headless** necesario para ejecutar **maven**) para seguir con la configuración del panel de administración. Para esto instalamos **tomcat9-admin** y editamos el fichero **/etc/tomcat9/tomcat-users.xml** para añadir el usuario **admin**:

```xml
<role rolename="manager-gui"/>
<user username="tomcat" password="s3cret" roles="manager-gui"/>
```

Después, para que se apliquen los cambios, es necesario reiniciar el servicio:

```bash
sudo systemctl restart tomcat9
```

Con esto ya podemos entrar a la página de administración de tomcat siguiendo el esquema **ip:8080/manager/html**.

![Tomcat](/img/IAW/taller1IAW5.png)

Seguidamente instalamos **maven**, que es un gestor de dependencias para proyectos Java y que nos va a permitir compilar y empaquetar nuestro proyecto Java.

Usando maven se va a generar el siguiente proyecto Java:

```java
mvn archetype:generate -DgroupId=com.app.example -DartifactId=javita -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

Donde '-DgroupId' es el nombre del paquete, '-DartifactId' es el nombre del proyecto y '-DarchetypeArtifactId' es el tipo de proyecto que queremos crear.

![Tomcat](/img/IAW/taller1IAW5-2.png)

