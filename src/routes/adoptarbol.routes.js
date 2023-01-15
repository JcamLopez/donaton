import { Router } from "express";
import controller from '../controllers/adoptarbolController.js'
import x from '../../src/index.js'
const router = Router();


router.get('/adoptar-arbol', controller.vista_adoptarbol)



export default router;