"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[1915],{3905:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>h});var r=t(67294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function i(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var c=r.createContext({}),s=function(e){var a=r.useContext(c),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},p=function(e){var a=s(e.components);return r.createElement(c.Provider,{value:a},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},u=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,l=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=s(t),u=n,h=d["".concat(c,".").concat(u)]||d[u]||m[u]||l;return t?r.createElement(h,o(o({ref:a},p),{},{components:t})):r.createElement(h,o({ref:a},p))}));function h(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var l=t.length,o=new Array(l);o[0]=u;var i={};for(var c in a)hasOwnProperty.call(a,c)&&(i[c]=a[c]);i.originalType=e,i[d]="string"==typeof e?e:n,o[1]=i;for(var s=2;s<l;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},39236:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=t(87462),n=(t(67294),t(3905));const l={sidebar_position:29},o="Configuraci\xf3n de un servidor Apache2",i={unversionedId:"Tasks/configuracion_apache2",id:"Tasks/configuracion_apache2",title:"Configuraci\xf3n de un servidor Apache2",description:"Procedimiento",source:"@site/docs/Tasks/configuracion_apache2.md",sourceDirName:"Tasks",slug:"/Tasks/configuracion_apache2",permalink:"/docs/Tasks/configuracion_apache2",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/configuracion_apache2.md",tags:[],version:"current",sidebarPosition:29,frontMatter:{sidebar_position:29},sidebar:"tutorialSidebar",previous:{title:"Delegaci\xf3n de subdominios con bind9",permalink:"/docs/Tasks/bind9_subdominios"},next:{title:"Instalaci\xf3n y configuraci\xf3n del servidor DHCP",permalink:"/docs/Tasks/configuracion_dhcp"}},c={},s=[{value:"Procedimiento",id:"procedimiento",level:2},{value:"Entrega",id:"entrega",level:2},{value:"1. Configuraci\xf3n completa del virtualhost.",id:"1-configuraci\xf3n-completa-del-virtualhost",level:3},{value:"2. Comprobaci\xf3n de que al acceder a www.taller2.com se produce una redirecci\xf3n.",id:"2-comprobaci\xf3n-de-que-al-acceder-a-wwwtaller2com-se-produce-una-redirecci\xf3n",level:3},{value:"3. Pantallazo accediendo a www.taller2.com/principal/documentos (pon algunos ficheros para que se vea la lista).",id:"3-pantallazo-accediendo-a-wwwtaller2comprincipaldocumentos-pon-algunos-ficheros-para-que-se-vea-la-lista",level:3},{value:"4. Pantallazos de accesos a www.taller2.com/intranet desde el host y el cliente interno. Pantallazos de acceso a www.taller2.com/internet desde el host y el clientee interno.",id:"4-pantallazos-de-accesos-a-wwwtaller2comintranet-desde-el-host-y-el-cliente-interno-pantallazos-de-acceso-a-wwwtaller2cominternet-desde-el-host-y-el-clientee-interno",level:3},{value:"5. Pantallazos de la autentificaci\xf3n b\xe1sica.",id:"5-pantallazos-de-la-autentificaci\xf3n-b\xe1sica",level:3},{value:"6. Pantallazos de acceso a www.taller2.com/secreto desde el host y el cliente interno.",id:"6-pantallazos-de-acceso-a-wwwtaller2comsecreto-desde-el-host-y-el-cliente-interno",level:3},{value:"7. Contenido del fichero .htaccess. Acceso a www.taller2.com/documentos comprobando que se produce una redirecci\xf3n desde el exterior y prueba de acceso desde el cliente interno para comprobar que no tiene permiso de acceso.",id:"7-contenido-del-fichero-htaccess-acceso-a-wwwtaller2comdocumentos-comprobando-que-se-produce-una-redirecci\xf3n-desde-el-exterior-y-prueba-de-acceso-desde-el-cliente-interno-para-comprobar-que-no-tiene-permiso-de-acceso",level:3}],p={toc:s},d="wrapper";function m(e){let{components:a,...l}=e;return(0,n.kt)(d,(0,r.Z)({},p,l,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"configuraci\xf3n-de-un-servidor-apache2"},"Configuraci\xf3n de un servidor Apache2"),(0,n.kt)("h2",{id:"procedimiento"},"Procedimiento"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Para hacer este ejercicio, crea un escenario en Vagrant, que tenga una m\xe1quina (servidorweb) conectada a una red \u201cexterna\u201d (que podamos acceder desde nuestro host, puede ser una red p\xfablica o una red privada NAT), y una privada (aislada o muy aislada) y un clientee conectada a esta nueva red.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'Vagrant.configure("2") do |config|\n    config.vm.box = "debian/bullseye64"\n    config.vm.synced_folder ".", "/vagrant", disabled: true\n\n    config.vm.define :servidorweb do |servidorweb|\n        servidorweb.vm.hostname = "servidorweb"\n        servidorweb.vm.network :public_network,\n        :dev => "br0",\n        :mode => "bridge",\n        :type => "bridge"\n        servidorweb.vm.network :private_network,\n        :libvirt__network_name => "redaislada",\n        :libvirt__dhcp_enabled => false,\n        :ip => "10.0.0.1",\n       :libvirt__forward_mode => "veryisolated"\n    end\n    config.vm.define :cliente do |cliente|\n        cliente.vm.hostname = "cliente"\n        cliente.vm.network :private_network,\n        :libvirt__network_name => "redaislada",\n        :libvirt__dhcp_enabled => false,\n        :ip => "10.0.0.2",\n        :libvirt__forward_mode => "veryisolated"\n    end\nend\n')),(0,n.kt)("p",null,"*Nota: ser\xe1 necesario crear un bridge br0 en ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/network/interfaces"),", despu\xe9s se ejecuta ",(0,n.kt)("inlineCode",{parentName:"p"},"ifup br0")," para activarlo (si eso hacer ",(0,n.kt)("inlineCode",{parentName:"p"},"ifup eno1")," para porsiaca). El fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/network/interfaces")," quedar\xeda as\xed:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"auto eno1\niface eno1 inet dhcp\n\nauto br0\niface br0 inet dhcp\n    bridge_ports eno1\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"1. Instala un servidor web apache2 en servidorweb.")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt update\nsudo apt install apache2\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"2. Crea un virtualhost con el que accederemos con el nombre ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com."},"www.taller2.com.")," En este virtualhost realizaremos los siguientes ejercicios.")),(0,n.kt)("p",null,"Para crearlo editamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/apache2/sites-available/taller2.conf")," y le ponemos el siguiente contenido:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n")),(0,n.kt)("p",null,"Creamos el directorio ",(0,n.kt)("inlineCode",{parentName:"p"},"/home/vagrant/taller2"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir /home/vagrant/taller2\n")),(0,n.kt)("p",null,"Cambiamos el propietario del directorio:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"chown -R vagrant:vagrant /home/vagrant/taller2\n")),(0,n.kt)("p",null,"Cambiamos los permisos del directorio:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"chmod -R 755 /home/vagrant/taller2\n")),(0,n.kt)("p",null,"Activamos el virtualhost:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"sudo a2ensite taller2.conf\n")),(0,n.kt)("p",null,"Reiniciamos el servicio:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl restart apache2\n")),(0,n.kt)("p",null,"Editamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/hosts")," y a\xf1adimos la siguiente l\xednea:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"{ip_servidor}    www.taller2.com\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"3. Cuando se entre a la direcci\xf3n ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com"},"www.taller2.com")," se redireccionar\xe1 autom\xe1ticamente a ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/principal"},"www.taller2.com/principal"),", donde se mostrar\xe1 el mensaje de bienvenida.")),(0,n.kt)("p",null,"Hacemos el directorio principal:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir /home/vagrant/taller2/principal\n")),(0,n.kt)("p",null,"Creamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"index.html"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'echo "<h1>Bienvenido a la pagina principal :)</h1>" > /home/vagrant/taller2/principal/index.html\n')),(0,n.kt)("p",null,"Hacemos que el directorio principal sea el directorio por defecto:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    RedirectMatch ^/$ /principal\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/principal>\n        Require all granted\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"4. Si accedes a la p\xe1gina ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/principal/documentos"},"www.taller2.com/principal/documentos")," se visualizar\xe1n los documentos que hay en home/usuario/doc. Por lo tanto se permitir\xe1 el listado de ficheros (opci\xf3n Indexes).")),(0,n.kt)("p",null,"Creamos el directorio para visualizar los documentos:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir /home/vagrant/doc\n")),(0,n.kt)("p",null,"Creamos algunos ficheros:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'echo "Fichero1" > /home/vagrant/doc/fichero1.txt\necho "Fichero2" > /home/vagrant/doc/fichero2.txt\necho "Fichero 3" > /home/vagrant/doc/fichero3.txt\n')),(0,n.kt)("p",null,"Modificamos:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    RedirectMatch ^/$ /principal\n\n    Alias /principal/documentos /home/vagrant/doc\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/principal>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/doc>\n        Options Indexes\n        Require all granted\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n")),(0,n.kt)("p",null,"*Nota: El redirectmacth se hace cuando es una redireccion dentro documentroot, mientras que el alias es cuando es una redireccion fuera del documentroot."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"5. A la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/intranet"},"www.taller2.com/intranet")," s\xf3lo se debe tener acceso desde el cliente de la red interna, y no se pueda acceder desde la anfitriona por la red p\xfablica. A la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/internet"},"www.taller2.com/internet"),", sin embargo, s\xf3lo se debe tener acceso desde la anfitriona por la red p\xfablica, y no desde la red interna.")),(0,n.kt)("p",null,"Para esto hay que cambiar el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/apache2/sites-available/taller2.conf"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    RedirectMatch ^/$ /principal\n\n    Alias /principal/documentos /home/vagrant/doc\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/principal>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/doc>\n        Options Indexes\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/intranet>\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/internet>\n        Require ip 192.168.1.0/24\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n")),(0,n.kt)("p",null,"Creamos unos ficheros para probar:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'mkdir /home/vagrant/taller2/intranet\nmkdir /home/vagrant/taller2/internet\necho "<h1>Welcome a Intranet</h1>" > /home/vagrant/taller2/intranet/index.html\necho "<h1>Welcome a Internet</h1>" > /home/vagrant/taller2/internet/index.html\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"6. Autentificaci\xf3n b\xe1sica. Limita el acceso a la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/secreto"},"www.taller2.com/secreto"),".")),(0,n.kt)("p",null,"Creamos el directorio:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir /home/vagrant/taller2/secreto\n")),(0,n.kt)("p",null,"Creamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"index.html"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'echo "<h1>Acceso restringido</h1>" > /home/vagrant/taller2/secreto/index.html\n')),(0,n.kt)("p",null,"Creamos el directorio para las claves:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir /etc/apache2/claves\n")),(0,n.kt)("p",null,"Creamos el fichero de contrase\xf1as:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"htpasswd -c /etc/apache2/claves/contra.txt usuario\n")),(0,n.kt)("p",null,"Modificamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/apache2/sites-available/taller2.conf"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    RedirectMatch ^/$ /principal\n\n    Alias /principal/documentos /home/vagrant/doc\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/principal>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/doc>\n        Options Indexes\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/intranet>\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/internet>\n        Require ip 192.168.1.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/secreto>\n        AuthType Basic\n        AuthName "Acceso restringido"\n        AuthUserFile /etc/apache2/claves/contra.txt\n        Require valid-user\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n')),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"7. Vamos a combinar el control de acceso (ejercicio 5) y la autentificaci\xf3n (ejercicio 6), y vamos a configurar el virtual host para que se comporte de la siguiente manera: el acceso a la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/secreto"},"www.taller2.com/secreto")," se hace forma directa desde la intranet, desde la red p\xfablica te pide la autentificaci\xf3n.")),(0,n.kt)("p",null,"Modificamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/apache2/sites-available/taller2.conf"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    RedirectMatch ^/$ /principal\n\n    Alias /principal/documentos /home/vagrant/doc\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/principal>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/doc>\n        Options Indexes\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/intranet>\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/internet>\n        Require ip 192.168.1.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/secreto>\n        AuthType Basic\n        AuthName "Acceso restringido"\n        AuthUserFile /etc/apache2/claves/contra.txt\n        Require valid-user\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n')),(0,n.kt)("p",null,"En el cliente editamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/hosts"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"10.0.0.1 www.taller2.com\n")),(0,n.kt)("p",null,"Para probarlo, desde la red interna:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"curl http://www.taller2.com/secreto/\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"8. El m\xf3dulo rewrite nos va a permitir acceder a una URL e internamente estar accediendo a otra. Esto nos puede ayudar a hacer URL amigables y hacer redirecciones. Por ejemplo para redireccionar a otra URL:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"RewriteEngine On\nRewriteRule ^(.*)$ http://www.nueva.com/$1 [R=301,L]\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Usando un fichero .htaccess haz que al acceder a la URL ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/documentos"},"www.taller2.com/documentos")," se produce una redirecci\xf3n a ",(0,n.kt)("a",{parentName:"strong",href:"http://www.taller2.com/principal/documentos"},"www.taller2.com/principal/documentos")," usando el modulo rewrite (recuerda que tienes que activarlo). Adem\xe1s, deniega el acceso desde la red interna.")),(0,n.kt)("p",null,"Activamos el m\xf3dulo rewrite:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"a2enmod rewrite\n")),(0,n.kt)("p",null,"Creamos el directorio:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir /home/vagrant/taller2/documentos\n")),(0,n.kt)("p",null,"Creamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},".htaccess"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'echo "RewriteEngine On" > /home/vagrant/taller2/documentos/.htaccess\necho "RewriteRule ^(.*)$ /principal/documentos/$1 [R=301,L]" >> /home/vagrant/taller2/documentos/.htaccess\n')),(0,n.kt)("p",null,"Modificamos el fichero ",(0,n.kt)("inlineCode",{parentName:"p"},"/etc/apache2/sites-available/taller2.conf"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    RedirectMatch ^/$ /principal\n\n    Alias /principal/documentos /home/vagrant/doc\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/principal>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/doc>\n        Options Indexes\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/intranet>\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/internet>\n        Require ip 192.168.1.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/secreto>\n        AuthType Basic\n        AuthName "Acceso restringido"\n        AuthUserFile /etc/apache2/claves/contra.txt\n        Require valid-user\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/documentos>\n        Require all granted\n        AllowOverride All\n        Options Indexes FollowSymLinks\n        Deny from 10.0.0.0/24     \n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n')),(0,n.kt)("p",null,"Y reiniciamos el servicio:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"systemctl restart apache2\n")),(0,n.kt)("h2",{id:"entrega"},"Entrega"),(0,n.kt)("h3",{id:"1-configuraci\xf3n-completa-del-virtualhost"},"1. Configuraci\xf3n completa del virtualhost."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'<VirtualHost *:80>\n\n    ServerName www.taller2.com\n    DocumentRoot /home/vagrant/taller2\n\n    RedirectMatch ^/$ /principal\n\n    Alias /principal/documentos /home/vagrant/doc\n\n    <Directory /home/vagrant/taller2>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/principal>\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/doc>\n        Options Indexes\n        Require all granted\n    </Directory>\n\n    <Directory /home/vagrant/taller2/intranet>\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/internet>\n        Require ip 192.168.1.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/secreto>\n        AuthType Basic\n        AuthName "Acceso restringido"\n        AuthUserFile /etc/apache2/claves/contra.txt\n        Require valid-user\n        Require ip 10.0.0.0/24\n    </Directory>\n\n    <Directory /home/vagrant/taller2/documentos>\n        Require all granted\n        AllowOverride All\n        Options Indexes FollowSymLinks        \n    </Directory>\n\n    ErrorLog ${APACHE_LOG_DIR}/taller2_error.log\n    CustomLog ${APACHE_LOG_DIR}/taller2_access.log combined\n\n</VirtualHost>\n')),(0,n.kt)("h3",{id:"2-comprobaci\xf3n-de-que-al-acceder-a-wwwtaller2com-se-produce-una-redirecci\xf3n"},"2. Comprobaci\xf3n de que al acceder a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.taller2.com"},"www.taller2.com")," se produce una redirecci\xf3n."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(96093).Z,width:"1355",height:"628"})),(0,n.kt)("h3",{id:"3-pantallazo-accediendo-a-wwwtaller2comprincipaldocumentos-pon-algunos-ficheros-para-que-se-vea-la-lista"},"3. Pantallazo accediendo a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.taller2.com/principal/documentos"},"www.taller2.com/principal/documentos")," (pon algunos ficheros para que se vea la lista)."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(71068).Z,width:"872",height:"628"})),(0,n.kt)("h3",{id:"4-pantallazos-de-accesos-a-wwwtaller2comintranet-desde-el-host-y-el-cliente-interno-pantallazos-de-acceso-a-wwwtaller2cominternet-desde-el-host-y-el-clientee-interno"},"4. Pantallazos de accesos a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.taller2.com/intranet"},"www.taller2.com/intranet")," desde el host y el cliente interno. Pantallazos de acceso a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.taller2.com/internet"},"www.taller2.com/internet")," desde el host y el clientee interno."),(0,n.kt)("p",null,"Host:"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(61687).Z,width:"872",height:"628"}),"\n",(0,n.kt)("img",{alt:"http",src:t(67821).Z,width:"872",height:"628"})),(0,n.kt)("p",null,"Cliente interno:"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(52724).Z,width:"596",height:"158"}),"\n",(0,n.kt)("img",{alt:"http",src:t(32985).Z,width:"764",height:"293"})),(0,n.kt)("h3",{id:"5-pantallazos-de-la-autentificaci\xf3n-b\xe1sica"},"5. Pantallazos de la autentificaci\xf3n b\xe1sica."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(89027).Z,width:"858",height:"545"})),(0,n.kt)("h3",{id:"6-pantallazos-de-acceso-a-wwwtaller2comsecreto-desde-el-host-y-el-cliente-interno"},"6. Pantallazos de acceso a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.taller2.com/secreto"},"www.taller2.com/secreto")," desde el host y el cliente interno."),(0,n.kt)("p",null,"Host:"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(89027).Z,width:"858",height:"545"}),"\n",(0,n.kt)("img",{alt:"http",src:t(22566).Z,width:"858",height:"545"})),(0,n.kt)("p",null,"Cliente interno:"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(35952).Z,width:"580",height:"156"})),(0,n.kt)("h3",{id:"7-contenido-del-fichero-htaccess-acceso-a-wwwtaller2comdocumentos-comprobando-que-se-produce-una-redirecci\xf3n-desde-el-exterior-y-prueba-de-acceso-desde-el-cliente-interno-para-comprobar-que-no-tiene-permiso-de-acceso"},"7. Contenido del fichero .htaccess. Acceso a ",(0,n.kt)("a",{parentName:"h3",href:"http://www.taller2.com/documentos"},"www.taller2.com/documentos")," comprobando que se produce una redirecci\xf3n desde el exterior y prueba de acceso desde el cliente interno para comprobar que no tiene permiso de acceso."),(0,n.kt)("p",null,"Contenido del fichero ",(0,n.kt)("inlineCode",{parentName:"p"},".htaccess"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"RewriteEngine On\nRewriteRule ^(.*)$ /principal/documentos/ [R=301,L]\n")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(9932).Z,width:"1485",height:"762"})),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"http",src:t(79151).Z,width:"768",height:"318"})))}m.isMDXComponent=!0},9932:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-10-bd9935efaa809a84d03ffa133c5579d7.png"},79151:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-11-0065f77bbf2433e21f6353d94668e8be.png"},71068:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-2-41508867aefa1581e08d9b1f3f2af2d7.png"},61687:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-3-17629077a04964f4fb19054a1ee68c5b.png"},67821:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-4-bde84c9d3ee9be577e904ae88267667a.png"},52724:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-5-49a58aff9135d1e60a0cc8633e1ecaa4.png"},32985:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-6-2a9fc6d9465cf7e5fefff9f95225e5ab.png"},89027:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-7-6f0d9561b3486e4d9f016344e2cca3c4.png"},22566:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-8-5506141434d71016aa773d1aafd505c2.png"},35952:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-9-e881131e0eefa9cfa5fae1e968ba57e9.png"},96093:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/taller2SRI3-a88f94fe5bf265cf28f19721f25253ef.png"}}]);