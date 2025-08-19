import type { ActivityLevel, Goal, Sex } from '../types/common';
import type { Meal } from '../types/diet';

export class UserModel {
	readonly id: string;
	readonly email: string;

	constructor(params: { id: string; email: string }) {
		this.id = params.id;
		this.email = params.email;
	}
}

export class ProfileModel {
	readonly id: string;
	readonly userId: string;
	readonly age: number | null;
	readonly weightKg: number | null;
	readonly heightCm: number | null;
	readonly sex: Sex | null;
	readonly activityLevel: ActivityLevel | null;
	readonly goal: Goal | null;

	constructor(params: {
		id: string;
		userId: string;
		age: number | null;
		weightKg: number | null;
		heightCm: number | null;
		sex: Sex | null;
		activityLevel: ActivityLevel | null;
		goal: Goal | null;
	}) {
		this.id = params.id;
		this.userId = params.userId;
		this.age = params.age;
		this.weightKg = params.weightKg;
		this.heightCm = params.heightCm;
		this.sex = params.sex;
		this.activityLevel = params.activityLevel;
		this.goal = params.goal;
	}
}

export class DietModel {
	readonly id: string;
	readonly userId: string;
	readonly targetCalories: number;
	readonly meals: Meal[];

	constructor(params: { id: string; userId: string; targetCalories: number; meals: Meal[] }) {
		this.id = params.id;
		this.userId = params.userId;
		this.targetCalories = params.targetCalories;
		this.meals = params.meals;
	}
}


