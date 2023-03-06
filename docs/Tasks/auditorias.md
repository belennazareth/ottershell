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

**IMPORTANTE** Para esto hay que tener activo la auditoría de los intentos de acceso fallidos al sistema. Para ello, ejecutamos:

```sql
AUDIT CREATE SESSION WHENEVER NOT SUCCESSFUL;
```

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
* `ORA-01005: null password given; logon denied` -> Contraseña dada nula; acceso denegado.
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
* `ORA-01045: CREATE SESSION privilege logon denied` -> Acceso denegado, no tiene privilegios de CREAR SESIÓN.

Hay otros muchos mas motivos, en los siguientes enlaces vemos todos los posibles errores que nos puede dar Oracle con sus códigos: https://www.dba-oracle.com/t_error_code_list.htm  ---  https://docs.oracle.com/en/database/oracle/oracle-database/19/errmg/toc.htm

Los que voy a incluir en mi procedimiento son los siguientes:

* `ORA-01031: insufficient privileges` -> Privilegios insuficientes.
* `ORA-01017: invalid username/password; logon denied` -> Usuario o contraseña incorrectos.
* `ORA-01005: null password given; logon denied` -> Contraseña dada nula; acceso denegado.
* `ORA-28001: the password has expired` -> Contraseña caducada.
* `ORA-28009: connection as SYS should be as SYSDBA or SYSOPER` -> La conexión como SYS debe ser como SYSDBA o SYSOPER.
* `ORA-28003: password verification for the specified password failed` -> La verificación de la contraseña para la contraseña especificada falló.
* `ORA-02396: exceeded maximum idle time, please connect again` -> Se ha excedido el tiempo máximo de inactividad, por favor, conecte de nuevo.
* `ORA-01045: CREATE SESSION privilege logon denied` -> Acceso denegado, no tiene privilegios de CREAR SESIÓN.

En el primer procedimiento, tendrá como dato de entrada el código de error, se incluirán todos los errores y los mensajes que saldrán en caso de que se produzca alguno de ellos. El segundo procedimiento será una llamada al primero y se ejecutará en caso de que se produzca alguno de los errores que se han incluido en el primer procedimiento.

Los errores se encuentran almacenados en la tabla dba_audit_session, donde en la columna `returncode` se almacena el código de error, en la columna `action_name` se almacena el tipo de operación que se ha realizado y en la columna `extended_timestamp` se almacena la fecha y hora en la que se ha producido el error, luego tenemos `username` que es el usuario que ha realizado la operación:

```sql
desc dba_audit_session;

Nombre 				   ?Nulo?   Tipo
----------------------------------------- -------- ----------------------------
OS_USERNAME					        VARCHAR2(255)
USERNAME					        VARCHAR2(128)
USERHOST					        VARCHAR2(128)
TERMINAL					        VARCHAR2(255)
TIMESTAMP					        DATE
ACTION_NAME					        VARCHAR2(28)
LOGOFF_TIME					        DATE
LOGOFF_LREAD					    NUMBER
LOGOFF_PREAD					    NUMBER
LOGOFF_LWRITE					    NUMBER
LOGOFF_DLOCK					    VARCHAR2(40)
SESSIONID				 NOT NULL   NUMBER
RETURNCODE				 NOT NULL   NUMBER
CLIENT_ID					        VARCHAR2(128)
SESSION_CPU					        NUMBER
EXTENDED_TIMESTAMP				    TIMESTAMP(6) WITH TIME ZONE
PROXY_SESSIONID				        NUMBER
GLOBAL_UID					        VARCHAR2(32)
INSTANCE_NUMBER				        NUMBER
OS_PROCESS					        VARCHAR2(16)
```

```sql
CREATE OR REPLACE PROCEDURE audit_error (p_coderror DBA_AUDIT_SESSION.RETURNCODE%TYPE) AS
BEGIN

    CASE p_coderror
        WHEN 1031 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Privilegios insuficientes.');
        WHEN 1017 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Usuario o contraseña incorrectos.');
        WHEN 1005 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Contraseña dada nula; acceso denegado.');
        WHEN 1045 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Acceso denegado, no tiene privilegios de CREAR SESIÓN.');
        WHEN 28001 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Contraseña caducada.');
        WHEN 28009 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: La conexión como SYS debe ser como SYSDBA o SYSOPER.');
        WHEN 28003 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: La verificación de la contraseña para la contraseña especificada falló.');
        WHEN 2396 THEN
            DBMS_OUTPUT.PUT_LINE('ERROR: Se ha excedido el tiempo máximo de inactividad, por favor, conecte de nuevo.');
        ELSE
            DBMS_OUTPUT.PUT_LINE('ERROR: Error desconocido.');
    END CASE;
END;
/
```

Creamos el segundo procedimiento que será una llamada al primero donde mostraremos el nombre del usuario, la fecha y hora en la que se ha producido el error y el error que se ha producido usando el procedimiento anterior, por lo que tendremos que realizar un cursor para recorrer la tabla y mostrar los datos:

