import { Items } from "@prisma/client";
import { getOneItem } from "@/pages/api/getOneItem";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/UI/footer";

interface OneItemProps {
  params: {
    idItem: string; // ou number selon votre schéma de base de données
  };
}

export default async function OneItem({ params }: OneItemProps) {
  const { idItem } = params;
  const items: Items | null = await getOneItem(idItem);

  if (!items) {
    return (
      <div className="bg-red-100 text-center py-4">Article non trouvé</div>
    );
  }

  return (
    <div className="bg-greenButton min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-md mx-auto text-center mt-8 mb-8">
          <img src="/Icon.svg" alt="Icon" className="mx-auto" />
        </div>
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4">
            <div className="w-full h-64">
              <img
                src={items.img}
                alt={items.Name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800">{items.Name}</h2>
              <p className="mt-2 text-gray-600 line-clamp-3">
                {items.description}
              </p>
              <a
                href="#fullDescription"
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Lire la suite
              </a>
              <div className="flex justify-between items-center mt-3">
                <span className="text-3xl font-bold text-green-600">
                  {items.price.toFixed(2)} €
                </span>
                <button className="px-4 py-2 bg-fontDesktop text-white text-sm font-semibold rounded uppercase hover:bg-green-600">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg px-4 py-2 mb-24">
            <details className="group">
              <summary
                id="fullDescription"
                className="text-lg font-bold text-gray-800 cursor-pointer"
              >
                Description{" "}
                <span className="float-right transition-transform duration-300 group-open:rotate-180">
                  ➕
                </span>
              </summary>
              <p className="mt-2 text-gray-600">{items.description}</p>
            </details>
            <details className="group mt-2">
              <summary className="text-lg font-bold text-gray-800 cursor-pointer">
                Spécifications{" "}
                <span className="float-right transition-transform duration-300 group-open:rotate-180">
                  ➕
                </span>
              </summary>
              <ul className="mt-2 text-gray-600">
                <li>Poids: {items.uniteMasse}</li>
                <li>Marque: {items.brand}</li>
              </ul>
            </details>
            <details className="group mt-2">
              <summary className="text-lg font-bold text-gray-800 cursor-pointer">
                Scores{" "}
                <span className="float-right transition-transform duration-300 group-open:rotate-180">
                  ➕
                </span>
              </summary>
              <div className="mt-2 text-gray-600">
                <p>Nutri-Score: {items.nutriScore}</p>
                <p>
                  Nova-Score:{" "}
                  {items.novaScore
                    ? items.novaScore.toString()
                    : "Non spécifié"}
                </p>
                <p>Eco-Score: {items.ecoScore}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
