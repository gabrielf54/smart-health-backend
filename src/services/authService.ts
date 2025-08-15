import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../utils/env';

function generateTokens(userId: string) {
	const accessToken = jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
	const refreshToken = jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, {
		expiresIn: env.JWT_REFRESH_EXPIRES_IN,
	});
	return { accessToken, refreshToken };
}

export const authService = {
	async register({ email, password }: { email: string; password: string }) {
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) throw Object.assign(new Error('Email já cadastrado'), { status: 409 });
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({ data: { email, passwordHash } });
		const tokens = generateTokens(user.id);
		return { user: { id: user.id, email: user.email }, ...tokens };
	},
	async login({ email, password }: { email: string; password: string }) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) throw Object.assign(new Error('Credenciais inválidas'), { status: 401 });
		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) throw Object.assign(new Error('Credenciais inválidas'), { status: 401 });
		const tokens = generateTokens(user.id);
		return { user: { id: user.id, email: user.email }, ...tokens };
	},
	async me(userId: string) {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });
		return { id: user.id, email: user.email };
	},
	async refresh(refreshToken: string) {
		try {
			const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { sub: string };
			return generateTokens(payload.sub);
		} catch {
			throw Object.assign(new Error('Refresh token inválido'), { status: 401 });
		}
	},
};


