import { Pool, type QueryResultRow } from 'pg';
import { env } from '../utils/env';

const buildDatabaseUrl = (): string => {
	const username = encodeURIComponent(env.DATABASE_USER);
	const password = encodeURIComponent(env.DATABASE_PASSWORD);
	const host = env.DATABASE_HOST;
	const port = env.DATABASE_PORT;
	const database = env.DATABASE_NAME;

	if (!username || !host || !database) {
		throw new Error('Database configuration is incomplete. Please set DB_USER, DB_HOST and DB_NAME.');
	}

	const auth = password ? `${username}:${password}` : username;
	return `postgresql://${auth}@${host}:${port}/${database}`;
};

export const databaseUrl = buildDatabaseUrl();

const globalForPool = globalThis as unknown as { pgPool?: Pool };

export const pool =
	globalForPool.pgPool ??
	new Pool({
		connectionString: databaseUrl,
		ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
	});

if (env.NODE_ENV !== 'production') globalForPool.pgPool = pool;

export const query = <T extends QueryResultRow = QueryResultRow>(text: string, params?: any[]) =>
	pool.query<T>(text, params);

