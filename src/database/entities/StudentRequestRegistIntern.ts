import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { status } from "../../common/constants/status.constant";
import { Job } from "./Job";

@Entity({ name: 'student_request_regist_intern' })
export class StudentRequestRegistIntern extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column({ default: status.processing })
    regist_submit_status: status;

    @Column()
    job_id: number;

    @Column({ type: 'longblob' })
    file: string;

    @ManyToOne(() => Job, (job) => job.id)
    @JoinColumn({
        name: 'job_id',
        referencedColumnName: 'id'
    })
    job?: Job;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;
}