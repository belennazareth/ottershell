---
sidebar_position: 29
---

# Configuración de un servidor Apache2

## Procedimiento

**Para hacer este ejercicio, crea un escenario en Vagrant, que tenga una máquina (servidorweb) conectada a una red “externa” (que podamos acceder desde nuestro host, puede ser una red pública o una red privada NAT), y una privada (aislada o muy aislada) y un clientee conectada a esta nueva red.**

```yaml
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

```yaml
auto eno1
iface eno1 inet dhcp

auto br0
iface br0 inet dhcp
	bridge_ports eno1
```


**1. Instala un servidor web apache2 en servidorweb.**

```bash
sudo apt update
sudo apt install apache2
```

**2. Crea un virtualhost con el que accederemos con el nombre www.taller2.com. En este virtualhost realizaremos los siguientes ejercicios.**

Para crearlo editamos el fichero `/etc/apache2/sites-available/taller2.conf` y le ponemos el siguiente contenido:

```yaml
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

Creamos el directorio `/home/vagrant/taller2`:

```bash
mkdir /home/vagrant/taller2
```

Cambiamos el propietario del directorio:

```bash
chown -R vagrant:vagrant /home/vagrant/taller2
```

Cambiamos los permisos del directorio:

```bash
chmod -R 755 /home/vagrant/taller2
```

Activamos el virtualhost:

```bash
sudo a2ensite taller2.conf
```

Reiniciamos el servicio:

```bash
sudo systemctl restart apache2
```

Editamos el fichero `/etc/hosts` y añadimos la siguiente línea:

```bash
{ip_servidor}    www.taller2.com
```

**3. Cuando se entre a la dirección www.taller2.com se redireccionará automáticamente a www.taller2.com/principal, donde se mostrará el mensaje de bienvenida.**

Hacemos el directorio principal:

```bash
mkdir /home/vagrant/taller2/principal
```

Creamos el fichero `index.html`:

```bash
echo "<h1>Bienvenido a la pagina principal :)</h1>" > /home/vagrant/taller2/principal/index.html
```

Hacemos que el directorio principal sea el directorio por defecto:

```bash
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    RedirectMatch ^/$ /principal

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/principal>
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

**4. Si accedes a la página www.taller2.com/principal/documentos se visualizarán los documentos que hay en home/usuario/doc. Por lo tanto se permitirá el listado de ficheros (opción Indexes).**

Creamos el directorio para visualizar los documentos:

```bash
mkdir /home/vagrant/doc
```

Creamos algunos ficheros:

```bash
echo "Fichero1" > /home/vagrant/doc/fichero1.txt
echo "Fichero2" > /home/vagrant/doc/fichero2.txt
echo "Fichero 3" > /home/vagrant/doc/fichero3.txt
```

Modificamos:

```bash
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    RedirectMatch ^/$ /principal

    Alias /principal/documentos /home/vagrant/doc

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/principal>
        Require all granted
    </Directory>

    <Directory /home/vagrant/doc>
        Options Indexes
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

*Nota: El redirectmacth se hace cuando es una redireccion dentro documentroot, mientras que el alias es cuando es una redireccion fuera del documentroot.


**5. A la URL www.taller2.com/intranet sólo se debe tener acceso desde el cliente de la red interna, y no se pueda acceder desde la anfitriona por la red pública. A la URL www.taller2.com/internet, sin embargo, sólo se debe tener acceso desde la anfitriona por la red pública, y no desde la red interna.**

Para esto hay que cambiar el fichero `/etc/apache2/sites-available/taller2.conf`:

