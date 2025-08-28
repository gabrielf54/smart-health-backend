import { prisma } from '../config/prisma';
import { calculateCalorieTargets } from './calories';
import type { Meal } from '../types/diet';
import { AppError } from '../utils/appError';

const templateMeals = (target: number): Meal[] => {
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
};

export class DietService {
	get = async (userId: string): Promise<{ targetCalories: number; meals: Meal[] }> => {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		if (!profile) {
			throw AppError.badRequest('Complete o perfil primeiro');
		}

		const { target } = calculateCalorieTargets(profile);
		const meals = templateMeals(target);

		return { targetCalories: target, meals };
	};

	generate = async (userId: string): Promise<{ id: string; targetCalories: number; meals: Meal[] }> => {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		if (!profile) {
			throw AppError.badRequest('Complete o perfil primeiro');
		}

		const { target } = calculateCalorieTargets(profile);
		const meals = templateMeals(target);
		const diet = await prisma.diet.create({ data: { userId, targetCalories: target, meals } });
		
		return { id: diet.id, targetCalories: target, meals };
	};
}

export const dietService = new DietService();


