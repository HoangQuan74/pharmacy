import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Projects } from "./Projects";
import { Task } from "./Task";
import { Users } from "./Users";

@Entity()
export class CheckList extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ nullable: true })
    startDay: Date;

    @Column({ nullable: true })
    dueDay: Date;

    @Column()
    taskId: number;

    @Column({ nullable: true })
    userId: number;

    // relation
    @ManyToOne(() => Task, (task) => task.id)
    @JoinColumn({
        name: 'taskId',
        referencedColumnName: 'id',
    })
    task: Task;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
    })
    assignees: Users;
}