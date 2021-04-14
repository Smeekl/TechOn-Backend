import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import {User} from "../../user/entities/user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>User, user => user.orders)
  @JoinColumn({name: 'user', referencedColumnName: 'id'})
  userId: User;

  @Column()
  orderDate: string;

  @Column()
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['done', 'process'],
    default: 'process',
  })
  state: string;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
}
