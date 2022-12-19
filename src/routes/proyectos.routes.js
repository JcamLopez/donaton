import { Router } from "express";
import controller from '../controllers/proyectosController.js'
const router = Router();


router.get('/proyectos', controller.vista_proyectos)



export default router;