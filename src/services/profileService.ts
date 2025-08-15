import { prisma } from '../config/prisma';
import { calculateCalorieTargets } from './calories';

export const profileService = {
	async get(userId: string) {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		if (!profile) throw Object.assign(new Error('Perfil não encontrado'), { status: 404 });
		const targets = calculateCalorieTargets(profile);
		return { profile, targets };
	},
	async upsert(
		userId: string,
		data: {
			age: number;
			weightKg: number;
			heightCm: number;
			sex: 'MALE' | 'FEMALE';
			activityLevel: 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'HIGH' | 'EXTREME';
			goal: 'LOSE_WEIGHT' | 'MAINTAIN' | 'GAIN_MUSCLE' | 'GAIN_WEIGHT';
		}
	) {
		const profile = await prisma.profile.upsert({
			where: { userId },
			update: data,
			create: { userId, ...data },
		});
		const targets = calculateCalorieTargets(profile);
		return { profile, targets };
	},
};


