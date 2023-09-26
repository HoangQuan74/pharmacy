import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Task } from "./Task";
import { ProjectMember } from "./ProjectMember";

@Entity({ name: 'comment' })
export class Comment extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1000 })
    content: string;

    @Column({ name: 'member_id' })
    memberId: number;

    @Column({ name: 'task_id' })
    taskId: number;

    @Column({ name: 'parent_comment_id', default: null, nullable: true })
    parentCommentId: number

    // relation
    @OneToOne(()=> Comment, (comment) => comment.id, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'parent_comment_id',
        referencedColumnName: 'id',
    })
    parentComment?: Comment;

    @ManyToOne(() => Task, (task)=> task.id)
    @JoinColumn({
        name: 'task_id',
        referencedColumnName: 'id',
    })
    task?: Task;

    @ManyToOne(() => ProjectMember, (projectMember)=> projectMember.id)
    @JoinColumn({
        name: 'member_id',
        referencedColumnName: 'id',
    })
    projectMember?: ProjectMember;
}