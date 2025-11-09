import http from 'http';
import cors from "cors";
import express, { Router } from "express";

import { logger } from './config/logger.config.js';
import { httpLogger } from './middlewares/logger-request.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

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
    private readonly jsonParser = express.json();
    private readonly httpLogger = httpLogger();
    private readonly server = http.createServer(this.app);

    constructor(options: Options) {
        const { port, origins, routes } = options;
        this.port = port;
        this.routes = routes;
        this.origins = origins;
    }

    private middlewares() {
        const originsArray: string[] = this.origins.split(',').map(origin => origin.trim());
        logger.info(`CORS Origins: ${JSON.stringify(originsArray)}`);

        this.app.use(this.httpLogger);
        this.app.use(this.jsonParser);
        this.app.use(this.cors({
            origin: originsArray,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use(this.routes);
        this.app.use(errorMiddleware);
    }

    async start() {
        this.middlewares();
        this.server.listen(this.port, () => {
            logger.info(`Server is running on port ${this.port}`);
        });
    }

}