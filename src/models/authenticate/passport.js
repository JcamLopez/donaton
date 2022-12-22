import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from '../../database/conexion.js'
import encriptar from './encrypt.js'
import usu from '../../models/usuario.js';
export var bandera_clave;
export var bandera_usuario;

passport.use('local.inicio.sesion', new Strategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario, clave, done) => {
    var user;
    usu.consultar_usuario(usuario).then(async (res) => {
        bandera_usuario = 'usuario_si_existe'
        const validar_clave = await encriptar.comparar(clave, res.c);
        if (validar_clave) {
            user = res;
            bandera_clave = 'clave_correcta'
            done(null, user);
        } else {
            bandera_clave = 'clave_incorrecta'
            done(null, user);
        }
    }).catch((err) => {
        user = {
            id: 1,
            usu: 'no existe',
            c: 'no existe'
        }
        bandera_usuario = 'usuario_no_existe'
        console.log(err)
    })

}));




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

passport.deserializeUser(async (id, done) => {
    const sql = await pool.query('select u.id_usuario as id, u.usuario,u.clave from usuario as u where u.id_usuario = $1', [id])
    done(null, sql.rows[0])
})

export default passport