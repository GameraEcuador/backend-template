import { HandlerErrors } from "../../helpers/handler-errors.js";
import { User } from "./users.interface.js"
import { UsersRepository } from "./users.repository.js"

export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    create = async (data: User): Promise<User> => {
        const existingUser = await this.usersRepository.findByEmail(data.email);
        if (existingUser) HandlerErrors.badRequest('Este correo ya está registrado');

        const createdUser = await this.usersRepository.create(data);
        if (!createdUser) HandlerErrors.badRequest('No se pudo crear el usuario');

        return createdUser!;
    }

    update = () => { }
    delete = () => { }
    getById = () => { }
    getAll = () => { }
}