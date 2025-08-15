import { Router } from 'express';
import { authMiddleware } from '../security/authMiddleware';
import { prisma } from '../config/prisma';
import { calculateCalorieTargets } from '../services/calories';

export const dietRouter = Router();

// Placeholder para etapa 1: retorna uma "dieta" simples baseada na meta calórica
dietRouter.get('/', authMiddleware, async (req, res) => {
	const userId = (req as any).userId as string;
	const profile = await prisma.profile.findUnique({ where: { userId } });
	if (!profile) return res.status(400).json({ error: 'Complete o perfil primeiro' });
	const { target } = calculateCalorieTargets(profile);
	const meals = templateMeals(target);
	return res.json({ targetCalories: target, meals });
});

dietRouter.post('/generate', authMiddleware, async (req, res) => {
	const userId = (req as any).userId as string;
	const profile = await prisma.profile.findUnique({ where: { userId } });
	if (!profile) return res.status(400).json({ error: 'Complete o perfil primeiro' });
	const { target } = calculateCalorieTargets(profile);
	const meals = templateMeals(target);
	const diet = await prisma.diet.create({ data: { userId, targetCalories: target, meals } });
	return res.status(201).json({ id: diet.id, targetCalories: target, meals });
});

function templateMeals(target: number) {
	const breakfast = Math.round(target * 0.25);
	const lunch = Math.round(target * 0.4);
	const dinner = Math.round(target * 0.25);
	const snacks = target - (breakfast + lunch + dinner);
	return [
		{ name: 'Café da manhã', calories: breakfast },
		{ name: 'Almoço', calories: lunch },
		{ name: 'Jantar', calories: dinner },
		{ name: 'Lanches', calories: snacks },
	];
}


