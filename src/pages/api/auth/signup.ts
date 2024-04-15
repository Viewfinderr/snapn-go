import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CookieSerializeOptions, serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// Fonction pour convertir les valeurs BigInt en chaînes pour la compatibilité JSON
function convertBigInt(user: any) {
  return JSON.stringify(user, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

const createUser = async (email: string, password: string) => {
  try {
    const existingUser = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const favorites = await prisma.favorites.create({ data: {} });
    const historique = await prisma.historique.create({ data: {} });
    const cart = await prisma.cart.create({ data: {} });

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
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const newUser = await createUser(email, password);
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(
      { userId: newUser.id.toString(), email: newUser.email },
      secret,
      { expiresIn: "2h" }
    );

    const cookieOptions: CookieSerializeOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7200,
      path: "/",
    };

    res.setHeader("Set-Cookie", serialize("jwtToken", token, cookieOptions));
    const userJson = convertBigInt(newUser);
    res.status(201).json({
      message: "User created and logged in",
      user: JSON.parse(userJson),
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
