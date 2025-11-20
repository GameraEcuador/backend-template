import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.config.js';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    static async generateToken(payload: any, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration as any }, (err, token) => {
                if (err) return resolve(null);
                resolve(token || null);
            });
        });
    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err: any, decoded: any) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}
