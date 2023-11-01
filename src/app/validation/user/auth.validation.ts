import Joi from 'joi';


const signUpSchema = Joi.object({
	firstName: Joi.string().required().label('First Name'),
	lastName: Joi.string().optional().label('Last Name'),
	email: Joi.string().required().email().label('Email'),
	phone: Joi.string().optional().label('Phone'),
	password: Joi.string().required().label('Password')
});


const signInSchema = Joi.object({
	email: Joi.string().required().email().label('Email'),
	password: Joi.string().required().label('Password')
});

const updateProfileSchema = Joi.object({
	firstName: Joi.string().required().label('First Name'),
	lastName: Joi.string().optional().label('Last Name'),
	email: Joi.string().required().email().label('Email'),
	phone: Joi.string().optional().label('Phone')
});

export const authValidation = {
	signUpSchema, signInSchema, updateProfileSchema
};