"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[9103],{3905:(e,r,t)=>{t.d(r,{Zo:()=>d,kt:()=>m});var a=t(67294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var l=a.createContext({}),c=function(e){var r=a.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},d=function(e){var r=c(e.components);return a.createElement(l.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},p=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(t),m=n,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||o;return t?a.createElement(f,s(s({ref:r},d),{},{components:t})):a.createElement(f,s({ref:r},d))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,s=new Array(o);s[0]=p;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var c=2;c<o;c++)s[c]=t[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},15210:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var a=t(87462),n=(t(67294),t(3905));const o={sidebar_position:20},s="Recolecci\xf3n centralizada de logs del sistema",i={unversionedId:"Tasks/journald",id:"Tasks/journald",title:"Recolecci\xf3n centralizada de logs del sistema",description:"En esta ocasi\xf3n, se va a realizar un sistema de recogida de logs de sistema, para ello se va a utilizar el servicio de journald, que se encarga de recoger los logs de los servicios del sistema, y de los servicios que se ejecutan en el mismo. En mi caso, voy a usar el escenario montado en OpenStack compuesto por alfa, bravo, charlie y delta.",source:"@site/docs/Tasks/journald.md",sourceDirName:"Tasks",slug:"/Tasks/journald",permalink:"/docs/Tasks/journald",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/journald.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Servidor de correo en los servidores de clase",permalink:"/docs/Tasks/correo"},next:{title:"Despliegue de aplicaciones Java",permalink:"/docs/Tasks/despliegue_java"}},l={},c=[],d={toc:c};function u(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"recolecci\xf3n-centralizada-de-logs-del-sistema"},"Recolecci\xf3n centralizada de logs del sistema"),(0,n.kt)("p",null,"En esta ocasi\xf3n, se va a realizar un sistema de recogida de logs de sistema, para ello se va a utilizar el servicio de ",(0,n.kt)("inlineCode",{parentName:"p"},"journald"),", que se encarga de recoger los logs de los servicios del sistema, y de los servicios que se ejecutan en el mismo. En mi caso, voy a usar el escenario montado en OpenStack compuesto por alfa, bravo, charlie y delta."))}u.isMDXComponent=!0}}]);