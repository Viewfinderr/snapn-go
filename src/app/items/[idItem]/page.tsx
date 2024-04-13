// Importez le type exact de votre objet `items` depuis où il est défini, si disponible.
// Supposons ici qu'il est défini dans "@prisma/client".
import { Items } from "@prisma/client"; // Ajustez le nom d'importation selon votre schéma Prisma.
import { getOneItem } from "@/pages/api/getOneItem";
import Navbar from '@/Components/navbar';

interface OneItemProps {
  params: {
    idItem: string; // ou number selon votre schéma de base de données
  };
}

// Utilisez votre interface pour le typage des props.
export default async function OneItem({ params }: OneItemProps) {
  const { idItem } = params;

  // Assurez-vous que le type retourné par `getOneItem` correspond à ce que vous attendez, par exemple `Item` ou `null`.
  const items: Items | null = await getOneItem(idItem);

  // Assurez-vous d'avoir un check ici au cas où `items` serait `null`.
  // Vous pourriez vouloir rendre un message différent ou rediriger l'utilisateur si l'item n'existe pas.
  if (!items) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <div className="border p-4 flex flex-col items-center cursor-pointer">
          <img src={items.img} alt={items.Name} className="w-full h-64 object-cover mb-4"/>
          <h2 className="text-lg font-bold">{items.Name}</h2>
          <p className="text-md">{items.price} €</p>
      </div>
      <Navbar></Navbar>
    </div>
  );
}
