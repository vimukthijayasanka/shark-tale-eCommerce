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
type CartBody = {
    productId: string;
    quantity: number;
};

interface CartItem {
    productId: string;
    quantity: number;
}

export interface CartResponse {
    _id: string,
    id: string,
    name: string,
    imageUrl: string,
    description: string,
    price: number,
    availability: string,
    stock: number,
    quantity: number;
}

export async function OPTIONS(request: NextRequest, { params }: { params: Params }) {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "https://shark-tale-e-commerce.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "86400" // Cache preflight
        }
    });
}

export async function GET(request:NextRequest, {params}: {params: Params}) {
   const {db} = await connectToDB();
   const userId = params.id;
   const userCart = await db.collection('carts').findOne({userId});

    if (!userCart) {
        return new Response(JSON.stringify([]),{
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://shark-tale-e-commerce.vercel.app",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }

    const cartItems = userCart.cartItems ?? [];
    const cartIds = cartItems.map((cartItem:CartItem) => cartItem.productId);

    const cartProducts = await db.collection('products')
        .find({id: {$in: cartIds}}).toArray();

    const quantityMap = new Map<string, number>();
    cartItems.forEach((item: CartItem) => {
        quantityMap.set(item.productId, item.quantity);
    });

    // Combine product data with quantity
    const response: CartResponse[] = cartProducts.map((product: any) => ({
        _id: product._id.toString(),
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        availability: product.availability,
        stock: product.stock,
        quantity: quantityMap.get(product.id) || 0,
    }));


    return new Response(JSON.stringify(response), {
            status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://shark-tale-e-commerce.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        })
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
    const { db } = await connectToDB();

    const userId = params.id;
    const body: CartBody = await request.json();
    const { productId, quantity } = body;

    const userCart = await db.collection('carts').findOne({ userId });

    if (userCart) {
        const existingItem = userCart.cartItems?.find((item: any) => item.productId === productId);

        if (existingItem) {
            // Increment quantity
            await db.collection('carts').updateOne(
                { userId, "cartItems.productId": productId },
                { $inc: { "cartItems.$.quantity": quantity || 1 } }
            );
        } else {
            // Add new product to cartItems
            await db.collection('carts').updateOne(
                { userId },
                {
                    $push: {
                        cartItems: {
                            productId,
                            quantity: quantity || 1
                        }
                    }
                }
            );
        }
    } else {
        // Create new cart document for user
        await db.collection('carts').insertOne({
            userId,
            cartItems: [
                {
                    productId,
                    quantity: quantity || 1
                }
            ]
        });
    }

    // Return updated cart
    const updatedCart = await db.collection('carts').findOne({ userId });
    return new Response(JSON.stringify(updatedCart?.cartItems || []), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://shark-tale-e-commerce.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    const { db } = await connectToDB();
    const userId = params.id;
    const body: CartBody = await request.json();
    const productId = body.productId;

    // Remove product from cart
    const result = await db.collection('carts').findOneAndUpdate(
        { userId },
        { $pull: { cartItems: { productId } } },
        { returnDocument: 'after' }
    );

    const updatedCart = result.value;

    // Safeguard if update failed or user not found
    const cartItems = updatedCart?.cartItems ?? [];
    const cartIds = cartItems.map((item: any) => item.productId);

    const cartProducts = await db.collection('products')
        .find({ id: { $in: cartIds } })
        .toArray();

    // Attach quantity to each product
    const quantityMap = new Map<string, number>();
    cartItems.forEach((item: any) => {
        quantityMap.set(item.productId, item.quantity);
    });

    const response: CartResponse[] = cartProducts.map((product: any) => ({
        _id: product._id.toString(),
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        availability: product.availability,
        stock: product.stock,
        quantity: quantityMap.get(product.id) || 0,
    }));

    return new Response(JSON.stringify({
        message: "Product removed successfully",
        cartProducts: response,
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://shark-tale-e-commerce.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}


