// components/AddToFavoritesButton.tsx

import React from 'react';

interface AddToFavoritesButtonProps {
  userId: number;
  itemId: number;
}

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({ userId, itemId }) => {
  const addToFavorites = async () => {
    try {
      const response = await fetch('/api/addToFavorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, itemId })
      });

      if (!response.ok) {
        throw new Error('Failed to add item to favorites');
      }

      alert('Item added to favorites successfully!');
    } catch (error) {
      console.error('Error adding item to favorites:', error);
      alert('Failed to add item to favorites');
    }
  };

  return (
    <button onClick={addToFavorites}>
      Add to Favorites
    </button>
  );
};

export default AddToFavoritesButton;

