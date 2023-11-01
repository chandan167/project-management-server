import { asyncResolver } from './helper';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'joi';




type RequestKey = 'body'|'query'|'params';


export class Validate{
	static body(schema:Schema){
		return validateSchema(schema, 'body');
	}

	static query(schema:Schema){
		return validateSchema(schema, 'query');
	}

	static params(schema:Schema){
		return validateSchema(schema, 'params');
	}
}



export function validateSchema (schema:Schema, key:RequestKey){
	return asyncResolver(async (req:Request, res:Response, next:NextFunction) =>{
		try {
			const value = await schema.validateAsync(req[key], {
				abortEarly: true,
				allowUnknown: false
			});
			req[key] = value;
			next();
		}
		catch (error:ValidationError|any) { 
			const message = error?.details[0]?.message;
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message});
		}
	});
}

