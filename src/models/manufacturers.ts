import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('manufacturers')
export class Manufacturers {
    constructor(manufacturer: string) {
        this.manufacturer = manufacturer;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    manufacturer: string;
}