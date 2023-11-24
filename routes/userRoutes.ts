import { Router } from 'express';
import userController from '../controllers/userController';
const router = Router();

router.get('/create', userController.create);

export default router;
