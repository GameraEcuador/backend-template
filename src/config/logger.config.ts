import pino, { Logger } from 'pino';

const isProd = process.env.NODE_ENV === 'production';

export const logger: Logger = pino({
    level: isProd ? 'info' : 'debug',
    transport: isProd
        ? undefined
        : {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard'
            }
        }
});
