const controller = {};


controller.vista_proyectos = (req, res) => {
    res.render('./proyectos',{datos:req.session.permisos_usuario})
}


export default controller