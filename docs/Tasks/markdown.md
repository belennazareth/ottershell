---
sidebar_position: 2
---

# Introducción a Markdown
## IMPLANTACIÓN DE APLICACIONES WEB (2022-2023)


**Markdown** es un lenguaje simple que se utiliza para crear texto enriquecido (por ejemplo, HTML) con un editor de texto sin formato. Te permite darle un formato básico al texto, utilizando símbolos conocidos y accesibles en todos los teclados. El tamaño de fuente, el color y otras opciones más avanzadas no están disponibles con Markdown.

Con este editor podemos poner palabras en **negrita**, *cursiva* o también `como código` o lineas de código más largas como:


```
from flask import Flask, render_template, abort, redirect
import os
app = Flask(__name__)
films = ()	
@app.route('/')
def inicio():
    return render_template("base.html",films=films)
@app.route('/base')
def biblioteca():
    return render_template("base.html", films=films)
@app.route('/error')
def error():
    return abort(404)
port=os.environ["PORT"]
app.run('0.0.0.0',int(port), debug=True)
```

Además, se pueden añadir listas tanto ordenadas:

1. Elemento 1
2. Elemento 2
3. Elemento 3

como desordenadas:

- Elemento 1
- Elemento 2
- Elemento 3

Se pueden añadir enlaces URL:

[IMPLANTACIÓN DE APLICACIONES WEB](https://fp.josedomingo.org/iaw2223/1_introduccion/t2.html)

O también enlaces a otros ficheros dentro del repositorio:

[Fichero markdown](/docs/Tasks/intro_git.md)

Podemos crear tablas:

| Lunes | Viernes |
| ----------- | ----------- |
| IAW | HLC |
| IAW | IAW |
| EMP | IAW |
| *** | *** |
| EMP | SRI |
| SRI | SRI |
| SRI | BBDD |

E incluso añadir imágenes alojadas en otro directorio:

![Imagen](/img/IAW/taller2IAW.jpg)