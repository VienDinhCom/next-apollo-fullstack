import { Entity, Column, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import { User } from '~/backend/types/graphql';
import { PostEntity } from '~/backend/modules/entities';

@Entity('user')
export class UserEntity implements User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // @OneToMany(type => PostEntity, post => post.author)
  // posts: PostEntity[];
}
