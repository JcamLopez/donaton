import proyecto from '../models/proyecto.js'
const controller = {};


controller.vista_panel_admin = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    res.render('./panel_admin', {
        rol,
        permisos: req.session.permisos_usuario
    })
}

controller.crear_proyectos = (req, res) => {
    console.log(req.file);
    proyecto.registrar(req).then((response) => {
        if (response == "se registro el proyecto de manera exitosa") {
            res.redirect('/panel-admin')
        } else {
            res.json({ error: "No se registro el proyecto" })
        }
    }).catch((err) => {
        console.log(err);
    })

}


export default controller