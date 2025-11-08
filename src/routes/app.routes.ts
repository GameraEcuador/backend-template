import { Request, Response, Router } from "express";
import z from "zod";
import { validate } from "../middlewares/validate-request.js";


const healthCheckSchema = z.object({
    name: z.string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }).
        max(30)
});


export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.post('/health',
            validate(healthCheckSchema, 'body'),
            (req: Request, res: Response) => {
                const { name } = req.body;
                res.status(200).json({ status: 'OK', name });
            });
        return router;
    }
}