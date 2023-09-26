import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { typeChannel } from "src/common/constants/userConstant";
import { ChannelMember } from "./ChannelMemner";
import { ChatMessage } from "./ChatMessage";

@Entity({ name: 'chat_channel' })
export class ChatChannel extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', length: 50 })
    name: string;

    @Column({  default: typeChannel.DIRECT })
    type: typeChannel

    // relation
    @OneToMany(() => ChannelMember, (channelMember) => channelMember.chatChannel)
    channelMembers?: ChannelMember[];

    @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.chatChannel)
    chatMessages?: ChatMessage[];
}