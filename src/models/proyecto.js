import pool from '../database/conexion.js';
import p from '../models/persona.js';
import i from '../models/imagenes.js';
const proyecto = {}


proyecto.registrar = (req) => {

    return new Promise((resolve, reject) => {
        const { resposable, nombre_proyecto, descripcion_proyecto } = req.body;
        p.registrar_encargado(resposable).then((response) => {
            console.log(response);
            if (response == "se regitro la persona encargada con exito") {
                i.registar(req).then((response) => {
                    console.log(response);

                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    })

}

const registrar_proyecto = (req, proyecto, descripcion) => {
    const id = req.session.passport.user.id;
    return new Promise((resolve, reject) => {
        p.consultar_ultima_persona().then( (response) => {
            const id_encargado = response
            i.consultar_ultima_imagen().then(async(response) => {
                const sql = await pool.query('insert into proyecto(fk_encargado,fk_usuario,fk_imagen,proyecto, descripcion)values($1,$2,$3,$4,$5)')
            }).catch((err) => {

            })




        }).catch((err) => {
            console.log(err);
        })

    })
}

export default proyecto