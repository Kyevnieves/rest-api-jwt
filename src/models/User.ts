import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
	username: string;
    email: string;
    password: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const validatePassword = async (password: string, passwordBD: string): Promise<boolean> => {
    return await bcrypt.compare(password, passwordBD);
};

export default model<IUser>('User', userSchema);