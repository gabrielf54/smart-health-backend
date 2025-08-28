import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env';
import { AppError } from '../utils/appError';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const header = req.headers.authorization;
	if (!header?.startsWith('Bearer ')) return next(AppError.unauthorized('Não autenticado'));
	const token = header.substring('Bearer '.length);
	try {
		const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
		(req as any).userId = payload.sub;
		return next();
	} catch {
		return next(AppError.unauthorized('Token inválido'));
	}
};


