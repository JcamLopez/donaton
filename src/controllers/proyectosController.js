const controller = {};


controller.vista_proyectos = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    res.render('./proyectos', { rol, permisos: req.session.permisos_usuario })
}


export default controller