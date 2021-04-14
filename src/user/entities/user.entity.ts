import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, JoinColumn,
} from 'typeorm';
import { createHash } from 'crypto';
import { LoginDto } from '../../auth/dto/auth.dto';
import {Order} from "../../order/entities/order.entity";

@Entity()
export class User {
  constructor(payload?: LoginDto) {
    if (payload) {
      Object.assign(this, {
        ...payload,
        password: createHash('sha256').update(payload.password).digest('hex'),
      });
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  password: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  token: string;

  @Column({ type: 'int', default: 1 })
  visits: number;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;

  @OneToMany(()=>Order, orders => orders.userId)
  @JoinColumn({name: 'id', referencedColumnName: 'userId'})
  orders: Order[];
}
