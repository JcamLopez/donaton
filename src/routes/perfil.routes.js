import { Router } from "express";
import controller from '../controllers/perfilController.js'
const router = Router();


router.get('/mi-perfil', controller.vista_perfil)


export default router;