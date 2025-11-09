import PinoHttpRaw from 'pino-http';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import { logger } from '../config/logger.config.js';

export const httpLogger = () => {
    const pinoHttp = (PinoHttpRaw as any).default ?? (PinoHttpRaw as any);
    return pinoHttp({
        logger,
        genReqId: (req: Request) =>
            (req.headers['x-request-id'] as string) || randomUUID(),
        customSuccessMessage: (req: Request, res: Response) =>
            `${req.method} ${req.url} -> ${res.statusCode}`,
        customErrorMessage: (req: Request, _: Response, err: Error) =>
            `ERR ${req.method} ${req.url}: ${err.message}`,
        serializers: {
            req: (req: Request) => ({ method: req.method, url: req.url }),
            res: (res: Response) => ({ statusCode: res.statusCode }),
        },
    });
};
