import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { validateBody } from '../middlewares/validate';
import { asyncHandler } from '../middlewares/asyncHandler';
import { profileController } from '../controllers/profileController';
import { ProfileUpsertSchema } from '../models/profileSchemas';

const profileSchema = ProfileUpsertSchema;

export const profileRouter = Router();

profileRouter.get('/', authMiddleware, asyncHandler(profileController.get));
profileRouter.put('/', authMiddleware, validateBody(profileSchema), asyncHandler(profileController.upsert));


