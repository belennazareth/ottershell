---
sidebar_position: 25
---

# Redes Privadas Virtuales

## Procedimiento

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


## Entrega


### VPN de acceso remoto con OpenVPN y certificados x509

#### Escenario

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
      :libvirt__network_name => "interna",
      :libvirt__dhcp_enabled => false,
      :ip => "172.22.0.7",
      :libvirt__netmask => '255.255.255.0',
      :libvirt__forward_mode => "veryisolated"
  end

end
```

#### server

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

### VPN de acceso remoto con WireGuard


### VPN de acceso remoto con WireGuard


### VPN sitio a sitio con WireGuard