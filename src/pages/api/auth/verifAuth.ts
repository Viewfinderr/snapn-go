import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const token = req.cookies.jwtToken;

      // Vérifier si le cookie jwtToken est présent dans la requête
      if (!token) {
        // Plutôt que de renvoyer une erreur, renvoyez un statut neutre
        return res.status(200).json({ message: "Utilisateur non connecté." });
      }

      // Vérifier le token JWT
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err: Error, decoded: JwtPayload) => {
          if (err) {
            return res
              .status(401)
              .json({ message: "Accès non autorisé. Token invalide." });
          } else {
            // Le token est valide, vous pouvez accorder l'accès à l'utilisateur
            return res.status(200).json({ message: "Utilisateur connecté." });
          }
        }
      );
    } catch (error) {
      console.error("Erreur de vérification du token : ", error);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
  } else {
    return res.status(405).json({ message: "Méthode non autorisée." });
  }
}
