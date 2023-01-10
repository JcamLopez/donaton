create database reforestacion;

/********** CREATE TABLES **********/

CREATE TABLE persona (
    id_persona SERIAL PRIMARY KEY,
    fk_nacionalidad int  null,       
    nombre_completo VARCHAR(100) not null,
    descripcion text not null
);

CREATE TABLE imagen (
    id_imagen SERIAL PRIMARY KEY,
    url text  null
);

CREATE TABLE pais (
    id_pais SERIAL PRIMARY KEY,
    nacionalidad varchar(100) not null,
    pais varchar(100) not null
);

CREATE TABLE permiso (
    id_permiso SERIAL PRIMARY KEY,
    permiso varchar(100) not null,
    ruta varchar(100) not null,
    descripcion text not null
);

CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    rol varchar(100) not null
);


CREATE TABLE rol_tiene_permiso (
    fk_rol int not null,
    fk_permiso int not null,
    estado int not null
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    fk_rol int not null,
    fk_persona int not null,
    fk_imagen int  null,
    fk_tipo_cuenta int not null,
    usuario varchar(100) not null,
    clave varchar(100) not null,
    estado int (1) not null
);

CREATE TABLE tipo_cuenta (
    id_tipo_cuenta SERIAL PRIMARY KEY,
    tipo varchar(100) not null,
    descripcion text not null
);


CREATE TABLE telefono (
    id_telefono SERIAL PRIMARY KEY,
    fk_persona int not null,
    telefono numeric(13)not null
);

CREATE TABLE direccion (
    id_direccion SERIAL PRIMARY KEY,
    fk_persona int  null,
    fk_barrio int null,
    direccion varchar(100) not null
);

CREATE TABLE barrio (
    id_barrio SERIAL PRIMARY KEY,
    barrio varchar(100) not null
);

CREATE TABLE dona (
    id_dona SERIAL PRIMARY KEY,
    fk_usuario int not null,
    estado int not null,
    fecha date not null
);

CREATE TABLE proyecto (
    id_proyecto SERIAL PRIMARY KEY,
    responsable int not null,
    fk_usuario int not null,
    fk_img int not null,
    proyecto  varchar(100) not null,
    descripcion text not null
);

/* CREATE TABLE publica (
    id_publica SERIAL PRIMARY KEY,
    fk_usuario int not null,
    titulo varchar(100) not null,
    descripcion varchar(100) not null,
    fecha date not null 
); */


/* CREATE TABLE tipo_arbol (
    id_tipo_arbol SERIAL PRIMARY KEY,
    tipo varchar(100) null,
    descripcion text not null
); */

/* CREATE TABLE usuario_dona_arbol (
    fk_usuario int not null,
    fk_arbol int not null,
    cantidad_dono float not null,
    cantidad_arboles int not null,
    fecha date not null,
    SERIAL PRIMARY KEY(fk_usuario,fk_arbol)
); */


/* CREATE TABLE arbol (
    id_arbol SERIAL PRIMARY KEY,
    fk_usuario_admin int not null,
    fk_tipo_arbol int not null,
    nombre varchar(100) not null,
    precio float not null
); */


create table auditoria(
id_auditoria serial not null,
nombre_tabla varchar(50) not null,
usuario varchar(50),
operacion varchar(1) not null,
valor_anterior text,
fecha timestamp without time zone not null,
constraint id_auditoria primary key(id_auditoria)
)
with(oids=false)

CREATE OR REPLACE FUNCTION auditar() RETURNS trigger AS 
$$
BEGIN
    IF(TG_OP='DELETE') THEN
    INSERT INTO auditoria(nombre_tabla,usuario,operacion,valor_anterior,fecha)VALUES(TG_TABLE_NAME,USER,'D',OLD,now());
    RETURN OLD;
END IF;
RETURN NULL;
END;
$$ 
language plpgsql;

CREATE TRIGGER guardar_datos AFTER DELETE ON PERSONA FOR EACH ROW EXECUTE PROCEDURE auditar();
CREATE TRIGGER guardar_datos AFTER DELETE ON PROYECTO FOR EACH ROW EXECUTE PROCEDURE auditar();
CREATE TRIGGER guardar_datos AFTER DELETE ON IMAGEN FOR EACH ROW EXECUTE PROCEDURE auditar();


