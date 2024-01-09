import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Product } from "./product";

@Entity({ name: 'm_product_category' })
export class ProductCategory extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // relation
    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}