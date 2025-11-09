import { Request, Response } from "express";
import { Logger } from "../../config/logger.config.js";
import { AuthService } from "./auth.service.js";

export class AuthController {


    private readonly logger = Logger.getInstance();

    constructor(
        private readonly authService: AuthService
    ) { }

    login = (req: Request, res: Response) => {
        const { email, password } = req.body;

        this.logger.info(`Login attempt for email: ${email}`);
        const user = this.authService.login(email, password);

        res.status(200)
            .json({
                message: "Login successful",
                user
            });
    }


}