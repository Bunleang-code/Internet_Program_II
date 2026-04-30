import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./categories.entity";


@Entity('products')
export class Product {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @Column({default: 0})
    stock!: number;

    @Column({nullable: true})
    image!: string;

    @Column({ unique: true })
    slug!: string;

    @ManyToOne(() => Category, (category) => category.products)
    category!: Category;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}