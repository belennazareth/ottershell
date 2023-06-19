---
sidebar_position: 64
---

# Cluster de Alta Disponibilidad

El objetivo de este práctica es la instalación de una aplicación php (WordPress) sobe dos clúster de alta disponibilidad:

## Cluster de HA activo-pasivo

1. Utiliza el Vagrantfile la receta ansible del escenario 7: 07-HA-IPFailover-Apache2+DRBD+GFS2 para crear un clúster de alta disponibilidad activo-pasivo. Nota: La receta instala apache2 + php.
2. Comprueba que los recursos están configurados de manera adecuada, configura tu host para que use el servidor DNS y comprueba que puedes acceder de forma adecuada a la página.
3. Instala en los dos nodos un Galera MariaDB.
4. Instala Wordpress en el clúster.

Para comprobar el estado del clúster utiliza el comando `pcs status`:

```bash
root@nodo1:~# pcs status
Cluster name: mycluster
Cluster Summary:
  * Stack: corosync
  * Current DC: nodo1 (version 2.0.5-ba59be7122) - partition with quorum
  * Last updated: Sun Jun 18 14:43:26 2023
  * Last change:  Sun Jun 18 14:42:12 2023 by root via cibadmin on nodo1
  * 2 nodes configured
  * 5 resource instances configured

Node List:
  * Online: [ nodo1 nodo2 ]

Full List of Resources:
  * VirtualIP	(ocf::heartbeat:IPaddr2):	 Started nodo1
  * WebSite	(ocf::heartbeat:apache):	 Started nodo1
  * Clone Set: WebData-clone [WebData] (promotable):
    * Masters: [ nodo1 ]
    * Slaves: [ nodo2 ]
  * WebFS	(ocf::heartbeat:Filesystem):	 Started nodo1

Daemon Status:
  corosync: active/enabled
  pacemaker: active/enabled
  pcsd: active/enabled
```

En local añadimos una entrada nameserver en `/etc/resolv.conf` para que resuelva el nombre del clúster:

    nameserver {ip dns} 

![HA](/img/SRI+HLC/HASRI9.png)

![HA](/img/SRI+HLC/HASRI9-2.png)

En ambos nodos instalamos MariaDB:

```bash
sudo apt install mariadb-server -y
```

**NODO 1**

Paramos el servicio de MariaDB:

```bash
sudo systemctl stop mariadb
```

Luego configuramos el clúster de Galera MariaDB:

```bash
sudo nano /etc/mysql/mariadb.conf.d/60-galera.cnf
```

```bash
[galera]
wsrep_on=1
wsrep_cluster_name="MariaDB Galera Cluster"
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address="gcomm://10.1.1.101,10.1.1.102"
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2

bind-address=0.0.0.0
wsrep_node_address=10.1.1.101
```

Creamos el cluster:

```bash
galera_new_cluster
```

Iniciamos el servicio de MariaDB:

```bash
sudo systemctl start mariadb
```

Nos conectamos y comprobamos que el clúster está funcionando:

    mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'"

```bash
root@nodo1:~# mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'"
Enter password: 
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| wsrep_cluster_size | 1     |
+--------------------+-------+
root@nodo1:~# 
```

**NODO 2**

Paramos el servicio de MariaDB:

```bash
sudo systemctl stop mariadb
```

Luego configuramos el clúster de Galera MariaDB:

```bash
sudo nano /etc/mysql/mariadb.conf.d/60-galera.cnf
```

```bash
[galera]
wsrep_on=1
wsrep_cluster_name="MariaDB Galera Cluster"
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address="gcomm://10.1.1.101,10.1.1.102"
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2

bind-address=0.0.0.0
wsrep_node_address=10.1.1.102
```

Iniciamos el servicio de MariaDB:

```bash
sudo systemctl start mariadb
```

No es necesario crear el cluster, ya que el nodo 1 ya lo ha creado.

Nos conectamos y comprobamos que el clúster está funcionando:

    mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'"

```bash
root@nodo2:~# mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'"
Enter password: 
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| wsrep_cluster_size | 2     |
+--------------------+-------+
```

**WORDPRESS**

