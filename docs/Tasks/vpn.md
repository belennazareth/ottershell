---
sidebar_position: 25
---

# Redes Privadas Virtuales


**A) VPN de acceso remoto con OpenVPN y certificados x509 (5 puntos)**

Configura una conexión VPN de acceso remoto entre dos equipos del cloud:

• Uno de los dos equipos (el que actuará como servidor) estará conectado a dos redes 
    • Para la autenticación de los extremos se usarán obligatoriamente certificados digitales, que se generarán utilizando openssl y se almacenarán en el directorio /etc/openvpn, junto con  los parámetros Diffie-Helman y el certificado de la propia Autoridad de Certificación. 
    • Se utilizarán direcciones de la red 10.99.99.0/24 para las direcciones virtuales de la VPN. La dirección 10.99.99.1 se asignará al servidor VPN. 
    • Los ficheros de configuración del servidor y del client se crearán en el directorio /etc/openvpn de cada máquina, y se llamarán servidor.conf y client.conf respectivamente. 
    • Tras el establecimiento de la VPN, la máquina client debe ser capaz de acceder a una máquina que esté en la otra red a la que está conectado el servidor. 
Documenta el proceso detalladamente.


**B) VPN sitio a sitio con OpenVPN y certificados x509 (10 puntos)**

Configura una conexión VPN sitio a sitio entre dos equipos del cloud:

• Cada equipo estará conectado a dos redes, una de ellas en común 
    • Para la autenticación de los extremos se usarán obligatoriamente certificados digitales, que se generarán utilizando openssl y se almacenarán en el directorio /etc/openvpn, junto con con los parámetros Diffie-Helman y el certificado de la propia Autoridad de Certificación. 
    • Se utilizarán direcciones de la red 10.99.99.0/24 para las direcciones virtuales de la VPN. 
    • Tras el establecimiento de la VPN, una máquina de cada red detrás de cada servidor VPN debe ser capaz de acceder a una máquina del otro extremo. 
Documenta el proceso detalladamente.


**C) VPN de acceso remoto con WireGuard (5 puntos)**

Monta una VPN de acceso remoto usando Wireguard. Intenta probarla con clients Windows, Linux y Android. Documenta el proceso adecuadamente y compáralo con el del apartado A.


**D) VPN sitio a sitio con WireGuard (10 puntos)**

Configura una VPN sitio a sitio usando WireGuard. Documenta el proceso adecuadamente y compáralo con el del apartado B.

Extra 1) VPN de acceso remoto con Ipsec (5 puntos)

Elige una aplicación por software (por ejemplo, FreeS/Wan) y monta la configuración. Documenta el proceso detalladamente.

Extra 2) VPN sitio a sitio con IPsec (10 puntos)

Montando el escenario en GNS3 usando routers CISCO o con una aplicación por software (por ejemplo, FreeS/Wan) despliega la configuración solicitada. Documenta el proceso detalladamente.


## VPN de acceso remoto con OpenVPN y certificados x509

### Escenario

```vagrantfile
Vagrant.configure("2") do |config|

config.vm.synced_folder ".", "/vagrant", disabled: true

  config.vm.provider :libvirt do |libvirt|
    libvirt.cpus = 1
    libvirt.memory = 512
  end

  config.vm.define :client do |client|
    client.vm.box = "debian/bullseye64"
    client.vm.hostname = "client"
    client.vm.network :private_network,
      :libvirt__network_name => "externa",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.22.15",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

  config.vm.define :server do |server|
    server.vm.box = "debian/bullseye64"
    server.vm.hostname = "server"
    server.vm.network :private_network,
      :libvirt__network_name => "externa",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.22.17",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
    server.vm.network :private_network,
      :libvirt__network_name => "interna-vpn",
      :libvirt__dhcp_enabled => false,
      :ip => "172.22.0.5",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

  config.vm.define :maquina1 do |maquina1|
    maquina1.vm.box = "debian/bullseye64"
    maquina1.vm.hostname = "maquina1"
    maquina1.vm.network :private_network,
      :libvirt__network_name => "interna-vpn",
      :libvirt__dhcp_enabled => false,
      :ip => "172.22.0.7",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

end
```

