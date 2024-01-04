import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Users } from "./Users";
import { Projects } from "./Projects";
import { Comment } from "./Comment";

@Entity()
export class Members extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    userId: number;

    @Column()
    projectId: number;

    // relation
    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id',
    })
    user?: Users;

    @ManyToOne(() => Projects, (project) => project.id)
    @JoinColumn({
        name: 'projectId',
        referencedColumnName: 'id',
    })
    project?: Projects;
}