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

    getAll = async () => await this.usersRepository.getAll();

    getById = async (id: string) => {
        const user = await this.usersRepository.getById(id);
        if (!user) HandlerErrors.notFound('Usuario no encontrado');
        return user;
    }

    update = async (id: string, user: Partial<User>) => {
        const updatedUser = await this.usersRepository.update(id, user);
        if (!updatedUser) HandlerErrors.notFound('Usuario no encontrado');
        return updatedUser;
    }

    delete = async (id: string) => {
        const deletedUser = await this.usersRepository.delete(id);
        if (!deletedUser) HandlerErrors.notFound('Usuario no encontrado');
        return deletedUser;
    }
}