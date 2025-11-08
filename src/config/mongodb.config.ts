import mongoose from "mongoose";
import { Logger } from "./logger.config.js";

interface MongoOptions {
    connectionUrl: string;
    dbName: string;
}

const logger = Logger.getInstance();

export class MongoDataBase {
    static async connect(options: MongoOptions): Promise<void> {
        const { connectionUrl, dbName } = options;

        try {
            logger.info(`⏳ Connecting to MongoDB at ${connectionUrl}`);
            await mongoose.connect(connectionUrl, { dbName });
            logger.info(`✅ Connected to MongoDB: ${dbName}`);
        } catch (error) {
            logger.error("❌ Error connecting to MongoDB", { error });
            throw error; // opcional: propagar el error
        }
    }

    static async disconnect() {
        await mongoose.disconnect();
        logger.info("🔌 Disconnected from MongoDB");
    }
}
