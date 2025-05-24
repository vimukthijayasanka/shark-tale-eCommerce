'use client';

export const dynamic = 'force-dynamic';

import { useState } from "react";
import Link from "next/link";
import {CartResponse} from "@/app/api/users/[userId]/cart/route";

export default function ShoppingCartList({ initialCartProducts }: { initialCartProducts: CartResponse[] }) {
    const [cartProducts, setCardsProducts] = useState(initialCartProducts);

    const subtotal = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const shipping = 5.00;
    const tax = subtotal * 0.084; // example 8.4%
    const total = subtotal + shipping + tax;

    async function removeProduct(productId: string) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/users/1/cart", {
                method: "DELETE",
                body: JSON.stringify({ productId }),
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
            });

            if (!response.ok) {
                throw new Error("Failed to remove product from cart.");
            }

            const result = await response.json();
            setCardsProducts(result.cartProducts); // ✅ update with returned cart
        } catch (error) {
            console.error("Error removing product:", error);
        }
    }

    return (
        <div className="bg-white px-6 py-10 lg:px-8 max-w-4xl mx-auto rounded-3xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

            {cartProducts.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <>
                    <ul className="space-y-6">
                        {cartProducts.map((product) => (
                            <li key={product.id} className="flex items-start justify-between gap-4 border-b pb-6">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={"product-images/" + product.imageUrl}
                                        alt={product.name}
                                        className="h-24 w-24 rounded-md object-cover flex-shrink-0"
                                    />
                                    <div>
                                        <Link href={`/products/${product.id}`}>
                                            <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-500">{product.description.slice(0,-1)}</p>
                                        <p className={`flex items-center text-sm mt-1 ${product.stock ? 'text-green-600' : 'text-red-500'}`}>
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                {product.stock ? (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                ) : (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                )}
                                            </svg>
                                            {product.stock ? "In stock" : "Out of stock"}
                                        </p>
                                        { product.stock ? <button onClick={()=> removeProduct(product.id)} type="button"
                                                                  className="text-sm hover:underline mt-2
                                                                  bg-red-400 font-sans text-white px-3 py-1 rounded
                                                                  hover:bg-red-600">Remove</button> : <> </>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <input type="number" defaultValue={product.quantity} min={1} max={product.stock} className={'w-16 px-2 py-1 text-center text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'}/>
                                    <p className="mt-2 text-lg font-medium text-gray-900">${(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Summary */}
                    <div className="mt-10 border-t pt-6">
                        <dl className="space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd>${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt>Shipping</dt>
                                <dd>${shipping.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt>Tax</dt>
                                <dd>${tax.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between font-semibold text-gray-900 pt-2">
                                <dt>Order total</dt>
                                <dd>${total.toFixed(2)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition">Checkout</button>
                            <p className="text-center text-sm mt-4 text-purple-600 hover:underline">
                                or <Link href="/products">Continue Shopping →</Link>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
