import { Router } from "express";
import controller from '../controllers/paneladmonController.js'
const router = Router();


router.get('/paneladmon', controller.vista_paneladmon)



export default router;