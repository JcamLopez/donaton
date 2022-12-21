import { Router } from "express";
import controller from '../controllers/comparativasController.js'
const router = Router();


router.get('/comparativas', controller.vista_comparativas)



export default router;