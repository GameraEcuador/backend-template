import { envs } from "./config/envs.config.js";
import { Logger } from "./config/logger.config.js";

const logger = Logger.getInstance();

(async () => {
    logger.info(`Starting server on port ${envs.PORT}...`);

})();