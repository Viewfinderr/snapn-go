// lib/prismaServices.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOneItem(idItem: string | number) {
  const item = await prisma.items.findUnique({
    where: {
      idItem: typeof idItem === 'string' ? parseInt(idItem, 10) : idItem,
    },
  });
  return item;
}
