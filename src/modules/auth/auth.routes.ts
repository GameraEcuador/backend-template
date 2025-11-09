import { Router } from "express";
import { AuthService } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { AuthRepository } from "./auth.repository.js";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate-request.middleware.js";

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