// components/Items.tsx
"use client";
import { useItems } from "@/context/ItemsContext";
import Link from "next/link";
import { useState } from "react"; // Assurez-vous que le chemin d'importation est correct

interface Item {
  idItem: string;
  Name: string;
  price: number;
  img: string;
}

const Items: React.FC = () => {
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = async (itemToAdd: Item) => {
    try {
      const response = await fetch("/api/addItemToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemToAdd.idItem,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'item au panier :", error);
    }
  };

  return (
    <div className="bg-greenButton lg:bg-fontDesktop px-6">
      <input
        type="text"
        placeholder="Rechercher un item..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" md:hidden mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {items
          .filter((item) =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(
            (item) =>
              item.idItem && (
                <div key={item.idItem} className="p-2">
                  <div className="rounded-[6px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ">
                    <div className="relative">
                      {/* Début de la balise Link */}
                      <Link href={`/items/${item.idItem}`}>
                        <>
                          {" "}
                          {/* Ajout d'une balise <a> pour envelopper le contenu cliquable */}
                          <img
                            src={item.img}
                            alt={item.Name}
                            className="w-full object-contain "
                          />
                          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-800 text-xs rounded-full m-2 px-2 py-1">
                            ★
                          </div>
                        </>{" "}
                        {/* Fermeture de la balise <a> */}
                      </Link>{" "}
                      {/* Fermeture de la balise Link */}
                    </div>
                    <div className="p-4 bg-white text-center">
                      <h2 className="font-bold text-lg mb-2">{item.Name}</h2>
                      <p className="text-gray-800 text-md mb-4">
                        {item.price.toFixed(2)} €
                      </p>
                      <button
                        onClick={() => addToCart(item)}
                        className="mt-2 bg-blue-500 text-white p-2 rounded"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Items;
