import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Supprimer le cookie JWT en le définissant avec une date d'expiration dans le passé
  res.setHeader(
    "Set-Cookie",
    "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict"
  );
  res.status(200).json({ message: "Déconnexion réussie!" });
}
