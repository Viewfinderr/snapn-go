// pages/cart.tsx
'use client'
import React, { useEffect, useState } from 'react';
import  Items  from '@/components/Items';

interface CartItem {
    idItem: number; // Supposons que les ID peuvent être représentés comme des nombres
    Name: string;
    price: number;
    img: string;
    quantity: number; // La quantité sera gérée comme un nombre côté client
    // Ajoutez d'autres propriétés de l'objet Items si nécessaire
  }
  
  const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
  
    useEffect(() => {
      // Lire les items du panier à partir de localStorage et les convertir si nécessaire
      const items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];
      const convertedItems: CartItem[] = items.map((item: any) => ({
        ...item,
        idItem: Number(item.idItem), // Convertir bigint à number si nécessaire
        quantity: Number(item.quantity) || 1, // Assurez-vous que la quantité est un nombre et par défaut à 1 si non défini
      }));
      setCartItems(convertedItems);
  
      // Calculer le prix total
      const totalPrice = convertedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      setTotal(totalPrice);
    }, []);
  
    // Fonction pour retirer un article du panier
    const removeFromCart = (idItemToRemove: number) => {
      const updatedCart = cartItems.filter(item => item.idItem !== idItemToRemove);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setTotal(updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0));
    };
  
    return (
      <div>
        <h1>Votre Panier</h1>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="item-container">
                <img src={item.img} alt={item.Name} />
                <div>
                   
                  <h3>{item.Name}</h3>
                  <p>{item.price} €</p>
                  <p>Quantité: {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.idItem)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-container">
          <p>Total: {total.toFixed(2)} €</p>
        </div>
        {/* Vous pouvez ajouter ici des boutons ou des liens pour la caisse ou pour continuer les achats. */}
      </div>
    );
  };
  
  export default CartPage;
  