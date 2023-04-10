"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[448],{3905:(e,a,t)=>{t.d(a,{Zo:()=>u,kt:()=>m});var n=t(67294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=n.createContext({}),c=function(e){var a=n.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},u=function(e){var a=c(e.components);return n.createElement(o.Provider,{value:a},e.children)},p={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},d=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(t),m=r,g=d["".concat(o,".").concat(m)]||d[m]||p[m]||l;return t?n.createElement(g,i(i({ref:a},u),{},{components:t})):n.createElement(g,i({ref:a},u))}));function m(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=d;var s={};for(var o in a)hasOwnProperty.call(a,o)&&(s[o]=a[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<l;c++)i[c]=t[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},55469:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var n=t(87462),r=(t(67294),t(3905));const l={sidebar_position:6},i="Creaci\xf3n y configuraci\xf3n de un escenario router-nat",s={unversionedId:"Tasks/router_nat",id:"Tasks/router_nat",title:"Creaci\xf3n y configuraci\xf3n de un escenario router-nat",description:"Procedimiento",source:"@site/docs/Tasks/router_nat.md",sourceDirName:"Tasks",slug:"/Tasks/router_nat",permalink:"/docs/Tasks/router_nat",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/router_nat.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Instalaci\xf3n y configuraci\xf3n inicial de OpenLDAP",permalink:"/docs/Tasks/openLDAP"},next:{title:"Clonaci\xf3n e instant\xe1neas de m\xe1quinas virtuales",permalink:"/docs/Tasks/clonacion_instantanea"}},o={},c=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Entrega",id:"entrega",level:2}],u={toc:c};function p(e){let{components:a,...l}=e;return(0,r.kt)("wrapper",(0,n.Z)({},u,l,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"creaci\xf3n-y-configuraci\xf3n-de-un-escenario-router-nat"},"Creaci\xf3n y configuraci\xf3n de un escenario router-nat"),(0,r.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,r.kt)("p",null,"Queremos automatizar la creaci\xf3n de la siguiente infraestructura usando Vagrant, el esquema que queremos desarrollar, que vemos en la imagen, tiene las siguientes caracter\xedsticas:"),(0,r.kt)("p",null,"Es escenario tiene dos m\xe1quinas:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"router: que est\xe1 conectada a una red p\xfablica y a una red privada (muy aislada).")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"cliente: esta m\xe1quina est\xe1 conectada a la misma red privada que la m\xe1quina anterior.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"La m\xe1quina router debe salir por la red p\xfablica. Esta m\xe1quina no va a utilizar eth0 para acceder al exterior."))),(0,r.kt)("p",null,"Para esto se ha creado un fichero Vagrantfile que contiene la configuraci\xf3n de las m\xe1quinas. El fichero Vagrantfile que se ha creado es el siguiente:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ruby"},'\n\n  Vagrant.configure("2") do |config|\n    config.vm.box = "debian/bullseye64"\n    config.vm.synced_folder ".", "/vagrant", disabled: true\n    \n    config.vm.define :router do |router|\n      router.vm.hostname = "router"\n      router.vm.network :public_network,\n              :dev => "bridge0",\n              :mode => "bridge",\n              :type => "bridge"\n      router.vm.network :private_network,\n        :libvirt__network_name => "redaislada",\n        :libvirt__dhcp_enabled => false,\n        :ip => "10.0.0.1",\n        :libvirt__forward_mode => "veryisolated"\n    end\n\n    config.vm.define :client do |client|\n      client.vm.hostname = "client"\n      client.vm.network :private_network,\n        :libvirt__network_name => "redaislada",\n        :libvirt__dhcp_enabled => false,\n        :ip => "10.0.0.2",\n        :libvirt__forward_mode => "veryisolated"\n    end\n      \n  end\n    \n')),(0,r.kt)("p",null,"Para crear el escenario, debemos ejecutar el siguiente comando:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"vagrant up\n")),(0,r.kt)("p",null,"Para acceder a las m\xe1quinas, debemos ejecutar el siguiente comando:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"vagrant ssh router\nvagrant ssh client\n")),(0,r.kt)("p",null,"Para destruir el escenario, debemos ejecutar el siguiente comando:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"vagrant destroy -f\n")),(0,r.kt)("p",null,"\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\ud83e\udda6\u200a                 \ud83e\udda6\u200a                    \ud83e\udda6\u200a                     \ud83e\udda6\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164"),(0,r.kt)("p",null,"Queremos configurar el escenario con ansible, para que cumpla lo siguiente:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"La m\xe1quina cliente debe tener acceso a internet. Para ello debe salir por eth1 y la m\xe1quina router debe estar configurada para enrutar las peticiones de las m\xe1quinas conectadas a la red privada. Del mismo modo, eth0 s\xf3lo se utiliza para acceder con vagrant ssh. Debes pensar qu\xe9 configuraci\xf3n debe tener la m\xe1quina cliente: puerta de enlace, configuraci\xf3n dns,\u2026")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"La m\xe1quina cliente tendr\xe1 un servidor web instalado, la m\xe1quina router har\xe1 DNAT para que podamos acceder a la p\xe1gina usando su IP p\xfablica."))),(0,r.kt)("p",null,"La receta ansible debe tener al menos 4 roles:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"common: Estas tareas se deben ejecutar en todos los nodos: actualizar los paquetes y a\xf1adir tu clave p\xfablica a la m\xe1quinas para poder acceder a ellas con ssh. \xbfExiste alg\xfan m\xf3dulo de ansible que te permita copiar claves p\xfablicas?.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"router: Todas las tareas necesarias para configurar router c\xf3mo router-nat y que salga a internet por eth1. Las configuraciones deben ser permanentes. \xbfExiste alg\xfan m\xf3dulo de ansible que te permita ejecutar sysctl?.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"cliente: Todas las tareas necesarias para que las m\xe1quinas conectadas a la red privada salgan a internet por eth1.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"web: Las tareas necesarias para instalar y configurar un servidor web con una p\xe1gina est\xe1tica en la m\xe1quina cliente."))),(0,r.kt)("p",null,"Al configurar ansible se ejecuta el siguiente comando:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ansible-playbook site.yaml\n")),(0,r.kt)("p",null,"Y obtenemos el siguiente resultado:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:t(86311).Z,width:"844",height:"947"})),(0,r.kt)("p",null,"\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\ud83e\udda6\u200a                 \ud83e\udda6\u200a                    \ud83e\udda6\u200a                     \ud83e\udda6\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164\u3164"),(0,r.kt)("h2",{id:"entrega"},"Entrega"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"1. Entrega la URL del repositorio GitHub donde has alojado todos los ficheros.")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/belennazareth/vagrant_ansible"},"Repositorio")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"2. Entrega una captura de pantalla accediendo por ssh a las dos m\xe1quinas (sin utilizar vagrant ssh, es decir sin hacer conexiones a eth0). Usa la opci\xf3n -A de ssh para acceder al cliente.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ssh -A vagrant@192.168.1.105\n\nssh -AJ vagrant@192.168.1.105 vagrant@10.0.0.2\n")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:t(980).Z,width:"826",height:"474"})),(0,r.kt)("p",null,"*Nota: accedemos al cliente por con -AJ para que haga puente con el router y as\xed poder acceder a la m\xe1quina cliente desde el router."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"3. Entrega capturas de pantalla donde se vean las puertas de enlaces de los dos equipos.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ip route\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Router")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:t(86285).Z,width:"494",height:"111"})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Cliente")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:t(17954).Z,width:"491",height:"92"})),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"4. Entrega capturas de pantalla donde se vean las m\xe1quinas haciendo ping al exterior.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ping 8.8.8.8\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Router")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:t(74420).Z,width:"446",height:"172"})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Cliente")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:t(69903).Z,width:"447",height:"175"})),(0,r.kt)("p",null,"*Nota: para que esto funcione se tienen que conectar las dos m\xe1quinas para que el cliente pueda acceder al exterior a trav\xe9s del router:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"up iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth1 -j MASQUERADE\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"5. Entrega una captura de pantalla donde se vea un acceso a la p\xe1gina web alojada en la m\xe1quina cliente.")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:t(12024).Z,width:"665",height:"336"})),(0,r.kt)("p",null,"*Nota: para que esto funcione es necesario meter en el router una l\xednea en interfaces para que todo lo que llegue al router por el puerto 80 se mande al cliente:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"up iptables -t nat -A PREROUTING -p tcp --dport 80 -i eth1 -j DNAT --to 10.0.0.2\n")))}p.isMDXComponent=!0},980:(e,a,t)=>{t.d(a,{Z:()=>n});const n=t.p+"assets/images/practicaSRI-10-30f86511eccde4a7930dd4f1cd299296.png"},86285:(e,a,t)=>{t.d(a,{Z:()=>n});const n=t.p+"assets/images/practicaSRI-11-5c1e599e96b1569f878ed2512d243b19.png"},17954:(e,a,t)=>{t.d(a,{Z:()=>n});const n=t.p+"assets/images/practicaSRI-12-140bc9b4dbdaa82d24ab017fdbb9358d.png"},74420:(e,a,t)=>{t.d(a,{Z:()=>n});const n=t.p+"assets/images/practicaSRI-13-ef35b4e3b49d965e86d4eece4097cd5d.png"},69903:(e,a,t)=>{t.d(a,{Z:()=>n});const n=t.p+"assets/images/practicaSRI-14-8de137df6e0a29998758c003645e787a.png"},12024:(e,a,t)=>{t.d(a,{Z:()=>n});const n=t.p+"assets/images/practicaSRI-15-57a22fae5577ce6ed42ea905fec869c1.png"},86311:(e,a,t)=>{t.d(a,{Z:()=>n});const n=t.p+"assets/images/practicaSRI-9-8019ae48bd02058220237ee86a1fed24.png"}}]);