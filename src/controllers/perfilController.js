const controller = {};
import usuario from '../models/usuario.js';
import validar from '../models/validaciones.js';
var cuenta;
controller.vista_perfil = (req, res) => {
    const id = req.session.passport.user.id;
    usuario.consultar_perfil(id).then((response) => {
        const user = {
            nombre: response.nombre,
            usuario: response.usuario,
            tipo: response.tipo,
            descripcion: response.descripcion,
            nacionalidad: response.nacionalidad,
            telefono: validar.datos(res.telefono),
            direccion: validar.datos(res.direccion),
            barrio: validar.datos(res.barrio)
        }
        cuenta = user.tipo
        console.log('xxxxxx');
        console.log(user);
        res.render('./perfil', user)
    }).catch((err) => {
        console.log(err);
    })
}


controller.tipo_cuenta = (req, res) => {
    usuario.consultar_tipo_de_cuenta().then((response) => {
        res.json({
            tipo: cuenta,
            cuenta: response
        })
    }).catch((err) => {
        console.log(err);
    })

}



export default controller