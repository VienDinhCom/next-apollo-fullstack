import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import { User } from '~/backend/types/graphql.type';

@Entity('user')
export class UserEntity implements User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
