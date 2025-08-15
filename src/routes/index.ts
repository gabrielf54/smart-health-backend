import { Router } from 'express';
import { authRouter } from './auth';
import { profileRouter } from './profile';
import { dietRouter } from './diet';

export const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/diet', dietRouter);


