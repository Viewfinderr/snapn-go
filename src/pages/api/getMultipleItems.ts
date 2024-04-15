import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ids } = req.query;
  if (typeof ids !== "string") {
    return res.status(400).json({
      error: "Invalid query parameter, expected comma-separated string of IDs",
    });
  }

  const idArray = ids
    .split(",")
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !isNaN(id));

  if (idArray.length === 0) {
    return res.status(400).json({ error: "No valid IDs provided" });
  }

  try {
    const items = await prisma.items.findMany({
      where: {
        idItem: {
          in: idArray,
        },
      },
    });

    // Calculer la quantité pour chaque ID d'article
    const quantityMap = idArray.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    // Ajouter la quantité calculée à chaque article
    const itemsWithQuantities = items.map((item) => ({
      ...item,
      quantity: quantityMap[item.idItem] || 0,
    }));

    // Convertir les BigInt en chaînes pour la sérialisation JSON
    const response = JSON.stringify(itemsWithQuantities, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );

    res.setHeader("Content-Type", "application/json");
    res.status(200).end(response);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}