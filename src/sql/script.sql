create database reforestacion;

CREATE TABLE persona (
    id_persona SERIAL PRIMARY KEY,
    fk_imagen int  null,
    fk_nacionalidad int not null,
    fk_rol int not null,    
    nombre_completo VARCHAR(100) not null
);

CREATE TABLE imagen (
    id_imagen SERIAL PRIMARY KEY,
    url text  null
);

CREATE TABLE nacionalidad (
    id_nacionalidad SERIAL PRIMARY KEY,
    nacionaliad varchar(100) not null
);

CREATE TABLE permiso (
    id_permiso SERIAL PRIMARY KEY,
    fk_super_admin int not null,
    permiso varchar(100) not null,
    descripcion text not null
);

CREATE TABLE rol (
    id_tipo_arbol SERIAL PRIMARY KEY,
    fk_permiso_usuario int not null,
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
