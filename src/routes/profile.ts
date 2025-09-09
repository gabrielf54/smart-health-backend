import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { profileController } from '../controllers/profileController';


export const profileRouter = Router();

profileRouter.get('/', authMiddleware, profileController.get);
profileRouter.put('/', authMiddleware, profileController.upsert);


