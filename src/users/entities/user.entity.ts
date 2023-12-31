import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserStatus } from '../enums/user-status.enum';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => UserStatus)
  status: UserStatus;

  password?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field()
  createdAt: Date;
}
