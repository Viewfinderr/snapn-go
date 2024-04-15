"use client";
import Navbar from "@/Components/navbar";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/getcart")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.ItemsCart)) {
          const itemIds = data.ItemsCart.map((item) => item.idItem);
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

  useEffect(() => {
    if (error) {
      // Gérer l'erreur ici (par exemple, journalisation, rapport d'erreurs, etc.)
    }
  }, [error]);

  return (
    <div>
      <h1>Votre Panier</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={`${item.id}-${index}`}>
                {item.Name} - Quantité : {item.quantity}
              </li>
            ))
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </ul>
      )}
      <Navbar />
    </div>
  );
};

export default CartPage;
