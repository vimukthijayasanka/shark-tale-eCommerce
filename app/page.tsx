'use client'

import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from "next/navigation";

import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiShoppingBag,
  FiMail,
  FiPhone
} from 'react-icons/fi';

export default function Page() {
  const featuredProducts = [
    { id: 1, name: 'Denim Cap', price: '$39.99', discount: '$29.99', imageUrl:"girl_wear_cap_2.png" },
    { id: 2, name: 'Oversize black tee', price: '$45.99', discount: '$35.99', imageUrl:"boy_wear_oversized_2.png" },
    { id: 3, name: 'Summer Hoodies ', price: '$59.99', discount: '$39.99', imageUrl:"girl_and_boy_hoodies_2.png" },
    { id: 4, name: 'Shark Tale Cap', price: '$45.00', discount: '$35.00', imageUrl:"cap-2.png" },
    { id: 5, name: 'White Hoodie', price: '$45.00', discount: '$35.00', imageUrl:"hoodie.png" },
    { id: 6, name: 'Shark Tale Cap', price: '$35.00', discount: '$25.00', imageUrl:"girl_wear_cap.png" },
    { id: 7, name: 'Shark Tale Unisex Tee', price: '$35.00', discount: '$25.00', imageUrl:"girl_wear_tee.png" },
    { id: 8, name: 'Oversized Black', price: '$45.00', discount: '$30.00', imageUrl:"boy_wear_oversized.png" },

  ];

  const router = useRouter();

  return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Head>
          <title>Shark Tale Shopping | Summer Styles</title>
          <meta name="description" content="Bold fashion & lifestyle choices for summer." />
        </Head>

        {/* Hero Section with Image Grid */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div className="space-y-6 animate-fadeIn">
              <Image src="/icons/icon.png" alt="" width={200} height={100} className={""}/>
              <h1 className="text-5xl font-bold text-gray-900">Strength starts with style</h1>
              <p className="text-lg text-gray-600">
                Dive into Shark Tale’s hottest season yet. From sand-to-sunset looks to bold accessories — you’re covered.
              </p>
              <div className="flex gap-4 mt-4">
                <button onClick={event => {event.preventDefault(); router.push(process.env.NEXT_PUBLIC_SITE_URL + "/products")}} className="bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-950 transition">
                  Shop Now
                </button>
                <button className="border border-sky-600 text-sky-600 px-6 py-3 rounded-lg hover:bg-sky-50 transition">
                  Explore Collection
                </button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 m-4">
              <Image src="/product-images/girl_wear_cap.png" alt="Trunk" width={300} height={350}  className="rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"/>
              <Image src="/product-images/boy_wear_oversized.png" alt="Hat" width={300} height={350} className="rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl" />
              <Image src="/product-images/boy_and_girl_hoodies.png" alt="Hat" width={300} height={350} className="rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"/>
              <Image src="/product-images/girl_wear_tee.png" alt="T-shirt" width={300} height={350} className="rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl" />
            </div>
          </div>
        </section>

        <section className={'w-full h-2/4'}>
          <img src="/icons/cover.png" className={'w-full h-2/4'} alt="cover.png"></img>
        </section>

        {/* Compression Fit Inspired Banner Section */}
        <section className="relative w-full bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Left Panel with Text */}
            <div className="relative bg-black/80 md:bg-transparent flex items-center justify-center md:justify-start p-8">
              <Image
                  src="/product-images/gym.png"
                  alt="Compression Fit Front"
                  layout="fill"
                  objectFit="cover"
                  className="z-0"
              />
              <div className="relative z-10 text-white  p-6 rounded-md md:ml-10 max-w-xs text-center md:text-left space-y-4">
                <h2 className="text-3xl font-bold">COMPRESSION FIT</h2>
                <p className="text-sm">Super tight fit, like a second skin. PSA: will make your arms look massive.</p>
                <button
                    onClick={() => router.push(process.env.NEXT_PUBLIC_SITE_URL + "/products")}
                    className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Center Panel Image */}
            <div className="relative">
              <Image
                  src="/product-images/beach.png"
                  alt="Compression Fit Back"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
              />
            </div>

            {/* Right Panel Image */}
            <div className="relative">
              <Image
                  src="/product-images/sunshine.png"
                  alt="Compression Fit Full Sleeve"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
              />
            </div>
          </div>
        </section>


        {/* Featured Products */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Hot Picks</h2>
          <div className="relative overflow-hidden">
            <div className="flex space-x-6 py-4 animate-scrollHorizontal">
              {[...featuredProducts, ...featuredProducts].map((product, index) => (
                  <div
                      key={`${product.id}-${index}`}
                      className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all"
                  >
                    <Image src={"/product-images/" + product.imageUrl} width={250} height={250} alt={"picture"} className=" h-50 rounded-lg mb-4"></Image>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="line-through text-gray-400 mr-2">{product.price}</span>
                      <span className="text-indigo-600 font-bold">{product.discount}</span>
                    </div>
                    <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Add to Cart
                    </button>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">About Shark Tale</h3>
              <p>Bold fashion for the fierce. Dive deep into seasonal looks that make a statement.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white"><FiInstagram size={20} /></a>
                <a href="#" className="hover:text-white"><FiTwitter size={20} /></a>
                <a href="#" className="hover:text-white"><FiFacebook size={20} /></a>
                <a href="#" className="hover:text-white"><FiYoutube size={20} /></a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Shop</a></li>
                <li><a href="#" className="hover:text-white">Lookbook</a></li>
                <li><a href="#" className="hover:text-white">Journal</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FiMail className="mt-1 mr-3" />
                  <span>support@sharktale.com</span>
                </div>
                <div className="flex items-start">
                  <FiPhone className="mt-1 mr-3" />
                  <span>+1 (555) 765-4321</span>
                </div>
                <div className="flex items-start">
                  <FiShoppingBag className="mt-1 mr-3" />
                  <span>456 Ocean Drive<br />Miami, FL 33139</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Shark Tale Shopping. All rights reserved.
          </div>
        </footer>

        {/* Custom CSS Animations */}
        <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes scrollHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1.5rem)); }
        }
        .animate-scrollHorizontal {
          animation: scrollHorizontal 20s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scrollHorizontal:hover {
          animation-play-state: paused;
        }
      `}</style>
      </div>
  );
}
