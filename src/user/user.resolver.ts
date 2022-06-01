import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.enitity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User], { name: 'getAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('userInput') createUser: CreateUserInput) {
    return this.userService.create(createUser);
  }

  @Mutation(() => User)
  updateUser(@Args('userUpdateInput') user: UpdateUserInput) {
    return this.userService.update(user.id, user);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: number) {
    return this.userService.remove(id);
  }

  @Query(() => User, { name: 'getUserById' })
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }
}
