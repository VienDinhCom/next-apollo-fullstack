import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import { User as UserType } from '~/backend/types/graphql';

@Entity()
export class User implements UserType {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
