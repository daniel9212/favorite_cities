import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { City } from '@/app/db/entities/city';
import { Review } from '@/app/db/entities/review';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @ManyToMany('City', 'users', { cascade: true })
  @JoinTable()
  favoriteCities!: City[];

  @OneToMany('Review', 'users')
  reviews!: Review[];
}
