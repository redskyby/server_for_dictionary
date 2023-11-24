import { Router } from 'express';
import wordsRoutes from './wordsRoutes';
import userRoutes from './userRoutes';
const router = Router();

router.use('/words', wordsRoutes);
router.use('/user', userRoutes);

export default router;
