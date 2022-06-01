import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.enitity';
import { Notificationtype } from '../NotificationType';

@ObjectType()
export class Notification {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  type: Notificationtype;

  @Column()
  @Field()
  message: string;

  @Column()
  @Field(() => Int)
  commentId: number;

  @Column()
  @Field(() => Int)
  postId: number;

  @Column()
  @Field(() => Int)
  senderId: number;

  @Column()
  @Field(() => Int)
  receiverId: number;

  // @ManyToOne(() => Post, post => post.notifications, { cascade: true })
  // @Field(() => Post)
  // @JoinColumn()
  // post: Post

  // @ManyToOne(() => Comment, comment => comment.notifications, { cascade: true })
  // @Field(() => Comment)
  // @JoinColumn()
  // comment: Comment

  // @ManyToOne(() => User, sender => sender.notifications, { cascade: true })
  // @Field(() => User)
  // @JoinColumn([{ name: "senderId" }])
  // sender: User

  // @ManyToOne(() => User, receiver => receiver.notifications, { cascade: true })
  // @JoinColumn([{ name: "receiverId" }])
  // receiver: User
}

// table Notification{
//   id
//   Notificationtype
//   postid
//   cmntid
//   replyCmntuid
//   sender
//   reciever
// }

// import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { User } from 'src/user/entities/user.enitity';
// import { Comment } from 'src/comment/entities/comment.entity';
// import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// @ObjectType()
// @Entity()
// export class Post {
//   @Field(() => Int)
//   @PrimaryGeneratedColumn()
//   id: number

//   @Field()
//   @Column()
//   time: string

//   @Field({ nullable: true })
//   @Column({ nullable: true })
//   description: string

//   @Field()
//   @Column()
//   likes: string

//   @Column()
//   @Field(() => Int)
//   catId: number

//   @Column()
//   @Field(() => Int)
//   dogId: number

//   @OneToMany(() => Comment, comment => comment.post)
//   @Field(() => [Comment], { nullable: true })
//   comments: Comment[]

//   @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
//   @Field(() => User)
//   @JoinColumn([{ name: "catId" }])
//   user: User

//   @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
//   @JoinColumn([{ name: "dogId" }])
//   users: User
// }

//  Context: like comment reply addFriend share
//  senderId
//  recieverId
//  postId
//  commentId
//  agar type like hoe to postid ya commentid present hone chaye
//  agar type comment hoe to postId hone chaye
//  agar type reply hoe to postID or commentID
//  agar type addFriend ho to sirf sender or reciever id ho is ke ialwa kuch na ho
