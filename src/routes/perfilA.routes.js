import { Router } from "express";
import controller from '../controllers/perfilAController.js'
const router = Router();


router.get('/perfilAdmin', controller.vista_perfilA)


export default router;