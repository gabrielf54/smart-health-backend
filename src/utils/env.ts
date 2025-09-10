export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3000),

  DATABASE_PASSWORD: process.env.DB_PASSWORD ?? "",
  DATABASE_USER: process.env.DB_USER ?? "",
  DATABASE_HOST: process.env.DB_HOST ?? "",
  DATABASE_PORT: Number(process.env.DB_PORT ?? 5432),
  DATABASE_NAME: process.env.DB_NAME ?? "",

  JWT_SECRET: process.env.JWT_SECRET ?? "change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "15m",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "change-me-refresh",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d",
} as const;
