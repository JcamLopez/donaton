import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from '../../database/conexion.js'
import encriptar from './encrypt.js'
import usu from '../../models/usuario.js';

passport.use('local.registro', new Strategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario, clave, done) => {
    try {
        const { nombre, nacionalidad, usuario, clave } = req.body;
        const clave_encriptada = await encriptar.encriptar(clave);
        const user = {
            nombre,
            nacionalidad,
            usuario,
            clave_encriptada
        }

        usu.regitrar_usuario(user)
        usu.ConsultaUltimoUsuario().then((res) => {
            user.id = res
            return done(null, user)
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        console.log("Error " + err)
    }
}));


passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})
/*
passport.deserializeUser(async (id, done) => {
    const sql = await pool.query('select u.id_usuario as id, u.usuario,u.clave from usuario as u where u.id_usuario = $1', [id])

    done(null, sql.rows[0])
})*/

export default passport