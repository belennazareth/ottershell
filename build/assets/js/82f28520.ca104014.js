"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[568],{3905:(e,a,t)=>{t.d(a,{Zo:()=>c,kt:()=>m});var r=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=r.createContext({}),s=function(e){var a=r.useContext(p),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},c=function(e){var a=s(e.components);return r.createElement(p.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},u=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(t),m=n,k=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return t?r.createElement(k,o(o({ref:a},c),{},{components:t})):r.createElement(k,o({ref:a},c))}));function m(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var i=t.length,o=new Array(i);o[0]=u;var l={};for(var p in a)hasOwnProperty.call(a,p)&&(l[p]=a[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var s=2;s<i;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},6919:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=t(7462),n=(t(7294),t(3905));const i={sidebar_position:5},o="Ejercicios gesti\xf3n de paqueter\xeda",l={unversionedId:"Tasks/gestion_paqueteria_aso",id:"Tasks/gestion_paqueteria_aso",title:"Ejercicios gesti\xf3n de paqueter\xeda",description:"Trabajo con apt, aptitude, dpkg",source:"@site/docs/Tasks/gestion_paqueteria_aso.md",sourceDirName:"Tasks",slug:"/Tasks/gestion_paqueteria_aso",permalink:"/docs/Tasks/gestion_paqueteria_aso",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/gestion_paqueteria_aso.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Compilaci\xf3n de un programa en C utilizando un Makefile.",permalink:"/docs/Tasks/makefile_aso"},next:{title:"Markdown Features",permalink:"/docs/Tasks/markdown-features"}},p={},s=[{value:"Trabajo con apt, aptitude, dpkg",id:"trabajo-con-apt-aptitude-dpkg",level:2},{value:"Trabajo con ficheros .deb",id:"trabajo-con-ficheros-deb",level:2},{value:"Trabajo con repositorios",id:"trabajo-con-repositorios",level:2},{value:"Trabajo con directorios",id:"trabajo-con-directorios",level:2}],c={toc:s};function d(e){let{components:a,...t}=e;return(0,n.kt)("wrapper",(0,r.Z)({},c,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"ejercicios-gesti\xf3n-de-paqueter\xeda"},"Ejercicios gesti\xf3n de paqueter\xeda"),(0,n.kt)("h2",{id:"trabajo-con-apt-aptitude-dpkg"},"Trabajo con apt, aptitude, dpkg"),(0,n.kt)("p",null,"Prepara una m\xe1quina virtual con Debian bullseye, realizar las siguientes acciones:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Que acciones consigo al realizar apt update y apt upgrade. Explica detalladamente.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Lista la relaci\xf3n de paquetes que pueden ser actualizados. \xbfQu\xe9 informaci\xf3n puedes sacar a tenor de lo mostrado en el listado?.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica la versi\xf3n instalada, candidata as\xed como la prioridad del paquete openssh-client.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo puedes sacar informaci\xf3n de un paquete oficial instalado o que no este instalado?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Saca toda la informaci\xf3n que puedas del paquete openssh-client que tienes actualmente instalado en tu m\xe1quina.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Saca toda la informaci\xf3n que puedas del paquete openssh-client candidato a actualizar en tu m\xe1quina.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Lista todo el contenido referente al paquete openssh-client actual de tu m\xe1quina. Utiliza para ello tanto dpkg como apt.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Listar el contenido de un paquete sin la necesidad de instalarlo o descargarlo.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Simula la instalaci\xf3n del paquete openssh-client.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfQu\xe9 comando te informa de los posible bugs que presente un determinado paquete?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Despu\xe9s de realizar un apt update && apt upgrade. Si quisieras actualizar \xfanicamente los paquetes que tienen de cadena openssh. \xbfQu\xe9 procedimiento seguir\xedas?. Realiza esta acci\xf3n, con las estructuras repetitivas que te ofrece bash, as\xed como con el comando xargs.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo encontrar\xedas qu\xe9 paquetes dependen de un paquete espec\xedfico.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo proceder\xedas para encontrar el paquete al que pertenece un determinado fichero?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfQue procedimientos emplear\xedas para liberar la cach\xe9 en cuanto a descargas de paqueter\xeda?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Realiza la instalaci\xf3n del paquete keyboard-configuration pasando previamente los valores de los par\xe1metros de configuraci\xf3n como variables de entorno.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Reconfigura el paquete locales de tu equipo, a\xf1adiendo una localizaci\xf3n que no exista previamente. Comprueba a modificar las variables de entorno correspondientes para que la sesi\xf3n del usuario utilice otra localizaci\xf3n.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Interrumpe la configuraci\xf3n de un paquete y explica los pasos a dar para continuar la instalaci\xf3n.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Explica la instrucci\xf3n que utilizar\xedas para hacer una actualizaci\xf3n completa de todos los paquetes de tu sistema de manera completamente no interactiva")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Bloquea la actualizaci\xf3n de determinados paquetes."))),(0,n.kt)("h2",{id:"trabajo-con-ficheros-deb"},"Trabajo con ficheros .deb"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Descarga un paquete sin instalarlo, es decir, descarga el fichero .deb correspondiente. Indica diferentes formas de hacerlo.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo puedes ver el contenido, que no extraerlo, de lo que se instalar\xe1 en el sistema de un paquete deb?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Sobre el fichero .deb descargado, utiliza el comando ar. ar permite extraer el contenido de una paquete deb. Indica el procedimiento para visualizar con ar el contenido del paquete deb. Con el paquete que has descargado y utilizando el comando ar, descomprime el paquete. \xbfQu\xe9 informaci\xf3n dispones despu\xe9s de la extracci\xf3n?. Indica la finalidad de lo extra\xeddo.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descomprimir lo extra\xeddo por ar del punto anterior. \xbfQu\xe9 informaci\xf3n contiene?"))),(0,n.kt)("h2",{id:"trabajo-con-repositorios"},"Trabajo con repositorios"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"A\xf1ade a tu fichero sources.list los repositorios de bullseye-backports y sid.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Configura el sistema APT para que los paquetes de debian bullseye tengan mayor prioridad y por tanto sean los que se instalen por defecto.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Configura el sistema APT para que los paquetes de bullseye-backports tengan mayor prioridad que los de unstable.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\xbfC\xf3mo a\xf1ades la posibilidad de descargar paqueter\xeda de la arquitectura i386 en tu sistema. \xbfQue comando has empleado?. Lista arquitecturas no nativas. \xbfC\xf3mo proceder\xedas para desechar la posibilidad de descargar paqueter\xeda de la arquitectura i386?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Si quisieras descargar un paquete, \xbfc\xf3mo puedes saber todas las versiones disponible de dicho paquete?")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete del repositorio stable.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete del repositorio de buster-backports.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete del repositorio de sid.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Indica el procedimiento para descargar un paquete de arquitectura i386."))),(0,n.kt)("h2",{id:"trabajo-con-directorios"},"Trabajo con directorios"),(0,n.kt)("p",null,"Que cometidos tienen:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"1. /var/lib/apt/lists/\n2. /var/lib/dpkg/available\n3. /var/lib/dpkg/status\n4. /var/cache/apt/archives/\n")))}d.isMDXComponent=!0}}]);