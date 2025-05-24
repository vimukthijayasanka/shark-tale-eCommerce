import ShoppingCartList from "@/app/cart/ShoppingCartList";

export const dynamic = "force-dynamic";

export default async function CartPage() {
    let cartProducts = [];

    try {
        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/1/cart`;
        const response = await fetch(url, { cache: "no-cache" });

        if (!response.ok) {
            const text = await response.text();
            console.error("API error:", text);
            throw new Error("Non-200 response");
        }

        cartProducts = await response.json();
    } catch (err) {
        console.error("Failed to fetch cart:", err);
        cartProducts = []; // fallback to empty cart
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 p-3">
            <div className="w-full max-w-4xl">
                <ShoppingCartList initialCartProducts={cartProducts} />
            </div>
        </div>
    )
}