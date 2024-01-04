import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Gender } from "../../common/constants/userConstant";
import { Members } from "./Members";
import { ChannelMember } from "./ChannelMemner";
import { ChatMessage } from "./ChatMessage";
import { Projects } from "./Projects";
import { CheckList } from "./CheckList";
import { Comment } from "./Comment";
@Entity({ name: 'users' })
export class Users extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    fullName: string;

    @Column({ length: 50 })
    displayName: string;

    @Column({ length: 500 })
    avatar: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 65 })
    password: string;

    @Column({ nullable: true })
    dob: Date;

    @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
    gender: Gender;

    @Column({ length: 20, nullable: true })
    phone: string;

    // relation
    @OneToMany(() => ChannelMember, (channelMember) => channelMember.user)
    channelMembers?: ChannelMember[];

    @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user)
    chatMessage?: ChatMessage[];

    @OneToMany(() => Projects, (project) => project.owner)
    projects: Projects[];

    @OneToMany(() => CheckList, (checkList) => checkList.assignees)
    checkList: CheckList[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];

    @OneToMany(() => Members, (member) => member.user)
    members: Members[];
}