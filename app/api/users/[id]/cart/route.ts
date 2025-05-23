import { NextRequest } from "next/server";
import {connectToDB} from "@/app/api/db";

// type ShoppingCart = Record<string, string[]>;
//
// const carts: ShoppingCart = {
//     '1': ['p001', 'p002'],
//     '2': ['p003', 'p004'],
//     '3': ['p004'],
// }

type Params = { id: string; }
type CartBody = {productId: string};

export async function GET(request:NextRequest, {params}: {params: Params}) {
   const {db} = await connectToDB();

    const userId = params.id;
    const userCart = await db.collection('carts').findOne({userId});

    if (!userCart) {

        return new Response(JSON.stringify([]),{
            status: 200,
            headers: {"Content-Type": "application/json",}
        });
    }

    const cartIds = userCart.cartIds;
    const cartProducts = await db.collection('products')
        .find({id: {$in: cartIds}}).toArray();

    return new Response(JSON.stringify(cartProducts), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        })
}

export async function POST(request:NextRequest, {params}: {params: Params}) {
    const {db} = await connectToDB();

    const userId = params.id;
    const body: CartBody = await request.json();
    const productId = body.productId;

    const result = await db.collection('carts')
        .findOneAndUpdate(
            { userId },
            { $push: { cartIds: {$each:[productId] } } },
            { upsert: true, returnDocument: 'after' });

    if (!result.value) {
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }

    const cartIds = result.value.cartIds;
    const cartProducts = await db.collection('products')
        .find({ id: { $in: cartIds } }).toArray();


    return new Response(JSON.stringify(cartProducts), {
        status: 201,
        headers: {"Content-Type": "application/json",}
    })
}

export async function DELETE(request:NextRequest, {params}: {params: Params}) {
    const {db} = await connectToDB();
    const userId = params.id;
    const body: CartBody = await request.json();
    const productId = body.productId;

    const result = await db.collection('carts')
        .findOneAndUpdate(
            { userId },
            { $pull: {cartIds: {$each:[productId] } } },
            { returnDocument: 'after' });

    const cartIds = result.value?.cartIds ?? [];
    const cartProducts = await db.collection('products').find({id: { $in: cartIds.cartIds}}).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 202,
        headers: {"Content-Type": "application/json",}
    })
}