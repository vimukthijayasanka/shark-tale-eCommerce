import dotenv from "dotenv";
dotenv.config();
import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDB() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@sharktale0.a9mrneu.mongodb.net/?retryWrites=true&w=majority&appName=SharkTale0`;
    console.log(uri);

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();

    cachedClient = client;
    cachedDb = client.db('sharktale-db');

    return { client, db: client.db()}
}
