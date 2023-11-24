import { Router } from 'express';
import wordsController from '../controllers/wordsController';
const router = Router();

router.get('/create', wordsController.create);

export default router;
