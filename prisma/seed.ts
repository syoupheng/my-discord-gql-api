import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();
import { readFile } from 'fs/promises';

async function main() {
  const usersData = await readFile('./prisma/users.json', 'utf-8').catch((err) => {
    console.error(err);
    return null;
  });

  if (!usersData) {
    console.error('No users data');
    return;
  }

  const users: User[] = JSON.parse(usersData);
  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { ...user, createdAt: new Date() },
      }),
    ),
  );

  console.log('Users seeded');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
