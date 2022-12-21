import pool from '../database/conexion.js'
export const persona = {};
export var ultimo_id_persona;
persona.regitrar_persona = (id_nacionalidad, nombre) => {
    return new Promise(async (resolve, reject) => {
        const persona = await pool.query('insert into persona (fk_nacionalidad,nombre_completo)values($1,$2) RETURNING *', [id_nacionalidad, nombre]);
        if (persona.rowCount > 0) {
            return resolve("se regitro la persona con exito")
        } else {
            return rejects("no se registro la persona")
        }
    })
}

persona.consultar_persona = () => {
    return new Promise(async (resolve, reject) => {
        const ultima_persona = await pool.query('select max(id_persona) as id from persona');
        if (ultima_persona.rowCount > 0) {
            ultimo_id_persona = ultima_persona.rows[0].id
            resolve('se consulto la ultima persona con exito');
        } else {
            reject('no se consulto la ultima persona')
        }
    })

}


