import bcrypt from 'bcrypt';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../utils/env';
import { AppError } from '../utils/appError';
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
			throw AppError.conflict('Email já cadastrado');
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({ data: { email, passwordHash } });

		if (!user?.id) {
			throw AppError.internal('Erro ao criar usuário');
		}

		const tokens = generateTokens(user.id);

		return { user: { id: user.id, email: user.email }, ...tokens };
	};

	login = async ({ email, password }: LoginInput): Promise<{ user: AuthUser } & Tokens> => {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw AppError.unauthorized('Credenciais inválidas');
		}

		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) {
			throw AppError.unauthorized('Credenciais inválidas');
		}

		const tokens = generateTokens(user.id);
		return { user: { id: user.id, email: user.email }, ...tokens };
	};

	me = async (userId: string): Promise<AuthUser> => {
		const user = await prisma.user.findUnique({ where: { id: userId } });

		if (!user) {
			throw AppError.notFound('Usuário não encontrado');
		}

		return { id: user.id, email: user.email };
	};

	refresh = async (refreshToken: RefreshInput['refreshToken']): Promise<Tokens> => {
		try {
			const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { sub: string };
			return generateTokens(payload.sub);
		} catch {
			throw AppError.unauthorized('Refresh token inválido');
		}
	};
}

export const authService = new AuthService();


