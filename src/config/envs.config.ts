import env from "env-var";
import 'dotenv/config';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    CORS_ORIGINS: env.get('CORS_ORIGINS').default('').asString(),
    DB_MONGO_URL: env.get('DB_MONGO_URL').required().asString(),
    DB_MONGO_NAME: env.get('DB_MONGO_NAME').required().asString(),
    DB_MONGO_USER: env.get('DB_MONGO_USER').required().asString(),
    DB_MONGO_PASS: env.get('DB_MONGO_PASS').required().asString(),
};