```sql
CREATE OR REPLACE PROCEDURE accesos_fallidos IS
    CURSOR c_audit IS
        SELECT username, returncode, substr(extended_timestamp, 1, 9) as fecha, substr(extended_timestamp, 10, 8) as hora
        FROM dba_audit_session;

    v_error c_audit%ROWTYPE;

BEGIN

    FOR v_error IN c_audit LOOP
        DBMS_OUTPUT.PUT_LINE('!!ERROR DE ACCESO!!');
        DBMS_OUTPUT.PUT_LINE('* Usuario: ' || v_error.username);
        DBMS_OUTPUT.PUT_LINE('* Fecha: ' || v_error.fecha);
        DBMS_OUTPUT.PUT_LINE('* Hora: ' || v_error.hora);
        audit_error(v_error.returncode);
        DBMS_OUTPUT.PUT_LINE('----------------------------------------');
    END LOOP;

END;
/
```

Para probar el procedimiento vamos a intentar reproducir un error de acceso. Y luego ejecutamos el procedimiento accediendo como admin:

```sql
exec accesos_fallidos;
```

![Auditoria](/img/BBDD/auditoria-4.png)
![Auditoria](/img/BBDD/auditoria-5.png)


## 3. Activa la auditoría de las operaciones DML realizadas por SCOTT. Comprueba su funcionamiento.

En caso de no tener al usuario SCOTT creado, lo creamos y le damos permiso para trabajar sobre la tabla `emp` y `dept`:

```sql
CREATE USER scott IDENTIFIED BY tiger;
GRANT SELECT, INSERT, UPDATE, DELETE ON emp TO scott;
GRANT SELECT, INSERT, UPDATE, DELETE ON dept TO scott;
```

*Nota: si no deja crear el usuario, puede ser porque ya exista o porque no nos permita aun siendo administrador debido a permisos de seguridad o similar. **No es recomendable** pero podemos ejecutar `ALTER SESSION SET "_ORACLE_SCRIPT"=true;_` para poder crear el usuario. Esto **es una mala práctica** y no se recomienda, ya que lo que hace es alterar la sesión para que no se apliquen las restricciones de seguridad, por lo que **puede ser peligroso.**

Lo siguiente será activar la auditoría, para ello tenemos que ejecutar el siguiente comando:

```sql
AUDIT INSERT TABLE, UPDATE TABLE, DELETE TABLE BY SCOTT;
```

Y comprobamos que se ha activado correctamente trabajando sobre la tabla `emp` de SCOTT:

```sql
UPDATE emp SET ename = 'JUAN' WHERE empno = 7844;
```

![Auditoria](/img/BBDD/auditoria-6.png)


```sql
DELETE FROM emp WHERE sal <= 950;
```

![Auditoria](/img/BBDD/auditoria-7.png)


```sql
INSERT INTO EMP VALUES(7900, 'JAMES', 'CLERK', 7698,TO_DATE('3-DIC-1981', 'DD-MON-YYYY'), 950, NULL, 30);
```

![Auditoria](/img/BBDD/auditoria-8.png)


Para poder visualizar la recolección de datos en la auditoria se consulta la tabla `DBA_AUDIT_OBJECT`, esta tabla muestra registros de auditoría para cada objeto de la base de datos que se ha auditado, en este enlace vemos más información sobre la misma: https://docs.oracle.com/cd/B13789_01/server.101/b10755/statviews_2047.htm

Vamos a consultar el nombre de usuario, el nombre del objeto, el tipo de operación y la fecha y hora de la operación:

```sql
SELECT USERNAME, OBJ_NAME, ACTION_NAME, EXTENDED_TIMESTAMP FROM DBA_AUDIT_OBJECT;
```


## 4. Realiza una auditoría de grano fino para almacenar información sobre la inserción de empleados con sueldo superior a 2000 en la tabla emp de scott.


## 5. Explica la diferencia entre auditar una operación by access o by session ilustrándolo con ejemplos.


## 6. Documenta las diferencias entre los valores db y db, extended del parámetro audit_trail de ORACLE. Demuéstralas poniendo un ejemplo de la información sobre una operación concreta recopilada con cada uno de ellos.


## 7. Averigua si en Postgres se pueden realizar los cuatro primeros apartados. Si es así, documenta el proceso adecuadamente.


## 8. Averigua si en MySQL se pueden realizar los apartados 1, 3 y 4. Si es así, documenta el proceso adecuadamente.


## 9. Averigua las posibilidades que ofrece MongoDB para auditar los cambios que va sufriendo un documento. Demuestra su funcionamiento.


## 10. Averigua si en MongoDB se pueden auditar los accesos a una colección concreta. Demuestra su funcionamiento.


ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ🐚                  🐚                     🐚                      🐚ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
