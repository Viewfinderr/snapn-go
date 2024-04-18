// use client;
"use client";
import { useItems } from "@/context/ItemsContext"; // Assurez-vous que le chemin d'importation est correct
import Image from "next/image";
import React, { useRef } from "react";

const images = [
  "img/fruits.png",
  "img/légumes.png",
  "img/viande.png",
  "img/poisson.png",
  "img/produits_laitiers.png",
  "img/condiment.png",
  "img/charcuterie.png",
  "img/boissons.png",
  "img/épicerie_sucrée.png",
  "img/fruits_secs.png",
];

const FoodSlider: React.FC = () => {
  const { setItems, loadAllItems } = useItems(); // Ajoutez loadAllItems à vos hooks
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollContainer.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleImageClick = async (typeId) => {
    const response = await fetch(`/api/getItems?typeId=${typeId}`);
    if (response.ok) {
      const fetchedItems = await response.json();
      setItems(fetchedItems);
    } else {
      console.error("Failed to fetch items");
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-greenButton lg:bg-fontDesktop ">
      <button
        onClick={loadAllItems} // Bouton pour charger tous les items
        className="w-24 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-bgSliderDesktop cursor-pointer "
      >
        <Image src="/img/cercle.png" width={25} height={25}></Image>
      </button>
      <div
        ref={scrollContainer}
        className="flex overflow-x-auto scrollbar-hide space-x-4 p-4"
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="rounded-full p-1 cursor-pointer"
            onClick={() => handleImageClick(index + 1)}
          >
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-bgSliderDesktop overflow-hidden">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="object-contain w-4/6 h-4/6"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 p-4 focus:outline-none text-white lg:hidden"
      >
        →
      </button>
    </div>
  );
};

export default FoodSlider;
