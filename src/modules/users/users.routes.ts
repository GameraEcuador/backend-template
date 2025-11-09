import { Router } from "express";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller.js";
import { validate } from "../../middlewares/validate-request.middleware.js";
import { createUserSchema } from "./users.validations.js";

export class UserRoutes {

    static get routes(): Router {
        const router = Router();

        const usersRepository = new UsersRepository();
        const usersService = new UsersService(usersRepository);
        const usersController = new UsersController(usersService);

        router.post('/create', validate(createUserSchema), usersController.create);
        // router.post('/get-all');
        // router.post('/get-by-id/:id');
        // router.post('/update/:id');
        // router.post('/delete/:id');

        return router;
    }
}