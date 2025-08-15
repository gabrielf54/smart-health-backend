import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const parsed = schema.safeParse(req.body);
		if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
		(req as any).validated = parsed.data;
		return next();
	};
}


