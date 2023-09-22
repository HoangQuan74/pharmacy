import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { Job } from "./Job";

@Entity({ name: 'job_favorite' })
export class JobFavorite extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    job_id: number;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;

    @ManyToOne(() => Job, (job) => job.id)
    @JoinColumn({
        name: 'job_id',
        referencedColumnName: 'id'
    })
    job?: Job;
}

// create table job_favorite (
// 	id int auto_increment primary key,
//     creation_date date not null,
//     student_id int not null references student(id),
//     job_id int not null references job(id)
// );