import prisma from "../../../libs/prismadb";
import jwt from "jsonwebtoken";

const verifyTokenAndAuthenticate = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    console.log("No JWT token found in cookies");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log("JWT token verified. User ID:", req.userId);
    next();
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default async function handler(req, res) {
  verifyTokenAndAuthenticate(req, res, async () => {
    if (req.method === "POST") {
      const userId = req.userId;
      try {
        console.log(
          "Sending request to delete account and associated data for user ID:",
          userId
        );

        // Récupérer les IDs des enregistrements liés à l'utilisateur
        const user = await prisma.users.findUnique({
          where: { id: userId },
          include: {
            Favorites: { select: { idFavorites: true } },
            Historique: { select: { idHistorique: true } },
            Cart: { select: { idCart: true } }, // Utilisez "Cart" au lieu de "cart"
          },
        });

        const favoriteIds = user.Favorites.map(
          (favorite) => favorite.idFavorites
        );
        const historiqueIds = user.Historique.map(
          (historique) => historique.idHistorique
        );
        const cartId = user.Cart?.idCart; // Utilisez "Cart" au lieu de "cart"

        // Supprimer les enregistrements liés à l'utilisateur
        await prisma.users.delete({
          where: { id: userId },
        });

        // Supprimer les enregistrements liés dans les tables associées
        await prisma.favorites.deleteMany({
          where: {
            idFavorites: {
              in: favoriteIds,
            },
          },
        });

        await prisma.historique.deleteMany({
          where: {
            idHistorique: {
              in: historiqueIds,
            },
          },
        });

        if (cartId) {
          await prisma.cart.delete({
            where: {
              idCart: cartId,
            },
          });
        }

        console.log(
          "Account and associated data deleted successfully for user ID:",
          userId
        );
        res.status(200).json({
          message: "Account and associated data deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Unable to delete account" });
      }
    } else {
      console.log("Method not allowed:", req.method);
      res.status(405).json({ error: "Method not allowed" });
    }
  });
}
