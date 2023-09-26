import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { gender } from "../../common/constants/userConstant";
import { ProjectMember } from "./ProjectMember";
import { ChannelMember } from "./ChannelMemner";
import { ChatMessage } from "./ChatMessage";

@Entity({ name: 'users'})
export class Users extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', length: 50 })
    firstName: string;

    @Column({ name: 'last_name', length: 50 })
    lastName: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 65 })
    password: string;

    @Column({ nullable: true })
    age: number;

    @Column({ type: 'int', default: gender.MALE , nullable: true })
    gender: gender;

    // relation
    @OneToMany(() => ProjectMember, (projectMember) => projectMember.user)
    projectMembers?: ProjectMember[];

    @OneToMany(() => ChannelMember, (channelMember) => channelMember.user)
    channelMembers?: ChannelMember[];

    @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user)
    chatMessage?: ChatMessage[];
}