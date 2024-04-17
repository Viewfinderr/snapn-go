// Importation des composants et hooks nécessaires
"use client";
import Navbar from "@/Components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

// Définition de l'interface pour les articles du panier
interface CartItem {
  id: string;
  Name: string;
  quantity: number;
  price: string; // Assurez-vous que le prix est une chaîne pour faciliter le parsing
  img: string; // URL de l'image pour l'affichage
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fonction pour calculer le total des prix
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * parseFloat(item.price),
      0
    );
  };

  // Récupération des données du panier
  useEffect(() => {
    fetch("/api/getcart")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.ItemsCart)) {
          const itemIds = data.ItemsCart.map(
            (item: { idItem: string }) => item.idItem
          );
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

  // Mise à jour du total chaque fois que les articles du panier changent
  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [cartItems]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <Image
          src="/Icon.svg"
          width={58}
          height={58}
          alt="Icon site web"
          className="mb-4"
          loading="lazy"
        />
      </div>
      <div className="flex justify-center gap-20 mt-5">
        <h1 className="font-custom font-bold md:text-2xl">Basket</h1>
        <div className="flex flex-col w-48 gap-1 md:hidden">
          {/* Ici le bloc de code pour l'affichage mobile pourrait être répété si nécessaire */}
        </div>
      </div>
      <div className="flex gap-20 md:mx-32 justify-center">
        {error ? (
          <p>{error}</p>
        ) : (
          <ul className="flex flex-col gap-16 my-10">
            {cartItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className="flex p-2 mx-5 rounded-lg shadow-md shadow-slate-600"
              >
                <Image
                  src={item.img}
                  width={50}
                  height={50}
                  alt="Image de l'item"
                  loading="lazy"
                ></Image>
                <div className="flex flex-col justify-between flex-grow ml-2">
                  <span className="font-bold text-sm">{item.Name}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>{item.price} €</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="hidden md:flex flex-col pt-10 w-[40vw] h-96 gap-1 md:mt-10 md:bg-greenButton px-24 text-white">
          <div>
            <p className="text-center">Récapitulatif</p>
          </div>
          <div className="mt-20 w-full flex flex-col items-center">
            <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
              <p>Price</p>
              <p>{totalPrice.toFixed(2)}€</p>
            </div>
            <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
              <p>Reduction</p>
              <p>0€</p>
            </div>
            <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
              <p className="font-custom font-bold">Total:</p>
              <p>{totalPrice.toFixed(2)}€</p>
            </div>
            <div className="flex justify-center mt-2">
              <button className="border-[1px] border-solid rounded bg-greenNav w-40 text-center text-white">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
