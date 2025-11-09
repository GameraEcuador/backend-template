import { User } from "./users.interface.js"
import { UsersRepository } from "./users.repository.js"

export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    create = async (data: User): Promise<[boolean, User | null, string?]> => {
        const existingUser = await this.usersRepository.findByEmail(data.email);
        if (existingUser) {
            return [false, null, 'Este correo ya está registrado'];
        }
        const createdUser = await this.usersRepository.create(data);
        return createdUser ? [true, createdUser] : [false, null, 'No se pudo crear el usuario'];
    }

    update = () => { }
    delete = () => { }
    getById = () => { }
    getAll = () => { }
}