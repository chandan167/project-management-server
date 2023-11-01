import { userService } from '../../service/user/user.service';
import { Unauthorized } from 'http-errors';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { asyncResolver } from '../../../utils/helper';
import { jwtService } from '../../service/jwt.service';



const checkUserLogin = (): RequestHandler => {
	return asyncResolver((req: Request, res: Response, next: NextFunction) => {
		const authorization = req.headers['authorization'];
		if (!authorization) throw new Unauthorized();
		const [tokenType, token] = authorization.split(' ');
		if (tokenType?.toLowerCase() != 'bearer' || !token) throw new Unauthorized('Invalid token');
		try {
			const decode: any = jwtService.verifyAuthToken(token);
			req.auth = {
				...decode,
				user: () => userService.findById(decode.id)
			};
			next();
		} catch (error: any) {
			next(new Unauthorized('Invalid Token'));
		}
	});
};

export const authMiddleware = {
	checkUserLogin
};