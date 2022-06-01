import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  time: string;
  @Field({ nullable: true })
  description: string;
  @Field()
  likes: string;
  @Field(() => Int)
  userId: number;
}
