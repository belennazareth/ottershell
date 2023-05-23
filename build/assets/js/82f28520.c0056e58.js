"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[6568],{3905:(e,a,t)=>{t.d(a,{Zo:()=>c,kt:()=>k});var r=t(67294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=r.createContext({}),p=function(e){var a=r.useContext(s),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},c=function(e){var a=p(e.components);return r.createElement(s.Provider,{value:a},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},m=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(t),m=n,k=d["".concat(s,".").concat(m)]||d[m]||u[m]||i;return t?r.createElement(k,o(o({ref:a},c),{},{components:t})):r.createElement(k,o({ref:a},c))}));function k(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var i=t.length,o=new Array(i);o[0]=m;var l={};for(var s in a)hasOwnProperty.call(a,s)&&(l[s]=a[s]);l.originalType=e,l[d]="string"==typeof e?e:n,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},26919:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=t(87462),n=(t(67294),t(3905));const i={sidebar_position:5},o="Ejercicios gesti\xf3n de paqueter\xeda",l={unversionedId:"Tasks/gestion_paqueteria_aso",id:"Tasks/gestion_paqueteria_aso",title:"Ejercicios gesti\xf3n de paqueter\xeda",description:"Trabajo con apt, aptitude, dpkg",source:"@site/docs/Tasks/gestion_paqueteria_aso.md",sourceDirName:"Tasks",slug:"/Tasks/gestion_paqueteria_aso",permalink:"/docs/Tasks/gestion_paqueteria_aso",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/gestion_paqueteria_aso.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Compilaci\xf3n de un programa en C utilizando un Makefile.",permalink:"/docs/Tasks/makefile_aso"},next:{title:"Instalaci\xf3n y configuraci\xf3n inicial de OpenLDAP",permalink:"/docs/Tasks/openLDAP"}},s={},p=[{value:"Trabajo con apt, aptitude, dpkg",id:"trabajo-con-apt-aptitude-dpkg",level:2},{value:"Trabajo con ficheros .deb",id:"trabajo-con-ficheros-deb",level:2},{value:"Trabajo con repositorios",id:"trabajo-con-repositorios",level:2},{value:"Trabajo con directorios",id:"trabajo-con-directorios",level:2}],c={toc:p},d="wrapper";function u(e){let{components:a,...i}=e;return(0,n.kt)(d,(0,r.Z)({},c,i,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"ejercicios-gesti\xf3n-de-paqueter\xeda"},"Ejercicios gesti\xf3n de paqueter\xeda"),(0,n.kt)("h2",{id:"trabajo-con-apt-aptitude-dpkg"},"Trabajo con apt, aptitude, dpkg"),(0,n.kt)("p",null,"Prepara una m\xe1quina virtual con Debian bullseye, realizar las siguientes acciones:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Que acciones consigo al realizar apt update y apt upgrade. Explica detalladamente."),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"apt update: se ejecuta como superusuario, conseguimos actualizar la paqueter\xeda disponible adem\xe1s de las versiones, la informaci\xf3n que usa se encuentra en el fichero ",(0,n.kt)("strong",{parentName:"p"},"/etc/apt/sources.list"),".")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"apt upgrade: se ejecuta una vez se actualizan los repositorios e instala y actualiza versiones de los paquetes ya instalados.")))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Lista la relaci\xf3n de paquetes que pueden ser actualizados. \xbfQu\xe9 informaci\xf3n puedes sacar a tenor de lo mostrado en el listado?."))),(0,n.kt)("p",null,"Para poder listar los paquetes actualizables se usa el comando ",(0,n.kt)("strong",{parentName:"p"},"apt list --upgradable"),".\nCon esto podemos ver el paquete que tiene una versi\xf3n actualizada en el repositorio y la arquitectura del sistema:"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Repo",src:t(54546).Z,width:"890",height:"432"})),(0,n.kt)("ol",{start:3},(0,n.kt)("li",{parentName:"ol"},"Indica la versi\xf3n instalada, candidata as\xed como la prioridad del paquete openssh-client.")),(0,n.kt)("p",null,"Para esto se ha usado el comando ",(0,n.kt)("strong",{parentName:"p"},"apt policy"),":"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Repo",src:t(83266).Z,width:"707",height:"224"})),(0,n.kt)("ol",{start:4},(0,n.kt)("li",{parentName:"ol"},"\xbfC\xf3mo puedes sacar informaci\xf3n de un paquete oficial instalado o que no este instalado?")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"apt show"),": detalla la informaci\xf3n de paquetes pudiendo estar este instalado o no."),(0,n.kt)("p",null,"Un ejemplo ser\xeda:"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Repo",src:t(63409).Z,width:"942",height:"543"})),(0,n.kt)("ol",{start:5},(0,n.kt)("li",{parentName:"ol"},"Saca toda la informaci\xf3n que puedas del paquete openssh-client que tienes actualmente instalado en tu m\xe1quina.")),(0,n.kt)("p",null,"Para ver toda la informaci\xf3n de este paquete se puede usar ",(0,n.kt)("strong",{parentName:"p"},"apt-cache showpkg"),", este nos da mucha informaci\xf3n de las dependencias inversas, versi\xf3n, descripciones, dependencias..."),(0,n.kt)("ol",{start:6},(0,n.kt)("li",{parentName:"ol"},"Saca toda la informaci\xf3n que puedas del paquete openssh-client candidato a actualizar en tu m\xe1quina.")),(0,n.kt)("p",null,"Para sacar toda la informaci\xf3n se he usado el comando ",(0,n.kt)("strong",{parentName:"p"},"aptitude show")," donde vemos:"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Repo",src:t(30940).Z,width:"1395",height:"878"})),(0,n.kt)("ol",{start:7},(0,n.kt)("li",{parentName:"ol"},"Lista todo el contenido referente al paquete openssh-client actual de tu m\xe1quina. Utiliza para ello tanto dpkg como apt.")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"dpkg -L openssh-client"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"apt-file list openssh-client")))),(0,n.kt)("ol",{start:8},(0,n.kt)("li",{parentName:"ol"},"Listar el contenido de un paquete sin la necesidad de instalarlo o descargarlo.")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"apt-file list"))),(0,n.kt)("ol",{start:9},(0,n.kt)("li",{parentName:"ol"},"Simula la instalaci\xf3n del paquete openssh-client.")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"apt-get install -s openssh-client"),(0,n.kt)("img",{alt:"Repo",src:t(49836).Z,width:"1323",height:"327"}))),(0,n.kt)("ol",{start:10},(0,n.kt)("li",{parentName:"ol"},"\xbfQu\xe9 comando te informa de los posible bugs que presente un determinado paquete?")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"apt-listbugs -s all list"))),(0,n.kt)("ol",{start:11},(0,n.kt)("li",{parentName:"ol"},"Despu\xe9s de realizar un apt update && apt upgrade. Si quisieras actualizar \xfanicamente los paquetes que tienen de cadena openssh. \xbfQu\xe9 procedimiento seguir\xedas?. Realiza esta acci\xf3n, con las estructuras repetitivas que te ofrece bash, as\xed como con el comando xargs.")),(0,n.kt)("ol",{start:12},(0,n.kt)("li",{parentName:"ol"},"\xbfC\xf3mo encontrar\xedas qu\xe9 paquetes dependen de un paquete espec\xedfico.")),(0,n.kt)("ol",{start:13},(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo proceder\xedas para encontrar el paquete al que pertenece un determinado fichero?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfQue procedimientos emplear\xedas para liberar la cach\xe9 en cuanto a descargas de paqueter\xeda?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Realiza la instalaci\xf3n del paquete keyboard-configuration pasando previamente los valores de los par\xe1metros de configuraci\xf3n como variables de entorno.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Reconfigura el paquete locales de tu equipo, a\xf1adiendo una localizaci\xf3n que no exista previamente. Comprueba a modificar las variables de entorno correspondientes para que la sesi\xf3n del usuario utilice otra localizaci\xf3n.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Interrumpe la configuraci\xf3n de un paquete y explica los pasos a dar para continuar la instalaci\xf3n.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Explica la instrucci\xf3n que utilizar\xedas para hacer una actualizaci\xf3n completa de todos los paquetes de tu sistema de manera completamente no interactiva")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Bloquea la actualizaci\xf3n de determinados paquetes."))),(0,n.kt)("h2",{id:"trabajo-con-ficheros-deb"},"Trabajo con ficheros .deb"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Descarga un paquete sin instalarlo, es decir, descarga el fichero .deb correspondiente. Indica diferentes formas de hacerlo.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo puedes ver el contenido, que no extraerlo, de lo que se instalar\xe1 en el sistema de un paquete deb?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Sobre el fichero .deb descargado, utiliza el comando ar. ar permite extraer el contenido de una paquete deb. Indica el procedimiento para visualizar con ar el contenido del paquete deb. Con el paquete que has descargado y utilizando el comando ar, descomprime el paquete. \xbfQu\xe9 informaci\xf3n dispones despu\xe9s de la extracci\xf3n?. Indica la finalidad de lo extra\xeddo.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descomprimir lo extra\xeddo por ar del punto anterior. \xbfQu\xe9 informaci\xf3n contiene?"))),(0,n.kt)("h2",{id:"trabajo-con-repositorios"},"Trabajo con repositorios"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"A\xf1ade a tu fichero sources.list los repositorios de bullseye-backports y sid.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Configura el sistema APT para que los paquetes de debian bullseye tengan mayor prioridad y por tanto sean los que se instalen por defecto.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Configura el sistema APT para que los paquetes de bullseye-backports tengan mayor prioridad que los de unstable.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo a\xf1ades la posibilidad de descargar paqueter\xeda de la arquitectura i386 en tu sistema. \xbfQue comando has empleado?. Lista arquitecturas no nativas. \xbfC\xf3mo proceder\xedas para desechar la posibilidad de descargar paqueter\xeda de la arquitectura i386?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Si quisieras descargar un paquete, \xbfc\xf3mo puedes saber todas las versiones disponible de dicho paquete?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete del repositorio stable.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete del repositorio de buster-backports.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete del repositorio de sid.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete de arquitectura i386."))),(0,n.kt)("h2",{id:"trabajo-con-directorios"},"Trabajo con directorios"),(0,n.kt)("p",null,"Que cometidos tienen:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"1. /var/lib/apt/lists/\n2. /var/lib/dpkg/available\n3. /var/lib/dpkg/status\n4. /var/cache/apt/archives/\n")))}u.isMDXComponent=!0},83266:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/paqueteriaASO-2-ef8586db6223cc6dfcfc4fc76517004f.png"},63409:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/paqueteriaASO-3-359c9df81be58fe3c1fb80e3ccd92aae.png"},30940:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/paqueteriaASO-4-491a9df6d4fdf098a2d86fc90be99ce2.png"},49836:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/paqueteriaASO-5-16b82220669bb659f5891b9920d5a8f9.png"},54546:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/paqueteriaASO-4f618be4d77ca30e560366849d2445dc.png"}}]);