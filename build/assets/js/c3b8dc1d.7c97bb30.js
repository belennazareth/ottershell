"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[5949],{3905:(e,n,r)=>{r.d(n,{Zo:()=>c,kt:()=>u});var t=r(67294);function i(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){i(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function d(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=t.createContext({}),s=function(e){var n=t.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):o(o({},n),e)),r},c=function(e){var n=s(e.components);return t.createElement(l.Provider,{value:n},e.children)},b="mdxType",v={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,c=d(e,["components","mdxType","originalType","parentName"]),b=s(r),m=i,u=b["".concat(l,".").concat(m)]||b[m]||v[m]||a;return r?t.createElement(u,o(o({ref:n},c),{},{components:r})):t.createElement(u,o({ref:n},c))}));function u(e,n){var r=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=m;var d={};for(var l in n)hasOwnProperty.call(n,l)&&(d[l]=n[l]);d.originalType=e,d[b]="string"==typeof e?e:i,o[1]=d;for(var s=2;s<a;s++)o[s]=r[s];return t.createElement.apply(null,o)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},79742:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>v,frontMatter:()=>a,metadata:()=>d,toc:()=>s});var t=r(87462),i=(r(67294),r(3905));const a={sidebar_position:30},o="Recopilaci\xf3n de Vagrantfiles",d={unversionedId:"Tasks/recopilatorio",id:"Tasks/recopilatorio",title:"Recopilaci\xf3n de Vagrantfiles",description:"Servidor web y servidor de base de datos (drupal)",source:"@site/docs/Tasks/recopilatorio.md",sourceDirName:"Tasks",slug:"/Tasks/recopilatorio",permalink:"/docs/Tasks/recopilatorio",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/recopilatorio.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_position:30},sidebar:"tutorialSidebar",previous:{title:"Instalaci\xf3n de phpmyadmin",permalink:"/docs/Tasks/phpmyadmin"},next:{title:"apache2 como proxy inverso",permalink:"/docs/Tasks/proxy_apache2"}},l={},s=[{value:"Servidor web y servidor de base de datos (drupal)",id:"servidor-web-y-servidor-de-base-de-datos-drupal",level:2},{value:"Router y cliente usando bridge creado manualmente y red muy aislada (ex)",id:"router-y-cliente-usando-bridge-creado-manualmente-y-red-muy-aislada-ex",level:2},{value:"Servidor con 3 discos y cliente (iscsi)",id:"servidor-con-3-discos-y-cliente-iscsi",level:2},{value:"M\xe1quina con imagen base de vagrant (makefile)",id:"m\xe1quina-con-imagen-base-de-vagrant-makefile",level:2},{value:"MetaSploitable3 (metasploitable3)",id:"metasploitable3-metasploitable3",level:2},{value:"Router y cliente usando bridge creado manualmente y red muy aislada con dhcp (vagrant/ansible)",id:"router-y-cliente-usando-bridge-creado-manualmente-y-red-muy-aislada-con-dhcp-vagrantansible",level:2}],c={toc:s},b="wrapper";function v(e){let{components:n,...r}=e;return(0,i.kt)(b,(0,t.Z)({},c,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"recopilaci\xf3n-de-vagrantfiles"},"Recopilaci\xf3n de Vagrantfiles"),(0,i.kt)("h2",{id:"servidor-web-y-servidor-de-base-de-datos-drupal"},"Servidor web y servidor de base de datos (drupal)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'viVagrant.configure("2") do |config|\n\n    config.vm.define :web do |web|\n      web.vm.box = "debian/bullseye64"\n      web.vm.hostname = "servidor-web-nazareth"\n      web.vm.synced_folder ".", "/vagrant", disabled: true\n#      web.vm.network :private_network,\n#      :type => "dhcp",\n#      :libvirt__network_address => \'192.168.200.0\'\n\n    web.vm.network :private_network,\n      :libvirt__dhcp_enabled => false,\n      :ip => "10.0.0.2"\n\n    web.vm.network :public_network,\n      :dev => "virbr0",\n      :mode => "bridge",\n      :type => "bridge"\n\n    web.vm.network :private_network,\n      :libvirt__network_name => "red1",\n      :libvirt__dhcp_enabled => false,\n      :ip => "192.168.0.10",\n      :libvirt__forward_mode => "veryisolated"\n    end\n    \n#####################################################################################\n\n    config.vm.define :bd do |bd|\n      bd.vm.box = "generic/ubuntu2010"\n      bd.vm.hostname = "servidor-bd-nazareth"\n      bd.vm.synced_folder ".", "/vagrant", disabled: true\n    \n    bd.vm.network :private_network,\n      :libvirt__dhcp_enabled => false,\n      :ip => "10.0.0.4"\n\n    bd.vm.network :public_network,\n      :dev => "virbr0",\n      :mode => "bridge",\n      :type => "bridge"\n\n#    bd.vm.provider :libvirt do |libvirt|\n#      libvirt.storage :file, :size => \'1G\'\n#    end\n\n#    bd.vm.provider :libvirt do |libvirt|\n#      libvirt.storage :file, :size => \'1G\'\n#    end\n\n    bd.vm.network :private_network,\n      :libvirt__network_name => "red1",\n      :libvirt__dhcp_enabled => false,\n      :ip => "192.168.0.11",\n      :libvirt__forward_mode => "veryisolated"\n    end    \n\n#    config.vm.provider :libvirt do |libvirt|\n#      libvirt.management_network_name = "default"\n#      libvirt.management_network_address = \'192.168.122.0/24\'\n#    end\n     \nend\n')),(0,i.kt)("h2",{id:"router-y-cliente-usando-bridge-creado-manualmente-y-red-muy-aislada-ex"},"Router y cliente usando bridge creado manualmente y red muy aislada (ex)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'Vagrant.configure("2") do |config|\n\nconfig.vm.define :router do |router|\n    router.vm.box = "debian/bullseye64"\n    router.vm.hostname = "router-prueba"\n    router.vm.synced_folder ".", "/vagrant", disabled: true\n    router.vm.network :public_network,\n      :dev => "br0",\n      :mode => "bridge",\n      :type => "bridge",\n      use_dhcp_assigned_default_route: true\n    router.vm.network :private_network,\n      :libvirt__network_name => "net1",\n      :libvirt__dhcp_enabled => false,\n      :ip => "192.168.0.10",\n      :libvirt__forward_mode => "veryisolated"\n  end\n  config.vm.define :cliente do |cliente|\n    cliente.vm.box = "debian/bullseye64"\n    cliente.vm.hostname = "cliente-prueba"\n    cliente.vm.synced_folder ".", "/vagrant", disabled: true\n    cliente.vm.network :private_network,\n      :libvirt__network_name => "net1",\n      :libvirt__dhcp_enabled => false,\n      :ip => "192.168.0.11",\n      :libvirt__forward_mode => "veryisolated"\n  end\nend\n')),(0,i.kt)("h2",{id:"servidor-con-3-discos-y-cliente-iscsi"},"Servidor con 3 discos y cliente (iscsi)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'# -*- mode: ruby -*-\n# vi: set ft=ruby :\n\nVagrant.configure("2") do |config|\n\n    config.vm.define :servidor do |servidor|\n      servidor.vm.box = "debian/bullseye64"\n      servidor.vm.hostname = "servidor"\n      servidor.vm.synced_folder ".", "/vagrant", disabled: true\n      servidor.vm.provider :libvirt do |libvirt|\n          libvirt.storage :file, :size => \'1G\'\n          libvirt.storage :file, :size => \'2G\'\n          libvirt.storage :file, :size => \'3G\'\n      end\n    end\n    config.vm.define :cliente do |cliente|\n      cliente.vm.box = "debian/bullseye64"\n      cliente.vm.hostname = "cliente"\n      cliente.vm.synced_folder ".", "/vagrant", disabled: true\n      cliente.vm.provider :libvirt do |libvirt|\n      end\n\n   end\n  end\n')),(0,i.kt)("h2",{id:"m\xe1quina-con-imagen-base-de-vagrant-makefile"},"M\xe1quina con imagen base de vagrant (makefile)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'# -*- mode: ruby -*-\n# vi: set ft=ruby :\n\nVagrant.configure("2") do |config|\n  config.vm.box = "base"\n\nend\n')),(0,i.kt)("h2",{id:"metasploitable3-metasploitable3"},"MetaSploitable3 (metasploitable3)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},' Vagrant.configure("2") do |config|\n   config.vm.synced_folder \'.\', \'/vagrant\', disabled: true\n   config.vm.define "ub1404" do |ub1404|\n     ub1404.vm.box = "tmarchst/metasploitable3-ub1404"\n     ub1404.vm.hostname = "metasploitable3-ub1404"\n     config.ssh.username = \'vagrant\'\n     config.ssh.password = \'vagrant\'\n     ub1404.vm.network :public_network,\n       :dev => "br0",\n      :mode => "bridge",\n      :type => "bridge"\n  end\nend\n')),(0,i.kt)("h2",{id:"router-y-cliente-usando-bridge-creado-manualmente-y-red-muy-aislada-con-dhcp-vagrantansible"},"Router y cliente usando bridge creado manualmente y red muy aislada con dhcp (vagrant/ansible)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'\n  Vagrant.configure("2") do |config|\n    config.vm.box = "debian/bullseye64"\n    config.vm.synced_folder ".", "/vagrant", disabled: true\n    \n    config.vm.define :router do |router|\n      router.vm.hostname = "router"\n      router.vm.network :public_network,\n              :dev => "br0",\n              :mode => "bridge",\n              :type => "bridge"\n      router.vm.network :private_network,\n        :libvirt__network_name => "redaislada",\n        :libvirt__dhcp_enabled => false,\n        :ip => "10.0.0.1",\n        :libvirt__forward_mode => "veryisolated"\n    end\n\n    config.vm.define :client do |client|\n      client.vm.hostname = "client"\n      client.vm.network :private_network,\n        :libvirt__network_name => "redaislada",\n        :libvirt__dhcp_enabled => false,\n        :ip => "10.0.0.2",\n        :libvirt__forward_mode => "veryisolated"\n    end\n\n#    config.vm.provision "ansible" do |ansible|\n#       ansible.playbook = "ansible/site.yaml"\n#    end\n      \n  end\n')),(0,i.kt)("h2",{id:""}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'# -*- mode: ruby -*-\n# vi: set ft=ruby :\n\nVagrant.configure("2") do |config|\n  config.vm.box = "debian/bullseye64"\n  config.vm.hostname="prueba"\n\nVagrant.configure("2") do |config|\n   config.vm.define :nodo1 do |nodo1|\n     nodo1.vm.box = "debian/bullseye64"\n     nodo1.vm.hostname = "nodo1"\n   end\n   config.vm.define :nodo2 do |nodo2|\n     nodo2.vm.box = "generic/ubuntu2010"\n     nodo2.vm.hostname = "nodo2"\n   end\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'  Vagrant.configure("2") do |config|\n    config.vm.box = "debian/bullseye64"\n    config.vm.hostname="prueba"\n    config.vm.synced_folder ".", "/vagrant", disabled: true\n    config.vm.provider :libvirt do |libvirt|\n      libvirt.memory = 1024\n      libvirt.cpus = 2\n    end\n  \n\nend\n')))}v.isMDXComponent=!0}}]);