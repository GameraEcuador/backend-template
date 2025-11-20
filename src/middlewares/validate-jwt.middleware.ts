import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../adapters/jwt.adapte.js';

export interface AuthenticatedRequest extends Request {
    uid?: string;
}

export const validateJWT = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = req.header('gamera-token');

        if (!token) {
            res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición',
                content: null
            });
            return;
        }

        const payload: any = await JwtAdapter.validateToken(token);

        req.uid = payload.uid;

        next();
    } catch (e) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es válido',
            content: e
        });
    }
};

