import {Product, products} from "@/app/product-data";
import Link from "next/link";

export default function ProductsPage(){
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product: Product) => (
                        <div key={product.id} className="group relative">
                            <Link href={`/products/${product.id}`}>
                                <img
                                    src={`/product-images/${product.imageUrl}`}
                                    alt={product.name}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <span className="absolute inset-0" aria-hidden="true"></span>
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}