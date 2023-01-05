import { Router } from "express";
import controller from '../controllers/proyectosController.js'
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
    }else{
        res.render('./proyectos')
    }
}

router.get('/proyectos',validar, controller.vista_proyectos)
router.post('/crear-proyecto',img.upload.single('img_proyecto'),controller.crear_proyectos)



export default router;