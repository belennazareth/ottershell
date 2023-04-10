"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[8673],{3905:(e,a,n)=>{n.d(a,{Zo:()=>u,kt:()=>m});var r=n(67294);function t(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function i(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?i(Object(n),!0).forEach((function(a){t(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function o(e,a){if(null==e)return{};var n,r,t=function(e,a){if(null==e)return{};var n,r,t={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],a.indexOf(n)>=0||(t[n]=e[n]);return t}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}var s=r.createContext({}),c=function(e){var a=r.useContext(s),n=a;return e&&(n="function"==typeof e?e(a):l(l({},a),e)),n},u=function(e){var a=c(e.components);return r.createElement(s.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},p=r.forwardRef((function(e,a){var n=e.components,t=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=c(n),m=t,b=p["".concat(s,".").concat(m)]||p[m]||d[m]||i;return n?r.createElement(b,l(l({ref:a},u),{},{components:n})):r.createElement(b,l({ref:a},u))}));function m(e,a){var n=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var i=n.length,l=new Array(i);l[0]=p;var o={};for(var s in a)hasOwnProperty.call(a,s)&&(o[s]=a[s]);o.originalType=e,o.mdxType="string"==typeof e?e:t,l[1]=o;for(var c=2;c<i;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},40213:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=n(87462),t=(n(67294),n(3905));const i={sidebar_position:10},l="Virtualizaci\xf3n en Linux",o={unversionedId:"Tasks/virtualizacion_linux",id:"Tasks/virtualizacion_linux",title:"Virtualizaci\xf3n en Linux",description:"Vamos a crear una m\xe1quina virtual por medio de un script.",source:"@site/docs/Tasks/virtualizacion_linux.md",sourceDirName:"Tasks",slug:"/Tasks/virtualizacion_linux",permalink:"/docs/Tasks/virtualizacion_linux",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/virtualizacion_linux.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Peticiones HTTP",permalink:"/docs/Tasks/peticion_http"},next:{title:"VirtualHosting con Apache",permalink:"/docs/Tasks/virtualhosting_apache"}},s={},c=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Creaci\xf3n de la imagen base",id:"creaci\xf3n-de-la-imagen-base",level:3},{value:"Script de creaci\xf3n de MV",id:"script-de-creaci\xf3n-de-mv",level:3},{value:"1. Entrega la URL del repositorio GitHub donde has alojado el proyecto.",id:"1-entrega-la-url-del-repositorio-github-donde-has-alojado-el-proyecto",level:2},{value:"2. Indica los pasos que has realizado para la creaci\xf3n de la imagen base.",id:"2-indica-los-pasos-que-has-realizado-para-la-creaci\xf3n-de-la-imagen-base",level:2},{value:"3. Entrega la clave privada que has utilizado y un enlace para descargarme la imagen base.",id:"3-entrega-la-clave-privada-que-has-utilizado-y-un-enlace-para-descargarme-la-imagen-base",level:2},{value:"4. Ejecuta el script y cuando se pause. Entrega pantallazo donde se compruebe que se puede acceder al servidor web en la maquina1.",id:"4-ejecuta-el-script-y-cuando-se-pause-entrega-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-en-la-maquina1",level:2},{value:"5. Al finalizar el script: pantallazo donde se compruebe que se puede acceder al servidor web con la IP p\xfablica.",id:"5-al-finalizar-el-script-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-con-la-ip-p\xfablica",level:2},{value:"6. Al finalizar el script: Pantallazos para comprobar:",id:"6-al-finalizar-el-script-pantallazos-para-comprobar",level:2},{value:"- Que la m\xe1quina tiene montado un disco en el directorio /var/www/html.",id:"--que-la-m\xe1quina-tiene-montado-un-disco-en-el-directorio-varwwwhtml",level:3},{value:"- Que la m\xe1quina tiene 2G de RAM.",id:"--que-la-m\xe1quina-tiene-2g-de-ram",level:3},{value:"- Que accediendo a la m\xe1quina puedes acceder al contenedor.",id:"--que-accediendo-a-la-m\xe1quina-puedes-acceder-al-contenedor",level:3},{value:"- Que se ha ha creado un snapshot.",id:"--que-se-ha-ha-creado-un-snapshot",level:3}],u={toc:c};function d(e){let{components:a,...i}=e;return(0,t.kt)("wrapper",(0,r.Z)({},u,i,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"virtualizaci\xf3n-en-linux"},"Virtualizaci\xf3n en Linux"),(0,t.kt)("p",null,"Vamos a crear una m\xe1quina virtual por medio de un script."),(0,t.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,t.kt)("h3",{id:"creaci\xf3n-de-la-imagen-base"},"Creaci\xf3n de la imagen base"),(0,t.kt)("p",null,"Vamos a crear una imagen base que utilizaremos para la creaci\xf3n de la m\xe1quina que utilizaremos en la pr\xe1ctica. Para ello:"),(0,t.kt)("ol",null,(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Crea con ",(0,t.kt)("inlineCode",{parentName:"p"},"virt-install")," una imagen de Debian Bullseye con formato qcow2 y un tama\xf1o m\xe1ximo de 3GiB. Esta imagen se denominar\xe1 ",(0,t.kt)("inlineCode",{parentName:"p"},"bullseye-base.qcow2"),". El sistema de ficheros del sistema instalado en esta imagen ser\xe1 XFS. La imagen debe estar configurada para poder usar hasta dos interfaces de red por dhcp. El usuario debian con contrase\xf1a debian puede utilizar sudo sin contrase\xf1a.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Crea un par de claves ssh en formato ecdsa y sin frase de paso y agrega la clave p\xfablica al usuario debian.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Utiliza la herramienta virt-sparsify para reducir al m\xe1ximo el tama\xf1o de la imagen.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Sube la imagen base a alguna ubicaci\xf3n p\xfablica desde la que se pueda descargar."))),(0,t.kt)("p",null,"Cuando hayas finalizado puedes borrar la m\xe1quina creada. Lo que nos interesa es la imagen bullseye-base.qcow2 que has creado."),(0,t.kt)("h3",{id:"script-de-creaci\xf3n-de-mv"},"Script de creaci\xf3n de MV"),(0,t.kt)("p",null,"Escribe un shell script que ejecutado por un usuario con acceso a qemu:///system realice los siguientes pasos:"),(0,t.kt)("ol",null,(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Crea una imagen nueva, que utilice bullseye-base.qcow2 como imagen base y tenga 5 GiB de tama\xf1o m\xe1ximo. Esta imagen se denominar\xe1 maquina1.qcow2.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Crea una red interna de nombre intra con salida al exterior mediante NAT que utilice el direccionamiento 10.10.20.0/24.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Crea una m\xe1quina virtual (maquina1) conectada a la red intra, con 1 GiB de RAM, que utilice como disco ra\xedz maquina1.qcow2 y que se inicie autom\xe1ticamente. Arranca la m\xe1quina. Modifica el fichero /etc/hostname con maquina1.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Crea un volumen adicional de 1 GiB de tama\xf1o en formato RAW ubicado en el pool por defecto")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Una vez iniciada la MV maquina1, conecta el volumen a la m\xe1quina, crea un sistema de ficheros XFS en el volumen y m\xf3ntalo en el directorio /var/www/html. Ten cuidado con los propietarios y grupos que pongas, para que funcione adecuadamente el siguiente punto.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Instala en maquina1 el servidor web apache2. Copia un fichero index.html a la m\xe1quina virtual.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Muestra por pantalla la direcci\xf3n IP de m\xe1quina1. Pausa el script y comprueba que puedes acceder a la p\xe1gina web.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Instala LXC y crea un linux container llamado container1.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"A\xf1ade una nueva interfaz a la m\xe1quina virtual para conectarla a la red p\xfablica (al punte br0).")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Muestra la nueva IP que ha recibido.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Apaga maquina1 y aum\xe9ntale la RAM a 2 GiB y vuelve a iniciar la m\xe1quina.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Crea un snapshot de la m\xe1quina virtual."))),(0,t.kt)("p",null,"Se valorara la limpieza del c\xf3digo, los comentarios, la utilizaci\xf3n adecuada de variables, portabilidad (es decir, que no dependa de directorios concretos y se pueda ejecutar en cualquier equipo), si se hacen comprobaciones antes de realizar una acci\xf3n,\u2026"),(0,t.kt)("p",null,"Alternativamente se puede entregar la tarea sin hacer el script, describiendo paso a paso la secuencia de comandos a ejecutar. En este caso la nota de la tarea ser\xe1 inferior."),(0,t.kt)("h2",{id:"1-entrega-la-url-del-repositorio-github-donde-has-alojado-el-proyecto"},"1. Entrega la URL del repositorio GitHub donde has alojado el proyecto."),(0,t.kt)("p",null,(0,t.kt)("a",{parentName:"p",href:"https://github.com/belennazareth/linux_virt"},"https://github.com/belennazareth/linux_virt")," "),(0,t.kt)("h2",{id:"2-indica-los-pasos-que-has-realizado-para-la-creaci\xf3n-de-la-imagen-base"},"2. Indica los pasos que has realizado para la creaci\xf3n de la imagen base."),(0,t.kt)("p",null,"Primero ser\xe1 necesario crear una red para cada interfaz de red que queramos utilizar. Para ello, hay que crear dos ficheros ",(0,t.kt)("inlineCode",{parentName:"p"},".xml")," (se guardan autom\xe1ticamente en ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/libvirt/qemu/networks/"),") con el siguiente contenido"),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"red1.xml:")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<network>\n  <name>red1</name>\n  <bridge name='virbr-red1'/>\n  <forward/>\n  <ip address='192.168.123.1' netmask='255.255.255.0'>\n    <dhcp>\n      <range start='192.168.123.2' end='192.168.123.254'/>\n    </dhcp>\n  </ip>\n</network>\n")),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"red2.xml:")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<network>\n  <name>red2</name>\n  <bridge name='virbr-red2'/>\n  <forward/>\n  <ip address='192.168.124.1' netmask='255.255.255.0'>\n    <dhcp>\n      <range start='192.168.124.2' end='192.168.124.254'/>\n    </dhcp>\n  </ip>\n</network>\n")),(0,t.kt)("p",null,"Y las activamos:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system net-define red1.xml\nvirsh -c qemu:///system net-define red2.xml\n\nvirsh -c qemu:///system net-start red1\nvirsh -c qemu:///system net-start red2\n")),(0,t.kt)("p",null,"Para esto puedes utilizar el siguiente script:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virt-install --connect qemu:///system \\\n                         --virt-type kvm \\\n                         --name bullseye-base \\\n                         --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso \\\n                         --os-variant debian10 \\\n                         --network network=red1 \\\n                         --network network=red2 \\\n                         --disk size=3 \\\n                         --memory 2048 \\\n                         --vcpus 2\n")),(0,t.kt)("p",null,"Durante la instalaci\xf3n se selecciona XFS como sistema de ficheros y se crea el usuario debian con contrase\xf1a debian:"),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"virt",src:n(51396).Z,width:"820",height:"682"})),(0,t.kt)("p",null,"Metemos al usuario dentro de sudoers para que pueda utilizar sudo sin contrase\xf1a:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},'echo "debian ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers\n')),(0,t.kt)("p",null,"Para que se realice DHCP en las dos interfaces de red, hay que editar el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/network/interfaces")," y a\xf1adir las siguientes l\xedneas:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"auto enp1s0\niface enp1s0 inet dhcp\n\nauto enp2s0\niface enp2s0 inet dhcp\n")),(0,t.kt)("p",null,"Para generar la clave privada y p\xfablica usamos el comando ",(0,t.kt)("inlineCode",{parentName:"p"},"ssh-keygen"),":"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"ssh-keygen -t ecdsa\n")),(0,t.kt)("p",null,"Una vez generadas, copiamos la clave p\xfablica al usuario debian:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@ThousandSunny :~$ ssh-copy-id -i virt.pub debian@192.168.124.204 \n")),(0,t.kt)("p",null,"Y la probamos ingresando a la m\xe1quina de la siguiente forma:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@ThousandSunny :~$ ssh -i virt debian@{ip}\n")),(0,t.kt)("p",null,"Para reducir la imagen la m\xe1quina debe estar apagada, por lo que primero la apagamos:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system shutdown bullseye-base\n")),(0,t.kt)("p",null,"He copiado la imagen a mi directorio home:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@ThousandSunny :~$ sudo cp /var/lib/libvirt/images/bullseye-base.qcow2 ~/home/nazare/\n")),(0,t.kt)("p",null,"Despu\xe9s, he cambiado el usuario de propietario de la imagen a mi usuario:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo chown nazare:nazare bullseye-base.qcow2\n")),(0,t.kt)("p",null,"Por \xfaltimo, he reducido el tama\xf1o de la imagen con ",(0,t.kt)("inlineCode",{parentName:"p"},"virt-sparsify"),":"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virt-sparsify bullseye-base.qcow2 bullseye-base-sparse.qcow2\n")),(0,t.kt)("p",null,"Cuya salida es la siguiente:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"}," nazare@ThousandSunny :~$ virt-sparsify bullseye-base.qcow2 bullseye-base-sparse.qcow2\n\n[   0.0] Create overlay file in /tmp to protect source disk\n[   0.0] Examine source disk\n 100% \u27e6\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u27e7 --:--\n[   6.8] Fill free space in /dev/sda1 with zero\n[   7.3] Clearing Linux swap on /dev/sda5\n[   8.5] Copy to destination and make sparse\n[  11.9] Sparsify operation completed with no errors.\nvirt-sparsify: Before deleting the old disk, carefully check that the \ntarget disk boots and works correctly.\n")),(0,t.kt)("h2",{id:"3-entrega-la-clave-privada-que-has-utilizado-y-un-enlace-para-descargarme-la-imagen-base"},"3. Entrega la clave privada que has utilizado y un enlace para descargarme la imagen base."),(0,t.kt)("p",null,"La clave se encuentra alojada en el repositorio de Github del ejercio 1, ",(0,t.kt)("a",{parentName:"p",href:"https://github.com/belennazareth/linux_virt/tree/main/keys"},"linux_virt")," y la imagen base se encuentra en el siguiente enlace: ",(0,t.kt)("a",{parentName:"p",href:"https://mega.nz/file/5iYE1QDY#94qGT8iHVpDCLK6b85XWsrJvlg-EJ77n2tUXBkuKYaw"},"Imagen base"),"."),(0,t.kt)("h2",{id:"4-ejecuta-el-script-y-cuando-se-pause-entrega-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-en-la-maquina1"},"4. Ejecuta el script y cuando se pause. Entrega pantallazo donde se compruebe que se puede acceder al servidor web en la maquina1."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"web",src:n(19019).Z,width:"1442",height:"528"})),(0,t.kt)("h2",{id:"5-al-finalizar-el-script-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-con-la-ip-p\xfablica"},"5. Al finalizar el script: pantallazo donde se compruebe que se puede acceder al servidor web con la IP p\xfablica."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"web2",src:n(62072).Z,width:"1575",height:"597"})),(0,t.kt)("h2",{id:"6-al-finalizar-el-script-pantallazos-para-comprobar"},"6. Al finalizar el script: Pantallazos para comprobar:"),(0,t.kt)("h3",{id:"--que-la-m\xe1quina-tiene-montado-un-disco-en-el-directorio-varwwwhtml"},"- Que la m\xe1quina tiene montado un disco en el directorio /var/www/html."),(0,t.kt)("p",null,(0,t.kt)("inlineCode",{parentName:"p"},"lsblk -f")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"lsblk",src:n(1711).Z,width:"1025",height:"491"})),(0,t.kt)("h3",{id:"--que-la-m\xe1quina-tiene-2g-de-ram"},"- Que la m\xe1quina tiene 2G de RAM."),(0,t.kt)("p",null,(0,t.kt)("inlineCode",{parentName:"p"},"free -h")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"free",src:n(97016).Z,width:"1022",height:"185"})),(0,t.kt)("h3",{id:"--que-accediendo-a-la-m\xe1quina-puedes-acceder-al-contenedor"},"- Que accediendo a la m\xe1quina puedes acceder al contenedor."),(0,t.kt)("p",null,(0,t.kt)("inlineCode",{parentName:"p"},"lxc attach container1")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"lxc",src:n(3046).Z,width:"1024",height:"290"})),(0,t.kt)("h3",{id:"--que-se-ha-ha-creado-un-snapshot"},"- Que se ha ha creado un snapshot."),(0,t.kt)("p",null,(0,t.kt)("inlineCode",{parentName:"p"},"ls -la | grep maquina1")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"snap",src:n(4004).Z,width:"844",height:"116"})))}d.isMDXComponent=!0},19019:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/virtHLC-2-798765e09e459fb4d9959d3a0aa334e9.png"},62072:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/virtHLC-3-7df307c5d04bad9db6791269758b3b3b.png"},1711:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/virtHLC-4-11cacdc97d8add68ec53f97416f604cd.png"},97016:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/virtHLC-5-ce5a6efa0491086da60bf1b1909ec1aa.png"},3046:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/virtHLC-6-dc5bd6e6b9cbce9c7566b36e00cd1d02.png"},4004:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/virtHLC-7-3563cdd7d70e4be8eb2e32d67f933827.png"},51396:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/virtHLC-fa10161d05f25e2dc743748f0a81704c.png"}}]);