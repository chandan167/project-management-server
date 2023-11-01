import { NextFunction, Request, RequestHandler, Response, Router } from 'express';


export const groupRoute = (callback : (router: Router) => void) => {
	const router = Router();
	callback(router);
	return router;
};

export const asyncResolver= (fun:RequestHandler) => (req:Request, res:Response, next:NextFunction) => Promise.resolve(fun(req, res, next)).catch(next);