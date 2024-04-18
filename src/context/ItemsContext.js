// context/ItemsContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Fonction pour charger tous les items
  const loadAllItems = async () => {
    const response = await fetch("/api/getItems");
    if (response.ok) {
      const allItems = await response.json();
      setItems(allItems);
    }
  };

  useEffect(() => {
    loadAllItems(); // Charge tous les items au démarrage
  }, []);

  const value = { items, setItems, loadAllItems };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
