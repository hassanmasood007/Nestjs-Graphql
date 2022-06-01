import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field(() => Int)
  id: number;
  @Field()
  time: string;
  @Field({ nullable: true })
  description: string;
  @Field()
  likes: string;
}
