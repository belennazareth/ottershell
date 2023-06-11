"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[1485],{3905:(e,a,n)=>{n.d(a,{Zo:()=>d,kt:()=>g});var r=n(67294);function l(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function t(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?t(Object(n),!0).forEach((function(a){l(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function o(e,a){if(null==e)return{};var n,r,l=function(e,a){if(null==e)return{};var n,r,l={},t=Object.keys(e);for(r=0;r<t.length;r++)n=t[r],a.indexOf(n)>=0||(l[n]=e[n]);return l}(e,a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(r=0;r<t.length;r++)n=t[r],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=r.createContext({}),u=function(e){var a=r.useContext(s),n=a;return e&&(n="function"==typeof e?e(a):i(i({},a),e)),n},d=function(e){var a=u(e.components);return r.createElement(s.Provider,{value:a},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},m=r.forwardRef((function(e,a){var n=e.components,l=e.mdxType,t=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=u(n),m=l,g=c["".concat(s,".").concat(m)]||c[m]||p[m]||t;return n?r.createElement(g,i(i({ref:a},d),{},{components:n})):r.createElement(g,i({ref:a},d))}));function g(e,a){var n=arguments,l=a&&a.mdxType;if("string"==typeof e||l){var t=n.length,i=new Array(t);i[0]=m;var o={};for(var s in a)hasOwnProperty.call(a,s)&&(o[s]=a[s]);o.originalType=e,o[c]="string"==typeof e?e:l,i[1]=o;for(var u=2;u<t;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},89352:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>t,metadata:()=>o,toc:()=>u});var r=n(87462),l=(n(67294),n(3905));const t={sidebar_position:56},i="IC/DC con Jenkins",o={unversionedId:"Tasks/jenkins_ICDC",id:"Tasks/jenkins_ICDC",title:"IC/DC con Jenkins",description:"El objetivo de esta pr\xe1ctica es el desarrollo gradual de un Pipeline que vaya realizando tareas sobre el repositorio de una aplicaci\xf3n.",source:"@site/docs/Tasks/jenkins_ICDC.md",sourceDirName:"Tasks",slug:"/Tasks/jenkins_ICDC",permalink:"/docs/Tasks/jenkins_ICDC",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/jenkins_ICDC.md",tags:[],version:"current",sidebarPosition:56,frontMatter:{sidebar_position:56},sidebar:"tutorialSidebar",previous:{title:"Jenkins: Comprobaci\xf3n de HTML5 v\xe1lido y despliegue en surge.sh (test y deploy)",permalink:"/docs/Tasks/jenkins_surge"},next:{title:"Markdown Features",permalink:"/docs/Tasks/markdown-features"}},s={},u=[{value:"Ejercicio 1: Construcci\xf3n de una imagen docker",id:"ejercicio-1-construcci\xf3n-de-una-imagen-docker",level:2},{value:"Entrega",id:"entrega",level:2},{value:"1. Una captura de pantalla donde se vea la salida de un build que se ha ejecutado de manera correcta.",id:"1-una-captura-de-pantalla-donde-se-vea-la-salida-de-un-build-que-se-ha-ejecutado-de-manera-correcta",level:3},{value:"2. Una captura de pantalla de tu cuenta de Docker Hub donde se vea la imagen subida de \xfaltimo build.",id:"2-una-captura-de-pantalla-de-tu-cuenta-de-docker-hub-donde-se-vea-la-imagen-subida-de-\xfaltimo-build",level:3},{value:"3. Introduce un fallo en el Dockerfile y muestra la salida del build donde se produce el error.",id:"3-introduce-un-fallo-en-el-dockerfile-y-muestra-la-salida-del-build-donde-se-produce-el-error",level:3},{value:"4. Entrega la URL del repositorio para ver el Jenkinsfile.",id:"4-entrega-la-url-del-repositorio-para-ver-el-jenkinsfile",level:3},{value:"5. Pantallazo con el correo que has recibido de la ejecuci\xf3n del pipeline.",id:"5-pantallazo-con-el-correo-que-has-recibido-de-la-ejecuci\xf3n-del-pipeline",level:3},{value:"Ejercicio 2: Despliegue de la aplicaci\xf3n",id:"ejercicio-2-despliegue-de-la-aplicaci\xf3n",level:2},{value:"Entrega",id:"entrega-1",level:2},{value:"1. El contenido del fichero Jenkinsfile.",id:"1-el-contenido-del-fichero-jenkinsfile",level:3},{value:"2. Las credenciales que has guardado en Jenkins.",id:"2-las-credenciales-que-has-guardado-en-jenkins",level:3},{value:"3. Demuestra al profesor como se realiza la IC/DC completo.",id:"3-demuestra-al-profesor-como-se-realiza-la-icdc-completo",level:3}],d={toc:u},c="wrapper";function p(e){let{components:a,...n}=e;return(0,l.kt)(c,(0,r.Z)({},d,n,{components:a,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"icdc-con-jenkins"},"IC/DC con Jenkins"),(0,l.kt)("p",null,"El objetivo de esta pr\xe1ctica es el desarrollo gradual de un Pipeline que vaya realizando tareas sobre el repositorio de una aplicaci\xf3n."),(0,l.kt)("p",null,"La aplicaci\xf3n con la que vamos a trabajar ser\xe1 tu fork de la aplicaci\xf3n django Polls. Como hemos visto esta aplicaci\xf3n que implementa el tutorial de Django tiene implementado un m\xf3dulo de pruebas."),(0,l.kt)("p",null,"Vamos a construir el Pipeline en varias fases:"),(0,l.kt)("h2",{id:"ejercicio-1-construcci\xf3n-de-una-imagen-docker"},"Ejercicio 1: Construcci\xf3n de una imagen docker"),(0,l.kt)("p",null,"Partimos del pipeline que hemos desarrollado en el ",(0,l.kt)("a",{parentName:"p",href:"https://fp.josedomingo.org/iaw2223/7_ic/t3.html"},"Taller 3: Integraci\xf3n continua de aplicaci\xf3n django (Test)"),", donde hemos automatizado el test de la aplicaci\xf3n."),(0,l.kt)("p",null,"(URL de mi repositorio: ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/belennazareth/django_tutorial"},"https://github.com/belennazareth/django_tutorial"),")"),(0,l.kt)("p",null,"Modifica el pipeline para que despu\xe9s de hacer el test sobre la aplicaci\xf3n, genere una imagen docker. Tienes que tener en cuenta que los pasos para generar la imagen lo tienes que realizar en la m\xe1quina donde est\xe1 instalado Jenkins. Tendr\xe1s que a\xf1adir las siguientes acciones:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Construir la imagen con el ",(0,l.kt)("inlineCode",{parentName:"li"},"Dockerfile")," que tengas en el repositorio."),(0,l.kt)("li",{parentName:"ol"},"Subir la imagen a tu cuenta de Docker Hub."),(0,l.kt)("li",{parentName:"ol"},"Borrar la imagen que se ha creado.")),(0,l.kt)("p",null,"Por lo tanto tienes que estudiar el apartado ",(0,l.kt)("a",{parentName:"p",href:"https://fp.josedomingo.org/iaw2223/7_ic/jenkins/runner.html"},"Ejecuci\xf3n de un pipeline en varios runner")," para ejecutar el pipeline en dos runner:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"En el contenedor docker a partir de la imagen python:3 los pasos del taller 3."),(0,l.kt)("li",{parentName:"ul"},"En la m\xe1quina de Jenkins los pasos de este ejercicio.")),(0,l.kt)("p",null,"Otras consideraciones:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Cuando termine de ejecutar el pipeline te mandar\xe1 un correo de notificaci\xf3n."),(0,l.kt)("li",{parentName:"ul"},"El pipeline se guardar\xe1 en un fichero Jenkinsfile en tu repositorio, y la configuraci\xf3n del pipeline har\xe1 referencia a \xe9l.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-groovy"},"pipeline {\n    agent none\n    stages {\n        stage ('Testing django') { \n            agent { \n                docker { image 'python:3'\n                args '-u root:root'\n                }\n            }\n            stages {\n                stage('Clone') {\n                    steps {\n                        git branch:'master',url:'https://github.com/belennazareth/django_tutorial.git'\n                    }\n                }\n                stage('Install') {\n                    steps {\n                        sh 'pip install -r requirements.txt'\n                    }\n                }\n                stage('Test') {\n                    steps {\n                        sh 'python3 manage.py test'\n                    }\n                } \n            }\n        }\n        stage('Upload img') {\n            agent any\n            stages {\n                stage('Build and push') {\n                    steps {\n                        script {\n                            withDockerRegistry([credentialsId: 'DOCKER_HUB', url: '']) {\n                            def dockerImage = docker.build(\"belennazareth/django_tutorial:${env.BUILD_ID}\")\n                            dockerImage.push()\n                        }\n                    }\n                }\n                stage('Remove image') {\n                    steps {\n                        script {\n                            sh 'docker rmi belennazareth/django_tutorial:${env.BUILD_ID}'\n                        }\n                    }\n                }\n            }\n        }\n    }\n}\n")),(0,l.kt)("p",null,"Hay que hacer un Dockerfile para que se pueda construir la imagen:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-dockerfile"},'FROM python:3\nWORKDIR /usr/src/app\nMAINTAINER Belen Nazareth Duran "belennazareth29@gmail.com"\nRUN pip install --root-user-action=ignore --upgrade pip && pip install --root-user-action=ignore django mysqlclient \nCOPY . /usr/src/app \nRUN mkdir static\nADD polls.sh /usr/src/app/\nRUN chmod +x /usr/src/app/polls.sh\nENTRYPOINT ["/usr/src/app/polls.sh"]\n')),(0,l.kt)("p",null,"Tambi\xe9n hay que hacer un fichero polls.sh para que se pueda ejecutar la aplicaci\xf3n:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"#! /bin/sh\n\nsleep 2\npython3 manage.py makemigrations\npython3 manage.py migrate\npython3 manage.py createsuperuser --noinput\npython3 manage.py collectstatic --noinput\npython3 manage.py runserver 0.0.0.0:8005\n")),(0,l.kt)("h2",{id:"entrega"},"Entrega"),(0,l.kt)("h3",{id:"1-una-captura-de-pantalla-donde-se-vea-la-salida-de-un-build-que-se-ha-ejecutado-de-manera-correcta"},"1. Una captura de pantalla donde se vea la salida de un build que se ha ejecutado de manera correcta."),(0,l.kt)("h3",{id:"2-una-captura-de-pantalla-de-tu-cuenta-de-docker-hub-donde-se-vea-la-imagen-subida-de-\xfaltimo-build"},"2. Una captura de pantalla de tu cuenta de Docker Hub donde se vea la imagen subida de \xfaltimo build."),(0,l.kt)("h3",{id:"3-introduce-un-fallo-en-el-dockerfile-y-muestra-la-salida-del-build-donde-se-produce-el-error"},"3. Introduce un fallo en el Dockerfile y muestra la salida del build donde se produce el error."),(0,l.kt)("h3",{id:"4-entrega-la-url-del-repositorio-para-ver-el-jenkinsfile"},"4. Entrega la URL del repositorio para ver el Jenkinsfile."),(0,l.kt)("h3",{id:"5-pantallazo-con-el-correo-que-has-recibido-de-la-ejecuci\xf3n-del-pipeline"},"5. Pantallazo con el correo que has recibido de la ejecuci\xf3n del pipeline."),(0,l.kt)("h2",{id:"ejercicio-2-despliegue-de-la-aplicaci\xf3n"},"Ejercicio 2: Despliegue de la aplicaci\xf3n"),(0,l.kt)("p",null,"Ampl\xeda el pipeline anterior para que tenga una \xfaltima etapa donde se haga el despliegue de la imagen que se ha subido a Docker Hub en tu entorno de producci\xf3n (VPS). Algunas pistas:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Busca informaci\xf3n de c\xf3mo hacer el despliegue a un servidor remoto (ssh, buscando alg\xfan plugin con esa funcionalidad,\u2026)"),(0,l.kt)("li",{parentName:"ul"},"Si vas a hacer conexiones por ssh, tendr\xe1s que guardar una credencial en tu Jenkins con el nombre de usuario y contrase\xf1a."),(0,l.kt)("li",{parentName:"ul"},"Para el despliegue deber\xe1 usar el fichero docker-compose.yaml que has generado en otras pr\xe1cticas."),(0,l.kt)("li",{parentName:"ul"},"Se deber\xe1 borrar el contenedor con la versi\xf3n anterior, descargar la nueva imagen y crear un nuevo contenedor.")),(0,l.kt)("p",null,"Otras consideraciones:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Cambia el disparador del pipeline. Config\xfaralo con un webhook de github, para que cada vez que se produce un push se ejecute el pipeline. Para que el webhook pueda acceder a tu Jenkins puedes usar ngrok.")),(0,l.kt)("h2",{id:"entrega-1"},"Entrega"),(0,l.kt)("h3",{id:"1-el-contenido-del-fichero-jenkinsfile"},"1. El contenido del fichero Jenkinsfile."),(0,l.kt)("h3",{id:"2-las-credenciales-que-has-guardado-en-jenkins"},"2. Las credenciales que has guardado en Jenkins."),(0,l.kt)("h3",{id:"3-demuestra-al-profesor-como-se-realiza-la-icdc-completo"},"3. Demuestra al profesor como se realiza la IC/DC completo."))}p.isMDXComponent=!0}}]);