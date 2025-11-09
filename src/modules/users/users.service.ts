import { User } from "./users.interface.js"
import { UsersRepository } from "./users.repository.js"

export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    create = async (data: User): Promise<[boolean, User | null]> => {
        const createdUser = await this.usersRepository.create(data);
        return createdUser ? [true, createdUser] : [false, null];
    }

    update = () => { }
    delete = () => { }
    getById = () => { }
    getAll = () => { }
}