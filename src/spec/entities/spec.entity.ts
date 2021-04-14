import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

@Entity()
export class Spec {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}
