import proyecto from '../models/proyecto.js';
const controller = {};


controller.vista_proyectos = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    res.render('./proyectos', { rol, permisos: req.session.permisos_usuario })
}


controller.crear_proyectos = (req, res) => {
    console.log(req.file);
    proyecto.registrar(req).then((response) => {

        res.send('proyecto creado')
    }).catch((err) => {
        console.log(err);
    });

}

export default controller