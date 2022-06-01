import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.enitity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private postService: PostService,
    private userService: UserService,
  ) {}
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
  async create(Comment: CreateCommentInput): Promise<Comment> {
    let comment = this.commentRepository.create(Comment);
    return this.commentRepository.save(comment);
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    let comment: Comment = this.commentRepository.create(updateCommentInput);
    comment.id = id;
    return this.commentRepository.save(comment);
  }

  async remove(id: number) {
    let comment = this.commentRepository.findOne(id);
    if (comment) {
      let temp = await this.commentRepository.delete(id);
      if (temp.affected === 1) {
        return comment;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }

  async getPost(id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  async getUser(id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
