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

    // relation
    @ManyToOne(() => Users, (user) => user.members)
    user?: Users;

    @ManyToOne(() => Projects, (project) => project.members)
    project?: Projects;
}