import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Task } from "./Task";
import { ProjectMember } from "./ProjectMember";

@Entity({ name: 'member_task' })
export class MemberTask extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'member_id' })
    memberId: number;

    @Column({ name: 'task_id'})
    taskId: number;

    // relation
    @ManyToOne(() => ProjectMember, (projectMember) => projectMember.id)
    @JoinColumn({
        name: 'member_id',
        referencedColumnName: 'id',
    })
    projectMember?: ProjectMember;

    @ManyToOne(() => Task, (task) => task.id)
    @JoinColumn({
        name: 'task_id',
        referencedColumnName: 'id',
    })
    task?: Task;
}