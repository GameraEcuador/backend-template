import env from "env-var";
import 'dotenv/config';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    CORS_ORIGINS: env.get('CORS_ORIGINS').default('').asString(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),
    DB_MONGO_URL: env.get('DB_MONGO_URL').required().asString(),
    DB_MONGO_NAME: env.get('DB_MONGO_NAME').required().asString(),
    DB_MONGO_USER: env.get('DB_MONGO_USER').required().asString(),
    DB_MONGO_PASS: env.get('DB_MONGO_PASS').required().asString(),
    CLOUDINARY_CLOUD_NAME: env.get('CLOUDINARY_CLOUD_NAME').required().asString(),
    CLOUDINARY_API_KEY: env.get('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
    CLOUDINARY_FOLDER: env.get('CLOUDINARY_FOLDER').required().asString(),
    MAX_IMAGE_SIZE_MB: env.get('MAX_IMAGE_SIZE_MB').required().asIntPositive(),
};