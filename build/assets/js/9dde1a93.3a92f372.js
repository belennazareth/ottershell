"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[2753],{3905:(e,r,a)=>{a.d(r,{Zo:()=>p,kt:()=>m});var t=a(7294);function n(e,r,a){return r in e?Object.defineProperty(e,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[r]=a,e}function o(e,r){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),a.push.apply(a,t)}return a}function s(e){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?o(Object(a),!0).forEach((function(r){n(e,r,a[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))}))}return e}function i(e,r){if(null==e)return{};var a,t,n=function(e,r){if(null==e)return{};var a,t,n={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],r.indexOf(a)>=0||(n[a]=e[a]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],r.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=t.createContext({}),c=function(e){var r=t.useContext(l),a=r;return e&&(a="function"==typeof e?e(r):s(s({},r),e)),a},p=function(e){var r=c(e.components);return t.createElement(l.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},u=t.forwardRef((function(e,r){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(a),m=n,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return a?t.createElement(f,s(s({ref:r},p),{},{components:a})):t.createElement(f,s({ref:r},p))}));function m(e,r){var a=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=a.length,s=new Array(o);s[0]=u;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var c=2;c<o;c++)s[c]=a[c];return t.createElement.apply(null,s)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},6637:(e,r,a)=>{a.r(r),a.d(r,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var t=a(7462),n=(a(7294),a(3905));const o={sidebar_position:15},s="Instalaci\xf3n de WordPress",i={unversionedId:"Tasks/wordpress",id:"Tasks/wordpress",title:"Instalaci\xf3n de WordPress",description:"1. Pantallazo accediendo a WordPress para comprobar que has escrito una entrada del blog.",source:"@site/docs/Tasks/wordpress.md",sourceDirName:"Tasks",slug:"/Tasks/wordpress",permalink:"/docs/Tasks/wordpress",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/wordpress.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15},sidebar:"tutorialSidebar",previous:{title:"Desarrollo y despliegue de una aplicaci\xf3n Java simple",permalink:"/docs/Tasks/tomcat"},next:{title:"Desplegando aplicaciones flask con apache2/nginx + uwsgi",permalink:"/docs/Tasks/apache_uwsgi"}},l={},c=[{value:"1. Pantallazo accediendo a WordPress para comprobar que has escrito una entrada del blog.",id:"1-pantallazo-accediendo-a-wordpress-para-comprobar-que-has-escrito-una-entrada-del-blog",level:2}],p={toc:c};function d(e){let{components:r,...o}=e;return(0,n.kt)("wrapper",(0,t.Z)({},p,o,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"instalaci\xf3n-de-wordpress"},"Instalaci\xf3n de WordPress"),(0,n.kt)("h2",{id:"1-pantallazo-accediendo-a-wordpress-para-comprobar-que-has-escrito-una-entrada-del-blog"},"1. Pantallazo accediendo a WordPress para comprobar que has escrito una entrada del blog."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Repo",src:a(9408).Z,width:"1221",height:"895"}),"\n",(0,n.kt)("img",{alt:"Repo",src:a(7393).Z,width:"1221",height:"895"})),(0,n.kt)("p",null,"Para realizar esto fue necesario tener montado un servidor LAMP. "),(0,n.kt)("p",null,"En ",(0,n.kt)("inlineCode",{parentName:"p"},"/var/www/html")," se realiza la instalaci\xf3n de wordpress con ",(0,n.kt)("inlineCode",{parentName:"p"},"wget https://es.wordpress.org/latest-es_ES.zip")," y ejecutamos ",(0,n.kt)("inlineCode",{parentName:"p"},"unzip latest-es_ES.zip")," para extraer los ficheros."),(0,n.kt)("p",null,"Despu\xe9s, desde ",(0,n.kt)("inlineCode",{parentName:"p"},"/var/www")," cambiamos el propietario a ",(0,n.kt)("inlineCode",{parentName:"p"},"www-data")," con ",(0,n.kt)("inlineCode",{parentName:"p"},"chown www-data:www-data html/*"),"."),(0,n.kt)("p",null,"En ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/hosts")," se a\xf1ade la ip y la direcci\xf3n url que se le va a asignar para poder configurar y crear el wordpress."),(0,n.kt)("p",null,"Una vez realizado todo lo anterior se podr\xe1 acceder con la url que se le ha asignado anteriormente y empezar la instalaci\xf3n."))}d.isMDXComponent=!0},7393:(e,r,a)=>{a.d(r,{Z:()=>t});const t=a.p+"assets/images/taller6IAW2-2-ddfc0f166ff74da8ccfea2fdcdfcf6e6.png"},9408:(e,r,a)=>{a.d(r,{Z:()=>t});const t=a.p+"assets/images/taller6IAW2-17aea8a4aa0896be849126f0f31a4127.png"}}]);