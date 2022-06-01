import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  email: string; // cannot change email
  @Field()
  password: string; // remove
  @Field({ nullable: true })
  bio: string;
  @Field({ nullable: true })
  description: string;
}
