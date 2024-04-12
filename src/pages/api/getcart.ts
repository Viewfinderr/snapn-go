import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  console.log('Received request method:', req.method); // Journaliser la méthode de la requête

  if (req.method === 'POST') {
    const { itemId, userId } = req.body;
    console.log('Request body:', req.body); // Journaliser les données reçues dans le corps de la requête

    try {
      // Récupérer le panier de l'utilisateur
      console.log('Fetching cart for user ID:', userId); // Journaliser l'ID de l'utilisateur pour lequel le panier est récupéré
      const userCart = await prisma.users.findUnique({
        where: { id: userId },
        select: { idCart: true } // Sélectionner uniquement l'ID du panier
      });
      console.log('User cart:', userCart); // Journaliser les informations du panier récupéré

      // Vérifier si l'utilisateur a un panier
      if (!userCart || !userCart.idCart) {
        console.log('User cart not found for user ID:', userId); // Journaliser si le panier n'est pas trouvé
        return res.status(404).json({ error: "User cart not found." });
      }

      // Ajouter l'item au panier de l'utilisateur
      console.log('Adding item to cart:', { itemId, cartId: userCart.idCart }); // Journaliser les détails de l'ajout
      const data = await prisma.itemsCart.create({
        data: {
          idItem: itemId,      // Supposons que c'est l'ID de l'item
          idCart: userCart.idCart, // Utiliser l'ID du panier récupéré
          // Vous pouvez ajouter d'autres champs nécessaires ici selon votre modèle Prisma
        },
      });
      console.log('Item added to cart:', data); // Journaliser le résultat de l'ajout

      return res.status(200).json(data);
    } catch (error) {
        console.error("Failed to add item to cart:", error);
      
        // Utiliser une assertion de type pour traiter 'error' comme ayant une propriété 'message' de type 'string'.
        const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred";
        console.log('Error caught in catch block:', errorMessage); // Journaliser l'erreur interceptée
        
        return res.status(500).json({ error: errorMessage });
      }
      
  } else {
    console.log(`Method ${req.method} not allowed.`); // Journaliser si la méthode n'est pas autorisée
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
