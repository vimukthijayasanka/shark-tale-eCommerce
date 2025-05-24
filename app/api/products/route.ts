import { connectToDB } from "@/app/api/db";
import {corsHeaders} from "@/app/api/products/[id]/route";

export async function GET() {
    const {db} = await connectToDB();
    const products = await db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products),
        {status: 200,
        headers: {
            "Content-Type": "application/json",
            ... corsHeaders,
        }});
}