import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Order } from "./Order";

@Entity({ name: 'order_detail' })
export class OrderDetail extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    productId: number;

    @Column({ default: 1 })
    quantity: number;

    @Column({ type: 'decimal', precision: 20, scale: 2 })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 20, scale: 2 })
    price: number;

    // relation
    @ManyToOne(() => Order, (order) => order.id)
    @JoinColumn({
        name: "orderId",
        referencedColumnName: "id",
    })
    order: Order;
}