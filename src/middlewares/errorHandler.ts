import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
	const anyErr = err as any;
	const status = typeof anyErr?.status === 'number' ? anyErr.status : 500;
	const message = anyErr?.message ?? 'Internal Server Error';
	return res.status(status).json({ error: message });
};


