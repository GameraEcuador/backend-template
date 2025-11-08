import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {

    constructor(private authService: AuthService) { }

    login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = this.authService.login(email, password);
        res.status(200)
            .json({
                message: "Login successful",
                user
            });
    }


}