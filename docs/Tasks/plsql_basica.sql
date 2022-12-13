--Según el esquema Scott, hacer los siguientes procedimientos:

CREATE TABLE DEPT
(
 DEPTNO NUMBER(2),
 DNAME VARCHAR2(14),
 LOC VARCHAR2(13),
 CONSTRAINT PK_DEPT PRIMARY KEY (DEPTNO)
);
CREATE TABLE EMP
(
 EMPNO NUMBER(4),
 ENAME VARCHAR2(10),
 JOB VARCHAR2(9),
 MGR NUMBER(4),
 HIREDATE DATE,
 SAL NUMBER(7, 2),
 COMM NUMBER(7, 2),
 DEPTNO NUMBER(2),
 CONSTRAINT FK_DEPTNO FOREIGN KEY (DEPTNO) REFERENCES DEPT (DEPTNO),
 CONSTRAINT PK_EMP PRIMARY KEY (EMPNO)
);
INSERT INTO DEPT VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO DEPT VALUES (20, 'RESEARCH', 'DALLAS');
INSERT INTO DEPT VALUES (30, 'SALES', 'CHICAGO');
INSERT INTO DEPT VALUES (40, 'OPERATIONS', 'BOSTON');
INSERT INTO EMP VALUES(7369, 'SMITH', 'CLERK', 7902,TO_DATE('17-DIC-1980', 'DD-MON-YYYY'), 800, NULL, 20);
INSERT INTO EMP VALUES(7499, 'ALLEN', 'SALESMAN', 7698,TO_DATE('20-FEB-1981', 'DD-MON-YYYY'), 1600, 300, 30);
INSERT INTO EMP VALUES(7521, 'WARD', 'SALESMAN', 7698,TO_DATE('22-FEB-1981', 'DD-MON-YYYY'), 1250, 500, 30);
INSERT INTO EMP VALUES(7566, 'JONES', 'MANAGER', 7839,TO_DATE('2-ABR-1981', 'DD-MON-YYYY'), 2975, NULL, 20);
INSERT INTO EMP VALUES(7654, 'MARTIN', 'SALESMAN', 7698,TO_DATE('28-SEP-1981', 'DD-MON-YYYY'), 1250, 1400, 30);
INSERT INTO EMP VALUES(7698, 'BLAKE', 'MANAGER', 7839,TO_DATE('1-MAY-1981', 'DD-MON-YYYY'), 2850, NULL, 30);
INSERT INTO EMP VALUES(7782, 'CLARK', 'MANAGER', 7839,TO_DATE('9-JUN-1981', 'DD-MON-YYYY'), 2450, NULL, 10);
INSERT INTO EMP VALUES(7788, 'SCOTT', 'ANALYST', 7566,TO_DATE('09-DIC-1982', 'DD-MON-YYYY'), 3000, NULL, 20);
INSERT INTO EMP VALUES(7839, 'KING', 'PRESIDENT', NULL,TO_DATE('17-NOV-1981', 'DD-MON-YYYY'), 5000, NULL, 10);
INSERT INTO EMP VALUES(7844, 'TURNER', 'SALESMAN', 7698,TO_DATE('8-SEP-1981', 'DD-MON-YYYY'), 1500, 0, 30);
INSERT INTO EMP VALUES(7876, 'ADAMS', 'CLERK', 7788,TO_DATE('12-ENE-1983', 'DD-MON-YYYY'), 1100, NULL, 20);
INSERT INTO EMP VALUES(7900, 'JAMES', 'CLERK', 7698,TO_DATE('3-DIC-1981', 'DD-MON-YYYY'), 950, NULL, 30);
INSERT INTO EMP VALUES(7902, 'FORD', 'ANALYST', 7566,TO_DATE('3-DIC-1981', 'DD-MON-YYYY'), 3000, NULL, 20);
INSERT INTO EMP VALUES(7934, 'MILLER', 'CLERK', 7782,TO_DATE('23-ENE-1982', 'DD-MON-YYYY'), 1300, NULL, 10);



--**** Lo primero sera ejecutar el siguiente comando 'set serveroutput on', además de 'startup' para arrancar el servicio de oracle. ****

--1. Hacer un procedimiento que muestre el nombre y el salario del empleado cuyo código es 7782

create or replace procedure mostrar_sal_empleado 
as
    v_nombre emp.ename%type;
    v_sal emp.sal%type;

begin

    select ename, sal into v_nombre, v_sal
    from emp
    where empno = 7782;
    dbms_output.put_line('Nombre: ' || v_nombre);
    dbms_output.put_line('Salario: ' || v_sal);

exception
    when no_data_found then
        dbms_output.put_line('No se ha encontrado el empleado');
end;
/

exec mostrar_sal_empleado;


--2. Hacer un procedimiento que reciba como parámetro un código de empleado y devuelva su nombre

create or replace procedure mostrar_ename (p_empno emp.empno%type) 
as 
    v_nombre emp.ename%type;

begin

    select ename into v_nombre
    from emp
    where empno = p_empno;
    dbms_output.put_line('Nombre: ' || v_nombre);

exception
    when no_data_found then
        dbms_output.put_line('No se ha encontrado el empleado');
end;
/

exec mostrar_ename(7566);



--3. Hacer un procedimiento que devuelva los nombres de los tres empleados más antiguos

create or replace procedure emp_mas_antiguos
as
    cursor c_emp_antiguos is
        select ename
        from emp
        order by hiredate
        fetch first 3 rows only;

    v_nombre emp.ename%type;

begin

    dbms_output.put_line('Nombres:');
    for v_nombre in c_emp_antiguos 
    loop
        dbms_output.put_line(v_nombre.ename);
    end loop;
end;
/

exec emp_mas_antiguos;


--4. Hacer un procedimiento que reciba el nombre de un tablespace y muestre los nombres de los usuarios que lo tienen como tablespace por defecto (Vista DBA_USERS)

create or replace procedure usuarios_tablespace (p_tablespace dba_users.default_tablespace%type)
as
    cursor c_usuarios_tablespace is
        select username
        from dba_users
        where default_tablespace = p_tablespace;

    v_nombre dba_users.username%type;

begin
    
        dbms_output.put_line('Nombres para este tablespace:');
        for v_nombre in c_usuarios_tablespace 
        loop
            dbms_output.put_line(v_nombre.username);
        end loop;

end;
/

exec usuarios_tablespace('USERS');


--5. Modificar el procedimiento anterior para que haga lo mismo pero devolviendo el número de usuarios que tienen ese tablespace como tablespace por defecto. Nota: Hay que convertir el procedimiento en función
