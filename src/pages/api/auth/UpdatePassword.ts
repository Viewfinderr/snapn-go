import prisma from "../../../libs/prismadb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Middleware pour vérifier le JWT et l'authentification de l'utilisateur
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

// Endpoint pour changer le mot de passe
export default async function handler(req, res) {
  verifyTokenAndAuthenticate(req, res, async () => {
    if (req.method === "POST") {
      const { newPassword } = req.body;
      try {
        const userId = req.userId;

        if (!isValidPassword(newPassword)) {
          console.log("Invalid password format");
          return res.status(400).json({ error: "Invalid password format" });
        }

        console.log("Updating password for user ID:", userId);

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mettre à jour le mot de passe de l'utilisateur avec le mot de passe haché
        await prisma.users.update({
          where: { id: userId },
          data: { passwordHash: hashedPassword }, // Mettre à jour le champ passwordHash avec le mot de passe haché
        });

        console.log("Password updated successfully for user ID:", userId);
        res.status(200).json({ message: "Password updated successfully" });
      } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Unable to update password" });
      }
    } else {
      console.log("Method not allowed:", req.method);
      res.status(405).json({ error: "Method not allowed" });
    }
  });
}

const isValidPassword = (password) => {
  return password.length >= 8;
};
