import { MongoClient, Db, ServerApiVersion } from "mongodb";

// Define a type for the global cache object
interface GlobalWithMongoCache extends Global {
    _mongo?: {
        client: MongoClient;
        db: Db;
    };
}

// Cast globalThis to our custom type
const globalWithMongo = globalThis as GlobalWithMongoCache;

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@sharktale0.a9mrneu.mongodb.net/?retryWrites=true&w=majority&appName=SharkTale0`;

if (!process.env.MONGODB_USER || !process.env.MONGODB_PASSWORD) {
    throw new Error("Missing MongoDB credentials in environment variables.");
}

// Initialize global cache if it doesn't exist
if (!globalWithMongo._mongo) {
    globalWithMongo._mongo = {
        client: undefined as unknown as MongoClient,
        db: undefined as unknown as Db,
    };
}

export async function connectToDB() {
    if (globalWithMongo._mongo!.client && globalWithMongo._mongo!.db) {
        return {
            client: globalWithMongo._mongo!.client,
            db: globalWithMongo._mongo!.db,
        };
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect();
    const db = client.db("sharktale-db");

    globalWithMongo._mongo = { client, db };

    return { client, db };
}
