import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { studyingStatus } from '../../common/constants/status.constant'
import { UserPerson } from "./UserPerson";
import { Class } from "./Class";
import { gender } from "../../common/constants/gender.constant";
import { Program } from "./Program";
import { Major } from "./Major";
import { InternJob } from "./InternJob";
import { JobFavorite } from "./JobFavorite";
import { StudentLearnIntern } from "./StudentLearnIntern";
import { StudentRequestRegistIntern } from "./StudentRequestRegistIntern";
import { Notice } from "./Notice";
import { Report } from "./Report";
import { Conversation } from "./Conversation";
import { RegularTodo } from "./RegularTodo";

@Entity({ name: 'student' })
export class Student extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    admission_date: Date;

    @Column()
    dob: Date;

    @Column({ default: gender.men })
    sex: gender;

    @Column({ default: studyingStatus.studying })
    current_status: studyingStatus;

    @Column()
    program_id: number;

    @Column()
    major_id: number;

    @Column()
    class_id: number;

    @ManyToOne(() => Program, (program) => program.id)
    @JoinColumn({
        name: 'program_id',
        referencedColumnName: 'id'
    })
    program?: Program;

    @ManyToOne(() => Major, (major) => major.id)
    @JoinColumn({
        name: 'major_id',
        referencedColumnName: 'id'
    })
    major?: Major;

    @ManyToOne(() => Class, (Class) => Class.id)
    @JoinColumn({
        name: 'class_id',
        referencedColumnName: 'id'
    })
    class?: Class;

    @OneToOne(() => UserPerson, (userPerson) => userPerson.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user_person?: UserPerson;

    @OneToMany(() => InternJob, (internJob) => internJob.student)
    Intern_job?: InternJob[];

    @OneToMany(() => JobFavorite, (jobFavorite) => jobFavorite.student)
    job_favorite?: JobFavorite[];

    @OneToMany(() => StudentLearnIntern, (studentLearnIntern) => studentLearnIntern.student)
    studentLearnIntern?: StudentLearnIntern[];

    @OneToMany(() => StudentRequestRegistIntern, (studentRequestRegistIntern) => studentRequestRegistIntern.student)
    studentRequestRegistIntern?: StudentRequestRegistIntern[];

    @OneToMany(() => Notice, (notice) => notice.student)
    notice?: Notice[];

    @OneToMany(() => Report, (report) => report.student)
    report?: Report[];

    @OneToMany(() => Conversation, (conversation) => conversation.student)
    conversation?: Conversation[];
    
    @OneToMany(() => RegularTodo, (regularTodo) => regularTodo.student)
    regularTodo?: RegularTodo[];
}