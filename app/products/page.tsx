import ProductsList from "@/app/ProductsList";

export const dynamic = 'force-dynamic';

export default async function ProductsPage(){
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products', { cache: 'no-store' });
    const productsData = await response.json();

    const response2 = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/1/cart', { cache: 'no-store' });
    const cartProducts = await response2.json();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                <ProductsList products={productsData} initialCartProducts={cartProducts}/>
            </div>
        </div>
    );
}