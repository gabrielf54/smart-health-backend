import { Request, Response } from 'express';
import { dietService } from '../services/dietService';

export const dietController = {
	get: async (req: Request, res: Response) => {
		const userId = (req as any).userId as string;
		const result = await dietService.get(userId);
		return res.json(result);
	},
	generate: async (req: Request, res: Response) => {
		const userId = (req as any).userId as string;
		const result = await dietService.generate(userId);
		return res.status(201).json(result);
	},
};