### server

Instalamos openvpn:

```bash
apt install openvpn
```

Y habilitamos el bit de forwarding:

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```

A continuación, copiamos el fichero de configuración del servidor de /usr/share/easy-rsa a /etc/openvpn, ya que es el directorio donde se van a guardar los ficheros de configuración de openvpn y de esta manera se convierte en el directorio por defecto en el que se buscan los ficheros de configuración:

```bash
sudo cp -r /usr/share/easy-rsa /etc/openvpn
```

```bash
root@server:/etc/openvpn# ls

client	easy-rsa  server  update-resolv-conf
```

Después, inicializamos el PKI de openvpn, que es el sistema de certificados que vamos a utilizar para generar la clave pública y privada del servidor:

```bash
sudo ./easyrsa init-pki
```

```bash
root@server:/etc/openvpn/easy-rsa# ./easyrsa init-pki

init-pki complete; you may now create a CA or requests.
Your newly created PKI dir is: /etc/openvpn/easy-rsa/pki

```

Lo siguiente será la creación de la CA, que es el certificado que va a firmar los certificados de los clientes y del servidor:

```bash
sudo ./easyrsa build-ca
```

Al ejecutarlo obtenemos la siguiente salida en la que pide un passphrase para la CA(nazareth) y un Common Name (CN) para la CA(nazarethCA):


```bash
root@server:/etc/openvpn/easy-rsa# ./easyrsa build-ca
Using SSL: openssl OpenSSL 1.1.1n  15 Mar 2022

Enter New CA Key Passphrase: 
Re-Enter New CA Key Passphrase: 
Generating RSA private key, 2048 bit long modulus (2 primes)
.......................................+++++
........+++++
e is 65537 (0x010001)
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Common Name (eg: your user, host, or server name) [Easy-RSA CA]:nazarethCA

CA creation complete and you may now import and sign cert requests.
Your new CA certificate file for publishing is at:
/etc/openvpn/easy-rsa/pki/ca.crt
```

La clave generada se guarda en /etc/openvpn/easy-rsa/pki/private/ca.key y el certificado en /etc/openvpn/easy-rsa/pki/ca.crt.

Generamos el certificado y la clave privada del servidor:

```bash
sudo ./easyrsa build-server-full server nopass
```

Con salida:

```bash
vagrant@server:/etc/openvpn/easy-rsa$ sudo ./easyrsa build-server-full server nopass

Using SSL: openssl OpenSSL 1.1.1n  15 Mar 2022
Generating a RSA private key
.................+++++
.........................................................................................................................+++++
writing new private key to '/etc/openvpn/easy-rsa/pki/easy-rsa-2724.zCddHx/tmp.2fDdSl'
-----
Using configuration from /etc/openvpn/easy-rsa/pki/easy-rsa-2724.zCddHx/tmp.2k2v1j
Enter pass phrase for /etc/openvpn/easy-rsa/pki/private/ca.key:
Check that the request matches the signature
Signature ok
The Subject's Distinguished Name is as follows
commonName            :ASN.1 12:'server'
Certificate is to be certified until Apr 30 01:11:14 2025 GMT (825 days)

Write out database with 1 new entries
Data Base Updated
```

La clave generada se guarda en /etc/openvpn/easy-rsa/pki/private/server.key y el certificado en /etc/openvpn/easy-rsa/pki/issued/server.crt.

Generamos el certificado y la clave del servidor diffie-hellman, que es un algoritmo que se utiliza para generar claves de cifrado de forma segura:

```bash
sudo ./easyrsa gen-dh
```

Con salida similar a la siguiente:

```bash
root@server:/etc/openvpn/easy-rsa# ./easyrsa gen-dh
Using SSL: openssl OpenSSL 1.1.1n  15 Mar 2022
Generating DH parameters, 2048 bit long safe prime, generator 2
This is going to take a long time
........................................................................+....................................................................................................................................................+...............................+.................................................+....................+......................................................................................................................................................................................+..........................................................................................+...............................................................+............................................................................................................................................................................+.........................................................................................................................................................................+...........................................................................................................................................................................................................+...........................................................................................................................................................................................................................................................................................+.....................................................................................+..................+..............................................+.......+.................................................................................................................................................................................................................+......+..............................................................................................++*++*++*++*

