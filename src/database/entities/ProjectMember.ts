import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Users } from "./Users";
import { Role } from "./Role";
import { Projects } from "./Projects";
import { MemberTask } from "./MemberTask";
import { Comment } from "./Comment";

@Entity({ name: 'project_member' })
export class ProjectMember extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'project_id' })
    projectId: number;

    @Column({ name: 'role_id' })
    roleId: number;

    // relation
    @ManyToOne(() => Role, (role) => role.id)
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id',
    })
    role?: Role;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user?: Users;

    @ManyToOne(() => Projects, (project) => project.id)
    @JoinColumn({
        name: 'project_id',
        referencedColumnName: 'id',
    })
    project?: Projects;

    @OneToMany(() => MemberTask, (memberTask) => memberTask.projectMember)
    memberTasks?: MemberTask[];

    @OneToMany(() => Comment, (comment) => comment.projectMember)
    comment?: Comment[];
}