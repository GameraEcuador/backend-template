import http from 'http';
import cors from "cors";
import express, { Router } from "express";
import { Logger } from './config/logger.config.js';

interface Options {
    port: number;
    routes: Router;
    origins: string;
}

export class Server {

    private readonly cors = cors;
    private readonly port: number;
    private readonly routes: Router;
    private readonly origins: string;
    private readonly app = express();
    private readonly logger = Logger.getInstance();
    private readonly server = http.createServer(this.app);

    constructor(options: Options) {
        const { port, origins, routes } = options;
        this.port = port;
        this.routes = routes;
        this.origins = origins;
    }

    private middlewares() {
        const originsArray: string[] = this.origins.split(',').map(origin => origin.trim());
        this.logger.info(`CORS Origins: ${JSON.stringify(originsArray)}`);
        this.app.use(this.cors({
            origin: originsArray,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use(this.routes);
    }

    async start() {
        this.middlewares();
        this.server.listen(this.port, () => {
            this.logger.info(`Server is running on port ${this.port}`);
        });
    }

}