```yaml
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    RedirectMatch ^/$ /principal

    Alias /principal/documentos /home/vagrant/doc

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/principal>
        Require all granted
    </Directory>

    <Directory /home/vagrant/doc>
        Options Indexes
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/intranet>
        Require ip 10.0.0.0/24
    </Directory>

    <Directory /home/vagrant/taller2/internet>
        Require ip 192.168.1.0/24
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

Creamos unos ficheros para probar:

```bash
mkdir /home/vagrant/taller2/intranet
mkdir /home/vagrant/taller2/internet
echo "<h1>Welcome a Intranet</h1>" > /home/vagrant/taller2/intranet/index.html
echo "<h1>Welcome a Internet</h1>" > /home/vagrant/taller2/internet/index.html
```

**6. Autentificación básica. Limita el acceso a la URL www.taller2.com/secreto.**

Creamos el directorio:

```bash
mkdir /home/vagrant/taller2/secreto
```

Creamos el fichero `index.html`:

```bash
echo "<h1>Acceso restringido</h1>" > /home/vagrant/taller2/secreto/index.html
```

Creamos el directorio para las claves:

```bash
mkdir /etc/apache2/claves
```

Creamos el fichero de contraseñas:

```bash
htpasswd -c /etc/apache2/claves/contra.txt usuario
```

Modificamos el fichero `/etc/apache2/sites-available/taller2.conf`:

```yaml
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    RedirectMatch ^/$ /principal

    Alias /principal/documentos /home/vagrant/doc

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/principal>
        Require all granted
    </Directory>

    <Directory /home/vagrant/doc>
        Options Indexes
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/intranet>
        Require ip 10.0.0.0/24
    </Directory>

    <Directory /home/vagrant/taller2/internet>
        Require ip 192.168.1.0/24
    </Directory>

    <Directory /home/vagrant/taller2/secreto>
        AuthType Basic
        AuthName "Acceso restringido"
        AuthUserFile /etc/apache2/claves/contra.txt
        Require valid-user
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

**7. Vamos a combinar el control de acceso (ejercicio 5) y la autentificación (ejercicio 6), y vamos a configurar el virtual host para que se comporte de la siguiente manera: el acceso a la URL www.taller2.com/secreto se hace forma directa desde la intranet, desde la red pública te pide la autentificación.**

Modificamos el fichero `/etc/apache2/sites-available/taller2.conf`:

```yaml
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    RedirectMatch ^/$ /principal

    Alias /principal/documentos /home/vagrant/doc

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/principal>
        Require all granted
    </Directory>

    <Directory /home/vagrant/doc>
        Options Indexes
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/intranet>
        Require ip 10.0.0.0/24
    </Directory>

    <Directory /home/vagrant/taller2/internet>
        Require ip 192.168.1.0/24
    </Directory>

    <Directory /home/vagrant/taller2/secreto>
        AuthType Basic
        AuthName "Acceso restringido"
        AuthUserFile /etc/apache2/claves/contra.txt
        Require valid-user
        Require ip 10.0.0.0/24
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

En el cliente editamos el fichero `/etc/hosts`:

```bash
10.0.0.1 www.taller2.com
```

Para probarlo, desde la red interna:

```bash
curl http://www.taller2.com/secreto/
```

**8. El módulo rewrite nos va a permitir acceder a una URL e internamente estar accediendo a otra. Esto nos puede ayudar a hacer URL amigables y hacer redirecciones. Por ejemplo para redireccionar a otra URL:**

```yaml
RewriteEngine On
RewriteRule ^(.*)$ http://www.nueva.com/$1 [R=301,L]
```

**Usando un fichero .htaccess haz que al acceder a la URL www.taller2.com/documentos se produce una redirección a www.taller2.com/principal/documentos usando el modulo rewrite (recuerda que tienes que activarlo). Además, deniega el acceso desde la red interna.**

Activamos el módulo rewrite:

```bash
a2enmod rewrite
```

Creamos el directorio:

```bash
mkdir /home/vagrant/taller2/documentos
```

Creamos el fichero `.htaccess`:

```bash
echo "RewriteEngine On" > /home/vagrant/taller2/documentos/.htaccess
echo "RewriteRule ^(.*)$ /principal/documentos/$1 [R=301,L]" >> /home/vagrant/taller2/documentos/.htaccess
```

Modificamos el fichero `/etc/apache2/sites-available/taller2.conf`:

```yaml
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    RedirectMatch ^/$ /principal

    Alias /principal/documentos /home/vagrant/doc

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/principal>
        Require all granted
    </Directory>

    <Directory /home/vagrant/doc>
        Options Indexes
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/intranet>
        Require ip 10.0.0.0/24
    </Directory>

    <Directory /home/vagrant/taller2/internet>
        Require ip 192.168.1.0/24
    </Directory>

    <Directory /home/vagrant/taller2/secreto>
        AuthType Basic
        AuthName "Acceso restringido"
        AuthUserFile /etc/apache2/claves/contra.txt
        Require valid-user
        Require ip 10.0.0.0/24
    </Directory>

    <Directory /home/vagrant/taller2/documentos>
        Require all granted
        AllowOverride All
        Options Indexes FollowSymLinks
        Deny from 10.0.0.0/24     
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

