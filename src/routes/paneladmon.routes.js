import { Router } from "express";
import controller from '../controllers/paneladmonController.js'
const router = Router();


router.get('/panel-admin', controller.vista_paneladmon)



export default router;