
const controller = {};


controller.vista_paneladmon = (req, res) => {
    res.render('./paneladmon',{
        permisos: req.session.permisos_usuario
    })
}


export default controller