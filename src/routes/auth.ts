import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { validateBody } from '../middlewares/validate';
import { z } from 'zod';
import { authController } from '../controllers/authController';
import { LoginSchema, RefreshSchema, RegisterSchema } from '../models/authSchemas';

const registerSchema = RegisterSchema;
const loginSchema = LoginSchema;
const refreshSchema = RefreshSchema;

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), authController.register);
authRouter.post('/login', validateBody(loginSchema), authController.login);
authRouter.get('/profile', authMiddleware, authController.me);
authRouter.post('/refresh', validateBody(refreshSchema), authController.refresh);
authRouter.post('/logout', authController.logout);


