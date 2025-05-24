import {NextRequest} from "next/server";
import {connectToDB} from "@/app/api/db";

type Params = { id: string; }

type CartBody = {
    productId: string;
    quantity: number;
};

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


export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    const { db } = await connectToDB();
    const userId = params.id;
    const body: CartBody = await request.json();
    const { productId, quantity: qtyToRemove } = body;

    // Find user cart
    const userCart = await db.collection('carts').findOne({ userId });
    if (!userCart || !userCart.cartItems) {
        return new Response(JSON.stringify({
            message: "Cart not found",
            cartProducts: [],
        }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }

    const existingItem = userCart.cartItems.find((item: any) => item.productId === productId);

    if (!existingItem) {
        return new Response(JSON.stringify({
            message: "Product not found in cart",
            cartProducts: [],
        }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }

    if (existingItem.quantity <= qtyToRemove) {
        // Remove entire item
        await db.collection('carts').updateOne(
            { userId },
            { $pull: { cartItems: { productId } } }
        );
    } else {
        // Decrease quantity
        await db.collection('carts').updateOne(
            { userId, "cartItems.productId": productId },
            { $inc: { "cartItems.$.quantity": -qtyToRemove } }
        );
    }

    // Fetch updated cart
    const updatedCart = await db.collection('carts').findOne({ userId });
    const cartItems = updatedCart?.cartItems ?? [];
    const cartIds = cartItems.map((item: any) => item.productId);

    const cartProducts = await db.collection('products')
        .find({ id: { $in: cartIds } })
        .toArray();

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
        message: existingItem.quantity <= qtyToRemove
            ? "Product removed from cart"
            : `Quantity decreased by ${qtyToRemove}`,
        cartProducts: response,
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}