import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Users } from "./Users";
import { ChatChannel } from "./ChatChannel";

@Entity({ name: 'chat_message' })
export class ChatMessage extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1000, nullable: true })
    message: string;

    @Column({ type: 'longblob', nullable: true })
    image: string;

    @Column({ name: 'parent_message_id', nullable: true })
    parentMessageId: number;

    @Column({ name: 'channel_id' })
    channelId: number;

    @Column({ name: 'user_id' })
    userId: number;

    // relation
    @ManyToOne(() => ChatChannel, (chatChannel) => chatChannel.id)
    @JoinColumn({
        name: 'channel_id',
        referencedColumnName: 'id',
    })
    chatChannel?: ChatChannel;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user?: Users;

    @OneToOne(()=> ChatMessage, (chatMessage) => chatMessage.id, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'parent_message_id',
        referencedColumnName: 'id',
    })
    parentMessage?: ChatMessage;
}