import { Items } from "@prisma/client";
import { getOneItem } from "@/pages/api/getOneItem";
import Navbar from '@/Components/navbar';

interface OneItemProps {
  params: {
    idItem: string; // ou number selon votre schéma de base de données
  };
}

export default async function OneItem({ params }: OneItemProps) {
  const { idItem } = params;
  const items: Items | null = await getOneItem(idItem);

  if (!items) {
    return <div className="bg-red-100 text-center py-4">Article non trouvé</div>;
  }

  return (
    <div className="bg-green-50 ">
      <Navbar />
      <div className="max-w-md mx-auto">
        {/* Carte du produit avec marge supplémentaire en haut */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4 ">
          {/* Image du produit */}
          <div className="w-full h-64">
            <img src={items.img} alt={items.Name} className="w-full h-full object-cover" />
          </div>
          {/* Contenu de la carte */}
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800">{items.Name}</h2>
            <p className="mt-2 text-gray-600">{items.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-3xl font-bold text-green-600">{items.price.toFixed(2)} €</span>
              <button className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded uppercase hover:bg-green-600">Ajouter au panier</button>
            </div>
          </div>
        </div>
        {/* Informations supplémentaires avec marge supplémentaire en bas */}
        <div className="bg-white shadow-lg rounded-lg px-4 py-2 mb-24">
          {/* Description déroulante */}
          <details className="group">
            <summary className="text-lg font-bold text-gray-800 cursor-pointer">Description <span className="float-right transition-transform duration-300 group-open:rotate-180">➕</span></summary>
            <p className="mt-2 text-gray-600">{items.description}</p>
          </details>
          {/* Spécifications déroulantes */}
          <details className="group mt-2">
            <summary className="text-lg font-bold text-gray-800 cursor-pointer">Spécifications <span className="float-right transition-transform duration-300 group-open:rotate-180">➕</span></summary>
            <ul className="mt-2 text-gray-600">
              <li>Poids: {items.uniteMasse}</li>
              <li>Marque: {items.brand}</li>
              {/* Ajoutez d'autres spécifications ici */}
            </ul>
          </details>
          {/* Scores déroulants */}
          <details className="group mt-2  ">
            <summary className="text-lg font-bold text-gray-800 cursor-pointer">Scores <span className="float-right transition-transform duration-300 group-open:rotate-180">➕</span></summary>
            <div className="mt-2 text-gray-600">
              <p>Nutri-Score: {items.nutriScore}</p>
              <p>Nova-Score: {items.novaScore ? items.novaScore.toString() : 'Non spécifié'}</p>
              <p>Eco-Score: {items.ecoScore}</p>
              {/* Ajoutez d'autres scores ici */}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}