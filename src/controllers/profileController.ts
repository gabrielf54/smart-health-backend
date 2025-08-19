import { Request, Response } from 'express';
import { profileService } from '../services/profileService';
import type { ProfileUpsertInput } from '../types/profile';

export const profileController = {

	get: async (req: Request, res: Response) => {
		const userId = (req as any).userId as string;
		const result = await profileService.get(userId);
		
		return res.json(result);
	},

	upsert: async (req: Request, res: Response) => {
		const userId = (req as any).userId as string;

		const data = (req as any).validated as ProfileUpsertInput;

		const result = await profileService.upsert(userId, data);

		return res.json(result);
	},
};