En el nodo 1, por ejemplo, creamos la base de datos junto con el usuario y contraseña:

```bash
CREATE DATABASE wordpress;
CREATE USER wordpress IDENTIFIED BY 'wordpress';
GRANT ALL PRIVILEGES ON wordpress.* TO wordpress;
```

Instalamos el paquete de wordpress dentro de `/var/www/html`:

```bash
wget https://es.wordpress.org/latest-es_ES.tar.gz
```

Descomprimimos el paquete y cambiaremos el propietario de la carpeta wordpress a www-data:

```bash
tar -xzvf latest-es_ES.tar.gz
chown -R www-data: wordpress/
```


## Entrega

### 1. Una vez pasada la receta. La salida del comando pcs status.

![HA](/img/SRI+HLC/HASRI9-3.png)

### 2. Antes de instalar wordpress: una captura de pantalla donde se ve accediendo a index.php (se accede a nodo1). Apaga el nodo1 y vuelve a entregar un pantallazo a index.php. Muestra que accede a nodo2.

![HA](/img/SRI+HLC/HASRI9-4.gif)

### 3. Antes de instalar WordPress una demostración de que el clúster de Galera MariaDB tiene dos nodos.

![HA](/img/SRI+HLC/HASRI9-5.png)

### 4. Pantallazo donde se ve el wordpress instalado con un post creado.

![HA](/img/SRI+HLC/HASRI9-6.png)

### 5. Demuestra al profesor que apagando un nodo el WordPress sigue funcionando.

![HA](/img/SRI+HLC/HASRI9-7.gif)


## Cluster de HA activo-activo

Siguiendo las instrucciones que encuentras en el escenario 7: 07-HA-IPFailover-Apache2+DRBD+GFS2 convierte el clúster en activo-activo. Es necesario instalar el fencing para que el clúster funcione de manera adecuada. Nota: Tienes que tener en cuenta que se va a formatear de nuevo el drbd, por lo que se va a perder el wordpress. Si quieres puedes guardarlo en otro directorio, para luego recuperarlo.

Una vez que el clúster este configurado como activo-activo y WordPress esté funcionado, configura un método de balanceo de carga:

* Balanceo por DNS: Podríamos quitar el recurso VirtualIP y hacer un balanceo de carga por DNS como vimos en el escenario 1 (1 punto) o el escenario 2 (2 puntos).
* Añadir un balanceador de carga HAProxy (que balancee la carga entre los dos servidores web) (2 puntos).
* Podrías instalar un HAProxy en los dos nodos y crear un recurso del clúster para que los controle. Para ello habría que crear un recurso con pacemaker para controlar los balanceadores de carga (el recurso se llama systemd:happroxy). Puedes seguir de base el artículo How to setup highly available Pacemaker/Corosync cluster with HAProxy load balancer (3 puntos).

Instalamos gfs2 en los dos nodos:

```bash
sudo apt-get install gfs2-utils dlm-controld
```

Después, creamos un recurso para el sistema de archivos gfs2 en el nodo 1 y lo clonamos:

```bash
pcs cluster cib dlm_cfg
pcs -f dlm_cfg resource create dlm ocf:pacemaker:controld op monitor interval=60s
pcs -f dlm_cfg resource clone dlm clone-max=2 clone-node-max=1
pcs cluster cib-push dlm_cfg --config
```

En el nodo 2 comprobamos que el recurso se ha creado:

```bash
pcs status
```

Desactivamos el sistema de archivos del ejercicio anterior en nodo 1:

```bash
pcs resource disable WebFS
```

Formateamos el disco en el nodo 1:

```bash
mkfs.gfs2 -p lock_dlm -j 2 -t mycluster:web /dev/drbd1
```







## Entrega

### 1. Una vez configurado el clúster activo-activo: la salida del comando pcs status.

![HA](/img/SRI+HLC/HASRI9-8.png)

### 2. Una prueba de funcionamiento donde se compruebe que el stonith_ se ha configurado de forma correcta.

<!-- ![HA](/img/SRI+HLC/HASRI9-9.png) -->

### 3. Pantallazo donde se vea el wordpress instalado con un post creado.
### 4. Demuestra al profesor el balanceo de carga que has desarrollado.