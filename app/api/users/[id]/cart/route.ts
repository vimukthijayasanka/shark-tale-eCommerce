import { NextRequest } from "next/server";
import {products} from "@/app/product-data";

type ShoppingCart = Record<string, string[]>;

const carts: ShoppingCart = {
    '1': ['p001', 'p002'],
    '2': ['p003', 'p004'],
    '3': ['p004'],
}

type Params = {
    id: string;
}


export async function GET(request:NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const productIds = carts[userId];
    const cartProducts = productIds.map(id=> products.find(p=>p.id===id));

    if (productIds === undefined) {
        return new Response(JSON.stringify([]),{
            status: 200,
            headers: {"Content-Type": "application/json",}
        });
    }

    return new Response(JSON.stringify(cartProducts), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        })
    }

type CartBody = {productId: string};

export async function POST(request:NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const body: CartBody = await request.json();
    const productId = body.productId;

    carts[userId] = carts[userId] ? carts[userId].concat(productId) : [productId];
    const cartProducts =carts[userId].map(id=> products.find(p=>p.id===id));

    return new Response(JSON.stringify([cartProducts]), {
        status: 201,
        headers: {"Content-Type": "application/json",}
    })
}

export async function DELETE(request:NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const body = await request.json();
    const productId = body.productId;

    carts[userId] = carts[userId] ? carts[userId].filter(pid => pid !== productId) : [];

    return new Response(JSON.stringify(carts[userId]), {
        status: 202,
        headers: {"Content-Type": "application/json",}
    })
}