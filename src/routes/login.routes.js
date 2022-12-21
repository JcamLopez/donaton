import { Router } from "express";
import controller from '../controllers/loginController.js'
import passport from 'passport';

const router = Router();

router.get('/login', controller.vista_login)
router.post('/cargar-nacionalidad', controller.cargar_nacionalidad)

router.post('/registrar-usuario', passport.authenticate('local.registro'), (req, res) => res.json({
    status: 'ok'
}));


export default router;