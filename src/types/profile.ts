import type { ActivityLevel, Goal, Sex } from './common';

export type ProfileCore = {
	age?: number | null;
	weightKg?: number | null;
	heightCm?: number | null;
	sex?: Sex | null;
	activityLevel?: ActivityLevel | null;
	goal?: Goal | null;
};

export type ProfileUpsertInput = {
	age: number;
	weightKg: number;
	heightCm: number;
	sex: Sex;
	activityLevel: ActivityLevel;
	goal: Goal;
};

export type CalorieTargets = {
	tmb: number;
	total: number;
	target: number;
};


