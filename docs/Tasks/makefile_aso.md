---
sidebar_position: 4
---

# Compilación de un programa en C utilizando un Makefile.

## Introducción


En esta entrada se ha elegido el programa escrito en C `vim` con el que estaremos trabajando para la creación de un fichero Makefile que compile en C. 

`Make` es una utilidad que comprueba que archivos de código deben ser recompilados, para ejecutar este comando es necesario tener un fichero `Makefile` el cual indica a `Make` como debe recompilar. Se puede presentar con los siguientes nombres:

 - GNUmakefile
 - makefile
 - Makefile

Dentro del fichero `Makefile` tenemos la estructura:

```
    TARGET      :    PREREQUISITES
    (objetivo)       (prerrequisitos o dependencias)

        TAB          RECIPE
        (tabulación) (receta o acciones)
```

## Instalación del programa

Primero debemos realizar la extracción de ficheros:

```
wget http://deb.debian.org/debian/pool/main/v/vim/vim_9.0.0626.orig.tar.xz
```

Seguidamente descomprimimos el fichero `tar.xz` generado:

```
tar -Jxf vim_9.0.0626.orig.tar.xz 
```

Tras esto obtendremos un directorio con los recursos del programa:

![Term](/img/ASO/makefileASO.png)

Dentro del directorio `src` nos encontramos con los ficheros `.c` o ficheros de código fuente y `.h` o headers que definen las funciones existentes en las librerías:

```
vagrant@maquina:~/aso_mf/vim-9.0.0626$ ls src/
GvimExt               ex_getln.c       main.c            regexp_nfa.c
INSTALL               feature.h        map.c             register.c
INSTALLami.txt        fileio.c         mark.c            screen.c
INSTALLmac.txt        filepath.c       match.c           scriptfile.c
INSTALLpc.txt         findfile.c       mbyte.c           search.c
INSTALLvms.txt        float.c          memfile.c         session.c
INSTALLx.txt          fold.c           memfile_test.c    sha256.c
Make_all.mak          getchar.c        memline.c         sign.c
Make_ami.mak          globals.h        menu.c            sound.c
Make_cyg.mak          gui.c            message.c         spell.c
Make_cyg_ming.mak     gui.h            message_test.c    spell.h
Make_ming.mak         gui_beval.c      misc1.c           spellfile.c
Make_mvc.mak          gui_dwrite.cpp   misc2.c           spellsuggest.c
Make_vms.mms          gui_dwrite.h     mouse.c           strings.c
Makefile              gui_gtk.c        move.c            structs.h
README.md             gui_gtk_f.c      msvc-latest.bat   syntax.c
VisVim                gui_gtk_f.h      msvc2015.bat      tag.c
alloc.c               gui_gtk_res.xml  msvc2017.bat      tearoff.bmp
alloc.h               gui_gtk_vms.h    msvc2019.bat      tee
arabic.c              gui_gtk_x11.c    msvc2022.bat      term.c
arglist.c             gui_haiku.cc     msys32.bat        termdefs.h
ascii.h               gui_haiku.h      msys64.bat        terminal.c
auto                  gui_motif.c      mysign            termlib.c
autocmd.c             gui_photon.c     nbdebug.c         testdir
beval.c               gui_w32.c        nbdebug.h         testing.c
beval.h               gui_w32_rc.h     netbeans.c        textformat.c
bigvim.bat            gui_x11.c        normal.c          textobject.c
bigvim64.bat          gui_x11_pm.h     nv_cmdidxs.h      textprop.c
blob.c                gui_xim.c        nv_cmds.h         time.c
blowfish.c            gui_xmdlg.c      ops.c             toolbar.phi
buffer.c              gui_xmebw.c      option.c          toolcheck
bufwrite.c            gui_xmebw.h      option.h          tools.bmp
change.c              gui_xmebwp.h     optiondefs.h      typemap
channel.c             gvimtutor        optionstr.c       typval.c
charset.c             hardcopy.c       os_amiga.c        ui.c
cindent.c             hashtab.c        os_amiga.h        undo.c
clientserver.c        help.c           os_dos.h          uninstall.c
clipboard.c           highlight.c      os_haiku.h        usercmd.c
cmdexpand.c           if_cscope.c      os_haiku.rdef.in  userfunc.c
cmdhist.c             if_lua.c         os_mac.h          version.c
config.h.in           if_mzsch.c       os_mac_conv.c     version.h
config.mk.dist        if_mzsch.h       os_macosx.m       vim.h
config.mk.in          if_ole.cpp       os_mswin.c        vim.ico
configure             if_ole.h         os_qnx.c          vim.manifest
configure.ac          if_ole.idl       os_qnx.h          vim.rc
create_cmdidxs.vim    if_perl.xs       os_unix.c         vim.tlb
create_nvcmdidxs.c    if_perlsfio.c    os_unix.h         vim9.h
create_nvcmdidxs.vim  if_py_both.h     os_unixx.h        vim9cmds.c
crypt.c               if_python.c      os_vms.c          vim9compile.c
crypt_zip.c           if_python3.c     os_vms_conf.h     vim9execute.c
debugger.c            if_ruby.c        os_vms_fix.com    vim9expr.c
dict.c                if_tcl.c         os_vms_mms.c      vim9instr.c
diff.c                if_xcmdsrv.c     os_w32dll.c       vim9script.c
digraph.c             iid_ole.c        os_w32exe.c       vim9type.c
dlldata.c             indent.c         os_win32.c        vim_alert.ico
dosinst.c             insexpand.c      os_win32.h        vim_error.ico
dosinst.h             install-sh       osdef.sh          vim_icon.xbm
drawline.c            installman.sh    osdef1.h.in       vim_info.ico
drawscreen.c          installml.sh     osdef2.h.in       vim_mask.xbm
edit.c                iscygpty.c       pathdef.sh        vim_quest.ico
errors.h              iscygpty.h       po                viminfo.c
eval.c                job.c            popupmenu.c       vimrun.c
evalbuffer.c          json.c           popupwin.c        vimtutor
evalfunc.c            json_test.c      profiler.c        which.sh
evalvars.c            keymap.h         proto             winclip.c
evalwindow.c          kword_test.c     proto.h           window.c
ex_cmdidxs.h          libvterm         protodef.h        xdiff
ex_cmds.c             link.390         pty.c             xpm
ex_cmds.h             link.sh          quickfix.c        xpm_w32.c
ex_cmds2.c            list.c           regexp.c          xpm_w32.h
ex_docmd.c            locale.c         regexp.h          xxd
ex_eval.c             macros.h         regexp_bt.c
```