/********** ADD FK **********/

ALTER TABLE persona
ADD FOREIGN KEY(fk_nacionalidad) REFERENCES pais(id_pais);

ALTER TABLE telefono
ADD FOREIGN KEY(fk_persona) REFERENCES persona(id_persona);

ALTER TABLE direccion
ADD FOREIGN KEY(fk_persona) REFERENCES persona(id_persona);

ALTER TABLE direccion
ADD FOREIGN KEY(fk_barrio) REFERENCES barrio(id_barrio);

ALTER TABLE usuario
ADD FOREIGN KEY(fk_rol) REFERENCES rol(id_rol);

ALTER TABLE usuario
ADD FOREIGN KEY(fk_persona) REFERENCES persona(id_persona);

ALTER TABLE usuario
ADD FOREIGN KEY(fk_imagen) REFERENCES imagen(id_imagen);

ALTER TABLE usuario
ADD FOREIGN KEY(fk_tipo_cuenta) REFERENCES tipo_cuenta(id_tipo_cuenta);

ALTER TABLE dona
ADD FOREIGN KEY(fk_usuario) REFERENCES usuario(id_usuario);

ALTER TABLE proyecto
ADD FOREIGN KEY(fk_img) REFERENCES imagen(id_imagen);



/********** INSERTS **********/

INSERT INTO rol (rol) VALUES('admin'),
('usuario');


INSERT INTO tipo_cuenta (tipo,descripcion) VALUES('Empresarial','Es una cuenta empresarial, que permite obtener informacion de la empresa dondante. Esto se hace con el fin de generar reconococimiento a la empresa una vez apoye la reforestacion por medio de las donaciones'),
('Personal','Es una cuenta personal, que permite obtener informacion de la persona dondante. Esto se hace con el fin de generar reconococimiento a la persona una vez apoye la reforestacion por medio de las donaciones');

INSERT INTO permiso (permiso,ruta,descripcion) VALUES 
('Mi perfil','/mi-perfil','El usuario podra ver los datos de su perfil'),
('Panel Admin','/panel-admin','El admin podra realizar el crud de los usuarios');

INSERT INTO rol_tiene_permiso (fk_rol,fk_permiso,estado) VALUES 
(2,1,1),
(1,1,1),
(1,2,1);


