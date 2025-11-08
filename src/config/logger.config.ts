import pino, { Logger as PinoLogger } from "pino";

export class Logger {
    private static instance: Logger;
    private logger: PinoLogger;

    private constructor() {
        this.logger = pino({
            level: process.env.NODE_ENV === "production" ? "info" : "debug",
            transport:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : {
                        target: "pino-pretty",
                        options: { colorize: true, translateTime: true },
                    },
        });
    }

    // Patrón Singleton: devuelve siempre la misma instancia
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    // Métodos para cada nivel
    public info(msg: string, meta?: any) {
        this.logger.info(meta || {}, msg);
    }

    public debug(msg: string, meta?: any) {
        this.logger.debug(meta || {}, msg);
    }

    public warn(msg: string, meta?: any) {
        this.logger.warn(meta || {}, msg);
    }

    public error(msg: string, meta?: any) {
        this.logger.error(meta || {}, msg);
    }

    public fatal(msg: string, meta?: any) {
        this.logger.fatal(meta || {}, msg);
    }
}
