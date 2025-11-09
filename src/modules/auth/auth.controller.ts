import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { logger } from "../../config/logger.config.js";

export class AuthController {



    constructor(
        private readonly authService: AuthService
    ) { }

    login = (req: Request, res: Response) => {
        const { email, password } = req.body;

        logger.info(`Login attempt for email: ${email}`);
        const user = this.authService.login(email, password);

        res.status(200)
            .json({
                message: "Login successful",
                user
            });
    }


}