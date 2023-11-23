import { Router } from 'express';
import wordsRoutes from './wordsRoutes';
const router = Router();

router.use('/words', wordsRoutes);

export default router;
