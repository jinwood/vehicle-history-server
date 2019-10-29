import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { User } from './user';
import { HistoryItem } from './historyItem';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.vehicles, {
    onDelete: 'CASCADE'
  })
  user: User;

  @OneToMany(type => HistoryItem, historyItem => historyItem.vehicle)
  historyItems: HistoryItem[];

  @Column('text')
  manufacturer: string;

  @Column('text')
  model: string;

  @Column()
  engineSize: number;

  @Column('text')
  registration: string;
}
