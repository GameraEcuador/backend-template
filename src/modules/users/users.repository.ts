import { UserModel } from "../../models/user.model.js";
import { User } from "./users.interface.js";

export class UsersRepository {

    constructor() { }

    create = async (user: User): Promise<User | null> => {
        const createdUser = await UserModel.create(user);
        return createdUser;
    }

    update = () => { }
    delete = () => { }
    getById = () => { }
    getAll = () => { }

}