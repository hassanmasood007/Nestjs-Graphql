import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  message: string;
  @Field(() => Int)
  postId: number;
  @Field(() => Int)
  userId: number;
}
