import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Users } from "./users";
import { ChatChannel } from "./ChatChannel";

@Entity({ name: 'channel_member' })
export class ChannelMember extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'channel_id' })
    channelId: number;

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
}