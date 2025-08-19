import bcrypt from 'bcrypt';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../utils/env';
import type { LoginInput, RegisterInput, RefreshInput, Tokens, AuthUser } from '../types/auth';

const generateTokens = (userId: string): Tokens => {
	const accessToken = jwt.sign(
		{ sub: userId },
		env.JWT_SECRET as Secret,
		{ expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] },
	);
	const refreshToken = jwt.sign(
		{ sub: userId },
		env.JWT_REFRESH_SECRET as Secret,
		{ expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] },
	);
	return { accessToken, refreshToken };
};

export class AuthService {
	register = async ({ email, password }: RegisterInput): Promise<{ user: AuthUser } & Tokens> => {
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) {
			throw Object.assign(new Error('Email já cadastrado'), { status: 409 });
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({ data: { email, passwordHash } });

		if (!user?.id) {
			throw Object.assign(new Error('Erro ao criar usuário'), { status: 500 });
		}

		const tokens = generateTokens(user.id);

		return { user: { id: user.id, email: user.email }, ...tokens };
	};

	login = async ({ email, password }: LoginInput): Promise<{ user: AuthUser } & Tokens> => {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw Object.assign(new Error('Credenciais inválidas'), { status: 401 });
		}

		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) {
			throw Object.assign(new Error('Credenciais inválidas'), { status: 401 });
		}

		const tokens = generateTokens(user.id);
		return { user: { id: user.id, email: user.email }, ...tokens };
	};

	me = async (userId: string): Promise<AuthUser> => {
		const user = await prisma.user.findUnique({ where: { id: userId } });

		if (!user) {
			throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });
		}

		return { id: user.id, email: user.email };
	};

	refresh = async (refreshToken: RefreshInput['refreshToken']): Promise<Tokens> => {
		try {
			const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { sub: string };
			return generateTokens(payload.sub);
		} catch {
			throw Object.assign(new Error('Refresh token inválido'), { status: 401 });
		}
	};
}

export const authService = new AuthService();


