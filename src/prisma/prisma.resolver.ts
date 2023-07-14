import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';
import { Public } from '../auth/decorators/public.decorator';

@Resolver()
export class DatabaseResolver {
  constructor(private seedService: SeedService) {}

  @Public()
  @Mutation(() => String)
  seedDatabase() {
    return this.seedService.seed();
  }
}
