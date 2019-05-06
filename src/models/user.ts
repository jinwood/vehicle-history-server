import {
    Entity,
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { Length, IsEmail } from 'class-validator';
import { Vehicle } from './vehicle';

@Entity('users')

export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(type => Vehicle, vehicle => vehicle.user)
    vehicles: Vehicle[]

    @Column('text')
    givenName: string;

    @Column('text')
    familyName: string

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