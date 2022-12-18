import { Router } from "express";
import controller from '../controllers/loginController.js'
const router = Router();


router.get('/login', controller.vista_login)



export default router;