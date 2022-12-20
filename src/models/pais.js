import pool from '../database/conexion.js'

export const pais = {}
export var nacionalidad = new Array();
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


