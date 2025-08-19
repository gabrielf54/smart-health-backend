export type RegisterInput = {
	email: string;
	password: string;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type RefreshInput = {
	refreshToken: string;
};

export type AuthUser = {
	id: string;
	email: string;
};

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};


