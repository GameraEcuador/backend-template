import http from 'http';
import cors from "cors";
import express from "express";
import { Logger } from './config/logger.config.js';

interface Options {
    port: number;
    origins: string;
}

export class Server {

    private port: number;
    private origins: string;

    private readonly cors = cors;
    private readonly app = express();
    private readonly logger = Logger.getInstance();
    private readonly server = http.createServer(this.app);

    constructor(options: Options) {
        const { port, origins } = options;
        this.port = port;
        this.origins = origins;
    }

    middlewares() {
        const originsArray: string[] = this.origins.split(',').map(origin => origin.trim());
        this.logger.info(`CORS Origins: ${JSON.stringify(originsArray)}`);
        this.app.use(this.cors({
            origin: originsArray,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }

    async start() {
        this.middlewares();
        this.server.listen(this.port, () => {
            this.logger.info(`Server is running on port ${this.port}`);
        });
    }

}