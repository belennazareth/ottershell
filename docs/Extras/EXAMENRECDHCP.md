h2. Examen Recuperación

h3. Prueba de funcionamiento de la práctica 1

ansible: https://github.com/belennazareth/vagrant_ansible
He tenido que cambiar los nombres quitandoles la barra baja:

<pre><code class="yaml">
Vagrant.configure("2") do |config|
config.vm.define :router do |router|
    router.vm.box = "debian/bullseye64"
    router.vm.hostname = "routerprueba"
    router.vm.synced_folder ".", "/vagrant", disabled: true
    router.vm.network :public_network,
      :dev => "br0",
      :mode => "bridge",
      :type => "bridge",
      use_dhcp_assigned_default_route: true
    router.vm.network :private_network,
      :libvirt__network_name => "net1",
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.1",
      :libvirt__forward_mode => "veryisolated"
  end
  config.vm.define :cliente do |cliente|
    cliente.vm.box = "debian/bullseye64"
    cliente.vm.hostname = "clienteprueba"
    cliente.vm.synced_folder ".", "/vagrant", disabled: true
    cliente.vm.network :private_network,
      :libvirt__network_name => "net1",
      :libvirt__dhcp_enabled => false,
      :ip => "10.0.0.2",
      :libvirt__forward_mode => "veryisolated"
  end
end
</code></pre>

- ssh + ip r:

![dhcp](/img/SRI+HLC/EXAMENREC1.png)

- ping:

![dhcp](/img/SRI+HLC/EXAMENREC2.png)

- web:

![dhcp](/img/SRI+HLC/EXAMENREC3.png)