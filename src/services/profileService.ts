
import type { ProfileUpsertInput, CalorieTargets } from '../types/profile';
import { AppError } from '../utils/appError';

export class ProfileService {
	get = async (userId: string): Promise<{ profile: any; targets: CalorieTargets }> => {
		const profile = await prisma.profile.findUnique({ where: { userId } });
		if (!profile) throw AppError.notFound('Perfil não encontrado');
		return { profile };
	};

	upsert = async (userId: string, data: ProfileUpsertInput): Promise<{ profile: any; targets: CalorieTargets }> => {
		const profile = await prisma.profile.upsert({
			where: { userId },
			update: data,
			create: { userId, ...data },
		});

		
		return { profile };
	};
}

export const profileService = new ProfileService();


