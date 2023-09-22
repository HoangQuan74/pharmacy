import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Job } from "./Job";

@Entity({ name: 'skill' })
export class Skill extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 20 })
    skill_name: string;

    @Column()
    job_id: number;

    @ManyToOne(() => Job, (job) => job.id)
    @JoinColumn({
        name: 'job_id',
        referencedColumnName: 'id'
    })
    job?: Job;
}