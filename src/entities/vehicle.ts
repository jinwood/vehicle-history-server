import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { User } from './user';
import { HistoryItem } from './historyItem';
import { ObjectType, Field, ID } from 'type-graphql';
import { RelationalColumn } from '../columns';

@Entity('vehicles')
@ObjectType()
export class Vehicle {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.vehicles,
    {
      onDelete: 'CASCADE'
    }
  )
  @Field(type => User)
  user: User;

  @RelationalColumn()
  userId: string;

  @OneToMany(
    type => HistoryItem,
    historyItem => historyItem.vehicle
  )
  historyItems: HistoryItem[];

  @Field(type => String)
  @Column('text')
  manufacturer: string;

  @Column('text')
  model: string;

  @Column()
  engineSize: number;

  @Column('text')
  registration: string;
}
