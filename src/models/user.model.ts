import { model, Schema } from "mongoose";

interface UserModel {
    id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserModel>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model<UserModel>('User', userSchema);