
import pool from '../database/conexion.js'
import pais from './pais.js'
import persona from './persona.js'


const usuario = {};
usuario.regitrar_usuario = (usuario) => {
    pais.ConsultarNacioanlidad(usuario.nacionalidad).then(async (response) => {
        console.log(response);
        persona.regitrar_persona(response.id, usuario.nombre).then((response) => {
            if (response == "se regitro la persona con exito") {
                persona.consultar_ultima_persona().then(async (response) => {

                    registrar(usuario, response).then((response) => {

                        console.log(response)
                    }).catch((err) => {

                        console.log(err)
                    })

                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })

    }).catch((err) => {
        console.log(err)
    });
}

const registrar = (usuario, id_persona) => {
    return new Promise(async (resolve, reject) => {
        const registro_usuario = await pool.query('insert into usuario(fk_rol,fk_persona,fk_tipo_cuenta,usuario,clave)values($1,$2,$3,$4,$5) RETURNING *', [2, id_persona, 2, usuario.usuario, usuario.clave_encriptada]);
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
            return reject('El usuario no existe')
        }
    })

}


usuario.registrar_usuario_que_dona = (req) => {
    return new Promise(async (resolve, reject) => {

        const id = req.session.passport.user.id;
        const date = new Date();
        let formato = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        const sql = await pool.query('insert into dona (fk_usuario,estado,fecha)values($1,$2,$3)', [id, 1, formato])
        if (sql.rowCount > 0) {
            return resolve('se registro el usuario donante con exito')
        } else {
            return reject('Error al registrar al usuario donante')
        }
    })
}


usuario.consultar_usuario_que_dona = (req) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select p.nombre_completo as  nombre,p.descripcion, u.usuario,t.tipo,pa.nacionalidad, te.telefono,d.direccion, b.barrio, dona.fecha from persona as p left join telefono as te on te.fk_persona = p.id_persona left join direccion as d on d.fk_persona = p.id_persona left join barrio as b on d.fk_barrio = b.id_barrio inner join pais as pa on p.fk_nacionalidad = pa.id_pais  inner join usuario as u on u.fk_persona = p.id_persona inner join tipo_cuenta as t on u.fk_tipo_cuenta = t.id_tipo_cuenta inner join dona on dona.fk_usuario = u.id_usuario',)
        if (sql.rowCount > 0) {
            return resolve(sql.rows)
        } else {
            return reject("Error al consultar el usuario que dona")
        }
    })
}

usuario.permisos_usuario = (id, res) => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select r.rol, p.permiso, p.ruta from usuario as u inner join rol as r on  u.fk_rol = r.id_rol inner join rol_tiene_permiso as rp on rp.fk_rol = r.id_rol inner join permiso as p on rp.fk_permiso = p.id_permiso where u.id_usuario = $1', [id])
        if (sql.rowCount > 0) {
            //var obj = {}
            var obj = new Array();
            sql.rows.forEach(element => {
                const p = quitarAcentos(element.permiso).split(" ").join("");
                obj.push(element)
                //obj[p] = element
            });

            return resolve(obj)
        } else {
            return reject('No tiene permisos este usuario')
        }
    });
}

function quitarAcentos(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
}


usuario.consultar_tipo_de_cuenta = () => {
    return new Promise(async (resolve, reject) => {
        const sql = await pool.query('select tipo_cuenta.tipo as tipo from tipo_cuenta')
        if (sql.rowCount > 0) {
            var cuenta = new Array();
            sql.rows.forEach(element => {
                cuenta.push(element.tipo)
            });
            return resolve(cuenta)
        } else {
            return reject("No se pudo concultar el tipo de cuenta")
        }
    })
}




export default usuario;