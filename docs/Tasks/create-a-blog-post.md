---
sidebar_position: 3
---

# Taller 3: Git. Trabajando con ramas y uniones

**1.** Crea una rama que se llame primera en tu local, y ejecuta la instrucción necesaria para comprobar que se ha creado.

```
git branch -v
```

![Term](/img/IAW/taller3IAW.png)

**2.** Crea un nuevo fichero en esta rama y fusiónalo con la principal. ¿Se ha producido conflicto? Razona la respuesta.

Si se crea un nuevo fichero en la rama 'primera' y la fusionamos con la 'main' no se producen conflictos ya que ese fichero no existe en el 'main'.

![Term](/img/IAW/taller3IAW-2.png)

**3.** Borra la rama primera.

```
git branch -d primera
```

![Term](/img/IAW/taller3IAW-3.png)

**4.** Crea una rama que se llame segunda, y modifica un fichero en ella para producir un conflicto al unirlo a la rama principal. Entrega el contenido del
fichero donde se ha producido el conflicto.

![Term](/img/IAW/taller3IAW-4.png)

**5.** Soluciona el conflicto que has creado en el punto anterior y sincroniza la rama segunda en el remoto. Entrega una captura de pantalla donde se
vea que se ha creado la rama en el repositorio de GitHub.

![Term](/img/IAW/taller3IAW-5.png)
![Term](/img/IAW/taller3IAW-6.png)