INSERT INTO pais (nacionalidad,pais) VALUES
('Venezolana','Venezuela'),
('Afgana','Afganistán'),
('Albanesa','Albania'),
('Alemana','Alemania'),
('Alto volteña','Alto volta'),
('Andorrana','Andorra'),
('Angoleña','Angola'),
('Argelina','Argelia'),
('Argentina','Argentina'),
('Australiana','Australia'),
('Austriaca','Austria'),
('Bahamesa','Bahamas'),
('Bahreina','Bahrein'),
('Bangladesha','Bangladesh'),
('Barbadesa','Barbados'),
('Belga','Belgica'),
('Beliceña','Belice'),
('Bermudesa','Bermudas'),
('Birmana','Birmania'),
('Boliviana','Bolivia'),
('Botswanesa','Botswana'),
('Brasileña','Brasil'),
('Bulgara','Bulgaria'),
('Burundesa','Burundi'),
('Butana','Butan'),
('Camboyana','Khemer Rep de Camboya '),
('Camerunesa','Camerun'),
('Canadiense','Canada'),
('Centroafricana','Rep Centroafricana'),
('Chadeña','Chad'),
('Checoslovaca','Rep. Checa'),
('Chilena','Chile'),
('China','China'),
('China','Taiwan'),
('Chipriota','Chipre'),
('Colombiana','Colombia'),
('Congoleña','Congo'),
('Costarricense','Costa Rica'),
('Cubana','Cuba'),
('Dahoneya','Dahoney'),
('Danes','Dinamarca'),
('Dominicana','Rep. Dominicana'),
('Ecuatoriana','Ecuador'),
('Egipcia','Egipto'),
('Emirata','Emiratos Arabes Udo.'),
('Escosesa','Escocia'),
('Eslovaca','Rep. Eslovaca'),
('Española','España'),
('Estona','Estonia'),
('Etiope','Etiopia'),
('Fijena','Fiji'),
('Filipina','Filipinas'),
('Finlandesa','Finlandia'),
('Francesa','Francia'),
('Gabiana','Gambia'),
('Gabona','Gabon'),
('Galesa','Gales'),
('Ghanesa','Ghana'),
('Granadeña','Granada'),
('Griega','Grecia'),
('Guatemalteca','Guatemala'),
('Guinesa Ecuatoriana','Guinea Ecuatorial'),
('Guinesa','Guinea'),
('Guyanesa','Guyana'),
('Haitiana','Haiti'),
('Holandesa','Holanda'),
('Hondureña','Honduras'),
('Hungara','Hungria'),
('India','India'),
('Indonesa','Indonesia'),
('Inglesa','Inglaterra'),
('Iraki','Irak'),
('Irani','Iran'),
('Irlandesa','Irlanda'),
('Islandesa','Islandia'),
('Israeli','Israel'),
('Italiana','Italia'),
('Jamaiquina','Jamaica'),
('Japonesa','Japon'),
('Jordana','Jordania'),
('Katensa','Katar'),
('Keniana','Kenia'),
('Kuwaiti','Kwait'),
('Laosiana','Laos'),
('Leonesa','Sierra leona'),
('Lesothensa','Lesotho'),
('Letonesa','Letonia'),
('Libanesa','Libano'),
('Liberiana','Liberia'),
('Libeña','Libia'),
('Liechtenstein','Liechtenstein'),
('Lituana','Lituania'),
('Luxemburgo','Luxemburgo'),
('Madagascar','Madagascar'),
('Malaca','Fede. de Malasia'),
('Malawi','Malawi'),
('Maldivas','Maldivas'),
('Mali','Mali'),
('Maltesa','Malta'),
('Marfilesa','Costa de Marfil'),
('Marroqui','Marruecos'),
('Mauricio','Mauricio'),
('Mauritana','Mauritania'),
('Mexicana','México'),
('Monaco','Monaco'),
('Mongolesa','Mongolia'),
('Nauru','Nauru'),
('Neozelandesa','Nueva Zelandia'),
('Nepalesa','Nepal'),
('Nicaraguense','Nicaragua'),
('Nigerana','Niger'),
('Nigeriana','Nigeria'),
('Norcoreana','Corea del Norte'),
('Norirlandesa','Irlanda del norte'),
('Norteamericana','Estados unidos'),
('Noruega','Noruega'),
('Omana','Oman'),
('Pakistani','Pakistan'),
('Panameña','Panama'),
('Paraguaya','Paraguay'),
('Peruana','Peru'),
('Polaca','Polonia'),
('Portoriqueña','Puerto Rico'),
('Portuguesa','Portugal'),
('Rhodesiana','Rhodesia'),
('Ruanda','Ruanda'),
('Rumana','Rumania'),
('Rusa','Russia'),
('Salvadoreña','El Salvador'),
('Samoa Occidental','Samoa Occidental'),
('San marino','San Marino'),
('Saudi','Arabia Saudita'),
('Senegalesa','Senegal'),
('Sikkim','Sikkim'),
('Singapur','Singapur'),
('Siria','Siria'),
('Somalia','Somalia'),
('Sovietica','Union Sovietica'),
('Sri Lanka','Sri Lanka (Ceylan) '),
('Suazilandesa','Suazilandia'),
('Sudafricana','Sudafrica'),
('Sudanesa','Sudan'),
('Sueca','Suecia'),
('Suiza','Suiza'),
('Surcoreana','Corea del Sur'),
('Tailandesa','Tailandia'),
('Tanzana','Tanzania'),
('Tonga','Tonga'),
('Tongo','Tongo'),
('Trinidad y Tobago','Trinidad y Tobago'),
('Tunecina','Tunez'),
('Turca','Turquia'),
('Ugandesa','Uganda'),
('Uruguaya','Uruguay'),
('Vaticano','Vaticano'),
('Vietnamita','Vietnam'),
('Yemen Rep Arabe','Yemen Rep. Arabe'),
('Yemen Rep Dem','Yemen Rep. Dem'),
('Yugoslava','Yugoslavia'),
('Zaire','Zaire');


