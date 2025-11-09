import { model, Schema } from "mongoose";
import { createTransform } from "../helpers/mongooseTransform.js";

interface UserModel {
    id: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserModel>({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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