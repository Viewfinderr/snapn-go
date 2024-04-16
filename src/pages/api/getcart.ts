import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.jwtToken; // Récupération du JWT du cookie // Afficher le token pour le débogage

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const secret = process.env.JWT_SECRET as string;
  try {
    const decoded = jwt.verify(token, secret); // Afficher le contenu décodé du JWT

    if (typeof decoded === "string" || !decoded.idCart) {
      console.error("Invalid token data:", decoded); // Débogage en cas de données de token non valides
      return res.status(400).json({ error: "Invalid token data" });
    }

    const cartId = Number(decoded.idCart); // Conversion de l'ID du panier en nombre// Afficher l'ID du panier pour vérifier

    const cart = await prisma.cart.findUnique({
      where: { idCart: cartId }, // Utilisez le champ correct pour identifier le panier
      include: { ItemsCart: true }, // Assurez-vous que le nom est correct selon votre schéma Prisma
    }); // Afficher le panier pour le débogage

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Convertir les BigInt en string pour éviter les erreurs de sérialisation JSON
    const cartWithStrings = {
      ...cart,
      idCart: cart.idCart.toString(),
      ItemsCart: cart.ItemsCart.map((item) => ({
        ...item,
        id: item.id.toString(),
        idCart: item.idCart.toString(),
        idItem: item.idItem ? item.idItem.toString() : null,
      })),
    };

    res.status(200).json(cartWithStrings);
  } catch (error) {
    console.error("Failed to retrieve cart:", error); // Afficher l'erreur en cas d'échec de récupération
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
}