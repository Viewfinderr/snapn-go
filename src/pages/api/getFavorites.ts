// pages/api/getFavorites.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getFavorites(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const favorites = await prisma.favorites.findMany({
      where: {
        Users: {
          some: {
            id: parseInt(userId)
          }
        }
      },
      include: {
        ItemsFavorites: {
          include: {
            Items: true  // Assurez-vous que cette relation correspond à votre modèle de données
          }
        }
      }
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
