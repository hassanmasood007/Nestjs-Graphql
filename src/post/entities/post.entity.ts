import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.enitity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  time: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string

  @Field()
  @Column()
  likes: string

  @Column()
  @Field(() => Int)
  userId: number

  @OneToMany(() => Comment, comment => comment.post)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[]

  @ManyToOne(() => User, user => user.posts, { cascade: true })
  @Field(() => User)
  @JoinColumn()
  user: User

  // @OneToMany(() => Notification, notification => notification.post)
  // @Field(() => [Notification], { nullable: true })
  // notifications: Notification[]

}



//  Context: like comment reply addFriend share
//  senderId
//  recieverId 
//  postId
//  commentId 
//  agar type like hoe to postid ya commentid present hone chaye 
//  agar type comment hoe to postId hone chaye
//  agar type reply hoe to postID or commentID
//  agar type addFriend ho to sirf sender or reciever id ho is ke ialwa kuch na ho    

