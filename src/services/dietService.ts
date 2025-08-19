import { prisma } from '../config/prisma';
import { calculateCalorieTargets } from './calories';

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

export const dietService = {

	async get(userId: string) {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		if (!profile) {
			throw Object.assign(new Error('Complete o perfil primeiro'), { status: 400 });
		}

		const { target } = calculateCalorieTargets(profile);
		const meals = templateMeals(target);

		return { targetCalories: target, meals };
	},
	async generate(userId: string) {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		if (!profile) {
			throw Object.assign(new Error('Complete o perfil primeiro'), { status: 400 });
		}

		const { target } = calculateCalorieTargets(profile);
		const meals = templateMeals(target);
		const diet = await prisma.diet.create({ data: { userId, targetCalories: target, meals } });
		
		return { id: diet.id, targetCalories: target, meals };
	},
};


