---
sidebar_position: 6
---

# Práctica: Creación y configuración de un escenario router-nat

1. Entrega la URL del repositorio GitHub donde has alojado todos los ficheros.

[Repositorio](https://github.com/belennazareth/vagrant_ansible)

2. Entrega una captura de pantalla accediendo por ssh a las dos máquinas (sin utilizar vagrant ssh, es decir sin hacer conexiones a eth0). Usa la opción -A de ssh para acceder al cliente.

![Term](/img/SRI/practicaSRI.png)
![Term](/img/SRI/practicaSRI-2.png)

3. Entrega capturas de pantalla donde se vean las puertas de enlaces de los dos equipos.

![Term](/img/SRI/practicaSRI-3.png)
![Term](/img/SRI/practicaSRI-4.png)

4. Entrega capturas de pantalla donde se vean las máquinas haciendo ping al exterior.

![Term](/img/SRI/practicaSRI-5.png)
![Term](/img/SRI/practicaSRI-6.png)

5. Entrega una captura de pantalla donde se vea un acceso a la página web alojada en la máquina cliente.

![Term](/img/SRI/practicaSRI-7.png)

6. Estudia la forma de integrar la receta ansible en vagrant, de tal manera que una vez se cree el escenario se ejecuta la configuración.

Si se introduce la siguiente línea en el fichero Vagrantfile se ejecutará Ansible en Vagrant una vez se haya realizado la creación del escenario:

```
config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
```