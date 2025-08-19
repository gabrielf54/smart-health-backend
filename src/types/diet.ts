export type Meal = {
	name: string;
	calories: number;
};

export type DietPlan = {
	id: string;
	targetCalories: number;
	meals: Meal[];
};


