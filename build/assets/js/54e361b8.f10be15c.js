"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[8891],{3905:(e,a,n)=>{n.d(a,{Zo:()=>p,kt:()=>g});var r=n(67294);function t(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function o(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?o(Object(n),!0).forEach((function(a){t(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function s(e,a){if(null==e)return{};var n,r,t=function(e,a){if(null==e)return{};var n,r,t={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],a.indexOf(n)>=0||(t[n]=e[n]);return t}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}var i=r.createContext({}),d=function(e){var a=r.useContext(i),n=a;return e&&(n="function"==typeof e?e(a):l(l({},a),e)),n},p=function(e){var a=d(e.components);return r.createElement(i.Provider,{value:a},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},m=r.forwardRef((function(e,a){var n=e.components,t=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=d(n),m=t,g=c["".concat(i,".").concat(m)]||c[m]||u[m]||o;return n?r.createElement(g,l(l({ref:a},p),{},{components:n})):r.createElement(g,l({ref:a},p))}));function g(e,a){var n=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var o=n.length,l=new Array(o);l[0]=m;var s={};for(var i in a)hasOwnProperty.call(a,i)&&(s[i]=a[i]);s.originalType=e,s[c]="string"==typeof e?e:t,l[1]=s;for(var d=2;d<o;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},18510:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>i,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var r=n(87462),t=(n(67294),n(3905));const o={sidebar_position:30},l="Servidores Web, Base de Datos y DNS en nuestros escenario de OpenStack",s={unversionedId:"Tasks/dns_escenario_openstack",id:"Tasks/dns_escenario_openstack",title:"Servidores Web, Base de Datos y DNS en nuestros escenario de OpenStack",description:"Procedimiento",source:"@site/docs/Tasks/dns_escenario_openstack.md",sourceDirName:"Tasks",slug:"/Tasks/dns_escenario_openstack",permalink:"/docs/Tasks/dns_escenario_openstack",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/dns_escenario_openstack.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_position:30},sidebar:"tutorialSidebar",previous:{title:"Funcionamiento del servidor DHCP",permalink:"/docs/Tasks/funcionamiento_dhcp"},next:{title:"Inform\xe1tica Forense",permalink:"/docs/Tasks/forense"}},i={},d=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Servidor DNS",id:"servidor-dns",level:3},{value:"Servidor Web",id:"servidor-web",level:3},{value:"Servidor de Base de Datos",id:"servidor-de-base-de-datos",level:3},{value:"Entrega",id:"entrega",level:2},{value:"1. Entrega la configuraci\xf3n DNS de cada m\xe1quina.",id:"1-entrega-la-configuraci\xf3n-dns-de-cada-m\xe1quina",level:3},{value:"2. Entrega la definici\xf3n de las vistas y de las zonas.",id:"2-entrega-la-definici\xf3n-de-las-vistas-y-de-las-zonas",level:3},{value:"3. Entrega el resultado de las siguientes consultas desde una m\xe1quina interna a nuestra red y otro externo:",id:"3-entrega-el-resultado-de-las-siguientes-consultas-desde-una-m\xe1quina-interna-a-nuestra-red-y-otro-externo",level:3},{value:"4. Entrega una captura de pantalla accediendo a www.tunombre.gonzalonazareno.org/info.php donde se vea la salida del fichero info.php.",id:"4-entrega-una-captura-de-pantalla-accediendo-a-wwwtunombregonzalonazarenoorginfophp-donde-se-vea-la-salida-del-fichero-infophp",level:3},{value:"5. Entrega una prueba de funcionamiento donde se vea como se realiza una conexi\xf3n a la base de datos desde bravo.",id:"5-entrega-una-prueba-de-funcionamiento-donde-se-vea-como-se-realiza-una-conexi\xf3n-a-la-base-de-datos-desde-bravo",level:3}],p={toc:d},c="wrapper";function u(e){let{components:a,...o}=e;return(0,t.kt)(c,(0,r.Z)({},p,o,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"servidores-web-base-de-datos-y-dns-en-nuestros-escenario-de-openstack"},"Servidores Web, Base de Datos y DNS en nuestros escenario de OpenStack"),(0,t.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,t.kt)("h3",{id:"servidor-dns"},"Servidor DNS"),(0,t.kt)("p",null,"Vamos a instalar un servidor dns en charlie que nos permita gestionar la resoluci\xf3n directa e inversa de nuestros nombres. Cada alumno va a poseer un servidor dns con autoridad sobre un subdominio de nuestro dominio principal ",(0,t.kt)("inlineCode",{parentName:"p"},"gonzalonazareno.org"),", que se llamar\xe1 ",(0,t.kt)("inlineCode",{parentName:"p"},"tu_nombre.gonzalonazareno.org.")),(0,t.kt)("p",null,"Hay que tener en cuenta los siguientes aspectos:"),(0,t.kt)("ol",null,(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Modifica la configuraci\xf3n de la ",(0,t.kt)("strong",{parentName:"p"},"subred")," en las redes que est\xe1s usando en OpenStack para que el servidor ",(0,t.kt)("strong",{parentName:"p"},"DNS principal")," sea ",(0,t.kt)("inlineCode",{parentName:"p"},"charlie")," (192.168.0.2). O modifica los ficheros ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/resolv.conf")," de forma permanente si quieres no tocar los servidores ",(0,t.kt)("strong",{parentName:"p"},"DHCP"),".")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Modifica la configuraci\xf3n de los contenedores para que usen ",(0,t.kt)("inlineCode",{parentName:"p"},"charlie")," como ",(0,t.kt)("strong",{parentName:"p"},"DNS"),".")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"El servidor ",(0,t.kt)("strong",{parentName:"p"},"DNS")," que vamos a usar va a actuar como ",(0,t.kt)("inlineCode",{parentName:"p"},"forward/cach\xe9"),", de tal manera que las consultas la realizar\xe1 sobre nuestro servidor ",(0,t.kt)("inlineCode",{parentName:"p"},"192.168.202.2"),". Para configurar el servidor como ",(0,t.kt)("strong",{parentName:"p"},"forwarder")," hay que modificar el par\xe1metro en el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"named.conf.options"),".")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Ser\xe1 necesario realizar consultas desde el exterior (ya que vamos a hacer una delegaci\xf3n del subdominio). Determina la regla ",(0,t.kt)("strong",{parentName:"p"},"DNAT")," en ",(0,t.kt)("inlineCode",{parentName:"p"},"alfa")," para que podamos hacer consultas ",(0,t.kt)("strong",{parentName:"p"},"DNS")," desde el exterior.")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"Indica al profesor el nombre de tu dominio para que pueda realizar la delegaci\xf3n en el servidor ",(0,t.kt)("strong",{parentName:"p"},"DNS principal papion-dns"),". Recuerda que ",(0,t.kt)("strong",{parentName:"p"},"papion-dns")," (",(0,t.kt)("inlineCode",{parentName:"p"},"192.168.202.2"),") debe poder realizar consultas a tu servidor ",(0,t.kt)("strong",{parentName:"p"},"DNS"),".")),(0,t.kt)("li",{parentName:"ol"},(0,t.kt)("p",{parentName:"li"},"El servidor ",(0,t.kt)("strong",{parentName:"p"},"DNS")," se va a configurar en un principio de la siguiente manera:"))),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"El servidor ",(0,t.kt)("strong",{parentName:"p"},"DNS")," se llama ",(0,t.kt)("inlineCode",{parentName:"p"},"charlie.tu_nombre.gonzalonazareno.org")," y va a ser el servidor con autoridad para la zona ",(0,t.kt)("inlineCode",{parentName:"p"},"tu_nombre.gonzalonazareno.org"),".")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"El servidor debe resolver el nombre de todas las m\xe1quinas.")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"El servidor debe resolver los distintos servicios (virtualhost, servidor de base de datos, servidor ldap, \u2026).")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"Vamos a usar vistas en ",(0,t.kt)("inlineCode",{parentName:"p"},"bind9"),", para que el nombre de ",(0,t.kt)("inlineCode",{parentName:"p"},"alfa")," se corresponda con una ip distinta seg\xfan desde se realice la consulta.")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"Determina cuantas vistas vamos a crear y que nombres se van a crear en cada vista.")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"Vamos a crear las zonas de resoluci\xf3n inversas correspondientes al direccionamiento de las redes privadas."))),(0,t.kt)("p",null,"Primero, en ",(0,t.kt)("inlineCode",{parentName:"p"},"charlie"),", instalamos bind9:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt-get install bind9\n")),(0,t.kt)("p",null,"En ",(0,t.kt)("inlineCode",{parentName:"p"},"alfa")," a\xf1adimos la regla DNAT para que podamos hacer consultas DNS desde el exterior:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"post-up iptables -t nat -A PREROUTING -i ens3 -p udp --dport 53 -j DNAT --to-destination 192.168.0.2:53\n")),(0,t.kt)("p",null,"Despu\xe9s, en el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf.local")," configuramos las vistas y las zonas:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},'view interna {\n    match-clients { 192.168.0.0/24; 127.0.0.1; };\n    allow-recursion { any; };\n        zone "nazareth.gonzalonazareno.org" \n        {\n               type master;\n               file "db.interna.nazareth.gonzalonazareno.org";\n        };\n        zone "0.168.192.in-addr.arpa" \n        {\n               type master;\n               file "db.0.168.192";\n        };\n        zone "16.172.in-addr.arpa" \n        {\n               type master;\n               file "db.16.172";\n        };\n        include "/etc/bind/zones.rfc1918";\n        include "/etc/bind/named.conf.default-zones";\n};\n\nview externa {\n    match-clients { 172.22.0.0/16; 192.168.202.2; 172.29.0.0/16;};\n    allow-recursion { any; };\n        zone "nazareth.gonzalonazareno.org" \n        {\n               type master;\n               file "db.externa.nazareth.gonzalonazareno.org";\n        };\n        include "/etc/bind/zones.rfc1918";\n        include "/etc/bind/named.conf.default-zones";\n};\n\nview dmz {\n    match-clients { 172.22.0.0/16; 172.16.0.0/16; 172.29.0.0/16; };\n    allow-recursion { any; };\n        zone "nazareth.gonzalonazareno.org"\n        {\n               type master;\n               file "db.dmz.nazareth.gonzalonazareno.org";\n        };\n        zone "16.172.in-addr.arpa"\n        {\n               type master;\n               file "db.16.172";\n        };\n        zone "0.168.192.in-addr.arpa"\n        {\n               type master;\n               file "db.0.168.192";\n        };\n        include "/etc/bind/zones.rfc1918";\n        include "/etc/bind/named.conf.default-zones";\n};\n')),(0,t.kt)("p",null,"\ud83d\udfea\ud83d\udc7e\u23e9",(0,t.kt)("strong",{parentName:"p"},"IMPORTANTE:")," HAY QUE MODIFICAR EL FICHERO ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf")," Y COMENTAR LA LINEA ",(0,t.kt)("inlineCode",{parentName:"p"},'include "/etc/bind/named.conf.default-zones";')," PARA QUE NO SE CARGUEN LAS ZONAS POR DEFECTO Y PODAMOS USAR ",(0,t.kt)("inlineCode",{parentName:"p"},"include")," EN EL FICHERO ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf.local"),".\u23ea\ud83d\udc7e\ud83d\udfea"),(0,t.kt)("p",null,"En el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf")," a\xf1adimos las vistas:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},'include "/etc/bind/named.conf.local";\ninclude "/etc/bind/named.conf.options";\ninclude "/etc/bind/named.conf.default-zones";\n')),(0,t.kt)("p",null,"Despu\xe9s, creamos los ficheros de configuraci\xf3n de las zonas:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"touch /var/cache/bind/db.interna.nazareth.gonzalonazareno.org\ntouch /var/cache/bind/db.externa.nazareth.gonzalonazareno.org\ntouch /var/cache/bind/db.dmz.nazareth.gonzalonazareno.org\n")),(0,t.kt)("p",null,"Y, por \xfaltimo, configuramos las zonas:"),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"db.interna.nazareth.gonzalonazareno.org"),":")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL 86400\n@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (\n                             1         ; Serial\n                        604800         ; Refresh\n                         86400         ; Retry\n                       2419200         ; Expire\n                        86400 )        ; Negative Cache TTL\n;\n@       IN      NS      charlie.nazareth.gonzalonazareno.org.\n\n$ORIGIN nazareth.gonzalonazareno.org.\n\nalfa    IN      A       192.168.0.1\nbravo   IN      A       172.16.0.200\ncharlie IN      A       192.168.0.2\ndelta   IN      A       192.168.0.3\nbd      IN      CNAME   delta\ndns     IN      CNAME   charlie\nwww     IN      CNAME   bravo\n")),(0,t.kt)("p",null,"*Nota: En alfa se pone la red a la que se conectan los contenedores, en este caso la 192.168.0.1"),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(20826).Z,width:"834",height:"628"})),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"db.externa.nazareth.gonzalonazareno.org"),":")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL 86400\n@       IN      SOA     alfa.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (\n                             1         ; Serial\n                        604800         ; Refresh\n                         86400         ; Retry\n                       2419200         ; Expire\n                        86400 )        ; Negative Cache TTL\n;\n@       IN      NS      alfa.nazareth.gonzalonazareno.org.\n\n$ORIGIN nazareth.gonzalonazareno.org.\n\nalfa    IN      A       172.22.201.19\ndns     IN      CNAME   alfa\nwww     IN      CNAME   alfa\n")),(0,t.kt)("p",null,"*Nota: En alfa se pone la red a la que se accede al exterior, en este caso la 172.22.200.255, adem\xe1s, en este caso, al ser la red externa, no se pone la red a la que se conectan los contenedores, ya que no se conectan a ninguna. Y se pone en origin el nombre de alfa, ya que es el servidor que resuelve las zonas externas."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(34289).Z,width:"834",height:"628"})),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"db.dmz.nazareth.gonzalonazareno.org"),":")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL 86400\n@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (\n                             1         ; Serial\n                        604800         ; Refresh\n                         86400         ; Retry\n                       2419200         ; Expire\n                        86400 )        ; Negative Cache TTL\n;\n@       IN      NS      charlie.nazareth.gonzalonazareno.org.\n\n$ORIGIN nazareth.gonzalonazareno.org.\n\nalfa    IN      A       172.16.0.1\nbravo   IN      A       172.16.0.200\ncharlie IN      A       192.168.0.2\ndelta   IN      A       192.168.0.3\nbd      IN      CNAME   delta\ndns     IN      CNAME   charlie\nwww     IN      CNAME   bravo\n")),(0,t.kt)("p",null,"*Nota: En alfa la red conectada a la DMZ, en este caso la 172.16.0.1"),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(36047).Z,width:"834",height:"628"})),(0,t.kt)("p",null,"Lo siguiente ser\xe1 configurar las zonas inversas dentro del directorio ",(0,t.kt)("inlineCode",{parentName:"p"},"/var/cache/bind/"),":"),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"db.0.168.192"),":")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL 86400\n@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (\n                             1         ; Serial\n                        604800         ; Refresh\n                         86400         ; Retry\n                       2419200         ; Expire\n                        86400 )        ; Negative Cache TTL\n;\n@       IN      NS      charlie.nazareth.gonzalonazareno.org.\n\n$ORIGIN 0.168.192.in-addr.arpa.\n\n1       IN      PTR     alfa.nazareth.gonzalonazareno.org.\n2       IN      PTR     charlie.nazareth.gonzalonazareno.org.\n3       IN      PTR     delta.nazareth.gonzalonazareno.org.\n")),(0,t.kt)("p",null,"*Nota: En este caso, en origin se pone la direcci\xf3n inversa de la red a la que se conectan los contenedores, en este caso la 0.168.192.in-addr.arpa. Y en el PTR se pone el nombre de la m\xe1quina y el dominio. En este caso, al ser la red interna, se pone el nombre de la m\xe1quina y el dominio, ya que es el servidor que resuelve las zonas internas por eso no es necesario poner la ip."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(45691).Z,width:"834",height:"628"})),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("inlineCode",{parentName:"li"},"db.16.172"),":")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL 86400\n@       IN      SOA     charlie.nazareth.gonzalonazareno.org. root.nazareth.gonzalonazareno.org. (\n                             1         ; Serial\n                        604800         ; Refresh\n                         86400         ; Retry\n                       2419200         ; Expire\n                        86400 )        ; Negative Cache TTL\n;\n@       IN      NS      charlie.nazareth.gonzalonazareno.org.\n\n$ORIGIN 16.172.in-addr.arpa.\n\n200.0     IN      PTR     bravo.nazareth.gonzalonazareno.org.\n")),(0,t.kt)("p",null,"*Nota: Se debe poner 1.0 y 200.0 porque para que sea v\xe1lido el PTR, debe incluir los dos octetos de la direcci\xf3n ip separados por un punto en orden inverso."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(29475).Z,width:"834",height:"628"})),(0,t.kt)("p",null,"Hay que desactivar las zonas inversas por defecto que se crean al instalar el servidor DNS, para ello, hay que editar el archivo ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/bind/zones.rfc1918")," y comentar las l\xedneas que contienen las zonas inversas."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(4080).Z,width:"834",height:"628"})),(0,t.kt)("p",null,"Configuramos el archivo ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf.options")," para que el servidor papi\xf3n haga de forwarder (es decir, que resuelva las zonas externas):"),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(56370).Z,width:"834",height:"854"})),(0,t.kt)("p",null,"Reiniciamos el servicio DNS:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"systemctl restart bind9\n")),(0,t.kt)("p",null,"En ",(0,t.kt)("inlineCode",{parentName:"p"},"alfa")," editamos el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/resolvconf/resolv.conf.d/head")," para que el servidor DNS sea el servidor DNS de la DMZ y reiniciamos el servicio para que se apliquen los cambios en el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/resolv.conf"),", de esta manera si se reinicia la m\xe1quina, el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/resolv.conf")," se volver\xe1 a generar con los cambios que hemos hecho:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo nano /etc/resolvconf/resolv.conf.d/head\n\nnameserver 192.168.0.2\n\nsudo resolvconf -u\n")),(0,t.kt)("h3",{id:"servidor-web"},"Servidor Web"),(0,t.kt)("p",null,"En ",(0,t.kt)("inlineCode",{parentName:"p"},"bravo")," vamos a instalar un servidor web apache. Configura el servidor para que sea capaz de ejecutar c\xf3digo php. Investiga las reglas DNAT de cortafuegos que tienes que configurar en ",(0,t.kt)("inlineCode",{parentName:"p"},"alfa")," para, cuando accedamos a la IP flotante/p\xfablica se acceda al servidor web. La p\xe1gina web ser\xe1 accesible con el nombre ",(0,t.kt)("inlineCode",{parentName:"p"},"www.tu_nombre.gonzalonazareno.org.")),(0,t.kt)("p",null,"En alfa hay que a\xf1adir en ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/network/interfaces/50-cloud-init")," la siguiente l\xednea:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"post-up iptables -t nat -A PREROUTING -p tcp --dport 80 -i ens3 -j DNAT --to 172.16.0.200\n")),(0,t.kt)("p",null,"Para instalar el servidor web apache, ejecutamos el siguiente comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo dnf install httpd\n")),(0,t.kt)("p",null,"Para instalar el m\xf3dulo de php, ejecutamos el siguiente comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo dnf install php php-mysqlnd php-gd php-fpm\n")),(0,t.kt)("p",null,"Iniciamos el servicio apache y php-fpm:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl enable httpd\nsudo systemctl enable php-fpm\n")),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"SI NO EXISTEN")," creamos ",(0,t.kt)("inlineCode",{parentName:"p"},"sites-available")," y ",(0,t.kt)("inlineCode",{parentName:"p"},"sites-enabled")," dentro de ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/httpd/"),":"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo mkdir /etc/httpd/sites-available\nsudo mkdir /etc/httpd/sites-enabled\n")),(0,t.kt)("p",null,"A\xf1adimos la siguiente l\xednea al final del archivo ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/httpd/conf/httpd.conf"),":"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"IncludeOptional sites-enabled/*.conf\n")),(0,t.kt)("p",null,"Creamos el archivo ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/httpd/sites-available/www.nazareth.gonzalonazareno.org.conf")," con el siguiente contenido:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},'<VirtualHost *:80>\n       ServerName www.nazareth.gonzalonazareno.org\n       DocumentRoot /var/www/html/nazareth\n       ErrorLog /var/log/httpd/nazareth-error.log\n       CustomLog /var/log/httpd/access-nazareth-error.log combined\n       <FilesMatch \\.php$>\n              SetHandler "proxy:unix:/run/php-fpm/www.sock|fcgi://localhost"\n       </FilesMatch>\n</VirtualHost>\n')),(0,t.kt)("p",null,"curl ",(0,t.kt)("a",{parentName:"p",href:"http://www.nazareth.gonzalonazareno.org"},"www.nazareth.gonzalonazareno.org")),(0,t.kt)("p",null,"Hacemos el enlace simb\xf3lico del archivo creado en ",(0,t.kt)("inlineCode",{parentName:"p"},"sites-available")," a ",(0,t.kt)("inlineCode",{parentName:"p"},"sites-enabled"),":"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo ln -s /etc/httpd/sites-available/www.nazareth.gonzalonazareno.org.conf /etc/httpd/sites-enabled/www.nazareth.gonzalonazareno.org.conf\n")),(0,t.kt)("p",null,"Creamos el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"info.php")," en ",(0,t.kt)("inlineCode",{parentName:"p"},"/var/www/html/nazareth")," con el siguiente contenido:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"<?php\nphpinfo();\n?>\n")),(0,t.kt)("p",null,"Creamos el ",(0,t.kt)("inlineCode",{parentName:"p"},"index.html")," en ",(0,t.kt)("inlineCode",{parentName:"p"},"/var/www/html/nazareth")," con el siguiente contenido:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"<html>\n       <head>\n              <title> Welcome :) </title>\n       </head>\n       \n       <body>\n              <h1> Web en escenario Rocky Linux :D </h1>\n              <p>...</p>\n       </body>\n</html>\n")),(0,t.kt)("p",null,"Modificamos el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/sysconfig/selinux")," para que el SELinux funcione correctamente:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"SELINUX=disabled\n")),(0,t.kt)("p",null,"*Nota: sestatus para ver el estado del SELinux.Para activarlo de nuevo, se debe cambiar el valor de SELINUX a ",(0,t.kt)("inlineCode",{parentName:"p"},"enforcing")," y reiniciar la m\xe1quina."),(0,t.kt)("p",null,"Reiniciamos la m\xe1quina para que se apliquen los cambios."),(0,t.kt)("p",null,"*Nota: Si aparece un error del servicio y en systemctl status no da info del error, se puede ver en el log del servicio en el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/var/log/httpd/error_log")," o ",(0,t.kt)("inlineCode",{parentName:"p"},"/var/log/httpd/access_log")," si es un error de permisos, por ejemplo."),(0,t.kt)("p",null,"Entramos en la web desde el navegador y comprobamos que funciona correctamente:"),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(10495).Z,width:"838",height:"431"})),(0,t.kt)("h3",{id:"servidor-de-base-de-datos"},"Servidor de Base de Datos"),(0,t.kt)("p",null,"En ",(0,t.kt)("inlineCode",{parentName:"p"},"delta")," vamos a instalar un servidor de base de datos mariadb (",(0,t.kt)("inlineCode",{parentName:"p"},"bd.tu_nombre.gonzalonazareno.org"),"). A este servidor de base de datos se debe permitir el acceso desde todas las m\xe1quinas del escenario."),(0,t.kt)("p",null,"En delta instalamos mariadb:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install mariadb-server\n")),(0,t.kt)("p",null,"Configuramos Mariadb para poder acceder de forma remota:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo mysql_secure_installation\n")),(0,t.kt)("p",null,"Obteniendo como salida:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@delta:~$ sudo mysql_secure_installation\n\nNOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB\n      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!\n\nIn order to log into MariaDB to secure it, we'll need the current\npassword for the root user.  If you've just installed MariaDB, and\nyou haven't set the root password yet, the password will be blank,\nso you should just press enter here.\n\nEnter current password for root (enter for none): \nOK, successfully used password, moving on...\n\nSetting the root password ensures that nobody can log into the MariaDB\nroot user without the proper authorisation.\n\nYou already have a root password set, so you can safely answer 'n'.\n\nChange the root password? [Y/n] n\n ... skipping.\n\nBy default, a MariaDB installation has an anonymous user, allowing anyone\nto log into MariaDB without having to have a user account created for\nthem.  This is intended only for testing, and to make the installation\ngo a bit smoother.  You should remove them before moving into a\nproduction environment.\n\nRemove anonymous users? [Y/n] \n ... Success!\n\nNormally, root should only be allowed to connect from 'localhost'.  This\nensures that someone cannot guess at the root password from the network.\n\nDisallow root login remotely? [Y/n] \n ... Success!\n\nBy default, MariaDB comes with a database named 'test' that anyone can\naccess.  This is also intended only for testing, and should be removed\nbefore moving into a production environment.\n\nRemove test database and access to it? [Y/n] \n - Dropping test database...\n ... Success!\n - Removing privileges on test database...\n ... Success!\n\nReloading the privilege tables will ensure that all changes made so far\nwill take effect immediately.\n\nReload privilege tables now? [Y/n] \n ... Success!\n\nCleaning up...\n\nAll done!  If you've completed all of the above steps, your MariaDB\ninstallation should now be secure.\n\nThanks for using MariaDB!\n")),(0,t.kt)("p",null,"Creamos el usuario ",(0,t.kt)("inlineCode",{parentName:"p"},"nazareth")," y le damos permisos para acceder desde cualquier m\xe1quina:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"CREATE USER 'nazareth'@'%' IDENTIFIED BY 'admin';\nGRANT ALL PRIVILEGES ON *.* TO 'nazareth'@'%' WITH GRANT OPTION;\nFLUSH PRIVILEGES;\n")),(0,t.kt)("p",null,"Habilitamos el acceso remoto a la base de datos editando el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/mysql/mariadb.conf.d/50-server.cnf")," en la l\xednea ",(0,t.kt)("inlineCode",{parentName:"p"},"bind-address")," a\xf1adiendo:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"bind-address = 0.0.0.0\n")),(0,t.kt)("p",null,"De esta forma, el servidor de base de datos escuchar\xe1 en todas las interfaces de red. Despu\xe9s reiniciamos el servicio:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl restart mariadb\n")),(0,t.kt)("p",null,"En ",(0,t.kt)("inlineCode",{parentName:"p"},"bravo")," editamos el fichero ",(0,t.kt)("inlineCode",{parentName:"p"},"/etc/resolv.conf")," para a\xf1adir la IP de ",(0,t.kt)("inlineCode",{parentName:"p"},"charlie")," si no la tenemos ya:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"nameserver 192.168.0.2\n")),(0,t.kt)("p",null,"Instalamos maraidb:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo dnf install mariadb-server\n")),(0,t.kt)("p",null,"Accedemos a la base de datos desde ",(0,t.kt)("inlineCode",{parentName:"p"},"bravo"),":"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"mysql -u nazareth -h bd -p\n")),(0,t.kt)("h2",{id:"entrega"},"Entrega"),(0,t.kt)("h3",{id:"1-entrega-la-configuraci\xf3n-dns-de-cada-m\xe1quina"},"1. Entrega la configuraci\xf3n DNS de cada m\xe1quina."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"cat /etc/resolv.conf\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(68088).Z,width:"799",height:"293"}),"\n",(0,t.kt)("img",{alt:"dns",src:n(37365).Z,width:"526",height:"163"}),"\n",(0,t.kt)("img",{alt:"dns",src:n(98725).Z,width:"801",height:"466"}),"\n",(0,t.kt)("img",{alt:"dns",src:n(73859).Z,width:"809",height:"474"})),(0,t.kt)("h3",{id:"2-entrega-la-definici\xf3n-de-las-vistas-y-de-las-zonas"},"2. Entrega la definici\xf3n de las vistas y de las zonas."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"cat /etc/bind/named.conf.local\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},'view interna {\n    match-clients { 192.168.0.0/24; 127.0.0.1; };\n    allow-recursion { any; };\n        zone "nazareth.gonzalonazareno.org" \n        {\n               type master;\n               file "db.interna.nazareth.gonzalonazareno.org";\n        };\n        zone "0.168.192.in-addr.arpa" \n        {\n               type master;\n               file "db.0.168.192";\n        };\n        zone "16.172.in-addr.arpa" \n        {\n               type master;\n               file "db.16.172";\n        };\n        include "/etc/bind/zones.rfc1918";\n        include "/etc/bind/named.conf.default-zones";\n};\n\nview externa {\n    match-clients { 172.22.0.0/16; 192.168.202.2; 172.29.0.0/16;};\n    allow-recursion { any; };\n        zone "nazareth.gonzalonazareno.org" \n        {\n               type master;\n               file "db.externa.nazareth.gonzalonazareno.org";\n        };\n        include "/etc/bind/zones.rfc1918";\n        include "/etc/bind/named.conf.default-zones";\n};\n\nview dmz {\n    match-clients { 172.22.0.0/16; 172.16.0.0/16; 172.29.0.0/16; };\n    allow-recursion { any; };\n        zone "nazareth.gonzalonazareno.org"\n        {\n               type master;\n               file "db.dmz.nazareth.gonzalonazareno.org";\n        };\n        zone "16.172.in-addr.arpa"\n        {\n               type master;\n               file "db.16.172";\n        };\n        zone "0.168.192.in-addr.arpa"\n        {\n               type master;\n               file "db.0.168.192";\n        };\n        include "/etc/bind/zones.rfc1918";\n        include "/etc/bind/named.conf.default-zones";\n};\n')),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(6441).Z,width:"425",height:"977"})),(0,t.kt)("h3",{id:"3-entrega-el-resultado-de-las-siguientes-consultas-desde-una-m\xe1quina-interna-a-nuestra-red-y-otro-externo"},"3. Entrega el resultado de las siguientes consultas desde una m\xe1quina interna a nuestra red y otro externo:"),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"El servidor DNS con autoridad sobre la zona del dominio tu_nombre.gonzalonazareno.org.")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"dig nazareth.gonzalonazareno.org\n")),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"Desde una m\xe1quina interna:")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(74313).Z,width:"941",height:"557"})),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"Desde una m\xe1quina externa:")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"dns",src:n(47756).Z,width:"785",height:"906"})),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"La direcci\xf3n IP de alfa.")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"Una resoluci\xf3n de www.")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"Una resoluci\xf3n de bd.")),(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"Un resoluci\xf3n inversa de IP fija en cada una de las redes. (Esta consulta s\xf3lo funcionar\xe1 desde una m\xe1quina interna)."))),(0,t.kt)("h3",{id:"4-entrega-una-captura-de-pantalla-accediendo-a-wwwtunombregonzalonazarenoorginfophp-donde-se-vea-la-salida-del-fichero-infophp"},"4. Entrega una captura de pantalla accediendo a ",(0,t.kt)("a",{parentName:"h3",href:"http://www.tunombre.gonzalonazareno.org/info.php"},"www.tunombre.gonzalonazareno.org/info.php")," donde se vea la salida del fichero info.php."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre"},"   www.nazareth.gonzalonazareno.org/info.php\n")),(0,t.kt)("h3",{id:"5-entrega-una-prueba-de-funcionamiento-donde-se-vea-como-se-realiza-una-conexi\xf3n-a-la-base-de-datos-desde-bravo"},"5. Entrega una prueba de funcionamiento donde se vea como se realiza una conexi\xf3n a la base de datos desde bravo."),(0,t.kt)("p",null,"*Nota: Para las views y zones ext.,int. y dmz \u2192 ",(0,t.kt)("a",{parentName:"p",href:"https://www.josedomingo.org/pledin/2017/12/vistas-views-en-el-servidor-dns-bind9/"},"https://www.josedomingo.org/pledin/2017/12/vistas-views-en-el-servidor-dns-bind9/")," "),(0,t.kt)("p",null,"*Nota: Para cambiar el DNS en ubuntu ejecutar:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"vi /etc/netplan/10-lxc.yaml\n")),(0,t.kt)("p",null,"A\xf1adir:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"nameservers:\naddresses: [192.168.202.2]\n")),(0,t.kt)("p",null,"Y ejecutar:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"netplan -\nnetplan apply\n")),(0,t.kt)("p",null,"Con netplan se puede configurar la red de forma din\xe1mica, por lo que no es necesario reiniciar la m\xe1quina para que se apliquen los cambios. Dentro del fichero se puede configurar la IP est\xe1tica, el DNS, la puerta de enlace, etc. En este caaso se ha a\xf1adido el nameserver con la IP del servidor DNS 192.168.0.2."),(0,t.kt)("p",null,"*Nota: no funciona bien charlie y da un error ",(0,t.kt)("inlineCode",{parentName:"p"},"May 19 23:56:08 charlie named[275]: network unreachable resolving './DNSKEY/IN': 2001:dc3::35#53")," lo que hace que en alfa no se pueda establecer conexion con el servidor. El problema es una regla de iptables mal establecida que indica que todo el tr\xe1fico vaya a charlie, al llegar a charlie vuelve a preguntar a alfa y se crea un bucle. Para solucionarlo eliminamos esa regla."))}u.isMDXComponent=!0},37365:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-10-9d514918ad7734910a5a205d52d0b168.png"},98725:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-11-43fdd5f1bbb78b00a289b9d3e9421ab5.png"},73859:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-12-0fdf8057df31298a6ef104e7aa606aa8.png"},6441:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-13-6a9801e8abb34d3b04d706ae1bf371a2.png"},74313:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-14-870869873b8241bd7af08544a2e56044.png"},47756:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-15-891c2ab018c0c6980460954d71102f39.png"},34289:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-2-a93193e0128aab56416ab711b30c90bb.png"},36047:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-3-495e2e37a83889862905ff96d72fab29.png"},45691:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-4-0fb623322505c1616f67720289b13c68.png"},29475:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-5-f82dd3e2f52dcb5e906addedd7ea3cc3.png"},4080:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-6-9290eeeda8cd38fb9c64d7f42604d50e.png"},56370:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-7-a9e89d95fa45595885397582b69307e9.png"},10495:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-8-5a5ad7bc81d1064f14cc369b12eb0cb2.png"},68088:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-9-5df1f54e8e02ea3f31efcce3dcd085a1.png"},20826:(e,a,n)=>{n.d(a,{Z:()=>r});const r=n.p+"assets/images/DNSSRI5-c8f5b4a442dbd86c8bf26fdac324b8c9.png"}}]);