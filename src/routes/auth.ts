import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../utils/env';
import { authMiddleware } from '../security/authMiddleware';

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
	const parse = registerSchema.safeParse(req.body);
	if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

	const { email, password } = parse.data;
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) return res.status(409).json({ error: 'Email já cadastrado' });

	const passwordHash = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({ data: { email, passwordHash } });
	const tokens = generateTokens(user.id);
	return res.status(201).json({ user: { id: user.id, email: user.email }, ...tokens });
});

authRouter.post('/login', async (req, res) => {
	const parse = loginSchema.safeParse(req.body);
	if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
	const { email, password } = parse.data;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });
	const tokens = generateTokens(user.id);
	return res.json({ user: { id: user.id, email: user.email }, ...tokens });
});

authRouter.get('/profile', authMiddleware, async (req, res) => {
	const userId = (req as any).userId as string;
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
	return res.json({ id: user.id, email: user.email });
});

authRouter.post('/refresh', async (req, res) => {
	const token = req.body?.refreshToken as string | undefined;
	if (!token) return res.status(400).json({ error: 'refreshToken é obrigatório' });
	try {
		const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
		const tokens = generateTokens(payload.sub);
		return res.json(tokens);
	} catch {
		return res.status(401).json({ error: 'Refresh token inválido' });
	}
});

authRouter.post('/logout', (_req, res) => {
	return res.status(204).send();
});

function generateTokens(userId: string) {
	const accessToken = jwt.sign({ sub: userId }, env.JWT_SECRET, {
		expiresIn: env.JWT_EXPIRES_IN,
	});
	const refreshToken = jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, {
		expiresIn: env.JWT_REFRESH_EXPIRES_IN,
	});
	return { accessToken, refreshToken };
}


