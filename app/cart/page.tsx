import ShoppingCartList from "@/app/cart/ShoppingCartList";

export default async function CartPage() {

    const response = await fetch("http://localhost:3000/api/users/1/cart", {cache: "no-cache"});
    const cartProducts = await response.json();

    console.log(cartProducts);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl">
                <ShoppingCartList initialCartProducts={cartProducts} />
            </div>
        </div>
    )
}