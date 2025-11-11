import { UserModel } from "../../models/user.model.js";
import { User } from "./users.interface.js";

export class UsersRepository {

    constructor() { }

    create = async (user: User): Promise<User | null> => {
        const createdUser = await UserModel.create(user);
        return createdUser;
    }

    findByEmail = async (email: string): Promise<User | null> => {
        const user = await UserModel.findOne({ email });
        return user;
    }

    getAll = async () => await UserModel.find();

    getById = async (id: string): Promise<User | null> => {
        const user = await UserModel.findById(id);
        return user;
    }

    update = async (id: string, user: Partial<User>) => {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
        return updatedUser;
    }

    delete = async (id: string) => {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser;
    }

}