import { UnprocessableEntity, NotFound } from 'http-errors';
import User, { UserI } from '../../model/user.model';


const createUser = async (user: UserI) => {
	const userExist = await User.findOne({ email: user.email });
	if (userExist) throw new UnprocessableEntity('Email already exist');
	if (user.phone) {
		const userExist = await User.findOne({ phone: user.phone });
		if (userExist) throw new UnprocessableEntity('Phone already exist');
	}
	const newUser = await User.create(user);
	return newUser;
};

const findByEmail = async (email: string) => {
	return await User.findOne({ email: email });
};


const findById = async (id: string) => {
	return await User.findById(id);
};


const updateUser = async (user: UserI | any) => {
	const existUser: UserI | any = await User.findById(user._id);
	if (!existUser) throw new NotFound('User not found');
	if (user.email) {
		const checkUserExist = await User.findOne({
			email: user.email, _id: {
				$ne: user._id
			}
		});
		if (checkUserExist) throw new UnprocessableEntity('Email already exist');
	}
	if (user.phone) {
		const checkUserExist = await User.findOne({
			phone: user.phone, _id: {
				$ne: user._id
			}
		});
		if (checkUserExist) throw new UnprocessableEntity('Phone already exist');
	}

	Object.keys(user).forEach(key => {
		existUser[key] = user[key];
	});
	return await existUser.save();

};


export const userService = {
	createUser, findByEmail, findById, updateUser
};