DH parameters of size 2048 created at /etc/openvpn/easy-rsa/pki/dh.pem
```

Generamos el certificado y la clave del cliente VPN:

```bash
sudo ./easyrsa build-client-full client nopass
```

Obtenemos la siguiente salida:

```bash
root@server:/etc/openvpn/easy-rsa# ./easyrsa build-client-full client nopass

Using SSL: openssl OpenSSL 1.1.1n  15 Mar 2022
Generating a RSA private key
..........+++++
..................................+++++
writing new private key to '/etc/openvpn/easy-rsa/pki/easy-rsa-2143.TYQit1/tmp.C8dJPm'
-----
Using configuration from /etc/openvpn/easy-rsa/pki/easy-rsa-2143.TYQit1/tmp.Btnfcu
Enter pass phrase for /etc/openvpn/easy-rsa/pki/private/ca.key:
Check that the request matches the signature
Signature ok
The Subject's Distinguished Name is as follows
commonName            :ASN.1 12:'client'
Certificate is to be certified until Apr 29 22:36:37 2025 GMT (825 days)

Write out database with 1 new entries
Data Base Updated
```

Se almacenará el certificado en /etc/openvpn/easy-rsa/pki/issued/client.crt y la clave en /etc/openvpn/easy-rsa/pki/private/client.key.

Pasamos los ficheros al cliente VPN para que pueda conectarse al servidor:

```bash
sudo cp -rp /etc/openvpn/easy-rsa/pki/ca.crt ~
sudo cp -rp /etc/openvpn/easy-rsa/pki/issued/client.crt ~
sudo cp -rp /etc/openvpn/easy-rsa/pki/private/client.key ~
```

Y cambiamos el propietario de los ficheros para que el usuario cliente pueda acceder a ellos al hacer scp:

```bash
sudo chown vagrant: ~/ca.crt
sudo chown vagrant: ~/client.crt
sudo chown vagrant: ~/client.key
```

Generamos una clave ssh en el servidor para que el cliente pueda conectarse por ssh:

```bash
ssh-keygen
```

Y la copiamos al cliente:

```bash
cat ~/.ssh/id_rsa.pub
```

Pasamos al cliente los ficheros:

```bash
scp ~/ca.crt vagrant@192.168.22.15:/home/vagrant
scp ~/client.crt vagrant@192.168.22.15:/home/vagrant
scp ~/client.key vagrant@192.168.22.15:/home/vagrant
```

Configuramos el servidor VPN copiando el fichero de configuración de ejemplo de openvpn:

```bash
sudo cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf /etc/openvpn/server/servidor.conf
```

Modificamos el fichero de configuración del servidor para que quede de la siguiente forma:

```bash
port 1194
proto udp
dev tun

ca /etc/openvpn/easy-rsa/pki/ca.crt
cert /etc/openvpn/easy-rsa/pki/issued/server.crt
key /etc/openvpn/easy-rsa/pki/private/server.key
dh /etc/openvpn/easy-rsa/pki/dh.pem

topology subnet

# Configure server mode and supply a VPN subnet
# for OpenVPN to draw client addresses from.
# The server will take 10.8.0.1 for itself,
# the rest will be made available to clients.
# Each client will be able to reach the server
# on 10.8.0.1. Comment this line out if you are
# ethernet bridging. See the man page for more info.
#Configuración del tunel donde la ip del servidor: 10.99.99.1
server 10.99.99.0 255.255.255.0 
ifconfig-pool-persist /var/log/openvpn/ipp.txt

