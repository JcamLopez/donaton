import { Router } from "express";
import controller from '../controllers/loginController.js'
import passport from 'passport';
const router = Router();

router.get('/login', controller.vista_login)
router.post('/cargar-nacionalidad', controller.cargar_nacionalidad)

//router.post('/registro-usuario', controller.registro_usuario)
router.post('/registro-usuario', passport.authenticate('local.registro'), (req, res) => res.json({
    status: 'ok',
    url: '/zzzzzzzz'
}));

export default router;