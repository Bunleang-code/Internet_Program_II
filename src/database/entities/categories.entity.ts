import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./products.entity";


@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string

    @Column({nullable: true})
    description: string;

    @Column({unique: true})
    slug: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}