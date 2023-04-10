"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[1495],{3905:(e,a,r)=>{r.d(a,{Zo:()=>c,kt:()=>m});var t=r(67294);function n(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function o(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,t)}return r}function p(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?o(Object(r),!0).forEach((function(a){n(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function i(e,a){if(null==e)return{};var r,t,n=function(e,a){if(null==e)return{};var r,t,n={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],a.indexOf(r)>=0||(n[r]=e[r]);return n}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=t.createContext({}),l=function(e){var a=t.useContext(s),r=a;return e&&(r="function"==typeof e?e(a):p(p({},a),e)),r},c=function(e){var a=l(e.components);return t.createElement(s.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},d=t.forwardRef((function(e,a){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=l(r),m=n,g=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return r?t.createElement(g,p(p({ref:a},c),{},{components:r})):t.createElement(g,p({ref:a},c))}));function m(e,a){var r=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var o=r.length,p=new Array(o);p[0]=d;var i={};for(var s in a)hasOwnProperty.call(a,s)&&(i[s]=a[s]);i.originalType=e,i.mdxType="string"==typeof e?e:n,p[1]=i;for(var l=2;l<o;l++)p[l]=r[l];return t.createElement.apply(null,p)}return t.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3226:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>s,contentTitle:()=>p,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var t=r(87462),n=(r(67294),r(3905));const o={sidebar_position:33},p="apache2 como proxy inverso",i={unversionedId:"Tasks/proxy_apache2",id:"Tasks/proxy_apache2",title:"apache2 como proxy inverso",description:"Procedimiento",source:"@site/docs/Tasks/proxy_apache2.md",sourceDirName:"Tasks",slug:"/Tasks/proxy_apache2",permalink:"/docs/Tasks/proxy_apache2",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/proxy_apache2.md",tags:[],version:"current",sidebarPosition:33,frontMatter:{sidebar_position:33},sidebar:"tutorialSidebar",previous:{title:"Instalaci\xf3n de phpmyadmin",permalink:"/docs/Tasks/phpmyadmin"},next:{title:"Extras",permalink:"/docs/category/extras"}},s={},l=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Entrega",id:"entrega",level:2},{value:"1. Configuraci\xf3n de apache2 para la realizaci\xf3n del punto 8.",id:"1-configuraci\xf3n-de-apache2-para-la-realizaci\xf3n-del-punto-8",level:3},{value:"2. Pantallazos donde se compruebe el acceso a las dos p\xe1ginas web: www.servidor.org/app1 y www.servidor.org/app2.",id:"2-pantallazos-donde-se-compruebe-el-acceso-a-las-dos-p\xe1ginas-web-wwwservidororgapp1-y-wwwservidororgapp2",level:3},{value:"3. Quita la directiva ProxyPassReverse y comprueba que no se sigue la redirecci\xf3n. Realiza una petici\xf3n HEAD con curl a http://www.app1.org/directorio. \xbfQu\xe9 cabecera tienes que comprobar para asegurar que la redirecci\xf3n no funciona?",id:"3-quita-la-directiva-proxypassreverse-y-comprueba-que-no-se-sigue-la-redirecci\xf3n-realiza-una-petici\xf3n-head-con-curl-a-httpwwwapp1orgdirectorio-qu\xe9-cabecera-tienes-que-comprobar-para-asegurar-que-la-redirecci\xf3n-no-funciona",level:3},{value:"4. A\xf1ade la directiva ProxyPassReverse, y vuelve a hacer una petici\xf3n HEAD con curl a http://www.app1.org/app/directorio. \xbfQu\xe9 cabecera debemos mirar para comprobar que la redirecci\xf3n va a funcionar?",id:"4-a\xf1ade-la-directiva-proxypassreverse-y-vuelve-a-hacer-una-petici\xf3n-head-con-curl-a-httpwwwapp1orgappdirectorio-qu\xe9-cabecera-debemos-mirar-para-comprobar-que-la-redirecci\xf3n-va-a-funcionar",level:3}],c={toc:l};function u(e){let{components:a,...o}=e;return(0,n.kt)("wrapper",(0,t.Z)({},c,o,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"apache2-como-proxy-inverso"},"apache2 como proxy inverso"),(0,n.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"1. Descarga el siguiente ",(0,n.kt)("a",{parentName:"strong",href:"https://github.com/belennazareth/ottershell/blob/main/static/img/SRI%2BHLC/ejercicio_proxy%20(2).zip"},"fichero")," donde encontrar\xe1s un escenario vagrant y una receta ansible para configurar el siguiente escenario:")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"- Una m\xe1quina \ud83d\udd39proxy\ud83d\udd39 conectada al exterior y a una red interna."),"\n",(0,n.kt)("strong",{parentName:"p"},"- Una m\xe1quina \ud83d\udd39servidorweb\ud83d\udd39 conectada a la red interna.")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"En la m\xe1quina servidorweb tenemos instalado un apache2 con dos VirtualHosts (interno.example1.org y interno.example2.org). Suponemos que no podemos acceder a ella por la red de mantenimiento. Crea el escenario vagrant y pasa el ansible para configurar la m\xe1quina servidorweb.")),(0,n.kt)("p",null,"Creamos el escenario ejecutando ",(0,n.kt)("inlineCode",{parentName:"p"},"vagrant up")," y pasamos el ansible con ",(0,n.kt)("inlineCode",{parentName:"p"},"ansible-playbook -i hosts site.yaml")," en la carpeta ansible.\nHay que tener en cuenta que el fichero hosts tiene que tener la IP de la m\xe1quina servidorweb."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"2. Instala un servidor web apache2 en la m\xe1quina proxy. Vamos a configurar el proxy para acceder a las p\xe1ginas del servidorweb: A la primera p\xe1gina con la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app1.org"},"www.app1.org")," y a la segunda p\xe1gina con la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app2.org"},"www.app2.org"),".")),(0,n.kt)("p",null,"En la m\xe1quina proxy ejecutamos ",(0,n.kt)("inlineCode",{parentName:"p"},"sudo apt install apache2")," para instalar apache2. "),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"3. Activamos los m\xf3dulos necesarios:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"a2enmod proxy proxy_http\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Reinicia el servidor web.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"systemctl restart apache2\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"4. Como se usan dos nombres distintos vamos a usar dos VirtualHosts. Veamos el VirtualHost ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app1.org"},"www.app1.org"),", crea el fichero de configuraci\xf3n de esta forma:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'<VirtualHost *:80>\n    ServerName www.app1.org\n    ProxyPass  / "http://interno.example1.org/" \n</VirtualHost>\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"F\xedjate que no hace falta la directiva DocumentRoot. Otra forma de poner la misma configuraci\xf3n ser\xeda:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'<VirtualHost *:80>\n    ServerName www.app1.org\n    <Location "/">\n        ProxyPass "http://interno.example1.org/"\n    </Location>\n    ...\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Activa el VirtualHost. Crea el VirtualHost ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app2.org"},"www.app2.org"))),(0,n.kt)("p",null,"Creamos los ficheros de configuraci\xf3n de los VirtualHosts en la ruta ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/apache2/sites-available/")," y los activamos con ",(0,n.kt)("inlineCode",{parentName:"p"},"a2ensite nombre_fichero.conf"),"."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"5. Configura la resoluci\xf3n est\xe1tica de un cliente para acceder a la m\xe1quina proxy usando los nombres ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app1.org"},"www.app1.org")," y ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app2.org."},"www.app2.org.")," Y accede a las p\xe1ginas web.")),(0,n.kt)("p",null,"En la m\xe1quina cliente ejecutamos ",(0,n.kt)("inlineCode",{parentName:"p"},"sudo nano /etc/hosts")," y a\xf1adimos las siguientes l\xedneas:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"[IP_PROXY] www.app1.org\n[IP_PROXY] www.app2.org\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"6. Al acceder a ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app1.org/directorio"},"http://www.app1.org/directorio")," se debe realizar una redirecci\xf3n al directorio nuevodirectorio. Podemos comprobar que no funciona de manera adecuada, ya que la URL cambia a ",(0,n.kt)("a",{parentName:"strong",href:"http://interno.example1.org/nuevodirectorio"},"http://interno.example1.org/nuevodirectorio"),". Y no podemos acceder a interno.example1.org.")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"7. Para solucionar el problema de la redirecci\xf3n, vamos a usar la directiva ProxyPassReverse, para ello modifica los VirtualHost de esta manera:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'<VirtualHost *:80>\n    ServerName www.app1.org\n    ProxyPass  / "http://interno.example1.org/" \n    ProxyPassReverse / "http://interno.example1.org/" \n</VirtualHost>\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"O de esta forma:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'<VirtualHost *:80>\n    ServerName www.app1.org\n    <Location "/">\n        ProxyPass "http://interno.example1.org/"\n        ProxyPassReverse "http://interno.example1.org/" \n    </Location>\n    ...\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Vuelve a acceder a la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.app1.org/directorio"},"http://www.app1.org/directorio")," y comprueba que ya funciona de manera adecuada.")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"8. Modifica la configuraci\xf3n del proxy para acceder a las p\xe1ginas web con las siguientes URL: ",(0,n.kt)("a",{parentName:"strong",href:"http://www.servidor.org/app1"},"www.servidor.org/app1")," y ",(0,n.kt)("a",{parentName:"strong",href:"http://www.servidor.org/app2"},"www.servidor.org/app2"),".")),(0,n.kt)("p",null,"Para ello creamos un virtualhost en la m\xe1quina proxy con la siguiente configuraci\xf3n:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'<VirtualHost *:80>\n    ServerName www.servidor.org\n    \n    <Location "/app1">\n        ProxyPass "http://interno.example1.org/"\n        ProxyPassReverse "http://interno.example1.org/"\n    </Location>\n\n    <Location "/app2">\n        ProxyPass "http://interno.example2.org/"\n        ProxyPassReverse "http://interno.example2.org/"\n    </Location>\n</VirtualHost>\n')),(0,n.kt)("p",null,"En el /etc/hosts de la m\xe1quina cliente a\xf1adimos las siguientes l\xedneas:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"[IP_PROXY] www.servidor.org\n")),(0,n.kt)("p",null,"Y reiniciamos el servicio con ",(0,n.kt)("inlineCode",{parentName:"p"},"systemctl restart apache2"),"."),(0,n.kt)("h2",{id:"entrega"},"Entrega"),(0,n.kt)("h3",{id:"1-configuraci\xf3n-de-apache2-para-la-realizaci\xf3n-del-punto-8"},"1. Configuraci\xf3n de apache2 para la realizaci\xf3n del punto 8."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'<VirtualHost *:80>\n    ServerName www.servidor.org\n    \n    <Location "/app1">\n        ProxyPass "http://interno.example1.org/"\n        ProxyPassReverse "http://interno.example1.org/"\n    </Location>\n\n    <Location "/app2">\n        ProxyPass "http://interno.example2.org/"\n        ProxyPassReverse "http://interno.example2.org/"\n    </Location>\n</VirtualHost>\n')),(0,n.kt)("h3",{id:"2-pantallazos-donde-se-compruebe-el-acceso-a-las-dos-p\xe1ginas-web-wwwservidororgapp1-y-wwwservidororgapp2"},"2. Pantallazos donde se compruebe el acceso a las dos p\xe1ginas web: ",(0,n.kt)("a",{parentName:"h3",href:"http://www.servidor.org/app1"},"www.servidor.org/app1")," y ",(0,n.kt)("a",{parentName:"h3",href:"http://www.servidor.org/app2"},"www.servidor.org/app2"),"."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"proxy",src:r(75675).Z,width:"889",height:"675"}),"\n",(0,n.kt)("img",{alt:"proxy",src:r(75260).Z,width:"889",height:"675"})),(0,n.kt)("h3",{id:"3-quita-la-directiva-proxypassreverse-y-comprueba-que-no-se-sigue-la-redirecci\xf3n-realiza-una-petici\xf3n-head-con-curl-a-httpwwwapp1orgdirectorio-qu\xe9-cabecera-tienes-que-comprobar-para-asegurar-que-la-redirecci\xf3n-no-funciona"},"3. Quita la directiva ProxyPassReverse y comprueba que no se sigue la redirecci\xf3n. Realiza una petici\xf3n HEAD con curl a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.app1.org/directorio"},"http://www.app1.org/directorio"),". \xbfQu\xe9 cabecera tienes que comprobar para asegurar que la redirecci\xf3n no funciona?"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"curl -I http://www.app1.org/directorio\n")),(0,n.kt)("p",null,"Aparece el mensaje:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"HTTP/1.1 301 Moved Permanently\nDate: Fri, 07 Apr 2023 17:52:04 GMT\nServer: Apache/2.4.56 (Debian)\nLocation: http://interno.example1.org/nuevodirectorio\nContent-Type: text/html; charset=iso-8859-1\n")),(0,n.kt)("p",null,"En el ",(0,n.kt)("inlineCode",{parentName:"p"},"Location")," se puede ver que no se sigue la redirecci\xf3n."),(0,n.kt)("h3",{id:"4-a\xf1ade-la-directiva-proxypassreverse-y-vuelve-a-hacer-una-petici\xf3n-head-con-curl-a-httpwwwapp1orgappdirectorio-qu\xe9-cabecera-debemos-mirar-para-comprobar-que-la-redirecci\xf3n-va-a-funcionar"},"4. A\xf1ade la directiva ProxyPassReverse, y vuelve a hacer una petici\xf3n HEAD con curl a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.app1.org/app/directorio"},"http://www.app1.org/app/directorio"),". \xbfQu\xe9 cabecera debemos mirar para comprobar que la redirecci\xf3n va a funcionar?"),(0,n.kt)("p",null,"Volvemos a ejecutar:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"curl -I http://www.app1.org/directorio\n")),(0,n.kt)("p",null,"Y ahora aparece el mensaje:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"HTTP/1.1 301 Moved Permanently\nDate: Fri, 07 Apr 2023 17:54:35 GMT\nServer: Apache/2.4.56 (Debian)\nLocation: http://www.app1.org/nuevodirectorio\nContent-Type: text/html; charset=iso-8859-1\n")),(0,n.kt)("p",null,"En el ",(0,n.kt)("inlineCode",{parentName:"p"},"Location")," se puede ver que ahora s\xed se sigue la redirecci\xf3n."))}u.isMDXComponent=!0},75260:(e,a,r)=>{r.d(a,{Z:()=>t});const t=r.p+"assets/images/taller4SRI3-2-4fd0442f2e8ac61f6e12dfa925304d66.png"},75675:(e,a,r)=>{r.d(a,{Z:()=>t});const t=r.p+"assets/images/taller4SRI3-effb7f208c53b69e0ce4b384a9f564b8.png"}}]);