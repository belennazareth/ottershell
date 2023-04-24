---
sidebar_position: 30
---

# Recopilación de Vagrantfiles

## Servidor web y servidor de base de datos (drupal)

```ruby
viVagrant.configure("2") do |config|

    config.vm.define :web do |web|
      web.vm.box = "debian/bullseye64"
      web.vm.hostname = "servidor-web-nazareth"
      web.vm.synced_folder ".", "/vagrant", disabled: true
#      web.vm.network :private_network,
#      :type => "dhcp",
#      :libvirt__network_address => '192.168.200.0'

    web.vm.network :private_network,
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.2"

    web.vm.network :public_network,
      :dev => "virbr0",
      :mode => "bridge",
      :type => "bridge"

    web.vm.network :private_network,
      :libvirt__network_name => "red1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.10",
      :libvirt__forward_mode => "veryisolated"
    end
    
#####################################################################################

    config.vm.define :bd do |bd|
      bd.vm.box = "generic/ubuntu2010"
      bd.vm.hostname = "servidor-bd-nazareth"
      bd.vm.synced_folder ".", "/vagrant", disabled: true
    
    bd.vm.network :private_network,
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.4"

    bd.vm.network :public_network,
      :dev => "virbr0",
      :mode => "bridge",
      :type => "bridge"

#    bd.vm.provider :libvirt do |libvirt|
#      libvirt.storage :file, :size => '1G'
#    end

#    bd.vm.provider :libvirt do |libvirt|
#      libvirt.storage :file, :size => '1G'
#    end

    bd.vm.network :private_network,
      :libvirt__network_name => "red1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.11",
      :libvirt__forward_mode => "veryisolated"
    end    

#    config.vm.provider :libvirt do |libvirt|
#      libvirt.management_network_name = "default"
#      libvirt.management_network_address = '192.168.122.0/24'
#    end
     
end
```


## Router y cliente usando bridge creado manualmente y red muy aislada (ex)

```ruby
Vagrant.configure("2") do |config|

config.vm.define :router do |router|
    router.vm.box = "debian/bullseye64"
    router.vm.hostname = "router-prueba"
    router.vm.synced_folder ".", "/vagrant", disabled: true
    router.vm.network :public_network,
      :dev => "br0",
      :mode => "bridge",
      :type => "bridge",
      use_dhcp_assigned_default_route: true
    router.vm.network :private_network,
      :libvirt__network_name => "net1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.10",
      :libvirt__forward_mode => "veryisolated"
  end
  config.vm.define :cliente do |cliente|
    cliente.vm.box = "debian/bullseye64"
    cliente.vm.hostname = "cliente-prueba"
    cliente.vm.synced_folder ".", "/vagrant", disabled: true
    cliente.vm.network :private_network,
      :libvirt__network_name => "net1",
      :libvirt__dhcp_enabled => false,
      :ip => "192.168.0.11",
      :libvirt__forward_mode => "veryisolated"
  end
end
```


## Servidor con 3 discos y cliente (iscsi)

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.define :servidor do |servidor|
      servidor.vm.box = "debian/bullseye64"
      servidor.vm.hostname = "servidor"
      servidor.vm.synced_folder ".", "/vagrant", disabled: true
      servidor.vm.provider :libvirt do |libvirt|
          libvirt.storage :file, :size => '1G'
          libvirt.storage :file, :size => '2G'
          libvirt.storage :file, :size => '3G'
      end
    end
    config.vm.define :cliente do |cliente|
      cliente.vm.box = "debian/bullseye64"
      cliente.vm.hostname = "cliente"
      cliente.vm.synced_folder ".", "/vagrant", disabled: true
      cliente.vm.provider :libvirt do |libvirt|
      end

   end
  end
```


## Máquina con imagen base de vagrant (makefile)

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "base"

end
```


## MetaSploitable3 (metasploitable3)

```ruby
 Vagrant.configure("2") do |config|
   config.vm.synced_folder '.', '/vagrant', disabled: true
   config.vm.define "ub1404" do |ub1404|
     ub1404.vm.box = "tmarchst/metasploitable3-ub1404"
     ub1404.vm.hostname = "metasploitable3-ub1404"
     config.ssh.username = 'vagrant'
     config.ssh.password = 'vagrant'
     ub1404.vm.network :public_network,
       :dev => "br0",
      :mode => "bridge",
      :type => "bridge"
  end
end
```

