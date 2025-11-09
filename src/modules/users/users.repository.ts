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

    update = () => { }
    delete = () => { }
    getById = () => { }
    getAll = () => { }

}