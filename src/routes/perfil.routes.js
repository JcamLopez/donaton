import { Router } from "express";
import controller from '../controllers/perfilController.js'
const router = Router();


router.get('/mi-perfil', controller.vista_perfil)
router.post('/tipo-cuenta', controller.tipo_cuenta)





export default router;