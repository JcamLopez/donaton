import { Router } from "express";
import controller from '../controllers/donantesController.js'
import usuario from '../models/usuario.js'
const router = Router();


const validar = (req, res, next) => {
    console.log('este es mi passssssssss ');
    console.log(req.session.passport);
    if (req.session.passport) {
        usuario.permisos_usuario(req.session.passport.user.id, res).then((response) => {
            req.session.permisos_usuario = response
            next()
        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.render('./donantes')
    }
}

router.get('/donantes', validar, controller.vista_donantes)



export default router;