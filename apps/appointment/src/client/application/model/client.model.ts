import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ScheduleModel } from 'apps/appointment/src/schedule/application/model/schedule.model';

@Entity({ name: 'clients' })
export class ClientModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  cpf: string;

  @Column({ type: 'varchar' })
  rg: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'boolean' })
  active: boolean;

  @OneToMany(() => ScheduleModel, (schedule) => schedule.client)
  schedules: ScheduleModel[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
