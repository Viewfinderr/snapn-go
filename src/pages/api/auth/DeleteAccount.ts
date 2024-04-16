import jwt from "jsonwebtoken";
import prisma from "../../../libs/prismadb";

const verifyTokenAndAuthenticate = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    console.log("No JWT token found in cookies");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Décomposer les données décodées pour extraire les IDs nécessaires
    const { userId, idFavorites, idHistorique, idCart } = decoded;
    req.userId = userId;
    req.idFavorites = idFavorites;
    req.idHistorique = idHistorique;
    req.idCart = idCart;

    console.log(
      "JWT token verified. Data extracted:",
      userId,
      idFavorites,
      idHistorique,
      idCart
    );
    next();
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default async function handler(req, res) {
  verifyTokenAndAuthenticate(req, res, async () => {
    if (req.method === "POST") {
      const { userId, idFavorites, idHistorique, idCart } = req;
      console.log(
        "Authenticated user ID and associated IDs:",
        userId,
        idFavorites,
        idHistorique,
        idCart
      );
      try {
        console.log(
          "Attempting to delete associated entities for user ID:",
          userId
        );

        // Deleting associated entities
        if (idFavorites) {
          const deleteFavorites = await prisma.favorites.deleteMany({
            where: { idFavorites },
          });
          console.log("Favorites deleted:", deleteFavorites.count);
        }

        if (idHistorique) {
          const deleteHistorique = await prisma.historique.deleteMany({
            where: { idHistorique },
          });
          console.log("Historique deleted:", deleteHistorique.count);
        }

        if (idCart) {
          const deleteItemsCart = await prisma.itemsCart.deleteMany({
            where: { idCart: BigInt(idCart) },
          });
          console.log("Items in cart deleted:", deleteItemsCart.count);
          const deleteCart = await prisma.cart.delete({
            where: { idCart },
          });
          console.log("Cart deleted:", deleteCart);
        }

        console.log("User deleted:");

        res.status(200).json({
          message: "Account and associated data deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Unable to delete account" });
      }
    } else {
      console.log("Method not allowed for request type:", req.method);
      res.status(405).json({ error: "Method not allowed" });
    }
  });
}
