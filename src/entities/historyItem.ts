import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Vehicle } from './vehicle';
import { HistoryItemType } from '../enums/historyItemType';

@Entity('historyItems')
export class HistoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Vehicle, vehicle => vehicle.historyItems)
  vehicle: Vehicle;

  @Column('int')
  type: HistoryItemType;

  @Column('text')
  description: string;

  @Column('text')
  media: [string];
}
