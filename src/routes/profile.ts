import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { validateBody } from '../middlewares/validate';
import { profileController } from '../controllers/profileController';
import { ProfileUpsertSchema } from '../models/profileSchemas';

const profileSchema = ProfileUpsertSchema;

export const profileRouter = Router();

profileRouter.get('/', authMiddleware, profileController.get);
profileRouter.put('/', authMiddleware, validateBody(profileSchema), profileController.upsert);


