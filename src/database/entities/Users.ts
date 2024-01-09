import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { defaultAvatar } from "../../common/constants/userConstant";

export enum Gender {
    "MALE" = "MALE",
    "FEMALE" = "FEMALE",
    "OTHER" = "OTHER",
}

export enum typeUser {
    "EMPLOYEE" = "EMPLOYEE",
    "ADMIN" = "ADMIN",
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

    @Column({ length: 65 })
    password: string;

    @Column({ type: 'enum', enum: typeUser, default: typeUser.EMPLOYEE })
    typeUser: typeUser;

    @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
    gender: Gender;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ length: 20, nullable: true })
    cccd: string;
    
    // relation

}