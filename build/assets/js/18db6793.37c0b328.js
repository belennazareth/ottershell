"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[5917],{3905:(e,n,a)=>{a.d(n,{Zo:()=>d,kt:()=>m});var t=a(67294);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function s(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=t.createContext({}),c=function(e){var n=t.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},d=function(e){var n=c(e.components);return t.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=c(a),m=r,g=u["".concat(l,".").concat(m)]||u[m]||p[m]||o;return a?t.createElement(g,i(i({ref:n},d),{},{components:a})):t.createElement(g,i({ref:n},d))}));function m(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=a[c];return t.createElement.apply(null,i)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},10586:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var t=a(87462),r=(a(67294),a(3905));const o={sidebar_position:29},i="Funcionamiento del servidor DHCP",s={unversionedId:"Tasks/funcionamiento_dhcp",id:"Tasks/funcionamiento_dhcp",title:"Funcionamiento del servidor DHCP",description:"Procedimiento",source:"@site/docs/Tasks/funcionamiento_dhcp.md",sourceDirName:"Tasks",slug:"/Tasks/funcionamiento_dhcp",permalink:"/docs/Tasks/funcionamiento_dhcp",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/funcionamiento_dhcp.md",tags:[],version:"current",sidebarPosition:29,frontMatter:{sidebar_position:29},sidebar:"tutorialSidebar",previous:{title:"Instalaci\xf3n y configuraci\xf3n del servidor DHCP",permalink:"/docs/Tasks/configuracion_dhcp"},next:{title:"Markdown Features",permalink:"/docs/Tasks/markdown-features"}},l={},c=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Entrega",id:"entrega",level:2}],d={toc:c};function p(e){let{components:n,...o}=e;return(0,r.kt)("wrapper",(0,t.Z)({},d,o,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"funcionamiento-del-servidor-dhcp"},"Funcionamiento del servidor DHCP"),(0,r.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,r.kt)("p",null,"1.- Continuamos trabajando en el escenario del taller anterior."),(0,r.kt)("p",null,"2.- Introduce un cliente Windows y realiza la configuraci\xf3n necesario para que tome configuraci\xf3n de red del servidor DHCP."),(0,r.kt)("p",null,"3.- Realizar una captura, desde el servidor usando tcpdump, de los cuatro paquetes que corresponden a una concesi\xf3n: DISCOVER, OFFER, REQUEST, ACK."),(0,r.kt)("p",null,"Para esto es necesario instalar tcpdump en el servidor:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install tcpdump\n")),(0,r.kt)("p",null,"Y ejecutarlo con el siguiente comando:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tcpdump -i enp7s0 -pvn port 67 or port 68\n")),(0,r.kt)("p",null,"En windows vamos a liberar la IP y volver a obtenerla:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-powershell"},"ipconfig /release\nipconfig /renew\n")),(0,r.kt)("p",null,"4.- Para hacer esta prueba configura un tiempo de concesi\xf3n bajo. Los clientes toman una configuraci\xf3n, y a continuaci\xf3n apagamos el servidor DHCP. \xbfqu\xe9 ocurre con el cliente windows? \xbfY con el cliente linux?. Comprueba el funcionamiento y razona el motivo."),(0,r.kt)("p",null,"5.- Los clientes toman una configuraci\xf3n, y a continuaci\xf3n cambiamos la configuraci\xf3n del servidor DHCP (por ejemplo el rango). \xbfqu\xe9 ocurrir\xeda con un cliente windows? \xbfY con el cliente linux?. Comprueba el funcionamiento y razona el motivo."),(0,r.kt)("p",null,"6.- Para crear una reserva en el servidor vamos a trabajar en la secci\xf3n host. En una secci\xf3n host debemos poner el nombre que identifica al host y los siguientes par\xe1metros:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"hardware ethernet: Es la direcci\xf3n MAC de la tarjeta de red del host."),(0,r.kt)("li",{parentName:"ul"},"fixed-address: La direcci\xf3n IP que le vamos a asignar."),(0,r.kt)("li",{parentName:"ul"},"Podemos usar tambi\xe9n las opciones ya explicadas en la secci\xf3n principal.")),(0,r.kt)("p",null,"Realiza una reserva para el cliente Windows, para que tenga la IP 192.168.200.200. La configuraci\xf3n quedar\xeda:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"host cliente-windows {\n  hardware ethernet xx:xx:xx:xx:xx:xx;\n  fixed-address 192.168.200.200;\n}\n")),(0,r.kt)("p",null,"Editamos el fichero ",(0,r.kt)("inlineCode",{parentName:"p"},"/etc/dhcp/dhcpd.conf"),", en el apartado host a\xf1adimos:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"host cliente-windows {\n  hardware ethernet 52:54:00:10:6a:8e;\n  fixed-address 10.100.0.200;\n}\n")),(0,r.kt)("p",null,"\xbfSe guarda la reserva en la lista de concesiones?"),(0,r.kt)("p",null,"No, porque al ser una reserva, no se guarda en la lista de concesiones ya que no necesita que el servidor DHCP le asigne una IP, ya que la tiene fija."),(0,r.kt)("h2",{id:"entrega"},"Entrega"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"1. Una vez que el cliente Windows se haya configurado, capturas de pantalla donde se vea en el cliente: su direcci\xf3n IP, su puerta de enlace y su servidor DNS.")),(0,r.kt)("p",null,"*Nota: el cliente windows se configura autom\xe1ticamente, a\xf1adiendole la red muy aislada ya detectar\xe1 el servidor DHCP y se configurar\xe1 autom\xe1ticamente."),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(7574).Z,width:"917",height:"789"})),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"2. Captura de pantalla donde se vean los 4 paquetes que se transmite en la negociaci\xf3n de la concesi\xf3n.")),(0,r.kt)("p",null,"*Nota: para que se vean los 4 paquetes es necesario que los clientes est\xe9n apagados y ejecutar el comando antes de encender los clientes, o bien apagar el servicio DHCP y ejecutar el comando antes de encender el servicio DHCP."),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(85695).Z,width:"978",height:"991"})),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"3. Explica, con pruebas de funcionamiento, el motivo del comportamiento que se indica en los puntos 4 y 5.")),(0,r.kt)("p",null,"Para el ",(0,r.kt)("strong",{parentName:"p"},"punto 4"),", cambiamos el fichero de configuraci\xf3n del servidor DHCP para que el tiempo de concesi\xf3n sea de 30 segundos:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"subnet 10.0.0.0 netmask 255.255.255.0 {\n   default-lease-time 30;   <<< \ud83c\udf53\ud83d\udc0c tiempo de concesi\xf3n por defecto \ud83c\udf53\ud83d\udc0c\n   max-lease-time 30;   <<< \ud83c\udf3c\ud83d\udc38 tiempo de concesi\xf3n m\xe1ximo \ud83d\udc38\ud83c\udf3c\n   range 10.0.0.100 10.0.0.110;\n   option subnet-mask 255.255.255.0;\n   option broadcast-address 10.0.0.255;\n   option routers 10.0.0.1;\n   option domain-name-servers 192.168.202.2, 1.1.1.1;\n}\n")),(0,r.kt)("p",null,"Reiniciamos el servicio para que se apliquen los cambios."),(0,r.kt)("p",null,"Despu\xe9s, apagamos el servidor DHCP y esperamos 30 segundos para que los clientes liberen la IP que ten\xedan asignada y vuelvan a pedir una nueva.\nPodemos ver que ambos han perdido la direcci\xf3n IP que ten\xedan asignada y se han quedado sin direccionamiento, ya que no hay ning\xfan servidor DHCP que les pueda asignar una nueva IP:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(53447).Z,width:"1919",height:"768"})),(0,r.kt)("p",null,"*Nota: para solicitar una nueva ip al servidor DHCP, en windows podemos usar el comando ipconfig /release y despu\xe9s ipconfig /renew. En linux podemos usar el comando dhclient -r y despu\xe9s dhclient."),(0,r.kt)("p",null,"En el ",(0,r.kt)("strong",{parentName:"p"},"punto 5"),", cambiamos el fichero de configuraci\xf3n del servidor DHCP, ",(0,r.kt)("inlineCode",{parentName:"p"},"/etc/dhcp/dhcpd.conf"),", para que el rango de direcciones IP sea de 10.100.0.100 a 10.100.0.110:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"subnet 10.100.0.0 netmask 255.255.255.0 {\n   default-lease-time 30;\n   max-lease-time 30;\n   range 10.100.0.100 10.100.0.110;   <<< \ud83d\udc25\ud83c\udfb1 rango de direcciones IP \ud83d\udc25\ud83c\udfb1\n   option subnet-mask 255.255.255.0;\n   option broadcast-address 10.100.0.255;\n   option routers 10.100.0.1;\n   option domain-name-servers 192.168.202.2, 1.1.1.1;\n}\n")),(0,r.kt)("p",null,"Modificamos el fichero ",(0,r.kt)("inlineCode",{parentName:"p"},"/etc/network/interfaces"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"allow-hotplug enp1s0\niface enp1s0 inet static\n        address 10.100.0.1    <<< \ud83e\uddcb\ud83d\udc1b direcci\xf3n IP del servidor DHCP \ud83e\uddcb\ud83d\udc1b\n        netmask 255.255.255.0\n        post-up iptables -t nat -A POSTROUTING -s 10.100.0.0/24 -o enp2s0 -j MASQUERADE   <<< \ud83c\udf51\ud83d\udc15 regla de NAT \ud83c\udf51\ud83d\udc15\n")),(0,r.kt)("p",null,"Reiniciamos la m\xe1quina para que se apliquen los cambios."),(0,r.kt)("p",null,"Podemos ver que ha cambiado la ip del servidor y los clientes:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(86616).Z,width:"978",height:"513"}),"\n",(0,r.kt)("img",{src:a(80844).Z,width:"1916",height:"768"})),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"4. Capturas de pantalla donde se vea el funcionamiento de la reserva. \xbfSe guarda la reserva en la lista de concesiones?")),(0,r.kt)("p",null,"Editamos el fichero ",(0,r.kt)("inlineCode",{parentName:"p"},"/etc/dhcp/dhcpd.conf"),", en el apartado host a\xf1adimos:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"host cliente-windows {\n  hardware ethernet 52:54:00:10:6a:8e;    <<< \ud83d\udc90\ud83d\udd25 direcci\xf3n MAC del cliente \ud83d\udc90\ud83d\udd25\n  fixed-address 10.100.0.200;\n}\n")),(0,r.kt)("p",null,"\xbfSe guarda la reserva en la lista de concesiones?"),(0,r.kt)("p",null,"No, porque al ser una reserva, no se guarda en la lista de concesiones ya que no necesita que el servidor DHCP le asigne una IP, ya que la tiene fija."),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(78443).Z,width:"925",height:"770"})),(0,r.kt)("p",null,"Comprobamos la lista de concesiones ",(0,r.kt)("inlineCode",{parentName:"p"},"/var/lib/dhcp/dhcpd.leases")," y vemos que no se ha guardado la reserva:"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(6485).Z,width:"530",height:"721"})))}p.isMDXComponent=!0},85695:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/taller2SRI2-2-08d39068a97e75fec7c1b05ccfee7689.png"},53447:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/taller2SRI2-3-8d7fcad0c7a93f1220c5fa80f044e1ad.png"},86616:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/taller2SRI2-4-b786b79029291d6eba5e4541cdc857bd.png"},80844:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/taller2SRI2-5-6fef3d75b4a8018d6ab120fb5983327a.png"},78443:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/taller2SRI2-6-944a7a0f792993d0d457c6f7d4c49f0c.png"},6485:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/taller2SRI2-7-646e3550ad568752d11482dc4816338f.png"},7574:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/taller2SRI2-5b52af3db99aa6368f6b3fd721c40340.png"}}]);