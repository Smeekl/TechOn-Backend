import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn,
} from 'typeorm';
import {CreateProductImagesDto} from "../dto/productImages.dto";
import {Product} from "./product.entity";

@Entity()
export class ProductImages {
    constructor(payload?: CreateProductImagesDto) {
        if (payload) {
            Object.assign(this, payload);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Product, product => product.id)
    @JoinColumn({name: 'productId', referencedColumnName: 'id'})
    productId: Product[];

    @Column()
    image: string;


    @Column({
        type: 'enum',
        enum: ['img', 'video'],
        default: 'img',
    })
    mediaType: string;

    @CreateDateColumn()
    created_time: Date;

    @UpdateDateColumn()
    updated_time: Date;
}
