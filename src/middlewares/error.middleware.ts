import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.config.js";

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${err.status || 500} | Message:: ${err.message}`);
    res.status(500).json({
        ok: false,
        msg: "Internal Server Error",
        content: null,
    });
}
