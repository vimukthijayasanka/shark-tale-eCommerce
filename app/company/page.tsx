import Image from 'next/image';
import Link from 'next/link';

export default function CompanyPage() {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <div className="flex items-center justify-center p-12">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-bold mb-6">About Shark Tale</h1>
                        <p className="text-lg leading-relaxed text-gray-600">
                            At <strong>Shark Tale</strong>, we believe fitness is more than a lifestyle — it is an identity. Born from the passion of pushing limits, we merge high-performance gymwear with bold, confident style. From training to triumph, our collections are designed for those who rise above the ordinary and live fiercely.
                        </p>
                        <p className="mt-6 text-lg text-gray-600">
                            We are more than a brand — we are a movement. Dedicated to quality, sustainability, and fearless fashion, Shark Tale empowers the bold and inspires the relentless.
                        </p>
                    </div>
                </div>
                <div className="relative w-3/4 mt-32">
                    <Image
                        src="/icons/about.png"
                        alt="Shark Tale Gymwear"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl"
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-100 py-12 mt-16 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Shark Tale</h3>
                        <p className="text-sm text-gray-600">
                            Bold gymwear for bold lives. Train harder. Look stronger. Be unstoppable.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/sustainability">Sustainability</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/help">Help Center</Link></li>
                            <li><Link href="/shipping">Shipping</Link></li>
                            <li><Link href="/returns">Returns & Exchanges</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Follow Us</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">TikTok</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-400 mt-8">© {new Date().getFullYear()} Shark Tale. All rights reserved.</div>
            </footer>
        </div>
    );
}