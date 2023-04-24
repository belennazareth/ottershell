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


## 

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