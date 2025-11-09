import mongoose from "mongoose";
import { logger } from "./logger.config.js";

interface MongoOptions {
    connectionUrl: string;
    dbName: string;
}

export class MongoDataBase {
    static async connect(options: MongoOptions): Promise<void> {
        const { connectionUrl, dbName } = options;

        try {
            logger.info(`Connecting to MongoDB at ${connectionUrl}`);
            await mongoose.connect(connectionUrl, { dbName });
            logger.info(`Connected to MongoDB: ${dbName}`);
        } catch (error) {
            logger.error(error, "Failed to connect to MongoDB");
            throw error;
        }
    }

    static async disconnect() {
        await mongoose.disconnect();
        logger.info("Disconnected from MongoDB");
    }
}
