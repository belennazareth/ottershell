"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[9584],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(a),m=r,g=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return a?n.createElement(g,i(i({ref:t},c),{},{components:a})):n.createElement(g,i({ref:t},c))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},2426:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const o={sidebar_position:9},i="Peticiones HTTP",l={unversionedId:"Tasks/peticion_http",id:"Tasks/peticion_http",title:"Peticiones HTTP",description:"Con la herramienta curl podemos realizar peticiones HTTP seg\xfan lo que queramos ver:",source:"@site/docs/Tasks/peticion_http.md",sourceDirName:"Tasks",slug:"/Tasks/peticion_http",permalink:"/docs/Tasks/peticion_http",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/peticion_http.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"Instalaci\xf3n de un servidor LAMP",permalink:"/docs/Tasks/servidor_lamp"},next:{title:"Markdown Features",permalink:"/docs/Tasks/markdown-features"}},s={},p=[],c={toc:p};function d(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"peticiones-http"},"Peticiones HTTP"),(0,r.kt)("p",null,"Con la herramienta curl podemos realizar peticiones HTTP seg\xfan lo que queramos ver:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Petici\xf3n ",(0,r.kt)("strong",{parentName:"li"},"HEAD"),":")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:a(1003).Z,width:"683",height:"267"})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Petici\xf3n ",(0,r.kt)("strong",{parentName:"li"},"GET"),":")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:a(310).Z,width:"664",height:"222"})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Petici\xf3n ",(0,r.kt)("strong",{parentName:"li"},"GET")," siguiendo la redirecci\xf3n:")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:a(9389).Z,width:"1085",height:"573"})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Petici\xf3n ",(0,r.kt)("strong",{parentName:"li"},"POST")," con env\xedo de informaci\xf3n:")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:a(33).Z,width:"1146",height:"356"})),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Realiza una petici\xf3n para ver las cabeceras de la URL ",(0,r.kt)("a",{parentName:"li",href:"https://dit.gonzalonazareno.org."},"https://dit.gonzalonazareno.org.")," \xbfQu\xe9 c\xf3digo de estado devuelve? \xbfQu\xe9 significa? \xbfEn qu\xe9 cabecera se encuentra la URL a la que hay que acceder para obtener el recurso?")),(0,r.kt)("p",null,"Devuelve el c\xf3digo de estado ",(0,r.kt)("em",{parentName:"p"},"<< HTTP/1.1 301 Moved Permanently >>"),", este significa que se ha realizado una redirecci\xf3n permanente.\nSe encuentra en la cabecera location."),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Realiza una petici\xf3n GET a ",(0,r.kt)("a",{parentName:"li",href:"https://dit.gonzalonazareno.org."},"https://dit.gonzalonazareno.org.")," \xbfQu\xe9 tipo de redirecci\xf3n devuelve?.  Realiza una petici\xf3n a la URL ",(0,r.kt)("a",{parentName:"li",href:"https://dit.gonzalonazareno.org"},"https://dit.gonzalonazareno.org")," para seguir la redirecci\xf3n.")),(0,r.kt)("p",null,"Devuelve una redirecci\xf3n ",(0,r.kt)("em",{parentName:"p"},"301 Moved Permanently")," "),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:a(310).Z,width:"664",height:"222"})),(0,r.kt)("p",null,"Para realizar una petici\xf3n para seguir la redirecci\xf3n:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"`curl -L https://dit.gonzalonazareno.org`\n")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:a(9389).Z,width:"1085",height:"573"})),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Utiliza las herramientas de un navegador web (En firefox: Herramientas para desarrolladores -> Red ) para ver las cabeceras de la URL ",(0,r.kt)("a",{parentName:"li",href:"https://dit.gonzalonazareno.org/gestiona/"},"https://dit.gonzalonazareno.org/gestiona/"),". \xbfCu\xe1ntas peticiones se han realizado para mostrar la p\xe1gina?. F\xedjate en la petici\xf3n a ",(0,r.kt)("a",{parentName:"li",href:"https://dit.gonzalonazareno.org/gestiona/"},"https://dit.gonzalonazareno.org/gestiona/"),": identifica las cabeceras m\xe1s importantes de las peticiones y de las respuestas.")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Term",src:a(3450).Z,width:"1537",height:"861"})),(0,r.kt)("p",null,"En total se han realizado 39 peticiones para mostrar la p\xe1gina.\nLas cabeceras m\xe1s importantes son:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"})),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Obt\xe9n la informaci\xf3n del cuerpo de la respuesta de la URL: ",(0,r.kt)("a",{parentName:"li",href:"https://dit.gonzalonazareno.org/gestiona/"},"https://dit.gonzalonazareno.org/gestiona/"),".")),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"Usando el m\xe9todo GET manda tu nombre a la p\xe1gina ",(0,r.kt)("a",{parentName:"li",href:"http://www2.gonzalonazareno.org/josedom/resultado.php"},"http://www2.gonzalonazareno.org/josedom/resultado.php"),".")),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Usando el m\xe9todo POST (que env\xeda el contenido en el cuerpo) manda tu nombre a la misma p\xe1gina.")))}d.isMDXComponent=!0},310:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/taller1SRI3-1-7cd0cf7edec54d1c89f862505a158415.png"},9389:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/taller1SRI3-2-6f4a25cd80221442cbd0e5a7a0954f1b.png"},33:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/taller1SRI3-3-ac20cae888514e9b17b391ee455edac5.png"},3450:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/taller1SRI3-4-24c7815425674a6bfae516ff0f95ddab.png"},1003:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/taller1SRI3-c5a173a446bec0e494ebd743b0dc4a63.png"}}]);