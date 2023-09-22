import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { UserAccount } from "./UserAccount";
import { Teacher } from "./Teacher";
import { Administrator } from "./Administrator";
import { Business } from "./Business";
import { DetailConversation } from "./DetailConversation";

@Entity({ name: 'user_person' })
export class UserPerson extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 100 })
    full_name: string;

    @Column({ type: 'longtext', nullable: true })
    image: string;

    @Column({ type: 'char', length: 10 })
    phone: string;

    @Column({ length: 50 })
    email: string;

    @Column({ type: 'nvarchar', length: 100 })
    address: string;

    @OneToOne(() => UserAccount, (userAccount) => userAccount.username)
    @JoinColumn({
        name: 'username',
        referencedColumnName: 'username',
    })
    user_account?: UserAccount;

    @OneToOne(() => Teacher, (teacher) => teacher.user_id,{
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'user_id',
    })
    teacher?: Teacher;

    @OneToOne(() => Administrator, (administrator) => administrator.user_id, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'user_id',
    })
    administrator?: Administrator;

    @OneToOne(() => Business, (business) => business.user_id, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'user_id',
    })
    business?: Business;

    @OneToMany(() => DetailConversation, (detailConversation) => detailConversation.userPerson)
    detailConversation?: DetailConversation[];
}
