import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.enitity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(@Args('CommentInput') createComment: CreateCommentInput) {
    return this.commentService.create(createComment);
  }

  @Query(() => [Comment], { name: 'getAllComment' })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { name: 'getCommentById' })
  findOne(@Args('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment, { name: 'updateComment' })
  updateComment(@Args('updateComment') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id') id: number) {
    return this.commentService.remove(id);
  }

  @ResolveField(() => Post)
  post(@Parent() comment: Comment) {
    return this.commentService.getPost(comment.postId);
  }

  @ResolveField(() => User)
  user(@Parent() comment: Comment) {
    return this.commentService.getUser(comment.userId);
  }
}
