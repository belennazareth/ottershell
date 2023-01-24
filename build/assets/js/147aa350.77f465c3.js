"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[8673],{3905:(e,a,r)=>{r.d(a,{Zo:()=>s,kt:()=>m});var n=r(7294);function t(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function i(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?i(Object(r),!0).forEach((function(a){t(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function o(e,a){if(null==e)return{};var r,n,t=function(e,a){if(null==e)return{};var r,n,t={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],a.indexOf(r)>=0||(t[r]=e[r]);return t}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var c=n.createContext({}),u=function(e){var a=n.useContext(c),r=a;return e&&(r="function"==typeof e?e(a):l(l({},a),e)),r},s=function(e){var a=u(e.components);return n.createElement(c.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},p=n.forwardRef((function(e,a){var r=e.components,t=e.mdxType,i=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),p=u(r),m=t,b=p["".concat(c,".").concat(m)]||p[m]||d[m]||i;return r?n.createElement(b,l(l({ref:a},s),{},{components:r})):n.createElement(b,l({ref:a},s))}));function m(e,a){var r=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var i=r.length,l=new Array(i);l[0]=p;var o={};for(var c in a)hasOwnProperty.call(a,c)&&(o[c]=a[c]);o.originalType=e,o.mdxType="string"==typeof e?e:t,l[1]=o;for(var u=2;u<i;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},213:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var n=r(7462),t=(r(7294),r(3905));const i={sidebar_position:10},l="Virtualizaci\xf3n en Linux",o={unversionedId:"Tasks/virtualizacion_linux",id:"Tasks/virtualizacion_linux",title:"Virtualizaci\xf3n en Linux",description:"1. Entrega la URL del repositorio GitHub donde has alojado el proyecto.",source:"@site/docs/Tasks/virtualizacion_linux.md",sourceDirName:"Tasks",slug:"/Tasks/virtualizacion_linux",permalink:"/docs/Tasks/virtualizacion_linux",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/virtualizacion_linux.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Peticiones HTTP",permalink:"/docs/Tasks/peticion_http"},next:{title:"VirtualHosting con Apache",permalink:"/docs/Tasks/virtualhosting_apache"}},c={},u=[{value:"1. Entrega la URL del repositorio GitHub donde has alojado el proyecto.",id:"1-entrega-la-url-del-repositorio-github-donde-has-alojado-el-proyecto",level:2},{value:"2. Indica los pasos que has realizado para la creaci\xf3n de la imagen base.",id:"2-indica-los-pasos-que-has-realizado-para-la-creaci\xf3n-de-la-imagen-base",level:2},{value:"3. Entrega la clave privada que has utilizado y un enlace para descargarme la imagen base.",id:"3-entrega-la-clave-privada-que-has-utilizado-y-un-enlace-para-descargarme-la-imagen-base",level:2},{value:"4. Ejecuta el script y cuando se pause. Entrega pantallazo donde se compruebe que se puede acceder al servidor web en la maquina1.",id:"4-ejecuta-el-script-y-cuando-se-pause-entrega-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-en-la-maquina1",level:2},{value:"5. Al finalizar el script: pantallazo donde se compruebe que se puede acceder al servidor web con la IP p\xfablica.",id:"5-al-finalizar-el-script-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-con-la-ip-p\xfablica",level:2},{value:"6. Al finalizar el script: Pantallazos para comprobar:",id:"6-al-finalizar-el-script-pantallazos-para-comprobar",level:2},{value:"- Que la m\xe1quina tiene montado un disco en el directorio /var/www/html.",id:"--que-la-m\xe1quina-tiene-montado-un-disco-en-el-directorio-varwwwhtml",level:3},{value:"- Que la m\xe1quina tiene 2G de RAM.",id:"--que-la-m\xe1quina-tiene-2g-de-ram",level:3},{value:"- Que accediendo a la m\xe1quina puedes acceder al contenedor.",id:"--que-accediendo-a-la-m\xe1quina-puedes-acceder-al-contenedor",level:3},{value:"- Que se ha ha creado un snapshot.",id:"--que-se-ha-ha-creado-un-snapshot",level:3}],s={toc:u};function d(e){let{components:a,...r}=e;return(0,t.kt)("wrapper",(0,n.Z)({},s,r,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"virtualizaci\xf3n-en-linux"},"Virtualizaci\xf3n en Linux"),(0,t.kt)("h2",{id:"1-entrega-la-url-del-repositorio-github-donde-has-alojado-el-proyecto"},"1. Entrega la URL del repositorio GitHub donde has alojado el proyecto."),(0,t.kt)("p",null,(0,t.kt)("a",{parentName:"p",href:"https://github.com/belennazareth/linux_virt"},"https://github.com/belennazareth/linux_virt")," "),(0,t.kt)("h2",{id:"2-indica-los-pasos-que-has-realizado-para-la-creaci\xf3n-de-la-imagen-base"},"2. Indica los pasos que has realizado para la creaci\xf3n de la imagen base."),(0,t.kt)("h2",{id:"3-entrega-la-clave-privada-que-has-utilizado-y-un-enlace-para-descargarme-la-imagen-base"},"3. Entrega la clave privada que has utilizado y un enlace para descargarme la imagen base."),(0,t.kt)("h2",{id:"4-ejecuta-el-script-y-cuando-se-pause-entrega-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-en-la-maquina1"},"4. Ejecuta el script y cuando se pause. Entrega pantallazo donde se compruebe que se puede acceder al servidor web en la maquina1."),(0,t.kt)("h2",{id:"5-al-finalizar-el-script-pantallazo-donde-se-compruebe-que-se-puede-acceder-al-servidor-web-con-la-ip-p\xfablica"},"5. Al finalizar el script: pantallazo donde se compruebe que se puede acceder al servidor web con la IP p\xfablica."),(0,t.kt)("h2",{id:"6-al-finalizar-el-script-pantallazos-para-comprobar"},"6. Al finalizar el script: Pantallazos para comprobar:"),(0,t.kt)("h3",{id:"--que-la-m\xe1quina-tiene-montado-un-disco-en-el-directorio-varwwwhtml"},"- Que la m\xe1quina tiene montado un disco en el directorio /var/www/html."),(0,t.kt)("h3",{id:"--que-la-m\xe1quina-tiene-2g-de-ram"},"- Que la m\xe1quina tiene 2G de RAM."),(0,t.kt)("h3",{id:"--que-accediendo-a-la-m\xe1quina-puedes-acceder-al-contenedor"},"- Que accediendo a la m\xe1quina puedes acceder al contenedor."),(0,t.kt)("h3",{id:"--que-se-ha-ha-creado-un-snapshot"},"- Que se ha ha creado un snapshot."))}d.isMDXComponent=!0}}]);