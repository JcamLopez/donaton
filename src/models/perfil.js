const perfil = {}
import pool from '../database/conexion.js';
import pais from '../models/pais.js';
perfil.actualizar = (req) => {
    return new Promise(async (resolve, reject) => {
        const { nacionalidad } = req.body;

        pais.ConsultarNacioanlidad(nacionalidad).then((response) => {
            const id_nacionalidad = response.id;
            const id_persona = req.session.passport.user.id;
            actualizar_nacionalidad(id_nacionalidad, id_persona).then((response) => {
                console.log('aqui toyyy');
                console.log(response);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            return reject(err)
        })

    })
}


const actualizar_nacionalidad = (id_nacionalidad, id_persona) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('UPDATE persona SET fk_nacionalidad = $1 where  id_persona = $2 RETURNING *', [id_nacionalidad, id_persona])
        return resolve(sql)
    }).catch((err) => {
        return reject("error al actualizar la nacionalidad")

    })

}



export default perfil