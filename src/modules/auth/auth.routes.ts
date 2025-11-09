import { Router } from "express";
import { validate } from "../../middlewares/validate-request.js";
import { loginSchema } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { AuthRepository } from "./auth.repository.js";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const authRepository = new AuthRepository();
        const authService = new AuthService(authRepository);
        const authController = new AuthController(authService);

        router.post('/login',
            validate(loginSchema),
            authController.login
        );
        return router;
    }
}