import { NextRequest } from "next/server";
import { connectToDB } from "@/app/api/db";

type Params = {
    id: string;
}

// CORS Headers
export const corsHeaders = {
    "Access-Control-Allow-Origin": "https://shark-tale-e-commerce.vercel.app", // or specific domain in production
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}


export async function GET(request: NextRequest, {params}: {params: Params}) {
    const {db} = await connectToDB();

    const productId = params.id;

    const product = await db.collection("products").findOne({
        id: productId
    })

    if (!product) {
        return new Response('Product not found!', {
            status: 404,
            headers: corsHeaders,
        });
    }

    return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            ... corsHeaders,
        },
    });
}
