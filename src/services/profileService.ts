import { prisma } from '../config/prisma';
import { calculateCalorieTargets } from './calories';
import type { ProfileUpsertInput, CalorieTargets } from '../types/profile';

export class ProfileService {
	get = async (userId: string): Promise<{ profile: any; targets: CalorieTargets }> => {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		if (!profile) throw Object.assign(new Error('Perfil não encontrado'), { status: 404 });
		const targets = calculateCalorieTargets(profile);
		return { profile, targets };
	};

	upsert = async (userId: string, data: ProfileUpsertInput): Promise<{ profile: any; targets: CalorieTargets }> => {
		const profile = await prisma.profile.upsert({
			where: { userId },
			update: data,
			create: { userId, ...data },
		});

		const targets = calculateCalorieTargets(profile);
		
		return { profile, targets };
	};
}

export const profileService = new ProfileService();


