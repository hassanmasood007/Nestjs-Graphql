import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { User } from 'src/user/entities/user.enitity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('PostInput') createPost: CreatePostInput) {
    return this.postService.create(createPost);
  }

  @Query(() => [Post], { name: 'getAllPost' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'getPostById' })
  findOne(@Args('id') id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post, { name: 'updatePost' })
  updatePost(@Args('updatePost') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id') id: number) {
    return this.postService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post) {
    return this.postService.getUser(post.userId);
  }
}
