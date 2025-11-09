import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.config.js";

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) {

    let error;

    try {
        // Intentar parsear el mensaje del error como JSON
        error = JSON.parse(err.message);
    } catch {
        // Si no se puede parsear, usar el error original
        error = {
            status: 500,
            message: err.message || "Internal Server Error"
        };
    }

    logger.debug(error);

    res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Internal Server Error",
        content: null,
    });
}
