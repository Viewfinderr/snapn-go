// pages/api/items/[idItem].ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { idItem } = req.query;
  // console.log('idItem:', idItem);

  if (typeof idItem !== 'string') {
    // console.log('Invalid item ID:', idItem);
    return res.status(400).json({ error: 'Invalid item ID' });
  }

  try {
    const item = await prisma.items.findUnique({
      where: {
        idItem: Number(idItem), 
      },
    });
    // console.log('Item found:', item);

    if (!item) {
      // console.log('Item not found');
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'item:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}






  
