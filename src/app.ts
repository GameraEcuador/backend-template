import { envs } from "./config/envs.config.js";
import { MongoDataBase } from "./config/mongodb.config.js";

(async () => {
    main();
})();

async function main() {
    await MongoDataBase.connect({
        connectionUrl: envs.DB_MONGO_URL,
        dbName: envs.DB_MONGO_NAME,
    });
}