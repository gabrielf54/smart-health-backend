import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { dietController } from '../controllers/dietController';

export const dietRouter = Router();

dietRouter.get('/', authMiddleware, dietController.get);
dietRouter.post('/generate', authMiddleware, dietController.generate);


