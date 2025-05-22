import { Product } from "@/app/product-data";
import Image from 'next/image'
import Link from 'next/link'

export default function ProductsList({products} : {products :Product[]}) {
    return (
        <div>
            {products.map(product => (
                <Link key={product.id} href={`/product-detail/`}>
                    <Image src={"/product-images/" + product.imageUrl} alt="Product Image" width={150} height={150} />
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                </Link>
            ))}
        </div>
    )
}