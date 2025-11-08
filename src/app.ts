import { envs } from "./config/envs.config.js";
import { MongoDataBase } from "./config/mongodb.config.js";
import { AppRoutes } from "./routes/app.routes.js";
import { Server } from "./server.js";

(async () => {
    main();
})();

async function main() {
    await MongoDataBase.connect({
        connectionUrl: envs.DB_MONGO_URL,
        dbName: envs.DB_MONGO_NAME,
    });

    const server = new Server({
        port: envs.PORT,
        origins: envs.CORS_ORIGINS,
        routes: AppRoutes.routes
    });
    await server.start();
}