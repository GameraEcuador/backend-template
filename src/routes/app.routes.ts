import { Response, Router } from "express";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();
        router.get('/health', (_, res: Response) => {
            res.status(200).json({ status: 'OK' });
        });
        return router;
    }
}