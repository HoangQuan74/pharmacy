import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Role } from "./Role";
import { ProjectMember } from "./ProjectMember";
import { ListTask } from "./ListTask";
import { Label } from "./Label";

@Entity({ name: 'projects' })
export class Projects extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', length: 50 })
    name: string;

    // relation
    @OneToMany(() => Role, (role) => role.project)
    roles?: Role[];

    @OneToMany(() => ProjectMember, (projectMember) => projectMember.project)
    projectMembers?: ProjectMember[];

    @OneToMany(() => ListTask, (listTask) => listTask.project)
    listTasks?: ListTask[];

    @OneToMany(() => Label, (label) => label.project)
    labels?: Label[];
}