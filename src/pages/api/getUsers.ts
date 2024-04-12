import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUsers() {
  const users = await prisma.users.findMany()
  return users
}
