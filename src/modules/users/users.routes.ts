import { Router } from "express";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller.js";
import { validate } from "../../middlewares/validate-request.middleware.js";
import { createUserSchema, getUserByIdSchema } from "./users.validations.js";

export class UserRoutes {

    static get routes(): Router {
        const router = Router();

        const usersRepository = new UsersRepository();
        const usersService = new UsersService(usersRepository);
        const usersController = new UsersController(usersService);

        router.get('/', usersController.getAll);
        router.post('/create', validate(createUserSchema), usersController.create);
        router.get('/get-by-id/:id', validate(getUserByIdSchema, 'params'), usersController.getById);
        router.put('/update/:id', validate(getUserByIdSchema, 'params'), usersController.update);
        router.delete('/delete/:id', validate(getUserByIdSchema, 'params'), usersController.delete);

        return router;
    }
}