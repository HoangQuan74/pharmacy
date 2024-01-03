import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Projects } from "./Projects";
import { ProjectMember } from "./Members";

@Entity({ name: 'role' })
export class Role extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role_name', length: 30 })
    roleName: string;

    @Column({ name: 'project_id' })
    projectId: number;

    // relation
    @ManyToOne(() => Projects, (project) => project.id)
    @JoinColumn({
        name: 'project_id',
        referencedColumnName: 'id',
    })
    project?: Projects;

    @OneToMany(() => ProjectMember, (projectMember) => projectMember.role)
    projectMember?: ProjectMember[];
}