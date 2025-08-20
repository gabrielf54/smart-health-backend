import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { asyncHandler } from '../middlewares/asyncHandler';
import { dietController } from '../controllers/dietController';

export const dietRouter = Router();

dietRouter.get('/', authMiddleware, asyncHandler(dietController.get));
dietRouter.post('/generate', authMiddleware, asyncHandler(dietController.generate));


