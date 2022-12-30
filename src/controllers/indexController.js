
const controller = {};


controller.vista_index = (req, res) => {
   
    res.render('./index', {
        permisos: req.session.permisos_usuario
    })
}


export default controller