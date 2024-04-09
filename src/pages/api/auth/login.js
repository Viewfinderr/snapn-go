import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log('Requête de connexion reçue avec les informations suivantes :', email);

    try {
      // Recherche de l'utilisateur par e-mail
      const user = await prisma.users.findFirst({
        where: {
          email,
        },
      });
      console.log('Utilisateur trouvé dans la base de données :', user);

      if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        console.log('Email ou mot de passe incorrect.');
        return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
      }

      // Convertir les BigInt en chaînes de caractères
      const userId = user.id.toString();
      const favoritesId = user.idFavorites.toString();
      const historiqueId = user.idHistorique.toString();
      const cartId = user.idCart.toString();

      // Générer le JWT
      const token = jwt.sign(
        { 
          userId,
          email: user.email,
          idFavorites: favoritesId,
          idHistorique: historiqueId,
          idCart: cartId
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      console.log('Connexion réussie pour l\'utilisateur avec l\'adresse email :', user.email);
      res.status(200).json({ message: 'Connexion réussie!', token });
    } catch (error) {
      console.log('Erreur lors de la tentative de connexion :', error);
      res.status(500).json({ error: 'Quelque chose a mal tourné.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
