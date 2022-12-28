const controller = {};


controller.vista_donantes = (req, res) => {
    res.render('./donantes',{datos:req.session.permisos_usuario})
}


export default controller