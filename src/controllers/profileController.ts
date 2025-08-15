import { Request, Response } from 'express';
import { profileService } from '../services/profileService';

export const profileController = {
	get: async (req: Request, res: Response) => {
		const userId = (req as any).userId as string;
		const result = await profileService.get(userId);
		return res.json(result);
	},
	upsert: async (req: Request, res: Response) => {
		const userId = (req as any).userId as string;
		const data = (req as any).validated as {
			age: number;
			weightKg: number;
			heightCm: number;
			sex: 'MALE' | 'FEMALE';
			activityLevel: 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'HIGH' | 'EXTREME';
			goal: 'LOSE_WEIGHT' | 'MAINTAIN' | 'GAIN_MUSCLE' | 'GAIN_WEIGHT';
		};
		const result = await profileService.upsert(userId, data);
		return res.json(result);
	},
};


