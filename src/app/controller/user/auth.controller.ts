import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Unauthorized } from 'http-errors';
import { UserI } from '../../model/user.model';
import { authService } from '../../service/user/auth.service';
import { jwtService } from '../../service/jwt.service';
import { StatusCodes } from 'http-status-codes';


const signUpHandler: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
	const user = req.body as UserI;
	const newUser = await authService.signUp(user);
	const token = {
		authToken: jwtService.generateAuthToken({ id: newUser._id }),
		refreshToken: jwtService.generateRefreshToken({ id: newUser._id }),
	};
	return res.status(StatusCodes.OK).json({ user: newUser, token });
};


const signInHandler: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
	const { email, password } = req.body as UserI;
	const user = await authService.signIn(email, password);
	if (!user) throw new Unauthorized('Invalid credentials');
	const token = {
		authToken: jwtService.generateAuthToken({ id: user._id }),
		refreshToken: jwtService.generateRefreshToken({ id: user._id }),
	};
	return res.json({ user, token });
};


const profileHandler:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
	const user = await req.auth?.user();
	return res.json({user});
};

const updateProfileHandler:RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
	const updateData = req.body as UserI;
	updateData._id = req.auth?.id as string;
	const user = await authService.updateProfile(updateData);
	return res.json({user});
};


export const authController = {
	signUpHandler, signInHandler, profileHandler, updateProfileHandler
};