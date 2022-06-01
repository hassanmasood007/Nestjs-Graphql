import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Notification } from 'src/notification/entities/notification.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number; //STRING
  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  password: string; // no need for password
  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  // @OneToMany(() => Notification, notification => notification.sender)
  // @Field(() => [Notification], { nullable: true })
  // notifications: Notification[]
}
