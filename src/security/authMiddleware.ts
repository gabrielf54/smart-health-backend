import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const header = req.headers.authorization;
	if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Não autenticado' });
	const token = header.substring('Bearer '.length);
	try {
		const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
		(req as any).userId = payload.sub;
		return next();
	} catch {
		return res.status(401).json({ error: 'Token inválido' });
	}
}


