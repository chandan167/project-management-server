import Jwt from 'jsonwebtoken';
import fs from 'fs';
import { environment } from '../../config/env';

const authTokenSub: string = 'auth.token';
const refreshTokenSub: string = 'refresh.token';

const privatekey = fs.readFileSync('cert/private.key');
const publickey = fs.readFileSync('cert/public.key');


const generateAuthToken = (payload:any) => {
	return Jwt.sign(payload, privatekey, {algorithm: 'RS256', expiresIn: environment.JWT_AUTH_TOKEN_EXPIRY_TIME, subject: authTokenSub});
};

const generateRefreshToken = (payload:any) => {
	return Jwt.sign(payload, privatekey, {algorithm: 'RS256', expiresIn: environment.JWT_REFRESH_TOKEN_EXPIRY_TIME, subject: refreshTokenSub});
};

const verifyAuthToken = (token:string) => {
	return Jwt.verify(token, publickey, {algorithms: ['RS256'], subject: authTokenSub});
};

const verifyRefreshToken = (token:string) => {
	return Jwt.verify(token, publickey, {algorithms: ['RS256'], subject: refreshTokenSub});
};


export const jwtService = {
	generateAuthToken, generateRefreshToken, verifyAuthToken, verifyRefreshToken
};