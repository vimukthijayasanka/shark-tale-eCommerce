import NotFoundPage from "@/app/not-found";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {

    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + `/api/products/${params.id}`, {
        cache: "no-store", // Avoid stale data
    });


    if (!response.ok) {
        return <NotFoundPage />;
    }

    const product = await response.json();

    if (!product) {
        return <NotFoundPage />;
    }

    return (
        <div className="bg-white w-full">
            <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li>
                            <a href="/" className="hover:underline">Home</a>
                        </li>
                        <li>
                            <span className="mx-2">/</span>
                            <a href="#" className="text-gray-500">{product.name}</a>
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
                    {/* Image Gallery */}
                    <div className="">
                        <div className="w-full relative">
                            <Image
                                src={`/product-images/${product.imageUrl}`}
                                width={300}
                                height={300}
                                alt={product.name}
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 lg:mt-0">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-xl text-gray-800 mt-4">${product.price}</p>

                        <form className="mt-8 space-y-6">
                            {/* Color */}
                            <div>
                                <label className="text-sm font-medium text-gray-900">Color</label>
                                <div className="mt-2">
                                    <span className="inline-block w-6 h-6 bg-gray-400 rounded-full"></span>
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-900">Size</label>
                                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Size guide</a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Add to Bag
                            </button>
                        </form>

                        {/* Description */}
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        {/* Highlights */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                                <li>{product.name}</li>
                            </ul>
                        </div>

                        {/* Details */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Details</h3>
                            <p className="text-sm text-gray-700 mt-2">{product.details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
