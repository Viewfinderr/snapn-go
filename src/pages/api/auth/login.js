import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;
  console.log(
    "Requête de connexion reçue avec les informations suivantes :",
    email
  );

  try {
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      console.log("Email ou mot de passe incorrect.");
      return res
        .status(401)
        .json({ error: "Email ou mot de passe incorrect." });
    }

    const jwtToken = req.cookies.jwtToken;
    if (jwtToken) {
      console.log("L'utilisateur est déjà connecté.");
      return res.status(200).json({ message: "Vous êtes déjà connecté." });
    }

    const token = jwt.sign(
      {
        userId: user.id.toString(),
        email: user.email,
        idFavorites: user.idFavorites.toString(),
        idHistorique: user.idHistorique.toString(),
        idCart: user.idCart.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7200, // 2 hours in seconds
      path: "/",
    };

    res.setHeader("Set-Cookie", serialize("jwtToken", token, cookieOptions));
    console.log(
      "Connexion réussie pour l'utilisateur avec l'adresse email :",
      user.email
    );
    res.status(200).json({ message: "Connexion réussie!" });
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion :", error);
    res.status(500).json({ error: "Quelque chose a mal tourné." });
  }
}
