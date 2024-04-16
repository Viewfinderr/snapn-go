// pages/api/getPurchaseHistory.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getPurchaseHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const history = await prisma.historique.findMany({
      where: {
        Users: {
          some: {
            id: Number(userId)
          }
        }
      },
      include: {
        ItemsHistorique: {
          include: {
            Items: true
          }
        }
      }
    });

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getPurchaseHistory;
