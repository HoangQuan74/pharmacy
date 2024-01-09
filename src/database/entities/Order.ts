import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Users } from "./Users";
import { BusinessPartner } from "./BusinessPartner";
import { Payment } from "./Payment";
import { OrderDetail } from "./OrderDetail";

export enum TypeOrder {
    BUY = "BUY",
    SELL = "SELL",
}

export enum StatusPaid {
    NOT_PAID = "NOT_PAID",
    PAIDING = "PAIDING",
    PAID = "PAID",
}

@Entity({ name: 'order' })
export class Order extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    partnerId: number;

    @Column({ type: 'enum', enum: TypeOrder, default: TypeOrder.SELL })
    typeOrder: TypeOrder;

    @Column({ type: 'decimal', precision: 20, scale: 2 })
    totalAmount: number;

    @Column({ type: 'enum', enum: StatusPaid, default: StatusPaid.NOT_PAID })
    status: StatusPaid;

    // relation
    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({
        name: "userId",
        referencedColumnName: "id",
    })
    user: Users;

    @ManyToOne(() => BusinessPartner, (partner) => partner.id)
    @JoinColumn({
        name: "partnerId",
        referencedColumnName: "id",
    })
    partner: BusinessPartner;

    @OneToMany(() => Payment, (payment) => payment.order)
    payments: Payment[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetail[];
}