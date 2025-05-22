export interface Product{
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
}

export const products: Product[] = [
    {
        id: 'p001',
        name: 'Cap',
        imageUrl: 'cap.jpg',
        description: 'Shark Tank team cap, perfect for casual wear.',
        price: 10,
    },
    {
        id: 'p002',
        name: 'T-Shirt',
        imageUrl: 't-shirt.jpg',
        description: 'Comfortable cotton t-shirt with Shark Tank branding.',
        price: 20,
    },
    {
        id: 'p003',
        name: 'Mug',
        imageUrl: 'mug.jpg',
        description: 'Ceramic coffee mug with motivational quotes.',
        price: 12,
    },
    {
        id: 'p004',
        name: 'Trunk',
        imageUrl: 'trunk.jpg',
        description: 'Trunk for gymnasium.',
        price: 8,
    },
    {
        id: 'p005',
        name: 'Bag',
        imageUrl: 'bag.jpg',
        description: 'Stylish and durable bag for entrepreneurs on the go.',
        price: 35,
    },
    {
        id: 'p006',
        name: 'Water Bottle',
        imageUrl: 'water-bottle.jpg',
        description: 'Eco-friendly stainless steel water bottle.',
        price: 15,
    },
];