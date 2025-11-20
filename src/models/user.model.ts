import { model, Schema } from "mongoose";
import { createTransform } from "../helpers/mongoose-transform.helper.js";

interface UserModel {
    id: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    birthdate: Date;
    photoUrl: string | null;
    phoneNumber: string;
    isOnline: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserModel>({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: false },
    photoUrl: { type: String, required: false, default: null },
    phoneNumber: { type: String, required: false },
    isOnline: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    {
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: createTransform('password')
        }
    }

);

export const UserModel = model<UserModel>('User', userSchema);