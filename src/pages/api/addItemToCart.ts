import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res
        .status(401)
        .json({ error: "You must be logged in to add items to cart." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Failed to decode or verify JWT:", error);
      return res.status(401).json({ error: "Invalid token." });
    }

    const { itemId } = req.body;
    const { idCart } = decoded;

    try {
      const newItemInCart = await prisma.itemsCart.create({
        data: {
          Items: {
            connect: { idItem: Number(itemId) },
          },
          Cart: {
            connect: { idCart: Number(idCart) },
          },
        },
      });

      // Convertir les BigInt en String pour l'envoi JSON
      const newItemInCartJson = JSON.stringify(newItemInCart, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      );

      res.status(201).json(JSON.parse(newItemInCartJson)); // S'assurer de renvoyer un objet JSON
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      res.status(500).json({ error: "Unable to add item to cart" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}