import proyecto from '../models/proyecto.js'
import img from '../models/imagenes.js';
import persona from '../models/persona.js';

const controller = {};


controller.vista_panel_admin = (req, res) => {
    var rol = req.session.permisos_usuario[0].rol;
    proyecto.consultar().then((response) => {
        var proyecto = response;
        res.render('./panel_admin', { rol, permisos: req.session.permisos_usuario, proyecto })
    }).catch((err) => {
        console.log(err)
        res.render('./panel_admin', { rol, permisos: req.session.permisos_usuario })
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


controller.eliminar_proyecto = (req, res) => {
    const { id_responsable, id_proye, id_img } = req.params;
    proyecto.eliminar(id_proye).then((response) => {
        if (response == "El proyecto se elimino de manera correcta") {
            console.log(response);
            img.eliminar(id_img).then((response) => {
                if (response == "se elimino la imagen de manera correcta") {
                    console.log(response);
                    persona.eliminar(id_responsable).then((response) => {

                        if (response == "se elimino la persona de manera correcta") {
                            console.log(response);
                            res.redirect('/panel-admin');
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }).catch((err) => {
        console.log(err);
    })


}

export default controller