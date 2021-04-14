import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import {Spec} from "../../spec/entities/spec.entity";
import {CreateProductDto} from "../dto/product.dto";

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

    @Column()
    short_title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    viewed: number;

    @Column()
    reviews: number;

    @Column()
    purchasesNumber: number;

    @Column()
    quantityOnStock: number;

    @ManyToMany(()=>Spec)
    @JoinTable()
    specs: Spec[];


    @CreateDateColumn()
    created_time: Date;

    @UpdateDateColumn()
    updated_time: Date;
}
