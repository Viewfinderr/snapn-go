import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
    console.log("Effect triggered"); // Log when the effect is triggered
    const userId = localStorage.getItem('userId');  // Assurez-vous que l'utilisateur est connecté
    console.log("userId:", userId); // Log the userId retrieved from localStorage

    if (userId) {
      fetch(`/api/getFavorites?userId=${userId}`)

        .then(res => res.json())
        .then(data => {
          console.log("Favorites data received:", data); // Log the data received from the API
          setFavorites(data);  // Assurez-vous que les données reçues correspondent à la structure attendue
        })
        .catch(error => console.error('Failed to fetch favorites', error));
    }
  }, []);

  console.log("Favorites:", favorites); // Log the favorites state

  return (
    <div>
      <h1>My Favorites</h1>
      {favorites.length > 0 ? (
        favorites.map(favorite => (
          favorite.ItemsFavorites.map(item => (
            <div key={item.idItem} style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
              <Link href={`/items/${item.idItem}`}>
                <a>
                  <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px' }} />
                  <h2>{item.name}</h2>
                  <p>€{item.price.toFixed(2)}</p>
                </a>
              </Link>
            </div>
          ))
        ))
      ) : (
        <p>No favorites added yet!</p>
      )}
    </div>
  );
};

export default Favorites;
