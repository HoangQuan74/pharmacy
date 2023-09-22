import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { Conversation } from "./Conversation";
import { UserPerson } from "./UserPerson";

@Entity({ name: 'detail_conversation' })
export class DetailConversation extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 500 })
    content: string;

    @Column({ type: 'longblob', nullable: true })
    attach_file: string;

    @Column()
    conversation_id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => Conversation, (conversation) => conversation.id)
    @JoinColumn({
        name: 'conversation_id',
        referencedColumnName: 'id'
    })
    conversation?: Conversation;

    @ManyToOne(() => UserPerson, (userPerson) => userPerson.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    userPerson?: UserPerson;
}