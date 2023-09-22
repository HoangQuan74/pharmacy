import { Entity, Column, PrimaryColumn, OneToOne, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { CodeBase } from './CodeBase';
import { UserPerson } from './UserPerson';
import { Permission } from './Permission';

@Entity({ name: 'user_account'})
export class UserAccount extends CodeBase {
    @PrimaryColumn({ length: 50 })
    username?: string;

    @Column({ type: 'longtext' })
    pass: string;

    @Column()
    permission_id: number;

    @Column({ type: 'mediumtext', nullable: true })
    token: string;

    @OneToOne(() => UserPerson, (userPerson) => userPerson.username,{
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'username',
        referencedColumnName: 'username',
    })
    user_person?: UserPerson;

    @ManyToOne(() => Permission, (permission) => permission.id)
    @JoinColumn({
        name: 'permission_id',
        referencedColumnName: 'id',
    })
    permission: Permission;
}