/* PERSONA */

INSERT INTO persona (id_persona, fk_nacionalidad, nombre_completo, descripcion)
            VALUES(1, 36, 'Stivenson Zapata Ramirez', 'Administrador DonaTree');

INSERT INTO persona (id_persona, fk_nacionalidad, nombre_completo, descripcion)
            VALUES(2, 36, 'Juan Camilo Lopez', 'Administrador DonaTree');

INSERT INTO persona (id_persona, fk_nacionalidad, nombre_completo, descripcion)
            VALUES(3, 36, 'Pepe Cadena', 'Usuario DonaTree');

INSERT INTO persona (id_persona, fk_nacionalidad, nombre_completo, descripcion)
            VALUES(4, 36, 'Sofia Gomez', 'Usuario encargado de un proyecto vinculado a DonaTree');

INSERT INTO persona (id_persona, fk_nacionalidad, nombre_completo, descripcion)
            VALUES(5, 36, 'Juan Pablo Perez', 'Usuario DonaTree');

INSERT INTO persona (id_persona, fk_nacionalidad, nombre_completo, descripcion)
            VALUES(6, 36, 'Ana Maria Torres', 'Usuario encargado de un proyecto vinculado a DonaTree');


/* USUARIO */

INSERT INTO usuario (id_usuario, fk_rol, fk_persona, fk_imagen, fk_tipo_cuenta, usuario, clave)
            VALUES(1, 1, 1, null, 2, 'szr@gmail.com', '123');

INSERT INTO usuario (id_usuario, fk_rol, fk_persona, fk_imagen, fk_tipo_cuenta, usuario, clave)
            VALUES(2, 1, 1, null, 2, 'jcl@gmail.com', '123');

INSERT INTO usuario (id_usuario, fk_rol, fk_persona, fk_imagen, fk_tipo_cuenta, usuario, clave)
            VALUES(3, 2, 3, null, 1, 'pc@gmail.com', '123');

INSERT INTO usuario (id_usuario, fk_rol, fk_persona, fk_imagen, fk_tipo_cuenta, usuario, clave)
            VALUES(4, 2, 4, null, 1, 'sg@gmail.com', '123');

INSERT INTO usuario (id_usuario, fk_rol, fk_persona, fk_imagen, fk_tipo_cuenta, usuario, clave)
            VALUES(5, 2, 5, null, 2, 'jpp@gmail.com', '123');

INSERT INTO usuario (id_usuario, fk_rol, fk_persona, fk_imagen, fk_tipo_cuenta, usuario, clave)
            VALUES(6, 2, 6, null, 2, 'amt@gmail.com', '123');



/* PROYECTO */

INSERT INTO proyecto(id_proyecto, responsable, fk_usuario, fk_img, proyecto, descripcion) 
            VALUES(1, 'Sofia Gomez', 1, null, 'Campesinos, jóvenes y mujeres unidos', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit pariatur fuga consequatur dolores
                nulla iste
                porro! Ratione a accusamus recusandae velit facere, impedit, dolore, nisi labore ea laboriosam
                suscipit
                earum
                natus placeat repellendus commodi mollitia! Aliquam, consectetur quas! Veniam, similique?');

INSERT INTO proyecto(id_proyecto, fk_responsable, fk_usuario, fk_img, proyecto, descripcion) 
            VALUES(2, 'Ana Maria Torres', 1, null, 'Frutos amazónicos, en peligro', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit pariatur fuga consequatur dolores
                nulla iste
                porro! Ratione a accusamus recusandae velit facere, impedit, dolore, nisi labore ea laboriosam
                suscipit
                earum
                natus placeat repellendus commodi mollitia! Aliquam, consectetur quas! Veniam, similique?');
