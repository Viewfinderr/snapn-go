import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (email: string, password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    console.log('Creating user...');

    // Créer les entités nécessaires avant de créer l'utilisateur
    const favorites = await prisma.favorites.create({
      data: {},
    });

    console.log('Favorites created:', favorites);

    const historique = await prisma.historique.create({
      data: {},
    });

    console.log('Historique created:', historique);

    const cart = await prisma.cart.create({
      data: {},
    });

    console.log('Cart created:', cart);

    return prisma.users.create({
      data: {
        email,
        passwordHash,
        idFavorites: favorites.idFavorites, 
        idHistorique: historique.idHistorique, 
        idCart: cart.idCart, 
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      console.log('Creating new user with email:', email);

      const newUser = await createUser(email, password);

      console.log('New user created:', newUser);

      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error('Error processing POST request:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    console.warn(`Method ${req.method} not allowed`);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
