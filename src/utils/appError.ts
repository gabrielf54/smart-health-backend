export type ErrorDetails = unknown;

export class AppError extends Error {
	status: number;
	code: string;
	details?: ErrorDetails;

	constructor(params: { code: string; message: string; status: number; details?: ErrorDetails }) {
		super(params.message);
		this.name = 'AppError';
		this.status = params.status;
		this.code = params.code;
		this.details = params.details;
		Object.setPrototypeOf(this, AppError.prototype);
	}

	static badRequest(message: string, details?: ErrorDetails) {
		return new AppError({ code: 'BAD_REQUEST', message, status: 400, details });
	}

	static unauthorized(message: string, details?: ErrorDetails) {
		return new AppError({ code: 'UNAUTHORIZED', message, status: 401, details });
	}

	static forbidden(message: string, details?: ErrorDetails) {
		return new AppError({ code: 'FORBIDDEN', message, status: 403, details });
	}

	static notFound(message: string, details?: ErrorDetails) {
		return new AppError({ code: 'NOT_FOUND', message, status: 404, details });
	}

	static conflict(message: string, details?: ErrorDetails) {
		return new AppError({ code: 'CONFLICT', message, status: 409, details });
	}

	static internal(message: string, details?: ErrorDetails) {
		return new AppError({ code: 'INTERNAL_ERROR', message, status: 500, details });
	}
}

export type ErrorResponseBody = {
	error: {
		code: string;
		message: string;
		details?: ErrorDetails;
	};
};


