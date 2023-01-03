const perfil = {}
import pool from '../database/conexion.js';
import b from './barrio.js';
import d from './direccion.js';
import t from './telefono.js';
import p from './persona.js';
import c from './tipo_cuenta.js';
perfil.actualizar = (req) => {
    return new Promise(async (resolve, reject) => {
        p.consultar_persona(req).then((response) => {
            const { nombre, direccion, barrio, telefono, tipo_cuenta,descripcion } = req.body;
            const id_persona = response.id;
            ActualizarNombre(id_persona, nombre,descripcion).then((response) => {
                if (response == "nombre actualizado") {
                    b.consultarBarrio().then((response) => {
                        console.log('se actualzio el nombre');
                        if (response == "si existe el barrio") {
                            b.actualizar_barrio(barrio).then((response) => {
                                console.log(response);
                                d.actualizar_direccion(direccion, id_persona).then((response) => {
                                    console.log(response);
                                    if (response == "se actualizo la direccion") {
                                        t.actualizar(telefono, id_persona).then((response) => {
                                            console.log(response);
                                            if (response == "telefono actualizado") {
                                                c.actualizar(req, tipo_cuenta).then((response) => {
                                                    console.log(response);
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            }
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                        b.registrar_barrio(barrio).then((response) => {
                            console.log(response);
                            d.registrar_direccion(id_persona, direccion).then((response) => {
                                console.log(response);
                                if (response == "direccion registrada") {
                                    t.registrar(id_persona, telefono).then((response) => {
                                        console.log(response);
                                        if (response == "telefono registrado") {
                                            c.actualizar(req, tipo_cuenta).then((response) => {
                                                console.log(response);
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        }
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                }

                            }).catch((err) => {
                                console.log(err);
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    })
                }
            }).catch((err) => {
                return reject(err)
            });
        }).catch((err) => {
            console.log(err);
        })



    })
}








const ActualizarNombre = (id_persona, nombre,descripcion) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('UPDATE persona SET nombre_completo = $1, descripcion = $2 where  id_persona = $3 RETURNING *', [nombre,descripcion, id_persona])
        if (sql.rowCount > 0) {
            return resolve("nombre actualizado")
        } else {
            return reject("Error al actualizar el nombre")
        }

    })
}










export default perfil