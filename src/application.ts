import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { NotFound, HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { environment } from './config/env';
import { router } from './app/router/router';
import { UserI } from './app/model/user.model';


declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			auth?: {
				user: () => Promise<UserI>;
				id: string
				iat: number;
				exp: number
				sub: string
			}

		}
	}
}

export const application = express();

application.use(express.json()).use(morgan('dev')).use(express.urlencoded({ extended: true }));


application.use(router);


application.use((req: Request, res: Response, next: NextFunction) => {
	next(new NotFound('Route not found'));
});



application.use((error: any, req: Request, res: Response, next: NextFunction) => {
	const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = error?.message || 'Something went wrong';

	if (error instanceof HttpError) {
		return res.status(status).json({ message: message });
	}

	if (environment.isDev || environment.isTest) {
		return res.status(status).json({ message: message, stack: error.stack });
	}

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
});