Este programa cuenta ya con un fichero `Makefile` por lo que no es necesario generarlo a traves de `configure`.
Al tener este paso adelantado vamos a realizar la instalación usando el comando `make` y para esto es necesario tener `build-essential`, en caso de no tenerlo realizamos su instalación:

```
sudo apt install build-essential
```

El siguiente paso es obtener las dependencias:

```
sudo apt-get build-dep vim-gtk3
```

Necesitamos que se añadan todas las librerias en una misma ruta, para eso dentro del directorio `src` ejecutamos la siguiente compilación personalizada:

```
./configure --with-local-dir=/stranger 
```

*_Nota_: Las diferentes modificaciones vienen dentro del fichero `src/INSTALL`, lo encontramos gracias a la información dada en el directorio `READMEdir` donde tenemos una serie de ficheros que `README` donde aporta información para la instalación en diferentes sistemas.

Ejecutamos `make` y finalizamos la instalación ejecutando `sudo make install`.
La ruta en la que se instala por defecto es `/usr/local/bin`, y si comprobamos donde se encuentra el binario tras la instalación vemos la salida:

```
vagrant@maquina:~/aso/vim-9.0.0626/src$ which vim
/usr/local/bin/vim
```

Si realizamos un `tree` del directorio vemos:

![Term](/img/ASO/makefileASO-2.png)

Y de este modo se ve una demostración de ejecución del binario:

![Term](/img/ASO/recording-2022-10-18-09-46-53.gif)

## Añadir al PATH

Como en el `.bashrc` ya esta establecida por defecto la ruta de ejecución para `/usr/local/bin` no es necesario indicarle una nueva.
En cambio si queremos añadir el binario en una ruta distinta al `/usr/local` debemos añadir en la compilación:

```
./configure --prefix=/[ruta] --with-local-dir=/stranger 
```

Si realizamos esta opción debemos indicar en `.bashrc` la ruta:

- Primero sacamos y copiamos cual es el PATH del espcaio de usuario:

```
echo $PATH
```

- Una vez tengamos esa línea, entramos al `.bashrc` y añadimos:

```
PATH="[$PATH]:[Ruta del binario]"

export PATH
```

## Desinstalación del programa

Para realizar la desinstalación del paquete únicamente debemos ejecutar desde `src` el comando:

```
sudo make uninstall
```

Al realizarse podemos comprobar que borró todo lo guardado en el directorio del programa:

![Term](/img/ASO/makefileASO-3.png)

*_Nota_: Si hemos usado una ruta personalizada debemos acordarnos de eliminarla del **PATH**.
