import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserAccount } from './UserAccount';
import { role } from '../../common/constants/status.constant';

@Entity({ name: 'permission' })
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar' })
    permission_name: role;

    @OneToMany(() => UserAccount, (userAccount) => userAccount.permission)
    user_account: UserAccount[];
}