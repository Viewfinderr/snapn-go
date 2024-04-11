import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie"; // Importer la fonction serialize de la bibliothèque cookie

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(
      "Requête de connexion reçue avec les informations suivantes :",
      email
    );

    try {
      // Recherche de l'utilisateur par e-mail
      const user = await prisma.users.findFirst({
        where: {
          email,
        },
      });
      console.log("Utilisateur trouvé dans la base de données :", user);

      if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        console.log("Email ou mot de passe incorrect.");
        return res
          .status(401)
          .json({ error: "Email ou mot de passe incorrect." });
      }

      // Vérifier si le JWT est déjà présent dans les cookies
      const jwtToken = req.cookies.jwtToken;
      if (jwtToken) {
        console.log("L'utilisateur est déjà connecté.");
        return res.status(200).json({ message: "Vous êtes déjà connecté." });
      }

      // Convertir les BigInt en chaînes de caractères
      const userId = user.id.toString();
      const favoritesId = user.idFavorites.toString();
      const historiqueId = user.idHistorique.toString();
      const cartId = user.idCart.toString();

      // Générer le JWT
      const token = jwt.sign(
        {
          userId,
          email: user.email,
          idFavorites: favoritesId,
          idHistorique: historiqueId,
          idCart: cartId,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      console.log(token);

      // Définir le cookie sécurisé contenant le JWT
      const cookieOptions = {
        httpOnly: true, // Empêche l'accès au cookie via JavaScript
        secure: true, // Nécessite une connexion HTTPS
        sameSite: "strict", // Protection contre les attaques CSRF
        maxAge: 2 * 60 * 60, // Durée de validité du cookie en secondes (2 heures dans ce cas)
        path: "/", // Chemin du cookie (racine dans ce cas)
      };

      res.setHeader("Set-Cookie", serialize("jwtToken", token, cookieOptions));

      console.log(
        "Connexion réussie pour l'utilisateur avec l'adresse email :",
        user.email
      );
      res.status(200).json({ message: "Connexion réussie!" });
    } catch (error) {
      console.log("Erreur lors de la tentative de connexion :", error);
      res.status(500).json({ error: "Quelque chose a mal tourné." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
