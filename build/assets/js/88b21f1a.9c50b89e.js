"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[2087],{3905:(e,n,a)=>{a.d(n,{Zo:()=>p,kt:()=>m});var r=a(7294);function t(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){t(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function i(e,n){if(null==e)return{};var a,r,t=function(e,n){if(null==e)return{};var a,r,t={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var l=r.createContext({}),c=function(e){var n=r.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):s(s({},n),e)),a},p=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var a=e.components,t=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(a),m=t,v=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return a?r.createElement(v,s(s({ref:n},p),{},{components:a})):r.createElement(v,s({ref:n},p))}));function m(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var o=a.length,s=new Array(o);s[0]=u;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:t,s[1]=i;for(var c=2;c<o;c++)s[c]=a[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},1356:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=a(7462),t=(a(7294),a(3905));const o={sidebar_position:25},s="Redes Privadas Virtuales",i={unversionedId:"Tasks/vpn",id:"Tasks/vpn",title:"Redes Privadas Virtuales",description:"Procedimiento",source:"@site/docs/Tasks/vpn.md",sourceDirName:"Tasks",slug:"/Tasks/vpn",permalink:"/docs/Tasks/vpn",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/vpn.md",tags:[],version:"current",sidebarPosition:25,frontMatter:{sidebar_position:25},sidebar:"tutorialSidebar",previous:{title:"Despliegue de aplicaciones python",permalink:"/docs/Tasks/despliegue_python"},next:{title:"Markdown Features",permalink:"/docs/Tasks/markdown-features"}},l={},c=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Entrega",id:"entrega",level:2},{value:"VPN de acceso remoto con OpenVPN y certificados x509",id:"vpn-de-acceso-remoto-con-openvpn-y-certificados-x509",level:3},{value:"Escenario",id:"escenario",level:4},{value:"server",id:"server",level:4},{value:"client",id:"client",level:4},{value:"maquina1",id:"maquina1",level:4},{value:"Comprobaci\xf3n",id:"comprobaci\xf3n",level:4},{value:"VPN de acceso remoto con WireGuard",id:"vpn-de-acceso-remoto-con-wireguard",level:3},{value:"VPN de acceso remoto con WireGuard",id:"vpn-de-acceso-remoto-con-wireguard-1",level:3},{value:"VPN sitio a sitio con WireGuard",id:"vpn-sitio-a-sitio-con-wireguard",level:3}],p={toc:c};function d(e){let{components:n,...o}=e;return(0,t.kt)("wrapper",(0,r.Z)({},p,o,{components:n,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"redes-privadas-virtuales"},"Redes Privadas Virtuales"),(0,t.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"A) VPN de acceso remoto con OpenVPN y certificados x509 (5 puntos)")),(0,t.kt)("p",null,"Configura una conexi\xf3n VPN de acceso remoto entre dos equipos del cloud:"),(0,t.kt)("p",null,"\u2022 Uno de los dos equipos (el que actuar\xe1 como servidor) estar\xe1 conectado a dos redes\n\u2022 Para la autenticaci\xf3n de los extremos se usar\xe1n obligatoriamente certificados digitales, que se generar\xe1n utilizando openssl y se almacenar\xe1n en el directorio /etc/openvpn, junto con  los par\xe1metros Diffie-Helman y el certificado de la propia Autoridad de Certificaci\xf3n.\n\u2022 Se utilizar\xe1n direcciones de la red 10.99.99.0/24 para las direcciones virtuales de la VPN. La direcci\xf3n 10.99.99.1 se asignar\xe1 al servidor VPN.\n\u2022 Los ficheros de configuraci\xf3n del servidor y del client se crear\xe1n en el directorio /etc/openvpn de cada m\xe1quina, y se llamar\xe1n servidor.conf y client.conf respectivamente.\n\u2022 Tras el establecimiento de la VPN, la m\xe1quina client debe ser capaz de acceder a una m\xe1quina que est\xe9 en la otra red a la que est\xe1 conectado el servidor.\nDocumenta el proceso detalladamente."),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"B) VPN sitio a sitio con OpenVPN y certificados x509 (10 puntos)")),(0,t.kt)("p",null,"Configura una conexi\xf3n VPN sitio a sitio entre dos equipos del cloud:"),(0,t.kt)("p",null,"\u2022 Cada equipo estar\xe1 conectado a dos redes, una de ellas en com\xfan\n\u2022 Para la autenticaci\xf3n de los extremos se usar\xe1n obligatoriamente certificados digitales, que se generar\xe1n utilizando openssl y se almacenar\xe1n en el directorio /etc/openvpn, junto con con los par\xe1metros Diffie-Helman y el certificado de la propia Autoridad de Certificaci\xf3n.\n\u2022 Se utilizar\xe1n direcciones de la red 10.99.99.0/24 para las direcciones virtuales de la VPN.\n\u2022 Tras el establecimiento de la VPN, una m\xe1quina de cada red detr\xe1s de cada servidor VPN debe ser capaz de acceder a una m\xe1quina del otro extremo.\nDocumenta el proceso detalladamente."),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"C) VPN de acceso remoto con WireGuard (5 puntos)")),(0,t.kt)("p",null,"Monta una VPN de acceso remoto usando Wireguard. Intenta probarla con clients Windows, Linux y Android. Documenta el proceso adecuadamente y comp\xe1ralo con el del apartado A."),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"D) VPN sitio a sitio con WireGuard (10 puntos)")),(0,t.kt)("p",null,"Configura una VPN sitio a sitio usando WireGuard. Documenta el proceso adecuadamente y comp\xe1ralo con el del apartado B."),(0,t.kt)("p",null,"Extra 1) VPN de acceso remoto con Ipsec (5 puntos)"),(0,t.kt)("p",null,"Elige una aplicaci\xf3n por software (por ejemplo, FreeS/Wan) y monta la configuraci\xf3n. Documenta el proceso detalladamente."),(0,t.kt)("p",null,"Extra 2) VPN sitio a sitio con IPsec (10 puntos)"),(0,t.kt)("p",null,"Montando el escenario en GNS3 usando routers CISCO o con una aplicaci\xf3n por software (por ejemplo, FreeS/Wan) despliega la configuraci\xf3n solicitada. Documenta el proceso detalladamente."),(0,t.kt)("h2",{id:"entrega"},"Entrega"),(0,t.kt)("h3",{id:"vpn-de-acceso-remoto-con-openvpn-y-certificados-x509"},"VPN de acceso remoto con OpenVPN y certificados x509"),(0,t.kt)("h4",{id:"escenario"},"Escenario"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-vagrantfile"},'Vagrant.configure("2") do |config|\n\nconfig.vm.synced_folder ".", "/vagrant", disabled: true\n\n  config.vm.provider :libvirt do |libvirt|\n    libvirt.cpus = 1\n    libvirt.memory = 512\n  end\n\n  config.vm.define :client do |client|\n    client.vm.box = "debian/bullseye64"\n    client.vm.hostname = "client"\n    client.vm.network :private_network,\n      :libvirt__network_name => "externa",\n      :libvirt__dhcp_enabled => false,\n      :ip => "192.168.22.15",\n      :libvirt__netmask => \'255.255.255.0\',\n      :libvirt__forward_mode => "veryisolated"\n  end\n\n  config.vm.define :server do |server|\n    server.vm.box = "debian/bullseye64"\n    server.vm.hostname = "server"\n    server.vm.network :private_network,\n      :libvirt__network_name => "externa",\n      :libvirt__dhcp_enabled => false,\n      :ip => "192.168.22.17",\n      :libvirt__netmask => \'255.255.255.0\',\n      :libvirt__forward_mode => "veryisolated"\n    server.vm.network :private_network,\n      :libvirt__network_name => "interna-vpn",\n      :libvirt__dhcp_enabled => false,\n      :ip => "172.22.0.5",\n      :libvirt__netmask => \'255.255.255.0\',\n      :libvirt__forward_mode => "veryisolated"\n  end\n\n  config.vm.define :maquina1 do |maquina1|\n    maquina1.vm.box = "debian/bullseye64"\n    maquina1.vm.hostname = "maquina1"\n    maquina1.vm.network :private_network,\n      :libvirt__network_name => "interna-vpn",\n      :libvirt__dhcp_enabled => false,\n      :ip => "172.22.0.7",\n      :libvirt__netmask => \'255.255.255.0\',\n      :libvirt__forward_mode => "veryisolated"\n  end\n\nend\n')),(0,t.kt)("h4",{id:"server"},"server"),(0,t.kt)("p",null,"Instalamos openvpn:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"apt install openvpn\n")),(0,t.kt)("p",null,"Y habilitamos el bit de forwarding:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"echo 1 > /proc/sys/net/ipv4/ip_forward\n")),(0,t.kt)("p",null,"A continuaci\xf3n, copiamos el fichero de configuraci\xf3n del servidor de /usr/share/easy-rsa a /etc/openvpn, ya que es el directorio donde se van a guardar los ficheros de configuraci\xf3n de openvpn y de esta manera se convierte en el directorio por defecto en el que se buscan los ficheros de configuraci\xf3n:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo cp -r /usr/share/easy-rsa /etc/openvpn\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"root@server:/etc/openvpn# ls\n\nclient  easy-rsa  server  update-resolv-conf\n")),(0,t.kt)("p",null,"Despu\xe9s, inicializamos el PKI de openvpn, que es el sistema de certificados que vamos a utilizar para generar la clave p\xfablica y privada del servidor:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo ./easyrsa init-pki\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"root@server:/etc/openvpn/easy-rsa# ./easyrsa init-pki\n\ninit-pki complete; you may now create a CA or requests.\nYour newly created PKI dir is: /etc/openvpn/easy-rsa/pki\n\n")),(0,t.kt)("p",null,"Lo siguiente ser\xe1 la creaci\xf3n de la CA, que es el certificado que va a firmar los certificados de los clientes y del servidor:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo ./easyrsa build-ca\n")),(0,t.kt)("p",null,"Al ejecutarlo obtenemos la siguiente salida en la que pide un passphrase para la CA(nazareth) y un Common Name (CN) para la CA(nazarethCA):"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"root@server:/etc/openvpn/easy-rsa# ./easyrsa build-ca\nUsing SSL: openssl OpenSSL 1.1.1n  15 Mar 2022\n\nEnter New CA Key Passphrase: \nRe-Enter New CA Key Passphrase: \nGenerating RSA private key, 2048 bit long modulus (2 primes)\n.......................................+++++\n........+++++\ne is 65537 (0x010001)\nYou are about to be asked to enter information that will be incorporated\ninto your certificate request.\nWhat you are about to enter is what is called a Distinguished Name or a DN.\nThere are quite a few fields but you can leave some blank\nFor some fields there will be a default value,\nIf you enter '.', the field will be left blank.\n-----\nCommon Name (eg: your user, host, or server name) [Easy-RSA CA]:nazarethCA\n\nCA creation complete and you may now import and sign cert requests.\nYour new CA certificate file for publishing is at:\n/etc/openvpn/easy-rsa/pki/ca.crt\n")),(0,t.kt)("p",null,"La clave generada se guarda en /etc/openvpn/easy-rsa/pki/private/ca.key y el certificado en /etc/openvpn/easy-rsa/pki/ca.crt."),(0,t.kt)("p",null,"Generamos el certificado y la clave del servidor diffie-hellman, que es un algoritmo que se utiliza para generar claves de cifrado de forma segura:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo ./easyrsa gen-dh\n")),(0,t.kt)("p",null,"Con salida similar a la siguiente:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"root@server:/etc/openvpn/easy-rsa# ./easyrsa gen-dh\nUsing SSL: openssl OpenSSL 1.1.1n  15 Mar 2022\nGenerating DH parameters, 2048 bit long safe prime, generator 2\nThis is going to take a long time\n........................................................................+....................................................................................................................................................+...............................+.................................................+....................+......................................................................................................................................................................................+..........................................................................................+...............................................................+............................................................................................................................................................................+.........................................................................................................................................................................+...........................................................................................................................................................................................................+...........................................................................................................................................................................................................................................................................................+.....................................................................................+..................+..............................................+.......+.................................................................................................................................................................................................................+......+..............................................................................................++*++*++*++*\n\nDH parameters of size 2048 created at /etc/openvpn/easy-rsa/pki/dh.pem\n")),(0,t.kt)("p",null,"Generamos el certificado y la clave del cliente VPN:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo ./easyrsa build-client-full client nopass\n")),(0,t.kt)("p",null,"Obtenemos la siguiente salida:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"root@server:/etc/openvpn/easy-rsa# ./easyrsa build-client-full client nopass\n\nUsing SSL: openssl OpenSSL 1.1.1n  15 Mar 2022\nGenerating a RSA private key\n..........+++++\n..................................+++++\nwriting new private key to '/etc/openvpn/easy-rsa/pki/easy-rsa-2143.TYQit1/tmp.C8dJPm'\n-----\nUsing configuration from /etc/openvpn/easy-rsa/pki/easy-rsa-2143.TYQit1/tmp.Btnfcu\nEnter pass phrase for /etc/openvpn/easy-rsa/pki/private/ca.key:\nCheck that the request matches the signature\nSignature ok\nThe Subject's Distinguished Name is as follows\ncommonName            :ASN.1 12:'client'\nCertificate is to be certified until Apr 29 22:36:37 2025 GMT (825 days)\n\nWrite out database with 1 new entries\nData Base Updated\n")),(0,t.kt)("p",null,"Se almacenar\xe1 el certificado en /etc/openvpn/easy-rsa/pki/issued/client.crt y la clave en /etc/openvpn/easy-rsa/pki/private/client.key."),(0,t.kt)("p",null,"Pasamos los ficheros al cliente VPN para que pueda conectarse al servidor:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo cp -rp /etc/openvpn/easy-rsa/pki/ca.crt ~\nsudo cp -rp /etc/openvpn/easy-rsa/pki/issued/client.crt ~\nsudo cp -rp /etc/openvpn/easy-rsa/pki/private/client.key ~\n")),(0,t.kt)("p",null,"Y cambiamos el propietario de los ficheros para que el usuario cliente pueda acceder a ellos al hacer scp:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo chown vagrant: ~/ca.crt\nsudo chown vagrant: ~/client.crt\nsudo chown vagrant: ~/client.key\n")),(0,t.kt)("p",null,"Generamos una clave ssh en el servidor para que el cliente pueda conectarse por ssh:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"ssh-keygen\n")),(0,t.kt)("p",null,"Y la copiamos al cliente:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"cat ~/.ssh/id_rsa.pub\n")),(0,t.kt)("p",null,"Pasamos al cliente los ficheros:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"scp ~/ca.crt vagrant@192.168.22.15:/home/vagrant\nscp ~/client.crt vagrant@192.168.22.15:/home/vagrant\nscp ~/client.key vagrant@192.168.22.15:/home/vagrant\n")),(0,t.kt)("p",null,"Configuramos el servidor VPN copiando el fichero de configuraci\xf3n de ejemplo de openvpn:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf /etc/openvpn/server/servidor.conf\n")),(0,t.kt)("p",null,"Modificamos el fichero de configuraci\xf3n del servidor para que quede de la siguiente forma:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},'port 1194\nproto udp\ndev tun\n\nca /etc/openvpn/easy-rsa/pki/ca.crt\ncert /etc/openvpn/easy-rsa/pki/issued/client.crt\nkey /etc/openvpn/easy-rsa/pki/private/client.key\ndh /etc/openvpn/easy-rsa/pki/dh.pem\n\ntopology subnet\n\n# Configure server mode and supply a VPN subnet\n# for OpenVPN to draw client addresses from.\n# The server will take 10.8.0.1 for itself,\n# the rest will be made available to clients.\n# Each client will be able to reach the server\n# on 10.8.0.1. Comment this line out if you are\n# ethernet bridging. See the man page for more info.\n#Configuraci\xf3n del tunel donde la ip del servidor: 10.99.99.1\nserver 10.99.99.0 255.255.255.0 \nifconfig-pool-persist /var/log/openvpn/ipp.txt\n\npush "route 172.22.0.0 255.255.255.0" #IP de la red interna\n\nkeepalive 10 120\ncipher AES-256-CBC\npersist-key\npersist-tun\nstatus /var/log/openvpn/openvpn-status.log\nverb 3\nexplicit-exit-notify 1\n')),(0,t.kt)("p",null,"Inicializamos el servicio de openvpn:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl enable --now openvpn-server@servidor\n")),(0,t.kt)("p",null,"Obteniendo de resultado:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"vagrant@server:~$ sudo systemctl enable --now openvpn-server@servidor\n\nCreated symlink /etc/systemd/system/multi-user.target.wants/openvpn-server@servidor.service \u2192 /lib/systemd/system/openvpn-server@.service.\n")),(0,t.kt)("p",null,"Y comprobamos que el servicio est\xe1 activo:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl status openvpn-server@servidor\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"vpn",src:a(9412).Z,width:"1511",height:"604"})),(0,t.kt)("h4",{id:"client"},"client"),(0,t.kt)("p",null,"Instalamos openvpn en el cliente:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install openvpn\n")),(0,t.kt)("p",null,"Y movemos los ficheros de configuraci\xf3n a la carpeta /etc/openvpn/client para que el cliente pueda conectarse al servidor y cambiamos el propietario de los ficheros:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo mv ~/ca.crt /etc/openvpn/client\nsudo mv ~/client.crt /etc/openvpn/client\nsudo mv ~/client.key /etc/openvpn/client\n\nsudo chown root: /etc/openvpn/client/*\n")),(0,t.kt)("p",null,"Configuramos el cliente VPN copiando el fichero de configuraci\xf3n de ejemplo de openvpn:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo cp /usr/share/doc/openvpn/examples/sample-config-files/client.conf /etc/openvpn/client/cliente.conf\n")),(0,t.kt)("p",null,"Modificamos el fichero de configuraci\xf3n del cliente para que quede de la siguiente forma:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"client\ndev tun\nproto udp\n\nremote 192.168.22.17 1194 #IP del servidor\nresolv-retry infinite\nnobind\n\npersist-key\npersist-tun\n\nca /etc/openvpn/client/ca.crt\ncert /etc/openvpn/client/client.crt\nkey /etc/openvpn/client/client.key\n\nremote-cert-tls server\ncipher AES-256-CBC\nverb 3\n")),(0,t.kt)("p",null,"Habilitamos el servicio de openvpn:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl enable --now openvpn-client@cliente\n")),(0,t.kt)("p",null,"Obteniendo de resultado:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"vagrant@client:~$ sudo systemctl enable --now openvpn-client@cliente\n\nCreated symlink /etc/systemd/system/multi-user.target.wants/openvpn-client@cliente.service \u2192 /lib/systemd/system/openvpn-client@.service.\n")),(0,t.kt)("p",null,"Y comprobamos que el servicio est\xe1 activo:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl status openvpn-client@cliente\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"vpn",src:a(8499).Z,width:"1014",height:"606"})),(0,t.kt)("h4",{id:"maquina1"},"maquina1"),(0,t.kt)("p",null,"En esta m\xe1quina cambiamos las rutas por defecto para que todas las peticiones que se hagan por la red interna pasen por el servidor VPN y no por el router, colocando la ip de la red interna del servidor VPN como puerta de enlace:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo ip route del default\nsudo ip route add default via 172.22.0.5\n")),(0,t.kt)("h4",{id:"comprobaci\xf3n"},"Comprobaci\xf3n"),(0,t.kt)("p",null,"Desde la m\xe1quina client hacemos una petici\xf3n a la m\xe1quina1:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"")),(0,t.kt)("p",null,"Tambi\xe9n a la maquina server:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"")),(0,t.kt)("h3",{id:"vpn-de-acceso-remoto-con-wireguard"},"VPN de acceso remoto con WireGuard"),(0,t.kt)("h3",{id:"vpn-de-acceso-remoto-con-wireguard-1"},"VPN de acceso remoto con WireGuard"),(0,t.kt)("h3",{id:"vpn-sitio-a-sitio-con-wireguard"},"VPN sitio a sitio con WireGuard"))}d.isMDXComponent=!0},8499:(e,n,a)=>{a.d(n,{Z:()=>r});const r=a.p+"assets/images/vpnSAD-2-442439fbaa25fd8c5e4fa87b81de485d.png"},9412:(e,n,a)=>{a.d(n,{Z:()=>r});const r=a.p+"assets/images/vpnSAD-07b325977420302735f7794f18439e59.png"}}]);