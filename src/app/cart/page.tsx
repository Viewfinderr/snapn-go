// page.tsx
"use client";
import Navbar from "@/Components/navbar";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/getcart")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.ItemsCart)) {
          const itemIds = data.ItemsCart.map((item) => item.idItem);
          // Utiliser la requête modifiée pour obtenir les détails des articles
          fetch(`/api/getMultipleItems?ids=${itemIds.join(",")}`)
            .then((response) => response.json())
            .then((itemsData) => {
              setCartItems(itemsData);
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des détails des articles:",
                error
              );
              setError(
                "Une erreur est survenue lors de la récupération des détails des articles."
              );
            });
        } else {
          console.error("Les données attendues ne sont pas un tableau:", data);
          setError(
            "Une erreur est survenue lors de la récupération de votre panier."
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du panier:", error);
        setError(
          "Impossible de récupérer le panier. Veuillez réessayer plus tard."
        );
      });
  }, []);

  return (
    <div>
      <h1>Votre Panier</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              {item.Name} - Quantité : {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <Navbar></Navbar>
    </div>
  );
};

export default CartPage;