push "route 172.22.0.0 255.255.255.0" #IP de la red interna

keepalive 10 120
cipher AES-256-CBC
persist-key
persist-tun
status /var/log/openvpn/openvpn-status.log
verb 3
explicit-exit-notify 1
```

Inicializamos el servicio de openvpn:

```bash
sudo systemctl enable --now openvpn-server@servidor
```

Obteniendo de resultado:

```bash
vagrant@server:~$ sudo systemctl enable --now openvpn-server@servidor

Created symlink /etc/systemd/system/multi-user.target.wants/openvpn-server@servidor.service → /lib/systemd/system/openvpn-server@.service.
```

Y comprobamos que el servicio está activo:

```bash
sudo systemctl status openvpn-server@servidor
```

![vpn](/img/SAD/vpnSAD.png)


### client

Instalamos openvpn en el cliente:

```bash
sudo apt install openvpn
```

Y movemos los ficheros de configuración a la carpeta /etc/openvpn/client para que el cliente pueda conectarse al servidor y cambiamos el propietario de los ficheros:

```bash
sudo mv ~/ca.crt /etc/openvpn/client
sudo mv ~/client.crt /etc/openvpn/client
sudo mv ~/client.key /etc/openvpn/client

sudo chown root: /etc/openvpn/client/*
```

Configuramos el cliente VPN copiando el fichero de configuración de ejemplo de openvpn:

```bash
sudo cp /usr/share/doc/openvpn/examples/sample-config-files/client.conf /etc/openvpn/client/cliente.conf
```

Modificamos el fichero de configuración del cliente para que quede de la siguiente forma:

```bash
client
dev tun
proto udp

remote 192.168.22.17 1194 #IP del servidor
resolv-retry infinite
nobind

persist-key
persist-tun

ca /etc/openvpn/client/ca.crt
cert /etc/openvpn/client/client.crt
key /etc/openvpn/client/client.key

remote-cert-tls server
cipher AES-256-CBC
verb 3
```

Habilitamos el servicio de openvpn:

```bash
sudo systemctl enable --now openvpn-client@cliente
```

Obteniendo de resultado:

```bash
vagrant@client:~$ sudo systemctl enable --now openvpn-client@cliente

Created symlink /etc/systemd/system/multi-user.target.wants/openvpn-client@cliente.service → /lib/systemd/system/openvpn-client@.service.
```

Y comprobamos que el servicio está activo:

```bash
sudo systemctl status openvpn-client@cliente
```

![vpn](/img/SAD/vpnSAD-2.png)

### maquina1

En esta máquina cambiamos las rutas por defecto para que todas las peticiones que se hagan por la red interna pasen por el servidor VPN y no por el router, colocando la ip de la red interna del servidor VPN como puerta de enlace:

```bash
sudo ip route del default
sudo ip route add default via 172.22.0.5
```

### Comprobación

Desde la máquina client hacemos una petición a la máquina1:

```bash
traceroute 172.22.0.7
```

![vpn](/img/SAD/vpnSAD-3.png)

También a la maquina server:

```bash
traceroute 10.99.99.1
```

![vpn](/img/SAD/vpnSAD-4.png)


## VPN sitio a sitio con OpenVPN y certificados x509

### Escenario

```bash
Vagrant.configure("2") do |config|

config.vm.synced_folder ".", "/vagrant", disabled: true

  config.vm.provider :libvirt do |libvirt|
    libvirt.cpus = 1
    libvirt.memory = 512
  end

  config.vm.define :maquina1 do |maquina1|
    maquina1.vm.box = "debian/bullseye64"
    maquina1.vm.hostname = "maquina1"
    maquina1.vm.network :private_network,
      :libvirt__network_name => "privada1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.22.2",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

  config.vm.define :client do |client|
    client.vm.box = "debian/bullseye64"
    client.vm.hostname = "client"
    client.vm.network :private_network,
      :libvirt__network_name => "privada1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.22.1",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
    client.vm.network :private_network,
      :libvirt__network_name => "internet",
      :libvirt__dhcp_enabled => false,
      :ip => "172.22.0.11",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

  config.vm.define :server do |server|
    server.vm.box = "debian/bullseye64"
    server.vm.hostname = "server"
    server.vm.network :private_network,
      :libvirt__network_name => "internet",
      :libvirt__dhcp_enabled => false,
      :ip => "172.22.0.10",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
    server.vm.network :private_network,
      :libvirt__network_name => "privada2",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.20.1",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

  config.vm.define :maquina2 do |maquina2|
    maquina2.vm.box = "debian/bullseye64"
    maquina2.vm.hostname = "maquina2"
    maquina2.vm.network :private_network,
      :libvirt__network_name => "privada2",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.20.2",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

end
```

### server

Instalamos y generamos los mismos certificados que en el caso anterior:

- Instalamos openvpn:

```bash
sudo apt install openvpn
```

- Habilitamos forwarding:

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```

- Creamos PKI que sirve para generar los certificados: 

```bash
sudo cp -r /usr/share/easy-rsa /etc/openvpn
cd /etc/openvpn/easy-rsa
sudo ./easyrsa init-pki
```

- Generamos el certificado de la CA:

```bash
sudo ./easyrsa build-ca 
```

Donde se le da de password a la CA: `nazareth` y de nombre a la CA: `nazarethCA`

- Generamos el certificado del servidor y la clave privada:

```bash
sudo ./easyrsa build-server-full server nopass
```

Se almacenan en `/etc/openvpn/easy-rsa/pki/issued/server.crt` y `/etc/openvpn/easy-rsa/pki/private/server.key`

- Generamos los parámetros Diffie-Hellman:

```bash
sudo ./easyrsa gen-dh
```

Se almacena en `/etc/openvpn/easy-rsa/pki/dh.pem`

- Generamos el certificado del cliente y la clave privada:

```bash
sudo ./easyrsa build-client-full client nopass
```

Se almacenan en `/etc/openvpn/easy-rsa/pki/issued/client.crt` y `/etc/openvpn/easy-rsa/pki/private/client.key`

- Generamos la clave ssh:

```bash
ssh-keygen
```

La pasamos al cliente:

```bash
nano ~/.ssh/authorized_keys
```

- Pasamos los ficheros al cliente:

```bash
sudo cp -rp /etc/openvpn/easy-rsa/pki/ca.crt ~
sudo cp -rp /etc/openvpn/easy-rsa/pki/issued/client.crt ~
sudo cp -rp /etc/openvpn/easy-rsa/pki/private/client.key ~

sudo chown vagrant: ~/ca.crt
sudo chown vagrant: ~/client.crt
sudo chown vagrant: ~/client.key

scp ~/ca.crt vagrant@172.22.0.11:/home/vagrant/
scp ~/client.crt vagrant@172.22.0.11:/home/vagrant/
scp ~/client.key vagrant@172.22.0.11:/home/vagrant/
```

- Configuramos el servidor creando el fichero `/etc/openvpn/server/server.conf`:

```bash
dev tun
ifconfig 10.99.99.1 10.99.99.2
route 192.168.22.0 255.255.255.0 #red interna de client compartida con maquina1
tls-server #habilita tls

dh /etc/openvpn/easy-rsa/pki/dh.pem
ca /etc/openvpn/easy-rsa/pki/ca.crt
cert /etc/openvpn/easy-rsa/pki/issued/server.crt
key /etc/openvpn/easy-rsa/pki/private/server.key

comp-lzo
keepalive 10 60
log /var/log/openvpn/openvpn-status.log

verb 3
```

- Arrancamos el servidor:

```bash
sudo systemctl enable --now openvpn-server@server
```

- Comprobamos que funciona:

```bash
sudo systemctl status openvpn-server@servidor
```

### client

- Instalamos openvpn:

```bash
sudo apt install openvpn
```

- Activamos forwarding:

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```

- Movemos los ficheros y cambiamos el propietario:

```bash
sudo mv ~/ca.crt /etc/openvpn/client/
sudo mv ~/client.crt /etc/openvpn/client/
sudo mv ~/client.key /etc/openvpn/client/

sudo chown root: /etc/openvpn/client/ca.crt
sudo chown root: /etc/openvpn/client/client.crt
sudo chown root: /etc/openvpn/client/client.key
```

- Creamos el fichero de configuración `/etc/openvpn/client/client.conf` y lo configuramos:

```bash
dev tun
remote 172.22.0.10 #ip del servidor server
ifconfig 10.99.99.2 10.99.99.1
route 192.168.20.0 255.255.255.0 #red interna de server compartida con maquina2
tls-client
ca /etc/openvpn/client/ca.crt
cert /etc/openvpn/client/client.crt
key /etc/openvpn/client/client.key
comp-lzo
keepalive 10 60
log /var/log/openvpn/cliente.log

verb 3
```

- Arrancamos el cliente:

```bash
sudo systemctl enable --now openvpn-client@client
```

- Comprobamos que funciona:

```bash
sudo systemctl status openvpn-client@client
```

### maquina1

- Configuramos las rutas:

```bash
sudo ip route del default
sudo ip route add default via 192.168.22.1
```

### maquina2

- Configuramos las rutas:

```bash
sudo ip route del default
sudo ip route add default via 192.168.20.1
```

### Comprobación

- Comprobamos que podemos acceder a la maquina1 desde la maquina2:

```bash
traceroute 192.168.20.2
```

![vpn](/img/SAD/vpnSAD-5.png)

- Comprobamos que podemos acceder a la maquina2 desde la maquina1:

```bash
traceroute 192.168.22.2
```

![vpn](/img/SAD/vpnSAD-6.png)


## VPN de acceso remoto con WireGuard

## Escenario

```bash
Vagrant.configure("2") do |config|

config.vm.synced_folder ".", "/vagrant", disabled: true

  config.vm.provider :libvirt do |libvirt|
    libvirt.cpus = 1
    libvirt.memory = 512
  end

  config.vm.define :client do |client|
    client.vm.box = "debian/bullseye64"
    client.vm.hostname = "client"
    client.vm.network :private_network,
      :libvirt__network_name => "internet",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.122.11",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

  config.vm.define :server do |server|
    server.vm.box = "debian/bullseye64"
    server.vm.hostname = "server"
    server.vm.network :private_network,
      :libvirt__network_name => "internet",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.122.10",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
    server.vm.network :private_network,
      :libvirt__network_name => "privada3",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.1",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

  config.vm.define :maquina1 do |maquina1|
    maquina1.vm.box = "debian/bullseye64"
    maquina1.vm.hostname = "maquina1"
    maquina1.vm.network :private_network,
      :libvirt__network_name => "privada3",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.2",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

end
```

### Procedimiento

- Instalamos wireguard en el servidor y el cliente:

```bash
sudo apt install wireguard
```

- En el servidor generamos el par de claves como root:

```bash
wg genkey | tee /etc/wireguard/privatekey | wg pubkey | tee /etc/wireguard/publickey
```

Clave privada: `AMetqK+E79IlJEPCi05Ct8JllBdihArqQiNAS6k9kEU=`
Clave pública: `qxa6n/ypAvfWZ+kfc2WhCylzKAz1Q06k1aDuxl5Z+SY=`

- En el cliente generamos el par de claves como root:

```bash
wg genkey | tee /etc/wireguard/privatekey | wg pubkey | tee /etc/wireguard/publickey
```

Clave privada: `8HsTgRemwrz/JZDOJ4vdd/K4ANyR5bz8ootdu2vhF2Q=`
Clave pública: `OWYfOUY+s1IiDAs9WJAy7MF23Z+QyiB5U/3CYKRhZF4=`

- Creamos el fichero de configuración `/etc/wireguard/wg0.conf` y lo configuramos:

**Servidor**

```bash
[Interface]
Address = 10.99.99.1/24
ListenPort = 51820
PrivateKey = AMetqK+E79IlJEPCi05Ct8JllBdihArqQiNAS6k9kEU=

[Peer]
PublicKey = OWYfOUY+s1IiDAs9WJAy7MF23Z+QyiB5U/3CYKRhZF4=
AllowedIPs = 10.99.99.2/32
```

**Cliente**

```bash
[Interface]
Address = 10.99.99.2/24
PrivateKey = 8HsTgRemwrz/JZDOJ4vdd/K4ANyR5bz8ootdu2vhF2Q=

[Peer]
PublicKey = qxa6n/ypAvfWZ+kfc2WhCylzKAz1Q06k1aDuxl5Z+SY=
AllowedIPs = 0.0.0.0/0
Endpoint = 192.168.122.10:51820  #ip externa del servidor
PersistentKeepalive = 25
```

Siendo [interface] la configuración del servidor y [peer] la configuración del cliente. `ListenPort` es el puerto por el que escucha el servidor y `PrivateKey` es la clave privada del servidor. En [peer] `PublicKey` es la clave pública del cliente y `AllowedIPs` es la IP que se le asignará al cliente.

- Activamos el bit de forwarding en el servidor:

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```

- Modificamos los permisos del fichero de configuración para que solo root pueda modificarlo:

```bash
sudo chmod 600 /etc/wireguard/ -R
```

- Iniciamos el servicio en el servidor y en el cliente:

```bash
sudo wg-quick up /etc/wireguard/wg0.conf
```

Obtenemos la siguiente salida:

- **Servidor**

```bash
root@server:~# wg-quick up /etc/wireguard/wg0.conf

[#] ip link add wg0 type wireguard
[#] wg setconf wg0 /dev/fd/63
[#] ip -4 address add 10.99.99.1/24 dev wg0
[#] ip link set mtu 1420 up dev wg0
```

- **Cliente**

```bash
root@client:~# wg-quick up /etc/wireguard/wg0.conf

[#] ip link add wg0 type wireguard
[#] wg setconf wg0 /dev/fd/63
[#] ip -4 address add 10.99.99.2/24 dev wg0
[#] ip link set mtu 1420 up dev wg0
[#] wg set wg0 fwmark 51820
[#] ip -4 route add 0.0.0.0/0 dev wg0 table 51820
[#] ip -4 rule add not fwmark 51820 table 51820
[#] ip -4 rule add table main suppress_prefixlength 0
[#] sysctl -q net.ipv4.conf.all.src_valid_mark=1
[#] nft -f /dev/fd/63
```

- Si realizamos un ip a en el servidor y en el cliente, obtenemos la siguiente salida:

**Servidor**

```bash
6: wg0: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN group default qlen 1000
    link/none 
    inet 10.99.99.1/24 scope global wg0
       valid_lft forever preferred_lft forever

```

**Cliente**

```bash
4: wg0: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN group default qlen 1000
    link/none 
    inet 10.99.99.2/24 scope global wg0
       valid_lft forever preferred_lft forever

```

- Si realizamos un ip route en el servidor y en el cliente, obtenemos la siguiente salida:

**Servidor**

```bash
10.99.99.0/24 dev wg0 proto kernel scope link src 10.99.99.1 
```

**Cliente**

```bash
10.99.99.0/24 dev wg0 proto kernel scope link src 10.99.99.2 
```

- En la maquina1 cambiaremos la configuración de red para que tenga una IP de la red modificando la red por defecto:

```bash
sudo ip route del default
sudo ip route add default via 192.168.0.1
```

- Para comprobar que funciona correctamente, realizamos un traceroute del cliente al servidor:

```bash
traceroute 192.168.0.1
```

![vpn](/img/SAD/vpnSAD-7.png)


