import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { seedDatabase } from '../../prisma/utils';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async clearAllTables() {
    const tablenames = await this.prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ');

    try {
      await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    } catch (error) {
      console.log({ error });
    }
  }

  async seed() {
    if (process.env.NODE_ENV === 'production' && process.env.STAGING_ENV !== 'true') {
      throw new ForbiddenException('Cannot seed database in production !');
    }
    await this.clearAllTables();
    await seedDatabase(this.prisma);
    return '🌱 Database seeded';
  }
}
