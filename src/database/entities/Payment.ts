import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Order } from "./Order";

@Entity({ name: 'payment' })
export class Payment extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    paymentAmount: number;

    // relation
    @ManyToOne(() => Order, (order) => order.id)
    @JoinColumn({
        name: "orderId",
        referencedColumnName: "id",
    })
    order: Order;
}