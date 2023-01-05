const controller = {};


controller.vista_proyectos = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    res.render('./proyectos', { rol, permisos: req.session.permisos_usuario })
}


controller.crear_proyectos=(req,res)=>{
    res.send('proyecto creado')
}

export default controller