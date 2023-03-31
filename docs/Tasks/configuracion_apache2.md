---
sidebar_position: 29
---

# Configuración de un servidor Apache2

## Procedimiento

Para hacer este ejercicio, crea un escenario en Vagrant, que tenga una máquina (servidorweb) conectada a una red “externa” (que podamos acceder desde nuestro host, puede ser una red pública o una red privada NAT), y una privada (aislada o muy aislada) y un clientee conectada a esta nueva red.

```vagrant
Vagrant.configure("2") do |config|
    config.vm.box = "debian/bullseye64"
    config.vm.synced_folder ".", "/vagrant", disabled: true

    config.vm.define :servidorweb do |servidorweb|
        servidorweb.vm.hostname = "servidorweb"
        servidorweb.vm.network :public_network,
		    :dev => "br0",
		    :mode => "bridge",
		    :type => "bridge"
        servidorweb.vm.network :private_network,
        :libvirt__network_name => "redaislada",
        :libvirt__dhcp_enabled => false,
        :ip => "10.0.0.1",
       :libvirt__forward_mode => "veryisolated"
    end
    config.vm.define :cliente do |cliente|
        cliente.vm.hostname = "cliente"
        cliente.vm.network :private_network,
        :libvirt__network_name => "redaislada",
        :libvirt__dhcp_enabled => false,
        :ip => "10.0.0.2",
        :libvirt__forward_mode => "veryisolated"
    end
end
```

*Nota: será necesario crear un bridge br0 en `/etc/network/interfaces`, después se ejecuta `ifup br0` para activarlo (si eso hacer `ifup eno1` para porsiaca). El fichero `/etc/network/interfaces` quedaría así:

```
auto eno1
iface eno1 inet dhcp

auto br0
iface br0 inet dhcp
	bridge_ports eno1
```


1. Instala un servidor web apache2 en servidorweb.

2. Crea un virtualhost con el que accederemos con el nombre www.taller2.com. En este virtualhost realizaremos los siguientes ejercicios.

3. Cuando se entre a la dirección www.taller2.com se redireccionará automáticamente a www.taller2.com/principal, donde se mostrará el mensaje de bienvenida.

4. Si accedes a la página www.taller2.com/principal/documentos se visualizarán los documentos que hay en home/usuario/doc. Por lo tanto se permitirá el listado de ficheros (opción Indexes).

5. A la URL www.taller2.com/intranet sólo se debe tener acceso desde el clientee de la red interna, y no se pueda acceder desde la anfitriona por la red pública. A la URL www.taller2.com/internet, sin embargo, sólo se debe tener acceso desde la anfitriona por la red pública, y no desde la red interna.

6. Autentificación básica. Limita el acceso a la URL www.taller2.com/secreto.

7. Vamos a combinar el control de acceso (ejercicio 5) y la autentificación (ejercicio 6), y vamos a configurar el virtual host para que se comporte de la siguiente manera: el acceso a la URL www.taller2.com/secreto se hace forma directa desde la intranet, desde la red pública te pide la autentificación.

8. El módulo rewrite nos va a permitir acceder a una URL e internamente estar accediendo a otra. Esto nos puede ayudar a hacer URL amigables y hacer redirecciones. Por ejemplo para redireccionar a otra URL:

```
 RewriteEngine On
 RewriteRule ^(.*)$ http://www.nueva.com/$1 [R=301,L]
```

Usando un fichero .htaccess haz que al acceder a la URL www.taller2.com/documentos se produce una redirección a www.taller2.com/principal/documentos usando el modulo rewrite (recuerda que tienes que activarlo). Además, deniega el acceso desde la red interna.

## Entrega

### 1. Configuración completa del virtualhost.



### 2. Comprobación de que al acceder a www.taller2.com se produce una redirección.



### 3. Pantallazo accediendo a www.taller2.com/principal/documentos (pon algunos ficheros para que se vea la lista).



### 4. Pantallazos de accesos a www.taller2.com/intranet desde el host y el clientee interno. Pantallazos de acceso a www.taller2.com/internet desde el host y el clientee interno.




### 5. Pantallazos de la autentificación básica.




### 6. Pantallazos de acceso a www.taller2.com/secreto desde el host y el clientee interno.




### 7. Contenido del fichero .htaccess. Acceso a www.taller2.com/documentos comprobando que se produce una redirección desde el exterior y prueba de acceso desde el clientee interno para comprobar que no tiene permiso de acceso.



