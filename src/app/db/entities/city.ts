import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '@/app/db/entities/user';
import { Review } from '@/app/db/entities/review';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ type: 'varchar' })
  latitude!: string;

  @Column({ type: 'varchar' })
  longitude!: string;

  @ManyToMany('User', 'favoriteCities')
  users!: User[];

  @OneToMany('Review', 'city')
  reviews!: Review[];
}
