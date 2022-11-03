---
sidebar_position: 9
---

# Peticiones HTTP


Con la herramienta curl podemos realizar peticiones HTTP según lo que queramos ver:

- Petición **HEAD**:

![Term](/img/SRI+HLC/taller1SRI3.png)

- Petición **GET**:

![Term](/img/SRI+HLC/taller1SRI3-1.png)

- Petición **GET** siguiendo la redirección:

![Term](/img/SRI+HLC/taller1SRI3-2.png)

- Petición **POST** con envío de información:

![Term](/img/SRI+HLC/taller1SRI3-3.png)



1. Realiza una petición para ver las cabeceras de la URL https://dit.gonzalonazareno.org. ¿Qué código de estado devuelve? ¿Qué significa? ¿En qué cabecera se encuentra la URL a la que hay que acceder para obtener el recurso?

Devuelve el código de estado _<< HTTP/1.1 301 Moved Permanently >>_, este significa que se ha realizado una redirección permanente.
Se encuentra en la cabecera location.


2. Realiza una petición GET a https://dit.gonzalonazareno.org. ¿Qué tipo de redirección devuelve?.  Realiza una petición a la URL https://dit.gonzalonazareno.org para seguir la redirección.

Devuelve una redirección _301 Moved Permanently_ 

![Term](/img/SRI+HLC/taller1SRI3-1.png)

Para realizar una petición para seguir la redirección:

    `curl -L https://dit.gonzalonazareno.org`

![Term](/img/SRI+HLC/taller1SRI3-2.png)


3. Utiliza las herramientas de un navegador web (En firefox: Herramientas para desarrolladores -> Red ) para ver las cabeceras de la URL https://dit.gonzalonazareno.org/gestiona/. ¿Cuántas peticiones se han realizado para mostrar la página?. Fíjate en la petición a https://dit.gonzalonazareno.org/gestiona/: identifica las cabeceras más importantes de las peticiones y de las respuestas.

![Term](/img/SRI+HLC/taller1SRI3-4.png)

En total se han realizado 39 peticiones para mostrar la página.
Las cabeceras más importantes son:

* 

4. Obtén la información del cuerpo de la respuesta de la URL: https://dit.gonzalonazareno.org/gestiona/.



5. Usando el método GET manda tu nombre a la página http://www2.gonzalonazareno.org/josedom/resultado.php.



6. Usando el método POST (que envía el contenido en el cuerpo) manda tu nombre a la misma página.

