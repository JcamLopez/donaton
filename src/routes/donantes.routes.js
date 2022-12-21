import { Router } from "express";
import controller from '../controllers/donantesController.js'
const router = Router();


router.get('/donantes', controller.vista_donantes)



export default router;