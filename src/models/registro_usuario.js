import pool from '../database/conexion.js'
import { pais, id_nacionalidad } from '../models/pais.js'
const usuario = {};


usuario.regitrar_usuario = async (usuario) => {
    pais.ConsultarIdNacioanlidad(usuario.nacionalidad).then(async (res) => {
        if (res == "se consulto con exito el pais por nacionalidad") {
            const regis_usaurio = await pool.query('insert into persona (fk_nacionalidad,nombre_completo)values($1,$2) RETURNING *', [id_nacionalidad, usuario.nombre]);
            if (regis_usaurio.rowCount > 0) {
             
            } else {
                console.log('No inserto la persona')
            }
        }
    }).catch((err) => {
        console.log(err)
    });

}

export default usuario;