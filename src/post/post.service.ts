import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.enitity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}
  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['comments'],
    });
  }
  async create(Post: CreatePostInput): Promise<Post> {
    let post = this.postRepository.create(Post);
    return this.postRepository.save(post);
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id, {
      relations: ['comments'],
    });
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    let post: Post = this.postRepository.create(updatePostInput);
    post.id = id;
    return this.postRepository.save(post);
  }

  async remove(id: number) {
    let post = this.findOne(id);
    if (post) {
      let temp = await this.postRepository.delete(id);
      if (temp.affected === 1) {
        return post;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
  async getUser(id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
