import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { Business } from "./Business";
import { Skill } from "./skill";
import { InternJob } from "./InternJob";
import { JobFavorite } from "./JobFavorite";
import { StudentRequestRegistIntern } from "./StudentRequestRegistIntern";

@Entity({ name: 'job' })
export class Job extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'longtext' })
    image: string;

    @Column({ type: 'nvarchar', length: 50 })
    job_name: string;

    @Column({ type: 'nvarchar', length: 50 })
    job_desc: string;

    @Column({ type: 'nvarchar', length: 500 })
    requirements: string;

    @Column({ type: 'nvarchar', length: 500 })
    another_information: string;

    @Column()
    vacancies: number;

    @Column()
    business_id: number;

    @ManyToOne(() => Business, (business) => business.id)
    @JoinColumn({
        name: 'business_id',
        referencedColumnName: 'id'
    })
    business?: Business;

    @OneToMany(() => Skill, (skill) => skill.job)
    skill?: Skill[];

    @OneToMany(() => InternJob, (internJob) => internJob.job)
    intern_job?: InternJob[];

    @OneToMany(() => JobFavorite, (jobFavorite) => jobFavorite.job)
    job_favorite?: JobFavorite[];

    @OneToMany(() => StudentRequestRegistIntern, (studentRequestRegistIntern) => studentRequestRegistIntern.job)
    studentRequestRegistIntern?: StudentRequestRegistIntern[];
}