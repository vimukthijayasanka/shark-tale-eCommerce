'use client'

import { Product } from "@/app/product-data";
import Link from 'next/link'
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function ProductsList({products, initialCartProducts} : {products :Product[], initialCartProducts: Product[]} ) {

    const [ cartProducts, setCartProducts ] = useState(initialCartProducts);
    const router = useRouter();

   async function addToCart(productId: string){
       const response = await fetch(`http://localhost:3000/api/users/1/cart`, {
            method: 'POST',
            body: JSON.stringify({
                productId,
            }),
            headers: {
                'content-type': 'application/json',
            }
        });
        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: Product) => (
                <div key={product.id} className="group relative">
                    <div className="relative overflow-hidden rounded-md lg:aspect-auto lg:h-80">
                        {/* Prevent Link from intercepting hover/clicks */}
                        <Link
                            href={`/products/${product.id}`}
                            className="pointer-events-none"
                        >
                            <img
                                src={`/product-images/${product.imageUrl}`}
                                alt={product.name}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 pointer-events-auto"
                            />
                        </Link>

                        {/* Button Overlay - allow interaction */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-4 py-3 pointer-events-auto z-10">
                            <button
                                type="button"
                                className="bg-blue-500 font-sans text-white px-3 py-1 rounded hover:bg-blue-700"
                                onClick={() => addToCart(product.id)}
                            >
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                className="bg-green-500 font-sans text-white px-3 py-1 rounded hover:bg-green-700"
                                onClick={() => router.push(`/products/${product.id}`) }>
                                Show Item
                            </button>
                        </div>
                    </div>

                    <Link href={`/products/${product.id}`}>
                        <div className="mt-4 flex justify-between cursor-pointer">
                            <div>
                                <h3 className="text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}