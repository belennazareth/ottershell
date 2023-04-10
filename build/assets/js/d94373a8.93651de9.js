"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[2392],{3905:(a,e,n)=>{n.d(e,{Zo:()=>d,kt:()=>p});var o=n(67294);function t(a,e,n){return e in a?Object.defineProperty(a,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):a[e]=n,a}function i(a,e){var n=Object.keys(a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(a);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),n.push.apply(n,o)}return n}function l(a){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){t(a,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(n,e))}))}return a}function r(a,e){if(null==a)return{};var n,o,t=function(a,e){if(null==a)return{};var n,o,t={},i=Object.keys(a);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||(t[n]=a[n]);return t}(a,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(a);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(a,n)&&(t[n]=a[n])}return t}var c=o.createContext({}),s=function(a){var e=o.useContext(c),n=e;return a&&(n="function"==typeof a?a(e):l(l({},e),a)),n},d=function(a){var e=s(a.components);return o.createElement(c.Provider,{value:e},a.children)},u={inlineCode:"code",wrapper:function(a){var e=a.children;return o.createElement(o.Fragment,{},e)}},m=o.forwardRef((function(a,e){var n=a.components,t=a.mdxType,i=a.originalType,c=a.parentName,d=r(a,["components","mdxType","originalType","parentName"]),m=s(n),p=t,v=m["".concat(c,".").concat(p)]||m[p]||u[p]||i;return n?o.createElement(v,l(l({ref:e},d),{},{components:n})):o.createElement(v,l({ref:e},d))}));function p(a,e){var n=arguments,t=e&&e.mdxType;if("string"==typeof a||t){var i=n.length,l=new Array(i);l[0]=m;var r={};for(var c in e)hasOwnProperty.call(e,c)&&(r[c]=e[c]);r.originalType=a,r.mdxType="string"==typeof a?a:t,l[1]=r;for(var s=2;s<i;s++)l[s]=n[s];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},58959:(a,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>s});var o=n(87462),t=(n(67294),n(3905));const i={sidebar_position:7},l="Clonaci\xf3n e instant\xe1neas de m\xe1quinas virtuales",r={unversionedId:"Tasks/clonacion_instantanea",id:"Tasks/clonacion_instantanea",title:"Clonaci\xf3n e instant\xe1neas de m\xe1quinas virtuales",description:"1. Indica la instrucci\xf3n virt-clone que has usado para clonar la m\xe1quina. \xbfQu\xe9 cambios has hecho en la nueva m\xe1quina para que no sea igual a la original?",source:"@site/docs/Tasks/clonacion_instantanea.md",sourceDirName:"Tasks",slug:"/Tasks/clonacion_instantanea",permalink:"/docs/Tasks/clonacion_instantanea",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/clonacion_instantanea.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Creaci\xf3n y configuraci\xf3n de un escenario router-nat",permalink:"/docs/Tasks/router_nat"},next:{title:"Ejercicios de manejo de m\xf3dulos",permalink:"/docs/Tasks/manejo_modulos"}},c={},s=[{value:"1. Indica la instrucci\xf3n virt-clone que has usado para clonar la m\xe1quina. \xbfQu\xe9 cambios has hecho en la nueva m\xe1quina para que no sea igual a la original?",id:"1-indica-la-instrucci\xf3n-virt-clone-que-has-usado-para-clonar-la-m\xe1quina-qu\xe9-cambios-has-hecho-en-la-nueva-m\xe1quina-para-que-no-sea-igual-a-la-original",level:2},{value:"2. Lista las m\xe1quinas que tienes creadas, donde se vea la plantilla que has creado. Pon una captura donde se vea que nos da un error al intentar iniciarla.",id:"2-lista-las-m\xe1quinas-que-tienes-creadas-donde-se-vea-la-plantilla-que-has-creado-pon-una-captura-donde-se-vea-que-nos-da-un-error-al-intentar-iniciarla",level:2},{value:"3. Una vez creada la m\xe1quina clone-full, una captura de pantalla donde se vea la direcci\xf3n IP que ha tomado.  Otra captura donde se vea el acceso por SSH.",id:"3-una-vez-creada-la-m\xe1quina-clone-full-una-captura-de-pantalla-donde-se-vea-la-direcci\xf3n-ip-que-ha-tomado--otra-captura-donde-se-vea-el-acceso-por-ssh",level:2},{value:"4. Una vez realizada la clonaci\xf3n enlazada: La lista de m\xe1quinas donde se vea la m\xe1quina clone-link. La salida del comando <code>virsh -c qemu:///system vol-info &lt;\fichero.qcow2&gt; &lt;pool de almacenamiento&gt;</code> para comprobar que el volumen creado tiene un disco de Backing Store. Comprueba lo que ocupa el disco creado. Debe ocupar muy poco en disco. \xbfPor qu\xe9?",id:"4-una-vez-realizada-la-clonaci\xf3n-enlazada-la-lista-de-m\xe1quinas-donde-se-vea-la-m\xe1quina-clone-link-la-salida-del-comando-virsh--c-qemusystem-vol-info-ficheroqcow2-pool-de-almacenamiento-para-comprobar-que-el-volumen-creado-tiene-un-disco-de-backing-store-comprueba-lo-que-ocupa-el-disco-creado-debe-ocupar-muy-poco-en-disco-por-qu\xe9",level:2},{value:"5. Muestra con capturas de pantallas el funcionamiento del ejercicio 5. Una vez creada la instant\xe1nea entrega la salida del comando <code>virsh -c qemu:///system snapshot-list &lt;m\xe1quina&gt;</code>.",id:"5-muestra-con-capturas-de-pantallas-el-funcionamiento-del-ejercicio-5-una-vez-creada-la-instant\xe1nea-entrega-la-salida-del-comando-virsh--c-qemusystem-snapshot-list-m\xe1quina",level:2}],d={toc:s};function u(a){let{components:e,...i}=a;return(0,t.kt)("wrapper",(0,o.Z)({},d,i,{components:e,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"clonaci\xf3n-e-instant\xe1neas-de-m\xe1quinas-virtuales"},"Clonaci\xf3n e instant\xe1neas de m\xe1quinas virtuales"),(0,t.kt)("h2",{id:"1-indica-la-instrucci\xf3n-virt-clone-que-has-usado-para-clonar-la-m\xe1quina-qu\xe9-cambios-has-hecho-en-la-nueva-m\xe1quina-para-que-no-sea-igual-a-la-original"},"1. Indica la instrucci\xf3n virt-clone que has usado para clonar la m\xe1quina. \xbfQu\xe9 cambios has hecho en la nueva m\xe1quina para que no sea igual a la original?"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre"},"`virt-clone --connect=qemu:///system --original rumpeltinski --name maquina-clonada --file /var/lib/libvirt/images/maquinaclonada.qcow2`\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"Term",src:n(7774).Z,width:"1314",height:"183"})),(0,t.kt)("h2",{id:"2-lista-las-m\xe1quinas-que-tienes-creadas-donde-se-vea-la-plantilla-que-has-creado-pon-una-captura-donde-se-vea-que-nos-da-un-error-al-intentar-iniciarla"},"2. Lista las m\xe1quinas que tienes creadas, donde se vea la plantilla que has creado. Pon una captura donde se vea que nos da un error al intentar iniciarla."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"Term",src:n(39228).Z,width:"1177",height:"382"}),"\n",(0,t.kt)("img",{alt:"Term",src:n(84676).Z,width:"547",height:"580"})),(0,t.kt)("h2",{id:"3-una-vez-creada-la-m\xe1quina-clone-full-una-captura-de-pantalla-donde-se-vea-la-direcci\xf3n-ip-que-ha-tomado--otra-captura-donde-se-vea-el-acceso-por-ssh"},"3. Una vez creada la m\xe1quina clone-full, una captura de pantalla donde se vea la direcci\xf3n IP que ha tomado.  Otra captura donde se vea el acceso por SSH."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"Term",src:n(63099).Z,width:"812",height:"153"}),"\n",(0,t.kt)("img",{alt:"Term",src:n(36826).Z,width:"823",height:"378"})),(0,t.kt)("h2",{id:"4-una-vez-realizada-la-clonaci\xf3n-enlazada-la-lista-de-m\xe1quinas-donde-se-vea-la-m\xe1quina-clone-link-la-salida-del-comando-virsh--c-qemusystem-vol-info-ficheroqcow2-pool-de-almacenamiento-para-comprobar-que-el-volumen-creado-tiene-un-disco-de-backing-store-comprueba-lo-que-ocupa-el-disco-creado-debe-ocupar-muy-poco-en-disco-por-qu\xe9"},"4. Una vez realizada la clonaci\xf3n enlazada: La lista de m\xe1quinas donde se vea la m\xe1quina clone-link. La salida del comando ",(0,t.kt)("inlineCode",{parentName:"h2"},"virsh -c qemu:///system vol-info <\\fichero.qcow2> <\\pool de almacenamiento>")," para comprobar que el volumen creado tiene un disco de Backing Store. Comprueba lo que ocupa el disco creado. Debe ocupar muy poco en disco. \xbfPor qu\xe9?"),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"Term",src:n(42276).Z,width:"629",height:"361"}),"\n",(0,t.kt)("img",{alt:"Term",src:n(82165).Z,width:"939",height:"188"})),(0,t.kt)("p",null,"Ocupa poco espacio porque no copia el volumen original al nuevo sino que lo usa compartiendo disco con la m\xe1quina origen, de ah\xed su nombre enlazada."),(0,t.kt)("h2",{id:"5-muestra-con-capturas-de-pantallas-el-funcionamiento-del-ejercicio-5-una-vez-creada-la-instant\xe1nea-entrega-la-salida-del-comando-virsh--c-qemusystem-snapshot-list-m\xe1quina"},"5. Muestra con capturas de pantallas el funcionamiento del ejercicio 5. Una vez creada la instant\xe1nea entrega la salida del comando ",(0,t.kt)("inlineCode",{parentName:"h2"},"virsh -c qemu:///system snapshot-list <\\m\xe1quina>"),"."),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"Term",src:n(40060).Z,width:"783",height:"147"})))}u.isMDXComponent=!0},39228:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-2-f1357a8b6910584020a73baa4c459d2b.png"},84676:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-3-0b93dc76d906940dcd2b4efebdcd9e42.png"},63099:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-4-7d172f657a47f64c6b0273fbc17294b7.png"},36826:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-5-e742d43610efd9ad68501b52c61ef0de.png"},42276:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-6-65eb6ddec65eb379c638a1bfff4c7681.png"},82165:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-7-5a007e4d22a7355b5868af428c9df55c.png"},40060:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-8-2100eb86a5db225df5f8811d6fe7b27b.png"},7774:(a,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/images/taller5HLC-f97eb871d857ec843aca49a707d5683d.png"}}]);