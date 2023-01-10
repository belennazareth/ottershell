---
sidebar_position: 15
---


# Desarrollo y despliegue de una aplicación Java simple


## Instalación y configuración de Tomcat y Maven

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

Y se creará una estructura de directorios como la siguiente:

```bash
debian@nami:~$ tree javita

javita
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── com
    │           └── app
    │               └── example
    │                   └── App.java
    └── test
        └── java
            └── com
                └── app
                    └── example
                        └── AppTest.java

11 directories, 3 files
```

A continuación, editamos el fichero **pom.xml**, fichero de configuración de maven que contiene información sobre el proyecto y la configuración de las dependencias. Sustituimos la información existente por la siguiente:

```xml
<?xml version = "1.0" encoding = "UTF-8"?>
<project xmlns = "http://maven.apache.org/POM/4.0.0" 
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"

xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>

   <groupId>com.tutorialspoint</groupId>
   <artifactId>holaa</artifactId>
   <version>1</version>
   <packaging>war</packaging>
   
   <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>2.3.0.RELEASE</version>
      <relativePath/> 
   </parent>

   <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
      <java.version>1.8</java.version>
      <tomcat.version>9.0.37</tomcat.version>
   </properties>

   <dependencies>
      <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
      </dependency>
      <dependency>  
         <groupId>org.springframework.boot</groupId>  
	 <artifactId>spring-boot-starter-tomcat</artifactId>  
	 <scope>provided</scope>  
      </dependency>   
      <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-test</artifactId>
         <scope>test</scope>
      </dependency>
   </dependencies>

   <build>
      <plugins>
         <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
         </plugin>
      </plugins>
   </build>
   
</project>
```

Y editamos el fichero **App.java** que se encuentra en la ruta **src/main/java/com/app/example/App.java**, con esto se construirá la aplicación:

```java
package com.app.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class App extends SpringBootServletInitializer {
   @Override
   protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
      return application.sources(App.class);
   }
   public static void main(String[] args) {
      SpringApplication.run(App.class, args);
   }

   @RequestMapping(value = "/")
   public String hello() {
      return "<center>Holaaa!!! ˚*•̩̩͙✩•̩̩͙*˚＊</center>";
   }
}
```

Ahora nos movemos al directorio del proyecto, en mi caso javita, y ejecutamos el siguiente comando para compilar el proyecto:

```bash
mvn package 
```

Se ha generado un nuevo directorio llamado **target** que contiene el fichero **holaa.war**. Este fichero es el que vamos a desplegar en tomcat. 

![Tomcat](/img/IAW/taller1IAW5-3.png)

Como se esta usando desde un servidor y solo disponemos de terminal se debe desplegar de otra manera, en el directorio **/var/lib/tomcat9/webapps/** copiamos el fichero **holaa.war** ya que de esta manera se desplegará automáticamente. Reiniciamos el servicio de tomcat para que se despliegue la aplicación:

```bash
sudo systemctl restart tomcat
```

Ahora podemos acceder a la aplicación desde el navegador y monitorear desde **tomcat-manager**.


## Entrega

#### 1. Entrega una captura de la aplicación de administración Tomcat-Manager una vez que la aplicación está desplegada, donde se comprueba que la aplicación está desplegada.

![Tomcat](/img/IAW/taller1IAW5-4.png)

#### 2. Entrega una captura de pantalla accediendo a la aplicación web.

![Tomcat](/img/IAW/taller1IAW5-5.png)
