import { Router } from "express";
import controller from '../controllers/donarContoller.js'
const router = Router();


router.get('/donar', controller.vista_donar)



export default router;