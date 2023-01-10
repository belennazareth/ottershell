---
sidebar_position: 15
---

# Desarrollo y despliegue de una aplicación Java simple

Primero hay que instalar **tomcat9** para seguir con la configuración del panel de administración. Para esto instalamos **tomcat9-admin** y editamos el fichero **/etc/tomcat9/tomcat-users.xml** para añadir el usuario **admin**:

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

