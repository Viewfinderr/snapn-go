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
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      console.error("L'utilisateur n'est pas connecté");
      return;
    }
  
    try {
      const response = await fetch('/api/getcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: itemToAdd.idItem,
          userId: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      console.log("Item ajouté au panier avec succès");
  
      // Ajout de l'article au localStorage avec une date d'expiration
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 2); // Définit l'expiration à 2 jours à partir de maintenant
  
      const itemIndex = cart.findIndex((item: Item) => item.idItem === itemToAdd.idItem);
  
      if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
      } else {
        cart.push({ ...itemToAdd, quantity: 1 });
      }
  
      // Stocker à la fois le panier et la date d'expiration
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('cartExpiration', expiration.getTime().toString());
  
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };
  
  // Fonction pour vérifier l'expiration du panier stocké dans le localStorage
  function checkCartExpiration() {
    const expiration = localStorage.getItem('cartExpiration');
    const now = new Date();
  
    if (expiration && now.getTime() > parseInt(expiration)) {
      // Les données du panier ont expiré
      localStorage.removeItem('cart');
      localStorage.removeItem('cartExpiration');
      console.log("Les données du panier ont expiré et ont été supprimées.");
    }
  }
  
  // Assurez-vous d'appeler checkCartExpiration au chargement du composant pour nettoyer les données expirées
  useEffect(() => {
    checkCartExpiration();
  }, []);  

  return (
    <div className="bg-greenButton lg:bg-fontDesktop px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
        {items.map((item) => ( 
          <div key={item.idItem} className="p-2">
            <Link href={`/items/${item.idItem}`} passHref>  
              <div className="rounded-[6px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ">
                <div className="relative">
                  <img src={item.img} alt={item.Name} className="w-full object-contain " />
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-800 text-xs rounded-full m-2 px-2 py-1">★</div>
                </div>
                <div className="p-4 bg-white text-center">
                  <h2 className="font-bold text-lg mb-2">{item.Name}</h2>
                  <p className="text-gray-800 text-md mb-4">{item.price.toFixed(2)} €</p>
                </div>
              </div>
            </Link>
            <div className="text-center">
              <button onClick={() => addToCart(item)} className="mt-2 bg-blue-500 text-white p-2 rounded">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
};

export default Items;
