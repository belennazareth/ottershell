"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[8691],{3905:(e,a,r)=>{r.d(a,{Zo:()=>d,kt:()=>m});var n=r(7294);function t(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function o(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?o(Object(r),!0).forEach((function(a){t(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function s(e,a){if(null==e)return{};var r,n,t=function(e,a){if(null==e)return{};var r,n,t={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],a.indexOf(r)>=0||(t[r]=e[r]);return t}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var l=n.createContext({}),c=function(e){var a=n.useContext(l),r=a;return e&&(r="function"==typeof e?e(a):i(i({},a),e)),r},d=function(e){var a=c(e.components);return n.createElement(l.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},p=n.forwardRef((function(e,a){var r=e.components,t=e.mdxType,o=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(r),m=t,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||o;return r?n.createElement(f,i(i({ref:a},d),{},{components:r})):n.createElement(f,i({ref:a},d))}));function m(e,a){var r=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var o=r.length,i=new Array(o);i[0]=p;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s.mdxType="string"==typeof e?e:t,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},4704:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(7462),t=(r(7294),r(3905));const o={sidebar_position:14},i="Gesti\xf3n de redes en OpenStack",s={unversionedId:"Tasks/redes_openstack",id:"Tasks/redes_openstack",title:"Gesti\xf3n de redes en OpenStack",description:"1. Los comandos OSC para crear la red red-externa.",source:"@site/docs/Tasks/redes_openstack.md",sourceDirName:"Tasks",slug:"/Tasks/redes_openstack",permalink:"/docs/Tasks/redes_openstack",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/redes_openstack.md",tags:[],version:"current",sidebarPosition:14,frontMatter:{sidebar_position:14},sidebar:"tutorialSidebar",previous:{title:"Instalaci\xf3n de nginx con PHP",permalink:"/docs/Tasks/nginx_php"},next:{title:"Markdown Features",permalink:"/docs/Tasks/markdown-features"}},l={},c=[{value:"1. Los comandos OSC para crear la red <code>red-externa</code>.",id:"1-los-comandos-osc-para-crear-la-red-red-externa",level:2},{value:"2. Los comandos OSC y sus salidas, para visualizar las redes que tienes en tu proyecto y los routers.",id:"2-los-comandos-osc-y-sus-salidas-para-visualizar-las-redes-que-tienes-en-tu-proyecto-y-los-routers",level:2},{value:"3. Cuando crees la instancia maquina-router, accede a ella y comprueba la IP fija que ha tomando. Responde: \xbfHas podido a\xf1adir una IP flotante a esta nueva instancia? Razona la respuesta.",id:"3-cuando-crees-la-instancia-maquina-router-accede-a-ella-y-comprueba-la-ip-fija-que-ha-tomando-responde-has-podido-a\xf1adir-una-ip-flotante-a-esta-nueva-instancia-razona-la-respuesta",level:2},{value:"4. Comandos OSC para conectar la maquina-router a la red-interna y que tenga la direcci\xf3n 10.0.100.1.",id:"4-comandos-osc-para-conectar-la-maquina-router-a-la-red-interna-y-que-tenga-la-direcci\xf3n-1001001",level:2},{value:"5. Comandos OSC para crear la maquina-cliente con la direcci\xf3n 10.0.100.200. Responde: \xbfHas podido a\xf1adir una IP flotante a esta nueva instancia? Razona la respuesta.",id:"5-comandos-osc-para-crear-la-maquina-cliente-con-la-direcci\xf3n-100100200-responde-has-podido-a\xf1adir-una-ip-flotante-a-esta-nueva-instancia-razona-la-respuesta",level:2},{value:"6. Comandos OSC para deshabilitar la seguridad de los puertos de la red-interna.",id:"6-comandos-osc-para-deshabilitar-la-seguridad-de-los-puertos-de-la-red-interna",level:2},{value:"7. Comprobaci\xf3n de que la maquina-cliente tiene conexi\xf3n al exterior.",id:"7-comprobaci\xf3n-de-que-la-maquina-cliente-tiene-conexi\xf3n-al-exterior",level:2},{value:"8. Comprobaci\xf3n del acceso al servidor web de la maquina-cliente desde el exterior.",id:"8-comprobaci\xf3n-del-acceso-al-servidor-web-de-la-maquina-cliente-desde-el-exterior",level:2}],d={toc:c};function u(e){let{components:a,...r}=e;return(0,t.kt)("wrapper",(0,n.Z)({},d,r,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"gesti\xf3n-de-redes-en-openstack"},"Gesti\xf3n de redes en OpenStack"),(0,t.kt)("h2",{id:"1-los-comandos-osc-para-crear-la-red-red-externa"},"1. Los comandos OSC para crear la red ",(0,t.kt)("inlineCode",{parentName:"h2"},"red-externa"),"."),(0,t.kt)("h2",{id:"2-los-comandos-osc-y-sus-salidas-para-visualizar-las-redes-que-tienes-en-tu-proyecto-y-los-routers"},"2. Los comandos OSC y sus salidas, para visualizar las redes que tienes en tu proyecto y los routers."),(0,t.kt)("h2",{id:"3-cuando-crees-la-instancia-maquina-router-accede-a-ella-y-comprueba-la-ip-fija-que-ha-tomando-responde-has-podido-a\xf1adir-una-ip-flotante-a-esta-nueva-instancia-razona-la-respuesta"},"3. Cuando crees la instancia maquina-router, accede a ella y comprueba la IP fija que ha tomando. Responde: \xbfHas podido a\xf1adir una IP flotante a esta nueva instancia? Razona la respuesta."),(0,t.kt)("h2",{id:"4-comandos-osc-para-conectar-la-maquina-router-a-la-red-interna-y-que-tenga-la-direcci\xf3n-1001001"},"4. Comandos OSC para conectar la maquina-router a la red-interna y que tenga la direcci\xf3n 10.0.100.1."),(0,t.kt)("h2",{id:"5-comandos-osc-para-crear-la-maquina-cliente-con-la-direcci\xf3n-100100200-responde-has-podido-a\xf1adir-una-ip-flotante-a-esta-nueva-instancia-razona-la-respuesta"},"5. Comandos OSC para crear la maquina-cliente con la direcci\xf3n 10.0.100.200. Responde: \xbfHas podido a\xf1adir una IP flotante a esta nueva instancia? Razona la respuesta."),(0,t.kt)("h2",{id:"6-comandos-osc-para-deshabilitar-la-seguridad-de-los-puertos-de-la-red-interna"},"6. Comandos OSC para deshabilitar la seguridad de los puertos de la red-interna."),(0,t.kt)("h2",{id:"7-comprobaci\xf3n-de-que-la-maquina-cliente-tiene-conexi\xf3n-al-exterior"},"7. Comprobaci\xf3n de que la maquina-cliente tiene conexi\xf3n al exterior."),(0,t.kt)("h2",{id:"8-comprobaci\xf3n-del-acceso-al-servidor-web-de-la-maquina-cliente-desde-el-exterior"},"8. Comprobaci\xf3n del acceso al servidor web de la maquina-cliente desde el exterior."))}u.isMDXComponent=!0}}]);