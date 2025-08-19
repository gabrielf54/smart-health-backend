import { Request, Response } from 'express';
import { authService } from '../services/authService';
import type { LoginInput, RefreshInput, RegisterInput } from '../types/auth';

export const authController = {

	register: async (req: Request, res: Response) => {
		const { email, password } = (req as any).validated as RegisterInput;

		const result = await authService.register({ email, password });
		
		return res.status(201).json(result);
	},

	login: async (req: Request, res: Response) => {
		const { email, password } = (req as any).validated as LoginInput;

		const result = await authService.login({ email, password });

		return res.json(result);
	},

	me: async (req: Request, res: Response) => {
		const userId = (req as any).userId as string;

		const result = await authService.me(userId);

		return res.json(result);
	},

	refresh: async (req: Request, res: Response) => {
		const { refreshToken } = (req as any).validated as RefreshInput;

		const result = await authService.refresh(refreshToken);

		return res.json(result);
	},

	logout: async (_req: Request, res: Response) => {
		return res.status(204).send();
	},
};


