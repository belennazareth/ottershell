---
sidebar_position: 29
---

# Auditoría

Las **auditorías** son un conjunto de técnicas que permiten recopilar información sobre el uso de un sistema informático. La auditoría de un sistema informático consiste en la recopilación de información sobre el uso de un sistema informático, con el fin de verificar que el sistema se está utilizando de forma correcta y que los usuarios están cumpliendo con las políticas de seguridad establecidas.

ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🦦                  🦦                     🦦                      🦦ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ



## 1. Activa desde SQL*Plus la auditoría de los intentos de acceso exitosos al sistema. Comprueba su funcionamiento.

Con la siguiente consulta veremos las auditorías que tenemos:

```sql
select name, value from v$parameter where name like '%audit%';
```

![Auditoria](/img/BBDD/auditoria.png)

También podemos verlo con la siguiente consulta:

```sql
select name, value from v$parameter where name like 'audit_trail';
```

![Auditoria](/img/BBDD/auditoria-2.png)

Y comprobamos que en la línea `audit_trail` tenemos el valor `db`, con esto sabremos que la auditoría está activada. Si no lo estuviera, tendríamos que activarla con la siguiente consulta:

```sql
alter system set audit_trail=db scope=spfile;
```

En caso de querer desactivarla, se haría con la siguiente consulta:

```sql
alter system set audit_trail=none scope=spfile;
```

Activamos la auditoría de los intentos de acceso exitosos al sistema con la siguiente consulta:

```sql
AUDIT CREATE SESSION WHENEVER SUCCESSFUL;
```

*Nota: importante que esté en mayúsculas.

Entramos con otro usuario y consultamos la tabla de sesiones de auditoría:

```sql
SELECT OS_USERNAME, USERNAME, EXTENDED_TIMESTAMP, ACTION_NAME FROM DBA_AUDIT_SESSION;
```

![Auditoria](/img/BBDD/auditoria-3.png)


## 2. Realiza un procedimiento en PL/SQL que te muestre los accesos fallidos junto con el motivo de los mismos, transformando el código de error almacenado en un mensaje de texto comprensible. Contempla todos los motivos posibles para que un acceso sea fallido.

Los posibles motivos que he valorado para que un acceso sea fallido son:

