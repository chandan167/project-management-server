import { genSalt, hash } from 'bcrypt';
import { InferSchemaType, Schema, model } from 'mongoose';
import { environment } from '../../config/env';



const userSchema = new Schema({
	firstName: { type: String, required: [true, 'First Name is required'] },
	lastName: { type: String, default: null },
	email: { type: String, required: [true, 'Email is required'], unique: true },
	phone: { type: String, default: null, index: true },
	emailVerifyAt: { type: Date, default: null },
	phoneVerifyAt: { type: Date, default: null },
	password: { type: String, required: [true, 'Password is required'] }
}, {
	toJSON: {
		transform(doc, ret, options) {
			delete ret.password;
			delete ret.__v;
			ret.id = ret._id;
			return ret;
		},
	}
});

type UserType = InferSchemaType<typeof userSchema>;

export interface UserI extends UserType {
    _id: string
}


userSchema.pre('save', async function () {
	if (this.isModified('password')) {
		const salt = await genSalt(environment.PASSWORD_SALT);
		this.password = await hash(this.password, salt);
	}
	if (this.isModified('firstName')) this.firstName = this.firstName.toLowerCase();
	if (this.isModified('lastName')) this.lastName = this.lastName?.toLowerCase();
	if (this.isModified('email')) this.email = this.email?.toLowerCase();
});


const User = model('User', userSchema);

export default User;