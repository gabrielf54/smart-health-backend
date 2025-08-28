import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/appError';

export const validateBody = <T,>(schema: ZodSchema<T>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const parsed = schema.safeParse(req.body);
		if (!parsed.success) return next(AppError.badRequest('Dados inválidos', parsed.error.flatten()));
		(req as any).validated = parsed.data;
		return next();
	};
};


