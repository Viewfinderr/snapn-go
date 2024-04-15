// components/PurchaseHistory.tsx

import React, { useEffect, useState } from 'react';

interface Item {
  name: string;
  price: number;
}

interface PurchaseHistoryItem {
  idHistorique: number;
  ItemsHistorique: {
    idItem: number;
    Items: Item[];  
  }[];
}

const PurchaseHistory: React.FC<{ userId: number }> = ({ userId }) => {
  const [history, setHistory] = useState<PurchaseHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`/api/getPurchaseHistory?userId=${userId}`);
      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
  }, [userId]);

  return (
    <div>
      <h2>Purchase History</h2>
      {history.map((purchase) => (
        <div key={purchase.idHistorique}>
          <h3>Purchase ID: {purchase.idHistorique}</h3>
          <ul>
            {purchase.ItemsHistorique.map((item) => (
              <li key={item.idItem}>
                {item.Items.map((singleItem) => (
                  <div key={singleItem.name}>
                    {singleItem.name} - {singleItem.price.toFixed(2)} €
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistory;
