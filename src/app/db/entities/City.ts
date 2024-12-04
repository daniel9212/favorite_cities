import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { User } from '@/app/db/entities/User';

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

  @ManyToMany(() => User, user => user.favoriteCities)
  users!: User[];
}
