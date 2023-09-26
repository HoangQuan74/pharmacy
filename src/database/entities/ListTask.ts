import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Projects } from "./Projects";
import { Task } from "./Task";

@Entity({ name: 'list_task' })
export class ListTask extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ name: 'project_id'})
    projectId: number

    // relation
    @ManyToOne(() => Projects, (project) => project.id)
    @JoinColumn({
        name: 'project_id',
        referencedColumnName: 'id',
    })
    project?: Projects;

    @OneToMany(() => Task, (task) => task.listTask)
    tasks?: Task[];
}