Y reiniciamos el servicio:

```bash
systemctl restart apache2
```


## Entrega

### 1. Configuración completa del virtualhost.

```yaml
<VirtualHost *:80>

    ServerName www.taller2.com
    DocumentRoot /home/vagrant/taller2

    RedirectMatch ^/$ /principal

    Alias /principal/documentos /home/vagrant/doc

    <Directory /home/vagrant/taller2>
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/principal>
        Require all granted
    </Directory>

    <Directory /home/vagrant/doc>
        Options Indexes
        Require all granted
    </Directory>

    <Directory /home/vagrant/taller2/intranet>
        Require ip 10.0.0.0/24
    </Directory>

    <Directory /home/vagrant/taller2/internet>
        Require ip 192.168.1.0/24
    </Directory>

    <Directory /home/vagrant/taller2/secreto>
        AuthType Basic
        AuthName "Acceso restringido"
        AuthUserFile /etc/apache2/claves/contra.txt
        Require valid-user
        Require ip 10.0.0.0/24
    </Directory>

    <Directory /home/vagrant/taller2/documentos>
        Require all granted
        AllowOverride All
        Options Indexes FollowSymLinks        
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log
    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined

</VirtualHost>
```

### 2. Comprobación de que al acceder a www.taller2.com se produce una redirección.

![http](/img/SRI+HLC/taller2SRI3.png)

### 3. Pantallazo accediendo a www.taller2.com/principal/documentos (pon algunos ficheros para que se vea la lista).

![http](/img/SRI+HLC/taller2SRI3-2.png)

### 4. Pantallazos de accesos a www.taller2.com/intranet desde el host y el cliente interno. Pantallazos de acceso a www.taller2.com/internet desde el host y el clientee interno.

Host:

![http](/img/SRI+HLC/taller2SRI3-3.png)
![http](/img/SRI+HLC/taller2SRI3-4.png)

Cliente interno:

![http](/img/SRI+HLC/taller2SRI3-5.png)
![http](/img/SRI+HLC/taller2SRI3-6.png)

### 5. Pantallazos de la autentificación básica.

![http](/img/SRI+HLC/taller2SRI3-7.png)

### 6. Pantallazos de acceso a www.taller2.com/secreto desde el host y el clientee interno.

Host:

![http](/img/SRI+HLC/taller2SRI3-7.png)
![http](/img/SRI+HLC/taller2SRI3-8.png)

Cliente interno:

![http](/img/SRI+HLC/taller2SRI3-9.png)

### 7. Contenido del fichero .htaccess. Acceso a www.taller2.com/documentos comprobando que se produce una redirección desde el exterior y prueba de acceso desde el cliente interno para comprobar que no tiene permiso de acceso.

Contenido del fichero `.htaccess`:

```bash
RewriteEngine On
RewriteRule ^(.*)$ /principal/documentos/ [R=301,L]
```

![http](/img/SRI+HLC/taller2SRI3-10.png)

![http](/img/SRI+HLC/taller2SRI3-11.png)
