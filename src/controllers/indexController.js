

const controller = {};


controller.vista_index = (req, res) => {
 
    res.render('./index',{datos:req.session.permisos_usuario})
}


export default controller