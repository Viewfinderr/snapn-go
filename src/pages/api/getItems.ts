// pages/api/items.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
    const items = await prisma.items.findMany();
    // Utilisation d'une fonction de remplacement pour gérer les BigInt
    const itemsJson = JSON.stringify(items, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value // Convertit les BigInt en String
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(itemsJson); // Utilise .end pour envoyer la chaîne JSON directement
    // console.log(itemsJson); 
}


