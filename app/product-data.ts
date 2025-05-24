export interface Product{
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    availability: string;
}

export const products: Product[] = [
    {
        id: 'p001',
        name: 'Cap',
        imageUrl: 'cap.png',
        description: 'Shark Tank team cap, perfect for casual wear.',
        price: 10,
        stock: 100,
        availability: 'available'
    },
    {
        id: 'p002',
        name: 'T-Shirt',
        imageUrl: 't-shirt.png',
        description: 'Comfortable cotton t-shirt with Shark Tank branding.',
        price: 20,
        stock: 50,
        availability: 'available'
    },
    {
        id: 'p003',
        name: 'Mug',
        imageUrl: 'mug.png',
        description: 'Ceramic coffee mug with motivational quotes.',
        price: 12,
        stock: 40,
        availability: 'available'
    },
    {
        id: 'p004',
        name: 'Trunk',
        imageUrl: 'trunk.png',
        description: 'Trunk for gymnasium.',
        price: 8,
        stock: 80,
        availability: 'available'
    },
    {
        id: 'p005',
        name: 'Bag',
        imageUrl: 'bag.png',
        description: 'Stylish and durable bag for entrepreneurs on the go.',
        price: 35,
        stock: 0,
        availability: 'not available'
    },
    {
        id: 'p006',
        name: 'Water Bottle',
        imageUrl: 'water-bottle.png',
        description: 'Eco-friendly stainless steel water bottle.',
        price: 15,
        stock: 30,
        availability: 'available'
    },
];