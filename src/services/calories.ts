type ProfileCore = {
	sex?: 'MALE' | 'FEMALE' | null;
	weightKg?: number | null;
	heightCm?: number | null;
	age?: number | null;
	activityLevel?: 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'HIGH' | 'EXTREME' | null;
	goal?: 'LOSE_WEIGHT' | 'MAINTAIN' | 'GAIN_MUSCLE' | 'GAIN_WEIGHT' | null;
};

function harrisBenedict(profile: ProfileCore): number {
	const { sex, weightKg, heightCm, age } = profile;

	if (!sex || !weightKg || !heightCm || !age) return 0;

	if (sex === 'MALE') {
		return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
	}
	
	return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
}

function activityFactor(level?: ProfileCore['activityLevel']): number {
	switch (level) {
		case 'SEDENTARY':
			return 1.2;
		case 'LIGHT':
			return 1.375;
		case 'MODERATE':
			return 1.55;
		case 'HIGH':
			return 1.725;
		case 'EXTREME':
			return 1.9;
		default:
			return 1.2;
	}
}

function goalAdjustment(goal?: ProfileCore['goal']): number {
	switch (goal) {
		case 'LOSE_WEIGHT':
			return -400;
		case 'MAINTAIN':
			return 0;
		case 'GAIN_MUSCLE':
			return 300;
		case 'GAIN_WEIGHT':
			return 550;
		default:
			return 0;
	}
}

export function calculateCalorieTargets(profile: ProfileCore) {
	const tmb = harrisBenedict(profile);
	const total = Math.max(1200, Math.round(tmb * activityFactor(profile.activityLevel)));
	const target = Math.round(total + goalAdjustment(profile.goal));
	return { tmb: Math.round(tmb), total, target };
}


