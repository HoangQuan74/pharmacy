import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Task } from "./Task";
import { Users } from "./Users";

@Entity({ name: 'comment' })
export class Comment extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1000 })
    content: string;

    @Column({ default: false })
    isResolved: Boolean;

    // relation
    @ManyToOne(() => Task, (task) => task.comments)
    task: Task;

    @ManyToOne(() => Users, (user) => user.comments)
    author?: Users;
}