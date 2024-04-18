import prisma from "../../../libs/prismadb";
import jwt from "jsonwebtoken";

// Middleware pour vérifier le JWT et l'authentification de l'utilisateur
const verifyTokenAndAuthenticate = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Convertit les BigInts en nombres JavaScript simples
const convertBigIntsToNumbers = (user) => {
  return {
    ...user,
    id: Number(user.id),
    idFavorites: Number(user.idFavorites),
    idHistorique: Number(user.idHistorique),
    idCart: Number(user.idCart),
  };
};

// Endpoint pour changer l'email
export default async function handler(req, res) {
  verifyTokenAndAuthenticate(req, res, async () => {
    if (req.method === "POST") {
      const { newEmail } = req.body;
      try {
        const userId = req.userId; // Utiliser l'ID de l'utilisateur à partir du JWT

        // Vérifier si l'e-mail est déjà utilisé par un autre utilisateur
        const userWithSameEmail = await prisma.users.findFirst({
          where: { email: newEmail },
        });
        if (userWithSameEmail && userWithSameEmail.id !== userId) {
          return res.status(400).json({ error: "Email already in use" });
        }

        // Mettre à jour l'e-mail de l'utilisateur
        let updatedUser = await prisma.users.update({
          where: { id: userId },
          data: { email: newEmail },
        });

        // Convertir les BigInts en nombres JavaScript simples dans la réponse JSON
        updatedUser = convertBigIntsToNumbers(updatedUser);

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error updating email:", error);
        res.status(500).json({ error: "Unable to update email" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  });
}
