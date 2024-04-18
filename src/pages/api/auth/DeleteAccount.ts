import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../../libs/prismadb";

const verifyTokenAndAuthenticate = (req: any, res: any, next: any) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined.");
      return res.status(500).json({ error: "Server configuration error." });
    }
    const decoded = jwt.verify(token, secret) as JwtPayload; // Ajout de l'assertion de type
    // Décomposer les données décodées pour extraire les IDs nécessaires
    const { userId, idFavorites, idHistorique, idCart } = decoded;
    req.userId = userId;
    req.idFavorites = idFavorites;
    req.idHistorique = idHistorique;
    req.idCart = idCart;
    next();
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default async function handler(req: any, res: any) {
  verifyTokenAndAuthenticate(req, res, async () => {
    if (req.method === "POST") {
      const { userId, idFavorites, idHistorique, idCart } = req;
      try {
        // Deleting associated entities
        if (idFavorites) {
          const deleteFavorites = await prisma.favorites.deleteMany({
            where: { idFavorites },
          });
        }

        if (idHistorique) {
          const deleteHistorique = await prisma.historique.deleteMany({
            where: { idHistorique },
          });
        }

        if (idCart) {
          const deleteItemsCart = await prisma.itemsCart.deleteMany({
            where: { idCart: BigInt(idCart) },
          });
          const deleteCart = await prisma.cart.delete({
            where: { idCart },
          });
        }

        res.status(200).json({
          message: "Account and associated data deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Unable to delete account" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  });
}
