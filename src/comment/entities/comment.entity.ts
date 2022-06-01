import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.enitity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notification } from 'src/notification/entities/notification.entity';

@ObjectType()
@Entity()
export class Comment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  message: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field(() => Int)
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, { cascade: true })
  @Field(() => Post)
  @JoinColumn()
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { cascade: true })
  @Field(() => User)
  @JoinColumn()
  user: User;

  // @OneToMany(() => Notification, notification => notification.comment)
  // @Field(() => [Notification])
  // notifications: Notification[]
}
