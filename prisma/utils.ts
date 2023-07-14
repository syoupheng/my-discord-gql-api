import { readFile } from 'fs/promises';
import { PrismaClient, User } from '@prisma/client';

export async function seedDatabase(prisma: PrismaClient) {
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

  console.log('🌱 Users seeded');
}
