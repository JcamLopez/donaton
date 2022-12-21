create database reforestacion;

CREATE TABLE persona (
    id_persona SERIAL PRIMARY KEY,
    fk_nacionalidad int not null,    
    nombre_completo VARCHAR(100) not null
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
    fk_super_admin int not null,
    permiso varchar(100) not null,
    descripcion text not null
);

CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    rol varchar(100) not null
);


CREATE TABLE tipo_arbol (
    id_tipo_arbol SERIAL PRIMARY KEY,
    tipo varchar(100) null,
    descripcion text not null
);

CREATE TABLE usuario_dona_arbol (
    fk_usuario int not null,
    fk_arbol int not null,
    cantidad_dono float not null,
    cantidad_arboles int not null,
    fecha date not null,
    SERIAL PRIMARY KEY(fk_usuario,fk_arbol)
);


CREATE TABLE arbol (
    id_arbol SERIAL PRIMARY KEY,
    fk_usuario_admin int not null,
    fk_tipo_arbol int not null,
    nombre varchar(100) not null,
    precio float not null
);


CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    fk_rol int not null,
    fk_persona int not null,
    fk_imagen int  null,
    usuario varchar(100) not null,
    clave varchar(100) not null
);

CREATE TABLE publica (
    id_publica SERIAL PRIMARY KEY,
    fk_usuario int not null,
    titulo varchar(100) not null,
    descripcion varchar(100) not null,
    fecha date not null 
);

INSERT INTO rol (rol) VALUES('admin'),
('usuario')


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
('Zaire','Zaire')