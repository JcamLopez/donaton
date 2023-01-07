import { Router } from "express";
import controller from '../controllers/panel_adminController.js'
import usuario from '../models/usuario.js'
import img from '../models/imagenes.js'
const router = Router();
const validar = (req, res, next) => {
    if (req.session.passport) {
        usuario.permisos_usuario(req.session.passport.user.id, res).then((response) => {
            req.session.permisos_usuario = response
            next()
        }).catch((err) => {
            console.log(err)
        })
    }
}

router.get('/panel-admin', validar, controller.vista_panel_admin)
router.post('/crear-proyecto', img.upload.single('img_proyecto'), controller.crear_proyectos)
router.get('/eliminar/proyecto/:id_responsable/:id_proye/:id_img', controller.eliminar_proyecto)


export default router;