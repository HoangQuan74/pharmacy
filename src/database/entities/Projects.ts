import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Users } from "./Users";
import { Task } from "./Task";
import { Members } from "./Members";

@Entity({ name: 'projects' })
export class Projects extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', length: 100 })
    name: string;

    @Column()
    ownerId: number;

    // relation
    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({
        name: 'ownerId',
        referencedColumnName: 'id',
    })
    owner: Users;

    @OneToMany(() => Task, (task) => task.project)
    tasks?: Task[];

    @OneToMany(() => Members, (member) => member.project)
    members?: Members[];
}