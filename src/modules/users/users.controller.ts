import { Request, Response } from "express";
import { UsersService } from "./users.service.js";

export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    create = async (req: Request, res: Response) => {
        const body = req.body;
        const user = await this.usersService.create(body);
        res.status(201).json({
            ok: true,
            msg: `El ${user.name} fue creado exitosamente`,
            content: user
        });
    };
    getAll = async (_: Request, res: Response) => {
        const users = await this.usersService.getAll();
        res.status(200).json({
            ok: true,
            content: users
        });
    };
    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await this.usersService.getById(id);
        res.status(200).json({
            ok: true,
            msg: `Usuario con ID ${id} obtenido exitosamente`,
            content: user
        });
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const body = req.body;
        const updatedUser = await this.usersService.update(id, body);
        res.status(200).json({
            ok: true,
            msg: `Usuario con ID ${id} actualizado exitosamente`,
            content: updatedUser
        });
    }
    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletedUser = await this.usersService.delete(id);
        res.status(200).json({
            ok: true,
            msg: `Usuario con ID ${id} eliminado exitosamente`,
            content: deletedUser
        });


    }
}