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
    dueDate: Date;

    // relation
    @ManyToOne(() => Task, (task) => task.checkList)
    task: Task;

    @ManyToOne(() => Users, (user) => user.checkList)
    assignees: Users; 
}