## Router y cliente usando bridge creado manualmente y red muy aislada con dhcp (vagrant/ansible)

```ruby

  Vagrant.configure("2") do |config|
    config.vm.box = "debian/bullseye64"
    config.vm.synced_folder ".", "/vagrant", disabled: true
    
    config.vm.define :router do |router|
      router.vm.hostname = "router"
      router.vm.network :public_network,
			  :dev => "br0",
			  :mode => "bridge",
			  :type => "bridge"
      router.vm.network :private_network,
        :libvirt__network_name => "redaislada",
        :libvirt__dhcp_enabled => false,
        :ip => "10.0.0.1",
        :libvirt__forward_mode => "veryisolated"
    end

    config.vm.define :client do |client|
      client.vm.hostname = "client"
      client.vm.network :private_network,
        :libvirt__network_name => "redaislada",
        :libvirt__dhcp_enabled => false,
        :ip => "10.0.0.2",
        :libvirt__forward_mode => "veryisolated"
    end

#    config.vm.provision "ansible" do |ansible|
#       ansible.playbook = "ansible/site.yaml"
#    end
	  
  end
```


## Nodo1 y nodo2 con distros diferentes (vagrant/ansible)

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "debian/bullseye64"
  config.vm.hostname="prueba"

Vagrant.configure("2") do |config|
   config.vm.define :nodo1 do |nodo1|
     nodo1.vm.box = "debian/bullseye64"
     nodo1.vm.hostname = "nodo1"
   end
   config.vm.define :nodo2 do |nodo2|
     nodo2.vm.box = "generic/ubuntu2010"
     nodo2.vm.hostname = "nodo2"
   end
```


## Máquina prueba conectada a red pública (vagrant/ansible)

```ruby
  Vagrant.configure("2") do |config|
    config.vm.box = "debian/bullseye64"
    config.vm.hostname="prueba"
    config.vm.synced_folder ".", "/vagrant", disabled: true
    config.vm.provider :libvirt do |libvirt|
      libvirt.memory = 1024
      libvirt.cpus = 2
    end
  

end
```


## Servidor web y cliente con bridge y red aislada con dhcp (apache)

```ruby
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


## Servidor proxy y servidor web (nginx con php)

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|
  config.vm.define :proxy do |proxy|
      proxy.vm.box = "debian/bullseye64"
      proxy.vm.hostname = "proxy"
      proxy.vm.synced_folder ".", "/vagrant", disabled: true
      proxy.vm.network :private_network,
          :libvirt__network_name => "red_privada1",
          :libvirt__dhcp_enabled => false,
          :ip => "10.0.0.10",
          :libvirt__forward_mode => "veryisolated"
      proxy.vm.provision "shell", run: "always", inline: <<-SHELL
        apt-get update && apt upgrade -y
        sysctl -w net.ipv4.ip_forward=1
        iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -j MASQUERADE
        echo "10.0.0.6 interno.example1.org interno.example2.org" >> /etc/hosts
      SHELL
    end
    config.vm.define :servidorweb do |servidorweb|
      servidorweb.vm.box = "debian/bullseye64"
      servidorweb.vm.hostname = "servidorweb"
      servidorweb.vm.synced_folder ".", "/vagrant", disabled: true
      servidorweb.vm.network :private_network,
          :libvirt__network_name => "red_privada1",
          :libvirt__dhcp_enabled => false,
          :ip => "10.0.0.6",
          :libvirt__forward_mode => "veryisolated"
      servidorweb.vm.provision "shell", run: "always", inline: <<-SHELL
          ip r del default
          ip r add default via 10.0.0.10
      SHELL
    end
    
  end
```


## Dos clientes y un servidor con redes privadas, aisladas y públicas con dhcp (vpn)

```ruby
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


## Dos clientes y un servidor con redes privadas, aisladas y públicas con dhcp y un servidor proxy (vpn2)

```ruby
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