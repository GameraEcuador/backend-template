import { Router } from "express";
import { UserRoutes } from "../modules/users/users.routes.js";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/users', UserRoutes.routes);
        return router;
    }
}