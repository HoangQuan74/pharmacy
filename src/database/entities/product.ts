import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { ProductCategory } from "./ProductCategory";

export enum UnitProduct {
    BOX = 'BOX',
    EACH = 'EACH',
    PACKAGE = 'PACKAGE',
    KILOGRAM = 'KILOGRAM',
    GRAM = 'GRAM',
}
@Entity({ name: 'product' })
export class Product extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    categoryId: number;

    @Column({ length: 500, nullable: true })
    usage: string;                          // cách sử dụng

    @Column({ length: 500, nullable: true })
    ingredient: string;                     // thành phần

    @Column({ length: 500, nullable: true })
    storageRequirement: string;             // yêu cầu bảo quản

    @Column({ type: 'decimal', precision: 20, scale: 2 })
    price: number;

    @Column()
    quanlity: number

    @Column({ type: 'enum', enum: UnitProduct, default: UnitProduct.EACH })
    unit: UnitProduct;
    // relation
    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.id)
    @JoinColumn({
        name: "categoryId",
        referencedColumnName: "id",
    })
    category: ProductCategory;
}