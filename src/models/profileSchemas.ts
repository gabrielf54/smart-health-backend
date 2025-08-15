import { z } from 'zod';

export const ProfileUpsertSchema = z.object({
	age: z.number().int().min(16).max(100),
	weightKg: z.number().min(30).max(300),
	heightCm: z.number().min(120).max(250),
	sex: z.enum(['MALE', 'FEMALE']),
	activityLevel: z.enum(['SEDENTARY', 'LIGHT', 'MODERATE', 'HIGH', 'EXTREME']),
	goal: z.enum(['LOSE_WEIGHT', 'MAINTAIN', 'GAIN_MUSCLE', 'GAIN_WEIGHT']),
});

export type ProfileUpsertInput = z.infer<typeof ProfileUpsertSchema>;


