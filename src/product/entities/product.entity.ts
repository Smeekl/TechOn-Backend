import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Spec } from '../../spec/entities/spec.entity';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImages } from './productImages.entity';

@Entity()
export class Product {
  constructor(payload?: CreateProductDto) {
    if (payload) {
      Object.assign(this, payload);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  short_title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  viewed: number;

  @Column({ default: 0 })
  reviews: number;

  @Column({ default: 0 })
  purchasesNumber: number;

  @Column({ default: 0 })
  quantityOnStock: number;

  @Column({ default: '' })
  image: string;

  @OneToMany(() => ProductImages, (image) => image.productId)
  @JoinColumn({ name: 'id', referencedColumnName: 'productId' })
  images: ProductImages[];

  @ManyToMany(() => Spec)
  @JoinTable()
  specs: Spec[];

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
}
