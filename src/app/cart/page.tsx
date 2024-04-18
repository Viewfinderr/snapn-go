"use client";
import DesktopNav from "@/Components/DesktopNav";
import Footer from "@/Components/UI/footer";
import Navbar from "@/Components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  Name: string;
  quantity: number;
  // Autres propriétés si nécessaires
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string>("");

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

  useEffect(() => {
    if (error) {
      // Gérer l'erreur ici (par exemple, journalisation, rapport d'erreurs, etc.)
    }
  }, [error]);

  return (
    <div className="">
      <div className="md:min-h-[75vh]">
        <DesktopNav />
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
        <div className="flex justify-center gap-20 mt-5  ">
          <div className="flex">
            <h1 className="font-custom font-bold md:text-2xl">Basket</h1>
          </div>
          <div className="flex flex-col w-48 gap-1 md:hidden">
            <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
              <p>Price</p>
              <p>100€</p>
            </div>
            <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
              <p>Reduction</p>
              <p>0€</p>
            </div>
            <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
              <p className="font-custom font-bold">Total:</p>
              <p>100€</p>
            </div>
            <div className="flex justify-center mt-2">
              <button className="border-[1px] border-solid rounded bg-greenNav w-40 text-center text-white">
                Buy
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-20 md:mx-32  justify-center">
          {error ? (
            <p>{error}</p>
          ) : (
            <ul className="flex flex-col gap-16 my-10">
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <li key={`${item.id}-${index}`}>
                    <div className="flex p-2 mx-5 rounded-lg shadow-md shadow-slate-600 ">
                      <div>
                        <Image
                          src={item.img}
                          width={50}
                          height={50}
                          alt="Image de l'item"
                        ></Image>
                      </div>
                      <div className="flex flex-col justify-between flex-grow ml-2">
                        <span className="font-bold text-sm">{item.Name}</span>
                        <span>Quantity: {item.uniteMasse}</span>
                        <span>{item.price} $</span>
                      </div>
                      <div className="flex items-center">
                        <button className="text-red-500 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white rounded-full w-8 h-8 flex items-center justify-center mx-1">
                          −
                        </button>
                        <span className="mx-1">{item.quantity}</span>
                        <button className="text-green-500 bg-transparent border border-green-500 hover:bg-green-500 hover:text-white rounded-full w-8 h-8 flex items-center justify-center mx-1">
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>Votre panier est vide.</p>
              )}
            </ul>
          )}
          <div className="hidden md:flex flex-col pt-10 w-[40vw] h-96 gap-1 md:mt-10 md:bg-greenButton px-24 text-white">
            <div>
              <p className="text-center">Recapitulatif</p>
            </div>
            <div className=" mt-20 w-full flex flex-col items-center">
              <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
                <p>Price</p>
                <p>100€</p>
              </div>
              <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
                <p>Reduction</p>
                <p>0€</p>
              </div>
              <div className="flex justify-between font-custom font-light w-full border-b-zinc-100 border-b-[1px]">
                <p className="font-custom font-bold">Total:</p>
                <p>100€</p>
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
      <Navbar />
      <Footer />
    </div>
  );
};

export default CartPage;
