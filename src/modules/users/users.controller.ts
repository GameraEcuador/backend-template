import { Request, Response } from "express";
import { UsersService } from "./users.service.js";

export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    create = async (req: Request, res: Response) => {
        const body = req.body;
        const [isCreated, data] = await this.usersService.create(body);

        if (!isCreated || !data) {
            res.status(400).json({
                ok: false,
                msg: 'User could not be created',
                content: null
            });
            return;
        }

        res.status(201).json({
            ok: true,
            msg: `User ${data.name} created successfully`,
            content: data
        });
        return
    }

    update = (req: Request, res: Response) => { }
    delete = (req: Request, res: Response) => { }
    getById = (req: Request, res: Response) => { }
    getAll = (req: Request, res: Response) => { }
}