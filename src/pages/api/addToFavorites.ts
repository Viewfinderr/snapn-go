// pages/api/addToFavorites.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FavoriteRequest {
  userId: number;
  itemId: number;
}

export default async function addToFavorites(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, itemId } = req.body as FavoriteRequest;

  if (!userId || !itemId) {
    return res.status(400).json({ message: 'User ID and Item ID are required' });
  }

  try {
    // Find or create a favorite record for this user
    const favorite = await prisma.favorites.findFirst({
      where: {
        Users: {
          some: {
            id: userId
          }
        }
      }
    }) || await prisma.favorites.create({
      data: {
        Users: {
          connect: [{ id: userId }]
        }
      }
    });

    // Add the item to favorites
    const favoriteItem = await prisma.itemsFavorites.create({
      data: {
        idItem: itemId,
        idFavorite: favorite.idFavorites
      }
    });

    res.status(200).json(favoriteItem);
  } catch (error) {
    console.error('Error adding item to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}