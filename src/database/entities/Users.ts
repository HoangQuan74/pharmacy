import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { defaultAvatar } from "../../common/constants/userConstant";
import { Order } from "./Order";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

export enum typeUser {
    EMPLOYEE = "EMPLOYEE",
    ADMIN = "ADMIN",
}
@Entity({ name: 'users' })
export class Users extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    fullName: string;

    @Column({ length: 500, default: defaultAvatar })
    avatar: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 65, select: false })
    password: string;

    @Column({ type: 'enum', enum: typeUser, default: typeUser.EMPLOYEE })
    typeUser: typeUser;

    @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
    gender: Gender;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ type: 'decimal', precision: 20, scale: 2, default: 10000000 })
    salary: number;

    @Column({ length: 20, nullable: true })
    cccd: string;

    // relation
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}