* `ORA-01017: invalid username/password; logon denied` -> Usuario o contraseña incorrectos.
* `ORA-28001: the password has expired` -> Contraseña caducada.
* `ORA-12154: TNS: could not resolve the connect identifier specified` -> No se ha podido resolver el identificador de conexión especificado.
* `ORA-02396: exceeded maximum idle time, please connect again` -> Se ha excedido el tiempo máximo de inactividad, por favor, conecte de nuevo.
* `ORA-28000: the account is locked` -> La cuenta está bloqueada.
* `ORA-12545: connect failed because target host or object does not exist` -> La conexión falló porque el host de destino o el objeto no existe.
* `ORA-12560: TNS: protocol adapter error` -> Error de adaptador de protocolo TNS.
* `ORA-28002: the password will expire within X days` -> La contraseña caducará dentro de X días.
* `ORA-12514: TNS: listener does not currently know of service requested in connect descriptor` -> El listener no conoce actualmente el servicio solicitado en el descriptor de conexión.
* `ORA-00604: error occurred at recursive SQL level 1` -> Se produjo un error en el nivel SQL recursivo 1.
* `ORA-28003: password verification for the specified password failed` -> La verificación de la contraseña para la contraseña especificada falló.
* `ORA-12170: TNS:Connect timeout occurred` -> Se produjo un tiempo de espera de conexión TNS.
* `ORA-28045: SSL authentication between the Oracle database server and the client failed` -> La autenticación SSL entre el servidor de base de datos Oracle y el cliente falló.
* `ORA-28040: No matching authentication protocol` -> No hay protocolo de autenticación coincidente.
* `ORA-28009: connection as SYS should be as SYSDBA or SYSOPER` -> La conexión como SYS debe ser como SYSDBA o SYSOPER.
* `ORA-01033: ORACLE initialization or shutdown in progress` -> Inicialización o apagado de ORACLE en progreso.
* `ORA-03113: end-of-file on communication channel` -> Fin de archivo en el canal de comunicación.
* `ORA-12518: TNS:listener could not hand off client connection` -> El listener no pudo transferir la conexión del cliente.
* `ORA-28056: Invalid old password` -> Contraseña antigua no válida.
* `ORA-28083: password verification for the specified password failed` -> La verificación de la contraseña para la contraseña especificada falló.
* `ORA-28011: the account will expire soon; change your password now` -> La cuenta caducará pronto; cambie su contraseña ahora.
* `ORA-00600: internal error code, arguments: [kzsamclr_f], [], [], [], [], [], [], [], [], [], [], []` -> Código de error interno, argumentos: [kzsamclr_f], [], ...
* `ORA-03135: connection lost contact` -> Se perdió el contacto de la conexión.
* `ORA-12571: TNS:packet writer failure` -> Falla del escritor de paquetes TNS.
* `ORA-01005: null password given; logon denied` -> Contraseña nula dada; acceso denegado.
* `ORA-28007: the password cannot be reused` -> La contraseña no se puede volver a usar.
* `ORA-12162: TNS:net service name is incorrectly specified` -> El nombre del servicio de red TNS está especificado incorrectamente.
* `ORA-12505: TNS:listener does not currently know of SID given in connect descriptor` -> El listener no conoce actualmente el SID dado en el descriptor de conexión.
* `ORA-12537: TNS:connection closed` -> Conexión cerrada TNS.
* `ORA-28019: maximum number of granted roles exceeded` -> Se excedió el número máximo de roles otorgados.
* `ORA-01034: ORACLE not available` -> ORACLE no disponible.
* `ORA-28079: cannot change sys/system password with SYSDBA/DBA privilege` -> No se puede cambiar la contraseña de sys/system con privilegios SYSDBA/DBA.
* `ORA-03127: no new operations allowed until the active operation ends` -> No se permiten nuevas operaciones hasta que finalice la operación activa.
* `ORA-12543: TNS:destination host unreachable` -> Host de destino TNS inalcanzable.
* `ORA-10173: Dynamic sampling time-out` -> Tiempo de espera de muestreo dinámico.
* `ORA-12504: TNS:listener was not given the SERVICE_NAME in CONNECT_DATA` -> El listener no se le dio el SERVICE_NAME en CONNECT_DATA.
* `ORA-12520: TNS:listener could not find available handler for requested type of server` -> El listener no pudo encontrar un controlador disponible para el tipo de servidor solicitado.
* `ORA-12640: Authentication adapter initialization failed` -> Falló la inicialización del adaptador de autenticación.
* `ORA-00942: table or view does not exist` -> Tabla o vista no existe.
* `ORA-01031: insufficient privileges` -> Privilegios insuficientes.
* `ORA-24315: illegal attribute type` -> Tipo de atributo ilegal.
* `ORA-12161: TNS:internal error: partial data received: tnsparse-7` -> Error interno TNS: datos parciales recibidos: tnsparse-7.

Hay otros muchos mas motivos, en los siguientes enlaces vemos todos los posibles errores que nos puede dar Oracle con sus códigos: https://www.dba-oracle.com/t_error_code_list.htm  ---  https://docs.oracle.com/en/database/oracle/oracle-database/19/errmg/toc.htm

Los que voy a incluir en mi procedimiento son los siguientes:

* `ORA-01031: insufficient privileges` -> Privilegios insuficientes.
*


## 3. Activa la auditoría de las operaciones DML realizadas por SCOTT. Comprueba su funcionamiento.


## 4. Realiza una auditoría de grano fino para almacenar información sobre la inserción de empleados con sueldo superior a 2000 en la tabla emp de scott.


## 5. Explica la diferencia entre auditar una operación by access o by session ilustrándolo con ejemplos.


## 6. Documenta las diferencias entre los valores db y db, extended del parámetro audit_trail de ORACLE. Demuéstralas poniendo un ejemplo de la información sobre una operación concreta recopilada con cada uno de ellos.


## 7. Averigua si en Postgres se pueden realizar los cuatro primeros apartados. Si es así, documenta el proceso adecuadamente.


## 8. Averigua si en MySQL se pueden realizar los apartados 1, 3 y 4. Si es así, documenta el proceso adecuadamente.


## 9. Averigua las posibilidades que ofrece MongoDB para auditar los cambios que va sufriendo un documento. Demuestra su funcionamiento.


## 10. Averigua si en MongoDB se pueden auditar los accesos a una colección concreta. Demuestra su funcionamiento.


ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🐚                  🐚                     🐚                      🐚ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
