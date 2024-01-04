import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Projects } from "./Projects";
import { CheckList } from "./CheckList";
import { Comment } from "./Comment";

export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
}

export enum TaskStatus {
    NOT_STARTED = 'NOT_STARTED',
    DOING = 'DOING',
    TESTING = 'TESTING',
    FIXING = 'FIXING',
    DONE = 'DONE',
    PENDING = 'PENDING',
}
@Entity({ name: 'task' })
export class Task extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'enum', enum: Priority, nullable: true })
    priority: Priority;

    @Column({ length: 500, nullable: true })
    description: string

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.NOT_STARTED })
    status: TaskStatus;
    
    @Column()
    projectId: number;

    // relation
    @OneToMany(() => CheckList, (checkList) => checkList.task)
    checkList: CheckList[];

    @OneToMany(() => Comment, (comment) => comment.task)
    comments?: Comment[];

    @ManyToOne(() => Projects, (project) => project.id)
    @JoinColumn({
        name: 'projectId',
        referencedColumnName: 'id',
    })
    project: Projects;
}