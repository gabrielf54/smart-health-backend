import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { authMiddleware } from '../security/authMiddleware';
import { calculateCalorieTargets } from '../services/calories';

const profileSchema = z.object({
	age: z.number().int().min(16).max(100),
	weightKg: z.number().min(30).max(300),
	heightCm: z.number().min(120).max(250),
	sex: z.enum(['MALE', 'FEMALE']),
	activityLevel: z.enum(['SEDENTARY', 'LIGHT', 'MODERATE', 'HIGH', 'EXTREME']),
	goal: z.enum(['LOSE_WEIGHT', 'MAINTAIN', 'GAIN_MUSCLE', 'GAIN_WEIGHT']),
});

export const profileRouter = Router();

profileRouter.get('/', authMiddleware, async (req, res) => {
	const userId = (req as any).userId as string;
	const profile = await prisma.profile.findUnique({ where: { userId } });
	if (!profile) return res.status(404).json({ error: 'Perfil não encontrado' });
	const targets = calculateCalorieTargets(profile);
	return res.json({ profile, targets });
});

profileRouter.put('/', authMiddleware, async (req, res) => {
	const parse = profileSchema.safeParse(req.body);
	if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
	const userId = (req as any).userId as string;
	const data = parse.data;
	const profile = await prisma.profile.upsert({
		where: { userId },
		update: data,
		create: { userId, ...data },
	});
	const targets = calculateCalorieTargets(profile);
	return res.json({ profile, targets });
});


