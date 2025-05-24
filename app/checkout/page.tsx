import CartPage from "@/app/cart/page";

export default function CheckoutPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen mt-20 rounded-3xl">
            {/* Checkout Form */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
                <h2 className="text-xl text-gray-900 font-semibold mb-4">Checkout</h2>

                <form className="space-y-6">
                    {/* Sender Info */}
                    <div>
                        <h3 className="text-lg text-gray-800 font-medium mb-2">Sender Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="input" />
                            <input type="email" placeholder="Email Address" className="input" />
                            <input type="text" placeholder="Phone Number" className="input" />
                            <input type="text" placeholder="Address" className="input" />
                        </div>
                    </div>

                    {/* Receiver Same Checkbox */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <input type="checkbox" id="same-as-sender" className="accent-indigo-600" />
                            Shipping address is same as sender
                        </label>
                    </div>

                    {/* Receiver Info (Shown only if unchecked - handle with JS/TS) */}
                    <div id="receiver-section">
                        <h3 className="text-lg text-gray-800 font-medium mt-6 mb-2">Receiver Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="input" />
                            <input type="text" placeholder="Phone Number" className="input" />
                            <input type="text" placeholder="Address" className="input col-span-2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg">
                        Continue to Payment
                    </button>
                </form>
            </div>


                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between font-semibold">
                        <p>Total</p>
                        <p>$120.00</p>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <CartPage/>
                        {/* End item */}
                    </div>

                </div>

        </div>
    )
}