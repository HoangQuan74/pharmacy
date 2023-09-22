import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { accountStatus } from "../../common/constants/status.constant";
import { School } from "./School";
import { UserPerson } from "./UserPerson";
import { Notice } from "./Notice";

@Entity({ name: 'administrator' })
export class Administrator extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: accountStatus.Enabled })
    account_status: accountStatus;

    @Column()
    school_id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => School, (school) => school.id)
    @JoinColumn({
        name: 'school_id',
        referencedColumnName: 'id',
    })
    school?: School;

    @OneToOne(() => UserPerson, (userPerson) => userPerson.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user_person: UserPerson;
    
    @OneToMany(() => Notice, (notice) => notice.administrator)
    notice?: Notice[];
}