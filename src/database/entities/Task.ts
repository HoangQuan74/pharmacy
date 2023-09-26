import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Projects } from "./Projects";
import { ListTask } from "./ListTask";
import { MemberTask } from "./MemberTask";
import { Comment } from "./Comment";
import { Label } from "./Label";

@Entity({ name: 'task' })
export class Task extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ name: 'label_id', nullable: true })
    labelId: number;

    @Column({ name: 'specify', length: 500, nullable: true })
    specify: string

    @Column({ name: 'in_put', length: 100,  nullable: true })
    inPut: string

    @Column({ name: 'out_put', length: 500,  nullable: true })
    outPut: string

    @Column({ name: 'list_task_id' })
    listTaskId: number;

    @Column({ name: 'start_day', nullable: true })
    startDay: Date;

    @Column({ name: 'end_day', nullable: true })
    endDay: Date;

    // relation
    @ManyToOne(() => Projects, (project) => project.id)
    @JoinColumn({
        name: 'list_task_id',
        referencedColumnName: 'id',
    })
    listTask?: ListTask;

    @ManyToOne(() => Label, (label) => label.id)
    @JoinColumn({
        name: 'label_id',
        referencedColumnName: 'id',
    })
    label?: Label;

    @OneToMany(() => MemberTask, (memberTask) => memberTask.task)
    memberTask?: MemberTask[];

    @OneToMany(() => Comment, (comment) => comment.task)
    comments?: Comment[];
}