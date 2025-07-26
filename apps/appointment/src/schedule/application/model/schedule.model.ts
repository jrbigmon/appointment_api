import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BillingTypeEnum } from '../../domain/enums/billing-type.enum';
import { ClientModel } from './client.model';
import { ScheduleStatusEnum } from '../../domain/enums/schedule-status.enum';

@Entity({ name: 'schedules' })
export class ScheduleModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @ManyToOne(() => ClientModel, (client) => client.schedules)
  client: ClientModel;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ name: 'price_per_hour', type: 'decimal' })
  pricePerHour: number;

  @Column({ type: 'varchar' })
  status: ScheduleStatusEnum;

  @Column({ name: 'billing_type', type: 'varchar' })
  billingType: BillingTypeEnum;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
