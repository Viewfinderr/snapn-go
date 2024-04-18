import React, { useEffect, useState } from "react";
import Link from "next/link";

interface FavoriteItem {
  idItem: number;
  name: string;
  price: number;
  img: string;
}

interface Favorite {
  idFavorite: number;
  ItemsFavorites: FavoriteItem[];
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Assurez-vous que l'utilisateur est connecté
    if (userId) {
      fetch(`/api/getFavorites?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data); // Assurez-vous que les données reçues correspondent à la structure attendue
        })
        .catch((error) => console.error("Failed to fetch favorites", error));
    }
  }, []);
  return (
    <div>
      <h1>My Favorites</h1>
      {favorites.length > 0 ? (
        favorites.map((favorite) =>
          favorite.ItemsFavorites.map((item) => (
            <div
              key={item.idItem}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                margin: "10px",
              }}
            >
              <Link href={`/items/${item.idItem}`}>
                <a>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h2>{item.name}</h2>
                  <p>€{item.price.toFixed(2)}</p>
                </a>
              </Link>
            </div>
          ))
        )
      ) : (
        <p>No favorites added yet!</p>
      )}
    </div>
  );
};

export default Favorites;
