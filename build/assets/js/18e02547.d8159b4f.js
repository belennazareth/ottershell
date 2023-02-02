"use strict";(self.webpackChunkotter_shell=self.webpackChunkotter_shell||[]).push([[2821],{3905:(e,o,r)=>{r.d(o,{Zo:()=>c,kt:()=>u});var n=r(7294);function t(e,o,r){return o in e?Object.defineProperty(e,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[o]=r,e}function a(e,o){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?a(Object(r),!0).forEach((function(o){t(e,o,r[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))}))}return e}function i(e,o){if(null==e)return{};var r,n,t=function(e,o){if(null==e)return{};var r,n,t={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],o.indexOf(r)>=0||(t[r]=e[r]);return t}(e,o);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],o.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var s=n.createContext({}),m=function(e){var o=n.useContext(s),r=o;return e&&(r="function"==typeof e?e(o):l(l({},o),e)),r},c=function(e){var o=m(e.components);return n.createElement(s.Provider,{value:o},e.children)},d={inlineCode:"code",wrapper:function(e){var o=e.children;return n.createElement(n.Fragment,{},o)}},p=n.forwardRef((function(e,o){var r=e.components,t=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=m(r),u=t,v=p["".concat(s,".").concat(u)]||p[u]||d[u]||a;return r?n.createElement(v,l(l({ref:o},c),{},{components:r})):n.createElement(v,l({ref:o},c))}));function u(e,o){var r=arguments,t=o&&o.mdxType;if("string"==typeof e||t){var a=r.length,l=new Array(a);l[0]=p;var i={};for(var s in o)hasOwnProperty.call(o,s)&&(i[s]=o[s]);i.originalType=e,i.mdxType="string"==typeof e?e:t,l[1]=i;for(var m=2;m<a;m++)l[m]=r[m];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},141:(e,o,r)=>{r.r(o),r.d(o,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>m});var n=r(7462),t=(r(7294),r(3905));const a={sidebar_position:26},l="Gesti\xf3n de pool de almacenamiento l\xf3gico en KVM/libvirt",i={unversionedId:"Tasks/almacenamiento_kvm_libvirt",id:"Tasks/almacenamiento_kvm_libvirt",title:"Gesti\xf3n de pool de almacenamiento l\xf3gico en KVM/libvirt",description:"1.- Crea con virsh un nuevo pool de almacenamiento de tipo l\xf3gico. Para ello, lo m\xe1s f\xe1cil, es tener un grupo de vol\xfamenes con espacio libre.",source:"@site/docs/Tasks/almacenamiento_kvm_libvirt.md",sourceDirName:"Tasks",slug:"/Tasks/almacenamiento_kvm_libvirt",permalink:"/docs/Tasks/almacenamiento_kvm_libvirt",draft:!1,editUrl:"https://github.com/belennazareth/ottershell/blob/main/docs/Tasks/almacenamiento_kvm_libvirt.md",tags:[],version:"current",sidebarPosition:26,frontMatter:{sidebar_position:26},sidebar:"tutorialSidebar",previous:{title:"Redes Privadas Virtuales",permalink:"/docs/Tasks/vpn"},next:{title:"Protocolo DHCP",permalink:"/docs/Tasks/dhcp"}},s={},m=[{value:"Entrega",id:"entrega",level:2}],c={toc:m};function d(e){let{components:o,...a}=e;return(0,t.kt)("wrapper",(0,n.Z)({},c,a,{components:o,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"gesti\xf3n-de-pool-de-almacenamiento-l\xf3gico-en-kvmlibvirt"},"Gesti\xf3n de pool de almacenamiento l\xf3gico en KVM/libvirt"),(0,t.kt)("p",null,"1.- Crea con virsh un nuevo pool de almacenamiento de tipo l\xf3gico. Para ello, lo m\xe1s f\xe1cil, es tener un grupo de vol\xfamenes con espacio libre."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system pool-define-as --name pool1 --type logical --source-name /dev/vg01\n\nvirsh -c qemu:///system pool-start pool1\nvirsh -c qemu:///system v\n")),(0,t.kt)("p",null,"*Nota: ",(0,t.kt)("strong",{parentName:"p"},"IMPORTANTE")," primero hay que crearlo, luego definirlo y por \xfaltimo ativarlo."),(0,t.kt)("p",null,"2.- Crea un volumen en ese pool de almacenamiento. Comprueba que se ha creado un volumen l\xf3gico nuevo en el grupo de vol\xfamenes."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system vol-create-as pool1 vol_mv1 10G\n\nsudo lvs\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"lvs",src:r(7677).Z,width:"871",height:"170"})),(0,t.kt)("p",null,"3.- Usa virt-install para crear una m\xe1quina virtual cuyo disco corresponda al volumen que has creado anteriormente."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virt-install --connect qemu:///system \\\n             --virt-type kvm \\\n             --name mv1 \\\n             --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso \\\n             --os-variant debian10 \\\n             --disk=/dev/vg01/vol_mv1 \\\n             --memory 1024 \\\n             --vcpus 1\n")),(0,t.kt)("p",null,"*Nota: en ",(0,t.kt)("strong",{parentName:"p"},"ZSH")," no funciona el comando con los espacios, por lo que hay que usar el comando con los par\xe1metros en una sola l\xednea."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virt-install --connect qemu:///system --virt-type kvm --name mv1 --cdrom ~/Escritorio/ISOS/debian-11.5.0-amd64-netinst.iso --os-variant debian10 --disk=/dev/vg01/vol_mv1 --memory 1024 --vcpus 1\n")),(0,t.kt)("p",null,"4.- Una vez que la m\xe1quina este funcionando, crea un nuevo volumen y a\xf1\xe1delo a la m\xe1quina."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system vol-create-as pool1 vol_mv2 2G\nvirsh -c qemu:///system attach-disk mv1 /dev/vg01/vol_mv2 vdb --persistent\n")),(0,t.kt)("p",null,"5.- Apaga la m\xe1quina, y siguiendo el art\xedculo ",(0,t.kt)("a",{parentName:"p",href:"https://albertomolina.wordpress.com/2009/12/14/acceder-a-una-imagen-de-disco-kvm-ubicada-en-un-volumen-logico/"},"Acceder a una imagen de disco KVM ubicada en un volumen l\xf3gico")," monta la partici\xf3n del disco de la m\xe1quina en tu anfitri\xf3n para acceder a sistema de archivos."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system shutdown mv1\n")),(0,t.kt)("p",null,"Para montar la partici\xf3n del disco de la m\xe1quina en tu anfitri\xf3n para acceder a sistema de archivos:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo kpartx -va /dev/vg01/vol_mv1\nls -l /dev/mapper\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"KP",src:r(5918).Z,width:"686",height:"232"}),"\n",(0,t.kt)("img",{alt:"KP",src:r(1294).Z,width:"706",height:"304"})),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"mount /dev/mapper/vg01-vol_mv1p1 /mnt_vg/ #como root\nls -l /mnt_vg/\n")),(0,t.kt)("p",null,"Con salida:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"root@ThousandSunny:~# mount /dev/mapper/vg01-vol_mv1p1 /mnt_vg/\nroot@ThousandSunny:~# ls -l /mnt_vg/\ntotal 76\n\nlrwxrwxrwx  1 root root     7 feb  2 10:20 bin -> usr/bin\ndrwxr-xr-x  3 root root  4096 feb  2 10:25 boot\ndrwxr-xr-x  4 root root  4096 feb  2 10:20 dev\ndrwxr-xr-x 68 root root  4096 feb  2 10:26 etc\ndrwxr-xr-x  3 root root  4096 feb  2 10:25 home\nlrwxrwxrwx  1 root root    31 feb  2 10:22 initrd.img -> boot/initrd.img-5.10.0-21-amd64\nlrwxrwxrwx  1 root root    31 feb  2 10:20 initrd.img.old -> boot/initrd.img-5.10.0-18-amd64\nlrwxrwxrwx  1 root root     7 feb  2 10:20 lib -> usr/lib\nlrwxrwxrwx  1 root root     9 feb  2 10:20 lib32 -> usr/lib32\nlrwxrwxrwx  1 root root     9 feb  2 10:20 lib64 -> usr/lib64\nlrwxrwxrwx  1 root root    10 feb  2 10:20 libx32 -> usr/libx32\ndrwx------  2 root root 16384 feb  2 10:20 lost+found\ndrwxr-xr-x  3 root root  4096 feb  2 10:20 media\ndrwxr-xr-x  2 root root  4096 feb  2 10:20 mnt\ndrwxr-xr-x  2 root root  4096 feb  2 10:20 opt\ndrwxr-xr-x  2 root root  4096 sep  3 14:10 proc\ndrwx------  2 root root  4096 feb  2 10:20 root\ndrwxr-xr-x  2 root root  4096 feb  2 10:26 run\nlrwxrwxrwx  1 root root     8 feb  2 10:20 sbin -> usr/sbin\ndrwxr-xr-x  2 root root  4096 feb  2 10:20 srv\ndrwxr-xr-x  2 root root  4096 sep  3 14:10 sys\ndrwxrwxrwt  7 root root  4096 feb  2 10:36 tmp\ndrwxr-xr-x 14 root root  4096 feb  2 10:20 usr\ndrwxr-xr-x 11 root root  4096 feb  2 10:20 var\nlrwxrwxrwx  1 root root    28 feb  2 10:22 vmlinuz -> boot/vmlinuz-5.10.0-21-amd64\nlrwxrwxrwx  1 root root    28 feb  2 10:20 vmlinuz.old -> boot/vmlinuz-5.10.0-18-amd64\n")),(0,t.kt)("h2",{id:"entrega"},"Entrega"),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"1. Instrucci\xf3n para crear el pool de almacenamiento.")),(0,t.kt)("p",null,"Para crear el pool de almacenamiento se ha usado el comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system pool-define-as --name pool1 --type logical --source-name /dev/vg01\n")),(0,t.kt)("p",null,"Despu\xe9s de crear el pool, se ha iniciado con el comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system pool-start pool1\n")),(0,t.kt)("p",null,"Y se ha comprobado que se ha creado correctamente con el comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system pool-list\n")),(0,t.kt)("p",null,"Obteniendo como salida algo similar a:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"nazare@ThousandSunny:~$ virsh -c qemu:///system pool-list\n\n Nombre        Estado   Inicio autom\xe1tico\n-------------------------------------------\n default       activo   si\n pool1         activo   no\n")),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"2. Instrucci\xf3n para crear el volumen.")),(0,t.kt)("p",null,"Para crear el volumen se ha usado el comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"virsh -c qemu:///system vol-create-as pool1 vol_mv1 10G\n")),(0,t.kt)("p",null,"Y se ha comprobado que se ha creado correctamente con el comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo lvs\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"KP",src:r(7677).Z,width:"871",height:"170"})),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"3. Una vez instalado el sistema, la configuraci\xf3n XML de la m\xe1quina donde se ve el almacenamiento de la misma (se deben ver los dos discos).")),(0,t.kt)("p",null,"En la siguiente imagen se ven ambos discos de la m\xe1quina virtual, y como uno aparece como ",(0,t.kt)("inlineCode",{parentName:"p"},'<driver name="qemu" type="raw" cache="none" io="native"/>')," y el otro como ",(0,t.kt)("inlineCode",{parentName:"p"},'<driver name="qemu" type="qcow2"/>'),":"),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"KP",src:r(560).Z,width:"746",height:"250"})),(0,t.kt)("p",null,"El c\xf3digo XML de la m\xe1quina virtual es el siguiente:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},'<domain type="kvm">\n  <name>mv1</name>\n  <uuid>0bc92500-5d44-4db7-9bc4-6c217825876d</uuid>\n  <metadata>\n    <libosinfo:libosinfo xmlns:libosinfo="http://libosinfo.org/xmlns/libvirt/domain/1.0">\n      <libosinfo:os id="http://debian.org/debian/10"/>\n    </libosinfo:libosinfo>\n  </metadata>\n  <memory unit="KiB">1048576</memory>\n  <currentMemory unit="KiB">1048576</currentMemory>\n  <vcpu placement="static">1</vcpu>\n  <os>\n    <type arch="x86_64" machine="pc-q35-5.2">hvm</type>\n    <boot dev="hd"/>\n  </os>\n  <features>\n    <acpi/>\n    <apic/>\n    <vmport state="off"/>\n  </features>\n  <cpu mode="host-model" check="partial"/>\n  <clock offset="utc">\n    <timer name="rtc" tickpolicy="catchup"/>\n    <timer name="pit" tickpolicy="delay"/>\n    <timer name="hpet" present="no"/>\n  </clock>\n  <on_poweroff>destroy</on_poweroff>\n  <on_reboot>restart</on_reboot>\n  <on_crash>destroy</on_crash>\n  <pm>\n    <suspend-to-mem enabled="no"/>\n    <suspend-to-disk enabled="no"/>\n  </pm>\n  <devices>\n    <emulator>/usr/bin/qemu-system-x86_64</emulator>\n    <disk type="block" device="disk">                                                \x3c!-- \ud83d\udc22 Aqu\xed se ve el volumen creado con virsh dentro del pool1 --\x3e\n      <driver name="qemu" type="raw" cache="none" io="native"/>\n      <source dev="/dev/vg01/vol_mv1"/>\n      <target dev="vda" bus="virtio"/>\n      <address type="pci" domain="0x0000" bus="0x04" slot="0x00" function="0x0"/>\n    </disk>                                                                          \x3c!-- \ud83d\udc22 --\x3e\n    <disk type="file" device="disk">                                                 \x3c!-- \ud83e\udd90 Aqu\xed se ve el volumen creado con virt-manager --\x3e\n      <driver name="qemu" type="qcow2"/>\n      <source file="/var/lib/libvirt/images/mv1.qcow2"/>\n      <target dev="vdb" bus="virtio"/>\n      <address type="pci" domain="0x0000" bus="0x08" slot="0x00" function="0x0"/>\n    </disk>                                                                          \x3c!-- \ud83e\udd90 --\x3e\n\n    ...\n\n  </devices>\n</domain>\n')),(0,t.kt)("p",null,(0,t.kt)("strong",{parentName:"p"},"4. Las instrucciones ejecutadas para montar la partici\xf3n del disco, y la lista de ficheros del sistema de archivos.")),(0,t.kt)("p",null,"Para montar la partici\xf3n del disco de la m\xe1quina en tu anfitri\xf3n para acceder a sistema de archivos:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo kpartx -va /dev/vg01/vol_mv1\nls -l /dev/mapper\n")),(0,t.kt)("p",null,(0,t.kt)("img",{alt:"KP",src:r(5918).Z,width:"686",height:"232"}),"\n",(0,t.kt)("img",{alt:"KP",src:r(1294).Z,width:"706",height:"304"})),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"mount /dev/mapper/vg01-vol_mv1p1 /mnt_vg/ #como root\nls -l /mnt_vg/\n")),(0,t.kt)("p",null,"Con salida:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"root@ThousandSunny:~# mount /dev/mapper/vg01-vol_mv1p1 /mnt_vg/\nroot@ThousandSunny:~# ls -l /mnt_vg/\ntotal 76\n\nlrwxrwxrwx  1 root root     7 feb  2 10:20 bin -> usr/bin\ndrwxr-xr-x  3 root root  4096 feb  2 10:25 boot\ndrwxr-xr-x  4 root root  4096 feb  2 10:20 dev\ndrwxr-xr-x 68 root root  4096 feb  2 10:26 etc\ndrwxr-xr-x  3 root root  4096 feb  2 10:25 home\nlrwxrwxrwx  1 root root    31 feb  2 10:22 initrd.img -> boot/initrd.img-5.10.0-21-amd64\nlrwxrwxrwx  1 root root    31 feb  2 10:20 initrd.img.old -> boot/initrd.img-5.10.0-18-amd64\nlrwxrwxrwx  1 root root     7 feb  2 10:20 lib -> usr/lib\nlrwxrwxrwx  1 root root     9 feb  2 10:20 lib32 -> usr/lib32\nlrwxrwxrwx  1 root root     9 feb  2 10:20 lib64 -> usr/lib64\nlrwxrwxrwx  1 root root    10 feb  2 10:20 libx32 -> usr/libx32\ndrwx------  2 root root 16384 feb  2 10:20 lost+found\ndrwxr-xr-x  3 root root  4096 feb  2 10:20 media\ndrwxr-xr-x  2 root root  4096 feb  2 10:20 mnt\ndrwxr-xr-x  2 root root  4096 feb  2 10:20 opt\ndrwxr-xr-x  2 root root  4096 sep  3 14:10 proc\ndrwx------  2 root root  4096 feb  2 10:20 root\ndrwxr-xr-x  2 root root  4096 feb  2 10:26 run\nlrwxrwxrwx  1 root root     8 feb  2 10:20 sbin -> usr/sbin\ndrwxr-xr-x  2 root root  4096 feb  2 10:20 srv\ndrwxr-xr-x  2 root root  4096 sep  3 14:10 sys\ndrwxrwxrwt  7 root root  4096 feb  2 10:36 tmp\ndrwxr-xr-x 14 root root  4096 feb  2 10:20 usr\ndrwxr-xr-x 11 root root  4096 feb  2 10:20 var\nlrwxrwxrwx  1 root root    28 feb  2 10:22 vmlinuz -> boot/vmlinuz-5.10.0-21-amd64\nlrwxrwxrwx  1 root root    28 feb  2 10:20 vmlinuz.old -> boot/vmlinuz-5.10.0-18-amd64\n")))}d.isMDXComponent=!0},5918:(e,o,r)=>{r.d(o,{Z:()=>n});const n=r.p+"assets/images/taller1SRI7-2-abad413f3a5020b28094fd53ab151ab5.png"},1294:(e,o,r)=>{r.d(o,{Z:()=>n});const n=r.p+"assets/images/taller1SRI7-3-992563b4ecb44ccf485c36d94ac123e0.png"},560:(e,o,r)=>{r.d(o,{Z:()=>n});const n=r.p+"assets/images/taller1SRI7-4-1dcc4f42ee08cf8ad19e67f2ddf25ab8.png"},7677:(e,o,r)=>{r.d(o,{Z:()=>n});const n=r.p+"assets/images/taller1SRI7-a6f5750e7d6cb819140216f923da4bfa.png"}}]);