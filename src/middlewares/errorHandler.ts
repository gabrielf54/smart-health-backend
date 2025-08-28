import { NextFunction, Request, Response } from 'express';
import { AppError, type ErrorResponseBody } from '../utils/appError';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
	const isAppError = err instanceof AppError;
	const status = isAppError ? err.status : (typeof (err as any)?.status === 'number' ? (err as any).status : 500);
	const code = isAppError ? err.code : 'INTERNAL_ERROR';
	const message = (err as any)?.message ?? 'Internal Server Error';
	const details = (err as any)?.details ?? undefined;

	const body: ErrorResponseBody = {
		error: {
			code,
			message,
			...(details ? { details } : {}),
		},
	};

	return res.status(status).json(body);
};


