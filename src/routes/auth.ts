import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { validateBody } from '../middlewares/validate';
import { asyncHandler } from '../middlewares/asyncHandler';
import { authController } from '../controllers/authController';
import { LoginSchema, RefreshSchema, RegisterSchema } from '../models/authSchemas';

const registerSchema = RegisterSchema;
const loginSchema = LoginSchema;
const refreshSchema = RefreshSchema;

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), asyncHandler(authController.register));
authRouter.post('/login', validateBody(loginSchema), asyncHandler(authController.login));
authRouter.get('/profile', authMiddleware, asyncHandler(authController.me));
authRouter.post('/refresh', validateBody(refreshSchema), asyncHandler(authController.refresh));
authRouter.post('/logout', asyncHandler(authController.logout));


