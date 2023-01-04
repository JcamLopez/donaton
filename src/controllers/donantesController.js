import usuario from '../models/usuario.js';
const controller = {};


controller.vista_donantes = (req, res) => {

    usuario.consultar_usuario_que_dona(req).then((response) => {
        var rol = req.session.permisos_usuario[0].rol;
        for (let i = 0; i < response.length; i++) {
            let formato = response[i].fecha.getDate() + "/" + (response[i].fecha.getMonth() + 1) + "/" + response[i].fecha.getFullYear()
            response[i].fecha = formato
        }
        console.log(response);
        res.render('./donantes', {rol,
            permisos: req.session.permisos_usuario,
            response
        })
    }).catch((err) => {
        console.log(err);
    })

}


export default controller