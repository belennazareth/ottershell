"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[9214],{3905:(e,n,a)=>{a.d(n,{Zo:()=>c,kt:()=>m});var r=a(7294);function o(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function t(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?t(Object(a),!0).forEach((function(n){o(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):t(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function l(e,n){if(null==e)return{};var a,r,o=function(e,n){if(null==e)return{};var a,r,o={},t=Object.keys(e);for(r=0;r<t.length;r++)a=t[r],n.indexOf(a)>=0||(o[a]=e[a]);return o}(e,n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(r=0;r<t.length;r++)a=t[r],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=r.createContext({}),d=function(e){var n=r.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},c=function(e){var n=d(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var a=e.components,o=e.mdxType,t=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=d(a),m=o,g=p["".concat(s,".").concat(m)]||p[m]||u[m]||t;return a?r.createElement(g,i(i({ref:n},c),{},{components:a})):r.createElement(g,i({ref:n},c))}));function m(e,n){var a=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var t=a.length,i=new Array(t);i[0]=p;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var d=2;d<t;d++)i[d]=a[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},1790:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>t,metadata:()=>l,toc:()=>d});var r=a(7462),o=(a(7294),a(3905));const t={sidebar_position:15},i="Instalaci\xf3n y configuraci\xf3n del servidor bind9 en nuestra red local",l={unversionedId:"Tasks/bind9_local",id:"Tasks/bind9_local",title:"Instalaci\xf3n y configuraci\xf3n del servidor bind9 en nuestra red local",description:"Procedimiento",source:"@site/docs/Tasks/bind9_local.md",sourceDirName:"Tasks",slug:"/Tasks/bind9_local",permalink:"/docs/Tasks/bind9_local",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/bind9_local.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15},sidebar:"tutorialSidebar",previous:{title:"Configuraci\xf3n Apache2 + fpm+php",permalink:"/docs/Tasks/apache2_fpm"},next:{title:"Instalaci\xf3n de la aplicaci\xf3n BookMedik",permalink:"/docs/Tasks/bookmedik"}},s={},d=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Instalaci\xf3n y configuraci\xf3n del servidor bind9",id:"instalaci\xf3n-y-configuraci\xf3n-del-servidor-bind9",level:3},{value:"Modificaci\xf3n de la configuraci\xf3n",id:"modificaci\xf3n-de-la-configuraci\xf3n",level:2},{value:"Entrega",id:"entrega",level:2}],c={toc:d};function u(e){let{components:n,...a}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"instalaci\xf3n-y-configuraci\xf3n-del-servidor-bind9-en-nuestra-red-local"},"Instalaci\xf3n y configuraci\xf3n del servidor bind9 en nuestra red local"),(0,o.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,o.kt)("h3",{id:"instalaci\xf3n-y-configuraci\xf3n-del-servidor-bind9"},"Instalaci\xf3n y configuraci\xf3n del servidor bind9"),(0,o.kt)("p",null,"En primer lugar, creamos una m\xe1quina en proxmox y se configura con el usuario y contrase\xf1a, adem\xe1s de la clave ssh. En el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/hosts")," a\xf1adimos la siguiente l\xednea:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"127.0.1.1 dns1.nazareth.org dns1\n")),(0,o.kt)("p",null,"Y ejecutamos el siguiente comando para actualizar el nombre de la m\xe1quina:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo hostnamectl set-hostname dns1\n")),(0,o.kt)("p",null,"Obteniendo como resultado:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"usuario@dns1:~$ hostname \ndns1\n\nusuario@dns1:~$ hostname -f\ndns1.nazareth.org\n")),(0,o.kt)("p",null,"Instalamos el servicio bind9 con el siguiente comando:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install bind9\n")),(0,o.kt)("h2",{id:"modificaci\xf3n-de-la-configuraci\xf3n"},"Modificaci\xf3n de la configuraci\xf3n"),(0,o.kt)("p",null,"-"," Para que no se intente resolver usando ipv6, se debe modificar el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/default/named")," y a\xf1adir la siguiente l\xednea:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'```bash\n  OPTIONS="-4 -f -u bind"\n```\n')),(0,o.kt)("p",null,"-"," Para que solo se permitan consultas desde la red local, se debe modificar el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf.options")," y a\xf1adir la siguiente l\xednea:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"```bash\n  allow-query {172.29.0.0/16; 172.22.0.0/16;};\n```\n")),(0,o.kt)("p",null,"-"," Reiniciamos el servicio bind9 con el siguiente comando:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"```bash\nsudo systemctl restart bind9\n```\n")),(0,o.kt)("p",null,"-"," Hacemos un ",(0,o.kt)("inlineCode",{parentName:"p"},"dig")," para ver que funciona de tal manera que se solicita el nombre de dominio y se obtiene la direcci\xf3n ip de la m\xe1quina:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    dig @<IP de tu servidor DNS> www.josedomingo.org\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@ThousandSunny :~$ dig @172.22.5.136  www.josedomingo.org\n\n; <<>> DiG 9.16.33-Debian <<>> @172.22.5.136 www.josedomingo.org\n; (1 server found)\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 22687\n;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n; COOKIE: a242d4befd4900d80100000063d8e90dae507b3eb8a6ebed (good)\n;; QUESTION SECTION:\n;www.josedomingo.org.       IN  A\n\n;; ANSWER SECTION:\nwww.josedomingo.org.    900 IN  CNAME   endor.josedomingo.org.\nendor.josedomingo.org.  900 IN  A   37.187.119.60\n\n;; Query time: 656 msec\n;; SERVER: 172.22.5.136#53(172.22.5.136)\n;; WHEN: Tue Jan 31 11:10:21 CET 2023\n;; MSG SIZE  rcvd: 112\n")),(0,o.kt)("p",null,"-"," Para que el servidor resuelva los nombres de dominio de la red local, se debe modificar el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf.local")," y a\xf1adir la siguiente l\xednea:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'zone "nazareth.org" {\n    type master;\n    file "db.nazareth.org";\n};\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Esto har\xe1 que la informaci\xf3n de la zona se guarde en db.nazareth.org que est\xe1 en el directorio `/var/cache/bind`\n")),(0,o.kt)("p",null,"Lo siguiente ser\xe1 crear el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"db.nazareth.org")," en el directorio ",(0,o.kt)("inlineCode",{parentName:"p"},"/var/cache/bind")," y a\xf1adir la siguiente informaci\xf3n:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL    86400\n@       IN      SOA     dns1.nazareth.org. root.nazareth.org. (\n                              1         ; Serial\n                         604800         ; Refresh\n                          86400         ; Retry\n                        2419200         ; Expire\n                          86400 )       ; Negative Cache TTL\n;\n@   IN  NS      dns1.nazareth.org.\n@   IN  MX  10  correo.nazareth.org.\n\n$ORIGIN nazareth.org.\n\ndns1                  IN    A   172.22.5.136 #IP de la m\xe1quina\ncorreo              IN  A   172.22.200.101\nasterix           IN    A   172.22.200.102\nobelix              IN  A   172.22.200.103\nwww                 IN  CNAME   asterix\ninformatica       IN    CNAME   asterix\nftp                 IN  CNAME   obelix\n")),(0,o.kt)("p",null,"-"," Crearemos una zona inversa para que el servidor resuelva los nombres de dominio de la red local, se debe modificar el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf.local")," y a\xf1adir la siguiente l\xednea:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'zone "22.172.in-addr.arpa" {\n    type master;\n    file "db.172.22.0.0";\n};\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Esto har\xe1 que la informaci\xf3n de la zona se guarde en db.172.22.0.0 que est\xe1 en el directorio `/var/cache/bind` \n")),(0,o.kt)("p",null,"Descomentamos la siguiente l\xednea en el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/bind/named.conf.local"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'include "/etc/bind/zones.rfc1918";\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"De esta manera se incluir\xe1n todas las zonas que corresponden a las redes privadas, as\xed evitamos que se pregunte por ellas al servidor DNS ra\xedz.\n")),(0,o.kt)("p",null,"Entramos en ese mismo fichero y comentamos su definici\xf3n, ya que la hemos incluido en el fichero anterior:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'...\n//zone "22.172.in-addr.arpa"  { type master; file "/etc/bind/db.empty"; };\n...\n')),(0,o.kt)("p",null,"-"," Creamos el fichero de zona inversa en el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/var/cache/bind/db.172.22.0.0")," y a\xf1adimos la siguiente informaci\xf3n:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL    86400\n@       IN      SOA     dns1.nazareth.org. root.nazareth.org. (\n                              1         ; Serial\n                         604800         ; Refresh\n                          86400         ; Retry\n                        2419200         ; Expire\n                          86400 )       ; Negative Cache TTL\n;\n@   IN  NS      dns1.nazareth.org.\n\n$ORIGIN 22.172.in-addr.arpa.\n\n136.5           IN  PTR     dns1.nazareth.org.\n101.200     IN  PTR     correo.nazareth.org.\n102.200     IN  PTR     asterix.nazareth.org.\n103.200     IN  PTR     obelix.nazareth.org.\n")),(0,o.kt)("p",null,"-"," Reiniciamos el servicio bind9 con el siguiente comando:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl restart bind9\n")),(0,o.kt)("p",null,"-"," En otra m\xe1quina configuramos el DNS en el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/etc/resolv.conf")," coloc\xe1ndolo en primer lugar ya que se va leyendo en orden de posici\xf3n:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"nameserver 172.22.5.136\n")),(0,o.kt)("p",null,"Y ejecutamos el comando ",(0,o.kt)("inlineCode",{parentName:"p"},"dig")," para comprobar que funciona correctamente:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"dig ns www.nazareth.org\n")),(0,o.kt)("h2",{id:"entrega"},"Entrega"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"1. Responde a las preguntas del apartado 2.")),(0,o.kt)("p",null,"-\xbfCu\xe1nto ha tardado en realizar la consulta? \xbfQu\xe9 consultas se han realizado para averiguar la direcci\xf3n IP?"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@ThousandSunny:~$ dig @172.22.5.136  www.josedomingo.org\n\n; <<>> DiG 9.16.33-Debian <<>> @172.22.5.136 www.josedomingo.org\n; (1 server found)\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5587\n;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n; COOKIE: 229329b0860b2be20100000063dcc9b448b8c28492578cca (good)\n;; QUESTION SECTION:\n;www.josedomingo.org.       IN  A\n\n;; ANSWER SECTION:\nwww.josedomingo.org.    900 IN  CNAME   endor.josedomingo.org.      #<<<\ud83c\udf08\u2728\nendor.josedomingo.org.  900 IN  A   37.187.119.60                   #<<<\ud83c\udf08\u2728\n\n;; Query time: 4688 msec        #<<<\ud83d\udd25\ud83d\udd25\n;; SERVER: 172.22.5.136#53(172.22.5.136)\n;; WHEN: Fri Feb 03 09:45:40 CET 2023\n;; MSG SIZE  rcvd: 112\n")),(0,o.kt)("p",null,"La primera consulta ha tardado 4688 milisegundos ",(0,o.kt)("inlineCode",{parentName:"p"},";; Query time: 4688 msec"),"\nSe ha realizado la consulta ",(0,o.kt)("inlineCode",{parentName:"p"},"www.josedomingo.org.\t900\tIN\tCNAME\tendor.josedomingo.org.")," donde consigue el nombre del servidor, gracias a esto vemos como en la siguiente l\xednea aparece la IP del mismo ",(0,o.kt)("inlineCode",{parentName:"p"},"endor.josedomingo.org.\t900\tIN\tA\t37.187.119.60")),(0,o.kt)("p",null,"-Realiza de nuevo la consulta. \xbfCu\xe1nto ha tardado ahora? \xbfPor qu\xe9 ha tardado menos? \xbfQu\xe9 consultas se han realizado para averiguar la direcci\xf3n IP?"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@ThousandSunny:~$ dig @172.22.5.136  www.josedomingo.org\n\n; <<>> DiG 9.16.33-Debian <<>> @172.22.5.136 www.josedomingo.org\n; (1 server found)\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 28371\n;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n; COOKIE: bc2265e384ef0f090100000063dcc9c297e0fbe4f710b738 (good)\n;; QUESTION SECTION:\n;www.josedomingo.org.       IN  A\n\n;; ANSWER SECTION:\nwww.josedomingo.org.    886 IN  CNAME   endor.josedomingo.org.      #<<<\ud83c\udf08\u2728\nendor.josedomingo.org.  886 IN  A   37.187.119.60                   #<<<\ud83c\udf08\u2728\n\n;; Query time: 3 msec       #<<<\ud83d\udd25\ud83d\udd25\n;; SERVER: 172.22.5.136#53(172.22.5.136)\n;; WHEN: Fri Feb 03 09:45:54 CET 2023\n;; MSG SIZE  rcvd: 112\n")),(0,o.kt)("p",null,"Esta vez ha tardado 3 milisegundos ",(0,o.kt)("inlineCode",{parentName:"p"},";; Query time: 3 msec"),", ha tardado menos porque se ha registrado en cache en el fichero ",(0,o.kt)("inlineCode",{parentName:"p"},"/var/cache/bind/")," dentro del servidor dns, por ser recursor."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"2. El resultado de las siguientes consultas desde otra m\xe1quina:")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"- Direcci\xf3n IP de una m\xe1quina o servicio.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"usuario@debian:~$ dig www.nazareth.org\n\n; <<>> DiG 9.16.27-Debian <<>> www.nazareth.org\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39622\n;; flags: qr aa rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n; COOKIE: f8cb1d12805018ca0100000063dcd210a9d94c153b8053ac (good)\n;; QUESTION SECTION:\n;www.nazareth.org.      IN  A\n\n;; ANSWER SECTION:\nwww.nazareth.org.   86400   IN  CNAME   asterix.nazareth.org.\nasterix.nazareth.org.   86400   IN  A   172.22.200.102      #<<<\ud83c\udfb7\ud83d\udc1b IP \ud83c\udfb7\ud83d\udc1b\n\n;; Query time: 0 msec\n;; SERVER: 172.22.5.136#53(172.22.5.136)\n;; WHEN: Fri Feb 03 10:21:20 CET 2023\n;; MSG SIZE  rcvd: 111\n\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"- Servidor DNS con autoridad del dominio.")),(0,o.kt)("p",null,"Para averiguar el servidor DNS con autoridad del dominio, se realiza una consulta de tipo NS, para averiguar el nombre del servidor DNS con autoridad del dominio:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"usuario@debian:~$ dig ns www.nazareth.org\n\n; <<>> DiG 9.16.27-Debian <<>> ns www.nazareth.org\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 57598\n;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 1, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n; COOKIE: b0d19d6dbee3925b0100000063dcd55e6031511c11c36551 (good)\n;; QUESTION SECTION:\n;www.nazareth.org.      IN  NS    #<<<\ud83d\udc7b\ud83d\udc7a NS \ud83d\udc7b\ud83d\udc7a\n\n;; ANSWER SECTION:\nwww.nazareth.org.   86400   IN  CNAME   asterix.nazareth.org.  #<<<\ud83d\udc7b\ud83d\udc7a CNAME \ud83d\udc7b\ud83d\udc7a\n\n;; AUTHORITY SECTION:\nnazareth.org.       86400   IN  SOA dns1.nazareth.org. root.nazareth.org. 1 604800 86400 2419200 86400\n\n;; Query time: 0 msec\n;; SERVER: 172.22.5.136#53(172.22.5.136)\n;; WHEN: Fri Feb 03 10:35:26 CET 2023\n;; MSG SIZE  rcvd: 141\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"- Servidor de correo del dominio.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"usuario@debian:~$ dig mx www.nazareth.org\n\n; <<>> DiG 9.16.27-Debian <<>> mx www.nazareth.org\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 41144\n;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 1, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n; COOKIE: 045220b8900d341c0100000063dcd6c204406c361337968e (good)\n;; QUESTION SECTION:\n;www.nazareth.org.      IN  MX      #<<<\ud83e\udd29\ud83e\udd73 MX \ud83e\udd29\ud83e\udd73\n\n;; ANSWER SECTION:\nwww.nazareth.org.   86400   IN  CNAME   asterix.nazareth.org.   #<<<\ud83e\udd29\ud83e\udd73 CNAME \ud83e\udd29\ud83e\udd73 \n\n;; AUTHORITY SECTION:\nnazareth.org.       86400   IN  SOA dns1.nazareth.org. root.nazareth.org. 1 604800 86400 2419200 86400\n\n;; Query time: 0 msec\n;; SERVER: 172.22.5.136#53(172.22.5.136)\n;; WHEN: Fri Feb 03 10:41:22 CET 2023\n;; MSG SIZE  rcvd: 141\n\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"- Una resoluci\xf3n inversa.")),(0,o.kt)("p",null,"Para esto es necesario conocer la IP de la m\xe1quina o servicio."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"usuario@debian:~$ dig -x 172.22.5.136\n\n; <<>> DiG 9.16.27-Debian <<>> -x 172.22.5.136\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5156\n;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1\n\n;; OPT PSEUDOSECTION:\n; EDNS: version: 0, flags:; udp: 1232\n; COOKIE: bd90284350d965fc0100000063dcdab74bf7d2c3bbba5429 (good)\n;; QUESTION SECTION:\n;136.5.22.172.in-addr.arpa. IN  PTR      #<<<\ud83d\ude0d\ud83e\udd70 PTR \ud83d\ude0d\ud83e\udd70\n\n;; ANSWER SECTION:\n136.5.22.172.in-addr.arpa. 86400 IN PTR dns1.nazareth.org.    #<<<\ud83d\ude0d\ud83e\udd70 PTR \ud83d\ude0d\ud83e\udd70\n\n;; Query time: 4 msec\n;; SERVER: 172.22.5.136#53(172.22.5.136)\n;; WHEN: Fri Feb 03 10:58:15 CET 2023\n;; MSG SIZE  rcvd: 113\n")))}u.isMDXComponent=!0}}]);