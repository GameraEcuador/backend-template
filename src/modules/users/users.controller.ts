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
    }

    update = (req: Request, res: Response) => { }
    delete = (req: Request, res: Response) => { }
    getById = (req: Request, res: Response) => { }
    getAll = (req: Request, res: Response) => { }
}