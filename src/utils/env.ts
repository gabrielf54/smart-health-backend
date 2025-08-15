export const env = {
	NODE_ENV: process.env.NODE_ENV ?? 'development',
	PORT: Number(process.env.PORT ?? 3000),
	DATABASE_URL: process.env.DATABASE_URL ?? '',
	JWT_SECRET: process.env.JWT_SECRET ?? 'change-me',
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '15m',
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'change-me-refresh',
	JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
} as const;


