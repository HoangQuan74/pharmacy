import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { defaultAvatar } from "../../common/constants/userConstant";

export enum TypePartner {
    BUSINESS = "BUSINESS",
    CLIENT = "CLIENT",
}
@Entity({ name: 'business_partner' })
export class BusinessPartner extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ nullable: true })
    email: string;

    @Column({ type: 'enum', enum: TypePartner, default: TypePartner.CLIENT })
    typePartner: TypePartner;

    @Column({ length: 20 })
    phone: string;

    @Column({ nullable: true })
    address: string;
    
    // relation

}