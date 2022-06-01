import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.enitity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['posts', 'comments'],
    });
  }
  async create(User: CreateUserInput): Promise<User> {
    let user = this.userRepository.create(User);
    return await this.userRepository.save(user);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    let user: User = this.userRepository.create(updateUserInput);
    user.id = id;
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    let user = this.userRepository.findOne(id);
    if (user) {
      let temp = await this.userRepository.delete(id);
      if (temp.affected === 1) {
        return user;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: ['posts', 'comments'],
    });
  }
}
