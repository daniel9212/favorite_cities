import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '@/app/db/entities/user';
import { City } from '@/app/db/entities/city';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  content!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @ManyToOne('User', 'reviews')
  user!: User;

  @ManyToOne('City', 'reviews')
  city!: City;
}
