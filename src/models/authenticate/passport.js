import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from '../../database/conexion.js'
import encriptar from './encrypt.js'
import registro_usaurio from '../../models/registro_usuario.js';

passport.use('local.registro', new Strategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario, clave, done) => {
    try {

        const { nombre, nacionalidad, usaurio, clave } = req.body;
        const user = {
            nombre,
            nacionalidad,
            usaurio,
            clave
        }
        const clave_encriptada = await encriptar.encriptar(clave);
        registro_usaurio.regitrar_usuario(user)

    } catch (err) {
        console.log("Error " + err)
    }
}));


/*passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser(async (id, done) => {
    const sql = await pool.query('select u.id_usuario as id, u.usuario,u.clave from usuario as u where u.id_usuario = $1', [id])

    done(null, sql.rows[0])
})*/

export default passport