import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (email: string, password: string) => {
  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

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
        idFavorites: favorites.idFavorites, // Assurez-vous que ces champs correspondent aux champs réels dans votre modèle Prisma
        idHistorique: historique.idHistorique,
        idCart: cart.idCart,
      },
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      throw error; // Renvoyer explicitement l'erreur utilisateur existante
    }
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

      // Créer un nouvel utilisateur seulement s'il n'existe pas déjà
      const newUser = await createUser(email, password);

      console.log('New user created:', newUser);

      // Utiliser JSON.stringify avec un réviseur pour convertir BigInt en chaînes
      const userJson = JSON.stringify(newUser, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );

      res.setHeader('Content-Type', 'application/json');
      res.status(201).end(userJson);
      console.log('User created');
    } catch (error) {
      if (error.message === 'User already exists') {
        res.status(400).json({ error: 'User already exists' });
      } else {
        console.error('Error processing POST request:', error);
        res.status(500).json({ error: 'Failed to create user' });
      }
    }
  } else {
    console.warn(`Method ${req.method} not allowed`);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
