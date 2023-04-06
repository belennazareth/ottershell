"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[9497],{3905:(e,a,n)=>{n.d(a,{Zo:()=>c,kt:()=>m});var t=n(7294);function r(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function o(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function p(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?o(Object(n),!0).forEach((function(a){r(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function s(e,a){if(null==e)return{};var n,t,r=function(e,a){if(null==e)return{};var n,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=t.createContext({}),i=function(e){var a=t.useContext(l),n=a;return e&&(n="function"==typeof e?e(a):p(p({},a),e)),n},c=function(e){var a=i(e.components);return t.createElement(l.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},u=t.forwardRef((function(e,a){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=i(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return n?t.createElement(h,p(p({ref:a},c),{},{components:n})):t.createElement(h,p({ref:a},c))}));function m(e,a){var n=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=n.length,p=new Array(o);p[0]=u;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,p[1]=s;for(var i=2;i<o;i++)p[i]=n[i];return t.createElement.apply(null,p)}return t.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6835:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>l,contentTitle:()=>p,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>i});var t=n(7462),r=(n(7294),n(3905));const o={sidebar_position:30},p="Instalaci\xf3n de phpmyadmin",s={unversionedId:"Tasks/phpmyadmin",id:"Tasks/phpmyadmin",title:"Instalaci\xf3n de phpmyadmin",description:"Procedimiento",source:"@site/docs/Tasks/phpmyadmin.md",sourceDirName:"Tasks",slug:"/Tasks/phpmyadmin",permalink:"/docs/Tasks/phpmyadmin",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/phpmyadmin.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_position:30},sidebar:"tutorialSidebar",previous:{title:"Markdown Features",permalink:"/docs/Tasks/markdown-features"},next:{title:"Extras",permalink:"/docs/category/extras"}},l={},i=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Entrega",id:"entrega",level:2},{value:"1. Una captura donde se vea la base de datos que has creado en el punto 1.",id:"1-una-captura-donde-se-vea-la-base-de-datos-que-has-creado-en-el-punto-1",level:3},{value:"2. \xbfC\xf3mo has quitado la configuraci\xf3n de acceso a phpmyadmin en el punto 5?",id:"2-c\xf3mo-has-quitado-la-configuraci\xf3n-de-acceso-a-phpmyadmin-en-el-punto-5",level:3},{value:"3. Entrega una captura de la configuraci\xf3n del virtualhost.",id:"3-entrega-una-captura-de-la-configuraci\xf3n-del-virtualhost",level:3},{value:"4. Entrega una captura con el acceso a phpmyadmin con el usuario que creaste en el punto 1.",id:"4-entrega-una-captura-con-el-acceso-a-phpmyadmin-con-el-usuario-que-creaste-en-el-punto-1",level:3}],c={toc:i};function d(e){let{components:a,...o}=e;return(0,r.kt)("wrapper",(0,t.Z)({},c,o,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"instalaci\xf3n-de-phpmyadmin"},"Instalaci\xf3n de phpmyadmin"),(0,r.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,r.kt)("p",null,"En primer lugar, configura en tu servidor web un ",(0,r.kt)("strong",{parentName:"p"},"servicio LAMP")," para instalar una aplicaci\xf3n PHP y tener disponible un gestor de base de datos ",(0,r.kt)("inlineCode",{parentName:"p"},"(Puedes usar cualquier m\xe1quina donde tengas ya instalado el servidor LAMP)"),".\n",(0,r.kt)("a",{parentName:"p",href:"https://www.phpmyadmin.net/"},"phpmyadmin")," es una aplicaci\xf3n web escrita en PHP que nos posibilita la gesti\xf3n de una base de datos ",(0,r.kt)("strong",{parentName:"p"},"mysql/mariadb"),". Normalmente vamos a instalar las aplicaciones web descargando directamente el c\xf3digo de la aplicaci\xf3n al servidor, pero en este ejercicio vamos a instalar la aplicaci\xf3n desde los repositorios de Debian."),(0,r.kt)("p",null,"Para hacer este taller he usado el siguiente vagrantfile:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ruby"},'Vagrant.configure("2") do |config|\n    config.vm.box = "debian/bullseye64"\n    config.vm.synced_folder ".", "/vagrant", disabled: true\n\n    config.vm.define :serverlamp do |serverlamp|\n        serverlamp.vm.hostname = "serverlamp"\n        serverlamp.vm.network :public_network,\n            :dev => "br0",\n            :mode => "bridge",\n            :type => "bridge"\n    end\nend\n')),(0,r.kt)("p",null,"Para hacer el servidor LAMP, primero instalamos apache2, mysql y php:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt update\nsudo apt install apache2 mysql-server php php-mysql libapache2-mod-php -y\n")),(0,r.kt)("p",null,"Realiza los siguientes pasos:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"1. Accede desde el terminal a la base de datos con el root (con contrase\xf1a) y crea una base de datos y un usuario que tenga permiso sobre ella.")),(0,r.kt)("p",null,"Primero damos contrase\xf1a al usuario root:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"passwd root\n")),(0,r.kt)("p",null,"Ahora accedemos a la base de datos con el usuario root:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mysql -u root -p\n(sudo mysql)\n")),(0,r.kt)("p",null,"Y creamos la base de datos y el usuario:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE DATABASE phplamp;\nCREATE USER 'usuario'@'localhost' IDENTIFIED BY 'usuario';\nGRANT ALL PRIVILEGES ON phplamp.* TO 'usuario'@'localhost';\nFLUSH PRIVILEGES;\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"2. Instala desde los repositorios la aplicaci\xf3n phpmyadmin. En la instalaci\xf3n nos pregunta que servidor estamos usando, en nuestro caso elegimos apache2. Adem\xe1s elegimos que NO se configure la base de datos en el proceso de instalaci\xf3n-. Accede con un navegador a la URL http://ip_servidor/phpmyadmin (usa el nombre de usuario creado en el punto anterior).")),(0,r.kt)("p",null,"Instalamos phpmyadmin:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install phpmyadmin -y\n")),(0,r.kt)("p",null,"Seleccionamos apache2:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(1038).Z,width:"941",height:"382"})),(0,r.kt)("p",null,"Y no configuramos la base de datos:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(8868).Z,width:"940",height:"468"})),(0,r.kt)("p",null,"Ahora accedemos a la aplicaci\xf3n desde el navegador:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(946).Z,width:"1024",height:"831"}),"\n",(0,r.kt)("img",{alt:"phpma",src:n(5128).Z,width:"1024",height:"831"})),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"3. \xbfSe ha creado en el DocumentRoot (/var/www/html) un directorio que se llama phpmyadmin? Entonces, \xbfc\xf3mo podemos acceder?")),(0,r.kt)("p",null,"No se ha creado ning\xfan directorio en el DocumentRoot, pero s\xed se ha creado un enlace simb\xf3lico en /etc/apache2/conf-available/phpmyadmin.conf que apunta a /etc/phpmyadmin/apache.conf. Dentro del fichero vemos que apunta a /usr/share/phpmyadmin. Por lo tanto, para acceder a la aplicaci\xf3n, tenemos que acceder a la ruta /usr/share/phpmyadmin."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"4. La instalaci\xf3n de phpmyadmin ha creado un fichero de configuraci\xf3n en apache2: /etc/apache2/conf-available/phpmyadmin.conf (que es un enlace simb\xf3lico a /etc/phpmyadmin/apache.conf). La primera l\xednea del fichero es:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Alias /phpmyadmin /usr/share/phpmyadmin\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"La directiva Alias nos permite crear una ruta phpmyadmin que nos muestra los ficheros que hay en un directorio que est\xe1 fuera del DocumentRoot, en este caso /usr/share/phpmyadmin, es decir, la aplicaci\xf3n est\xe1 realmente en ese directorio.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"5. Quita la configuraci\xf3n de acceso a phpmyadmin con el comando a2disconf y comprueba que ya no puedes acceder. A continuaci\xf3n crea un virtualhost, al que hay que acceder con el nombre basededatos.tunombre.org, y que nos muestre la aplicaci\xf3n."),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"Nota: En la configuraci\xf3n del virtualhost copia las 3 directivas directory que se encuentran en el fichero /etc/apache2/conf-available/myphpadmin.conf.")),(0,r.kt)("p",null,"Despu\xe9s de deshabilitar la configuraci\xf3n de acceso a phpmyadmin, ya no podemos acceder a la aplicaci\xf3n dando un error:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Not Found\nThe requested URL was not found on this server.\n\nApache/2.4.56 (Debian) Server at 192.168.1.90 Port 80\n")),(0,r.kt)("p",null,"*Nota: lo contrario de a2disconf es a2enconf."),(0,r.kt)("p",null,"Ahora creamos el virtualhost:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo nano /etc/apache2/sites-available/phplamp.nazareth.conf\n")),(0,r.kt)("p",null,"Las directivas directory que se encuentran en el fichero /etc/apache2/conf-available/myphpadmin.conf son:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<Directory /usr/share/phpmyadmin>\n    Options SymLinksIfOwnerMatch\n    DirectoryIndex index.php\n\n    # limit libapache2-mod-php to files and directories necessary by pma\n    <IfModule mod_php7.c>\n        php_admin_value upload_tmp_dir /var/lib/phpmyadmin/tmp\n        php_admin_value open_basedir /usr/share/phpmyadmin/:/usr/share/doc/phpmyadmin/:/etc/phpmyadmin/:/var/lib/phpmyadmin/:/usr/share/php/:/usr/share/javascript/\n    </IfModule>\n\n</Directory>\n\n<Directory /usr/share/phpmyadmin/templates>\n    Require all denied\n</Directory>\n\n<Directory /usr/share/phpmyadmin/libraries>\n    Require all denied\n</Directory>\n")),(0,r.kt)("p",null,"Y el virtualhost queda as\xed:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<VirtualHost *:80>\n    ServerName phplamp.nazareth\n    ServerAlias www.phplamp.nazareth.org\n    ServerAdmin webmaster@localhost\n    DocumentRoot /usr/share/phpmyadmin\n\n    <Directory /usr/share/phpmyadmin>\n        Options SymLinksIfOwnerMatch\n        DirectoryIndex index.php\n\n        <IfModule mod_php7.c>\n            php_admin_value upload_tmp_dir /var/lib/phpmyadmin/tmp\n            php_admin_value open_basedir /usr/share/phpmyadmin/:/usr/share/doc/phpmyadmin/:/etc/phpmyadmin/:/var/lib/phpmyadmin/:/usr/share/php/:/usr/share/javascript/\n        </IfModule>\n\n    </Directory>\n\n    <Directory /usr/share/phpmyadmin/templates>\n        Require all denied\n    </Directory>\n\n    <Directory /usr/share/phpmyadmin/libraries>\n        Require all denied\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/error.log\n    CustomLog ${APACHE_LOG_DIR}/access.log combined\n</VirtualHost>\n")),(0,r.kt)("p",null,"Para que el virtualhost funcione, tenemos que habilitarlo:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo a2ensite phplamp.nazareth.conf\n")),(0,r.kt)("p",null,"Y reiniciar el servicio:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl restart apache2\n")),(0,r.kt)("p",null,"Editamos el fichero ",(0,r.kt)("inlineCode",{parentName:"p"},"/etc/hosts")," para a\xf1adir la nueva direcci\xf3n:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"192.168.1.90 www.phplamp.nazareth.org\n")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(6226).Z,width:"1024",height:"831"})),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"6. Accede a phpmyadmin y comprueba que puedes acceder con el usuario que creaste en el punto 1 y que puede gestionar su base de datos.")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(2615).Z,width:"1024",height:"831"})),(0,r.kt)("h2",{id:"entrega"},"Entrega"),(0,r.kt)("h3",{id:"1-una-captura-donde-se-vea-la-base-de-datos-que-has-creado-en-el-punto-1"},"1. Una captura donde se vea la base de datos que has creado en el punto 1."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(2615).Z,width:"1024",height:"831"})),(0,r.kt)("h3",{id:"2-c\xf3mo-has-quitado-la-configuraci\xf3n-de-acceso-a-phpmyadmin-en-el-punto-5"},"2. \xbfC\xf3mo has quitado la configuraci\xf3n de acceso a phpmyadmin en el punto 5?"),(0,r.kt)("p",null,"Usando el comando ",(0,r.kt)("inlineCode",{parentName:"p"},"a2disconf"),"."),(0,r.kt)("h3",{id:"3-entrega-una-captura-de-la-configuraci\xf3n-del-virtualhost"},"3. Entrega una captura de la configuraci\xf3n del virtualhost."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(3749).Z,width:"944",height:"739"})),(0,r.kt)("h3",{id:"4-entrega-una-captura-con-el-acceso-a-phpmyadmin-con-el-usuario-que-creaste-en-el-punto-1"},"4. Entrega una captura con el acceso a phpmyadmin con el usuario que creaste en el punto 1."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"phpma",src:n(4680).Z,width:"1024",height:"831"})))}d.isMDXComponent=!0},8868:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-2-3ab6489a791483c8909250a50eabcfab.png"},946:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-3-637c034c5b84562f6b5b1532dd7d4985.png"},5128:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-4-9e3ec540976ac824af794b7ff7587de4.png"},6226:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-5-94e10e57538f1294db58195ca7d75f33.png"},2615:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-6-6d1cebd1ed47ba875a5fcf7c734855e8.png"},3749:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-7-782e39b99e31845b6417c193d8f6e207.png"},4680:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-8-48719947f16c7536eff484625468b1fc.png"},1038:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/taller3SRI3-1a2e192a6b8d9b2b614fa283f3ee4582.png"}}]);