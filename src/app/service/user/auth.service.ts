import { compare } from 'bcrypt';
import { UserI } from '../../model/user.model';
import { userService } from './user.service';


const signUp = async (user: UserI) => {
	return await userService.createUser(user);
};

const signIn = async (email:string, password:string) => {
	const user = await userService.findByEmail(email);
	if(user && await compare(password, user.password)) return user;
	return null;
};

const updateProfile = async (user:UserI) => {
	const updatedUser = await userService.updateUser(user);
	return updatedUser;
};

export const authService = {
	signUp, signIn, updateProfile
};