// components/Items.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Item {
    idItem: string;
    Name: string;
    price: number;
    img: string;
}

const Items: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getItems');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data: Item[] = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des items:", error);
            }
        };

        fetchData();
    }, []);

    const addToCart = async (itemToAdd: Item) => {
        try {
            const response = await fetch('/api/addItemToCart', { // Updated API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: itemToAdd.idItem,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            console.log("Item ajouté au panier avec succès");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'item au panier :", error);
        }
    };

    return (
        <div className="bg-greenButton lg:bg-fontDesktop px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
                {items.map((item) => (
                    <Link key={item.idItem} href={`/items/${item.idItem}`} passHref>
                        <div className="p-2">
                            <div className="rounded-[6px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ">
                                <div className="relative">
                                    <img src={item.img} alt={item.Name} className="w-full object-contain " />
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-800 text-xs rounded-full m-2 px-2 py-1">★</div>
                                </div>
                                <div className="p-4 bg-white text-center">
                                    <h2 className="font-bold text-lg mb-2">{item.Name}</h2>
                                    <p className="text-gray-800 text-md mb-4">{item.price.toFixed(2)} €</p>
                                    <button onClick={() => addToCart(item)} className="mt-2 bg-blue-500 text-white p-2 rounded">
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Items;
