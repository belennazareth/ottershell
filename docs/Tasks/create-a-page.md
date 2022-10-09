---
sidebar_position: 1
---

# Taller 1: Introducción a git y GitHub

1. Una captura de pantalla donde se vea que has creado el repositorio.

![Repo](/static/img/IAW/taller1IAW.png)

2. El contenido del fichero .git/config para que se vea que has clonado el repositorio con la URL ssh.

![Repo](/static/img/IAW/taller1IAW-1.png)

3. La salida de la instrucción git log para ver los commits que has realizado (debe aparecer como autor tu nombre completo).

![Repo](/static/img/IAW/taller1IAW-2.png)

4. Buscar información para crear un nuevo repositorio llamado prueba2_tu_nombre. en esta ocasión, crea primero el repositorio local (usando git init)
y luego busca información para sincronizarlo y crear el repositorio remoto en GitHub. Comenta los pasos que has realizado y manda alguna prueba
de funcionamiento.

    Para realizar este apartado primero hay que crear un repositorio en GitHub, después desde la terminal se crea un repositorio en local el cual será
    vinculado al creado en GitHub.
    Para vincular los repositorios, desde línea de comando usamos lo siguiente:

    ```
    git init
    git add .
    git commit -m "<commit>"
    git remote add origin git@github.com:<nombre de usuario>/<nombre del repositorio>.git
    git push -u origin master
    ```
    Un ejemplo de su funcionamiento sería:

![Repo](/static/img/IAW/taller1IAW-3.png)

![Repo](/static/img/IAW/taller1IAW-4.png)
