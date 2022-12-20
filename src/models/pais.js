
import pool from '../database/conexion.js'
export const pais = {}
export var nacionalidad = new Array();
export var id_nacionalidad;
pais.ConsultarNaniconalidad = async () => {
    const sql = await pool.query('select pais.nacionalidad as na from pais');
    return new Promise((resolve, reject) => {
        if (sql.rowCount > 0) {
            sql.rows.forEach(function (item) {
                nacionalidad.push(item)
            });
            return resolve("se consulto la nacionalidad de manera correcta")
        } else {
            return reject("Error no se consulto la nacionalidad de manera correcta")
        }
    })
}

pais.ConsultarIdNacioanlidad = async (nacionalidad) => {
    const sql = await pool.query('select p.id_pais as id from pais as p where p.nacionalidad = $1', [nacionalidad])

    return new Promise((resolve, reject) => {
        if (sql.rowCount > 0) {
            console.log(sql.rows[0].id)
            id_nacionalidad = sql.rows[0].id;
            return resolve('se consulto con exito el pais por nacionalidad')
        } else {
            return reject("No se encontro registros de nacionaldiad")
        }
    });

}

