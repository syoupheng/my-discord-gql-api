import { PrismaClient, User } from '@prisma/client';
import { seedDatabase } from 'prisma/utils';
const prisma = new PrismaClient();

seedDatabase(prisma)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
