import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb';

export async function connectToDB() {
    console.log("MONGODB_USER:", process.env.MONGODB_USER);
    console.log("MONGODB_PASSWORD:", process.env.MONGODB_PASSWORD);

    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@sharktale0.a9mrneu.mongodb.net/?retryWrites=true&w=majority&appName=SharkTale0`;
    console.log(uri);

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        const db = client.db('sharktale-db');
        const productionCollection = db.collection('carts');

        const result = await productionCollection.insertMany([
            {
                userId: '1', cartIds: ['p001', 'p002']
            },
            {
                userId: '2', cartIds: ['p003', 'p004']
            }
        ]);
        console.log("inserted document =>", result.insertedCount);
    } finally {
        await client.close();
    }
}

connectToDB().catch(console.error);
