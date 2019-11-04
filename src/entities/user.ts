import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { Length, IsEmail } from 'class-validator';
import { Vehicle } from './vehicle';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => [Vehicle], {nullable:true})
  @OneToMany(type => Vehicle, vehicle => vehicle.user, {
    cascade: true
  })
  vehicles: Vehicle[];

  @Field(type => String)
  @Column('text')
  givenName: string;

  @Field(type => String)
  @Column('text')
  familyName: string;

  @Field(type => String)
  @Column('text')
  @Length(5, 100)
  @IsEmail()
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
