import { resolve } from 'path';
import pool from '../database/conexion.js'
import { pais, id_nacionalidad } from './pais.js'
import { persona, ultimo_id_persona } from './persona.js'


const usuario = {};


usuario.regitrar_usuario = (usuario) => {
    pais.ConsultarIdNacioanlidad(usuario.nacionalidad).then(async (response) => {
        if (response == "se consulto con exito el pais por nacionalidad") {
            persona.regitrar_persona(id_nacionalidad, usuario.nombre).then((response) => {
                if (response == "se regitro la persona con exito") {
                    persona.consultar_persona().then(async (response) => {
                        if (response == "se consulto la ultima persona con exito") {
                            registrar(usuario).then((response) => {

                                console.log(response)
                            }).catch((err) => {

                                console.log(err)
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }).catch((err) => {
        console.log(err)
    });
}

const registrar = (usuario) => {
    return new Promise(async (resolve, reject) => {
        const registro_usuario = await pool.query('insert into usuario(fk_rol,fk_persona,usuario,clave)values($1,$2,$3,$4) RETURNING *', [2, ultimo_id_persona, usuario.usuario, usuario.clave_encriptada]);
        if (registro_usuario.rowCount > 0) {
            return resolve('se registro el usuario con exito')
        } else {
            return reject('no se registro el usuario')
        }
    })
}

usuario.ConsultaUltimoUsuario = () => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select max(u.id_usuario) as id from usuario as u');
        if (sql.rowCount > 0) {
            const id = sql.rows[0].id;
            return resolve(sql.rows[0].id)
        } else {
            return reject('no se consulto el ultimo usuario')
        }

    })
}


usuario.consultar_usuario = (usuario) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query("select u.id_usuario as id,u.usuario as usu, u.clave as c  from usuario as u where u.usuario =$1", [usuario])
       
        if (sql.rowCount > 0) {
            var user = sql.rows[0];
            return resolve(user)
        } else {
            reject('El usaurio no existe')
        }
    })

}
export default usuario;